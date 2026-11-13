// Render a blank copy of every signing-packet document (for preview / printing).
// Run: npx tsx scripts/blank-forms.mts [outDir]   (default: ~/Downloads/48WallSt-Blank-Forms)
import { mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { PDFDocument } from 'pdf-lib';
import { generateDocumentPDF } from '@/lib/documents/delivery';
import { PACKET_DOCUMENTS } from '@/lib/documents/catalog';

const outDir =
  process.argv[2] ?? join(homedir(), 'Downloads', '48WallSt-Blank-Forms');
mkdirSync(outDir, { recursive: true });

for (const [i, doc] of PACKET_DOCUMENTS.entries()) {
  const uri = await generateDocumentPDF({
    clientName: '',
    clientEmail: '',
    documentType: doc.type,
    viewTime: '',
    signTime: '',
    location: '',
    ipAddress: '',
    initials: {},
    signature: '',
    signedDate: '',
    typedName: '',
    deadline: '',
    formData: {},
  });
  const pdf = await PDFDocument.load(
    Buffer.from(uri.slice(uri.indexOf(',') + 1), 'base64')
  );
  // Every generator ends with the e-signature certificate page; a blank form has none.
  pdf.removePage(pdf.getPageCount() - 1);
  const bytes = await pdf.save();
  const file = join(
    outDir,
    `${i + 1}-${doc.label.replace(/[^a-z0-9]+/gi, '-').replace(/-$/, '')}.pdf`
  );
  writeFileSync(file, bytes);
  console.log(`${file} (${bytes.length} bytes)`);
}
