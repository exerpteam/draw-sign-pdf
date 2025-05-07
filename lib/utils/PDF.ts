import { downloadPDF } from "./prepareAssets";
import { PDFDocument, rgb } from 'pdf-lib';

export async function save(
  pdfFile: File | Blob,
  objects: any,
  name: string,
  isDownload = false
) {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // ✅ Remove all form fields (flattening step)
  try {
    const form = pdfDoc.getForm();
    form.getFields().forEach((field) => {
      form.removeField(field);
    });
  } catch (e) {
    console.warn('No AcroForm found or already removed:', e);
  }

  // ✅ Draw each object (e.g., signature)
  const pagesProcesses = pdfDoc.getPages().map(async (page, pageIndex) => {
    const pageObjects = objects[pageIndex] || [];
    const pageHeight = page.getHeight();

    const drawOps = pageObjects.map(async (object: any) => {
      if (object.type === "drawing") {
        const { x, y, path, originWidth, originHeight, width, height, scale } = object;
        const scaledWidth = originWidth * scale;
        const scaledHeight = originHeight * scale;
        const centeredX = x + (width - scaledWidth) / 2;
        const centeredY = y + (height - scaledHeight) / 2;

        page.drawSvgPath(path, {
          x: centeredX,
          y: pageHeight - centeredY - scaledHeight, // flipped for PDF y-axis
          scale: scale,
          borderWidth: 5,
          borderColor: rgb(0, 0, 0),
          borderLineCap: 'Round',
          borderLineJoin: 'Round'
        });
      }
    });

    await Promise.all(drawOps);
  });

  await Promise.all(pagesProcesses);

  // ✅ Save and download or return
  const pdfBytes = await pdfDoc.save();
  if (isDownload) {
    downloadPDF(pdfBytes, name);
  }

  return await pdfDoc.saveAsBase64();
}
