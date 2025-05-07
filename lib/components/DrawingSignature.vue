<template>
  <div
    :style="{
      width: `${(width! + dw) * zoomScale}px`,
      height: `${(height! + dw) * zoomScale}px`,
      transform: `translate(${(x! + dx) * zoomScale}px, ${(y! + dy) * zoomScale}px)`,
    }"
    class="absolute left-0 top-0 select-none"
  >
    <!-- <div
      class="absolute h-full w-full cursor-grab border border-dashed border-gray-400"
      @mousedown="handlePanStart"
      @mousemove="handlePanMove"
      @mouseup="handlePanEnd"
      @touchstart="handlePanStart"
      @touchmove="handlePanMove"
      @touchend="handlePanEnd"
      :class="{ 'cursor-grabbing': operation === 'move', operation }"
    > -->
    <div
      class="absolute h-full w-full border border-dashed border-gray-400"
    >
      <div
        data-direction="left-top"
        class="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform cursor-nwse-resize rounded-full bg-green-400 md:scale-25"
      ></div>
      <div
        data-direction="right-bottom"
        class="absolute bottom-0 right-0 h-4 w-4 translate-x-1/2 translate-y-1/2 transform cursor-nwse-resize rounded-full bg-green-400 md:scale-25"
      ></div>
    </div>

    <div
      @click="onDelete"
      class="absolute left-0 right-0 top-0 m-auto h-4 w-4 -translate-y-1/2 transform cursor-pointer rounded-full bg-white md:scale-25"
    >
      <img
        class="h-full w-full"
        src="../assets/images/delete.svg"
        alt="delete"
        data-cy="delete-sign"
      />
    </div>

    <svg ref="svg" width="100%" height="100%">
      <path
        stroke-width="5"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="black"
        fill="none"
        :d="path"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from "vue";

export default defineComponent({
  props: {
    originWidth: { type: Number, required: true },
    originHeight: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    pageScale: { type: Number, default: 1 },
    path: { type: String, required: true },
    zoomScale: { type: Number, required: true },
  },
  emits: ["delete", "update"],
  setup(props, { emit }) {
    const dx = ref(0);
    const dy = ref(0);
    const dw = ref(0);
    const direction = ref("");
    const operation = ref("");
    const startX = ref(0);
    const startY = ref(0);
    const svg = ref<SVGSVGElement | null>(null);

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

    // const handlePanStart = (event: MouseEvent | TouchEvent) => {
    //   startX.value = event instanceof MouseEvent
    //     ? event.clientX
    //     : event.touches[0].clientX;
    //   startY.value = event instanceof MouseEvent
    //     ? event.clientY
    //     : event.touches[0].clientY;

    //   if (event.target === event.currentTarget) {
    //     operation.value = "move";
    //   } else {
    //     const target = event.target as HTMLElement;
    //     operation.value = "scale";
    //     direction.value = target.dataset.direction || "";
    //   }
    // };

    // const handlePanMove = (event: MouseEvent | TouchEvent) => {
    //   const currentX = event instanceof MouseEvent
    //     ? event.clientX
    //     : event.touches[0].clientX;
    //   const currentY = event instanceof MouseEvent
    //     ? event.clientY
    //     : event.touches[0].clientY;

    //   const _dx = currentX - startX.value;
    //   const _dy = currentY - startY.value;

    //   if (operation.value === "move") {
    //     dx.value = _dx / props.pageScale;
    //     dy.value = _dy / props.pageScale;
    //   } else if (operation.value === "scale") {
    //     if (direction.value === "left-top") {
    //       const d = Math.min(_dx, _dy * ratio);
    //       dx.value = d;
    //       dw.value = -d;
    //       dy.value = d / ratio;
    //     }
    //     if (direction.value === "right-bottom") {
    //       const d = Math.max(_dx, _dy * ratio);
    //       dw.value = d;
    //     }
    //   }
    // };

    // const handlePanEnd = () => {
    //   if (operation.value === "move") {
    //     emit("update", {
    //       x: props.x + dx.value,
    //       y: props.y + dy.value,
    //     });
    //     dx.value = 0;
    //     dy.value = 0;
    //   } else if (operation.value === "scale") {
    //     emit("update", {
    //       x: props.x + dx.value,
    //       y: props.y + dy.value,
    //       width: props.width + dw.value,
    //       scale: (props.width + dw.value) / props.originWidth,
    //     });
    //     dx.value = 0;
    //     dy.value = 0;
    //     dw.value = 0;
    //     direction.value = "";
    //   }
    //   operation.value = "";
    // };

    const onDelete = () => {
      emit("delete");
    };

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
      // handlePanStart,
      // handlePanMove,
      // handlePanEnd,
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
