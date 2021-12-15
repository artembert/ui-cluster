import "./style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import "./libs/mapbox-gl-framerate.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FrameRateControl from "./libs/mapbox-gl-framerate";
import { updateMarkers } from "./components/markers";
import { clusterStyleConfig } from "./configs/cluster-style.config";
import { debounceTime, fromEvent, merge } from "rxjs";
import { setZoomIndicator } from "./components/zoom-indicator";

type SourceParams = [string, number, number];

const counterElement: HTMLElement | null = document.getElementById("counter");
const zoomLevelElement: HTMLElement | null = document.getElementById("zoom");
const map = new maplibregl.Map({
  container: "map",
  zoom: 9,
  minZoom: 1,
  center: [33.32, 60.44],
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
});
const fps = new FrameRateControl();
const sources: SourceParams[] = [
  ["hexapoint_800", 9.2, 11.8],
  ["hexapoint_3000", 7.7, 9.2],
  ["hexapoint_10000", 6.3, 7.7],
  ["hexapoint_25000", 4.8, 6.3],
  ["hexapoint_50000", 3.6, 4.8],
  ["hexapoint_100000", 2.3, 3.6],
  ["hexapoint_250000", 0, 2.3],
];
const clustersLayersNames: string[] = sources.map(([name]) => "public." + name);

map.addControl(fps);

map.on("load", function () {
  map.on("sourcedata", function (e) {
    if (!e.sourceId?.includes("hexapoint_") || !e.isSourceLoaded) {
      return;
    }
    merge(fromEvent(map, "moveend"), fromEvent(map, "movestart"))
      .pipe(debounceTime(200))
      .subscribe(() => {
        updateMarkers(map, counterElement, clustersLayersNames);
      });
    updateMarkers(map, counterElement, clustersLayersNames);
  });
  addSources(map, sources);
  addLayers(map, sources);

  setZoomIndicator(zoomLevelElement, map.getZoom());
  fromEvent(map, "zoomend").subscribe(() =>
    setZoomIndicator(zoomLevelElement, map.getZoom())
  );
});

const addSources: (map: maplibregl.Map, sources: SourceParams[]) => void = (
  map,
  sources
) => {
  sources.forEach(([name]) => {
    map.addSource(name, {
      type: "vector",
      tiles: [
        `https://139.geosemantica.ru/martin/public.${name}/{z}/{x}/{y}.pbf`,
      ],
    });
  });
};

const addLayers: (map: maplibregl.Map, sources: SourceParams[]) => void = (
  map,
  sources
) => {
  sources.forEach(([name, minzoom, maxzoom]) => {
    map.addLayer({
      minzoom,
      maxzoom,
      id: "public." + name,
      type: "circle",
      source: name,
      "source-layer": "public." + name,
      paint: clusterStyleConfig,
    });
  });
};
