# draw-sign-pdf
A description of your new library.

# How to run TEST and use In Webapps

Install package
```
npm 
```
Link package before run 
```
npm link
cd demo 
npm link 'draw-sign-pdf'
cd ../
```

Run Demo
```
npm run build
npm run dev
```

You can see the components imported in the App.vue file under the demo folder.

If you want to add this package in any other project locally the use yarn linking 
```
npm link 'draw-sign-pdf'
```

use the below methods to import 
``` vue
<template>
  <div>
    <DrawSignPdf :pdfData="pdfData" :signatureData="signatureData" :isDownload="false" @finish="getSignedData" :translations="translations" />
  </div>
</template>
<script setup>
import { Options, Vue } from 'vue-class-component';
import DrawSignPdf from "draw-sign-pdf";
import { pdfData, signatureData } from "./pdfData";

//optional
const translations = {
  updateSign: "Update Signature",
  save: "Save",
  saving: "Saving",
  drawLabel: "Draw the signature here",
  drawDone: "Done",
  additionalTextField: "", // Appears near Done button while signing
  drawCancel: "Cancel",
  confirmBoxTitle: "Confirm Saving",
  confirmBoxDesc: "Are you sure you want to save the signed document?",
  confirmBoxClose: "Close",
  confirmBoxSaveChanges: "Save Changes",
  pdfLoading: "PDF will load here"
}

@Options({
  components: {
    DrawSignPdf,
  },
})

const getSignedData = (SignedDocumentData) => {
  console.log(SignedDocumentData, "SignedDocumentData");
}
</script>
<style scoped>
</style>

```


## Install

```bash
$ npm install draw-sign-pdf --save
# or...
$ yarn add draw-sign-pdf
```

### Installing from Git (for internal/corporate use)

```bash
# Using a specific version tag
$ npm install github:yourcompany/draw-sign-pdf#v1.0.7
# or...
$ yarn add github:yourcompany/draw-sign-pdf#v1.0.7
```

_or_

Use the UMD build from [Unpkg](https://unpkg.com/draw-sign-pdf), available as `MyLib` in the global scope.

```html
<script src="/vendor/vue.js" />
<script src="https://unpkg.com/draw-sign-pdf" />
```

### Globally

Import and register the module as a plugin.

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import MyLib from 'draw-sign-pdf'

createApp(App).use(MyLib).mount('#app')
```

### Per-component

```javascript
import { MyLib } from 'draw-sign-pdf'

export default {
  components: { MyLib },
  setup() {
    ...
  },
}
```

## Usage

Usage instructions here.

## Configuring Asset Paths

This package uses CDN URLs for its dependencies by default, so no additional setup is required in most cases. The following libraries are loaded automatically:

- PDF.js from unpkg.com (pdfjs-dist@2.3.200)
- PDF-Lib from unpkg.com (pdf-lib@1.4.0)

### Customizing Library Sources

If you need to customize where libraries are loaded from, you have the following options:

#### Option 1: Use Local Files

If you prefer to use local files (for offline use or compliance reasons):

```javascript
import { configureAssets } from 'draw-sign-pdf/lib/utils/prepareAssets';

// Disable CDN usage and use local files instead
configureAssets({
  useCdn: false,
  // Optionally specify where your local files are located
  basePath: '/assets/vendor/pdf-libs'
});

// Then copy the library files to your specified location
```

#### Option 2: Custom CDN or Internal Hosting

If you want to use your own CDN or internal hosting:

```javascript
import { configureAssets } from 'draw-sign-pdf/lib/utils/prepareAssets';

// Disable the default CDN
configureAssets({
  useCdn: false,
  // Use your custom CDN base path
  basePath: 'https://cdn.yourdomain.com/pdf-libraries'
});
```

### Global Namespace Setting

By default, libraries are loaded in a way that doesn't pollute the global window object. If you need to access them globally:

```javascript
import { configureAssets } from 'draw-sign-pdf/lib/utils/prepareAssets';

configureAssets({
  exposeGlobally: true
});
```

## License

MIT © 

### Versioning

We use Git tags for versioning. To create a new version:

#### Method 1: Using npm scripts (locally)

```bash
# Update the version, create a tag, and push both
npm run version:patch  # For patch version bump (1.0.6 -> 1.0.7)
# or
npm run version:minor  # For minor version bump (1.0.6 -> 1.1.0)
# or
npm run version:major  # For major version bump (1.0.6 -> 2.0.0)
```

#### Method 2: Using GitHub Actions (recommended for production)

1. Go to the GitHub repository
2. Navigate to Actions tab
3. Select "Version Checks" workflow
4. Click "Run workflow"
5. Select the version type (patch, minor, major)
6. Click "Run workflow"

This method ensures all tests pass before creating a new version.

When the package is installed, it will automatically build thanks to the prepare script.

### For package maintainers

The package now uses the `prepare` npm script to automatically build the package when it's installed. This means:

1. You should NOT commit the `dist/` directory to Git
2. When someone installs the package from Git, it will build automatically
3. Always create Git tags after updating the version in package.json

### Consuming this Package in Other Projects

#### In package.json

```json
"dependencies": {
  "draw-sign-pdf": "github:yourcompany/draw-sign-pdf#v1.0.7"
}
```

#### Install Command

```bash
# Using a specific version tag
npm install github:yourcompany/draw-sign-pdf#v1.0.7
```

#### Updating to a New Version

```bash
# Update to the latest version
npm install github:yourcompany/draw-sign-pdf#v1.0.8
```

The package will automatically build during installation. You don't need to manually copy any build files.

## Technical Details

### Advanced Configuration

The package provides several options for advanced configuration:

```javascript
import { configureAssets } from 'draw-sign-pdf/lib/utils/prepareAssets';

// Configure asset loading
configureAssets({
  // Set the base path where your library assets are located
  basePath: '/assets/library',
  
  // Control whether libraries are exposed globally (default: false)
  // When false, libraries are loaded without polluting the global namespace
  exposeGlobally: false
});
```

### Package Features

This package has been optimized for modern JavaScript environments:

- **Tree-shaking friendly**: The package is marked as side-effect free for better tree-shaking
- **Multiple module formats**: Supports ESM, CommonJS, and UMD to work in any environment
- **TypeScript definitions**: Full TypeScript support with bundled type definitions
- **No global namespace pollution**: Libraries are loaded in a contained manner
- **Vue as peer dependency**: Avoids version conflicts with your project's Vue version
- **Source maps**: Included for easier debugging

### Package Structure

The build output is organized into a clean directory structure:

```
dist/
  ├── es/      - ES modules (best for bundlers with tree-shaking)
  ├── cjs/     - CommonJS modules (for Node.js)
  ├── umd/     - UMD build (for direct browser usage)
  └── types/   - TypeScript declaration files
```
