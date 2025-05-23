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
        class="left-0 right-0 top-0 z-10 flex items-center justify-center flex-col gap-2 py-2 bg-gray-100 sticky w-full"
        v-if="!addingDrawing"
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
            'cursor-not-allowed': pages.length === 0 || saving,
            'bg-blue-700': pages.length === 0 || saving,
          }"
          data-cy="save-sign"
        >
          {{ saving ? getTranslation.saving : getTranslation.save }}
        </button>
        <div v-if="enableZoom" class="mt-2 flex gap-2">
          <button @click="zoomPDF('out')" class="w-6" data-cy="pdf-zoom-out">
            <MagnifyingGlassMinusIcon />
          </button>
          <button @click="zoomPDF('in')" class="w-6" data-cy="pdf-zoom-in">
            <MagnifyingGlassPlusIcon />
          </button>
        </div>
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
        <div
          class="bg-gray-100 border-b border-gray-300 shadow-lg p-2 flex justify-center gap-2"
          v-if="enableZoom"
        >
          <button
            @click="zoomPDF('out')"
            class="w-6"
            data-cy="pdf-zoom-out-toolbar"
          >
            <MagnifyingGlassMinusIcon />
          </button>
          <button
            @click="zoomPDF('in')"
            class="w-6"
            data-cy="pdf-zoom-in-toolbar"
          >
            <MagnifyingGlassPlusIcon />
          </button>
        </div>
      </div>
      <div class="w-full" v-if="pages.length">
        <!-- adding zoomScale in key will rerender the PDF whenever it is changed by clicking the zoom buttons -->
        <div
          v-for="(page, pIndex) in pages"
          :key="pIndex + zoomScale"
          class="flex w-full flex-col items-center overflow-hidden p-5"
          @mousedown="selectPage(pIndex)"
          @touchstart="selectPage(pIndex)"
          :data-cy="'page-' + pIndex"
        >
          <div
            class="relative shadow-lg"
            :class="{ 'shadow-outline': pIndex === selectedPageIndex }"
          >
            <PDFPage
              @measure="(e: any) => onMeasure(e, pIndex)"
              :page="page"
              :zoomScale="zoomScale"
              @finishedRendering="() => renderFinished(pIndex)"
            />
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
                  :path="object.path"
                  :x="object.x"
                  :y="object.y"
                  :width="object.width"
                  :height="object.height"
                  :originWidth="object.originWidth"
                  :originHeight="object.originHeight"
                  :pageScale="pagesScale[pIndex]?.scale"
                  :data-cy="'sign-pos-' + object.id"
                  :zoomScale="zoomScale"
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
import { onBeforeUnmount, onMounted, ref, computed, markRaw } from "vue";
import type { PDFPageProxy } from "pdfjs-dist/types/src/display/api";
import PDFPage from "./components/PDFPage.vue";
import DrawingSignature from "./components/DrawingSignature.vue";
import DialogBox from "./components/DialogBox.vue";
import DrawingCanvas from "./components/DrawingCanvas.vue";
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/vue/16/solid";
import { initializePdfjs } from "./utils/pdfSetup";
import { readAsPDF, getPDFDocument } from "./utils/prepareAssets";

import {
  DrawingObject,
  DrawingPayload,
  PdfSignatureData,
} from "./utils/pdfTypes";
import { ggID } from "./utils/asyncReader";
import { save } from "./utils/PDF";

export default {
  name: "DrawSignPdf",
  components: {
    PDFPage,
    DrawingCanvas,
    DrawingSignature,
    DialogBox,
    MagnifyingGlassMinusIcon,
    MagnifyingGlassPlusIcon,
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
    enableZoom: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["finish", "onPDFRendered"],
  setup(props, { emit }) {
    const genID = ggID();
    const pdfFile = ref<File | null>(null);
    const pdfName = ref("");
    const pages = ref<PDFPageProxy[]>([]);
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
    type DialogBoxType = "warning" | "confirm";
    const isConfirmOrWarning = ref<DialogBoxType>("warning");

    const zoomScale = ref(1);
    const ZOOM_STEP = 0.25;
    const MIN_ZOOM_SCALE = 0.5;
    const MAX_ZOOM_SCALE = 3;
    const pageRenderStatus = ref<boolean[]>([]);

    const getTranslation = computed(() => {
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
        additionalTextField: "",
      };
      return { ...defaultTranslation, ...props.translations };
    });

    const onMountedCallback = async () => {
      try {
        initializePdfjs();
        if (!props.pdfData) return;
        selectedPageIndex.value = 0;
        await addPDF(props.pdfData, "string");
        onAddDrawing();
        document.addEventListener("keydown", handleEscapeKey);
      } catch (error) {
        console.error("onMounted error:", error);
      }
    };

    const onUploadPDF = async (e: any) => {
      const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
      const file = files[0];
      if (!file || file.type !== "application/pdf") return;
      selectedPageIndex.value = -1;
      try {
        await addPDF(file, "arrayBuffer");
        selectedPageIndex.value = 0;
      } catch {}
    };

    const addPDF = async (pdfData: string, type: string) => {
      const pdf = await readAsPDF(pdfData, type);
      const document = await getPDFDocument(pdf);

      const resolvedPages: PDFPageProxy[] = [];
      for (let i = 1; i <= document.numPages; i++) {
        const page = await document.getPage(i);
        resolvedPages.push(markRaw(page));
      }

      pages.value = resolvedPages;
      allObjects.value = Array(document.numPages).fill([]);
      pagesScale.value = Array(document.numPages).fill({ scale: 1 });
      pageRenderStatus.value = Array(document.numPages).fill(false);

      if (type === "string") {
        const binaryString = atob(pdfData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "application/pdf" });
        pdfFile.value = new File([blob], "document.pdf", {
          type: "application/pdf",
        });
        pdfName.value = "document.pdf";
      }
    };

    const onFinishDrawing = async (e: any) => {
      signatureImageData.value = e.signatureImageData;
      await addDrawing(e.originWidth, e.originHeight, e.path);
      addingDrawing.value = false;
    };

    const onAddDrawing = () => {
      if (selectedPageIndex.value >= 0) addingDrawing.value = true;
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
        const pageIndex = signData.page - 1;
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

    const onMeasure = (scale: number, i: number) => {
      pagesScale.value[i] = scale;
    };

    const cmToPx = (cm: number) => (cm * 72) / 2.54;

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
      } catch (error) {
        console.error("Error saving PDF:", error);
      } finally {
        saving.value = false;
      }
    };

    const openModal = () => {
      isConfirmOrWarning.value =
        signatureImageData.value !== "" ? "confirm" : "warning";
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

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") closeModal();
    };

    const zoomPDF = (direction: "in" | "out") => {
      zoomScale.value =
        direction === "in"
          ? Math.min(zoomScale.value + ZOOM_STEP, MAX_ZOOM_SCALE)
          : Math.max(zoomScale.value - ZOOM_STEP, MIN_ZOOM_SCALE);
    };

    const renderFinished = (index: number) => {
      pageRenderStatus.value[index] = true;
      if (pageRenderStatus.value.every(Boolean)) emit("onPDFRendered");
    };

    onMounted(onMountedCallback);

    onBeforeUnmount(() => {
      document.removeEventListener("keydown", handleEscapeKey);
    });

    return {
      getTranslation,
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
      onMeasure,
      savePDF,
      onFinishDrawing,
      openModal,
      closeModal,
      confirmSave,
      isConfirmOrWarning,
      zoomScale,
      zoomPDF,
      pageRenderStatus,
      renderFinished,
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
