import download from 'downloadjs';
import { getDocument } from './pdfSetup';

export const readAsPDF = async (input: string | File, type: string = 'string') => {
  let arrayBuffer: ArrayBuffer;
  
  if (type === 'string' && typeof input === 'string') {
    // Convert base64 string to ArrayBuffer
    const binaryString = atob(input);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    arrayBuffer = bytes.buffer;
  } else if (input instanceof File) {
    arrayBuffer = await input.arrayBuffer();
  } else {
    throw new Error('Invalid input type for readAsPDF');
  }

  const { PDFDocument } = await import('pdf-lib');
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  return pdfDoc;
};

export const downloadPDF = (pdfBytes: Uint8Array, filename: string): void => {
  download(pdfBytes, filename, 'application/pdf');
};

export const getPDFDocument = async (pdfDoc: any) => {
  // Save the PDF document to get its bytes
  const pdfBytes = await pdfDoc.save();
  // Pass the bytes directly to getDocument
  const loadingTask = getDocument({ data: pdfBytes });
  return loadingTask.promise;
};

export const getPDFPage = async (pdfDoc: any, pageNumber: number) => {
  return pdfDoc.getPage(pageNumber);
};

export const renderPDFPage = async (page: any) => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const viewport = page.getViewport({ scale: 1.5 });
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get canvas context');

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({
    canvasContext: context,
    viewport: viewport
  }).promise;

  return { page, canvas };
};
