<template>
  <div>
    <main class="flex min-h-screen flex-col items-center bg-gray-100 py-16">
      <div
        class="left-0 right-0 top-0 z-10 flex h-12 items-center justify-center border-b border-gray-300 bg-gray-200"
      >
        <input
          type="file"
          name="pdf"
          id="pdf"
          @change="
            //@ts-ignore
            onUploadPDF;
          "
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
            @click="
              //@ts-ignore
              onAddDrawing;
            "
            :class="{
              //@ts-ignore
              'cursor-not-allowed': selectedPageIndex < 0,
              'bg-gray-500': selectedPageIndex < 0,
            }"
          >
            <img
              src="./assets/images/gesture.svg"
              alt="An icon for adding drawing"
            />
          </label>
        </div>
        <button
          @click="
            //@ts-ignore
            savePDF;
          "
          class="mr-3 w-20 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4"
          :class="{
            //@ts-ignore
            'cursor-not-allowed': pages.length === 0 || saving || !pdfFile,
            'bg-blue-700': pages.length === 0 || saving || !pdfFile,
          }"
        >
          {{
            //@ts-ignore
            saving ? "Saving" : "Save"
          }}
        </button>
      </div>
      <div
        transition:fly="{ y: -200, duration: 500 }"
        class="fixed left-0 right-0 top-0 z-10 border-b border-gray-300 bg-white shadow-lg"
        style="height: 50%"
        v-if="
          //@ts-ignore
          addingDrawing
        "
      >
        <DrawingCanvas
          @finish="
            //@ts-ignore
            onFinishDrawing;
          "
          @cancel="
            //@ts-ignore
            addingDrawing = false
          "
        />
      </div>
      <div
        class="w-full"
        v-if="
          //@ts-ignore
          pages.length
        "
      >
        <div
          v-for="(page, pIndex) in //@ts-ignore
          pages"
          :key="pIndex"
          class="flex w-full flex-col items-center overflow-hidden p-5"
          @mousedown="
            //@ts-ignore
            electPage(pIndex)
          "
          @touchstart="
            //@ts-ignore
            selectPage(pIndex)
          "
        >
          <div
            class="relative shadow-lg"
            :class="{
              //@ts-ignore
              'shadow-outline': pIndex === selectedPageIndex,
            }"
          >
            <PDFPage
              @measure="
                (
                  e //@ts-ignore
                ) => onMeasure(e, pIndex)
              "
              :page="
                //@ts-ignore
                page
              "
            />
            <div
              class="absolute left-0 top-0 origin-top-left transform"
              :style="{
                //@ts-ignore
                transform: `scale(${pagesScale[pIndex].scale})`,
                touchAction: 'none',
              }"
            >
              <div
                v-for="object in //@ts-ignore
                allObjects[pIndex]"
                :key="object.id"
              >
                <Drawing
                  v-if="
                    //@ts-ignore
                    object.type === 'drawing'
                  "
                  @update="
                    (
                      e //@ts-ignore
                    ) => updateObject(object.id, e)
                  "
                  @delete="
                    () =>
                      //@ts-ignore
                      deleteObject(object.id)
                  "
                  :path="object.path"
                  :x="object.x"
                  :y="object.y"
                  :width="
                    //@ts-ignore
                    object.width
                  "
                  :originWidth="
                    //@ts-ignore
                    object.originWidth
                  "
                  :originHeight="
                    //@ts-ignore
                    object.originHeight
                  "
                  :pageScale="
                    //@ts-ignore
                    pagesScale[pIndex]?.scale
                  "
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

<script lang="ts" src="./App.ts"></script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.shadow-outline {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
</style>
