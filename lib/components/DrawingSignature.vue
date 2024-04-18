<template>
  <div :style="{
    width: `${width! + dw}px`,
    height: `${(width! + dw) / ratio}px`,
    transform: `translate(${x! + dx}px, ${y! + dy}px)`,
  }" class="absolute left-0 top-0 select-none">

    <div class="absolute h-full w-full cursor-grab border border-dashed border-gray-400">
      <!-- 
            <div 
    @mousedown="handlePanStart" @touchstart="handlePanStart" @mousemove="handlePanMove" @touchmove="handlePanMove"
      @mouseup="handlePanEnd" @touchend="handlePanEnd"
      class="absolute h-full w-full cursor-grab border border-dashed border-gray-400"
      :class="{ 'cursor-grabbing': operation === 'move', operation }">
      <div data-direction="left-top"
        class="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform cursor-nwse-resize rounded-full bg-green-400 md:scale-25">
      </div>
      <div data-direction="right-bottom"
        class="absolute bottom-0 right-0 h-4 w-4 translate-x-1/2 translate-y-1/2 transform cursor-nwse-resize rounded-full bg-green-400 md:scale-25">
      </div>
    </div>
      -->
    </div>
    <!-- 
    <div @click="onDelete"
      class="absolute left-0 right-0 top-0 m-auto h-4 w-4 -translate-y-1/2 transform cursor-pointer rounded-full bg-white md:scale-25">
      <img class="h-full w-full" src="../assets/images/delete.svg" alt="delete" data-cy="delete-sign" />
    </div> -->
    <svg ref="svg" width="100%" height="100%">
      <path stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke="black" fill="none" :d="path" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from "vue";

export default defineComponent({
  props: {
    originWidth: Number,
    originHeight: Number,
    width: Number,
    x: Number,
    y: Number,
    pageScale: {
      type: Number,
      default: 1,
    },
    path: String,
  },
  setup(props: Readonly<{ [key: string]: any }>, { emit }: { emit: (event: string, ...args: any[]) => void }) {
    const dx = ref(0);
    const dy = ref(0);
    const dw = ref(0);
    const direction = ref("");
    const operation = ref("");
    const startX = ref(0);
    const startY = ref(0);
    const svg = ref<SVGElement | null>(null);

    const ratio = props.originWidth / props.originHeight;
    onMounted(async () => {
      await nextTick();
      if (svg.value) {
        svg.value.setAttribute(
          "viewBox",
          `0 0 ${props.originWidth} ${props.originHeight}`
        );
      }
    });

    const handlePanStart = (event: MouseEvent | TouchEvent) => {
      startX.value = event.type.startsWith("mouse")
        ? (event as MouseEvent).clientX
        : (event as TouchEvent).touches[0].clientX;
      startY.value = event.type.startsWith("mouse")
        ? (event as MouseEvent).clientY
        : (event as TouchEvent).touches[0].clientY;
      if (event.target === event.currentTarget) {
        operation.value = "move";
      } else {
        operation.value = "scale";
        direction.value = (event.target as HTMLElement).dataset.direction || "";
      }
    }

    const handlePanMove = (event: MouseEvent | TouchEvent) => {
      const _dx =
        (event.type.startsWith("mouse")
          ? (event as MouseEvent).clientX
          : (event as TouchEvent).touches[0].clientX) - startX.value;
      const _dy =
        (event.type.startsWith("mouse")
          ? (event as MouseEvent).clientY
          : (event as TouchEvent).touches[0].clientY) - startY.value;
      if (operation.value === "move") {
        dx.value = _dx / props.pageScale;
        dy.value = _dy / props.pageScale;
      } else if (operation.value === "scale") {
        if (direction.value === "left-top") {
          const d = Math.min(_dx, _dy * ratio);
          dx.value = d;
          dw.value = -d;
          dy.value = d / ratio;
        }
        if (direction.value === "right-bottom") {
          const d = Math.max(_dx, _dy * ratio);
          dw.value = d;
        }
      }
    }

    const handlePanEnd = () => {
      if (operation.value === "move") {
        emit("update", {
          x: props.x + dx.value,
          y: props.y + dy.value,
        });
        dx.value = 0;
        dy.value = 0;
      } else if (operation.value === "scale") {
        emit("update", {
          x: props.x + dx.value,
          y: props.y + dy.value,
          width: props.width + dw.value,
          scale: (props.width + dw.value) / props.originWidth,
        });
        dx.value = 0;
        dy.value = 0;
        dw.value = 0;
        direction.value = "";
      }
      operation.value = "";
    }

    const onDelete = () => {
      emit("delete");
    }

    return {
      dx,
      dy,
      dw,
      direction,
      operation,
      startX,
      startY,
      svg,
      ratio,
      handlePanStart,
      handlePanMove,
      handlePanEnd,
      onDelete,
    };
  },
});
</script>

<style scoped>
.operation {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
