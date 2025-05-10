import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
export declare function readAsPDF(file: any, type: string): Promise< PDFDocumentProxy | undefined>;
export declare function ggID(): () => number;
