import * as pdfjsLib from 'pdfjs-dist';
export const initializePdfjs = () => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
};