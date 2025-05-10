import type { App, Plugin } from "vue";
import { DrawSignPdf } from "./main";
import { initializePdfjs } from "./utils/pdfSetup";

// Initialize PDF.js
initializePdfjs();

const install = (app: App) => {
  app.component(DrawSignPdf.name || 'DrawSignPdf', DrawSignPdf);
};

// DrawSignPdf.install = install;
(DrawSignPdf as any).install = install;

// Export types
export * from "./utils/pdfTypes";
export { DrawSignPdf };
export default DrawSignPdf as unknown as Plugin;
