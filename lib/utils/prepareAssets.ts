import { ref, Ref } from "vue";

interface Script {
  name: string;
  src: string;
}
const scripts = [
  {
    name: "pdfjsLib",
    src: new URL('./library/pdf.min.js', import.meta.url).href,
  },
  {
    name: "PDFLib",
    src: new URL('./library/pdf-lib.min.js', import.meta.url).href,
  },
  {
    name: "download",
    src: new URL('./library/downloadjs.js', import.meta.url).href,
  }
];
interface Asset {
  [key: string]: Ref<unknown> | Promise<unknown>;
}

const assets: Asset = {};

export function getAsset(name: string): Ref<any> | Promise<any> {
  console.log('JERE222');
  
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
