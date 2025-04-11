import * as pdfjsLib from 'pdfjs-dist';

export const initializePdfjs = () => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
}; 