import { PDFDocument } from 'pdf-lib';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
export declare const readAsPDF: (input: string | File, type?: string) => Promise< PDFDocument>;
export declare const downloadPDF: (pdfBytes: Uint8Array, filename: string) => void;
export declare const getPDFDocument: (pdfDoc: any) => Promise< PDFDocumentProxy>;
export declare const getPDFPage: (pdfDoc: any, pageNumber: number) => Promise<any>;
export declare const renderPDFPage: (page: any) => Promise<{
    page: any;
    canvas: HTMLCanvasElement;
}>;
