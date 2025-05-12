declare module 'pdfjs-dist/build/pdf' {
    import type {
      PDFDocumentProxy,
      PDFPageProxy,
      PDFWorker,
      RenderParameters,
      TextContent,
      TextItem,
      TextMarkedContent,
      GlobalWorkerOptions as _GlobalWorkerOptions
    } from 'pdfjs-dist/types/src/display/api';
  
    export const getDocument: any; // or a better typed version
    export const GlobalWorkerOptions: typeof _GlobalWorkerOptions;
    export type {
      PDFDocumentProxy,
      PDFPageProxy,
      PDFWorker,
      RenderParameters,
      TextContent,
      TextItem,
      TextMarkedContent
    };
  }
  declare module 'pdfjs-dist/build/pdf.worker?worker' {
    const worker: new () => Worker;
    export default worker;
  }