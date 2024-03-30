<template>
  <div>
    <DrawSignPdf :pdfData="pdfData" :signatureData="signatureData"></DrawSignPdf>
  </div>
</template>
<script setup>
import { pdfData, signatureData } from "./pdfData";
import DrawSignPdf from "draw-sign-pdf";
</script>
<style global>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
