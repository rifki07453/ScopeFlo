import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { DocumentDraft } from '@/types/document';
import { SowData } from '@/types/project';

export const exportToDocx = async (draft: DocumentDraft, docType: string) => {
  const getDocTitle = () => {
    switch(docType) {
      case 'quotation': return 'QUOTATION';
      case 'contract': return 'CONTRACT AGREEMENT';
      case 'sow':
      default: return 'STATEMENT OF WORK';
    }
  };

  const doc = new Document({
    creator: draft.providerName || 'ScopeFlo',
    title: draft.title || getDocTitle(),
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: getDocTitle(),
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Date: ", bold: true }),
              new TextRun(draft.date ? new Date(draft.date).toLocaleDateString() : 'N/A'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Prepared For: ", bold: true }),
              new TextRun(draft.clientName || 'Client Name'),
            ],
          }),
          new Paragraph({ text: "" }), // Spacing
          
          // Summary
          ...(draft.summary ? [
            new Paragraph({ text: "Summary", heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: draft.summary }),
            new Paragraph({ text: "" }),
          ] : []),

          // Contract Specific
          ...(docType === 'contract' && draft.agreementTerms ? [
            new Paragraph({ text: "1. Agreement Terms", heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: draft.agreementTerms }),
            new Paragraph({ text: "" }),
          ] : []),

          ...(docType === 'contract' && draft.legalClauses ? [
            new Paragraph({ text: "2. Legal Clauses & Conditions", heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: draft.legalClauses }),
            new Paragraph({ text: "" }),
          ] : []),

          // SOW Specific
          ...(docType === 'sow' && draft.scopeOfWork ? [
            new Paragraph({ text: "1. Scope of Work", heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: draft.scopeOfWork }),
            new Paragraph({ text: "" }),
          ] : []),

          ...(docType === 'sow' && draft.deliverables ? [
            new Paragraph({ text: "2. Deliverables", heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: draft.deliverables }),
            new Paragraph({ text: "" }),
          ] : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${draft.title || docType}_ScopeFlow.docx`);
};
