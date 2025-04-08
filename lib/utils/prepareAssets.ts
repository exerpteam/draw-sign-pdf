import download from 'downloadjs';
import { getDocument } from 'pdfjs-dist';

export const readAsPDF = async (input: string | File, type: string = 'string') => {
  let arrayBuffer: ArrayBuffer;
  
  if (type === 'string' && typeof input === 'string') {
    console.log('Processing string input, length:', input.length);
    // Convert base64 string to ArrayBuffer
    const binaryString = atob(input);
    console.log('Binary string length:', binaryString.length);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    arrayBuffer = bytes.buffer;
    console.log('ArrayBuffer size:', arrayBuffer.byteLength);
  } else if (input instanceof File) {
    console.log('Processing File input, size:', input.size);
    arrayBuffer = await input.arrayBuffer();
    console.log('File ArrayBuffer size:', arrayBuffer.byteLength);
  } else {
    throw new Error('Invalid input type for readAsPDF');
  }

  const { PDFDocument } = await import('pdf-lib');
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  console.log('PDF document loaded successfully');
  return pdfDoc;
};

export const downloadPDF = (pdfBytes: Uint8Array, filename: string): void => {
  download(pdfBytes, filename, 'application/pdf');
};

export const getPDFDocument = async (pdfDoc: any) => {
  console.log('Getting PDF document from pdf-lib document');
  // Save the PDF document to get its bytes
  const pdfBytes = await pdfDoc.save();
  console.log('PDF bytes length:', pdfBytes.length);
  // Pass the bytes directly to getDocument
  const loadingTask = getDocument({ data: pdfBytes });
  console.log('PDF.js loading task created');
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
