(function(L,e){typeof exports=="object"&&typeof module!="undefined"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(L=typeof globalThis!="undefined"?globalThis:L||self,e(L["draw-sign-pdf"]={},L.Vue))})(this,function(L,e){"use strict";var Ge="",Y=(a,o)=>{const s=a.__vccOpts||a;for(const[n,c]of o)s[n]=c;return s};const K={props:{page:Object},setup(a,{emit:o}){const s=e.ref(null),n=e.ref(0),c=e.ref(0),t=()=>{o("measure",{scale:s.value.clientWidth/n.value})};return e.onMounted(async()=>{const i=await a.page,f=s.value.getContext("2d"),h=i.getViewport({scale:1,rotation:0});n.value=h.width,c.value=h.height,await i.render({canvasContext:f,viewport:h}).promise.then(function(){}),o("measure",{scale:s.value.clientWidth/n.value}),window.addEventListener("resize",t)}),e.onBeforeUnmount(()=>{window.removeEventListener("resize",t)}),{canvas:s,width:n,height:c}}},$=["width","height"];function Q(a,o,s,n,c,t){return e.openBlock(),e.createElementBlock("div",null,[e.createElementVNode("canvas",{ref:"canvas",id:"canvas",class:"max-w-full",style:e.normalizeStyle({width:`${n.width}px`}),width:n.width,height:n.height},null,12,$)])}var Z=Y(K,[["render",Q],["__scopeId","data-v-98024af6"]]),Je="";const ee=e.defineComponent({props:{originWidth:Number,originHeight:Number,width:Number,height:Number,x:Number,y:Number,pageScale:{type:Number,default:1},path:String},emits:["delete","update"],setup(a,{emit:o}){const s=e.ref(0),n=e.ref(0),c=e.ref(0),t=e.ref(""),i=e.ref(""),f=e.ref(0),h=e.ref(0),v=e.ref(null),m=a.originWidth/a.originHeight;return e.onMounted(async()=>{await e.nextTick(),v.value&&v.value.setAttribute("viewBox",`0 0 ${a.originWidth} ${a.originHeight}`)}),{dx:s,dy:n,dw:c,direction:t,operation:i,startX:f,startY:h,svg:v,ratio:m,handlePanStart:u=>{f.value=u.type.startsWith("mouse")?u.clientX:u.touches[0].clientX,h.value=u.type.startsWith("mouse")?u.clientY:u.touches[0].clientY,u.target===u.currentTarget?i.value="move":(i.value="scale",t.value=u.target.dataset.direction||"")},handlePanMove:u=>{const k=(u.type.startsWith("mouse")?u.clientX:u.touches[0].clientX)-f.value,l=(u.type.startsWith("mouse")?u.clientY:u.touches[0].clientY)-h.value;if(i.value==="move")s.value=k/a.pageScale,n.value=l/a.pageScale;else if(i.value==="scale"){if(t.value==="left-top"){const d=Math.min(k,l*m);s.value=d,c.value=-d,n.value=d/m}if(t.value==="right-bottom"){const d=Math.max(k,l*m);c.value=d}}},handlePanEnd:()=>{i.value==="move"?(o("update",{x:a.x+s.value,y:a.y+n.value}),s.value=0,n.value=0):i.value==="scale"&&(o("update",{x:a.x+s.value,y:a.y+n.value,width:a.width+c.value,scale:(a.width+c.value)/a.originWidth}),s.value=0,n.value=0,c.value=0,t.value=""),i.value=""},onDelete:()=>{o("delete")}}}}),te=(a=>(e.pushScopeId("data-v-08f91d4b"),a=a(),e.popScopeId(),a))(()=>e.createElementVNode("div",{class:"absolute h-full w-full cursor-grab border border-dashed border-gray-400"},null,-1)),ne={ref:"svg",width:"100%",height:"100%"},ae=["d"];function oe(a,o,s,n,c,t){return e.openBlock(),e.createElementBlock("div",{style:e.normalizeStyle({width:`${a.width+a.dw}px`,height:`${a.height+a.dw}px`,transform:`translate(${a.x+a.dx}px, ${a.y+a.dy}px)`}),class:"absolute left-0 top-0 select-none"},[te,(e.openBlock(),e.createElementBlock("svg",ne,[e.createElementVNode("path",{"stroke-width":"5","stroke-linejoin":"round","stroke-linecap":"round",stroke:"black",fill:"none",d:a.path},null,8,ae)],512))],4)}var se=Y(ee,[["render",oe],["__scopeId","data-v-08f91d4b"]]),$e="";const ie={props:{translations:{type:Object,default:()=>({})},type:{type:String,default:"warning"}},computed:{getTranslation(){return this.type==="warning"?{title:this.translations.warningTitle,desc:this.translations.warningDesc,close:this.translations.warningClose}:{title:this.translations.confirmBoxTitle,desc:this.translations.confirmBoxDesc,close:this.translations.confirmBoxClose,saveChanges:this.translations.confirmBoxSaveChanges}}},emits:["finish","cancel"],setup(a,{emit:o}){return{finish:()=>{o("finish")},closeModal:()=>{o("cancel")}}}},H=a=>(e.pushScopeId("data-v-3f8b2d05"),a=a(),e.popScopeId(),a),le=H(()=>e.createElementVNode("div",{id:"headlessui-dialog-overlay-16","aria-hidden":"true","data-headlessui-state":"open",class:"fixed inset-0 bg-gray-500 opacity-30"},null,-1)),re={class:"confirm-modal relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md mt-40"},ce={class:"flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto"},de={class:"flex justify-between items-center py-3 px-4 border-b"},ge={class:"font-bold text-gray-800"},he={class:"sr-only"},me=H(()=>e.createElementVNode("svg",{class:"flex-shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e.createElementVNode("path",{d:"M18 6 6 18"}),e.createElementVNode("path",{d:"m6 6 12 12"})],-1)),fe={class:"p-4 overflow-y-auto"},ue={class:"mt-1 text-gray-800"},pe={class:"flex justify-end items-center gap-x-2 py-3 px-4 border-t"};function ye(a,o,s,n,c,t){return e.openBlock(),e.createElementBlock(e.Fragment,null,[le,e.createElementVNode("div",re,[e.createElementVNode("div",ce,[e.createElementVNode("div",de,[e.createElementVNode("h3",ge,e.toDisplayString(t.getTranslation.title),1),e.createElementVNode("button",{onClick:o[0]||(o[0]=(...i)=>n.closeModal&&n.closeModal(...i)),type:"button",class:"flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"},[e.createElementVNode("span",he,e.toDisplayString(t.getTranslation.close),1),me])]),e.createElementVNode("div",fe,[e.createElementVNode("p",ue,e.toDisplayString(t.getTranslation.desc),1)]),e.createElementVNode("div",pe,[e.createElementVNode("button",{onClick:o[1]||(o[1]=(...i)=>n.closeModal&&n.closeModal(...i)),type:"button","data-cy":"close-confirm",class:"py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none btn-negative"},e.toDisplayString(t.getTranslation.close),1),s.type==="confirm"?(e.openBlock(),e.createElementBlock("button",{key:0,onClick:o[2]||(o[2]=(...i)=>n.finish&&n.finish(...i)),type:"button","data-cy":"confirm-save",class:"py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ml-2 btn-positive"},e.toDisplayString(t.getTranslation.saveChanges),1)):e.createCommentVNode("",!0)])])])],64)}var we=Y(ie,[["render",ye],["__scopeId","data-v-3f8b2d05"]]);const xe={props:{translations:{type:Object,default:()=>({})}},computed:{getTranslation(){return{...{drawLabel:"Draw the signature here",drawDone:"Done",drawCancel:"Cancel"},...this.translations}}},emits:["finish","cancel"],setup(a,{emit:o}){const s=e.ref(),n=e.ref([]),c=e.ref(""),t=e.reactive({drawing:!1,x:0,y:0,minX:1/0,minY:1/0,maxX:0,maxY:0}),i=l=>{t.x=l.clientX,t.y=l.clientY;const d=l.target;g({x:t.x,y:t.y,target:d,currentTarget:s.value}),s.value.addEventListener("mousemove",f),s.value.addEventListener("mouseup",h)},f=l=>{const d=l.clientX-t.x,E=l.clientY-t.y;t.x=l.clientX,t.y=l.clientY,_({x:t.x,y:t.y,dx:d,dy:E})},h=l=>{t.x=l.clientX,t.y=l.clientY,x(),s.value.removeEventListener("mousemove",f),s.value.removeEventListener("mouseup",h)},v=l=>{if(l.touches.length>1)return;const d=l.touches[0];t.x=d.clientX,t.y=d.clientY;const E=d.target;g({x:t.x,y:t.y,target:E,currentTarget:s.value}),s.value.addEventListener("touchmove",m),s.value.addEventListener("touchend",p)},m=l=>{if(l.preventDefault(),l.touches.length>1)return;const d=l.touches[0],E=d.clientX-t.x,N=d.clientY-t.y;t.x=d.clientX,t.y=d.clientY,_({x:t.x,y:t.y,dx:E,dy:N})},p=l=>{const d=l.changedTouches[0];t.x=d.clientX,t.y=d.clientY,x(),s.value.removeEventListener("touchmove",m),s.value.removeEventListener("touchend",p)},g=l=>{if(l.target!==l.currentTarget){t.drawing=!1;return}t.drawing=!0,t.x=l.x,t.y=l.y,t.minX=Math.min(t.minX,t.x),t.maxX=Math.max(t.maxX,t.x),t.minY=Math.min(t.minY,t.y),t.maxY=Math.max(t.maxY,t.y),n.value.push(["M",t.x,t.y]),c.value+=`M${t.x},${t.y}`},_=l=>{!t.drawing||(t.x=l.x,t.y=l.y,t.minX=Math.min(t.minX,t.x),t.maxX=Math.max(t.maxX,t.x),t.minY=Math.min(t.minY,t.y),t.maxY=Math.max(t.maxY,t.y),c.value+=`L${t.x},${t.y}`,n.value.push(["L",t.x,t.y]))},x=()=>{t.drawing=!1},u=()=>{var F;if(!n.value.length)return;const l=-(t.minX-10),d=-(t.minY-10),E=t.maxX-t.minX+20,N=t.maxY-t.minY+20;let V="",S="";const X=n.value.reduce((B,D)=>B+D[0]+(D[1]+l)+","+(D[2]+d),""),P=document.getElementById("signature-path-data");if(P){P.style.display="none",P.removeAttribute("viewBox"),(F=P.querySelector("path"))==null||F.setAttribute("d",X);const B=new XMLSerializer().serializeToString(P);V=btoa(B);const D=new Image;D.src="data:image/svg+xml;base64,"+V,D.onload=()=>{const C=document.createElement("canvas");C.style.display="none",C.width=E,C.height=N;const T=C.getContext("2d");T==null||T.drawImage(D,0,0),S=C.toDataURL("image/png"),S=S.replace("data:image/png;base64,",""),C.remove(),P.innerHTML="",n.value=[],o("finish",{originWidth:E,originHeight:N,path:X,signatureImageData:{data:S,type:"image/png"}})}}},k=()=>{n.value=[],o("cancel")};return e.onMounted(()=>{s.value.addEventListener("mousedown",i),s.value.addEventListener("touchstart",v)}),e.onBeforeUnmount(()=>{s.value.removeEventListener("mousedown",i),s.value.removeEventListener("touchstart",v)}),{signatureCanvas:s,paths:n,path:c,data:t,handlePanStart:g,handlePanMove:_,handlePanEnd:x,finish:u,cancel:k}}},be={style:{height:"210px"},class:"left-0 right-0 top-0 z-0 border-b border-gray-300 bg-white shadow-lg","data-cy":"sign-area"},ve={class:"absolute bottom-0 right-0 mb-4 mx-4 flex"},_e={class:"flex w-full flex-grow items-center justify-center"},Ee={class:"text-black-600"},De={class:"pointer-events-none h-full w-full",id:"signature-path-data"},ke=["d"];function Se(a,o,s,n,c,t){return e.openBlock(),e.createElementBlock("div",be,[e.createElementVNode("div",{ref:"signatureCanvas",onPanstart:o[2]||(o[2]=(...i)=>n.handlePanStart&&n.handlePanStart(...i)),onPanmove:o[3]||(o[3]=(...i)=>n.handlePanMove&&n.handlePanMove(...i)),onPanend:o[4]||(o[4]=(...i)=>n.handlePanEnd&&n.handlePanEnd(...i)),class:"relative h-full w-full select-none"},[e.createElementVNode("div",ve,[e.createElementVNode("div",_e,[e.createElementVNode("p",Ee,e.toDisplayString(t.getTranslation.drawLabel),1)]),e.createElementVNode("button",{onClick:o[0]||(o[0]=(...i)=>n.finish&&n.finish(...i)),class:"mx-4 w-24 rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-blue-700 btn-positive","data-cy":"sign-done"},e.toDisplayString(t.getTranslation.drawDone),1),e.createElementVNode("button",{onClick:o[1]||(o[1]=(...i)=>n.cancel&&n.cancel(...i)),class:"w-24 rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700 btn-negative","data-cy":"sign-cancel"},e.toDisplayString(t.getTranslation.drawCancel),1)]),(e.openBlock(),e.createElementBlock("svg",De,[e.createElementVNode("path",{"stroke-width":"5","stroke-linejoin":"round","stroke-linecap":"round",d:n.path,stroke:"black",fill:"none"},null,8,ke)]))],544)])}var Pe=Y(xe,[["render",Se]]);const U=[{name:"pdfjsLib",src:"https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.min.js"},{name:"PDFLib",src:"https://unpkg.com/pdf-lib@1.4.0/dist/pdf-lib.min.js"},{name:"download",src:"https://unpkg.com/downloadjs@1.4.7"}],I={};function O(a){if(I[a])return I[a];const o=U.find(s=>s.name===a);if(!o)throw new Error(`Script ${a} not exists.`);return R(o)}function R({name:a,src:o}){if(I[a])return I[a];const s=e.ref(null);return I[a]=new Promise((n,c)=>{const t=document.createElement("script");t.src=o,t.onload=()=>{s.value=window[a],n(s)},t.onerror=()=>{c(`The script ${a} didn't load correctly.`)},document.body.appendChild(t)}),s}function Be(){U.forEach(R)}async function Ce(a,o){const s=await O("pdfjsLib");if(o==="arrayBuffer"){const n=new Blob([a]),c=window.URL.createObjectURL(n);return s.value.getDocument(c).promise}else if(o==="string"){const n="data:application/pdf;base64,"+a;return s.value.getDocument(n).promise}}function Me(){let a=0;return function(){return a++}}async function Ne(a,o,s,n=!1){const c=await O("PDFLib"),t=await O("download");let i;try{i=await c.value.PDFDocument.load(a)}catch(h){throw h}const f=i.getPages().map(async(h,v)=>{const m=o[v],p=h.getHeight(),g=m.map(async x=>{if(x.type==="drawing"){const{x:u,y:k,path:l,originWidth:d,originHeight:E,width:N,height:V,scale:S}=x,X=d*S,P=E*S,F=u+(N-X)/2,B=k+(V-P)/2,{pushGraphicsState:D,setLineCap:C,popGraphicsState:T,setLineJoin:j,LineCapStyle:A,LineJoinStyle:r}=c.value;return()=>{h.pushOperators(D(),C(A.Round),j(r.Round)),h.drawSvgPath(l,{borderWidth:5,scale:S,x:F,y:p-B}),h.pushOperators(T())}}});(await Promise.all(g)).forEach(x=>x())});await Promise.all(f);try{const h=await i.save();return n&&t.value(h,s,"application/pdf"),await i.saveAsBase64()}catch(h){throw h}}var Qe="";const Te={name:"DrawSignPdf",components:{PDFPage:Z,DrawingCanvas:Pe,DrawingSignature:se,DialogBox:we},props:{pdfData:String,signatureData:Array,isDownload:{type:Boolean,default:!1},finish:Function,translations:{type:Object,default:()=>({})}},computed:{getTranslation(){return{...{updateSign:"Update Signature",save:"Save",saving:"Saving",drawLabel:"Draw the signature here",drawDone:"Done",drawCancel:"Cancel",confirmBoxTitle:"Confirm Saving",confirmBoxDesc:"Are you sure you want to save the signed document?",confirmBoxClose:"Close",confirmBoxSaveChanges:"Save Changes",warningTitle:"Missing Signature",warningDesc:"The required signature is missing. Please sign to continue",warningClose:"Close",pdfLoading:"PDF will load here"},...this.translations}}},emits:["finish"],setup(a,{emit:o}){const s=Me(),n=e.ref(null),c=e.ref(""),t=e.ref([]),i=e.ref([]),f=e.ref([]),h=e.ref("Times-Roman"),v=e.ref(null),m=e.ref(-1),p=e.ref(!1),g=e.ref(!1),_=e.ref(""),x=e.ref({data:"",type:"application/pdf"}),u=e.ref(!1),k=e.ref("warning");e.onMounted(async()=>{try{O("pdfjsLib"),m.value=0,Be(),await d(a.pdfData,"string"),N(),document.addEventListener("keydown",A)}catch{}}),e.onBeforeUnmount(()=>{document.addEventListener("keydown",A)});const l=async r=>{const y=(r.target.files||r.dataTransfer&&r.dataTransfer.files)[0];if(!(!y||y.type!=="application/pdf")){m.value=-1;try{await d(y,"arrayBuffer"),m.value=0}catch{}}},d=async(r,w)=>{try{const y=await Ce(r,w);c.value=r.name,n.value=r;const b=y.numPages;t.value=Array.from({length:b}).map(async(M,z)=>await y.getPage(z+1)),f.value=Array(b).fill([]),i.value=Array(b).fill({scale:1})}catch(y){throw y}},E=async r=>{_.value=r.signatureImageData;const{originWidth:w,originHeight:y,path:b}=r;await V(w,y,b),g.value=!1},N=()=>{m.value>=0&&(g.value=!0)},V=(r,w,y)=>{var b;f.value=Array(f.value.length).fill([]),(b=a.signatureData)==null||b.forEach(M=>{const z=s(),q=B(M.width),G=B(M.height),ze=q/r,He=G/w,Ue=Math.min(ze,He),Re={id:z,path:y,type:"drawing",x:B(M.left),y:B(M.top),originWidth:r,originHeight:w,width:q,height:G,scale:Ue};f.value=f.value.map((J,qe)=>M.page===qe+1?[...J,Re]:J)})},S=r=>{m.value=r},X=(r,w)=>{f.value=f.value.map((y,b)=>b==m.value?y.map(M=>M.id===r?{...M,...w}:M):y)},P=r=>{f.value=f.value.map((w,y)=>y==m.value?w.filter(b=>b.id!==r):w)},F=(r,w)=>{i.value[w]=r},B=r=>r*72/2.54,D=async()=>{if(!(!n.value||p.value||!t.value.length)){p.value=!0;try{const r=await Ne(n.value,f.value,c.value,a.isDownload);x.value={type:"application/pdf",data:r},o("finish",{signedDocument:x.value,signatureImage:_.value})}catch{}finally{p.value=!1}}},C=()=>{_.value!==""?k.value="confirm":k.value="warning",u.value=!0,document.body.classList.add("overflow-y-hidden")},T=()=>{u.value=!1,document.body.classList.remove("overflow-y-hidden")},j=()=>{D(),T()},A=r=>{(r.key==="Escape"||r.key==="Esc")&&T()};return{genID:s,pdfFile:n,pdfName:c,pages:t,pagesScale:i,allObjects:f,currentFont:h,focusId:v,selectedPageIndex:m,saving:p,addingDrawing:g,isOpenConfirm:u,onUploadPDF:l,addPDF:d,onAddDrawing:N,addDrawing:V,selectPage:S,updateObject:X,deleteObject:P,onMeasure:F,savePDF:D,onFinishDrawing:E,openModal:C,closeModal:T,confirmSave:j,isConfirmOrWarning:k}}},Le={key:0,id:"modelConfirm",class:"fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-900 bg-opacity-60 px-4"},Ve={class:"flex min-h-screen flex-col items-center bg-gray-100 py-5"},Xe={class:"left-0 right-0 top-0 z-10 flex h-12 items-center justify-center"},Fe={key:0,class:"sign-drawing-canvas fixed left-0 right-0 top-0 z-10 items-center justify-center border-b border-gray-300 bg-white shadow-lg",style:{height:"200px","z-index":"60",width:"100%"},"data-cy":"sign-drawing-canvas"},Ye={key:1,class:"w-full"},Ie=["onMousedown","onTouchstart","data-cy"],Oe={key:2,class:"flex w-full flex-grow items-center justify-center"},We={class:"text-3xl font-bold text-gray-500"};function Ae(a,o,s,n,c,t){const i=e.resolveComponent("DialogBox"),f=e.resolveComponent("DrawingCanvas"),h=e.resolveComponent("PDFPage"),v=e.resolveComponent("DrawingSignature");return e.openBlock(),e.createElementBlock(e.Fragment,null,[n.isOpenConfirm?(e.openBlock(),e.createElementBlock("div",Le,[e.createVNode(i,{translations:t.getTranslation,type:n.isConfirmOrWarning,onCancel:n.closeModal,onFinish:n.confirmSave},null,8,["translations","type","onCancel","onFinish"])])):e.createCommentVNode("",!0),e.createElementVNode("div",null,[e.createElementVNode("main",Ve,[e.createElementVNode("div",Xe,[e.createElementVNode("button",{onClick:o[0]||(o[0]=(...m)=>n.onAddDrawing&&n.onAddDrawing(...m)),class:"btn-positive ml-3 mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4","data-cy":"update-sign"},e.toDisplayString(t.getTranslation.updateSign),1),e.createElementVNode("button",{onClick:o[1]||(o[1]=(...m)=>n.openModal&&n.openModal(...m)),class:e.normalizeClass(["btn-positive mr-3 rounded bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-700 md:mr-4 md:px-4",{"cursor-not-allowed":n.pages.length===0||n.saving||!n.pdfFile,"bg-blue-700":n.pages.length===0||n.saving||!n.pdfFile}]),"data-cy":"save-sign"},e.toDisplayString(n.saving?t.getTranslation.saving:t.getTranslation.save),3)]),n.addingDrawing?(e.openBlock(),e.createElementBlock("div",Fe,[e.createVNode(f,{onFinish:n.onFinishDrawing,onCancel:o[2]||(o[2]=m=>n.addingDrawing=!1),translations:t.getTranslation},null,8,["onFinish","translations"])])):e.createCommentVNode("",!0),n.pages.length?(e.openBlock(),e.createElementBlock("div",Ye,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.pages,(m,p)=>(e.openBlock(),e.createElementBlock("div",{key:p,class:"flex w-full flex-col items-center overflow-hidden p-5",onMousedown:g=>n.selectPage(p),onTouchstart:g=>n.selectPage(p),"data-cy":"page-"+p},[e.createElementVNode("div",{class:e.normalizeClass(["relative shadow-lg",{"shadow-outline":p===n.selectedPageIndex}])},[e.createVNode(h,{onMeasure:g=>n.onMeasure(g,p),page:m},null,8,["onMeasure","page"]),e.createElementVNode("div",{class:"absolute left-0 top-0 origin-top-left transform",style:e.normalizeStyle({transform:`scale(${n.pagesScale[p].scale})`,touchAction:"none"})},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.allObjects[p],g=>{var _;return e.openBlock(),e.createElementBlock("div",{key:g.id},[g.type==="drawing"?(e.openBlock(),e.createBlock(v,{key:0,onUpdate:x=>n.updateObject(g.id,x),onDelete:()=>n.deleteObject(g.id),path:g.path,x:g.x,y:g.y,width:g.width,height:g.height,originWidth:g.originWidth,originHeight:g.originHeight,pageScale:(_=n.pagesScale[p])==null?void 0:_.scale,"data-cy":"sign-pos-"+g.id},null,8,["onUpdate","onDelete","path","x","y","width","height","originWidth","originHeight","pageScale","data-cy"])):e.createCommentVNode("",!0)])}),128))],4)],2)],40,Ie))),128))])):(e.openBlock(),e.createElementBlock("div",Oe,[e.createElementVNode("span",We,e.toDisplayString(t.getTranslation.pdfLoading),1)]))])])],64)}var W=Y(Te,[["render",Ae],["__scopeId","data-v-94926d04"]]);O("pdfjsLib");const je=a=>{a.component(W.name,W)};W.install=je,L.DrawSignPdf=W,L.default=W,Object.defineProperties(L,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
