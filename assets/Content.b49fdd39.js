import{_ as r,r as a,o as d,c as l,a as t,b as e,w as o,d as m,v as u,p,e as h,f}from"./index.50f16744.js";const v="/2022-f2e-week2/assets/ic_file_h.62074123.svg",b="/2022-f2e-week2/assets/ic_archive_h.36098141.svg",g="/2022-f2e-week2/assets/ic_add_tint.7da79ccc.svg";const w={name:"Content",computed:{currentRouteName(){return this.$route.name}}},c=s=>(p("data-v-f2006972"),s=s(),h(),s),C={class:"content"},k={class:"content-tabs"},x=c(()=>t("img",{src:v,alt:"btn-file"},null,-1)),S=c(()=>t("img",{src:b,alt:"btn-add"},null,-1)),I=c(()=>t("img",{src:f,alt:"btn-trash"},null,-1)),N={class:"content-bg"},$={class:"content-add"},B=c(()=>t("img",{src:g,alt:"btn-add"},null,-1));function y(s,F,R,V,A,_){const n=a("router-link"),i=a("router-view");return d(),l("section",C,[t("div",k,[e(n,{to:{name:"ContentFile"},class:"content-tabs-item"},{default:o(()=>[x]),_:1}),e(n,{to:{name:"ContentArchive"},class:"content-tabs-item"},{default:o(()=>[S]),_:1}),e(n,{to:{name:"ContentTrash"},class:"content-tabs-item"},{default:o(()=>[I]),_:1})]),t("div",N,[e(i)]),m(t("div",$,[e(n,{to:{name:"Sign"},class:"content-add-btn"},{default:o(()=>[B]),_:1})],512),[[u,_.currentRouteName!=="ContentFile"]])])}const E=r(w,[["render",y],["__scopeId","data-v-f2006972"]]);export{E as default};