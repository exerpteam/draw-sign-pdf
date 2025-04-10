<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Draw Sign PDF Demo</h1>
    <div class="border rounded-lg p-4">
      <DrawSignPdf 
        :pdfData="pdfData" 
        :signatureData="signatureData" 
        :isDownload="false" 
        @finish="getSignedData"
        :translations="translations" 
        :enableZoom="true" @onPDFRendered="pdfRendered"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DrawSignPdf from 'draw-sign-pdf';
import 'draw-sign-pdf/dist/style.css';
import { PdfSignatureData } from 'draw-sign-pdf';
import { pdfData, signatureData } from "./pdfData";

const translations = {
  updateSign: "Update Signature",
  save: "Save",
  saving: "Saving",
  drawLabel: "Draw the signature here",
  drawDone: "Done",
  additionalTextField: "",
  drawCancel: "Cancel",
  confirmBoxTitle: "Confirm Saving",
  confirmBoxDesc: "Are you sure you want to save the signed document?",
  confirmBoxClose: "Close",
  confirmBoxSaveChanges: "Save Changes",
  pdfLoading: "PDF will load here"
}

const getSignedData = (signedDocumentData: PdfSignatureData) => {
  try {
    const imageData = 'data:image/png;base64, ' + encodeURI(signedDocumentData.signatureImage.data);
    const pdfData = signedDocumentData.signedDocument.data;
    const fullData = 'data:application/pdf;base64, ' + encodeURI(pdfData);
    let pdfWindow = window.open("");
    if (pdfWindow) {
      pdfWindow.document.write(
        "<img src='" + imageData + "'/> <br/>" +
        "<iframe width='100%' height='100%' src='" + fullData + "'></iframe>"
      );
    }
  } catch (error) {
    console.error('Error processing signed document:', error);
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
