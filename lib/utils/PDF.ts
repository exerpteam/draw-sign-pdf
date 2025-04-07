import { getAsset } from "./prepareAssets";
import { PDFDocument, pushGraphicsState, setLineCap, popGraphicsState, setLineJoin, LineCapStyle, LineJoinStyle } from 'pdf-lib';

export async function save(
  pdfFile: Blob,
  objects: any,
  name: string
) {
  let pdfDoc;
  try {
    // Load the PDF document directly
    pdfDoc = await PDFDocument.load(await pdfFile.arrayBuffer());
  } catch (e) {
    throw e;
  }
  
  const pagesProcesses = pdfDoc
    .getPages()
    .map(async (page: any, pageIndex: number) => {
      const pageObjects = objects[pageIndex];
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

          return () => {
            page.pushOperators(
              pushGraphicsState(),
              setLineCap(LineCapStyle.Round),
              setLineJoin(LineJoinStyle.Round)
            );

            page.drawSvgPath(path, {
              borderWidth: 5,
              scale,
              x: centeredX,
              y: pageHeight - centeredY,
            });
            page.pushOperators(popGraphicsState());
          };
        }
      });
      // embed objects in order
      const drawProcesses = await Promise.all(embedProcesses);
      drawProcesses.forEach((p) => p());
    });
  
  await Promise.all(pagesProcesses);
  
  try {
    await pdfDoc.save();
    return await pdfDoc.saveAsBase64();
  } catch (e) {
    throw e;
  }
}
