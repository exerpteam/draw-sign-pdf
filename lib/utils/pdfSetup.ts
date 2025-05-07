import * as pdfjsLib from 'pdfjs-dist';
export const initializePdfjs = () => {
  const version = pdfjsLib.version || '4.8.69' // fallback if needed
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`
};