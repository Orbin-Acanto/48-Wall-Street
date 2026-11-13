import type { Metadata } from 'next';
import { Suspense } from 'react';
import TemplateEditor from '@/components/FloorPlanTemplates/TemplateEditor';

export const metadata: Metadata = {
  title: 'Floor Plan Editor | 48 Wall Street',
  robots: { index: false, follow: false },
};

export default function FloorPlanTemplateEditorPage() {
  return (
    <Suspense>
      <TemplateEditor />
    </Suspense>
  );
}
