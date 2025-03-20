<template>
  <!-- Modal -->
  <div
    v-if="isOpenConfirm"
    id="modelConfirm"
    class="fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-900 bg-opacity-60 px-4"
  >
    <DialogBox
      :translations="getTranslation"
      :type="isConfirmOrWarning"
      @cancel="closeModal"
      @finish="confirmSave"
    />
  </div>
  <!-- Modal end -->

  <div>
    <main class="flex min-h-screen flex-col items-center bg-gray-100 py-5">
      <div
        class="left-0 right-0 top-0 z-10 flex h-12 items-center justify-center"
      >
        <button
          @click="onAddDrawing"
          class="btn-positive ml-3 mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4"
          data-cy="update-sign"
        >
          {{ getTranslation.updateSign }}
        </button>
        <button
          @click="openModal"
          class="btn-positive mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4"
          :class="{
            'cursor-not-allowed': pages.length === 0 || saving || !pdfFile,
            'bg-blue-700': pages.length === 0 || saving || !pdfFile,
          }"
          data-cy="save-sign"
        >
          {{ saving ? getTranslation.saving : getTranslation.save }}
        </button>
      </div>
      <div
        class="sign-drawing-canvas fixed left-0 right-0 top-0 z-10 items-center justify-center border-b border-gray-300 bg-white shadow-lg"
        style="height: 200px; z-index: 60; width: 100%"
        v-if="addingDrawing"
        data-cy="sign-drawing-canvas"
      >
        <DrawingCanvas
          @finish="onFinishDrawing"
          @cancel="addingDrawing = false"
          :translations="getTranslation"
        />
      </div>
      <div class="w-full" v-if="pages.length">
        <div
          v-for="(page, pIndex) in pages"
          :key="pIndex"
          class="flex w-full flex-col items-center overflow-hidden p-5"
          @mousedown="selectPage(pIndex)"
          @touchstart="selectPage(pIndex)"
          :data-cy="'page-' + pIndex"
        >
          <div
            class="relative shadow-lg"
            :class="{ 'shadow-outline': pIndex === selectedPageIndex }"
          >
            <PDFPage @measure="(e: any) => onMeasure(e, pIndex)" :page="page" />
            <div
              class="absolute left-0 top-0 origin-top-left transform"
              :style="{
                transform: `scale(${pagesScale[pIndex].scale})`,
                touchAction: 'none',
              }"
            >
              <div v-for="object in allObjects[pIndex]" :key="object.id">
                <DrawingSignature
                  v-if="object.type === 'drawing'"
                  @update="(e: any) => updateObject(object.id, e)"
                  @delete="() => deleteObject(object.id)"
                  :path="object.path"
                  :x="object.x"
                  :y="object.y"
                  :width="object.width"
                  :height="object.height"
                  :originWidth="object.originWidth"
                  :originHeight="object.originHeight"
                  :pageScale="pagesScale[pIndex]?.scale"
                  :data-cy="'sign-pos-' + object.id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full flex-grow items-center justify-center" v-else>
        <span class="text-3xl font-bold text-gray-500">{{
          getTranslation.pdfLoading
        }}</span>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import PDFPage from "./components/PDFPage.vue";
import DrawingSignature from "./components/DrawingSignature.vue";
import DialogBox from "./components/DialogBox.vue";
import DrawingCanvas from "./components/DrawingCanvas.vue";
import prepareAssets from "./utils/prepareAssets";
import { getAsset } from "./utils/prepareAssets";

import {
  DrawingObject,
  DrawingPayload,
  PdfSignatureData,
} from "./utils/pdfTypes";
import { readAsPDF, ggID } from "./utils/asyncReader";
import { save } from "./utils/PDF";

