<template>
  <!-- Modal -->
  <div v-if="isOpenConfirm" id="modelConfirm"
    class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
    <div id="headlessui-dialog-overlay-16" aria-hidden="true" data-headlessui-state="open"
      class="fixed inset-0 bg-gray-500 opacity-30"></div>
    <div class="confirm-modal relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md mt-40">
      <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
        <div class="flex justify-between items-center py-3 px-4 border-b">
          <h3 class="font-bold text-gray-800">
            Confirm Saving
          </h3>
          <button @click="closeModal" type="button"
            class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
            <span class="sr-only">Close</span>
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-4 overflow-y-auto">
          <p class="mt-1 text-gray-800">
            Are you sure you want to save the signed document?
          </p>
        </div>
        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
          <button @click="closeModal" type="button" data-cy="close-confirm"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none btn-negative">
            Close
          </button>
          <button @click="confirmSave" type="button" data-cy="confirm-save"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ml-2 btn-positive">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <main class="flex min-h-screen flex-col items-center bg-gray-100 py-5">
      <div class="left-0 right-0 top-0 z-10 flex h-12 items-center justify-center">
        <button @click="onAddDrawing"
          class="mr-3 ml-3 w-60 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4 btn-positive"
          data-cy="update-sign">
          Update Signature
        </button>
        <button @click="openModal"
          class="mr-3 w-20 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4 btn-positive"
          :class="{
    'cursor-not-allowed': pages.length === 0 || saving || !pdfFile,
    'bg-blue-700': pages.length === 0 || saving || !pdfFile,
  }" data-cy="save-sign">
          {{ saving ? "Saving" : "Save" }}
        </button>
      </div>
      <div
        class="fixed left-0 right-0 top-0 z-10 border-b border-gray-300 bg-white shadow-lg items-center justify-center"
        style="height: 200px" v-if="addingDrawing" data-cy="sign-drawing-canvas">
        <DrawingCanvas @finish="onFinishDrawing" @cancel="addingDrawing = false" />
      </div>
      <div class="w-full" v-if="pages.length">
        <div v-for="(page, pIndex) in pages" :key="pIndex" class="flex w-full flex-col items-center overflow-hidden p-5"
          @mousedown="selectPage(pIndex)" @touchstart="selectPage(pIndex)" :data-cy="'page-' + pIndex">
          <div class="relative shadow-lg" :class="{ 'shadow-outline': pIndex === selectedPageIndex }">
            <PDFPage @measure="(e: any) => onMeasure(e, pIndex)" :page="page" />
            <div class="absolute left-0 top-0 origin-top-left transform" :style="{
    transform: `scale(${pagesScale[pIndex].scale})`,
    touchAction: 'none',
  }">
              <div v-for="object in allObjects[pIndex]" :key="object.id">
                <DrawingSignature v-if="object.type === 'drawing'" @update="(e: any) => updateObject(object.id, e)"
                  @delete="() => deleteObject(object.id)" :path="object.path" :x="object.x" :y="object.y"
                  :width="object.width" :originWidth="object.originWidth" :originHeight="object.originHeight"
                  :pageScale="pagesScale[pIndex]?.scale" :data-cy="'sign-pos-' + object.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full flex-grow items-center justify-center" v-else>
        <span class="text-3xl font-bold text-gray-500">PDF Load here</span>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import PDFPage from "./components/PDFPage.vue";
import DrawingSignature from "./components/DrawingSignature.vue";
import DrawingCanvas from "./components/DrawingCanvas.vue";
import prepareAssets from "./utils/prepareAssets";
import { getAsset } from "./utils/prepareAssets";

import { DrawingObject, DrawingPayload, PdfSignatureData } from "./utils/pdfTypes";
import { readAsPDF, ggID } from "./utils/asyncReader";
import { save } from "./utils/PDF";

