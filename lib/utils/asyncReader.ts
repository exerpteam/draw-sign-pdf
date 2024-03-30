import { getAsset } from './prepareAssets';

export function readAsArrayBuffer(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function readAsImage(src: any) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    if (src instanceof Blob) {
      const url = window.URL.createObjectURL(src);
      img.src = url;
    } else {
      img.src = src;
    }
  });
}

export function readAsDataURL(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function readAsPDF(file: any, type: string) {
  const pdfjsLib = await getAsset('pdfjsLib');
  if (type === 'arrayBuffer') {
    const blob = new Blob([file]);
    const url = window.URL.createObjectURL(blob);
    return pdfjsLib.value.getDocument(url).promise;
  } else if (type === 'string') {
    const dataUri = 'data:application/pdf;base64,' + file;
    return pdfjsLib.value.getDocument(dataUri).promise;
  }
}
