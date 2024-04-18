<template>
  <div style="height: 210px;" class="left-0 right-0 top-0 z-0 border-b border-gray-300 bg-white shadow-lg "
    data-cy="sign-area">
    <div ref="signatureCanvas" @panstart="handlePanStart" @panmove="handlePanMove" @panend="handlePanEnd"
      class="relative h-full w-full select-none">
      <div class="absolute bottom-0 right-0 mb-4 mx-4 flex">
        <div class="flex w-full flex-grow items-center justify-center">
          <p class="text-black-600">{{ getTranslation.drawLabel }}</p>
        </div>
        <button @click="finish"
          class="mx-4 w-24 rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-blue-700 btn-positive"
          data-cy="sign-done">
          {{ getTranslation.drawDone }}
        </button>
        <button @click="cancel"
          class="w-24 rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700 btn-negative"
          data-cy="sign-cancel">
          {{ getTranslation.drawCancel }}
        </button>
      </div>
      <svg class="pointer-events-none h-full w-full">
        <path stroke-width="5" stroke-linejoin="round" stroke-linecap="round" :d="path" stroke="black" fill="none" />
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref } from "vue";
import { TouchEventDetails, TouchMoveData } from "../utils/pdfTypes";

export default {
  props: {
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getTranslation() {
      const defaultTranslation = {
        drawLabel: "Draw the signature here",
        drawDone: "Done",
        drawCancel: "Cancel",
      };
      return { ...defaultTranslation, ...this.translations };
    }
  },
  emits: ["finish", "cancel"],
  setup(props: Readonly<{ [key: string]: any }>, { emit }: { emit: (event: string, ...args: any[]) => void }) {
    const signatureCanvas = ref();
    type PathElement = ['M' | 'L', number, number];
    const paths = ref<PathElement[]>([]);
    const path = ref('');
    const data = reactive({
      drawing: false,
      x: 0,
      y: 0,
      minX: Infinity,
      minY: Infinity,
      maxX: 0,
      maxY: 0,
    });

    const handleMousedown = (event: MouseEvent) => {
      data.x = event.clientX;
      data.y = event.clientY;
      const target = event.target;
      handlePanStart({
        x: data.x,
        y: data.y,
        target,
        currentTarget: signatureCanvas.value,
      });
      signatureCanvas.value.addEventListener("mousemove", handleMousemove);
      signatureCanvas.value.addEventListener("mouseup", handleMouseup);
    };

    const handleMousemove = (event: MouseEvent) => {
      const dx = event.clientX - data.x;
      const dy = event.clientY - data.y;
      data.x = event.clientX;
      data.y = event.clientY;
      handlePanMove({
        x: data.x,
        y: data.y,
        dx,
        dy,
      });
    };

    const handleMouseup = (event: MouseEvent) => {
      data.x = event.clientX;
      data.y = event.clientY;
      handlePanEnd();
      signatureCanvas.value.removeEventListener("mousemove", handleMousemove);
      signatureCanvas.value.removeEventListener("mouseup", handleMouseup);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 1) return;
      const touch = event.touches[0];
      data.x = touch.clientX;
      data.y = touch.clientY;
      const target = touch.target;
      handlePanStart({ x: data.x, y: data.y, target, currentTarget: signatureCanvas.value });
      signatureCanvas.value.addEventListener("touchmove", handleTouchmove);
      signatureCanvas.value.addEventListener("touchend", handleTouchend);
    };

    const handleTouchmove = (event: TouchEvent) => {
      event.preventDefault();
      if (event.touches.length > 1) return;
      const touch = event.touches[0];
      const dx = touch.clientX - data.x;
      const dy = touch.clientY - data.y;
      data.x = touch.clientX;
      data.y = touch.clientY;
      handlePanMove({ x: data.x, y: data.y, dx, dy });
    };

    const handleTouchend = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      data.x = touch.clientX;
      data.y = touch.clientY;
      handlePanEnd();
      signatureCanvas.value.removeEventListener("touchmove", handleTouchmove);
      signatureCanvas.value.removeEventListener("touchend", handleTouchend);
    };

    const handlePanStart = (event: TouchEventDetails) => {
      if (event.target !== event.currentTarget) {
        data.drawing = false;
        return;
      }

      data.drawing = true;
      data.x = event.x;
      data.y = event.y;
      data.minX = Math.min(data.minX, data.x);
      data.maxX = Math.max(data.maxX, data.x);
      data.minY = Math.min(data.minY, data.y);
      data.maxY = Math.max(data.maxY, data.y);
      paths.value.push(["M", data.x, data.y]);
      path.value += `M${data.x},${data.y}`;
    };

    const handlePanMove = (event: TouchMoveData) => {
      if (!data.drawing) return;

      data.x = event.x;
      data.y = event.y;
      data.minX = Math.min(data.minX, data.x);
      data.maxX = Math.max(data.maxX, data.x);
      data.minY = Math.min(data.minY, data.y);
      data.maxY = Math.max(data.maxY, data.y);
      path.value += `L${data.x},${data.y}`;
      paths.value.push(["L", data.x, data.y]);
    };

    const handlePanEnd = () => {
      data.drawing = false;
    };

    const finish = () => {
      if (!paths.value.length) return;
      const dx = -(data.minX - 10);
      const dy = -(data.minY - 10);
      const originWidth = data.maxX - data.minX + 20;
      const originHeight = data.maxY - data.minY + 20;
      let base64 = '';

      let scale = 1;
      if (originWidth > 500) {
        scale = 500 / originWidth;
      }
      const updatedPaths = paths.value.reduce((acc, cur) => {
        return acc + cur[0] + (cur[1] + dx) + "," + (cur[2] + dy);
      }, "");

      const svgElement = document.querySelector('svg');
      if (svgElement) {
        svgElement.removeAttribute('viewBox');
        svgElement.querySelector('path')?.setAttribute('d', updatedPaths);
        const svgString = new XMLSerializer().serializeToString(svgElement);
        base64 = btoa(svgString);
      }

      emit("finish", {
        originWidth,
        originHeight,
        path: updatedPaths,
        scale,
        signatureImageData: {
          data: base64,
          type: 'image/svg+xml'
        },
      });
    };

    const cancel = () => {
      emit("cancel");
    };

    onMounted(() => {
      signatureCanvas.value.addEventListener("mousedown", handleMousedown);
      signatureCanvas.value.addEventListener("touchstart", handleTouchStart);
    });

    onBeforeUnmount(() => {
      signatureCanvas.value.removeEventListener("mousedown", handleMousedown);
      signatureCanvas.value.removeEventListener("touchstart", handleTouchStart);
    });

    return {
      signatureCanvas,
      paths,
      path,
      data,
      handlePanStart,
      handlePanMove,
      handlePanEnd,
      finish,
      cancel,
    };
  },
};
</script>
<style scoped></style>
