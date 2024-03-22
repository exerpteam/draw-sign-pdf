<template>
  <div>
    <canvas
      ref="canvas"
      id="canvas"
      class="max-w-full"
      :style="{ width: `${width}px` }"
      :width="width"
      :height="height"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: "PDFPage",
  props: {
    page: Object,
  },
  data() {
    return {
      canvas: null,
      width: 0,
      height: 0,
    };
  },
  mounted() {
    this.measure();
    this.renderPage();
    window.addEventListener("resize", this.measure);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.measure);
  },
  methods: {
    async renderPage() {
      const _page = await this.page;
      const context = this.$refs.canvas.getContext("2d");
      const viewport = _page.getViewport({ scale: 1, rotation: 0 });
      this.width = viewport.width;
      this.height = viewport.height;
      await _page
        .render({
          canvasContext: context,
          viewport,
        })
        .promise.then(() => {
          console.log("Page rendered");
        });
      this.measure();
    },
    measure() {
      const context = this.$refs.canvas.getContext("2d");
      console.log(this.canvas, context);
      this.$emit("measure", {
        scale: this.$refs.canvas.clientWidth / this.width,
      });
    },
  },
};
</script>

<style scoped>
/* Your component's styles here */
</style>
