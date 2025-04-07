import { DefineComponent, Plugin } from 'vue';

// Component type declarations
export interface PdfSignatureData {
  page: number;
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface SignedDocumentResult {
  signedDocument: { data: string; type: string };
  signatureImage: string;
}

export const DrawSignPdf: DefineComponent<{
  pdfData: string;
  signatureData: PdfSignatureData[];
  translations?: Record<string, string>;
  finish?: (result: SignedDocumentResult) => void;
}> & { install(app: any): void };

// Default export as Vue plugin
export default DrawSignPdf;
