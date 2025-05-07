import { ref as g, onMounted as J, onBeforeUnmount as ae, createElementBlock as w, openBlock as v, createElementVNode as i, normalizeStyle as oe, defineComponent as se, nextTick as we, normalizeClass as ne, computed as ie, Fragment as V, toDisplayString as T, createCommentVNode as I, reactive as be, markRaw as xe, resolveComponent as R, createVNode as $, renderList as de, createBlock as Pe } from "vue";
import * as De from "pdfjs-dist";
import { getDocument as Me } from "pdfjs-dist";
import Se from "downloadjs";
import { PDFDocument as Ce, rgb as ke } from "pdf-lib";
const Te = {
  props: {
    page: Object,
    zoomScale: Number,
    finishedRendering: Function
  },
  setup(e, { emit: t }) {
    const d = g(null), a = g(0), l = g(0), r = () => {
      d.value && d.value.clientWidth && a.value && t("measure", {
        scale: d.value.clientWidth / a.value
      });
    };
    return J(async () => {
      const o = await e.page, n = d.value.getContext("2d"), x = o.getViewport({ scale: e.zoomScale || 1, rotation: 0 });
      a.value = x.width, l.value = x.height, await o.render({
        canvasContext: n,
        viewport: x
      }).promise.then(function() {
        t("finishedRendering"), r();
      }), window.addEventListener("resize", r);
    }), ae(() => {
      window.removeEventListener("resize", r);
    }), {
      canvas: d,
      width: a,
      height: l
    };
  }
}, q = (e, t) => {
  const d = e.__vccOpts || e;
  for (const [a, l] of t)
    d[a] = l;
  return d;
}, Fe = ["width", "height"];
function ze(e, t, d, a, l, r) {
  return v(), w("div", null, [
    i("canvas", {
      ref: "canvas",
      id: "canvas",
      class: "max-w-full",
      style: oe({ width: `${a.width}px` }),
      width: a.width,
      height: a.height
    }, null, 12, Fe)
  ]);
}
const Ee = /* @__PURE__ */ q(Te, [["render", ze], ["__scopeId", "data-v-fc4cca72"]]), Be = se({
  props: {
    originWidth: { type: Number, required: !0 },
    originHeight: { type: Number, required: !0 },
    width: { type: Number, required: !0 },
    height: { type: Number, required: !0 },
    x: { type: Number, required: !0 },
    y: { type: Number, required: !0 },
    pageScale: { type: Number, default: 1 },
    path: { type: String, required: !0 },
    zoomScale: { type: Number, required: !0 }
  },
  emits: ["delete", "update"],
  setup(e, { emit: t }) {
    const d = g(0), a = g(0), l = g(0), r = g(""), o = g(""), n = g(0), x = g(0), P = g(null), y = e.originWidth / e.originHeight;
    return J(async () => {
      await we(), P.value && P.value.setAttribute(
        "viewBox",
        `0 0 ${e.originWidth} ${e.originHeight}`
      );
    }), {
      dx: d,
      dy: a,
      dw: l,
      direction: r,
      operation: o,
      startX: n,
      startY: x,
      svg: P,
      ratio: y,
      handlePanStart: (h) => {
        if (n.value = h instanceof MouseEvent ? h.clientX : h.touches[0].clientX, x.value = h instanceof MouseEvent ? h.clientY : h.touches[0].clientY, h.target === h.currentTarget)
          o.value = "move";
        else {
          const D = h.target;
          o.value = "scale", r.value = D.dataset.direction || "";
        }
      },
      handlePanMove: (h) => {
        const D = h instanceof MouseEvent ? h.clientX : h.touches[0].clientX, F = h instanceof MouseEvent ? h.clientY : h.touches[0].clientY, z = D - n.value, s = F - x.value;
        if (o.value === "move")
          d.value = z / e.pageScale, a.value = s / e.pageScale;
        else if (o.value === "scale") {
          if (r.value === "left-top") {
            const u = Math.min(z, s * y);
            d.value = u, l.value = -u, a.value = u / y;
          }
          if (r.value === "right-bottom") {
            const u = Math.max(z, s * y);
            l.value = u;
          }
        }
      },
      handlePanEnd: () => {
        o.value === "move" ? (t("update", {
          x: e.x + d.value,
          y: e.y + a.value
        }), d.value = 0, a.value = 0) : o.value === "scale" && (t("update", {
          x: e.x + d.value,
          y: e.y + a.value,
          width: e.width + l.value,
          scale: (e.width + l.value) / e.originWidth
        }), d.value = 0, a.value = 0, l.value = 0, r.value = ""), o.value = "";
      },
      onDelete: () => {
        t("delete");
      }
    };
  }
}), Le = "data:image/svg+xml,%3csvg%20height='512pt'%20viewBox='0%200%20512%20512'%20width='512pt'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23f56565'%20d='m437.019531%2074.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969%2026.628906-181.019531%2074.980469c-48.351563%2048.351562-74.980469%20112.640625-74.980469%20181.019531%200%2068.382812%2026.628906%20132.667969%2074.980469%20181.019531%2048.351562%2048.351563%20112.640625%2074.980469%20181.019531%2074.980469s132.667969-26.628906%20181.019531-74.980469c48.351563-48.351562%2074.980469-112.636719%2074.980469-181.019531%200-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969%20256.386719c9.761719%209.765624%209.761719%2025.59375%200%2035.355468-4.882812%204.882813-11.28125%207.324219-17.679687%207.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188%2075.371093c-4.882812%204.878907-11.28125%207.320313-17.679687%207.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375%200-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375%200-35.355468%209.765624-9.765625%2025.59375-9.765625%2035.355468%200l75.371094%2075.367187%2075.367188-75.367187c9.765624-9.761719%2025.59375-9.765625%2035.355468%200%209.765625%209.761718%209.765625%2025.589844%200%2035.355468l-75.367187%2075.367188zm0%200'/%3e%3c/svg%3e", Xe = {
  ref: "svg",
  width: "100%",
  height: "100%"
}, Ye = ["d"];
function Ae(e, t, d, a, l, r) {
  return v(), w("div", {
    style: oe({
      width: `${(e.width + e.dw) * e.zoomScale}px`,
      height: `${(e.height + e.dw) * e.zoomScale}px`,
      transform: `translate(${(e.x + e.dx) * e.zoomScale}px, ${(e.y + e.dy) * e.zoomScale}px)`
    }),
    class: "absolute left-0 top-0 select-none"
  }, [
    i("div", {
      class: ne(["absolute h-full w-full cursor-grab border border-dashed border-gray-400", { "cursor-grabbing": e.operation === "move", operation: e.operation }]),
      onMousedown: t[0] || (t[0] = (...o) => e.handlePanStart && e.handlePanStart(...o)),
      onMousemove: t[1] || (t[1] = (...o) => e.handlePanMove && e.handlePanMove(...o)),
      onMouseup: t[2] || (t[2] = (...o) => e.handlePanEnd && e.handlePanEnd(...o)),
      onTouchstart: t[3] || (t[3] = (...o) => e.handlePanStart && e.handlePanStart(...o)),
      onTouchmove: t[4] || (t[4] = (...o) => e.handlePanMove && e.handlePanMove(...o)),
      onTouchend: t[5] || (t[5] = (...o) => e.handlePanEnd && e.handlePanEnd(...o))
    }, t[7] || (t[7] = [
      i("div", {
        "data-direction": "left-top",
        class: "absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform cursor-nwse-resize rounded-full bg-green-400 md:scale-25"
      }, null, -1),
      i("div", {
        "data-direction": "right-bottom",
        class: "absolute bottom-0 right-0 h-4 w-4 translate-x-1/2 translate-y-1/2 transform cursor-nwse-resize rounded-full bg-green-400 md:scale-25"
      }, null, -1)
    ]), 34),
    i("div", {
      onClick: t[6] || (t[6] = (...o) => e.onDelete && e.onDelete(...o)),
      class: "absolute left-0 right-0 top-0 m-auto h-4 w-4 -translate-y-1/2 transform cursor-pointer rounded-full bg-white md:scale-25"
    }, t[8] || (t[8] = [
      i("img", {
        class: "h-full w-full",
        src: Le,
        alt: "delete",
        "data-cy": "delete-sign"
      }, null, -1)
    ])),
    (v(), w("svg", Xe, [
      i("path", {
        "stroke-width": "5",
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        stroke: "black",
        fill: "none",
        d: e.path
      }, null, 8, Ye)
    ], 512))
  ], 4);
}
const Oe = /* @__PURE__ */ q(Be, [["render", Ae], ["__scopeId", "data-v-9fe1a5ff"]]), $e = se({
  name: "DialogBox",
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
  emits: ["finish", "cancel"],
  setup(e, { emit: t }) {
    return {
      getTranslation: ie(() => {
        const r = e.translations;
        return e.type === "warning" ? {
          title: r.warningTitle,
          desc: r.warningDesc,
          close: r.warningClose
        } : {
          title: r.confirmBoxTitle,
          desc: r.confirmBoxDesc,
          close: r.confirmBoxClose,
          saveChanges: r.confirmBoxSaveChanges
        };
      }),
      closeModal: () => t("cancel"),
      finish: () => t("finish")
    };
  }
}), Ie = { class: "confirm-modal relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md mt-40" }, _e = { class: "flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto" }, We = { class: "flex justify-between items-center py-3 px-4 border-b" }, Ne = { class: "font-bold text-gray-800" }, je = { class: "sr-only" }, Re = { class: "p-4 overflow-y-auto" }, He = { class: "mt-1 text-gray-800" }, Ze = { class: "flex justify-end items-center gap-x-2 py-3 px-4 border-t" };
function qe(e, t, d, a, l, r) {
  return v(), w(V, null, [
    t[4] || (t[4] = i("div", {
      id: "headlessui-dialog-overlay-16",
      "aria-hidden": "true",
      "data-headlessui-state": "open",
      class: "fixed inset-0 bg-gray-500 opacity-30"
    }, null, -1)),
    i("div", Ie, [
      i("div", _e, [
        i("div", We, [
          i("h3", Ne, T(e.getTranslation.title), 1),
          i("button", {
            onClick: t[0] || (t[0] = (...o) => e.closeModal && e.closeModal(...o)),
            type: "button",
            class: "flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          }, [
            i("span", je, T(e.getTranslation.close), 1),
            t[3] || (t[3] = i("svg", {
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
              i("path", { d: "M18 6 6 18" }),
              i("path", { d: "m6 6 12 12" })
            ], -1))
          ])
        ]),
        i("div", Re, [
          i("p", He, T(e.getTranslation.desc), 1)
        ]),
        i("div", Ze, [
          i("button", {
            onClick: t[1] || (t[1] = (...o) => e.closeModal && e.closeModal(...o)),
            type: "button",
            "data-cy": "close-confirm",
            class: "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none btn-negative"
          }, T(e.getTranslation.close), 1),
          e.type === "confirm" ? (v(), w("button", {
            key: 0,
            onClick: t[2] || (t[2] = (...o) => e.finish && e.finish(...o)),
            type: "button",
            "data-cy": "confirm-save",
            class: "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ml-2 btn-positive"
          }, T(e.getTranslation.saveChanges), 1)) : I("", !0)
        ])
      ])
    ])
  ], 64);
}
const Ue = /* @__PURE__ */ q($e, [["render", qe], ["__scopeId", "data-v-a1ca1473"]]), Ge = se({
  name: "DrawingCanvas",
  props: {
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["finish", "cancel"],
  setup(e, { emit: t }) {
    const d = {
      drawLabel: "Draw the signature here",
      drawDone: "Done",
      drawCancel: "Cancel",
      additionalTextField: ""
    }, a = ie(() => ({
      ...d,
      ...e.translations
    })), l = g(null), r = g([]), o = g(""), n = be({
      drawing: !1,
      x: 0,
      y: 0,
      minX: 1 / 0,
      minY: 1 / 0,
      maxX: 0,
      maxY: 0
    }), x = (s) => {
      if (s.target !== s.currentTarget) {
        n.drawing = !1;
        return;
      }
      n.drawing = !0, n.x = s.x, n.y = s.y, n.minX = Math.min(n.minX, n.x), n.maxX = Math.max(n.maxX, n.x), n.minY = Math.min(n.minY, n.y), n.maxY = Math.max(n.maxY, n.y), r.value.push(["M", n.x, n.y]), o.value += `M${n.x},${n.y}`;
    }, P = (s) => {
      n.drawing && (n.x = s.x, n.y = s.y, n.minX = Math.min(n.minX, n.x), n.maxX = Math.max(n.maxX, n.x), n.minY = Math.min(n.minY, n.y), n.maxY = Math.max(n.maxY, n.y), o.value += `L${n.x},${n.y}`, r.value.push(["L", n.x, n.y]));
    }, y = () => {
      n.drawing = !1;
    }, E = () => {
      var W;
      if (!r.value.length) return;
      const s = -(n.minX - 10), u = -(n.minY - 10), p = n.maxX - n.minX + 20, L = n.maxY - n.minY + 20, _ = r.value.reduce((H, Y) => H + Y[0] + (Y[1] + s) + "," + (Y[2] + u), ""), B = document.getElementById("signature-path-data");
      if (B) {
        B.style.display = "none", B.removeAttribute("viewBox"), (W = B.querySelector("path")) == null || W.setAttribute("d", _);
        const H = new XMLSerializer().serializeToString(B), Y = btoa(H), N = new Image();
        N.src = "data:image/svg+xml;base64," + Y, N.onload = () => {
          const A = document.createElement("canvas");
          A.style.display = "none", A.width = p, A.height = L;
          const Z = A.getContext("2d");
          Z == null || Z.drawImage(N, 0, 0);
          let K = A.toDataURL("image/png").replace("data:image/png;base64,", "");
          A.remove(), B.innerHTML = "", r.value = [], t("finish", {
            originWidth: p,
            originHeight: L,
            path: _,
            signatureImageData: {
              data: K,
              type: "image/png"
            }
          });
        };
      }
    }, m = () => {
      r.value = [], t("cancel");
    }, b = (s) => {
      var u, p;
      n.x = s.clientX, n.y = s.clientY, x({
        x: n.x,
        y: n.y,
        target: s.target,
        currentTarget: l.value
      }), (u = l.value) == null || u.addEventListener("mousemove", f), (p = l.value) == null || p.addEventListener("mouseup", h);
    }, f = (s) => {
      s.clientX - n.x, s.clientY - n.y, n.x = s.clientX, n.y = s.clientY, P({ x: n.x, y: n.y });
    }, h = (s) => {
      var u, p;
      n.x = s.clientX, n.y = s.clientY, y(), (u = l.value) == null || u.removeEventListener("mousemove", f), (p = l.value) == null || p.removeEventListener("mouseup", h);
    }, D = (s) => {
      var p, L;
      if (s.touches.length > 1) return;
      const u = s.touches[0];
      n.x = u.clientX, n.y = u.clientY, x({
        x: n.x,
        y: n.y,
        target: u.target,
        currentTarget: l.value
      }), (p = l.value) == null || p.addEventListener("touchmove", F), (L = l.value) == null || L.addEventListener("touchend", z);
    }, F = (s) => {
      if (s.preventDefault(), s.touches.length > 1) return;
      const u = s.touches[0];
      u.clientX - n.x, u.clientY - n.y, n.x = u.clientX, n.y = u.clientY, P({ x: n.x, y: n.y });
    }, z = (s) => {
      var u, p;
      n.x = s.changedTouches[0].clientX, n.y = s.changedTouches[0].clientY, y(), (u = l.value) == null || u.removeEventListener("touchmove", F), (p = l.value) == null || p.removeEventListener("touchend", z);
    };
    return J(() => {
      var s, u;
      (s = l.value) == null || s.addEventListener("mousedown", b), (u = l.value) == null || u.addEventListener("touchstart", D);
    }), ae(() => {
      var s, u;
      (s = l.value) == null || s.removeEventListener("mousedown", b), (u = l.value) == null || u.removeEventListener(
        "touchstart",
        D
      );
    }), {
      getTranslation: a,
      signatureCanvas: l,
      path: o,
      finish: E,
      cancel: m,
      handlePanStart: x,
      handlePanMove: P,
      handlePanEnd: y
    };
  }
}), Ve = {
  style: { height: "210px" },
  class: "left-0 right-0 top-0 z-0 border-b border-gray-300 bg-white shadow-lg",
  "data-cy": "sign-area"
}, Je = { class: "absolute flex w-full flex-grow items-center justify-center" }, Ke = { class: "text-black-600" }, Qe = { class: "absolute bottom-0 right-0 mb-4 mx-4 flex" }, en = { class: "flex w-full flex-grow items-center justify-center" }, nn = { class: "text-black-600" }, tn = {
  class: "pointer-events-none h-full w-full",
  id: "signature-path-data"
}, an = ["d"];
function on(e, t, d, a, l, r) {
  return v(), w("div", Ve, [
    i("div", {
      ref: "signatureCanvas",
      onPanstart: t[2] || (t[2] = (...o) => e.handlePanStart && e.handlePanStart(...o)),
      onPanmove: t[3] || (t[3] = (...o) => e.handlePanMove && e.handlePanMove(...o)),
      onPanend: t[4] || (t[4] = (...o) => e.handlePanEnd && e.handlePanEnd(...o)),
      class: "relative h-full w-full select-none"
    }, [
      i("div", Je, [
        i("p", Ke, T(e.getTranslation.drawLabel), 1)
      ]),
      i("div", Qe, [
        i("div", en, [
          i("p", nn, T(e.getTranslation.additionalTextField), 1)
        ]),
        i("button", {
          onClick: t[0] || (t[0] = (...o) => e.finish && e.finish(...o)),
          class: "mx-4 w-24 rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-blue-700 btn-positive",
          "data-cy": "sign-done"
        }, T(e.getTranslation.drawDone), 1),
        i("button", {
          onClick: t[1] || (t[1] = (...o) => e.cancel && e.cancel(...o)),
          class: "w-24 rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700 btn-negative",
          "data-cy": "sign-cancel"
        }, T(e.getTranslation.drawCancel), 1)
      ]),
      (v(), w("svg", tn, [
        i("path", {
          "stroke-width": "5",
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
          d: e.path,
          stroke: "black",
          fill: "none"
        }, null, 8, an)
      ]))
    ], 544)
  ]);
}
const sn = /* @__PURE__ */ q(Ge, [["render", on]]);
function ln(e, t) {
  return v(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    i("path", { d: "M8.75 6.25h-3.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5Z" }),
    i("path", {
      "fill-rule": "evenodd",
      d: "M7 12c1.11 0 2.136-.362 2.965-.974l2.755 2.754a.75.75 0 1 0 1.06-1.06l-2.754-2.755A5 5 0 1 0 7 12Zm0-1.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function rn(e, t) {
  return v(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    i("path", { d: "M6.25 8.75v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 1.5 0v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0Z" }),
    i("path", {
      "fill-rule": "evenodd",
      d: "M7 12c1.11 0 2.136-.362 2.965-.974l2.755 2.754a.75.75 0 1 0 1.06-1.06l-2.754-2.755A5 5 0 1 0 7 12Zm0-1.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const ce = () => {
  De.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.js", import.meta.url).toString();
}, dn = async (e, t = "string") => {
  let d;
  if (t === "string" && typeof e == "string") {
    console.log("Processing string input, length:", e.length);
    const r = atob(e);
    console.log("Binary string length:", r.length);
    const o = new Uint8Array(r.length);
    for (let n = 0; n < r.length; n++)
      o[n] = r.charCodeAt(n);
    d = o.buffer, console.log("ArrayBuffer size:", d.byteLength);
  } else if (e instanceof File)
    console.log("Processing File input, size:", e.size), d = await e.arrayBuffer(), console.log("File ArrayBuffer size:", d.byteLength);
  else
    throw new Error("Invalid input type for readAsPDF");
  const { PDFDocument: a } = await import("pdf-lib"), l = await a.load(d);
  return console.log("PDF document loaded successfully"), l;
}, cn = (e, t) => {
  Se(e, t, "application/pdf");
}, un = async (e) => {
  console.log("Getting PDF document from pdf-lib document");
  const t = await e.save();
  console.log("PDF bytes length:", t.length);
  const d = Me({ data: t });
  return console.log("PDF.js loading task created"), d.promise;
};
function gn() {
  let e = 0;
  return function() {
    return e++;
  };
}
async function hn(e, t, d, a = !1) {
  let l;
  try {
    const o = await e.arrayBuffer();
    l = await Ce.load(o);
  } catch (o) {
    throw console.error("Error loading PDF:", o), o;
  }
  const r = l.getPages().map(async (o, n) => {
    const x = t[n] || [], P = o.getHeight(), y = x.map(async (m) => {
      if (m.type === "drawing") {
        const { x: b, y: f, path: h, originWidth: D, originHeight: F, width: z, height: s, scale: u } = m, p = D * u, L = F * u, _ = b + (z - p) / 2, B = f + (s - L) / 2;
        o.drawSvgPath(h, {
          x: _,
          y: P - B,
          scale: u,
          borderWidth: 5,
          borderColor: ke(0, 0, 0),
          borderLineCap: "Round",
          borderLineJoin: "Round"
        });
      }
    });
    (await Promise.all(y)).forEach((m) => m && m());
  });
  await Promise.all(r);
  try {
    const o = await l.save();
    return a && cn(o, d), await l.saveAsBase64();
  } catch (o) {
    throw console.error("Error saving PDF:", o), o;
  }
}
const fn = {
  name: "DrawSignPdf",
  components: {
    PDFPage: Ee,
    DrawingCanvas: sn,
    DrawingSignature: Oe,
    DialogBox: Ue,
    MagnifyingGlassMinusIcon: ln,
    MagnifyingGlassPlusIcon: rn
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
    },
    enableZoom: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["finish", "onPDFRendered"],
  setup(e, { emit: t }) {
    const d = gn(), a = g(null), l = g(""), r = g([]), o = g([]), n = g([]), x = g("Times-Roman"), P = g(null), y = g(-1), E = g(!1), m = g(!1), b = g(""), f = g({
      data: "",
      type: "application/pdf"
    }), h = g(!1), D = g("warning"), F = g(1), z = 0.25, s = 0.5, u = 3, p = g([]), L = ie(() => ({ ...{
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
    }, ...e.translations })), _ = async () => {
      try {
        if (ce(), !e.pdfData) return;
        y.value = 0, await W(e.pdfData, "string"), Y(), document.addEventListener("keydown", re);
      } catch (c) {
        console.error("onMounted error:", c);
      }
    }, B = async (c) => {
      const S = (c.target.files || c.dataTransfer && c.dataTransfer.files)[0];
      if (!(!S || S.type !== "application/pdf")) {
        y.value = -1;
        try {
          await W(S, "arrayBuffer"), y.value = 0;
        } catch {
        }
      }
    }, W = async (c, M) => {
      const S = await dn(c, M), C = await un(S), k = [];
      for (let X = 1; X <= C.numPages; X++) {
        const O = await C.getPage(X);
        k.push(xe(O));
      }
      if (r.value = k, n.value = Array(C.numPages).fill([]), o.value = Array(C.numPages).fill({ scale: 1 }), p.value = Array(C.numPages).fill(!1), M === "string") {
        const X = atob(c), O = new Uint8Array(X.length);
        for (let j = 0; j < X.length; j++)
          O[j] = X.charCodeAt(j);
        const G = new Blob([O], { type: "application/pdf" });
        a.value = new File([G], "document.pdf", { type: "application/pdf" }), l.value = "document.pdf";
      }
    }, H = async (c) => {
      b.value = c.signatureImageData, await N(c.originWidth, c.originHeight, c.path), m.value = !1;
    }, Y = () => {
      y.value >= 0 && (m.value = !0);
    }, N = (c, M, S) => {
      var C;
      n.value = Array(n.value.length).fill([]), (C = e.signatureData) == null || C.forEach((k) => {
        const X = d(), O = U(k.width), G = U(k.height), j = O / c, ve = G / M, ye = Math.min(j, ve), pe = {
          id: X,
          path: S,
          type: "drawing",
          x: U(k.left),
          y: U(k.top),
          originWidth: c,
          originHeight: M,
          width: O,
          height: G,
          scale: ye
        }, ee = k.page - 1;
        n.value[ee] && (n.value[ee] = [...n.value[ee], pe]);
      });
    }, A = (c) => {
      y.value = c;
    }, Z = (c, M) => {
      n.value = n.value.map(
        (S, C) => C == y.value ? S.map(
          (k) => k.id === c ? { ...k, ...M } : k
        ) : S
      );
    }, K = (c) => {
      n.value = n.value.map(
        (M, S) => S == y.value ? M.filter((C) => C.id !== c) : M
      );
    }, ue = (c, M) => {
      o.value[M] = c;
    }, U = (c) => c * 72 / 2.54, le = async () => {
      if (!(!a.value || E.value || !r.value.length)) {
        E.value = !0;
        try {
          const c = await hn(a.value, n.value, l.value, e.isDownload);
          f.value = { type: "application/pdf", data: c }, t("finish", {
            signedDocument: f.value,
            signatureImage: b.value
          });
        } catch (c) {
          console.error("Error saving PDF:", c);
        } finally {
          E.value = !1;
        }
      }
    }, ge = () => {
      D.value = b.value !== "" ? "confirm" : "warning", h.value = !0, document.body.classList.add("overflow-y-hidden");
    }, Q = () => {
      h.value = !1, document.body.classList.remove("overflow-y-hidden");
    }, he = () => {
      le(), Q();
    }, re = (c) => {
      (c.key === "Escape" || c.key === "Esc") && Q();
    }, fe = (c) => {
      F.value = c === "in" ? Math.min(F.value + z, u) : Math.max(F.value - z, s);
    }, me = (c) => {
      p.value[c] = !0, p.value.every(Boolean) && t("onPDFRendered");
    };
    return J(_), ae(() => {
      document.removeEventListener("keydown", re);
    }), {
      getTranslation: L,
      genID: d,
      pdfFile: a,
      pdfName: l,
      pages: r,
      pagesScale: o,
      allObjects: n,
      currentFont: x,
      focusId: P,
      selectedPageIndex: y,
      saving: E,
      addingDrawing: m,
      isOpenConfirm: h,
      onUploadPDF: B,
      addPDF: W,
      onAddDrawing: Y,
      addDrawing: N,
      selectPage: A,
      updateObject: Z,
      deleteObject: K,
      onMeasure: ue,
      savePDF: le,
      onFinishDrawing: H,
      openModal: ge,
      closeModal: Q,
      confirmSave: he,
      isConfirmOrWarning: D,
      zoomScale: F,
      zoomPDF: fe,
      pageRenderStatus: p,
      renderFinished: me
    };
  }
}, mn = {
  key: 0,
  id: "modelConfirm",
  class: "fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-900 bg-opacity-60 px-4"
}, vn = { class: "flex min-h-screen flex-col items-center bg-gray-100 py-5" }, yn = {
  key: 0,
  class: "left-0 right-0 top-0 z-10 flex items-center justify-center flex-col gap-2 py-2 bg-gray-100 sticky w-full"
}, pn = {
  key: 1,
  class: "mt-2 flex gap-2"
}, wn = {
  key: 2,
  class: "sign-drawing-canvas fixed left-0 right-0 top-0 z-10 items-center justify-center border-b border-gray-300 bg-white shadow-lg",
  style: { height: "200px", "z-index": "60", width: "100%" },
  "data-cy": "sign-drawing-canvas"
}, bn = {
  key: 0,
  class: "bg-gray-100 border-b border-gray-300 shadow-lg p-2 flex justify-center gap-2"
}, xn = {
  key: 3,
  class: "w-full"
}, Pn = ["onMousedown", "onTouchstart", "data-cy"], Dn = {
  key: 4,
  class: "flex w-full flex-grow items-center justify-center"
}, Mn = { class: "text-3xl font-bold text-gray-500" };
function Sn(e, t, d, a, l, r) {
  const o = R("DialogBox"), n = R("MagnifyingGlassMinusIcon"), x = R("MagnifyingGlassPlusIcon"), P = R("DrawingCanvas"), y = R("PDFPage"), E = R("DrawingSignature");
  return v(), w(V, null, [
    a.isOpenConfirm ? (v(), w("div", mn, [
      $(o, {
        translations: a.getTranslation,
        type: a.isConfirmOrWarning,
        onCancel: a.closeModal,
        onFinish: a.confirmSave
      }, null, 8, ["translations", "type", "onCancel", "onFinish"])
    ])) : I("", !0),
    i("div", null, [
      i("main", vn, [
        a.addingDrawing ? I("", !0) : (v(), w("div", yn, [
          i("button", {
            onClick: t[0] || (t[0] = (...m) => a.onAddDrawing && a.onAddDrawing(...m)),
            class: "btn-positive ml-3 mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4",
            "data-cy": "update-sign"
          }, T(a.getTranslation.updateSign), 1),
          i("button", {
            onClick: t[1] || (t[1] = (...m) => a.openModal && a.openModal(...m)),
            class: ne(["btn-positive mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4", {
              "cursor-not-allowed": a.pages.length === 0 || a.saving,
              "bg-blue-700": a.pages.length === 0 || a.saving
            }]),
            "data-cy": "save-sign"
          }, T(a.saving ? a.getTranslation.saving : a.getTranslation.save), 3)
        ])),
        d.enableZoom ? (v(), w("div", pn, [
          i("button", {
            onClick: t[2] || (t[2] = (m) => a.zoomPDF("out")),
            class: "w-6",
            "data-cy": "pdf-zoom-out"
          }, [
            $(n)
          ]),
          i("button", {
            onClick: t[3] || (t[3] = (m) => a.zoomPDF("in")),
            class: "w-6",
            "data-cy": "pdf-zoom-in"
          }, [
            $(x)
          ])
        ])) : I("", !0),
        a.addingDrawing ? (v(), w("div", wn, [
          $(P, {
            onFinish: a.onFinishDrawing,
            onCancel: t[4] || (t[4] = (m) => a.addingDrawing = !1),
            translations: a.getTranslation
          }, null, 8, ["onFinish", "translations"]),
          d.enableZoom ? (v(), w("div", bn, [
            i("button", {
              onClick: t[5] || (t[5] = (m) => a.zoomPDF("out")),
              class: "w-6",
              "data-cy": "pdf-zoom-out-toolbar"
            }, [
              $(n)
            ]),
            i("button", {
              onClick: t[6] || (t[6] = (m) => a.zoomPDF("in")),
              class: "w-6",
              "data-cy": "pdf-zoom-in-toolbar"
            }, [
              $(x)
            ])
          ])) : I("", !0)
        ])) : I("", !0),
        a.pages.length ? (v(), w("div", xn, [
          (v(!0), w(V, null, de(a.pages, (m, b) => (v(), w("div", {
            key: b + a.zoomScale,
            class: "flex w-full flex-col items-center overflow-hidden p-5",
            onMousedown: (f) => a.selectPage(b),
            onTouchstart: (f) => a.selectPage(b),
            "data-cy": "page-" + b
          }, [
            i("div", {
              class: ne(["relative shadow-lg", { "shadow-outline": b === a.selectedPageIndex }])
            }, [
              $(y, {
                onMeasure: (f) => a.onMeasure(f, b),
                page: m,
                zoomScale: a.zoomScale,
                onFinishedRendering: () => a.renderFinished(b)
              }, null, 8, ["onMeasure", "page", "zoomScale", "onFinishedRendering"]),
              i("div", {
                class: "absolute left-0 top-0 origin-top-left transform",
                style: oe({
                  transform: `scale(${a.pagesScale[b].scale})`,
                  touchAction: "none"
                })
              }, [
                (v(!0), w(V, null, de(a.allObjects[b], (f) => {
                  var h;
                  return v(), w("div", {
                    key: f.id
                  }, [
                    f.type === "drawing" ? (v(), Pe(E, {
                      key: 0,
                      onUpdate: (D) => a.updateObject(f.id, D),
                      onDelete: () => a.deleteObject(f.id),
                      path: f.path,
                      x: f.x,
                      y: f.y,
                      width: f.width,
                      height: f.height,
                      originWidth: f.originWidth,
                      originHeight: f.originHeight,
                      pageScale: (h = a.pagesScale[b]) == null ? void 0 : h.scale,
                      "data-cy": "sign-pos-" + f.id,
                      zoomScale: a.zoomScale
                    }, null, 8, ["onUpdate", "onDelete", "path", "x", "y", "width", "height", "originWidth", "originHeight", "pageScale", "data-cy", "zoomScale"])) : I("", !0)
                  ]);
                }), 128))
              ], 4)
            ], 2)
          ], 40, Pn))), 128))
        ])) : (v(), w("div", Dn, [
          i("span", Mn, T(a.getTranslation.pdfLoading), 1)
        ]))
      ])
    ])
  ], 64);
}
const te = /* @__PURE__ */ q(fn, [["render", Sn], ["__scopeId", "data-v-477f5e9a"]]);
ce();
const Cn = (e) => {
  e.component(te.name || "DrawSignPdf", te);
};
te.install = Cn;
export {
  te as DrawSignPdf,
  te as default
};
