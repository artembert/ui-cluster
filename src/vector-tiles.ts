import "./style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import "./libs/mapbox-gl-framerate.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FrameRateControl from "./libs/mapbox-gl-framerate";
import { updateMarkers } from "./components/markers";
import { clusterStyleConfig } from "./configs/cluster-style.config";

const counterElement: HTMLElement | null = document.getElementById("counter");
const map = new maplibregl.Map({
  container: "map",
  zoom: 9,
  minZoom: 1,
  center: [33.32, 60.44],
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
});
const fps = new FrameRateControl();
map.addControl(fps);

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
    paint: clusterStyleConfig,
  });

  map.on("data", function (e) {
    if (e.sourceId !== "hexapoint_3000" || !e.isSourceLoaded) return;

    map.on("moveend", () => updateMarkers(map, counterElement));
    updateMarkers(map, counterElement);
  });
});
