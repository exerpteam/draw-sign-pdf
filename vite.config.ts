import { defineConfig, type UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

const isDemo = process.env.NODE_ENV === 'demo';

const resolvePath = (p: string) => resolve(__dirname, p);

const demoConfig: UserConfigExport = {
  root: resolvePath('demo'),
  base: '/',
  plugins: [vue()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      'draw-sign-pdf': resolvePath('lib'),
    },
  },
  optimizeDeps: {
    include: ['pdfjs-dist', 'pdf-lib', 'downloadjs'],
  },
};

const prodConfig: UserConfigExport = {
  root: resolvePath('.'),
  plugins: [
    vue(),
    dts({
      include: ['lib/**/*.ts', 'lib/**/*.vue'],
      outDir: 'dist',
      staticImport: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: resolvePath('lib/index.ts'),
      name: 'DrawSignPdf',
      fileName: (format) => `draw-sign-pdf.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'pdfjs-dist', 'pdf-lib', 'downloadjs'],
      output: {
        exports: 'named' as const, // 👈 key fix here
        globals: {
          vue: 'Vue',
          'pdfjs-dist': 'pdfjsLib',
          'pdf-lib': 'PDFLib',
          'downloadjs': 'download',
        },
      },
    },
  },
  optimizeDeps: {
    include: ['pdfjs-dist', 'pdf-lib', 'downloadjs'],
  },
};

export default defineConfig(isDemo ? demoConfig : prodConfig);
