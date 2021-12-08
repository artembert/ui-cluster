import "./style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";

const map = new maplibregl.Map({
  container: "map",
  zoom: 9,
  minZoom: 1,
  center: [30.3, 59.95],
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
});

map.on("load", function () {
  map.addSource("hexapoint_3000", {
    type: "vector",
    tiles: [
      "https://139.geosemantica.ru/martin/public.hexapoint_3000/{z}/{x}/{y}.pbf",
    ],
  });
  map.addLayer({
    id: "public.hexapoint_3000",
    type: "circle",
    source: "hexapoint_3000",
    "source-layer": "public.hexapoint_3000",
  });
});
