<template>
  <div>
    <main class="flex min-h-screen flex-col items-center bg-gray-100 py-16">
      <div
        class="fixed left-0 right-0 top-0 z-10 flex h-12 items-center justify-center border-b border-gray-300 bg-gray-200"
      >
        <input
          type="file"
          name="pdf"
          id="pdf"
          @change="onUploadPDF"
          class="hidden"
        />
        <label
          class="whitespace-no-wrap mr-3 cursor-pointer rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4"
          for="pdf"
        >
          Choose PDF
        </label>
        <div
          class="relative mr-3 flex h-8 overflow-hidden rounded-sm bg-gray-400 md:mr-4"
        >
          <label
            class="flex h-full w-8 cursor-pointer items-center justify-center hover:bg-gray-500"
            @click="onAddDrawing"
            :class="{
              'cursor-not-allowed': selectedPageIndex < 0,
              'bg-gray-500': selectedPageIndex < 0,
            }"
          >
            <img src="gesture.png" alt="An icon for adding drawing" />
          </label>
        </div>
        <button
          @click="savePDF"
          class="mr-3 w-20 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4"
          :class="{
            'cursor-not-allowed': pages.length === 0 || saving || !pdfFile,
            'bg-blue-700': pages.length === 0 || saving || !pdfFile,
          }"
        >
          {{ saving ? "Saving" : "Save" }}
        </button>
      </div>
      <div
        transition:fly="{ y: -200, duration: 500 }"
        class="fixed left-0 right-0 top-0 z-10 border-b border-gray-300 bg-white shadow-lg"
        style="height: 50%"
        v-if="addingDrawing"
      >
        <DrawingCanvas
          @finish="onFinishDrawing"
          @cancel="addingDrawing = false"
        />
      </div>
      {{ pages.length }}
      <div class="w-full" v-if="pages.length">
        <div
          v-for="(page, pIndex) in pages"
          :key="pIndex"
          class="flex w-full flex-col items-center overflow-hidden p-5"
          @mousedown="selectPage(pIndex)"
          @touchstart="selectPage(pIndex)"
        >
          <div
            class="relative shadow-lg"
            :class="{ 'shadow-outline': pIndex === selectedPageIndex }"
          >
            <PDFPage @measure="(e) => onMeasure(e, pIndex)" :page="page" />
            <div
              class="absolute left-0 top-0 origin-top-left transform"
              :style="{
                transform: `scale(${pagesScale[pIndex].scale})`,
                touchAction: 'none',
              }"
            >
              <div v-for="object in allObjects[pIndex]" :key="object.id">
                <Drawing
                  v-if="object.type === 'drawing'"
                  @update="(e) => updateObject(object.id, e)"
                  @delete="deleteObject(object.id)"
                  :path="object.path"
                  :x="object.x"
                  :y="object.y"
                  :width="object.width"
                  :originWidth="object.originWidth"
                  :originHeight="object.originHeight"
                  :pageScale="pagesScale[pIndex]?.scale"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full flex-grow items-center justify-center" v-else>
        <span class="text-3xl font-bold text-gray-500"
          >Drag something here</span
        >
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PDFPage from "./components/PDFPage.vue";
import Drawing from "./components/Drawing.vue";
import DrawingCanvas from "./components/DrawingCanvas.vue";
import prepareAssets from "./utils/prepareAssets";
import {
  readAsArrayBuffer,
  readAsPDF,
  readAsDataURL,
} from "./utils/asyncReader";
import { ggID } from "./utils/helper";
import { save } from "./utils/PDF";

export default defineComponent({
  name: "DrawSignPdf",
  components: {
    // Tailwind,
    PDFPage,
    DrawingCanvas,
    Drawing,
  },
  props: { url: String },
  setup(props) {
    // Your reactive variables and methods
    const genID = ggID();
    const pdfFile = ref<File | null>(null);
    const pdfName = ref("");
    const pages = ref([]);
    const pagesScale = ref([]);
    const allObjects = ref([]);
    const currentFont = ref("Times-Roman");
    const focusId = ref(null);
    const selectedPageIndex = ref(-1);
    const saving = ref(false);
    const addingDrawing = ref(false);

    onMounted(async () => {
      try {
        console.log(props.url);

        const res = await fetch("/test.pdf");
        const pdfBlob = await res.blob();

        // await addPDF(pdfBlob);
        selectedPageIndex.value = 0;
        setTimeout(() => {
          prepareAssets();
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    });

    const onUploadPDF = async (e: any) => {
      const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
      const file = files[0];
      if (!file || file.type !== "application/pdf") return;
      selectedPageIndex.value = -1;
      try {
        await addPDF(file);
        selectedPageIndex.value = 0;
      } catch (e) {
        console.log(e);
      }
    };

    const addPDF = async (file: any) => {
      try {
        const pdf = await readAsPDF(file);

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
      console.log(e);

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

    const addDrawing = (
      originWidth: number,
      originHeight: number,
      path: string,
      scale = 1
    ) => {
      const id = genID();
      const object = {
        id,
        path,
        type: "drawing",
        x: 0,
        y: 0,
        originWidth,
        originHeight,
        width: originWidth * scale,
        scale,
      };

      allObjects.value = allObjects.value.map((objects, pIndex) =>
        pIndex === selectedPageIndex.value ? [...objects, object] : objects
      );
    };

    const selectPage = (index) => {
      selectedPageIndex.value = index;
    };

    const updateObject = (objectId, payload) => {
      console.log(
        objectId,
        payload,
        "hit",
        allObjects.value,
        selectedPageIndex.value
      );

      allObjects.value = allObjects.value.map((objects, pIndex) =>
        pIndex == selectedPageIndex.value
          ? objects.map((object) =>
              object.id === objectId ? { ...object, ...payload } : object
            )
          : objects
      );
    };

    const deleteObject = (objectId) => {
      allObjects.value = allObjects.value.map((objects, pIndex) =>
        pIndex == selectedPageIndex.value
          ? objects.filter((object) => object.id !== objectId)
          : objects
      );
    };

    const onMeasure = (scale, i) => {
      pagesScale.value[i] = scale;
    };

    const savePDF = async () => {
      if (!pdfFile.value || saving.value || !pages.value.length) return;
      saving.value = true;
      try {
        await save(pdfFile.value, allObjects.value, pdfName.value);
      } catch (e) {
        console.log(e);
      } finally {
        saving.value = false;
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
    };
  },
});
</script>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.shadow-outline {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
</style>
