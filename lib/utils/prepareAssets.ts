import { ref, Ref } from "vue";

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
      console.log(`${name} is loaded. log added`);
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
