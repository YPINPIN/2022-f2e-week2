const l="data:application/pdf;base64,";pdfjsLib.GlobalWorkerOptions.workerSrc="https://mozilla.github.io/pdf.js/build/pdf.worker.js";function p(e){return new Promise((n,a)=>{const t=new FileReader;t.addEventListener("load",()=>n(t.result)),t.addEventListener("error",a),t.readAsDataURL(e)})}const w={async printPDF(e,n){e=await p(e);const a=atob(e.substring(l.length)),s=await(await pdfjsLib.getDocument({data:a}).promise).getPage(1);let c=s.getViewport({scale:1});const o=s.getViewport({scale:n/c.width}),r=document.createElement("canvas"),i=r.getContext("2d");r.height=o.height,r.width=o.width;const d={canvasContext:i,viewport:o};return s.render(d).promise.then(()=>r)},async pdfToImage(e){return new fabric.Image(e,{id:"renderPDF",scaleX:1,scaleY:1})}};export{w as p};