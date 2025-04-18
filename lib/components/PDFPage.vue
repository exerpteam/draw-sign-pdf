<template>
  <div>
    <canvas ref="canvas" id="canvas" class="max-w-full" :style="{ width: `${width}px` }" :width="width"
      :height="height" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  props: {
    page: Object,
    zoomScale: Number,
    finishedRendering: Function
  },
  setup(props: Readonly<{ [key: string]: any }>, { emit }: { emit: (event: string, ...args: any[]) => void }) {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const width = ref(0);
    const height = ref(0);

    const measure = () => {
      if(canvas.value && canvas.value.clientWidth && width.value) {
        emit("measure", {
          scale: canvas.value!.clientWidth / width.value,
        });
      }
    };

    onMounted(async () => {
      const _page = await props.page;
      const context = canvas.value!.getContext("2d");
      const viewport = _page.getViewport({ scale: props.zoomScale || 1, rotation: 0 });
      width.value = viewport.width;
      height.value = viewport.height;
      await _page
        .render({
          canvasContext: context,
          viewport,
        })
        .promise.then(function () {
          emit("finishedRendering");
          measure();
        });
      window.addEventListener("resize", measure);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", measure);
    });

    return {
      canvas,
      width,
      height,
    };
  },
};
</script>

<style scoped>
/* Your component's styles here */
</style>
