import type { App, Plugin } from "vue";
import DrawSignPdfComponent from "./DrawSignPdf.vue";

// Create a Vue plugin
const DrawSignPdf = DrawSignPdfComponent as typeof DrawSignPdfComponent & { install: (app: App) => void };

// Add install method for Vue plugin usage
DrawSignPdf.install = (app: App) => {
  app.component('DrawSignPdf', DrawSignPdf);
};

// Export both named and default export
export { DrawSignPdf };

// Default export as Vue plugin
export default DrawSignPdf;
