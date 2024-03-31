import { ref, onMounted, onBeforeUnmount, openBlock, createElementBlock, createElementVNode, normalizeStyle, nextTick, normalizeClass, reactive, defineComponent, resolveComponent, toDisplayString, createVNode, createCommentVNode, Fragment, renderList, createBlock, pushScopeId, popScopeId } from "vue";
var PDFPage_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  props: {
    page: Object
  },
  setup(props, { emit }) {
    const canvas = ref(null);
    const width = ref(0);
    const height = ref(0);
    const measure = () => {
      emit("measure", {
        scale: canvas.value.clientWidth / width.value
      });
    };
    onMounted(async () => {
      const _page = await props.page;
      const context = canvas.value.getContext("2d");
      const viewport = _page.getViewport({ scale: 1, rotation: 0 });
      width.value = viewport.width;
      height.value = viewport.height;
      await _page.render({
        canvasContext: context,
        viewport
      }).promise.then(function() {
        console.log("Page rendered");
      });
      emit("measure", {
        scale: canvas.value.clientWidth / width.value
      });
      window.addEventListener("resize", measure);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", measure);
    });
    return {
      canvas,
      width,
      height
    };
  }
};
const _hoisted_1$3 = ["width", "height"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createElementVNode("canvas", {
      ref: "canvas",
      id: "canvas",
      class: "max-w-full",
      style: normalizeStyle({ width: `${$setup.width}px` }),
      width: $setup.width,
      height: $setup.height
    }, null, 12, _hoisted_1$3)
  ]);
}
var PDFPage = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-415646a0"]]);
var _imports_0 = "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNmNTY1NjUiIGQ9Im00MzcuMDE5NTMxIDc0Ljk4MDQ2OWMtNDguMzUxNTYyLTQ4LjM1MTU2My0xMTIuNjQwNjI1LTc0Ljk4MDQ2OS0xODEuMDE5NTMxLTc0Ljk4MDQ2OXMtMTMyLjY2Nzk2OSAyNi42Mjg5MDYtMTgxLjAxOTUzMSA3NC45ODA0NjljLTQ4LjM1MTU2MyA0OC4zNTE1NjItNzQuOTgwNDY5IDExMi42NDA2MjUtNzQuOTgwNDY5IDE4MS4wMTk1MzEgMCA2OC4zODI4MTIgMjYuNjI4OTA2IDEzMi42Njc5NjkgNzQuOTgwNDY5IDE4MS4wMTk1MzEgNDguMzUxNTYyIDQ4LjM1MTU2MyAxMTIuNjQwNjI1IDc0Ljk4MDQ2OSAxODEuMDE5NTMxIDc0Ljk4MDQ2OXMxMzIuNjY3OTY5LTI2LjYyODkwNiAxODEuMDE5NTMxLTc0Ljk4MDQ2OWM0OC4zNTE1NjMtNDguMzUxNTYyIDc0Ljk4MDQ2OS0xMTIuNjM2NzE5IDc0Ljk4MDQ2OS0xODEuMDE5NTMxIDAtNjguMzc4OTA2LTI2LjYyODkwNi0xMzIuNjY3OTY5LTc0Ljk4MDQ2OS0xODEuMDE5NTMxem0tNzAuMjkyOTY5IDI1Ni4zODY3MTljOS43NjE3MTkgOS43NjU2MjQgOS43NjE3MTkgMjUuNTkzNzUgMCAzNS4zNTU0NjgtNC44ODI4MTIgNC44ODI4MTMtMTEuMjgxMjUgNy4zMjQyMTktMTcuNjc5Njg3IDcuMzI0MjE5cy0xMi43OTY4NzUtMi40NDE0MDYtMTcuNjc5Njg3LTcuMzI0MjE5bC03NS4zNjcxODgtNzUuMzY3MTg3LTc1LjM2NzE4OCA3NS4zNzEwOTNjLTQuODgyODEyIDQuODc4OTA3LTExLjI4MTI1IDcuMzIwMzEzLTE3LjY3OTY4NyA3LjMyMDMxM3MtMTIuNzk2ODc1LTIuNDQxNDA2LTE3LjY3OTY4Ny03LjMyMDMxM2MtOS43NjE3MTktOS43NjU2MjQtOS43NjE3MTktMjUuNTkzNzUgMC0zNS4zNTU0NjhsNzUuMzcxMDkzLTc1LjM3MTA5NC03NS4zNzEwOTMtNzUuMzY3MTg4Yy05Ljc2MTcxOS05Ljc2NTYyNC05Ljc2MTcxOS0yNS41OTM3NSAwLTM1LjM1NTQ2OCA5Ljc2NTYyNC05Ljc2NTYyNSAyNS41OTM3NS05Ljc2NTYyNSAzNS4zNTU0NjggMGw3NS4zNzEwOTQgNzUuMzY3MTg3IDc1LjM2NzE4OC03NS4zNjcxODdjOS43NjU2MjQtOS43NjE3MTkgMjUuNTkzNzUtOS43NjU2MjUgMzUuMzU1NDY4IDAgOS43NjU2MjUgOS43NjE3MTggOS43NjU2MjUgMjUuNTg5ODQ0IDAgMzUuMzU1NDY4bC03NS4zNjcxODcgNzUuMzY3MTg4em0wIDAiLz48L3N2Zz4=";
var Drawing_vue_vue_type_style_index_0_lang = "";
const _sfc_main$2 = {
  props: {
    originWidth: Number,
    originHeight: Number,
    width: Number,
    x: Number,
    y: Number,
    pageScale: {
      type: Number,
      default: 1
    },
    path: String
  },
  setup(props, { emit }) {
    const dx = ref(0);
    const dy = ref(0);
    const dw = ref(0);
    const direction = ref("");
    const operation = ref("");
    const startX = ref(0);
    const startY = ref(0);
    const svg = ref(null);
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
    function handlePanStart(event) {
      startX.value = event.type.startsWith("mouse") ? event.clientX : event.touches[0].clientX;
      startY.value = event.type.startsWith("mouse") ? event.clientY : event.touches[0].clientY;
      if (event.target === event.currentTarget) {
        operation.value = "move";
      } else {
        operation.value = "scale";
        direction.value = event.target.dataset.direction;
      }
    }
    function handlePanMove(event) {
      const _dx = (event.type.startsWith("mouse") ? event.clientX : event.touches[0].clientX) - startX.value;
      const _dy = (event.type.startsWith("mouse") ? event.clientY : event.touches[0].clientY) - startY.value;
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
    function handlePanEnd() {
      if (operation.value === "move") {
        emit("update", {
          x: props.x + dx.value,
          y: props.y + dy.value
        });
        dx.value = 0;
        dy.value = 0;
      } else if (operation.value === "scale") {
        emit("update", {
          x: props.x + dx.value,
          y: props.y + dy.value,
          width: props.width + dw.value,
          scale: (props.width + dw.value) / props.originWidth
        });
        dx.value = 0;
        dy.value = 0;
        dw.value = 0;
        direction.value = "";
      }
      operation.value = "";
    }
    function onDelete() {
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
      onDelete
    };
  }
};
const _hoisted_1$2 = /* @__PURE__ */ createElementVNode("div", {
  "data-direction": "left-top",
  class: "absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform cursor-nwse-resize rounded-full bg-green-400 md:scale-25"
}, null, -1);
const _hoisted_2$2 = /* @__PURE__ */ createElementVNode("div", {
  "data-direction": "right-bottom",
  class: "absolute bottom-0 right-0 h-4 w-4 translate-x-1/2 translate-y-1/2 transform cursor-nwse-resize rounded-full bg-green-400 md:scale-25"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_1$2,
  _hoisted_2$2
];
const _hoisted_4$2 = /* @__PURE__ */ createElementVNode("img", {
  class: "h-full w-full",
  src: _imports_0,
  alt: "delete object"
}, null, -1);
const _hoisted_5$1 = [
  _hoisted_4$2
];
const _hoisted_6$1 = {
  ref: "svg",
  width: "100%",
  height: "100%"
};
const _hoisted_7$1 = ["d"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    style: normalizeStyle({
      width: `${$props.width + $setup.dw}px`,
      height: `${($props.width + $setup.dw) / $setup.ratio}px`,
      transform: `translate(${$props.x + $setup.dx}px, ${$props.y + $setup.dy}px)`
    }),
    class: "absolute left-0 top-0 select-none"
  }, [
    createElementVNode("div", {
      onMousedown: _cache[0] || (_cache[0] = (...args) => $setup.handlePanStart && $setup.handlePanStart(...args)),
      onTouchstart: _cache[1] || (_cache[1] = (...args) => $setup.handlePanStart && $setup.handlePanStart(...args)),
      onMousemove: _cache[2] || (_cache[2] = (...args) => $setup.handlePanMove && $setup.handlePanMove(...args)),
      onTouchmove: _cache[3] || (_cache[3] = (...args) => $setup.handlePanMove && $setup.handlePanMove(...args)),
      onMouseup: _cache[4] || (_cache[4] = (...args) => $setup.handlePanEnd && $setup.handlePanEnd(...args)),
      onTouchend: _cache[5] || (_cache[5] = (...args) => $setup.handlePanEnd && $setup.handlePanEnd(...args)),
      class: normalizeClass(["absolute h-full w-full cursor-grab border border-dashed border-gray-400", { "cursor-grabbing": $setup.operation === "move", operation: $setup.operation }])
    }, _hoisted_3$2, 34),
    createElementVNode("div", {
      onClick: _cache[6] || (_cache[6] = (...args) => $setup.onDelete && $setup.onDelete(...args)),
      class: "absolute left-0 right-0 top-0 m-auto h-4 w-4 -translate-y-1/2 transform cursor-pointer rounded-full bg-white md:scale-25"
    }, _hoisted_5$1),
    (openBlock(), createElementBlock("svg", _hoisted_6$1, [
      createElementVNode("path", {
        "stroke-width": "5",
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        stroke: "black",
        fill: "none",
        d: $props.path
      }, null, 8, _hoisted_7$1)
    ], 512))
  ], 4);
}
var Drawing = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = {
  setup(props, { emit }) {
    const signatureCanvas = ref();
    const paths = ref([]);
    const path = ref("");
    const data = reactive({
      drawing: false,
      x: 0,
      y: 0,
      minX: Infinity,
      minY: Infinity,
      maxX: 0,
      maxY: 0
    });
    const handleMousedown = (event) => {
      data.x = event.clientX;
      data.y = event.clientY;
      const target = event.target;
      handlePanStart({
        x: data.x,
        y: data.y,
        target,
        currentTarget: signatureCanvas.value
      });
      signatureCanvas.value.addEventListener("mousemove", handleMousemove);
      signatureCanvas.value.addEventListener("mouseup", handleMouseup);
    };
    const handleMousemove = (event) => {
      const dx = event.clientX - data.x;
      const dy = event.clientY - data.y;
      data.x = event.clientX;
      data.y = event.clientY;
      handlePanMove({
        x: data.x,
        y: data.y,
        dx,
        dy
      });
    };
    const handleMouseup = (event) => {
      data.x = event.clientX;
      data.y = event.clientY;
      handlePanEnd();
      signatureCanvas.value.removeEventListener("mousemove", handleMousemove);
      signatureCanvas.value.removeEventListener("mouseup", handleMouseup);
    };
    const handleTouchStart = (event) => {
      if (event.touches.length > 1)
        return;
      const touch = event.touches[0];
      data.x = touch.clientX;
      data.y = touch.clientY;
      const target = touch.target;
      handlePanStart({ x: data.x, y: data.y, target, currentTarget: signatureCanvas.value });
      signatureCanvas.value.addEventListener("touchmove", handleTouchmove);
      signatureCanvas.value.addEventListener("touchend", handleTouchend);
    };
    const handleTouchmove = (event) => {
      event.preventDefault();
      if (event.touches.length > 1)
        return;
      const touch = event.touches[0];
      const dx = touch.clientX - data.x;
      const dy = touch.clientY - data.y;
      data.x = touch.clientX;
      data.y = touch.clientY;
      handlePanMove({ x: data.x, y: data.y, dx, dy });
    };
    const handleTouchend = (event) => {
      const touch = event.changedTouches[0];
      data.x = touch.clientX;
      data.y = touch.clientY;
      handlePanEnd();
      signatureCanvas.value.removeEventListener("touchmove", handleTouchmove);
      signatureCanvas.value.removeEventListener("touchend", handleTouchend);
    };
    const handlePanStart = (event) => {
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
    const handlePanMove = (event) => {
      if (!data.drawing)
        return;
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
      var _a;
      if (!paths.value.length)
        return;
      const dx = -(data.minX - 10);
      const dy = -(data.minY - 10);
      const originWidth = data.maxX - data.minX + 20;
      const originHeight = data.maxY - data.minY + 20;
      let base64 = "";
      let scale = 1;
      if (originWidth > 500) {
        scale = 500 / originWidth;
      }
      const updatedPaths = paths.value.reduce((acc, cur) => {
        return acc + cur[0] + (cur[1] + dx) + "," + (cur[2] + dy);
      }, "");
      const svgElement = document.querySelector("svg");
      if (svgElement) {
        svgElement.removeAttribute("viewBox");
        (_a = svgElement.querySelector("path")) == null ? void 0 : _a.setAttribute("d", updatedPaths);
        const svgString = new XMLSerializer().serializeToString(svgElement);
        base64 = btoa(svgString);
      }
      emit("finish", {
        originWidth,
        originHeight,
        path: updatedPaths,
        scale,
        signatureImageData: base64
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
      cancel
    };
  }
};
const _hoisted_1$1 = {
  style: { "height": "50%" },
  class: "fixed left-0 right-0 top-0 z-10 border-b border-gray-300 bg-white shadow-lg"
};
const _hoisted_2$1 = { class: "absolute bottom-0 right-0 mb-4 mr-4 flex" };
const _hoisted_3$1 = { class: "pointer-events-none h-full w-full" };
const _hoisted_4$1 = ["d"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createElementVNode("div", {
      ref: "signatureCanvas",
      onPanstart: _cache[2] || (_cache[2] = (...args) => $setup.handlePanStart && $setup.handlePanStart(...args)),
      onPanmove: _cache[3] || (_cache[3] = (...args) => $setup.handlePanMove && $setup.handlePanMove(...args)),
      onPanend: _cache[4] || (_cache[4] = (...args) => $setup.handlePanEnd && $setup.handlePanEnd(...args)),
      class: "relative h-full w-full select-none"
    }, [
      createElementVNode("div", _hoisted_2$1, [
        createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.cancel && $setup.cancel(...args)),
          class: "mr-4 w-24 rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700"
        }, " Cancel "),
        createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.finish && $setup.finish(...args)),
          class: "w-24 rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-blue-700"
        }, " Done ")
      ]),
      (openBlock(), createElementBlock("svg", _hoisted_3$1, [
        createElementVNode("path", {
          "stroke-width": "5",
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
          d: $setup.path,
          stroke: "black",
          fill: "none"
        }, null, 8, _hoisted_4$1)
      ]))
    ], 544)
  ]);
}
var DrawingCanvas = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const scripts = [
  {
    name: "pdfjsLib",
    src: "https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.min.js"
  },
  {
    name: "PDFLib",
    src: "https://unpkg.com/pdf-lib@1.4.0/dist/pdf-lib.min.js"
  },
  {
    name: "download",
    src: "https://unpkg.com/downloadjs@1.4.7"
  }
];
const assets = {};
function getAsset(name) {
  if (assets[name])
    return assets[name];
  const script = scripts.find((s) => s.name === name);
  if (!script)
    throw new Error(`Script ${name} not exists.`);
  return prepareAsset(script);
}
function prepareAsset({
  name,
  src
}) {
  if (assets[name])
    return assets[name];
  const scriptRef = ref(null);
  assets[name] = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      scriptRef.value = window[name];
      console.log(`${name} is loaded.`);
      resolve(scriptRef);
    };
    script.onerror = () => {
      reject(`The script ${name} didn't load correctly.`);
      alert(
        `Some scripts did not load correctly. Please reload and try again.`
      );
    };
    document.body.appendChild(script);
  });
  return scriptRef;
}
function prepareAssets() {
  scripts.forEach(prepareAsset);
}
async function readAsPDF(file, type) {
  const pdfjsLib = await getAsset("pdfjsLib");
  if (type === "arrayBuffer") {
    const blob = new Blob([file]);
    const url = window.URL.createObjectURL(blob);
    return pdfjsLib.value.getDocument(url).promise;
  } else if (type === "string") {
    const dataUri = "data:application/pdf;base64," + file;
    return pdfjsLib.value.getDocument(dataUri).promise;
  }
}
function ggID() {
  let id = 0;
  return function genId() {
    return id++;
  };
}
async function save(pdfFile, objects, name) {
  const PDFLib = await getAsset("PDFLib");
  const download = await getAsset("download");
  let pdfDoc;
  try {
    pdfDoc = await PDFLib.value.PDFDocument.load(pdfFile);
    console.log(pdfDoc);
  } catch (e) {
    console.log("Failed to load PDF.");
    throw e;
  }
  const pagesProcesses = pdfDoc.getPages().map(async (page, pageIndex) => {
    const pageObjects = objects[pageIndex];
    const pageHeight = page.getHeight();
    const embedProcesses = pageObjects.map(async (object) => {
      if (object.type === "drawing") {
        const { x, y, path, scale } = object;
        console.log(object.scale, "scale", "position", x, y);
        const { pushGraphicsState, setLineCap, popGraphicsState, setLineJoin, LineCapStyle, LineJoinStyle } = PDFLib.value;
        return () => {
          page.pushOperators(pushGraphicsState(), setLineCap(LineCapStyle.Round), setLineJoin(LineJoinStyle.Round));
          page.drawSvgPath(path, {
            borderWidth: 5,
            scale,
            x,
            y: pageHeight - y
          });
          page.pushOperators(popGraphicsState());
        };
      }
    });
    const drawProcesses = await Promise.all(embedProcesses);
    drawProcesses.forEach((p) => p());
  });
  await Promise.all(pagesProcesses);
  try {
    const pdfBytes = await pdfDoc.save();
    console.log(pdfBytes);
    download.value(pdfBytes, name, "application/pdf");
    return pdfBytes;
  } catch (e) {
    console.log("Failed to save PDF.");
    throw e;
  }
}
var DrawSignPdf_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "DrawSignPdf",
  components: {
    PDFPage,
    DrawingCanvas,
    Drawing
  },
  props: { pdfData: String, signatureData: Array },
  setup(props, { emit }) {
    const genID = ggID();
    const pdfFile = ref(null);
    const pdfName = ref("");
    const pages = ref([]);
    const pagesScale = ref([]);
    const allObjects = ref([]);
    const currentFont = ref("Times-Roman");
    const focusId = ref(null);
    const selectedPageIndex = ref(-1);
    const saving = ref(false);
    const addingDrawing = ref(false);
    const signatureImageData = ref("");
    const signedDocument = ref("");
    onMounted(async () => {
      try {
        getAsset("pdfjsLib");
        selectedPageIndex.value = 0;
        prepareAssets();
        await addPDF(props.pdfData, "string");
        onAddDrawing();
      } catch (e) {
        console.log(e);
      }
    });
    const onUploadPDF = async (e) => {
      const files = e.target.files || e.dataTransfer && e.dataTransfer.files;
      const file = files[0];
      if (!file || file.type !== "application/pdf")
        return;
      selectedPageIndex.value = -1;
      try {
        await addPDF(file, "arrayBuffer");
        selectedPageIndex.value = 0;
      } catch (e2) {
        console.log(e2);
      }
    };
    const addPDF = async (file, type) => {
      try {
        const pdf = await readAsPDF(file, type);
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
    const onFinishDrawing = async (e) => {
      console.log(e);
      signatureImageData.value = e.signatureImageData;
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
    const addDrawing = (originWidth, originHeight, path, scale = 1) => {
      var _a, _b;
      allObjects.value = Array(allObjects.value.length).fill([]);
      console.log((_a = props.signatureData) == null ? void 0 : _a.length, props.signatureData);
      (_b = props.signatureData) == null ? void 0 : _b.forEach((signData) => {
        const id = genID();
        scale = cmToPx(signData.width) / originWidth;
        const object = {
          id,
          path,
          type: "drawing",
          x: cmToPx(signData.left),
          y: cmToPx(signData.top),
          originWidth,
          originHeight,
          width: cmToPx(signData.width),
          scale
        };
        console.log(cmToPx(signData.left), "left", cmToPx(signData.top), "top", cmToPx(signData.width), "width");
        allObjects.value = allObjects.value.map(
          (objects, pIndex) => signData.page === pIndex + 1 ? [...objects, object] : objects
        );
      });
    };
    const selectPage = (index) => {
      selectedPageIndex.value = index;
    };
    const updateObject = (objectId, payload) => {
      allObjects.value = allObjects.value.map(
        (objects, pIndex) => pIndex == selectedPageIndex.value ? objects.map(
          (object) => object.id === objectId ? { ...object, ...payload } : object
        ) : objects
      );
    };
    const deleteObject = (objectId) => {
      allObjects.value = allObjects.value.map(
        (objects, pIndex) => pIndex == selectedPageIndex.value ? objects.filter((object) => object.id !== objectId) : objects
      );
    };
    const onMeasure = (scale, i) => {
      pagesScale.value[i] = scale;
    };
    const cmToPx = (cm) => {
      const dpi = 96;
      const cpi = 2.54;
      const ppd = 1;
      return cm * dpi / cpi * ppd;
    };
    const savePDF = async () => {
      if (!pdfFile.value || saving.value || !pages.value.length)
        return;
      saving.value = true;
      try {
        const signatureImagetype = "image/svg+xml";
        signedDocument.value = await save(pdfFile.value, allObjects.value, pdfName.value);
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
      onFinishDrawing
    };
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-183725ea"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "flex min-h-screen flex-col items-center bg-gray-100 py-5" };
const _hoisted_2 = { class: "left-0 right-0 top-0 z-10 flex h-12 items-center justify-center" };
const _hoisted_3 = {
  key: 0,
  "transition:fly": "{ y: -200, duration: 500 }",
  class: "fixed left-0 right-0 top-0 z-10 border-b border-gray-300 bg-white shadow-lg",
  style: { "height": "50%" }
};
const _hoisted_4 = {
  key: 1,
  class: "w-full"
};
const _hoisted_5 = ["onMousedown", "onTouchstart"];
const _hoisted_6 = {
  key: 2,
  class: "flex w-full flex-grow items-center justify-center"
};
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", { class: "text-3xl font-bold text-gray-500" }, "Drag something here", -1));
const _hoisted_8 = [
  _hoisted_7
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DrawingCanvas = resolveComponent("DrawingCanvas");
  const _component_PDFPage = resolveComponent("PDFPage");
  const _component_Drawing = resolveComponent("Drawing");
  return openBlock(), createElementBlock("div", null, [
    createElementVNode("main", _hoisted_1, [
      createElementVNode("div", _hoisted_2, [
        createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onAddDrawing && _ctx.onAddDrawing(...args)),
          class: "mr-3 w-60 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4"
        }, " Update Signature "),
        createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.savePDF && _ctx.savePDF(...args)),
          class: normalizeClass(["mr-3 w-20 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4", {
            "cursor-not-allowed": _ctx.pages.length === 0 || _ctx.saving || !_ctx.pdfFile,
            "bg-blue-700": _ctx.pages.length === 0 || _ctx.saving || !_ctx.pdfFile
          }])
        }, toDisplayString(_ctx.saving ? "Saving" : "Save"), 3)
      ]),
      _ctx.addingDrawing ? (openBlock(), createElementBlock("div", _hoisted_3, [
        createVNode(_component_DrawingCanvas, {
          onFinish: _ctx.onFinishDrawing,
          onCancel: _cache[2] || (_cache[2] = ($event) => _ctx.addingDrawing = false)
        }, null, 8, ["onFinish"])
      ])) : createCommentVNode("", true),
      _ctx.pages.length ? (openBlock(), createElementBlock("div", _hoisted_4, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pages, (page, pIndex) => {
          return openBlock(), createElementBlock("div", {
            key: pIndex,
            class: "flex w-full flex-col items-center overflow-hidden p-5",
            onMousedown: ($event) => _ctx.selectPage(pIndex),
            onTouchstart: ($event) => _ctx.selectPage(pIndex)
          }, [
            createElementVNode("div", {
              class: normalizeClass(["relative shadow-lg", { "shadow-outline": pIndex === _ctx.selectedPageIndex }])
            }, [
              createVNode(_component_PDFPage, {
                onMeasure: (e) => _ctx.onMeasure(e, pIndex),
                page
              }, null, 8, ["onMeasure", "page"]),
              createElementVNode("div", {
                class: "absolute left-0 top-0 origin-top-left transform",
                style: normalizeStyle({
                  transform: `scale(${_ctx.pagesScale[pIndex].scale})`,
                  touchAction: "none"
                })
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.allObjects[pIndex], (object) => {
                  var _a;
                  return openBlock(), createElementBlock("div", {
                    key: object.id
                  }, [
                    object.type === "drawing" ? (openBlock(), createBlock(_component_Drawing, {
                      key: 0,
                      onUpdate: (e) => _ctx.updateObject(object.id, e),
                      onDelete: () => _ctx.deleteObject(object.id),
                      path: object.path,
                      x: object.x,
                      y: object.y,
                      width: object.width,
                      originWidth: object.originWidth,
                      originHeight: object.originHeight,
                      pageScale: (_a = _ctx.pagesScale[pIndex]) == null ? void 0 : _a.scale
                    }, null, 8, ["onUpdate", "onDelete", "path", "x", "y", "width", "originWidth", "originHeight", "pageScale"])) : createCommentVNode("", true)
                  ]);
                }), 128))
              ], 4)
            ], 2)
          ], 40, _hoisted_5);
        }), 128))
      ])) : (openBlock(), createElementBlock("div", _hoisted_6, _hoisted_8))
    ])
  ]);
}
var DrawSignPdf = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-183725ea"]]);
getAsset("pdfjsLib");
const install = (app) => {
  app.component(DrawSignPdf.name, DrawSignPdf);
};
DrawSignPdf.install = install;
export { DrawSignPdf, DrawSignPdf as default };
