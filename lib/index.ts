import type { App, Plugin } from "vue";
import { DrawSignPdf } from "./main";
import { getAsset } from "./utils/prepareAssets";

getAsset("pdfjsLib");

const install = (app: App) => {
  app.component(DrawSignPdf.name, DrawSignPdf);
};

// DrawSignPdf.install = install;
(DrawSignPdf as any).install = install;

export { DrawSignPdf };
export default DrawSignPdf as unknown as Plugin;
