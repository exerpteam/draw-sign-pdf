# PDF Signature Drawing Component

A Vue.js component that allows users to draw signatures on PDF documents. This component provides a user-friendly interface for adding signatures to PDF files and saving the modified documents.

## Features

- Load and display PDF documents
- Draw signatures directly on PDF pages
- Support for multiple pages
- Responsive design
- Customizable translations
- Download or save signed PDFs
- Zoom/Zoom out PDFa

## Installation

### Using GitHub Releases

Add the package to your project's `package.json` with a specific version tag:

```json
{
  "dependencies": {
    "draw-sign-pdf": "github:your-username/draw-sign-pdf#v1.0.0"
  }
}
```

Then install the dependencies:

```bash
npm install
```

Or using yarn:

```bash
yarn add github:your-username/draw-sign-pdf#v1.0.0
```

### Using Latest Release

To use the latest release:

```json
{
  "dependencies": {
    "draw-sign-pdf": "github:your-username/draw-sign-pdf"
  }
}
```

```bash
npm install github:your-username/draw-sign-pdf
# or
yarn add github:your-username/draw-sign-pdf
```

### Using a Specific Branch

To use a specific branch:

```json
{
  "dependencies": {
    "draw-sign-pdf": "github:your-username/draw-sign-pdf#branch-name"
  }
}
```

```bash
npm install github:your-username/draw-sign-pdf#branch-name
# or
yarn add github:your-username/draw-sign-pdf#branch-name
```

Note: Replace `your-username` with the actual GitHub username and `v1.0.0` with the desired version tag.

## Usage

```vue
<template>
  <DrawSignPdf
    :pdfData="pdfBase64String"
    :signatureData="[]"
    :isDownload="true"
    :translations="customTranslations"
    @finish="handleFinish"
    :enableZoom="true" 
    @onPDFRendered="pdfRendered"
  />
</template>

<script setup>
import { DrawSignPdf } from 'draw-sign-pdf';

const pdfBase64String = '...'; // Your PDF as base64 string
const customTranslations = {
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
  warningTitle: "Missing Signature",
  warningDesc: "The required signature is missing. Please sign to continue",
  warningClose: "Close",
  pdfLoading: "PDF will load here",
  additionalTextField: "",
};

const handleFinish = (data) => {
  console.log('Signed document:', data.signedDocument);
  console.log('Signature image:', data.signatureImage);
};
</script>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| pdfData | String | Yes | - | PDF file as base64 string |
| signatureData | Array | No | [] | Array of signature data objects |
| isDownload | Boolean | No | false | Whether to download the PDF after signing |
| translations | Object | No | {} | Custom translations for UI text |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| finish | { signedDocument: { type: string, data: string }, signatureImage: string } | Emitted when the PDF is saved, contains the signed PDF and signature image |

## Dependencies

- Vue.js
- pdf-lib
- pdfjs-dist

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Building

To build the component for production:

```bash
npm run build
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 

### Internal Release Process

1. **Update Version**:
   - Update the `version` field in `package.json` using semantic versioning (`MAJOR.MINOR.PATCH`).

2. **Build the Package**:
   ```bash
   npm run build