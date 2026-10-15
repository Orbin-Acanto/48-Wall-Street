import { createHash, randomBytes, webcrypto } from 'crypto';
import * as asn1js from 'asn1js';
import * as pkijs from 'pkijs';
import { PDFDocument } from 'pdf-lib';
import { SignPdf } from '@signpdf/signpdf';
import { pdflibAddPlaceholder } from '@signpdf/placeholder-pdf-lib';
import { Signer, SUBFILTER_ETSI_CADES_DETACHED } from '@signpdf/utils';

/**
 * Digitally seal executed PDFs so any later change is detectable.
 *
 * PAdES-style: a detached CMS signature (SHA-256 / RSA) over the PDF bytes,
 * bound to our certificate with ESS signing-certificate-v2, plus an RFC 3161
 * timestamp from a trusted TSA proving when it was signed (the basis of
 * long-term validation).
 *
 * Credentials (base64 of the PEM text, so they fit on one env line):
 *   DOC_SIGNING_KEY   PKCS#8 private key
 *   DOC_SIGNING_CERT  signing certificate, followed by any intermediates
 * Without them the PDF is returned unsealed, so signing never breaks.
 */

const TSA_URL =
  process.env.DOC_SIGNING_TSA_URL ?? 'http://timestamp.digicert.com';

const OID = {
  data: '1.2.840.113549.1.7.1',
  signedData: '1.2.840.113549.1.7.2',
  contentType: '1.2.840.113549.1.9.3',
  messageDigest: '1.2.840.113549.1.9.4',
  signingCertificateV2: '1.2.840.113549.1.9.16.2.47',
  timeStampToken: '1.2.840.113549.1.9.16.2.14',
  sha256: '2.16.840.1.101.3.4.2.1',
};

pkijs.setEngine(
  'node',
  new pkijs.CryptoEngine({
    name: 'node',
    crypto: webcrypto as unknown as Crypto,
  })
);

function pemBlocks(pem: string, label: string): Buffer[] {
  const pattern = new RegExp(
    `-----BEGIN ${label}-----([\\s\\S]*?)-----END ${label}-----`,
    'g'
  );
  return [...pem.matchAll(pattern)].map((m) =>
    Buffer.from(m[1].replace(/\s+/g, ''), 'base64')
  );
}

interface Credentials {
  key: Buffer;
  certs: Buffer[];
}

let credentials: Credentials | null | undefined;

function loadCredentials(): Credentials | null {
  if (credentials !== undefined) return credentials;
  const keyEnv = process.env.DOC_SIGNING_KEY;
  const certEnv = process.env.DOC_SIGNING_CERT;
  if (!keyEnv || !certEnv) {
    console.warn('DOC_SIGNING_KEY/CERT not set — PDFs will not be sealed.');
    credentials = null;
    return null;
  }
  const decode = (v: string) =>
    v.includes('-----BEGIN') ? v : Buffer.from(v, 'base64').toString('utf8');
  const [key] = pemBlocks(decode(keyEnv), 'PRIVATE KEY');
  const certs = pemBlocks(decode(certEnv), 'CERTIFICATE');
  credentials = key && certs.length ? { key, certs } : null;
  if (!credentials) console.error('DOC_SIGNING_KEY/CERT could not be parsed.');
  return credentials;
}

function sha256(data: Uint8Array): Buffer {
  return createHash('sha256').update(data).digest();
}

/** RFC 3161 timestamp token over the signature value, or null on failure. */
async function fetchTimestamp(
  signature: ArrayBuffer
): Promise<asn1js.Sequence | null> {
  try {
    const request = new pkijs.TimeStampReq({
      version: 1,
      messageImprint: new pkijs.MessageImprint({
        hashAlgorithm: new pkijs.AlgorithmIdentifier({
          algorithmId: OID.sha256,
        }),
        hashedMessage: new asn1js.OctetString({
          valueHex: sha256(new Uint8Array(signature)),
        }),
      }),
      nonce: new asn1js.Integer({ valueHex: randomBytes(8) }),
      certReq: true,
    });

    const response = await fetch(TSA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/timestamp-query' },
      body: Buffer.from(request.toSchema().toBER()),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`TSA responded ${response.status}`);

    const parsed = pkijs.TimeStampResp.fromBER(await response.arrayBuffer());
    // 0 = granted, 1 = granted with modifications.
    if (parsed.status.status > 1 || !parsed.timeStampToken) {
      throw new Error(`TSA refused (status ${parsed.status.status})`);
    }
    return parsed.timeStampToken.toSchema() as asn1js.Sequence;
  } catch (error) {
    // A seal without a timestamp is still a valid, tamper-evident signature.
    console.error('Timestamp request failed:', error);
    return null;
  }
}

