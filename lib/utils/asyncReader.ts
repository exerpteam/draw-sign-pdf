import { getPDFDocument } from "./prepareAssets";

export async function readAsPDF(file: any, type: string) {
  if (type === "arrayBuffer") {
    const blob = new Blob([file]);
    return getPDFDocument(new Uint8Array(await blob.arrayBuffer()));
  } else if (type === "string") {
    const base64 = atob(file);
    const uint8Array = new Uint8Array(base64.length);
    for (let i = 0; i < base64.length; i++) {
      uint8Array[i] = base64.charCodeAt(i);
    }
    return getPDFDocument(uint8Array);
  }
}

export function ggID() {
  let id = 0;
  return function genId() {
    return id++;
  };
}