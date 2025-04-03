import { ref, onMounted, onBeforeUnmount, openBlock, createElementBlock, createElementVNode, normalizeStyle, defineComponent, nextTick, pushScopeId, popScopeId, Fragment, toDisplayString, createCommentVNode, reactive, resolveComponent, createVNode, normalizeClass, renderList, createBlock } from "vue";
var PDFPage_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$4 = {
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
const _hoisted_1$4 = ["width", "height"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createElementVNode("canvas", {
      ref: "canvas",
      id: "canvas",
      class: "max-w-full",
      style: normalizeStyle({ width: `${$setup.width}px` }),
      width: $setup.width,
      height: $setup.height
    }, null, 12, _hoisted_1$4)
  ]);
}
var PDFPage = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-98024af6"]]);
var DrawingSignature_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = defineComponent({
  props: {
    originWidth: Number,
    originHeight: Number,
    width: Number,
    height: Number,
    x: Number,
    y: Number,
    pageScale: {
      type: Number,
      default: 1
    },
    path: String
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
    const handlePanStart = (event) => {
      startX.value = event.type.startsWith("mouse") ? event.clientX : event.touches[0].clientX;
      startY.value = event.type.startsWith("mouse") ? event.clientY : event.touches[0].clientY;
      if (event.target === event.currentTarget) {
        operation.value = "move";
      } else {
        operation.value = "scale";
        direction.value = event.target.dataset.direction || "";
      }
    };
    const handlePanMove = (event) => {
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
    };
    const handlePanEnd = () => {
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
    };
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
      handlePanStart,
      handlePanMove,
      handlePanEnd,
      onDelete
    };
  }
});
const _withScopeId$1 = (n) => (pushScopeId("data-v-08f91d4b"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "absolute h-full w-full cursor-grab border border-dashed border-gray-400" }, null, -1));
const _hoisted_2$3 = {
  ref: "svg",
  width: "100%",
  height: "100%"
};
const _hoisted_3$3 = ["d"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    style: normalizeStyle({
      width: `${_ctx.width + _ctx.dw}px`,
      height: `${_ctx.height + _ctx.dw}px`,
      transform: `translate(${_ctx.x + _ctx.dx}px, ${_ctx.y + _ctx.dy}px)`
    }),
    class: "absolute left-0 top-0 select-none"
  }, [
    _hoisted_1$3,
    (openBlock(), createElementBlock("svg", _hoisted_2$3, [
      createElementVNode("path", {
        "stroke-width": "5",
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        stroke: "black",
        fill: "none",
        d: _ctx.path
      }, null, 8, _hoisted_3$3)
    ], 512))
  ], 4);
}
var DrawingSignature = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-08f91d4b"]]);
var DialogBox_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {
  props: {
    translations: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: "warning"
    }
  },
  computed: {
    getTranslation() {
      if (this.type === "warning") {
        return {
          title: this.translations.warningTitle,
          desc: this.translations.warningDesc,
          close: this.translations.warningClose
        };
      } else {
        return {
          title: this.translations.confirmBoxTitle,
          desc: this.translations.confirmBoxDesc,
          close: this.translations.confirmBoxClose,
          saveChanges: this.translations.confirmBoxSaveChanges
        };
      }
    }
  },
  emits: ["finish", "cancel"],
  setup(props, { emit }) {
    const closeModal = () => {
      emit("cancel");
    };
    const finish = () => {
      emit("finish");
    };
    return {
      finish,
      closeModal
    };
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-3f8b2d05"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", {
  id: "headlessui-dialog-overlay-16",
  "aria-hidden": "true",
  "data-headlessui-state": "open",
  class: "fixed inset-0 bg-gray-500 opacity-30"
}, null, -1));
const _hoisted_2$2 = { class: "confirm-modal relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md mt-40" };
const _hoisted_3$2 = { class: "flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto" };
const _hoisted_4$2 = { class: "flex justify-between items-center py-3 px-4 border-b" };
const _hoisted_5$2 = { class: "font-bold text-gray-800" };
const _hoisted_6$2 = { class: "sr-only" };
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "flex-shrink-0 size-4",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M18 6 6 18" }),
  /* @__PURE__ */ createElementVNode("path", { d: "m6 6 12 12" })
], -1));
const _hoisted_8$1 = { class: "p-4 overflow-y-auto" };
const _hoisted_9 = { class: "mt-1 text-gray-800" };
const _hoisted_10 = { class: "flex justify-end items-center gap-x-2 py-3 px-4 border-t" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$2,
    createElementVNode("div", _hoisted_2$2, [
      createElementVNode("div", _hoisted_3$2, [
        createElementVNode("div", _hoisted_4$2, [
          createElementVNode("h3", _hoisted_5$2, toDisplayString($options.getTranslation.title), 1),
          createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => $setup.closeModal && $setup.closeModal(...args)),
            type: "button",
            class: "flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          }, [
            createElementVNode("span", _hoisted_6$2, toDisplayString($options.getTranslation.close), 1),
            _hoisted_7$1
          ])
        ]),
        createElementVNode("div", _hoisted_8$1, [
          createElementVNode("p", _hoisted_9, toDisplayString($options.getTranslation.desc), 1)
        ]),
        createElementVNode("div", _hoisted_10, [
          createElementVNode("button", {
            onClick: _cache[1] || (_cache[1] = (...args) => $setup.closeModal && $setup.closeModal(...args)),
            type: "button",
            "data-cy": "close-confirm",
            class: "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none btn-negative"
          }, toDisplayString($options.getTranslation.close), 1),
          $props.type === "confirm" ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.finish && $setup.finish(...args)),
            type: "button",
            "data-cy": "confirm-save",
            class: "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ml-2 btn-positive"
          }, toDisplayString($options.getTranslation.saveChanges), 1)) : createCommentVNode("", true)
        ])
      ])
    ])
  ], 64);
}
var DialogBox = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-3f8b2d05"]]);
const _sfc_main$1 = {
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
        additionalTextField: ""
      };
      return { ...defaultTranslation, ...this.translations };
    }
  },
  emits: ["finish", "cancel"],
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
      let pngBase64 = "";
      const updatedPaths = paths.value.reduce((acc, cur) => {
        return acc + cur[0] + (cur[1] + dx) + "," + (cur[2] + dy);
      }, "");
      const svgElement = document.getElementById("signature-path-data");
      if (svgElement) {
        svgElement.style.display = "none";
        svgElement.removeAttribute("viewBox");
        (_a = svgElement.querySelector("path")) == null ? void 0 : _a.setAttribute("d", updatedPaths);
        const svgString = new XMLSerializer().serializeToString(svgElement);
        base64 = btoa(svgString);
        const img = new Image();
        img.src = "data:image/svg+xml;base64," + base64;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.style.display = "none";
          canvas.width = originWidth;
          canvas.height = originHeight;
          const context = canvas.getContext("2d");
          context == null ? void 0 : context.drawImage(img, 0, 0);
          pngBase64 = canvas.toDataURL("image/png");
          pngBase64 = pngBase64.replace("data:image/png;base64,", "");
          canvas.remove();
          svgElement.innerHTML = "";
          paths.value = [];
          emit("finish", {
            originWidth,
            originHeight,
            path: updatedPaths,
            signatureImageData: {
              data: pngBase64,
              type: "image/png"
            }
          });
        };
      }
    };
    const cancel = () => {
      paths.value = [];
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
  style: { "height": "210px" },
  class: "left-0 right-0 top-0 z-0 border-b border-gray-300 bg-white shadow-lg",
  "data-cy": "sign-area"
};
const _hoisted_2$1 = { class: "absolute bottom-0 right-0 mb-4 mx-4 flex" };
const _hoisted_3$1 = { class: "flex w-full flex-grow items-center justify-center" };
const _hoisted_4$1 = { class: "text-black-600" };
const _hoisted_5$1 = {
  class: "pointer-events-none h-full w-full",
  id: "signature-path-data"
};
const _hoisted_6$1 = ["d"];
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
        createElementVNode("div", _hoisted_3$1, [
          createElementVNode("p", _hoisted_4$1, toDisplayString($options.getTranslation.drawLabel), 1)
        ]),
        createElementVNode("span", null, toDisplayString($options.getTranslation.additionalTextField), 1),
        createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.finish && $setup.finish(...args)),
          class: "mx-4 w-24 rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-blue-700 btn-positive",
          "data-cy": "sign-done"
        }, toDisplayString($options.getTranslation.drawDone), 1),
        createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.cancel && $setup.cancel(...args)),
          class: "w-24 rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700 btn-negative",
          "data-cy": "sign-cancel"
        }, toDisplayString($options.getTranslation.drawCancel), 1)
      ]),
      (openBlock(), createElementBlock("svg", _hoisted_5$1, [
        createElementVNode("path", {
          "stroke-width": "5",
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
          d: $setup.path,
          stroke: "black",
          fill: "none"
        }, null, 8, _hoisted_6$1)
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
      resolve(scriptRef);
    };
    script.onerror = () => {
      reject(`The script ${name} didn't load correctly.`);
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
async function save(pdfFile, objects, name, isDownload = false) {
  const PDFLib = await getAsset("PDFLib");
  const download = await getAsset("download");
  let pdfDoc;
  try {
    pdfDoc = await PDFLib.value.PDFDocument.load(pdfFile);
  } catch (e) {
    throw e;
  }
  const pagesProcesses = pdfDoc.getPages().map(async (page, pageIndex) => {
    const pageObjects = objects[pageIndex];
    const pageHeight = page.getHeight();
    const embedProcesses = pageObjects.map(async (object) => {
      if (object.type === "drawing") {
        const { x, y, path, originWidth, originHeight, width, height, scale } = object;
        const scaledWidth = originWidth * scale;
        const scaledHeight = originHeight * scale;
        const centeredX = x + (width - scaledWidth) / 2;
        const centeredY = y + (height - scaledHeight) / 2;
        const {
          pushGraphicsState,
          setLineCap,
          popGraphicsState,
          setLineJoin,
          LineCapStyle,
          LineJoinStyle
        } = PDFLib.value;
        return () => {
          page.pushOperators(
            pushGraphicsState(),
            setLineCap(LineCapStyle.Round),
            setLineJoin(LineJoinStyle.Round)
          );
          page.drawSvgPath(path, {
            borderWidth: 5,
            scale,
            x: centeredX,
            y: pageHeight - centeredY
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
    if (isDownload) {
      download.value(pdfBytes, name, "application/pdf");
    }
    return await pdfDoc.saveAsBase64();
  } catch (e) {
    throw e;
  }
}
var DrawSignPdf_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "DrawSignPdf",
  components: {
    PDFPage,
    DrawingCanvas,
    DrawingSignature,
    DialogBox
  },
  props: {
    pdfData: String,
    signatureData: Array,
    isDownload: {
      type: Boolean,
      default: false
    },
    finish: Function,
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getTranslation() {
      const defaultTranslation = {
        updateSign: "Update Signature",
        save: "Save",
        saving: "Saving",
        drawLabel: "Draw the signature here",
        drawDone: "Done",
        drawCancel: "Cancel",
        confirmBoxTitle: "Confirm Saving",
        confirmBoxDesc: "Are you sure you want to save the signed document?",
        confirmBoxClose: "Close",
        confirmBoxSaveChanges: "Save Changes",
        warningTitle: "Missing Signature",
        warningDesc: "The required signature is missing. Please sign to continue",
        warningClose: "Close",
        pdfLoading: "PDF will load here",
        additionalTextField: ""
      };
      return { ...defaultTranslation, ...this.translations };
    }
  },
  emits: ["finish"],
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
    const signedDocument = ref({
      data: "",
      type: "application/pdf"
    });
    const isOpenConfirm = ref(false);
    const isConfirmOrWarning = ref("warning");
    onMounted(async () => {
      try {
        getAsset("pdfjsLib");
        selectedPageIndex.value = 0;
        prepareAssets();
        await addPDF(props.pdfData, "string");
        onAddDrawing();
        document.addEventListener("keydown", handleEscapeKey);
      } catch (e) {
      }
    });
    onBeforeUnmount(() => {
      document.addEventListener("keydown", handleEscapeKey);
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
        throw e;
      }
    };
    const onFinishDrawing = async (e) => {
      signatureImageData.value = e.signatureImageData;
      const { originWidth, originHeight, path } = e;
      await addDrawing(originWidth, originHeight, path);
      addingDrawing.value = false;
    };
    const onAddDrawing = () => {
      if (selectedPageIndex.value >= 0) {
        addingDrawing.value = true;
      }
    };
    const addDrawing = (originWidth, originHeight, path) => {
      var _a;
      allObjects.value = Array(allObjects.value.length).fill([]);
      (_a = props.signatureData) == null ? void 0 : _a.forEach((signData) => {
        const id = genID();
        const width = cmToPx(signData.width);
        const height = cmToPx(signData.height);
        const scaleX = width / originWidth;
        const scaleY = height / originHeight;
        const finalScale = Math.min(scaleX, scaleY);
        const object = {
          id,
          path,
          type: "drawing",
          x: cmToPx(signData.left),
          y: cmToPx(signData.top),
          originWidth,
          originHeight,
          width,
          height,
          scale: finalScale
        };
        const pageIndex = signData.page - 1;
        if (allObjects.value[pageIndex]) {
          allObjects.value[pageIndex] = [
            ...allObjects.value[pageIndex],
            object
          ];
        }
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
      const pointsPerInch = 72;
      const centimetersPerInch = 2.54;
      return cm * pointsPerInch / centimetersPerInch;
    };
    const savePDF = async () => {
      if (!pdfFile.value || saving.value || !pages.value.length)
        return;
      saving.value = true;
      try {
        const pdfData = await save(
          pdfFile.value,
          allObjects.value,
          pdfName.value,
          props.isDownload
        );
        signedDocument.value = { type: "application/pdf", data: pdfData };
        emit("finish", {
          signedDocument: signedDocument.value,
          signatureImage: signatureImageData.value
        });
      } catch (e) {
      } finally {
        saving.value = false;
      }
    };
    const openModal = () => {
      if (signatureImageData.value !== "") {
        isConfirmOrWarning.value = "confirm";
      } else {
        isConfirmOrWarning.value = "warning";
      }
      isOpenConfirm.value = true;
      document.body.classList.add("overflow-y-hidden");
    };
    const closeModal = () => {
      isOpenConfirm.value = false;
      document.body.classList.remove("overflow-y-hidden");
    };
    const confirmSave = () => {
      savePDF();
      closeModal();
    };
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        closeModal();
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
      isOpenConfirm,
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
      openModal,
      closeModal,
      confirmSave,
      isConfirmOrWarning
    };
  }
};
const _hoisted_1 = {
  key: 0,
  id: "modelConfirm",
  class: "fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-900 bg-opacity-60 px-4"
};
const _hoisted_2 = { class: "flex min-h-screen flex-col items-center bg-gray-100 py-5" };
const _hoisted_3 = { class: "left-0 right-0 top-0 z-10 flex h-12 items-center justify-center" };
const _hoisted_4 = {
  key: 0,
  class: "sign-drawing-canvas fixed left-0 right-0 top-0 z-10 items-center justify-center border-b border-gray-300 bg-white shadow-lg",
  style: { "height": "200px", "z-index": "60", "width": "100%" },
  "data-cy": "sign-drawing-canvas"
};
const _hoisted_5 = {
  key: 1,
  class: "w-full"
};
const _hoisted_6 = ["onMousedown", "onTouchstart", "data-cy"];
const _hoisted_7 = {
  key: 2,
  class: "flex w-full flex-grow items-center justify-center"
};
const _hoisted_8 = { class: "text-3xl font-bold text-gray-500" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DialogBox = resolveComponent("DialogBox");
  const _component_DrawingCanvas = resolveComponent("DrawingCanvas");
  const _component_PDFPage = resolveComponent("PDFPage");
  const _component_DrawingSignature = resolveComponent("DrawingSignature");
  return openBlock(), createElementBlock(Fragment, null, [
    $setup.isOpenConfirm ? (openBlock(), createElementBlock("div", _hoisted_1, [
      createVNode(_component_DialogBox, {
        translations: $options.getTranslation,
        type: $setup.isConfirmOrWarning,
        onCancel: $setup.closeModal,
        onFinish: $setup.confirmSave
      }, null, 8, ["translations", "type", "onCancel", "onFinish"])
    ])) : createCommentVNode("", true),
    createElementVNode("div", null, [
      createElementVNode("main", _hoisted_2, [
        createElementVNode("div", _hoisted_3, [
          createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => $setup.onAddDrawing && $setup.onAddDrawing(...args)),
            class: "btn-positive ml-3 mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4",
            "data-cy": "update-sign"
          }, toDisplayString($options.getTranslation.updateSign), 1),
          createElementVNode("button", {
            onClick: _cache[1] || (_cache[1] = (...args) => $setup.openModal && $setup.openModal(...args)),
            class: normalizeClass(["btn-positive mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4", {
              "cursor-not-allowed": $setup.pages.length === 0 || $setup.saving || !$setup.pdfFile,
              "bg-blue-700": $setup.pages.length === 0 || $setup.saving || !$setup.pdfFile
            }]),
            "data-cy": "save-sign"
          }, toDisplayString($setup.saving ? $options.getTranslation.saving : $options.getTranslation.save), 3)
        ]),
        $setup.addingDrawing ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createVNode(_component_DrawingCanvas, {
            onFinish: $setup.onFinishDrawing,
            onCancel: _cache[2] || (_cache[2] = ($event) => $setup.addingDrawing = false),
            translations: $options.getTranslation
          }, null, 8, ["onFinish", "translations"])
        ])) : createCommentVNode("", true),
        $setup.pages.length ? (openBlock(), createElementBlock("div", _hoisted_5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.pages, (page, pIndex) => {
            return openBlock(), createElementBlock("div", {
              key: pIndex,
              class: "flex w-full flex-col items-center overflow-hidden p-5",
              onMousedown: ($event) => $setup.selectPage(pIndex),
              onTouchstart: ($event) => $setup.selectPage(pIndex),
              "data-cy": "page-" + pIndex
            }, [
              createElementVNode("div", {
                class: normalizeClass(["relative shadow-lg", { "shadow-outline": pIndex === $setup.selectedPageIndex }])
              }, [
                createVNode(_component_PDFPage, {
                  onMeasure: (e) => $setup.onMeasure(e, pIndex),
                  page
                }, null, 8, ["onMeasure", "page"]),
                createElementVNode("div", {
                  class: "absolute left-0 top-0 origin-top-left transform",
                  style: normalizeStyle({
                    transform: `scale(${$setup.pagesScale[pIndex].scale})`,
                    touchAction: "none"
                  })
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($setup.allObjects[pIndex], (object) => {
                    var _a;
                    return openBlock(), createElementBlock("div", {
                      key: object.id
                    }, [
                      object.type === "drawing" ? (openBlock(), createBlock(_component_DrawingSignature, {
                        key: 0,
                        onUpdate: (e) => $setup.updateObject(object.id, e),
                        onDelete: () => $setup.deleteObject(object.id),
                        path: object.path,
                        x: object.x,
                        y: object.y,
                        width: object.width,
                        height: object.height,
                        originWidth: object.originWidth,
                        originHeight: object.originHeight,
                        pageScale: (_a = $setup.pagesScale[pIndex]) == null ? void 0 : _a.scale,
                        "data-cy": "sign-pos-" + object.id
                      }, null, 8, ["onUpdate", "onDelete", "path", "x", "y", "width", "height", "originWidth", "originHeight", "pageScale", "data-cy"])) : createCommentVNode("", true)
                    ]);
                  }), 128))
                ], 4)
              ], 2)
            ], 40, _hoisted_6);
          }), 128))
        ])) : (openBlock(), createElementBlock("div", _hoisted_7, [
          createElementVNode("span", _hoisted_8, toDisplayString($options.getTranslation.pdfLoading), 1)
        ]))
      ])
    ])
  ], 64);
}
var DrawSignPdf = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5db2334e"]]);
getAsset("pdfjsLib");
const install = (app) => {
  app.component(DrawSignPdf.name, DrawSignPdf);
};
DrawSignPdf.install = install;
export { DrawSignPdf, DrawSignPdf as default };
