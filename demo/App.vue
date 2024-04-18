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
  console.log(SignedDocumentData, "SignedDocumentData");
}
</script>
<style global>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
