import { ref, Ref } from "vue";
import download from 'downloadjs';
import { getDocument } from 'pdfjs-dist';

interface Script {
  name: string;
  src: string;
}

const scripts: Script[] = [
  {
    name: "pdfjsLib",
    src: "https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.min.js",
  },
  {
    name: "PDFLib",
    src: "https://unpkg.com/pdf-lib@1.4.0/dist/pdf-lib.min.js",
  },
  {
    name: "download",
    src: "https://unpkg.com/downloadjs@1.4.7",
  },
];

interface Asset {
  [key: string]: Ref<unknown> | Promise<unknown>;
}

const assets: Asset = {};

export function getAsset(name: string): Ref<any> | Promise<any> {
  if (assets[name]) return assets[name] as Ref<unknown>;
  const script = scripts.find((s) => s.name === name);
  if (!script) throw new Error(`Script ${name} not exists.`);
  return prepareAsset(script);
}

export function prepareAsset({
  name,
  src,
}: Script): Ref<unknown> | Promise<unknown> {
  if (assets[name]) return assets[name] as Ref<unknown>;
  const scriptRef = ref<unknown | null>(null);
  assets[name] = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      scriptRef.value = window[name as keyof Window];
      resolve(scriptRef);
    };
    script.onerror = () => {
      reject(`The script ${name} didn't load correctly.`);
      // alert(
      //   `Some scripts did not load correctly. Please reload and try again.`
      // );
    };
    document.body.appendChild(script);
  });
  return scriptRef;
}

export default function prepareAssets() {
  scripts.forEach(prepareAsset);
}

export const readAsPDF = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const { PDFDocument } = await import('pdf-lib');
  return PDFDocument.load(arrayBuffer);
};

export const downloadPDF = (pdfBytes: Uint8Array, filename: string): void => {
  download(pdfBytes, filename, 'application/pdf');
};

export const getPDFDocument = async (pdfBytes: Uint8Array) => {
  return getDocument(pdfBytes).promise;
};

export const getPDFPage = async (pdfDoc: any, pageNumber: number) => {
  return pdfDoc.getPage(pageNumber);
};

export const renderPDFPage = async (page: any, canvas: HTMLCanvasElement) => {
  const viewport = page.getViewport({ scale: 1.5 });
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get canvas context');

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({
    canvasContext: context,
    viewport: viewport
  }).promise;
};
