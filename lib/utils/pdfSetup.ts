import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
// @ts-ignore
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';

export const initializePdfjs = () => {
  GlobalWorkerOptions.workerSrc = workerSrc;
};

export { getDocument, GlobalWorkerOptions };