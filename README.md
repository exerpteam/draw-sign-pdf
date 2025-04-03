# Note
For updating the package with new changes we need to do the following :
  1. npm build to create dist files with changes
  2. update the version in package.json
  3. Merge and add the new commit hash to the project that uses this
  4. npm install
     
# draw-sign-pdf
A description of your new library.

# How to run TEST and use In Webapps

Install package
```
yarn 
````
Link package before run 
```
yarn link
cd demo 
yarn link 'draw-sign-pdf'
cd ../
```

Run Demo
```
yarn build
yarn dev
```

You can see the components imported in the App.vue file under the demo folder.

If you want to add this package in any other project locally the use yarn linking 
```
yarn link 'draw-sign-pdf'
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

## License

MIT © 