export default {
  name: "DrawSignPdf",
  components: {
    PDFPage,
    DrawingCanvas,
    DrawingSignature,
    DialogBox,
  },
  props: {
    pdfData: String,
    signatureData: Array as () => PdfSignatureData[],
    isDownload: {
      type: Boolean,
      default: false,
    },
    finish: Function,
    translations: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getTranslation() {
      const defaultTranslation = {
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
        warningDesc:
          "The required signature is missing. Please sign to continue",
        warningClose: "Close",
        pdfLoading: "PDF will load here",
      };

      return { ...defaultTranslation, ...this.translations };
    },
  },
  emits: ["finish"],
  setup(
    props: Readonly<{ [key: string]: any }>,
    { emit }: { emit: (event: string, ...args: any[]) => void }
  ) {
    // Your reactive variables and methods
    const genID = ggID();
    const pdfFile = ref<File | null>(null);
    const pdfName = ref("");
    const pages = ref<Promise<any>[]>([]);
    const pagesScale = ref<any[]>([]);
    const allObjects = ref<any[]>([]);
    const currentFont = ref("Times-Roman");
    const focusId = ref(null);
    const selectedPageIndex = ref(-1);
    const saving = ref(false);
    const addingDrawing = ref(false);
    const signatureImageData = ref("");
    const signedDocument = ref<{ data: string; type: string }>({
      data: "",
      type: "application/pdf",
    });
    const isOpenConfirm = ref(false);
    const isConfirmOrWarning = ref("warning");

    onMounted(async () => {
      try {
        getAsset("pdfjsLib");
        selectedPageIndex.value = 0;
        prepareAssets();
        await addPDF(props.pdfData, "string");
        onAddDrawing();
        document.addEventListener("keydown", handleEscapeKey);
      } catch (e) {}
    });

    onBeforeUnmount(() => {
      document.addEventListener("keydown", handleEscapeKey);
    });

    const onUploadPDF = async (e: any) => {
      const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
      const file = files[0];
      if (!file || file.type !== "application/pdf") return;
      selectedPageIndex.value = -1;
      try {
        await addPDF(file, "arrayBuffer");
        selectedPageIndex.value = 0;
      } catch (e) {}
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
        throw e;
      }
    };

    const onFinishDrawing = async (e: any) => {
      signatureImageData.value = e.signatureImageData;

      const { originWidth, originHeight, path } = e;
      await addDrawing(originWidth, originHeight, path);
      addingDrawing.value = false;
    };

    const onAddDrawing = () => {
      if (selectedPageIndex.value >= 0) {
        addingDrawing.value = true;
      }
    };

    const addDrawing = (
      originWidth: number,
      originHeight: number,
      path: string
    ) => {
      allObjects.value = Array(allObjects.value.length).fill([]);
      props.signatureData?.forEach((signData: PdfSignatureData) => {
        const id = genID();

        const width = cmToPx(signData.width);
        const height = cmToPx(signData.height);

        // Calculate the scale to fit the drawing within the predefined square
        const scaleX = width / originWidth;
        const scaleY = height / originHeight;
        const finalScale = Math.min(scaleX, scaleY);
        const object: DrawingObject = {
          id,
          path,
          type: "drawing",
          x: cmToPx(signData.left),
          y: cmToPx(signData.top),
          originWidth,
          originHeight,
          width,
          height,
          scale: finalScale,
        };

        // Append to the specific page rather than resetting all pages
        const pageIndex = signData.page - 1;
        // Ensure the page exists in allObjects
        if (allObjects.value[pageIndex]) {
          allObjects.value[pageIndex] = [
            ...allObjects.value[pageIndex],
            object,
          ];
        }
      });
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
      const pointsPerInch = 72;
      const centimetersPerInch = 2.54;
      return (cm * pointsPerInch) / centimetersPerInch;
    };

    const savePDF = async () => {
      if (!pdfFile.value || saving.value || !pages.value.length) return;
      saving.value = true;
      try {
        const pdfData = await save(
          pdfFile.value,
          allObjects.value,
          pdfName.value,
          props.isDownload
        );

        signedDocument.value = { type: "application/pdf", data: pdfData };

        emit("finish", {
          signedDocument: signedDocument.value,
          signatureImage: signatureImageData.value,
        });
      } catch (e) {
      } finally {
        saving.value = false;
      }
    };

    const openModal = () => {
      if (signatureImageData.value !== "") {
        isConfirmOrWarning.value = "confirm";
      } else {
        isConfirmOrWarning.value = "warning";
      }
      isOpenConfirm.value = true;
      document.body.classList.add("overflow-y-hidden");
    };

    const closeModal = () => {
      isOpenConfirm.value = false;
      document.body.classList.remove("overflow-y-hidden");
    };

    const confirmSave = () => {
      savePDF();
      closeModal();
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        closeModal();
      }
    };

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
      confirmSave,
      isConfirmOrWarning,
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
.sign-drawing-canvas {
  width: 100% !important;
  z-index: 60 !important;
}
</style>
