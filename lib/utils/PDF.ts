import { downloadPDF } from "./prepareAssets";
import { PDFDocument, rgb, LineCapStyle} from 'pdf-lib';

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

  // ✅ Embed drawings (signatures, etc.)
  const pages = pdfDoc.getPages();
  for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
    const page = pages[pageIndex];
    const pageHeight = page.getHeight();
    const pageObjects = objects[pageIndex] || [];

    for (const object of pageObjects) {
      if (object.type === "drawing") {
        const {
          x,
          y,
          path,
          originWidth,
          originHeight,
          width,
          height,
        } = object;
        
        // Derive separate scale factors
        const scaleX = width / originWidth;
        const scaleY = height / originHeight;
        
        // Use the smaller scale to preserve aspect ratio
        const scale = Math.min(scaleX, scaleY);
        
        // Recalculate actual drawn dimensions
        const scaledWidth = originWidth * scale;
        // Center drawing within target box
        const centeredX = x + (width - scaledWidth) / 2;
        
        page.drawSvgPath(path, {
          x: centeredX,
          y: pageHeight - y, // align bottom of signature to Vue's top position
          scale,
          borderWidth: 5,
          borderColor: rgb(0, 0, 0),
          borderLineCap: LineCapStyle.Round,
        });
      }
    }
  }

  // ✅ Save and download or return
  const pdfBytes = await pdfDoc.save();
  if (isDownload) {
    downloadPDF(pdfBytes, name);
  }

  return await pdfDoc.saveAsBase64();
}
