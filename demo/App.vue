<template>
  <div>
    <DrawSignPdf :pdfData="pdfData" :signatureData="signatureData" :isDownload="false"
      @finish="getSignedData" />
  </div>
</template>
<script setup>
import { pdfData, signatureData } from "./pdfData";
import DrawSignPdf from "draw-sign-pdf";

const getSignedData = (SignedDocumentData) => {
  console.log(SignedDocumentData, "SignedDocumentData");
}
</script>
<style global>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
