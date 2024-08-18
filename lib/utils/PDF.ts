import { getAsset } from './prepareAssets';

export async function save(pdfFile: Blob, objects: any, name: string, isDownload = false) {
  const PDFLib = await getAsset('PDFLib');

  const download = await getAsset('download');
  let pdfDoc;
  try {
    pdfDoc = await PDFLib.value.PDFDocument.load(pdfFile);
  } catch (e) {
    throw e;
  }
  const pagesProcesses = pdfDoc.getPages().map(async (page: any, pageIndex: number) => {
    const pageObjects = objects[pageIndex];
    // 'y' starts from bottom in PDFLib, use this to calculate y
    const pageHeight = page.getHeight();
    const embedProcesses = pageObjects.map(async (object: any) => {
      if (object.type === 'drawing') {
        const { x, y, path, scale } = object;
        const { pushGraphicsState, setLineCap, popGraphicsState, setLineJoin, LineCapStyle, LineJoinStyle } = PDFLib.value;
        return () => {
          page.pushOperators(pushGraphicsState(), setLineCap(LineCapStyle.Round), setLineJoin(LineJoinStyle.Round));
          page.drawSvgPath(path, {
            borderWidth: 5,
            scale,
            x,
            y: pageHeight - y,
          });
          page.pushOperators(popGraphicsState());
        };
      }
    });
    // embed objects in order
    const drawProcesses = await Promise.all(embedProcesses);
    drawProcesses.forEach(p => p());
  });
  await Promise.all(pagesProcesses);
  try {
    const pdfBytes = await pdfDoc.save();
    if (isDownload) {
      download.value(pdfBytes, name, "application/pdf");
    }
    return await pdfDoc.saveAsBase64();
  } catch (e) {
    throw e;
  }
}
