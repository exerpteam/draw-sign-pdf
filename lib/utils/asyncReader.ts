import { getAsset } from "./prepareAssets";

export async function readAsPDF(file: any, type: string) {
  const pdfjsLib = await getAsset("pdfjsLib");
  if (type === "arrayBuffer") {
    const blob = new Blob([file]);
    const url = window.URL.createObjectURL(blob);
    return pdfjsLib.value.getDocument(url).promise;
  } else if (type === "string") {
    const dataUri = "data:application/pdf;base64," + file;
    return pdfjsLib.value.getDocument(dataUri).promise;
  }
}
export function ggID() {
  let id = 0;
  return function genId() {
    return id++;
  };
}