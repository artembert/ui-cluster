import "./style.css";
import maplibregl from "maplibre-gl";
import {
  movingCirclesInit,
  movingCirclesSourceConfig,
} from "./components/moving-circles";
import { getPoints } from "./data/points";
import { renderCircleChartMarkers } from "./components/circle-chart";

const map = new maplibregl.Map({
  container: "map",
  zoom: 5,
  minZoom: 1,
  center: [95.899147, 18.088694],
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
});

movingCirclesInit();

const points = getPoints();
renderCircleChartMarkers(map, points);

map.on("load", function () {
  map.addSource(movingCirclesSourceConfig.name, {
    type: "canvas",
    canvas: movingCirclesSourceConfig.elementId,
    coordinates: [
      [91.4461, 21.5006],
      [100.3541, 21.5006],
      [100.3541, 13.9706],
      [91.4461, 13.9706],
    ],
    // Set to true if the canvas source is animated. If the canvas is static, animate should be set to false to improve performance.
    animate: true,
  });
  map.addLayer({
    id: "canvas-layer",
    type: "raster",
    source: movingCirclesSourceConfig.name,
  });

  map.addSource("points", {
    type: "geojson",
    data: points,
  });
  map.addLayer({
    id: "points",
    type: "circle",
    source: "points",
  });
});
