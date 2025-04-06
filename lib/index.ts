import type { App, Plugin } from "vue";
import DrawSignPdfComponent from "./DrawSignPdf.vue";
import { getAsset } from "./utils/prepareAssets";

// Initialize PDF.js
getAsset("pdfjsLib");

// Create a Vue plugin with the component
const DrawSignPdf = DrawSignPdfComponent as typeof DrawSignPdfComponent & { install: (app: App) => void };

// Add install method for Vue plugin usage
DrawSignPdf.install = (app: App) => {
  app.component('DrawSignPdf', DrawSignPdf);
};

// Export component and types
export { DrawSignPdf };
export default DrawSignPdf as unknown as Plugin;
