<template>
  <div
    style="height: 50%"
    class="fixed left-0 right-0 top-0 z-10 border-b border-gray-300 bg-white shadow-lg"
  >
    <div
      ref="signatureCanvas"
      @mousedown="handleMousedown"
      @touchstart="handleTouchStart"
      class="relative h-full w-full select-none"
    >
      <div class="absolute bottom-0 right-0 mb-4 mr-4 flex">
        <button
          @click="cancel"
          class="mr-4 w-24 rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700"
        >
          Cancel
        </button>
        <button
          @click="finish"
          class="w-24 rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-blue-700"
        >
          Done
        </button>
      </div>
      <svg class="pointer-events-none h-full w-full">
        <path
          stroke-width="5"
          stroke-linejoin="round"
          stroke-linecap="round"
          :d="path"
          stroke="black"
          fill="none"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawingCanvas",
  data() {
    return {
      paths: [],
      path: "",
      data: {
        drawing: false,
        x: 0,
        y: 0,
        minX: Infinity,
        minY: Infinity,
        maxX: 0,
        maxY: 0,
      },
    };
  },
  methods: {
    handleMousedown(event) {
      this.data.x = event.clientX;
      this.data.y = event.clientY;
      const target = event.target;
      this.handlePanStart({
        x: this.data.x,
        y: this.data.y,
        target,
        currentTarget: this.$refs.signatureCanvas,
      });
      this.$refs.signatureCanvas.addEventListener(
        "mousemove",
        this.handleMousemove
      );
      this.$refs.signatureCanvas.addEventListener(
        "mouseup",
        this.handleMouseup
      );
    },
    handleMousemove(event) {
      const dx = event.clientX - this.data.x;
      const dy = event.clientY - this.data.y;
      this.data.x = event.clientX;
      this.data.y = event.clientY;
      this.handlePanMove({
        x: this.data.x,
        y: this.data.y,
        dx,
        dy,
      });
    },
    handleMouseup(event) {
      this.data.x = event.clientX;
      this.data.y = event.clientY;
      this.handlePanEnd();
      this.$refs.signatureCanvas.removeEventListener(
        "mousemove",
        this.handleMousemove
      );
      this.$refs.signatureCanvas.removeEventListener(
        "mouseup",
        this.handleMouseup
      );
    },
    handleTouchStart(event) {
      if (event.touches.length > 1) return;
      const touch = event.touches[0];
      this.data.x = touch.clientX;
      this.data.y = touch.clientY;
      const target = touch.target;
      this.handlePanStart({ x: this.data.x, y: this.data.y, target });
      this.$refs.signatureCanvas.addEventListener(
        "touchmove",
        this.handleTouchmove
      );
      this.$refs.signatureCanvas.addEventListener(
        "touchend",
        this.handleTouchend
      );
    },
    handleTouchmove(event) {
      event.preventDefault();
      if (event.touches.length > 1) return;
      const touch = event.touches[0];
      const dx = touch.clientX - this.data.x;
      const dy = touch.clientY - this.data.y;
      this.data.x = touch.clientX;
      this.data.y = touch.clientY;
      this.handlePanMove({ x: this.data.x, y: this.data.y, dx, dy });
    },
    handleTouchend(event) {
      const touch = event.changedTouches[0];
      this.data.x = touch.clientX;
      this.data.y = touch.clientY;
      this.handlePanEnd();
      this.$refs.signatureCanvas.removeEventListener(
        "touchmove",
        this.handleTouchmove
      );
      this.$refs.signatureCanvas.removeEventListener(
        "touchend",
        this.handleTouchend
      );
    },
    handlePanStart(event) {
      if (event.target !== event.currentTarget) {
        this.data.drawing = false;
        return;
      }

      this.data.drawing = true;
      this.data.x = event.x;
      this.data.y = event.y;
      this.data.minX = Math.min(this.data.minX, this.data.x);
      this.data.maxX = Math.max(this.data.maxX, this.data.x);
      this.data.minY = Math.min(this.data.minY, this.data.y);
      this.data.maxY = Math.max(this.data.maxY, this.data.y);
      this.paths.push(["M", this.data.x, this.data.y]);
      this.path += `M${this.data.x},${this.data.y}`;
    },
    handlePanMove(event) {
      if (!this.data.drawing) return;

      this.data.x = event.x;
      this.data.y = event.y;
      this.data.minX = Math.min(this.data.minX, this.data.x);
      this.data.maxX = Math.max(this.data.maxX, this.data.x);
      this.data.minY = Math.min(this.data.minY, this.data.y);
      this.data.maxY = Math.max(this.data.maxY, this.data.y);
      this.path += `L${this.data.x},${this.data.y}`;
      this.paths.push(["L", this.data.x, this.data.y]);
    },
    handlePanEnd() {
      this.data.drawing = false;
    },
    finish() {
      if (!this.paths.length) return;
      const dx = -(this.data.minX - 10);
      const dy = -(this.data.minY - 10);
      const originWidth = this.data.maxX - this.data.minX + 20;
      const originHeight = this.data.maxY - this.data.minY + 20;

      let scale = 1;
      if (originWidth > 500) {
        scale = 500 / originWidth;
      }

      this.$emit("finish", {
        originWidth,
        originHeight,
        path: this.paths.reduce((acc, cur) => {
          return acc + cur[0] + (cur[1] + dx) + "," + (cur[2] + dy);
        }, ""),
        scale,
      });
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>
