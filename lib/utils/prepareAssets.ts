/**
 * Asset Management Utility
 * 
 * This module handles the loading of external JavaScript libraries needed by the package,
 * providing a clean API for accessing them while avoiding global namespace pollution.
 */
import { ref, Ref } from "vue";

// Configuration that can be set by package consumers
interface AssetConfig {
  /** Whether to expose libraries to global window object (default: false) */
  exposeGlobally?: boolean;
}

let config: AssetConfig = {
  exposeGlobally: false
};

/**
 * Configure how assets are loaded and managed
 * @param options Configuration options for asset loading
 */
export function configureAssets(options: AssetConfig): void {
  config = { ...config, ...options };
}

interface Script {
  /** Name of the script/library */
  name: string;
  /** CDN URL for the script */
  src: string;
  /** Module export name if different from script name */
  exportName?: string;
}

// Library definitions with CDN URLs
const scripts: Script[] = [
  {
    name: "pdfjsLib",
    src: "https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.min.js",
    exportName: "pdfjsLib"
  },
  {
    name: "PDFLib",
    src: "https://unpkg.com/pdf-lib@1.4.0/dist/pdf-lib.min.js",
    exportName: "PDFLib"
  },
  {
    name: "download",
    src: "https://unpkg.com/downloadjs@1.4.7",
    exportName: "download"
  }
];

interface Asset {
  [key: string]: Ref<unknown> | Promise<unknown>;
}

// Store of loaded assets to prevent duplicate loading
const assets: Asset = {};

/**
 * Get a reference to a loaded library
 * @param name Name of the library to get
 * @returns Reference to the library or promise that resolves to the reference
 * @throws Error if the library does not exist in the scripts list
 */
export function getAsset(name: string): Ref<any> | Promise<any> {
  if (assets[name]) return assets[name] as Ref<unknown>;
  const script = scripts.find((s) => s.name === name);
  if (!script) throw new Error(`Script ${name} does not exist.`);
  return prepareAsset(script);
}

/**
 * Load a script and store a reference to its exported functionality
 * @param script Script definition object
 * @returns Reference to the loaded library or promise that resolves to the reference
 */
export function prepareAsset({
  name,
  src,
  exportName = name
}: Script): Ref<unknown> | Promise<unknown> {
  // Return existing asset if already loaded or loading
  if (assets[name]) return assets[name] as Ref<unknown>;
  
  const scriptRef = ref<unknown | null>(null);
  
  // Create and store the promise to handle parallel loading requests
  const scriptPromise = new Promise((resolve, reject) => {
    const scriptElem = document.createElement("script");
    scriptElem.src = src;
    
    scriptElem.onload = () => {
      try {
        // Get the library from window but don't keep it there if not configured to
        const lib = window[exportName as keyof Window];
        
        // Only store in our scriptRef, remove from window unless configured to expose globally
        if (!config.exposeGlobally && exportName in window) {
          scriptRef.value = lib;
          // Create a clean copy and remove from window
          const libCopy = { ...lib };
          // @ts-ignore - We know this property exists because we just accessed it
          delete window[exportName];
          scriptRef.value = libCopy;
        } else {
          scriptRef.value = lib;
        }
        
        resolve(scriptRef);
      } catch (error) {
        const loadError = new Error(`Error accessing library ${name}: ${error}`);
        console.error(loadError);
        reject(loadError);
      }
    };
    
    scriptElem.onerror = () => {
      const error = new Error(`Failed to load script: ${name}`);
      console.error(error);
      reject(error);
    };
    
    document.body.appendChild(scriptElem);
  });
  
  // Store the promise for future reference
  assets[name] = scriptPromise;
  
  return scriptPromise;
}

/**
 * Preload all defined scripts
 * This can be called early in the application lifecycle to ensure
 * libraries are available when needed
 */
export default function prepareAssets() {
  scripts.forEach(prepareAsset);
}
