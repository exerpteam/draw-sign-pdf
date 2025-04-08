import { ref as c, onMounted as q, onBeforeUnmount as $, createElementBlock as x, openBlock as w, createElementVNode as l, normalizeStyle as ee, defineComponent as ue, nextTick as ge, Fragment as R, toDisplayString as S, createCommentVNode as V, reactive as he, resolveComponent as U, createVNode as Q, normalizeClass as ae, renderList as se, createBlock as fe } from "vue";
import "pdf-lib";
import "downloadjs";
import "pdfjs-dist";
const ve = {
  props: {
    page: Object
  },
  setup(n, { emit: a }) {
    const s = c(null), t = c(0), d = c(0), e = () => {
      a("measure", {
        scale: s.value.clientWidth / t.value
      });
    };
    return q(async () => {
      const o = await n.page, h = s.value.getContext("2d"), f = o.getViewport({ scale: 1, rotation: 0 });
      t.value = f.width, d.value = f.height, await o.render({
        canvasContext: h,
        viewport: f
      }).promise.then(function() {
      }), a("measure", {
        scale: s.value.clientWidth / t.value
      }), window.addEventListener("resize", e);
    }), $(() => {
      window.removeEventListener("resize", e);
    }), {
      canvas: s,
      width: t,
      height: d
    };
  }
}, H = (n, a) => {
  const s = n.__vccOpts || n;
  for (const [t, d] of a)
    s[t] = d;
  return s;
}, me = ["width", "height"];
function pe(n, a, s, t, d, e) {
  return w(), x("div", null, [
    l("canvas", {
      ref: "canvas",
      id: "canvas",
      class: "max-w-full",
      style: ee({ width: `${t.width}px` }),
      width: t.width,
      height: t.height
    }, null, 12, me)
  ]);
}
const ye = /* @__PURE__ */ H(ve, [["render", pe], ["__scopeId", "data-v-ed76dd2b"]]), we = ue({
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
  setup(n, { emit: a }) {
    const s = c(0), t = c(0), d = c(0), e = c(""), o = c(""), h = c(0), f = c(0), P = c(null), v = n.originWidth / n.originHeight;
    return q(async () => {
      await ge(), P.value && P.value.setAttribute(
        "viewBox",
        `0 0 ${n.originWidth} ${n.originHeight}`
      );
    }), {
      dx: s,
      dy: t,
      dw: d,
      direction: e,
      operation: o,
      startX: h,
      startY: f,
      svg: P,
      ratio: v,
      handlePanStart: (m) => {
        h.value = m.type.startsWith("mouse") ? m.clientX : m.touches[0].clientX, f.value = m.type.startsWith("mouse") ? m.clientY : m.touches[0].clientY, m.target === m.currentTarget ? o.value = "move" : (o.value = "scale", e.value = m.target.dataset.direction || "");
      },
      handlePanMove: (m) => {
        const k = (m.type.startsWith("mouse") ? m.clientX : m.touches[0].clientX) - h.value, i = (m.type.startsWith("mouse") ? m.clientY : m.touches[0].clientY) - f.value;
        if (o.value === "move")
          s.value = k / n.pageScale, t.value = i / n.pageScale;
        else if (o.value === "scale") {
          if (e.value === "left-top") {
            const g = Math.min(k, i * v);
            s.value = g, d.value = -g, t.value = g / v;
          }
          if (e.value === "right-bottom") {
            const g = Math.max(k, i * v);
            d.value = g;
          }
        }
      },
      handlePanEnd: () => {
        o.value === "move" ? (a("update", {
          x: n.x + s.value,
          y: n.y + t.value
        }), s.value = 0, t.value = 0) : o.value === "scale" && (a("update", {
          x: n.x + s.value,
          y: n.y + t.value,
          width: n.width + d.value,
          scale: (n.width + d.value) / n.originWidth
        }), s.value = 0, t.value = 0, d.value = 0, e.value = ""), o.value = "";
      },
      onDelete: () => {
        a("delete");
      }
    };
  }
}), xe = {
  ref: "svg",
  width: "100%",
  height: "100%"
}, be = ["d"];
function _e(n, a, s, t, d, e) {
  return w(), x("div", {
    style: ee({
      width: `${n.width + n.dw}px`,
      height: `${n.height + n.dw}px`,
      transform: `translate(${n.x + n.dx}px, ${n.y + n.dy}px)`
    }),
    class: "absolute left-0 top-0 select-none"
  }, [
    a[0] || (a[0] = l("div", { class: "absolute h-full w-full cursor-grab border border-dashed border-gray-400" }, null, -1)),
    (w(), x("svg", xe, [
      l("path", {
        "stroke-width": "5",
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        stroke: "black",
        fill: "none",
        d: n.path
      }, null, 8, be)
    ], 512))
  ], 4);
}
const De = /* @__PURE__ */ H(we, [["render", _e], ["__scopeId", "data-v-30d5d24b"]]), Pe = {
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
  setup(n, { emit: a }) {
    return {
      finish: () => {
        a("finish");
      },
      closeModal: () => {
        a("cancel");
      }
    };
  }
}, Ce = { class: "confirm-modal relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md mt-40" }, Te = { class: "flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto" }, Se = { class: "flex justify-between items-center py-3 px-4 border-b" }, ke = { class: "font-bold text-gray-800" }, Le = { class: "sr-only" }, Me = { class: "p-4 overflow-y-auto" }, Ee = { class: "mt-1 text-gray-800" }, Xe = { class: "flex justify-end items-center gap-x-2 py-3 px-4 border-t" };
function Ye(n, a, s, t, d, e) {
  return w(), x(R, null, [
    a[4] || (a[4] = l("div", {
      id: "headlessui-dialog-overlay-16",
      "aria-hidden": "true",
      "data-headlessui-state": "open",
      class: "fixed inset-0 bg-gray-500 opacity-30"
    }, null, -1)),
    l("div", Ce, [
      l("div", Te, [
        l("div", Se, [
          l("h3", ke, S(e.getTranslation.title), 1),
          l("button", {
            onClick: a[0] || (a[0] = (...o) => t.closeModal && t.closeModal(...o)),
            type: "button",
            class: "flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          }, [
            l("span", Le, S(e.getTranslation.close), 1),
            a[3] || (a[3] = l("svg", {
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
        l("div", Me, [
          l("p", Ee, S(e.getTranslation.desc), 1)
        ]),
        l("div", Xe, [
          l("button", {
            onClick: a[1] || (a[1] = (...o) => t.closeModal && t.closeModal(...o)),
            type: "button",
            "data-cy": "close-confirm",
            class: "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none btn-negative"
          }, S(e.getTranslation.close), 1),
          s.type === "confirm" ? (w(), x("button", {
            key: 0,
            onClick: a[2] || (a[2] = (...o) => t.finish && t.finish(...o)),
            type: "button",
            "data-cy": "confirm-save",
            class: "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ml-2 btn-positive"
          }, S(e.getTranslation.saveChanges), 1)) : V("", !0)
        ])
      ])
    ])
  ], 64);
}
const Fe = /* @__PURE__ */ H(Pe, [["render", Ye], ["__scopeId", "data-v-31b2ddf9"]]), Be = {
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
  setup(n, { emit: a }) {
    const s = c(), t = c([]), d = c(""), e = he({
      drawing: !1,
      x: 0,
      y: 0,
      minX: 1 / 0,
      minY: 1 / 0,
      maxX: 0,
      maxY: 0
    }), o = (i) => {
      e.x = i.clientX, e.y = i.clientY;
      const g = i.target;
      u({
        x: e.x,
        y: e.y,
        target: g,
        currentTarget: s.value
      }), s.value.addEventListener("mousemove", h), s.value.addEventListener("mouseup", f);
    }, h = (i) => {
      i.clientX - e.x, i.clientY - e.y, e.x = i.clientX, e.y = i.clientY, C({
        x: e.x,
        y: e.y
      });
    }, f = (i) => {
      e.x = i.clientX, e.y = i.clientY, _(), s.value.removeEventListener("mousemove", h), s.value.removeEventListener("mouseup", f);
    }, P = (i) => {
      if (i.touches.length > 1) return;
      const g = i.touches[0];
      e.x = g.clientX, e.y = g.clientY;
      const B = g.target;
      u({ x: e.x, y: e.y, target: B, currentTarget: s.value }), s.value.addEventListener("touchmove", v), s.value.addEventListener("touchend", p);
    }, v = (i) => {
      if (i.preventDefault(), i.touches.length > 1) return;
      const g = i.touches[0];
      g.clientX - e.x, g.clientY - e.y, e.x = g.clientX, e.y = g.clientY, C({ x: e.x, y: e.y });
    }, p = (i) => {
      const g = i.changedTouches[0];
      e.x = g.clientX, e.y = g.clientY, _(), s.value.removeEventListener("touchmove", v), s.value.removeEventListener("touchend", p);
    }, u = (i) => {
      if (i.target !== i.currentTarget) {
        e.drawing = !1;
        return;
      }
      e.drawing = !0, e.x = i.x, e.y = i.y, e.minX = Math.min(e.minX, e.x), e.maxX = Math.max(e.maxX, e.x), e.minY = Math.min(e.minY, e.y), e.maxY = Math.max(e.maxY, e.y), t.value.push(["M", e.x, e.y]), d.value += `M${e.x},${e.y}`;
    }, C = (i) => {
      e.drawing && (e.x = i.x, e.y = i.y, e.minX = Math.min(e.minX, e.x), e.maxX = Math.max(e.maxX, e.x), e.minY = Math.min(e.minY, e.y), e.maxY = Math.max(e.maxY, e.y), d.value += `L${e.x},${e.y}`, t.value.push(["L", e.x, e.y]));
    }, _ = () => {
      e.drawing = !1;
    }, m = () => {
      var j;
      if (!t.value.length) return;
      const i = -(e.minX - 10), g = -(e.minY - 10), B = e.maxX - e.minX + 20, O = e.maxY - e.minY + 20;
      let W = "", L = "";
      const A = t.value.reduce((E, T) => E + T[0] + (T[1] + i) + "," + (T[2] + g), ""), M = document.getElementById("signature-path-data");
      if (M) {
        M.style.display = "none", M.removeAttribute("viewBox"), (j = M.querySelector("path")) == null || j.setAttribute("d", A);
        const E = new XMLSerializer().serializeToString(M);
        W = btoa(E);
        const T = new Image();
        T.src = "data:image/svg+xml;base64," + W, T.onload = () => {
          const X = document.createElement("canvas");
          X.style.display = "none", X.width = B, X.height = O;
          const F = X.getContext("2d");
          F == null || F.drawImage(T, 0, 0), L = X.toDataURL("image/png"), L = L.replace("data:image/png;base64,", ""), X.remove(), M.innerHTML = "", t.value = [], a("finish", {
            originWidth: B,
            originHeight: O,
            path: A,
            signatureImageData: {
              data: L,
              type: "image/png"
            }
          });
        };
      }
    }, k = () => {
      t.value = [], a("cancel");
    };
    return q(() => {
      s.value.addEventListener("mousedown", o), s.value.addEventListener("touchstart", P);
    }), $(() => {
      s.value.removeEventListener("mousedown", o), s.value.removeEventListener("touchstart", P);
    }), {
      signatureCanvas: s,
      paths: t,
      path: d,
      data: e,
      handlePanStart: u,
      handlePanMove: C,
      handlePanEnd: _,
      finish: m,
      cancel: k
    };
  }
}, Oe = {
  style: { height: "210px" },
  class: "left-0 right-0 top-0 z-0 border-b border-gray-300 bg-white shadow-lg",
  "data-cy": "sign-area"
}, We = { class: "absolute flex w-full flex-grow items-center justify-center" }, Ae = { class: "text-black-600" }, je = { class: "absolute bottom-0 right-0 mb-4 mx-4 flex" }, Ie = { class: "flex w-full flex-grow items-center justify-center" }, ze = { class: "text-black-600" }, He = {
  class: "pointer-events-none h-full w-full",
  id: "signature-path-data"
}, Ne = ["d"];
function Ue(n, a, s, t, d, e) {
  return w(), x("div", Oe, [
    l("div", {
      ref: "signatureCanvas",
      onPanstart: a[2] || (a[2] = (...o) => t.handlePanStart && t.handlePanStart(...o)),
      onPanmove: a[3] || (a[3] = (...o) => t.handlePanMove && t.handlePanMove(...o)),
      onPanend: a[4] || (a[4] = (...o) => t.handlePanEnd && t.handlePanEnd(...o)),
      class: "relative h-full w-full select-none"
    }, [
      l("div", We, [
        l("p", Ae, S(e.getTranslation.drawLabel), 1)
      ]),
      l("div", je, [
        l("div", Ie, [
          l("p", ze, S(e.getTranslation.additionalTextField), 1)
        ]),
        l("button", {
          onClick: a[0] || (a[0] = (...o) => t.finish && t.finish(...o)),
          class: "mx-4 w-24 rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-blue-700 btn-positive",
          "data-cy": "sign-done"
        }, S(e.getTranslation.drawDone), 1),
        l("button", {
          onClick: a[1] || (a[1] = (...o) => t.cancel && t.cancel(...o)),
          class: "w-24 rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700 btn-negative",
          "data-cy": "sign-cancel"
        }, S(e.getTranslation.drawCancel), 1)
      ]),
      (w(), x("svg", He, [
        l("path", {
          "stroke-width": "5",
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
          d: t.path,
          stroke: "black",
          fill: "none"
        }, null, 8, Ne)
      ]))
    ], 544)
  ]);
}
const Re = /* @__PURE__ */ H(Be, [["render", Ue]]), oe = [
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
], I = {};
function z(n) {
  if (I[n]) return I[n];
  const a = oe.find((s) => s.name === n);
  if (!a) throw new Error(`Script ${n} not exists.`);
  return ie(a);
}
function ie({
  name: n,
  src: a
}) {
  if (I[n]) return I[n];
  const s = c(null);
  return I[n] = new Promise((t, d) => {
    const e = document.createElement("script");
    e.src = a, e.onload = () => {
      s.value = window[n], t(s);
    }, e.onerror = () => {
      d(`The script ${n} didn't load correctly.`);
    }, document.body.appendChild(e);
  }), s;
}
function Ve() {
  oe.forEach(ie);
}
async function qe(n, a) {
  const s = await z("pdfjsLib");
  if (a === "arrayBuffer") {
    const t = new Blob([n]), d = window.URL.createObjectURL(t);
    return s.value.getDocument(d).promise;
  } else if (a === "string") {
    const t = "data:application/pdf;base64," + n;
    return s.value.getDocument(t).promise;
  }
}
function Ge() {
  let n = 0;
  return function() {
    return n++;
  };
}
async function Je(n, a, s, t = !1) {
  const d = await z("PDFLib"), e = await z("download");
  let o;
  try {
    o = await d.value.PDFDocument.load(n);
  } catch (f) {
    throw f;
  }
  const h = o.getPages().map(async (f, P) => {
    const v = a[P], p = f.getHeight(), u = v.map(async (_) => {
      if (_.type === "drawing") {
        const { x: m, y: k, path: i, originWidth: g, originHeight: B, width: O, height: W, scale: L } = _, A = g * L, M = B * L, j = m + (O - A) / 2, E = k + (W - M) / 2, {
          pushGraphicsState: T,
          setLineCap: X,
          popGraphicsState: F,
          setLineJoin: G,
          LineCapStyle: N,
          LineJoinStyle: r
        } = d.value;
        return () => {
          f.pushOperators(
            T(),
            X(N.Round),
            G(r.Round)
          ), f.drawSvgPath(i, {
            borderWidth: 5,
            scale: L,
            x: j,
            y: p - E
          }), f.pushOperators(F());
        };
      }
    });
    (await Promise.all(u)).forEach((_) => _());
  });
  await Promise.all(h);
  try {
    const f = await o.save();
    return t && e.value(f, s, "application/pdf"), await o.saveAsBase64();
  } catch (f) {
    throw f;
  }
}
const Ke = {
  name: "DrawSignPdf",
  components: {
    PDFPage: ye,
    DrawingCanvas: Re,
    DrawingSignature: De,
    DialogBox: Fe
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
  setup(n, { emit: a }) {
    const s = Ge(), t = c(null), d = c(""), e = c([]), o = c([]), h = c([]), f = c("Times-Roman"), P = c(null), v = c(-1), p = c(!1), u = c(!1), C = c(""), _ = c({
      data: "",
      type: "application/pdf"
    }), m = c(!1), k = c("warning");
    q(async () => {
      try {
        z("pdfjsLib"), v.value = 0, Ve(), await g(n.pdfData, "string"), O(), document.addEventListener("keydown", N);
      } catch {
      }
    }), $(() => {
      document.addEventListener("keydown", N);
    });
    const i = async (r) => {
      const y = (r.target.files || r.dataTransfer && r.dataTransfer.files)[0];
      if (!(!y || y.type !== "application/pdf")) {
        v.value = -1;
        try {
          await g(y, "arrayBuffer"), v.value = 0;
        } catch {
        }
      }
    }, g = async (r, b) => {
      try {
        const y = await qe(r, b);
        d.value = r.name, t.value = r;
        const D = y.numPages;
        e.value = Array.from({ length: D }).map(
          async (Y, J) => await y.getPage(J + 1)
        ), h.value = Array(D).fill([]), o.value = Array(D).fill({ scale: 1 });
      } catch (y) {
        throw y;
      }
    }, B = async (r) => {
      C.value = r.signatureImageData;
      const { originWidth: b, originHeight: y, path: D } = r;
      await W(b, y, D), u.value = !1;
    }, O = () => {
      v.value >= 0 && (u.value = !0);
    }, W = (r, b, y) => {
      var D;
      h.value = Array(h.value.length).fill([]), (D = n.signatureData) == null || D.forEach((Y) => {
        const J = s(), te = E(Y.width), ne = E(Y.height), le = te / r, re = ne / b, de = Math.min(le, re), ce = {
          id: J,
          path: y,
          type: "drawing",
          x: E(Y.left),
          y: E(Y.top),
          originWidth: r,
          originHeight: b,
          width: te,
          height: ne,
          scale: de
        }, K = Y.page - 1;
        h.value[K] && (h.value[K] = [
          ...h.value[K],
          ce
        ]);
      });
    }, L = (r) => {
      v.value = r;
    }, A = (r, b) => {
      h.value = h.value.map(
        (y, D) => D == v.value ? y.map(
          (Y) => Y.id === r ? { ...Y, ...b } : Y
        ) : y
      );
    }, M = (r) => {
      h.value = h.value.map(
        (b, y) => y == v.value ? b.filter((D) => D.id !== r) : b
      );
    }, j = (r, b) => {
      o.value[b] = r;
    }, E = (r) => r * 72 / 2.54, T = async () => {
      if (!(!t.value || p.value || !e.value.length)) {
        p.value = !0;
        try {
          const r = await Je(
            t.value,
            h.value,
            d.value,
            n.isDownload
          );
          _.value = { type: "application/pdf", data: r }, a("finish", {
            signedDocument: _.value,
            signatureImage: C.value
          });
        } catch {
        } finally {
          p.value = !1;
        }
      }
    }, X = () => {
      C.value !== "" ? k.value = "confirm" : k.value = "warning", m.value = !0, document.body.classList.add("overflow-y-hidden");
    }, F = () => {
      m.value = !1, document.body.classList.remove("overflow-y-hidden");
    }, G = () => {
      T(), F();
    }, N = (r) => {
      (r.key === "Escape" || r.key === "Esc") && F();
    };
    return {
      genID: s,
      pdfFile: t,
      pdfName: d,
      pages: e,
      pagesScale: o,
      allObjects: h,
      currentFont: f,
      focusId: P,
      selectedPageIndex: v,
      saving: p,
      addingDrawing: u,
      isOpenConfirm: m,
      onUploadPDF: i,
      addPDF: g,
      onAddDrawing: O,
      addDrawing: W,
      selectPage: L,
      updateObject: A,
      deleteObject: M,
      onMeasure: j,
      savePDF: T,
      onFinishDrawing: B,
      openModal: X,
      closeModal: F,
      confirmSave: G,
      isConfirmOrWarning: k
    };
  }
}, Qe = {
  key: 0,
  id: "modelConfirm",
  class: "fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-900 bg-opacity-60 px-4"
}, Ze = { class: "flex min-h-screen flex-col items-center bg-gray-100 py-5" }, $e = { class: "left-0 right-0 top-0 z-10 flex h-12 items-center justify-center" }, et = {
  key: 0,
  class: "sign-drawing-canvas fixed left-0 right-0 top-0 z-10 items-center justify-center border-b border-gray-300 bg-white shadow-lg",
  style: { height: "200px", "z-index": "60", width: "100%" },
  "data-cy": "sign-drawing-canvas"
}, tt = {
  key: 1,
  class: "w-full"
}, nt = ["onMousedown", "onTouchstart", "data-cy"], at = {
  key: 2,
  class: "flex w-full flex-grow items-center justify-center"
}, st = { class: "text-3xl font-bold text-gray-500" };
function ot(n, a, s, t, d, e) {
  const o = U("DialogBox"), h = U("DrawingCanvas"), f = U("PDFPage"), P = U("DrawingSignature");
  return w(), x(R, null, [
    t.isOpenConfirm ? (w(), x("div", Qe, [
      Q(o, {
        translations: e.getTranslation,
        type: t.isConfirmOrWarning,
        onCancel: t.closeModal,
        onFinish: t.confirmSave
      }, null, 8, ["translations", "type", "onCancel", "onFinish"])
    ])) : V("", !0),
    l("div", null, [
      l("main", Ze, [
        l("div", $e, [
          l("button", {
            onClick: a[0] || (a[0] = (...v) => t.onAddDrawing && t.onAddDrawing(...v)),
            class: "btn-positive ml-3 mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4",
            "data-cy": "update-sign"
          }, S(e.getTranslation.updateSign), 1),
          l("button", {
            onClick: a[1] || (a[1] = (...v) => t.openModal && t.openModal(...v)),
            class: ae(["btn-positive mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4", {
              "cursor-not-allowed": t.pages.length === 0 || t.saving || !t.pdfFile,
              "bg-blue-700": t.pages.length === 0 || t.saving || !t.pdfFile
            }]),
            "data-cy": "save-sign"
          }, S(t.saving ? e.getTranslation.saving : e.getTranslation.save), 3)
        ]),
        t.addingDrawing ? (w(), x("div", et, [
          Q(h, {
            onFinish: t.onFinishDrawing,
            onCancel: a[2] || (a[2] = (v) => t.addingDrawing = !1),
            translations: e.getTranslation
          }, null, 8, ["onFinish", "translations"])
        ])) : V("", !0),
        t.pages.length ? (w(), x("div", tt, [
          (w(!0), x(R, null, se(t.pages, (v, p) => (w(), x("div", {
            key: p,
            class: "flex w-full flex-col items-center overflow-hidden p-5",
            onMousedown: (u) => t.selectPage(p),
            onTouchstart: (u) => t.selectPage(p),
            "data-cy": "page-" + p
          }, [
            l("div", {
              class: ae(["relative shadow-lg", { "shadow-outline": p === t.selectedPageIndex }])
            }, [
              Q(f, {
                onMeasure: (u) => t.onMeasure(u, p),
                page: v
              }, null, 8, ["onMeasure", "page"]),
              l("div", {
                class: "absolute left-0 top-0 origin-top-left transform",
                style: ee({
                  transform: `scale(${t.pagesScale[p].scale})`,
                  touchAction: "none"
                })
              }, [
                (w(!0), x(R, null, se(t.allObjects[p], (u) => {
                  var C;
                  return w(), x("div", {
                    key: u.id
                  }, [
                    u.type === "drawing" ? (w(), fe(P, {
                      key: 0,
                      onUpdate: (_) => t.updateObject(u.id, _),
                      onDelete: () => t.deleteObject(u.id),
                      path: u.path,
                      x: u.x,
                      y: u.y,
                      width: u.width,
                      height: u.height,
                      originWidth: u.originWidth,
                      originHeight: u.originHeight,
                      pageScale: (C = t.pagesScale[p]) == null ? void 0 : C.scale,
                      "data-cy": "sign-pos-" + u.id
                    }, null, 8, ["onUpdate", "onDelete", "path", "x", "y", "width", "height", "originWidth", "originHeight", "pageScale", "data-cy"])) : V("", !0)
                  ]);
                }), 128))
              ], 4)
            ], 2)
          ], 40, nt))), 128))
        ])) : (w(), x("div", at, [
          l("span", st, S(e.getTranslation.pdfLoading), 1)
        ]))
      ])
    ])
  ], 64);
}
const Z = /* @__PURE__ */ H(Ke, [["render", ot], ["__scopeId", "data-v-a3da4acb"]]);
z("pdfjsLib");
const it = (n) => {
  n.component(Z.name, Z);
};
Z.install = it;
export {
  Z as DrawSignPdf,
  Z as default
};
