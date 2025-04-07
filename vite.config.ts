import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

const resolvePath = (str: string) => resolve(__dirname, str)

const isProd = process.env.NODE_ENV === 'production'

const devConfig = defineConfig({
  root: './demo',
  plugins: [vue()],
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'demo/index.html'),
      },
    },
  },
})

const prodConfig = defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['lib/**/*.ts', 'lib/**/*.vue'],
      outputDir: 'dist/types',
      beforeWriteFile: (filePath, content) => {
        // Ensure index.d.ts gets created properly
        return {
          filePath,
          content
        };
      }
    }),
  ],
  build: {
    lib: {
      entry: resolvePath("lib/index.ts"),
      name: "draw-sign-pdf",
      fileName: (format) => `draw-sign-pdf.${format}.js`,
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      external: ["vue"],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.js',
          preserveModules: true,
          preserveModulesRoot: 'lib',
          dir: 'dist/es',
          exports: 'named'
        },
        {
          format: 'cjs',
          entryFileNames: 'draw-sign-pdf.cjs.js',
          dir: 'dist/cjs',
          exports: 'named'
        },
        {
          format: 'umd',
          entryFileNames: 'draw-sign-pdf.umd.js',
          name: 'DrawSignPdf',
          globals: {
            vue: 'Vue',
          },
          dir: 'dist/umd',
          exports: 'named',
          inlineDynamicImports: true
        },
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolvePath('lib'),
    },
  },
});

export default isProd ? prodConfig : devConfig
