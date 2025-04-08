import { ref as u, onMounted as K, onBeforeUnmount as ee, createElementBlock as b, openBlock as w, createElementVNode as l, normalizeStyle as te, defineComponent as re, nextTick as ce, Fragment as G, toDisplayString as S, createCommentVNode as J, reactive as de, resolveComponent as q, createVNode as Q, normalizeClass as ae, renderList as oe, createBlock as ge } from "vue";
import * as ue from "pdfjs-dist";
import { getDocument as he } from "pdfjs-dist";
import fe from "downloadjs";
import { PDFDocument as me, rgb as ve } from "pdf-lib";
const ye = {
  props: {
    page: Object
  },
  setup(a, { emit: n }) {
    const o = u(null), t = u(0), r = u(0), e = () => {
      n("measure", {
        scale: o.value.clientWidth / t.value
      });
    };
    return K(async () => {
      const s = await a.page, g = o.value.getContext("2d"), x = s.getViewport({ scale: 1, rotation: 0 });
      t.value = x.width, r.value = x.height, await s.render({
        canvasContext: g,
        viewport: x
      }).promise.then(function() {
      }), n("measure", {
        scale: o.value.clientWidth / t.value
      }), window.addEventListener("resize", e);
    }), ee(() => {
      window.removeEventListener("resize", e);
    }), {
      canvas: o,
      width: t,
      height: r
    };
  }
}, U = (a, n) => {
  const o = a.__vccOpts || a;
  for (const [t, r] of n)
    o[t] = r;
  return o;
}, pe = ["width", "height"];
function we(a, n, o, t, r, e) {
  return w(), b("div", null, [
    l("canvas", {
      ref: "canvas",
      id: "canvas",
      class: "max-w-full",
      style: te({ width: `${t.width}px` }),
      width: t.width,
      height: t.height
    }, null, 12, pe)
  ]);
}
const xe = /* @__PURE__ */ U(ye, [["render", we], ["__scopeId", "data-v-ed76dd2b"]]), be = re({
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
  setup(a, { emit: n }) {
    const o = u(0), t = u(0), r = u(0), e = u(""), s = u(""), g = u(0), x = u(0), _ = u(null), f = a.originWidth / a.originHeight;
    return K(async () => {
      await ce(), _.value && _.value.setAttribute(
        "viewBox",
        `0 0 ${a.originWidth} ${a.originHeight}`
      );
    }), {
      dx: o,
      dy: t,
      dw: r,
      direction: e,
      operation: s,
      startX: g,
      startY: x,
      svg: _,
      ratio: f,
      handlePanStart: (m) => {
        g.value = m.type.startsWith("mouse") ? m.clientX : m.touches[0].clientX, x.value = m.type.startsWith("mouse") ? m.clientY : m.touches[0].clientY, m.target === m.currentTarget ? s.value = "move" : (s.value = "scale", e.value = m.target.dataset.direction || "");
      },
      handlePanMove: (m) => {
        const k = (m.type.startsWith("mouse") ? m.clientX : m.touches[0].clientX) - g.value, i = (m.type.startsWith("mouse") ? m.clientY : m.touches[0].clientY) - x.value;
        if (s.value === "move")
          o.value = k / a.pageScale, t.value = i / a.pageScale;
        else if (s.value === "scale") {
          if (e.value === "left-top") {
            const h = Math.min(k, i * f);
            o.value = h, r.value = -h, t.value = h / f;
          }
          if (e.value === "right-bottom") {
            const h = Math.max(k, i * f);
            r.value = h;
          }
        }
      },
      handlePanEnd: () => {
        s.value === "move" ? (n("update", {
          x: a.x + o.value,
          y: a.y + t.value
        }), o.value = 0, t.value = 0) : s.value === "scale" && (n("update", {
          x: a.x + o.value,
          y: a.y + t.value,
          width: a.width + r.value,
          scale: (a.width + r.value) / a.originWidth
        }), o.value = 0, t.value = 0, r.value = 0, e.value = ""), s.value = "";
      },
      onDelete: () => {
        n("delete");
      }
    };
  }
}), De = {
  ref: "svg",
  width: "100%",
  height: "100%"
}, Pe = ["d"];
function _e(a, n, o, t, r, e) {
  return w(), b("div", {
    style: te({
      width: `${a.width + a.dw}px`,
      height: `${a.height + a.dw}px`,
      transform: `translate(${a.x + a.dx}px, ${a.y + a.dy}px)`
    }),
    class: "absolute left-0 top-0 select-none"
  }, [
    n[0] || (n[0] = l("div", { class: "absolute h-full w-full cursor-grab border border-dashed border-gray-400" }, null, -1)),
    (w(), b("svg", De, [
      l("path", {
        "stroke-width": "5",
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        stroke: "black",
        fill: "none",
        d: a.path
      }, null, 8, Pe)
    ], 512))
  ], 4);
}
const Ce = /* @__PURE__ */ U(be, [["render", _e], ["__scopeId", "data-v-30d5d24b"]]), Fe = {
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
      return this.type === "warning" ? {
        title: this.translations.warningTitle,
        desc: this.translations.warningDesc,
        close: this.translations.warningClose
      } : {
        title: this.translations.confirmBoxTitle,
        desc: this.translations.confirmBoxDesc,
        close: this.translations.confirmBoxClose,
        saveChanges: this.translations.confirmBoxSaveChanges
      };
    }
  },
  emits: ["finish", "cancel"],
  setup(a, { emit: n }) {
    return {
      finish: () => {
        n("finish");
      },
      closeModal: () => {
        n("cancel");
      }
    };
  }
}, Se = { class: "confirm-modal relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md mt-40" }, Te = { class: "flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto" }, ke = { class: "flex justify-between items-center py-3 px-4 border-b" }, Me = { class: "font-bold text-gray-800" }, Ee = { class: "sr-only" }, Le = { class: "p-4 overflow-y-auto" }, Be = { class: "mt-1 text-gray-800" }, Xe = { class: "flex justify-end items-center gap-x-2 py-3 px-4 border-t" };
function Ye(a, n, o, t, r, e) {
  return w(), b(G, null, [
    n[4] || (n[4] = l("div", {
      id: "headlessui-dialog-overlay-16",
      "aria-hidden": "true",
      "data-headlessui-state": "open",
      class: "fixed inset-0 bg-gray-500 opacity-30"
    }, null, -1)),
    l("div", Se, [
      l("div", Te, [
        l("div", ke, [
          l("h3", Me, S(e.getTranslation.title), 1),
          l("button", {
            onClick: n[0] || (n[0] = (...s) => t.closeModal && t.closeModal(...s)),
            type: "button",
            class: "flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          }, [
            l("span", Ee, S(e.getTranslation.close), 1),
            n[3] || (n[3] = l("svg", {
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
              l("path", { d: "M18 6 6 18" }),
              l("path", { d: "m6 6 12 12" })
            ], -1))
          ])
        ]),
        l("div", Le, [
          l("p", Be, S(e.getTranslation.desc), 1)
        ]),
        l("div", Xe, [
          l("button", {
            onClick: n[1] || (n[1] = (...s) => t.closeModal && t.closeModal(...s)),
            type: "button",
            "data-cy": "close-confirm",
            class: "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none btn-negative"
          }, S(e.getTranslation.close), 1),
          o.type === "confirm" ? (w(), b("button", {
            key: 0,
            onClick: n[2] || (n[2] = (...s) => t.finish && t.finish(...s)),
            type: "button",
            "data-cy": "confirm-save",
            class: "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ml-2 btn-positive"
          }, S(e.getTranslation.saveChanges), 1)) : J("", !0)
        ])
      ])
    ])
  ], 64);
}
const ze = /* @__PURE__ */ U(Fe, [["render", Ye], ["__scopeId", "data-v-31b2ddf9"]]), Ae = {
  props: {
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getTranslation() {
      return { ...{
        drawLabel: "Draw the signature here",
        drawDone: "Done",
        drawCancel: "Cancel",
        additionalTextField: ""
      }, ...this.translations };
    }
  },
  emits: ["finish", "cancel"],
  setup(a, { emit: n }) {
    const o = u(), t = u([]), r = u(""), e = de({
      drawing: !1,
      x: 0,
      y: 0,
      minX: 1 / 0,
      minY: 1 / 0,
      maxX: 0,
      maxY: 0
    }), s = (i) => {
      e.x = i.clientX, e.y = i.clientY;
      const h = i.target;
      c({
        x: e.x,
        y: e.y,
        target: h,
        currentTarget: o.value
      }), o.value.addEventListener("mousemove", g), o.value.addEventListener("mouseup", x);
    }, g = (i) => {
      i.clientX - e.x, i.clientY - e.y, e.x = i.clientX, e.y = i.clientY, D({
        x: e.x,
        y: e.y
      });
    }, x = (i) => {
      e.x = i.clientX, e.y = i.clientY, T(), o.value.removeEventListener("mousemove", g), o.value.removeEventListener("mouseup", x);
    }, _ = (i) => {
      if (i.touches.length > 1) return;
      const h = i.touches[0];
      e.x = h.clientX, e.y = h.clientY;
      const B = h.target;
      c({ x: e.x, y: e.y, target: B, currentTarget: o.value }), o.value.addEventListener("touchmove", f), o.value.addEventListener("touchend", v);
    }, f = (i) => {
      if (i.preventDefault(), i.touches.length > 1) return;
      const h = i.touches[0];
      h.clientX - e.x, h.clientY - e.y, e.x = h.clientX, e.y = h.clientY, D({ x: e.x, y: e.y });
    }, v = (i) => {
      const h = i.changedTouches[0];
      e.x = h.clientX, e.y = h.clientY, T(), o.value.removeEventListener("touchmove", f), o.value.removeEventListener("touchend", v);
    }, c = (i) => {
      if (i.target !== i.currentTarget) {
        e.drawing = !1;
        return;
      }
      e.drawing = !0, e.x = i.x, e.y = i.y, e.minX = Math.min(e.minX, e.x), e.maxX = Math.max(e.maxX, e.x), e.minY = Math.min(e.minY, e.y), e.maxY = Math.max(e.maxY, e.y), t.value.push(["M", e.x, e.y]), r.value += `M${e.x},${e.y}`;
    }, D = (i) => {
      e.drawing && (e.x = i.x, e.y = i.y, e.minX = Math.min(e.minX, e.x), e.maxX = Math.max(e.maxX, e.x), e.minY = Math.min(e.minY, e.y), e.maxY = Math.max(e.maxY, e.y), r.value += `L${e.x},${e.y}`, t.value.push(["L", e.x, e.y]));
    }, T = () => {
      e.drawing = !1;
    }, m = () => {
      var R;
      if (!t.value.length) return;
      const i = -(e.minX - 10), h = -(e.minY - 10), B = e.maxX - e.minX + 20, L = e.maxY - e.minY + 20;
      let A = "", X = "";
      const I = t.value.reduce((Y, E) => Y + E[0] + (E[1] + i) + "," + (E[2] + h), ""), M = document.getElementById("signature-path-data");
      if (M) {
        M.style.display = "none", M.removeAttribute("viewBox"), (R = M.querySelector("path")) == null || R.setAttribute("d", I);
        const Y = new XMLSerializer().serializeToString(M);
        A = btoa(Y);
        const E = new Image();
        E.src = "data:image/svg+xml;base64," + A, E.onload = () => {
          const z = document.createElement("canvas");
          z.style.display = "none", z.width = B, z.height = L;
          const W = z.getContext("2d");
          W == null || W.drawImage(E, 0, 0), X = z.toDataURL("image/png"), X = X.replace("data:image/png;base64,", ""), z.remove(), M.innerHTML = "", t.value = [], n("finish", {
            originWidth: B,
            originHeight: L,
            path: I,
            signatureImageData: {
              data: X,
              type: "image/png"
            }
          });
        };
      }
    }, k = () => {
      t.value = [], n("cancel");
    };
    return K(() => {
      o.value.addEventListener("mousedown", s), o.value.addEventListener("touchstart", _);
    }), ee(() => {
      o.value.removeEventListener("mousedown", s), o.value.removeEventListener("touchstart", _);
    }), {
      signatureCanvas: o,
      paths: t,
      path: r,
      data: e,
      handlePanStart: c,
      handlePanMove: D,
      handlePanEnd: T,
      finish: m,
      cancel: k
    };
  }
}, We = {
  style: { height: "210px" },
  class: "left-0 right-0 top-0 z-0 border-b border-gray-300 bg-white shadow-lg",
  "data-cy": "sign-area"
}, Ie = { class: "absolute flex w-full flex-grow items-center justify-center" }, Oe = { class: "text-black-600" }, je = { class: "absolute bottom-0 right-0 mb-4 mx-4 flex" }, He = { class: "flex w-full flex-grow items-center justify-center" }, Ne = { class: "text-black-600" }, Ue = {
  class: "pointer-events-none h-full w-full",
  id: "signature-path-data"
}, Re = ["d"];
function Ve(a, n, o, t, r, e) {
  return w(), b("div", We, [
    l("div", {
      ref: "signatureCanvas",
      onPanstart: n[2] || (n[2] = (...s) => t.handlePanStart && t.handlePanStart(...s)),
      onPanmove: n[3] || (n[3] = (...s) => t.handlePanMove && t.handlePanMove(...s)),
      onPanend: n[4] || (n[4] = (...s) => t.handlePanEnd && t.handlePanEnd(...s)),
      class: "relative h-full w-full select-none"
    }, [
      l("div", Ie, [
        l("p", Oe, S(e.getTranslation.drawLabel), 1)
      ]),
      l("div", je, [
        l("div", He, [
          l("p", Ne, S(e.getTranslation.additionalTextField), 1)
        ]),
        l("button", {
          onClick: n[0] || (n[0] = (...s) => t.finish && t.finish(...s)),
          class: "mx-4 w-24 rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-blue-700 btn-positive",
          "data-cy": "sign-done"
        }, S(e.getTranslation.drawDone), 1),
        l("button", {
          onClick: n[1] || (n[1] = (...s) => t.cancel && t.cancel(...s)),
          class: "w-24 rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700 btn-negative",
          "data-cy": "sign-cancel"
        }, S(e.getTranslation.drawCancel), 1)
      ]),
      (w(), b("svg", Ue, [
        l("path", {
          "stroke-width": "5",
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
          d: t.path,
          stroke: "black",
          fill: "none"
        }, null, 8, Re)
      ]))
    ], 544)
  ]);
}
const qe = /* @__PURE__ */ U(Ae, [["render", Ve]]), se = () => {
  ue.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
}, Ge = async (a, n = "string") => {
  let o;
  if (n === "string" && typeof a == "string") {
    console.log("Processing string input, length:", a.length);
    const e = atob(a);
    console.log("Binary string length:", e.length);
    const s = new Uint8Array(e.length);
    for (let g = 0; g < e.length; g++)
      s[g] = e.charCodeAt(g);
    o = s.buffer, console.log("ArrayBuffer size:", o.byteLength);
  } else if (a instanceof File)
    console.log("Processing File input, size:", a.size), o = await a.arrayBuffer(), console.log("File ArrayBuffer size:", o.byteLength);
  else
    throw new Error("Invalid input type for readAsPDF");
  const { PDFDocument: t } = await import("pdf-lib"), r = await t.load(o);
  return console.log("PDF document loaded successfully"), r;
}, Je = (a, n) => {
  fe(a, n, "application/pdf");
}, Ke = async (a) => {
  console.log("Getting PDF document from pdf-lib document");
  const n = await a.save();
  console.log("PDF bytes length:", n.length);
  const o = he({ data: n });
  return console.log("PDF.js loading task created"), o.promise;
}, $e = async (a, n) => a.getPage(n), Qe = async (a) => {
  const n = document.createElement("canvas"), o = a.getViewport({ scale: 1.5 }), t = n.getContext("2d");
  if (!t) throw new Error("Could not get canvas context");
  return n.height = o.height, n.width = o.width, await a.render({
    canvasContext: t,
    viewport: o
  }).promise, { page: a, canvas: n };
};
function Ze() {
  let a = 0;
  return function() {
    return a++;
  };
}
async function et(a, n, o, t = !1) {
  let r;
  try {
    const s = await a.arrayBuffer();
    r = await me.load(s);
  } catch (s) {
    throw console.error("Error loading PDF:", s), s;
  }
  const e = r.getPages().map(async (s, g) => {
    const x = n[g] || [], _ = s.getHeight(), f = x.map(async (c) => {
      if (c.type === "drawing") {
        const { x: D, y: T, path: m, originWidth: k, originHeight: i, width: h, height: B, scale: L } = c, A = k * L, X = i * L, I = D + (h - A) / 2, M = T + (B - X) / 2;
        s.drawSvgPath(m, {
          x: I,
          y: _ - M,
          scale: L,
          borderWidth: 5,
          borderColor: ve(0, 0, 0),
          borderLineCap: "Round",
          borderLineJoin: "Round"
        });
      }
    });
    (await Promise.all(f)).forEach((c) => c && c());
  });
  await Promise.all(e);
  try {
    const s = await r.save();
    return t && Je(s, o), await r.saveAsBase64();
  } catch (s) {
    throw console.error("Error saving PDF:", s), s;
  }
}
const tt = {
  name: "DrawSignPdf",
  components: {
    PDFPage: xe,
    DrawingCanvas: qe,
    DrawingSignature: Ce,
    DialogBox: ze
  },
  props: {
    pdfData: String,
    signatureData: Array,
    isDownload: {
      type: Boolean,
      default: !1
    },
    finish: Function,
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getTranslation() {
      return { ...{
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
      }, ...this.translations };
    }
  },
  emits: ["finish"],
  setup(a, { emit: n }) {
    const o = Ze(), t = u(null), r = u(""), e = u([]), s = u([]), g = u([]), x = u("Times-Roman"), _ = u(null), f = u(-1), v = u(!1), c = u(!1), D = u(""), T = u({
      data: "",
      type: "application/pdf"
    }), m = u(!1), k = u("warning");
    K(async () => {
      try {
        if (console.log("Initializing PDF.js..."), se(), console.log("PDF.js initialized"), console.log("Checking pdfData:", a.pdfData), !a.pdfData) {
          console.error("No PDF data provided");
          return;
        }
        f.value = 0, console.log("Starting PDF loading process..."), await h(a.pdfData, "string"), console.log("PDF loaded successfully"), L(), document.addEventListener("keydown", ne);
      } catch (d) {
        console.error("Error in onMounted:", d);
      }
    }), ee(() => {
      document.addEventListener("keydown", ne);
    });
    const i = async (d) => {
      const y = (d.target.files || d.dataTransfer && d.dataTransfer.files)[0];
      if (!(!y || y.type !== "application/pdf")) {
        f.value = -1;
        try {
          await h(y, "arrayBuffer"), f.value = 0;
        } catch {
        }
      }
    }, h = async (d, p) => {
      try {
        console.log("Starting addPDF with type:", p);
        const y = await Ge(d, p);
        console.log("PDF read successfully");
        const P = await Ke(y);
        console.log("PDF document loaded, number of pages:", P.numPages);
        const C = [], V = [], H = [];
        for (let F = 1; F <= P.numPages; F++) {
          const O = await $e(P, F);
          console.log(`Loading page ${F}...`);
          const { page: N } = await Qe(O);
          console.log(`Page ${F} rendered`), C.push(Promise.resolve(N)), V.push({ scale: 1 }), H.push([]);
        }
        if (e.value = C, s.value = V, g.value = H, p === "string") {
          const F = atob(d), O = new Uint8Array(F.length);
          for (let j = 0; j < F.length; j++)
            O[j] = F.charCodeAt(j);
          const N = new Blob([O], { type: "application/pdf" });
          t.value = new File([N], "document.pdf", { type: "application/pdf" }), r.value = "document.pdf";
        }
        console.log("All pages loaded and initialized");
      } catch (y) {
        throw console.error("Error in addPDF:", y), y;
      }
    }, B = async (d) => {
      D.value = d.signatureImageData;
      const { originWidth: p, originHeight: y, path: P } = d;
      await A(p, y, P), c.value = !1;
    }, L = () => {
      f.value >= 0 && (c.value = !0);
    }, A = (d, p, y) => {
      var P;
      g.value = Array(g.value.length).fill([]), (P = a.signatureData) == null || P.forEach((C) => {
        const V = o(), H = Y(C.width), F = Y(C.height), O = H / d, N = F / p, j = Math.min(O, N), le = {
          id: V,
          path: y,
          type: "drawing",
          x: Y(C.left),
          y: Y(C.top),
          originWidth: d,
          originHeight: p,
          width: H,
          height: F,
          scale: j
        }, $ = C.page - 1;
        g.value[$] && (g.value[$] = [
          ...g.value[$],
          le
        ]);
      });
    }, X = (d) => {
      f.value = d;
    }, I = (d, p) => {
      g.value = g.value.map(
        (y, P) => P == f.value ? y.map(
          (C) => C.id === d ? { ...C, ...p } : C
        ) : y
      );
    }, M = (d) => {
      g.value = g.value.map(
        (p, y) => y == f.value ? p.filter((P) => P.id !== d) : p
      );
    }, R = (d, p) => {
      s.value[p] = d;
    }, Y = (d) => d * 72 / 2.54, E = async () => {
      if (!t.value || v.value || !e.value.length) {
        console.error("Cannot save: missing pdfFile or pages, or already saving");
        return;
      }
      v.value = !0;
      try {
        console.log("Starting PDF save process...");
        const d = await et(
          t.value,
          g.value,
          r.value,
          a.isDownload
        );
        console.log("PDF saved successfully"), T.value = { type: "application/pdf", data: d }, n("finish", {
          signedDocument: T.value,
          signatureImage: D.value
        }), console.log("Finish event emitted");
      } catch (d) {
        console.error("Error saving PDF:", d);
      } finally {
        v.value = !1;
      }
    }, z = () => {
      D.value !== "" ? k.value = "confirm" : k.value = "warning", m.value = !0, document.body.classList.add("overflow-y-hidden");
    }, W = () => {
      m.value = !1, document.body.classList.remove("overflow-y-hidden");
    }, ie = () => {
      E(), W();
    }, ne = (d) => {
      (d.key === "Escape" || d.key === "Esc") && W();
    };
    return {
      genID: o,
      pdfFile: t,
      pdfName: r,
      pages: e,
      pagesScale: s,
      allObjects: g,
      currentFont: x,
      focusId: _,
      selectedPageIndex: f,
      saving: v,
      addingDrawing: c,
      isOpenConfirm: m,
      onUploadPDF: i,
      addPDF: h,
      onAddDrawing: L,
      addDrawing: A,
      selectPage: X,
      updateObject: I,
      deleteObject: M,
      onMeasure: R,
      savePDF: E,
      onFinishDrawing: B,
      openModal: z,
      closeModal: W,
      confirmSave: ie,
      isConfirmOrWarning: k
    };
  }
}, nt = {
  key: 0,
  id: "modelConfirm",
  class: "fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-900 bg-opacity-60 px-4"
}, at = { class: "flex min-h-screen flex-col items-center bg-gray-100 py-5" }, ot = { class: "left-0 right-0 top-0 z-10 flex h-12 items-center justify-center" }, st = {
  key: 0,
  class: "sign-drawing-canvas fixed left-0 right-0 top-0 z-10 items-center justify-center border-b border-gray-300 bg-white shadow-lg",
  style: { height: "200px", "z-index": "60", width: "100%" },
  "data-cy": "sign-drawing-canvas"
}, it = {
  key: 1,
  class: "w-full"
}, lt = ["onMousedown", "onTouchstart", "data-cy"], rt = {
  key: 2,
  class: "flex w-full flex-grow items-center justify-center"
}, ct = { class: "text-3xl font-bold text-gray-500" };
function dt(a, n, o, t, r, e) {
  const s = q("DialogBox"), g = q("DrawingCanvas"), x = q("PDFPage"), _ = q("DrawingSignature");
  return w(), b(G, null, [
    t.isOpenConfirm ? (w(), b("div", nt, [
      Q(s, {
        translations: e.getTranslation,
        type: t.isConfirmOrWarning,
        onCancel: t.closeModal,
        onFinish: t.confirmSave
      }, null, 8, ["translations", "type", "onCancel", "onFinish"])
    ])) : J("", !0),
    l("div", null, [
      l("main", at, [
        l("div", ot, [
          l("button", {
            onClick: n[0] || (n[0] = (...f) => t.onAddDrawing && t.onAddDrawing(...f)),
            class: "btn-positive ml-3 mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4",
            "data-cy": "update-sign"
          }, S(e.getTranslation.updateSign), 1),
          l("button", {
            onClick: n[1] || (n[1] = (...f) => t.openModal && t.openModal(...f)),
            class: ae(["btn-positive mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4", {
              "cursor-not-allowed": t.pages.length === 0 || t.saving,
              "bg-blue-700": t.pages.length === 0 || t.saving
            }]),
            "data-cy": "save-sign"
          }, S(t.saving ? e.getTranslation.saving : e.getTranslation.save), 3)
        ]),
        t.addingDrawing ? (w(), b("div", st, [
          Q(g, {
            onFinish: t.onFinishDrawing,
            onCancel: n[2] || (n[2] = (f) => t.addingDrawing = !1),
            translations: e.getTranslation
          }, null, 8, ["onFinish", "translations"])
        ])) : J("", !0),
        t.pages.length ? (w(), b("div", it, [
          (w(!0), b(G, null, oe(t.pages, (f, v) => (w(), b("div", {
            key: v,
            class: "flex w-full flex-col items-center overflow-hidden p-5",
            onMousedown: (c) => t.selectPage(v),
            onTouchstart: (c) => t.selectPage(v),
            "data-cy": "page-" + v
          }, [
            l("div", {
              class: ae(["relative shadow-lg", { "shadow-outline": v === t.selectedPageIndex }])
            }, [
              Q(x, {
                onMeasure: (c) => t.onMeasure(c, v),
                page: f
              }, null, 8, ["onMeasure", "page"]),
              l("div", {
                class: "absolute left-0 top-0 origin-top-left transform",
                style: te({
                  transform: `scale(${t.pagesScale[v].scale})`,
                  touchAction: "none"
                })
              }, [
                (w(!0), b(G, null, oe(t.allObjects[v], (c) => {
                  var D;
                  return w(), b("div", {
                    key: c.id
                  }, [
                    c.type === "drawing" ? (w(), ge(_, {
                      key: 0,
                      onUpdate: (T) => t.updateObject(c.id, T),
                      onDelete: () => t.deleteObject(c.id),
                      path: c.path,
                      x: c.x,
                      y: c.y,
                      width: c.width,
                      height: c.height,
                      originWidth: c.originWidth,
                      originHeight: c.originHeight,
                      pageScale: (D = t.pagesScale[v]) == null ? void 0 : D.scale,
                      "data-cy": "sign-pos-" + c.id
                    }, null, 8, ["onUpdate", "onDelete", "path", "x", "y", "width", "height", "originWidth", "originHeight", "pageScale", "data-cy"])) : J("", !0)
                  ]);
                }), 128))
              ], 4)
            ], 2)
          ], 40, lt))), 128))
        ])) : (w(), b("div", rt, [
          l("span", ct, S(e.getTranslation.pdfLoading), 1)
        ]))
      ])
    ])
  ], 64);
}
const Z = /* @__PURE__ */ U(tt, [["render", dt], ["__scopeId", "data-v-a4538877"]]);
se();
const gt = (a) => {
  a.component(Z.name, Z);
};
Z.install = gt;
export {
  Z as DrawSignPdf,
  Z as default
};
