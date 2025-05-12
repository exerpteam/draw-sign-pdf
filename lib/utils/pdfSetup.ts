import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

export const initializePdfjs = () => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
};