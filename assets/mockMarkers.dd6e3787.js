import"./modulepreload-polyfill.b7f2da20.js";import{d as l}from"./pie-chart.9a516d1f.js";import{m as a}from"./vendor.6886b79e.js";const r=()=>Math.random()>.5,c=()=>{const e=[95,17],o=5;return[e[0]+(r()?1:-1)*Math.random()*o,e[1]+(r()?1:-1)*Math.random()*o]},i=(e=10)=>{const o=new Array(e).fill(void 0).map(()=>({type:"Feature",geometry:{type:"Point",coordinates:c()},properties:{content:["a","b","c"]}}));return{type:"FeatureCollection",features:o}},d=()=>l([{label:"Food",value:1,color:"#003f5c"},{label:"Party",value:1,color:"#7a5195"},{label:"Rent",value:1,color:"#ef5675"},{label:"Chocolates",value:1,color:"#ffa600"}]),m=(e,o)=>{o.features.forEach(({geometry:t})=>{const s=d();new a.Marker({element:s}).setLngLat([t.coordinates[0],t.coordinates[1]]).addTo(e)})},n=new a.Map({container:"map",zoom:5,minZoom:1,center:[95.899147,18.088694],style:"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"}),p=i();m(n,p);n.on("load",function(){});
