<template>
  <div>
    <DrawSignPdf :pdfData="pdfData" :signatureData="signatureData" :isDownload="false" @finish="getSignedData"
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
  drawCancel: "Cancel",
  confirmBoxTitle: "Confirm Saving",
  confirmBoxDesc: "Are you sure you want to save the signed document?",
  confirmBoxClose: "Close",
  confirmBoxSaveChanges: "Save Changes",
  pdfLoading: "PDF will load here"
}

const getSignedData = (SignedDocumentData) => {
  const pdfData = SignedDocumentData.signedDocument.data;
  const fullData = 'data:application/pdf;base64, ' + encodeURI(pdfData);
  let pdfWindow = window.open("")
  pdfWindow.document.write(
    "<iframe width='100%' height='100%' src='" + fullData + "'></iframe>"
  );

}
</script>
<style global>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
