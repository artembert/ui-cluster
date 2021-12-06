import "./style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
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

const points = getPoints();
renderCircleChartMarkers(map, points);

map.on("load", function () {
  // map.addSource("points", {
  //   type: "geojson",
  //   data: points,
  // });
  // map.addLayer({
  //   id: "points",
  //   type: "circle",
  //   source: "points",
  // });
});
