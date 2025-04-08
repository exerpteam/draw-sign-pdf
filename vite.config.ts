import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const isDemo = process.env.NODE_ENV === 'demo'

const resolvePath = (p: string) => resolve(__dirname, p)

const demoConfig: UserConfig = {
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
      'draw-sign-pdf': isDemo ? resolvePath('lib') : resolvePath('dist'),
    },
  },
}

const prodConfig: UserConfig = {
  root: resolvePath('lib'),
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: resolvePath('lib/index.ts'),
      name: 'DrawSignPdf',
      fileName: (format: string) => `draw-sign-pdf.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'pdfjs-dist'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'pdfjs-dist': 'pdfjsLib',
        },
      },
    },
  },
}

export default defineConfig(isDemo ? demoConfig : prodConfig)