export default {
  name: "DrawSignPdf",
  components: {
    PDFPage,
    DrawingCanvas,
    DrawingSignature
  },
  props: {
    pdfData: String,
    signatureData: Array as () => PdfSignatureData[],
    isDownload: {
      type: Boolean,
      default: false
    },
    finish: Function
  },
  setup(props: Readonly<{ [key: string]: any }>, { emit }: { emit: (event: string, ...args: any[]) => void }) {
    // Your reactive variables and methods
    const genID = ggID();
    const pdfFile = ref<File | null>(null);
    const pdfName = ref('');
    const pages = ref<Promise<any>[]>([]);
    const pagesScale = ref<any[]>([]);
    const allObjects = ref<any[]>([]);
    const currentFont = ref("Times-Roman");
    const focusId = ref(null);
    const selectedPageIndex = ref(-1);
    const saving = ref(false);
    const addingDrawing = ref(false);
    const signatureImageData = ref('');
    const signedDocument = ref<{ data: string, type: string }>({ data: '', type: 'application/pdf' });
    const isOpenConfirm = ref(false);

    onMounted(async () => {
      try {
        getAsset("pdfjsLib");
        selectedPageIndex.value = 0;
        prepareAssets();
        await addPDF(props.pdfData, 'string');
        onAddDrawing();
        document.addEventListener('keydown', handleEscapeKey);
      } catch (e) {
        console.log(e);
      }
    });

    onBeforeUnmount(() => {
      document.addEventListener('keydown', handleEscapeKey);
    })

    const onUploadPDF = async (e: any) => {
      const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
      const file = files[0];
      if (!file || file.type !== "application/pdf") return;
      selectedPageIndex.value = -1;
      try {
        await addPDF(file, 'arrayBuffer');
        selectedPageIndex.value = 0;
      } catch (e) {
        console.log(e);
      }
    };

    const addPDF = async (file: any, type: string) => {
      try {
        const pdf = await readAsPDF(file, type);

        pdfName.value = file.name;
        pdfFile.value = file;
        const numPages = pdf.numPages;

        pages.value = Array.from({ length: numPages }).map(
          async (_, i) => await pdf.getPage(i + 1)
        );
        allObjects.value = Array(numPages).fill([]);
        pagesScale.value = Array(numPages).fill({ scale: 1 });
      } catch (e) {
        console.log("Failed to add pdf.");
        throw e;
      }
    };

    const onFinishDrawing = async (e: any) => {
      signatureImageData.value = e.signatureImageData;

      const { originWidth, originHeight, path } = e;
      let scale = 1;
      if (originWidth > 500) {
        scale = 500 / originWidth;
      }
      await addDrawing(originWidth, originHeight, path, scale);
      addingDrawing.value = false;
    };

    const onAddDrawing = () => {
      if (selectedPageIndex.value >= 0) {
        addingDrawing.value = true;
      }
    };

    const addDrawing = (originWidth: number, originHeight: number, path: string, scale = 1) => {
      allObjects.value = Array(allObjects.value.length).fill([]);
      props.signatureData?.forEach((signData: PdfSignatureData) => {
        const id = genID();
        scale = cmToPx(signData.width) / originWidth;
        const object: DrawingObject = {
          id,
          path,
          type: "drawing",
          x: cmToPx(signData.left),
          y: cmToPx(signData.top),
          originWidth,
          originHeight,
          width: cmToPx(signData.width),
          scale,
        };

        allObjects.value = allObjects.value.map((objects, pIndex) =>
          signData.page === pIndex + 1 ? [...objects, object] : objects
        );
      });

      // allObjects.value = allObjects.value.map((objects, pIndex) =>
      //   pIndex === selectedPageIndex.value ? [...objects, object] : objects
      // );
    };

    const selectPage = (index: number) => {
      selectedPageIndex.value = index;
    };

    const updateObject = (objectId: number, payload: DrawingPayload) => {
      allObjects.value = allObjects.value.map((objects, pIndex) =>
        pIndex == selectedPageIndex.value
          ? objects.map((object: DrawingObject) =>
            object.id === objectId ? { ...object, ...payload } : object
          )
          : objects
      );
    };

    const deleteObject = (objectId: number) => {
      allObjects.value = allObjects.value.map((objects, pIndex) =>
        pIndex == selectedPageIndex.value
          ? objects.filter((object: DrawingObject) => object.id !== objectId)
          : objects
      );
    };

    const onMeasure = (scale: number, i: number) => {
      pagesScale.value[i] = scale;
    };

    const cmToPx = (cm: number) => {
      const dpi = 96; // dots per inch
      const cpi = 2.54; // centimeters per inch
      const ppd = 1; // pixels per dot (default to 1 if undefined)
      return ((cm * dpi) / cpi) * ppd;
    };

    const savePDF = async () => {
      if (!pdfFile.value || saving.value || !pages.value.length) return;
      saving.value = true;
      try {
        const pdfData = await save(pdfFile.value, allObjects.value, pdfName.value, props.isDownload);

        signedDocument.value = { type: 'application/pdf', data: pdfData };

        emit("finish", {
          signedDocument: signedDocument.value,
          signatureImage: signatureImageData.value,
        });

      } catch (e) {
        console.log(e);
      } finally {
        saving.value = false;
      }
    };

    const openModal = () => {
      isOpenConfirm.value = true;
      document.body.classList.add('overflow-y-hidden');
    }
    const closeModal = () => {
      isOpenConfirm.value = false;
      document.body.classList.remove('overflow-y-hidden');
    }
    const confirmSave = () => {
      savePDF();
      closeModal();
    }
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        closeModal();
      }
    }

    return {
      genID,
      pdfFile,
      pdfName,
      pages,
      pagesScale,
      allObjects,
      currentFont,
      focusId,
      selectedPageIndex,
      saving,
      addingDrawing,
      isOpenConfirm,
      onUploadPDF,
      addPDF,
      onAddDrawing,
      addDrawing,
      selectPage,
      updateObject,
      deleteObject,
      onMeasure,
      savePDF,
      onFinishDrawing,
      openModal,
      closeModal,
      confirmSave
    };
  },
};
</script>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.shadow-outline {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

body.modal-active {
  overflow-x: hidden;
  overflow-y: visible !important;
}
</style>
