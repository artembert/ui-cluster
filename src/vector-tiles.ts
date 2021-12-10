import "./style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl, { Marker } from "maplibre-gl";
import "./libs/mapbox-gl-framerate.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FrameRateControl from "./libs/mapbox-gl-framerate";
import { drawPieChart, PieChartItem } from "./components/pie-chart";
import { Point } from "geojson";

const counter: HTMLElement | null = document.getElementById("counter");

const setCount: (count: number) => void = (count) => {
  if (!counter) {
    return;
  }
  const res = count.toString(10).padStart(3);
  counter.innerText = "Total:" + res;
};

const map = new maplibregl.Map({
  container: "map",
  zoom: 9,
  minZoom: 1,
  center: [30.3, 59.95],
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
    paint: {
      "circle-color": "hsla(215,28%,59%, 0.35)",
      "circle-stroke-color": "#7992B4",
      "circle-stroke-width": 0.5,
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "total"],
        1,
        2,
        10,
        3.5,
        100,
        5,
        250,
        6.5,
        1033,
        8,
      ],
    },
  });

  map.on("data", function (e) {
    if (e.sourceId !== "hexapoint_3000" || !e.isSourceLoaded) return;

    // map.on("move", updateMarkers);
    map.on("moveend", updateMarkers);
    updateMarkers();
  });
});

const createMakerElement: () => HTMLElement = () => {
  const data: PieChartItem[] = [
    { label: "Food", value: 1, color: "#003f5c" },
    { label: "Party", value: 1, color: "#7a5195" },
    { label: "Rent", value: 1, color: "#ef5675" },
    { label: "Chocolates", value: 1, color: "#ffa600" },
  ];

  return drawPieChart(data);
};

const existingMarkers: Record<string, Marker> = {};

interface ClusterFeature {
  geometry: Point;
  properties: { id: number };
}

function updateMarkers() {
  const clusterFeatures = map.queryRenderedFeatures(undefined, {
    layers: ["public.hexapoint_3000"],
  }) as any as ClusterFeature[];
  console.log(clusterFeatures);

  console.log("existingMarkers", Object.keys(existingMarkers).length);
  Object.keys(existingMarkers)
    .filter(
      (existingId) =>
        !clusterFeatures
          .map((item) => String(item.properties.id))
          .includes(existingId)
    )
    .forEach((item) => {
      console.log("remove");
      existingMarkers[item].remove();
      delete existingMarkers[item];
    });

  clusterFeatures.forEach(({ geometry, properties }) => {
    if (geometry.type !== "Point") {
      return;
    }
    if (!properties.id) {
      throw Error("id is not provided");
    }
    if (existingMarkers[String(properties.id)] !== undefined) {
      console.log("marker exists");
      return;
    }
    const marker = new maplibregl.Marker({
      element: createMakerElement(),
    });
    marker
      .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
      .addTo(map);
    existingMarkers[String(properties.id)] = marker;
  });
  console.log("total", Object.keys(existingMarkers).length);
  console.log(
    "real",
    document.querySelectorAll(".maplibregl-marker.mapboxgl-marker").length
  );

  setCount(Object.keys(existingMarkers).length);
}
