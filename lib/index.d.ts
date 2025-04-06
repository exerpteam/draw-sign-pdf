import { DefineComponent } from 'vue';

// Component type declarations
export const DrawSignPdf: DefineComponent<{
  pdfData: string;
  signatureData: Array<{
    page: number;
    top: number;
    left: number;
    width: number;
    height: number;
  }>;
  translations?: Record<string, string>;
  finish?: (result: {
    signedDocument: { data: string; type: string };
    signatureImage: string;
  }) => void;
}>;

// Default export as Vue plugin
export default DrawSignPdf;
