import { downloadPDF } from "./prepareAssets";
import { PDFDocument, rgb } from 'pdf-lib';

export async function save(
  pdfFile: File | Blob,
  objects: any,
  name: string,
  isDownload = false
) {
  let pdfDoc;
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    pdfDoc = await PDFDocument.load(arrayBuffer);
  } catch (e) {
    console.error('Error loading PDF:', e);
    throw e;
  }

  const pagesProcesses = pdfDoc
    .getPages()
    .map(async (page: any, pageIndex: number) => {
      const pageObjects = objects[pageIndex] || [];
      // 'y' starts from bottom in PDFLib, use this to calculate y
      const pageHeight = page.getHeight();
      const embedProcesses = pageObjects.map(async (object: any) => {
        if (object.type === "drawing") {
          const { x, y, path, originWidth, originHeight, width, height, scale } =
            object;

          // Calculate the actual width and height after scaling
          const scaledWidth = originWidth * scale;
          const scaledHeight = originHeight * scale;

          // Center the drawing within the desired square
          const centeredX = x + (width - scaledWidth) / 2;
          const centeredY = y + (height - scaledHeight) / 2;

          // Draw the path using drawSvgPath
          page.drawSvgPath(path, {
            x: centeredX,
            y: pageHeight - centeredY,
            scale: scale,
            borderWidth: 5,
            borderColor: rgb(0, 0, 0),
            borderLineCap: 'Round',
            borderLineJoin: 'Round'
          });
        }
      });
      // embed objects in order
      const drawProcesses = await Promise.all(embedProcesses);
      drawProcesses.forEach((p) => p && p());
    });
  await Promise.all(pagesProcesses);
  try {
    const pdfBytes = await pdfDoc.save();
    if (isDownload) {
      downloadPDF(pdfBytes, name);
    }
    return await pdfDoc.saveAsBase64();
  } catch (e) {
    console.error('Error saving PDF:', e);
    throw e;
  }
}
