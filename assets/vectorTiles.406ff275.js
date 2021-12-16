var O=Object.defineProperty;var y=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var g=(o,t,e)=>t in o?O(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,v=(o,t)=>{for(var e in t||(t={}))z.call(t,e)&&g(o,e,t[e]);if(y)for(var e of y(t))L.call(t,e)&&g(o,e,t[e]);return o};var d=(o,t,e)=>(g(o,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill.b7f2da20.js";import{d as T}from"./pie-chart.e7a9d21a.js";import{m as x,a as S,f as u,d as _}from"./vendor.0dd871b3.js";class w{constructor(t){d(this,"onAdd",t=>{this.map=t;const e=window.devicePixelRatio,{width:a,graphWidth:r,graphHeight:c,color:l,background:m,font:f}=this.options,s=this.container=document.createElement("div");return s.className="mapboxgl-ctrl mapboxgl-ctrl-fps",s.style.backgroundColor=m,s.style.borderRadius="6px",this.readOutput=document.createElement("div"),this.readOutput.style.color=l,this.readOutput.style.fontFamily=f,this.readOutput.style.padding="0 5px 5px",this.readOutput.style.fontSize="9px",this.readOutput.style.fontWeight="bold",this.readOutput.textContent="Waiting\u2026",this.canvas=document.createElement("canvas"),this.canvas.className="mapboxgl-ctrl-canvas",this.canvas.width=a,this.canvas.height=c,this.canvas.style.cssText=`width: ${a/e}px; height: ${c/e}px;`,s.appendChild(this.readOutput),s.appendChild(this.canvas),this.map.on("movestart",this.onMoveStart),this.map.on("moveend",this.onMoveEnd),this.container});d(this,"onMoveStart",()=>{this.frames=0,this.time=performance.now(),this.map.on("render",this.onRender)});d(this,"onMoveEnd",()=>{const t=performance.now();this.updateGraph(this.getFPS(t)),this.frames=0,this.time=null,this.map.off("render",this.onRender)});d(this,"onRender",()=>{this.frames++;const t=performance.now();t>=this.time+1e3&&(this.updateGraph(this.getFPS(t)),this.frames=0,this.time=t)});d(this,"getFPS",t=>(this.totalTime+=t-this.time,this.totalFrames+=this.frames,Math.round(1e3*this.frames/(t-this.time))||0));d(this,"updateGraph",t=>{const{barWidth:e,graphRight:a,graphTop:r,graphWidth:c,graphHeight:l,background:m,color:f}=this.options,s=this.canvas.getContext("2d"),M=Math.round(1e3*this.totalFrames/this.totalTime)||0,h=e;s.fillStyle=m,s.globalAlpha=1,s.fillRect(0,0,c,r),s.fillStyle=f,this.readOutput.textContent=`${t} FPS (${M} Avg)`,s.drawImage(this.canvas,a+h,r,c-h,l,a,r,c-h,l),s.fillRect(a+c-h,r,h,l),s.fillStyle=m,s.globalAlpha=.75,s.fillRect(a+c-h,r,h,(1-t/100)*l)});d(this,"onRemove",()=>(this.map.off("render",this.onRender),this.map.off("movestart",this.onMoveStart),this.map.off("moveend",this.onMoveEnd),this.container.parentNode.removeChild(this.container),this.map=null,this));const e=window.devicePixelRatio,a={background:"rgba(0,0,0,0.9)",barWidth:4*e,color:"#7cf859",font:"Monaco, Consolas, Courier, monospace",graphHeight:60*e,graphWidth:90*e,graphTop:0,graphRight:5*e,width:100*e};this.frames=0,this.totalTime=0,this.totalFrames=0,this.options=v(v({},t),a)}}window.mapboxgl&&(mapboxgl.FrameRateControl=w);const P=(o,t)=>{if(!t)return;const e=o.toString(10).padStart(3);t.innerText="Clusters: "+e},p={},W=o=>{const t=15,e=3,a=new Array(10).fill(void 0).map((c,l)=>l*e);let r;switch(!0){case o<=10:r=a[0];break;case(o>10&&o<=20):r=a[1];break;case(o>20&&o<=40):r=a[2];break;case(o>40&&o<=70):r=a[3];break;case(o>70&&o<=100):r=a[4];break;default:r=a[5]}return t+r},j=o=>T([{label:"Food",value:1,color:"#003f5c"},{label:"Party",value:1,color:"#7a5195"},{label:"Rent",value:1,color:"#ef5675"},{label:"Chocolates",value:1,color:"#ffa600"}],o),k=(o,t,e)=>{console.log("update markers",e),Object.keys(p).filter(a=>!e.map(r=>String(r.properties.id)).includes(a)).forEach(a=>{p[a].remove(),delete p[a]}),e.forEach(({geometry:a,properties:r})=>{if(a.type!=="Point")return;if(!r.id)throw Error("id is not provided");if(p[String(r.id)]!==void 0)return;const c=new x.Marker({element:j(W(r.total))});c.setLngLat([a.coordinates[0],a.coordinates[1]]).addTo(o),p[String(r.id)]=c}),P(Object.keys(p).length,t)},Z={"circle-color":"#777777","circle-stroke-color":"transparent","circle-stroke-width":0,"circle-radius":0},E=(o,t)=>{o&&(o.innerText="Zoom: "+t.toFixed(3))},A=(o,t)=>{o&&(o.innerText="Layer: "+t)},C=document.getElementById("counter"),R=document.getElementById("zoom"),$=document.getElementById("layer"),i=new x.Map({container:"map",zoom:8.9,minZoom:1,center:[30.32,59.94],style:"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"}),H=new w,n=[0,2.3,3.6,4.8,6.3,8.7,10.8,11.8],b=[["hexapoint_800",n[6],n[7]],["hexapoint_3000",n[5],n[6]],["hexapoint_10000",n[4],n[5]],["hexapoint_25000",n[3],n[4]],["hexapoint_50000",n[2],n[3]],["hexapoint_100000",n[1],n[2]],["hexapoint_250000",n[0],n[1]]],F=b.map(([o])=>"public."+o);i.addControl(H);i.on("load",function(){i.on("sourcedata",function(o){var e;if(!((e=o.sourceId)==null?void 0:e.includes("hexapoint_"))||!o.isSourceLoaded)return;S(u(i,"moveend"),u(i,"movestart")).pipe(_(200)).subscribe(()=>{const a=i.queryRenderedFeatures(void 0,{layers:F});k(i,C,a),A($,a[0].source)});const t=i.queryRenderedFeatures(void 0,{layers:F});k(i,C,t)}),N(i,b),B(i,b),E(R,i.getZoom()),S(u(i,"zoomstart"),u(i,"zoomend")).subscribe(()=>E(R,i.getZoom()))});const N=(o,t)=>{t.forEach(([e])=>{o.addSource(e,{type:"vector",tiles:[`https://139.geosemantica.ru/martin/public.${e}/{z}/{x}/{y}.pbf`]})})},B=(o,t)=>{t.forEach(([e,a,r])=>{o.addLayer({minzoom:a,maxzoom:r,id:"public."+e,type:"circle",source:e,"source-layer":"public."+e,paint:Z})})};
