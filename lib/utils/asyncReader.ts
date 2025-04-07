import * as pdfjsLib from 'pdfjs-dist';

export async function readAsPDF(file: any, type: string) {
  if (type === "arrayBuffer") {
    const blob = new Blob([file]);
    const url = window.URL.createObjectURL(blob);
    return pdfjsLib.getDocument(url).promise;
  } else if (type === "string") {
    const dataUri = "data:application/pdf;base64," + file;
    return pdfjsLib.getDocument(dataUri).promise;
  }
}

export function ggID() {
  let id = 0;
  return function genId() {
    return id++;
  };
}