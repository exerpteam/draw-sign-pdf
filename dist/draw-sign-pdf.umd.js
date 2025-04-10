(function(N,e){typeof exports=="object"&&typeof module!="undefined"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(N=typeof globalThis!="undefined"?globalThis:N||self,e(N["draw-sign-pdf"]={},N.Vue))})(this,function(N,e){"use strict";var ot="",I=(a,o)=>{const l=a.__vccOpts||a;for(const[n,c]of o)l[n]=c;return l};const $={props:{page:Object,zoomScale:Number,finishedRendering:Function},setup(a,{emit:o}){const l=e.ref(null),n=e.ref(0),c=e.ref(0),t=()=>{o("measure",{scale:l.value.clientWidth/n.value})};return e.onMounted(async()=>{const i=await a.page,h=l.value.getContext("2d"),f=i.getViewport({scale:a.zoomScale||1,rotation:0});n.value=f.width,c.value=f.height,await i.render({canvasContext:h,viewport:f}).promise.then(function(){o("finishedRendering"),o("measure",{scale:l.value.clientWidth/n.value})}),window.addEventListener("resize",t)}),e.onBeforeUnmount(()=>{window.removeEventListener("resize",t)}),{canvas:l,width:n,height:c}}},ee=["width","height"];function te(a,o,l,n,c,t){return e.openBlock(),e.createElementBlock("div",null,[e.createElementVNode("canvas",{ref:"canvas",id:"canvas",class:"max-w-full",style:e.normalizeStyle({width:`${n.width}px`}),width:n.width,height:n.height},null,12,ee)])}var ne=I($,[["render",te],["__scopeId","data-v-12c5d4e2"]]),lt="";const ae=e.defineComponent({props:{originWidth:Number,originHeight:Number,width:Number,height:Number,x:Number,y:Number,pageScale:{type:Number,default:1},path:String,zoomScale:Number},emits:["delete","update"],setup(a,{emit:o}){const l=e.ref(0),n=e.ref(0),c=e.ref(0),t=e.ref(""),i=e.ref(""),h=e.ref(0),f=e.ref(0),v=e.ref(null),u=a.originWidth/a.originHeight;return e.onMounted(async()=>{await e.nextTick(),v.value&&v.value.setAttribute("viewBox",`0 0 ${a.originWidth} ${a.originHeight}`)}),{dx:l,dy:n,dw:c,direction:t,operation:i,startX:h,startY:f,svg:v,ratio:u,handlePanStart:m=>{h.value=m.type.startsWith("mouse")?m.clientX:m.touches[0].clientX,f.value=m.type.startsWith("mouse")?m.clientY:m.touches[0].clientY,m.target===m.currentTarget?i.value="move":(i.value="scale",t.value=m.target.dataset.direction||"")},handlePanMove:m=>{const _=(m.type.startsWith("mouse")?m.clientX:m.touches[0].clientX)-h.value,s=(m.type.startsWith("mouse")?m.clientY:m.touches[0].clientY)-f.value;if(i.value==="move")l.value=_/a.pageScale,n.value=s/a.pageScale;else if(i.value==="scale"){if(t.value==="left-top"){const g=Math.min(_,s*u);l.value=g,c.value=-g,n.value=g/u}if(t.value==="right-bottom"){const g=Math.max(_,s*u);c.value=g}}},handlePanEnd:()=>{i.value==="move"?(o("update",{x:a.x+l.value,y:a.y+n.value}),l.value=0,n.value=0):i.value==="scale"&&(o("update",{x:a.x+l.value,y:a.y+n.value,width:a.width+c.value,scale:(a.width+c.value)/a.originWidth}),l.value=0,n.value=0,c.value=0,t.value=""),i.value=""},onDelete:()=>{o("delete")}}}}),oe=(a=>(e.pushScopeId("data-v-00f78c34"),a=a(),e.popScopeId(),a))(()=>e.createElementVNode("div",{class:"absolute h-full w-full cursor-grab border border-dashed border-gray-400"},null,-1)),le={ref:"svg",width:"100%",height:"100%"},se=["d"];function ie(a,o,l,n,c,t){return e.openBlock(),e.createElementBlock("div",{style:e.normalizeStyle({width:`${(a.width+a.dw)*a.zoomScale}px`,height:`${(a.height+a.dw)*a.zoomScale}px`,transform:`translate(${(a.x+a.dx)*a.zoomScale}px, ${(a.y+a.dy)*a.zoomScale}px)`}),class:"absolute left-0 top-0 select-none"},[oe,(e.openBlock(),e.createElementBlock("svg",le,[e.createElementVNode("path",{"stroke-width":"5","stroke-linejoin":"round","stroke-linecap":"round",stroke:"black",fill:"none",d:a.path},null,8,se)],512))],4)}var re=I(ae,[["render",ie],["__scopeId","data-v-00f78c34"]]),it="";const ce={props:{translations:{type:Object,default:()=>({})},type:{type:String,default:"warning"}},computed:{getTranslation(){return this.type==="warning"?{title:this.translations.warningTitle,desc:this.translations.warningDesc,close:this.translations.warningClose}:{title:this.translations.confirmBoxTitle,desc:this.translations.confirmBoxDesc,close:this.translations.confirmBoxClose,saveChanges:this.translations.confirmBoxSaveChanges}}},emits:["finish","cancel"],setup(a,{emit:o}){return{finish:()=>{o("finish")},closeModal:()=>{o("cancel")}}}},U=a=>(e.pushScopeId("data-v-3f8b2d05"),a=a(),e.popScopeId(),a),de=U(()=>e.createElementVNode("div",{id:"headlessui-dialog-overlay-16","aria-hidden":"true","data-headlessui-state":"open",class:"fixed inset-0 bg-gray-500 opacity-30"},null,-1)),ge={class:"confirm-modal relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md mt-40"},me={class:"flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto"},he={class:"flex justify-between items-center py-3 px-4 border-b"},fe={class:"font-bold text-gray-800"},pe={class:"sr-only"},ue=U(()=>e.createElementVNode("svg",{class:"flex-shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e.createElementVNode("path",{d:"M18 6 6 18"}),e.createElementVNode("path",{d:"m6 6 12 12"})],-1)),ye={class:"p-4 overflow-y-auto"},we={class:"mt-1 text-gray-800"},xe={class:"flex justify-end items-center gap-x-2 py-3 px-4 border-t"};function be(a,o,l,n,c,t){return e.openBlock(),e.createElementBlock(e.Fragment,null,[de,e.createElementVNode("div",ge,[e.createElementVNode("div",me,[e.createElementVNode("div",he,[e.createElementVNode("h3",fe,e.toDisplayString(t.getTranslation.title),1),e.createElementVNode("button",{onClick:o[0]||(o[0]=(...i)=>n.closeModal&&n.closeModal(...i)),type:"button",class:"flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"},[e.createElementVNode("span",pe,e.toDisplayString(t.getTranslation.close),1),ue])]),e.createElementVNode("div",ye,[e.createElementVNode("p",we,e.toDisplayString(t.getTranslation.desc),1)]),e.createElementVNode("div",xe,[e.createElementVNode("button",{onClick:o[1]||(o[1]=(...i)=>n.closeModal&&n.closeModal(...i)),type:"button","data-cy":"close-confirm",class:"py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none btn-negative"},e.toDisplayString(t.getTranslation.close),1),l.type==="confirm"?(e.openBlock(),e.createElementBlock("button",{key:0,onClick:o[2]||(o[2]=(...i)=>n.finish&&n.finish(...i)),type:"button","data-cy":"confirm-save",class:"py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ml-2 btn-positive"},e.toDisplayString(t.getTranslation.saveChanges),1)):e.createCommentVNode("",!0)])])])],64)}var _e=I(ce,[["render",be],["__scopeId","data-v-3f8b2d05"]]);const ve={props:{translations:{type:Object,default:()=>({})}},computed:{getTranslation(){return{...{drawLabel:"Draw the signature here",drawDone:"Done",drawCancel:"Cancel",additionalTextField:""},...this.translations}}},emits:["finish","cancel"],setup(a,{emit:o}){const l=e.ref(),n=e.ref([]),c=e.ref(""),t=e.reactive({drawing:!1,x:0,y:0,minX:1/0,minY:1/0,maxX:0,maxY:0}),i=s=>{t.x=s.clientX,t.y=s.clientY;const g=s.target;p({x:t.x,y:t.y,target:g,currentTarget:l.value}),l.value.addEventListener("mousemove",h),l.value.addEventListener("mouseup",f)},h=s=>{const g=s.clientX-t.x,k=s.clientY-t.y;t.x=s.clientX,t.y=s.clientY,y({x:t.x,y:t.y,dx:g,dy:k})},f=s=>{t.x=s.clientX,t.y=s.clientY,d(),l.value.removeEventListener("mousemove",h),l.value.removeEventListener("mouseup",f)},v=s=>{if(s.touches.length>1)return;const g=s.touches[0];t.x=g.clientX,t.y=g.clientY;const k=g.target;p({x:t.x,y:t.y,target:k,currentTarget:l.value}),l.value.addEventListener("touchmove",u),l.value.addEventListener("touchend",E)},u=s=>{if(s.preventDefault(),s.touches.length>1)return;const g=s.touches[0],k=g.clientX-t.x,V=g.clientY-t.y;t.x=g.clientX,t.y=g.clientY,y({x:t.x,y:t.y,dx:k,dy:V})},E=s=>{const g=s.changedTouches[0];t.x=g.clientX,t.y=g.clientY,d(),l.value.removeEventListener("touchmove",u),l.value.removeEventListener("touchend",E)},p=s=>{if(s.target!==s.currentTarget){t.drawing=!1;return}t.drawing=!0,t.x=s.x,t.y=s.y,t.minX=Math.min(t.minX,t.x),t.maxX=Math.max(t.maxX,t.x),t.minY=Math.min(t.minY,t.y),t.maxY=Math.max(t.maxY,t.y),n.value.push(["M",t.x,t.y]),c.value+=`M${t.x},${t.y}`},y=s=>{!t.drawing||(t.x=s.x,t.y=s.y,t.minX=Math.min(t.minX,t.x),t.maxX=Math.max(t.maxX,t.x),t.minY=Math.min(t.minY,t.y),t.maxY=Math.max(t.maxY,t.y),c.value+=`L${t.x},${t.y}`,n.value.push(["L",t.x,t.y]))},d=()=>{t.drawing=!1},m=()=>{var F;if(!n.value.length)return;const s=-(t.minX-10),g=-(t.minY-10),k=t.maxX-t.minX+20,V=t.maxY-t.minY+20;let M="",D="";const T=n.value.reduce((L,S)=>L+S[0]+(S[1]+s)+","+(S[2]+g),""),P=document.getElementById("signature-path-data");if(P){P.style.display="none",P.removeAttribute("viewBox"),(F=P.querySelector("path"))==null||F.setAttribute("d",T);const L=new XMLSerializer().serializeToString(P);M=btoa(L);const S=new Image;S.src="data:image/svg+xml;base64,"+M,S.onload=()=>{const B=document.createElement("canvas");B.style.display="none",B.width=k,B.height=V;const z=B.getContext("2d");z==null||z.drawImage(S,0,0),D=B.toDataURL("image/png"),D=D.replace("data:image/png;base64,",""),B.remove(),P.innerHTML="",n.value=[],o("finish",{originWidth:k,originHeight:V,path:T,signatureImageData:{data:D,type:"image/png"}})}}},_=()=>{n.value=[],o("cancel")};return e.onMounted(()=>{l.value.addEventListener("mousedown",i),l.value.addEventListener("touchstart",v)}),e.onBeforeUnmount(()=>{l.value.removeEventListener("mousedown",i),l.value.removeEventListener("touchstart",v)}),{signatureCanvas:l,paths:n,path:c,data:t,handlePanStart:p,handlePanMove:y,handlePanEnd:d,finish:m,cancel:_}}},Ee={style:{height:"210px"},class:"left-0 right-0 top-0 z-0 border-b border-gray-300 bg-white shadow-lg","data-cy":"sign-area"},ke={class:"absolute flex w-full flex-grow items-center justify-center"},Se={class:"text-black-600"},De={class:"absolute bottom-0 right-0 mb-4 mx-4 flex"},Pe={class:"flex w-full flex-grow items-center justify-center"},Be={class:"text-black-600"},Ce={class:"pointer-events-none h-full w-full",id:"signature-path-data"},Me=["d"];function Ne(a,o,l,n,c,t){return e.openBlock(),e.createElementBlock("div",Ee,[e.createElementVNode("div",{ref:"signatureCanvas",onPanstart:o[2]||(o[2]=(...i)=>n.handlePanStart&&n.handlePanStart(...i)),onPanmove:o[3]||(o[3]=(...i)=>n.handlePanMove&&n.handlePanMove(...i)),onPanend:o[4]||(o[4]=(...i)=>n.handlePanEnd&&n.handlePanEnd(...i)),class:"relative h-full w-full select-none"},[e.createElementVNode("div",ke,[e.createElementVNode("p",Se,e.toDisplayString(t.getTranslation.drawLabel),1)]),e.createElementVNode("div",De,[e.createElementVNode("div",Pe,[e.createElementVNode("p",Be,e.toDisplayString(t.getTranslation.additionalTextField),1)]),e.createElementVNode("button",{onClick:o[0]||(o[0]=(...i)=>n.finish&&n.finish(...i)),class:"mx-4 w-24 rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-blue-700 btn-positive","data-cy":"sign-done"},e.toDisplayString(t.getTranslation.drawDone),1),e.createElementVNode("button",{onClick:o[1]||(o[1]=(...i)=>n.cancel&&n.cancel(...i)),class:"w-24 rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700 btn-negative","data-cy":"sign-cancel"},e.toDisplayString(t.getTranslation.drawCancel),1)]),(e.openBlock(),e.createElementBlock("svg",Ce,[e.createElementVNode("path",{"stroke-width":"5","stroke-linejoin":"round","stroke-linecap":"round",d:n.path,stroke:"black",fill:"none"},null,8,Me)]))],544)])}var Ve=I(ve,[["render",Ne]]);const G=[{name:"pdfjsLib",src:"https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.min.js"},{name:"PDFLib",src:"https://unpkg.com/pdf-lib@1.4.0/dist/pdf-lib.min.js"},{name:"download",src:"https://unpkg.com/downloadjs@1.4.7"}],Y={};function O(a){if(Y[a])return Y[a];const o=G.find(l=>l.name===a);if(!o)throw new Error(`Script ${a} not exists.`);return q(o)}function q({name:a,src:o}){if(Y[a])return Y[a];const l=e.ref(null);return Y[a]=new Promise((n,c)=>{const t=document.createElement("script");t.src=o,t.onload=()=>{l.value=window[a],n(l)},t.onerror=()=>{c(`The script ${a} didn't load correctly.`)},document.body.appendChild(t)}),l}function Te(){G.forEach(q)}function Le(a,o){return e.openBlock(),e.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[e.createElementVNode("path",{d:"M8.75 6.25h-3.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5Z"}),e.createElementVNode("path",{"fill-rule":"evenodd",d:"M7 12c1.11 0 2.136-.362 2.965-.974l2.755 2.754a.75.75 0 1 0 1.06-1.06l-2.754-2.755A5 5 0 1 0 7 12Zm0-1.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z","clip-rule":"evenodd"})])}function Fe(a,o){return e.openBlock(),e.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[e.createElementVNode("path",{d:"M6.25 8.75v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 1.5 0v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0Z"}),e.createElementVNode("path",{"fill-rule":"evenodd",d:"M7 12c1.11 0 2.136-.362 2.965-.974l2.755 2.754a.75.75 0 1 0 1.06-1.06l-2.754-2.755A5 5 0 1 0 7 12Zm0-1.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z","clip-rule":"evenodd"})])}async function ze(a,o){const l=await O("pdfjsLib");if(o==="arrayBuffer"){const n=new Blob([a]),c=window.URL.createObjectURL(n);return l.value.getDocument(c).promise}else if(o==="string"){const n="data:application/pdf;base64,"+a;return l.value.getDocument(n).promise}}function Xe(){let a=0;return function(){return a++}}async function Ie(a,o,l,n=!1){const c=await O("PDFLib"),t=await O("download");let i;try{i=await c.value.PDFDocument.load(a)}catch(f){throw f}const h=i.getPages().map(async(f,v)=>{const u=o[v],E=f.getHeight(),p=u.map(async d=>{if(d.type==="drawing"){const{x:m,y:_,path:s,originWidth:g,originHeight:k,width:V,height:M,scale:D}=d,T=g*D,P=k*D,F=m+(V-T)/2,L=_+(M-P)/2,{pushGraphicsState:S,setLineCap:B,popGraphicsState:z,setLineJoin:W,LineCapStyle:X,LineJoinStyle:j}=c.value;return()=>{f.pushOperators(S(),B(X.Round),W(j.Round)),f.drawSvgPath(s,{borderWidth:5,scale:D,x:F,y:E-L}),f.pushOperators(z())}}});(await Promise.all(p)).forEach(d=>d())});await Promise.all(h);try{const f=await i.save();return n&&t.value(f,l,"application/pdf"),await i.saveAsBase64()}catch(f){throw f}}var rt="";const Ye={name:"DrawSignPdf",components:{PDFPage:ne,DrawingCanvas:Ve,DrawingSignature:re,DialogBox:_e,MagnifyingGlassMinusIcon:Le,MagnifyingGlassPlusIcon:Fe},props:{pdfData:String,signatureData:Array,isDownload:{type:Boolean,default:!1},finish:Function,translations:{type:Object,default:()=>({})},enableZoom:{type:Boolean,default:!1}},computed:{getTranslation(){return{...{updateSign:"Update Signature",save:"Save",saving:"Saving",drawLabel:"Draw the signature here",drawDone:"Done",drawCancel:"Cancel",confirmBoxTitle:"Confirm Saving",confirmBoxDesc:"Are you sure you want to save the signed document?",confirmBoxClose:"Close",confirmBoxSaveChanges:"Save Changes",warningTitle:"Missing Signature",warningDesc:"The required signature is missing. Please sign to continue",warningClose:"Close",pdfLoading:"PDF will load here",additionalTextField:""},...this.translations}}},emits:["finish","onPDFRendered"],setup(a,{emit:o}){const l=Xe(),n=e.ref(null),c=e.ref(""),t=e.ref([]),i=e.ref([]),h=e.ref([]),f=e.ref("Times-Roman"),v=e.ref(null),u=e.ref(-1),E=e.ref(!1),p=e.ref(!1),y=e.ref(""),d=e.ref({data:"",type:"application/pdf"}),m=e.ref(!1),_=e.ref("warning"),s=e.ref(1),g=.25,k=.5,V=3,M=e.ref([]);e.onMounted(async()=>{try{O("pdfjsLib"),u.value=0,Te(),await T(a.pdfData,"string"),F(),document.addEventListener("keydown",J)}catch{}}),e.onBeforeUnmount(()=>{document.addEventListener("keydown",J)});const D=async r=>{const w=(r.target.files||r.dataTransfer&&r.dataTransfer.files)[0];if(!(!w||w.type!=="application/pdf")){u.value=-1;try{await T(w,"arrayBuffer"),u.value=0}catch{}}},T=async(r,x)=>{try{const w=await ze(r,x);c.value=r.name,n.value=r;const b=w.numPages;t.value=Array.from({length:b}).map(async(C,H)=>await w.getPage(H+1)),h.value=Array(b).fill([]),i.value=Array(b).fill({scale:1}),M.value=Array(b).fill(!1)}catch(w){throw w}},P=async r=>{y.value=r.signatureImageData;const{originWidth:x,originHeight:w,path:b}=r;await L(x,w,b),p.value=!1},F=()=>{u.value>=0&&(p.value=!0)},L=(r,x,w)=>{var b;h.value=Array(h.value.length).fill([]),(b=a.signatureData)==null||b.forEach(C=>{const H=l(),K=X(C.width),Q=X(C.height),et=K/r,tt=Q/x,nt=Math.min(et,tt),at={id:H,path:w,type:"drawing",x:X(C.left),y:X(C.top),originWidth:r,originHeight:x,width:K,height:Q,scale:nt},Z=C.page-1;h.value[Z]&&(h.value[Z]=[...h.value[Z],at])})},S=r=>{u.value=r},B=(r,x)=>{h.value=h.value.map((w,b)=>b==u.value?w.map(C=>C.id===r?{...C,...x}:C):w)},z=r=>{h.value=h.value.map((x,w)=>w==u.value?x.filter(b=>b.id!==r):x)},W=(r,x)=>{i.value[x]=r},X=r=>r*72/2.54,j=async()=>{if(!(!n.value||E.value||!t.value.length)){E.value=!0;try{const r=await Ie(n.value,h.value,c.value,a.isDownload);d.value={type:"application/pdf",data:r},o("finish",{signedDocument:d.value,signatureImage:y.value})}catch{}finally{E.value=!1}}},Qe=()=>{y.value!==""?_.value="confirm":_.value="warning",m.value=!0,document.body.classList.add("overflow-y-hidden")},R=()=>{m.value=!1,document.body.classList.remove("overflow-y-hidden")},$e=()=>{j(),R()},J=r=>{(r.key==="Escape"||r.key==="Esc")&&R()};return{genID:l,pdfFile:n,pdfName:c,pages:t,pagesScale:i,allObjects:h,currentFont:f,focusId:v,selectedPageIndex:u,saving:E,addingDrawing:p,isOpenConfirm:m,onUploadPDF:D,addPDF:T,onAddDrawing:F,addDrawing:L,selectPage:S,updateObject:B,deleteObject:z,onMeasure:W,savePDF:j,onFinishDrawing:P,openModal:Qe,closeModal:R,confirmSave:$e,isConfirmOrWarning:_,zoomScale:s,zoomPDF:r=>{r==="in"?s.value=Math.min(s.value+g,V):r==="out"&&(s.value=Math.max(s.value-g,k))},pageRenderStatus:M,renderFinished:r=>{M.value[r]=!0,M.value.every(Boolean)&&o("onPDFRendered")}}}},Oe={key:0,id:"modelConfirm",class:"fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-900 bg-opacity-60 px-4"},Ae={class:"flex min-h-screen flex-col items-center bg-gray-100 py-5"},je={key:0,class:"left-0 right-0 top-0 z-10 flex items-center justify-center flex-col gap-2 py-2 bg-gray-100 sticky w-full"},We={key:0,class:"mt-2 flex gap-2"},Re={key:1,class:"sign-drawing-canvas fixed left-0 right-0 top-0 z-10 items-center justify-center border-b border-gray-300 bg-white shadow-lg",style:{height:"200px","z-index":"60",width:"100%"},"data-cy":"sign-drawing-canvas"},He={key:0,class:"bg-gray-100 border-b border-gray-300 shadow-lg p-2 flex justify-center gap-2"},Ze={key:2,class:"w-full"},Ue=["onMousedown","onTouchstart","data-cy"],Ge={key:3,class:"flex w-full flex-grow items-center justify-center"},qe={class:"text-3xl font-bold text-gray-500"};function Je(a,o,l,n,c,t){const i=e.resolveComponent("DialogBox"),h=e.resolveComponent("MagnifyingGlassMinusIcon"),f=e.resolveComponent("MagnifyingGlassPlusIcon"),v=e.resolveComponent("DrawingCanvas"),u=e.resolveComponent("PDFPage"),E=e.resolveComponent("DrawingSignature");return e.openBlock(),e.createElementBlock(e.Fragment,null,[n.isOpenConfirm?(e.openBlock(),e.createElementBlock("div",Oe,[e.createVNode(i,{translations:t.getTranslation,type:n.isConfirmOrWarning,onCancel:n.closeModal,onFinish:n.confirmSave},null,8,["translations","type","onCancel","onFinish"])])):e.createCommentVNode("",!0),e.createElementVNode("div",null,[e.createElementVNode("main",Ae,[n.addingDrawing?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("div",je,[e.createElementVNode("div",null,[e.createElementVNode("button",{onClick:o[0]||(o[0]=(...p)=>n.onAddDrawing&&n.onAddDrawing(...p)),class:"btn-positive ml-3 mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4","data-cy":"update-sign"},e.toDisplayString(t.getTranslation.updateSign),1),e.createElementVNode("button",{onClick:o[1]||(o[1]=(...p)=>n.openModal&&n.openModal(...p)),class:e.normalizeClass(["btn-positive mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4",{"cursor-not-allowed":n.pages.length===0||n.saving||!n.pdfFile,"bg-blue-700":n.pages.length===0||n.saving||!n.pdfFile}]),"data-cy":"save-sign"},e.toDisplayString(n.saving?t.getTranslation.saving:t.getTranslation.save),3)]),l.enableZoom?(e.openBlock(),e.createElementBlock("div",We,[e.createElementVNode("button",{onClick:o[2]||(o[2]=p=>n.zoomPDF("out")),class:"w-6","data-cy":"pdf-zoom-out"},[e.createVNode(h)]),e.createElementVNode("button",{onClick:o[3]||(o[3]=p=>n.zoomPDF("in")),class:"w-6","data-cy":"pdf-zoom-in"},[e.createVNode(f)])])):e.createCommentVNode("",!0)])),n.addingDrawing?(e.openBlock(),e.createElementBlock("div",Re,[e.createVNode(v,{onFinish:n.onFinishDrawing,onCancel:o[4]||(o[4]=p=>n.addingDrawing=!1),translations:t.getTranslation},null,8,["onFinish","translations"]),l.enableZoom?(e.openBlock(),e.createElementBlock("div",He,[e.createElementVNode("button",{onClick:o[5]||(o[5]=p=>n.zoomPDF("out")),class:"w-6","data-cy":"pdf-zoom-out-toolbar"},[e.createVNode(h)]),e.createElementVNode("button",{onClick:o[6]||(o[6]=p=>n.zoomPDF("in")),class:"w-6","data-cy":"pdf-zoom-in-toolbar"},[e.createVNode(f)])])):e.createCommentVNode("",!0)])):e.createCommentVNode("",!0),n.pages.length?(e.openBlock(),e.createElementBlock("div",Ze,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.pages,(p,y)=>(e.openBlock(),e.createElementBlock("div",{key:y+n.zoomScale,class:"flex w-full flex-col items-center overflow-hidden p-5",onMousedown:d=>n.selectPage(y),onTouchstart:d=>n.selectPage(y),"data-cy":"page-"+y},[e.createElementVNode("div",{class:e.normalizeClass(["relative shadow-lg",{"shadow-outline":y===n.selectedPageIndex}])},[e.createVNode(u,{onMeasure:d=>n.onMeasure(d,y),page:p,zoomScale:n.zoomScale,onFinishedRendering:()=>n.renderFinished(y)},null,8,["onMeasure","page","zoomScale","onFinishedRendering"]),e.createElementVNode("div",{class:"absolute left-0 top-0 origin-top-left transform",style:e.normalizeStyle({transform:`scale(${n.pagesScale[y].scale})`,touchAction:"none"})},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.allObjects[y],d=>{var m;return e.openBlock(),e.createElementBlock("div",{key:d.id},[d.type==="drawing"?(e.openBlock(),e.createBlock(E,{key:0,onUpdate:_=>n.updateObject(d.id,_),onDelete:()=>n.deleteObject(d.id),path:d.path,x:d.x,y:d.y,width:d.width,height:d.height,originWidth:d.originWidth,originHeight:d.originHeight,pageScale:(m=n.pagesScale[y])==null?void 0:m.scale,"data-cy":"sign-pos-"+d.id,zoomScale:n.zoomScale},null,8,["onUpdate","onDelete","path","x","y","width","height","originWidth","originHeight","pageScale","data-cy","zoomScale"])):e.createCommentVNode("",!0)])}),128))],4)],2)],40,Ue))),128))])):(e.openBlock(),e.createElementBlock("div",Ge,[e.createElementVNode("span",qe,e.toDisplayString(t.getTranslation.pdfLoading),1)]))])])],64)}var A=I(Ye,[["render",Je],["__scopeId","data-v-c15da102"]]);O("pdfjsLib");const Ke=a=>{a.component(A.name,A)};A.install=Ke,N.DrawSignPdf=A,N.default=A,Object.defineProperties(N,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