class CadesSigner extends Signer {
  private readonly creds: Credentials;

  constructor(creds: Credentials) {
    super();
    this.creds = creds;
  }

  async sign(data: Buffer): Promise<Buffer> {
    const certs = this.creds.certs.map((der) =>
      pkijs.Certificate.fromBER(new Uint8Array(der))
    );
    const signerCert = certs[0];

    const privateKey = await webcrypto.subtle.importKey(
      'pkcs8',
      this.creds.key,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    );

    // SigningCertificateV2 { certs: [ ESSCertIDv2 { certHash } ] } (SHA-256 default).
    const signingCertificate = new asn1js.Sequence({
      value: [
        new asn1js.Sequence({
          value: [
            new asn1js.Sequence({
              value: [
                new asn1js.OctetString({
                  valueHex: sha256(this.creds.certs[0]),
                }),
              ],
            }),
          ],
        }),
      ],
    });

    const signedData = new pkijs.SignedData({
      version: 1,
      encapContentInfo: new pkijs.EncapsulatedContentInfo({
        eContentType: OID.data,
      }),
      certificates: certs,
      signerInfos: [
        new pkijs.SignerInfo({
          version: 1,
          sid: new pkijs.IssuerAndSerialNumber({
            issuer: signerCert.issuer,
            serialNumber: signerCert.serialNumber,
          }),
          signedAttrs: new pkijs.SignedAndUnsignedAttributes({
            type: 0,
            attributes: [
              new pkijs.Attribute({
                type: OID.contentType,
                values: [new asn1js.ObjectIdentifier({ value: OID.data })],
              }),
              new pkijs.Attribute({
                type: OID.messageDigest,
                values: [new asn1js.OctetString({ valueHex: sha256(data) })],
              }),
              new pkijs.Attribute({
                type: OID.signingCertificateV2,
                values: [signingCertificate],
              }),
            ],
          }),
        }),
      ],
    });

    await signedData.sign(privateKey, 0, 'SHA-256');

    const signer = signedData.signerInfos[0];
    const token = await fetchTimestamp(
      signer.signature.valueBlock.valueHexView.slice().buffer
    );
    if (token) {
      signer.unsignedAttrs = new pkijs.SignedAndUnsignedAttributes({
        type: 1,
        attributes: [
          new pkijs.Attribute({ type: OID.timeStampToken, values: [token] }),
        ],
      });
    }

    const contentInfo = new pkijs.ContentInfo({
      contentType: OID.signedData,
      content: signedData.toSchema(true),
    });
    return Buffer.from(contentInfo.toSchema().toBER());
  }
}

export function sha256Hex(data: Uint8Array): string {
  return sha256(data).toString('hex');
}

/** `data:application/pdf;base64,…` or bare base64 → bytes. */
export function pdfBytes(data: string): Buffer {
  const comma = data.startsWith('data:') ? data.indexOf(',') : -1;
  return Buffer.from(comma === -1 ? data : data.slice(comma + 1), 'base64');
}

/** Seal a finished PDF. Returns the original bytes when sealing is not configured. */
export async function sealPdf(
  bytes: Uint8Array,
  reason: string
): Promise<Buffer> {
  const creds = loadCredentials();
  if (!creds) return Buffer.from(bytes);

  const pdfDoc = await PDFDocument.load(bytes);
  pdflibAddPlaceholder({
    pdfDoc,
    reason,
    contactInfo: 'events@48wallnyc.com',
    name: '48 Wall Street Events',
    location: 'New York, NY',
    signatureLength: 24000,
    subFilter: SUBFILTER_ETSI_CADES_DETACHED,
    appName: '48 Wall Street Document Center',
  });
  const prepared = Buffer.from(await pdfDoc.save({ useObjectStreams: false }));
  return new SignPdf().sign(prepared, new CadesSigner(creds));
}

export function sealingConfigured(): boolean {
  return !!loadCredentials();
}
