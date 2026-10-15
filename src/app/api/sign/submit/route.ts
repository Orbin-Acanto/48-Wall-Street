import { NextRequest, NextResponse } from 'next/server';
import { SubmitRequestBody } from '@/types';
import {
  generateDocumentPDF,
  postSignedDocument,
} from '@/lib/documents/delivery';
import { consumeToken, releaseToken } from '@/lib/documents/signing-tokens';
import { recordSealedDocument } from '@/lib/documents/packets';
import {
  pdfBytes,
  sealPdf,
  sealingConfigured,
  sha256Hex,
} from '@/lib/documents/seal';
import { sendEmails, staffCc, staffRecipients } from '@/lib/email';
import {
  signedClientEmail,
  signedStaffEmail,
  documentLabel,
} from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  let claimedToken: string | null = null;

  try {
    const body: SubmitRequestBody = await request.json();

    if (
      !body.clientName ||
      !body.clientEmail ||
      !body.signature ||
      !body.signedDate
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (body.documentType === 'av_production' && !body.formData) {
      return NextResponse.json(
        { success: false, error: 'Missing form data for AV Production' },
        { status: 400 }
      );
    }

    // Claim the signing link before doing any work. This is atomic, so two
    // concurrent submits cannot both proceed, and a signed link can never be
    // reused.
    const token = body.token;
    if (token) {
      const claimed = await consumeToken(token, {
        clientEmail: body.clientEmail,
        documentType: body.documentType,
        docId: body.docId ?? null,
      });
      if (!claimed) {
        return NextResponse.json(
          {
            success: false,
            error: 'already_signed',
            message: 'This document has already been signed and submitted.',
          },
          { status: 409 }
        );
      }
      claimedToken = token;
    }

    const sealedPdf = await sealPdf(
      pdfBytes(await generateDocumentPDF(body)),
      `${documentLabel(body.documentType)} signed by ${body.typedName || body.clientName}`
    );
    const pdfBase64 = `data:application/pdf;base64,${sealedPdf.toString('base64')}`;
    await postSignedDocument(body, pdfBase64);
    await recordSealedDocument(sha256Hex(sealedPdf), {
      title: documentLabel(body.documentType),
      reference: body.docId ?? '',
      signerName: body.clientName,
      signedAt: new Date().toISOString(),
      sealed: sealingConfigured(),
    });

    // Confirmation to the client and a copy to the events team, both with the
    // executed PDF attached. Email failures are logged but never fail the
    // submission — the document is already safely delivered at this point.
    const emailContext = {
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      documentType: body.documentType,
      signedDate: body.signedDate,
      signTime: body.signTime,
      location: body.location,
      ipAddress: body.ipAddress,
      docId: body.docId ?? null,
    };

    const attachment = {
      data: pdfBase64,
      filename: `${documentLabel(body.documentType).replace(/[^a-z0-9]+/gi, '-')}-${body.clientName.replace(/[^a-z0-9]+/gi, '-')}.pdf`,
      contentType: 'application/pdf',
    };

    const clientMessage = signedClientEmail(emailContext);
    const staffMessage = signedStaffEmail(emailContext);
    const staff = staffRecipients();

    const results = await sendEmails([
      {
        to: body.clientEmail,
        subject: clientMessage.subject,
        html: clientMessage.html,
        attachment,
      },
      ...(staff.length
        ? [
            {
              to: staff,
              cc: staffCc().filter((a) => !staff.includes(a)),
              subject: staffMessage.subject,
              html: staffMessage.html,
              attachment,
            },
          ]
        : []),
    ]);

    const failed = results.filter((result) => !result.success);
    if (failed.length) {
      console.error('Confirmation email failures:', failed);
    }

    return NextResponse.json(
      { success: true, emailsSent: results.length - failed.length },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting signed document:', error);

    // If we claimed the link but never delivered, hand it back so the client
    // can retry instead of being locked out of a document they never signed.
    if (claimedToken) await releaseToken(claimedToken);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to submit signed document',
      },
      { status: 500 }
    );
  }
}
