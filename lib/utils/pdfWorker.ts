import * as pdfjsLib from 'pdfjs-dist';

/**
 * Initialize the PDF.js worker
 * This is needed for PDF rendering to work
 */
export function initPdfWorker(): void {
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 
      `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
  }
} 