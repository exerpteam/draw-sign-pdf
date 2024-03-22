<template>
  <div
    :style="{
      width: width + dw + 'px',
      height: (width + dw) / ratio + 'px',
      transform: 'translate(' + (x + dx) + 'px, ' + (y + dy) + 'px)',
    }"
    class="absolute left-0 top-0 select-none"
  >
    <div
      @mousedown="handlePanStart"
      @touchstart="handlePanStart"
      @mousemove="handlePanMove"
      @touchmove="handlePanMove"
      @mouseup="handlePanEnd"
      @touchend="handlePanEnd"
      class="absolute h-full w-full cursor-grab border border-dashed border-gray-400"
      :class="{ 'cursor-grabbing': operation === 'move', operation }"
    >
      <div
        data-direction="left-top"
        class="absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform cursor-nwse-resize rounded-full bg-green-400 md:scale-25"
      ></div>
      <div
        data-direction="right-bottom"
        class="absolute bottom-0 right-0 h-10 w-10 translate-x-1/2 translate-y-1/2 transform cursor-nwse-resize rounded-full bg-green-400 md:scale-25"
      ></div>
    </div>
    <div
      @click="onDelete"
      class="absolute left-0 right-0 top-0 m-auto h-12 w-12 -translate-y-1/2 transform cursor-pointer rounded-full bg-white md:scale-25"
    >
      <img
        class="h-full w-full"
        src="../assets/images/delete.svg"
        alt="delete object"
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

<script>
import { ref, onMounted, nextTick } from "vue";

export default {
  name: "Drawing",
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
  data() {
    return {
      dx: 0,
      dy: 0,
      dw: 0,
      direction: "",
      operation: "",
      startX: 0,
      startY: 0,
      ratio: this.originWidth / this.originHeight,
    };
  },
  mounted() {
    nextTick(() => {
      if (this.$refs.svg) {
        this.$refs.svg.setAttribute(
          "viewBox",
          `0 0 ${this.originWidth} ${this.originHeight}`
        );
      }
    });
  },
  methods: {
    handlePanStart(event) {
      this.startX = event.type.startsWith("mouse")
        ? event.clientX
        : event.touches[0].clientX;
      this.startY = event.type.startsWith("mouse")
        ? event.clientY
        : event.touches[0].clientY;
      if (event.target === event.currentTarget) {
        this.operation = "move";
      } else {
        this.operation = "scale";
        this.direction = event.target.dataset.direction;
      }
    },
    handlePanMove(event) {
      const _dx =
        (event.type.startsWith("mouse")
          ? event.clientX
          : event.touches[0].clientX) - this.startX;
      const _dy =
        (event.type.startsWith("mouse")
          ? event.clientY
          : event.touches[0].clientY) - this.startY;
      if (this.operation === "move") {
        this.dx = _dx / this.pageScale;
        this.dy = _dy / this.pageScale;
      } else if (this.operation === "scale") {
        if (this.direction === "left-top") {
          const d = Math.min(_dx, _dy * this.ratio);
          this.dx = d;
          this.dw = -d;
          this.dy = d / this.ratio;
        }
        if (this.direction === "right-bottom") {
          const d = Math.max(_dx, _dy * this.ratio);
          this.dw = d;
        }
      }
    },
    handlePanEnd() {
      if (this.operation === "move") {
        this.$emit("update", {
          x: this.x + this.dx,
          y: this.y + this.dy,
        });
        this.dx = 0;
        this.dy = 0;
      } else if (this.operation === "scale") {
        this.$emit("update", {
          x: this.x + this.dx,
          y: this.y + this.dy,
          width: this.width + this.dw,
          scale: (this.width + this.dw) / this.originWidth,
        });
        this.dx = 0;
        this.dy = 0;
        this.dw = 0;
        this.direction = "";
      }
      this.operation = "";
    },
    onDelete() {
      this.$emit("delete");
    },
  },
};
</script>

<style scoped>
.operation {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
