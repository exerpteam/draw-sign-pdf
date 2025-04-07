<template>
  <div>
    <DrawSignPdf :pdfData="pdfData" :signatureData="signatureData" @finish="getSignedData"
      :translations="translations" />
  </div>
</template>
<script setup>
import { pdfData, signatureData } from "./pdfData";
import DrawSignPdf from "draw-sign-pdf";

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

const getSignedData = (signedDocumentData) => {
  const imageData = 'data:image/png;base64, ' + encodeURI(signedDocumentData.signatureImage.data);
  const pdfData = signedDocumentData.signedDocument.data;
  const fullData = 'data:application/pdf;base64, ' + encodeURI(pdfData);
  let pdfWindow = window.open("")
  pdfWindow.document.write(
    "<img src='" + imageData + "'/> <br/>" +
    "<iframe width='100%' height='100%' src='" + fullData + "'></iframe>"
  );

}
</script>
<style global>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
