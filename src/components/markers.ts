import maplibregl, { Marker } from "maplibre-gl";
import { drawPieChart, PieChartItem } from "./pie-chart";
import { ClusterFeature } from "../models/cluster-feature.model";
import { setClustersCounter } from "./clusters-counter";

const existingMarkers: Record<string, Marker> = {};

const getMarkerSize: (countInside: number) => number = (countInside) => {
  const min = 15;
  const sizeStep = 3;
  const sizes = new Array(10)
    .fill(undefined)
    .map((_, index) => index * sizeStep);

  let add: number;

  switch (true) {
    case countInside <= 10:
      add = sizes[0];
      break;
    case countInside > 10 && countInside <= 20:
      add = sizes[1];
      break;
    case countInside > 20 && countInside <= 40:
      add = sizes[2];
      break;
    case countInside > 40 && countInside <= 70:
      add = sizes[3];
      break;
    case countInside > 70 && countInside <= 100:
      add = sizes[4];
      break;
    default:
      add = sizes[5];
  }
  return min + add;
};

const createMakerElement: (size: number) => HTMLElement = (size: number) => {
  const data: PieChartItem[] = [
    { label: "Food", value: 1, color: "#003f5c" },
    { label: "Party", value: 1, color: "#7a5195" },
    { label: "Rent", value: 1, color: "#ef5675" },
    { label: "Chocolates", value: 1, color: "#ffa600" },
  ];
  return drawPieChart(data, size);
};

export const updateMarkers: (
  map: maplibregl.Map,
  counterElement: HTMLElement | null,
  features: ClusterFeature[]
) => void = (map, counterElement, features) => {
  console.log("update markers", features);

  Object.keys(existingMarkers)
    .filter(
      (existingId) =>
        !features.map((item) => String(item.properties.id)).includes(existingId)
    )
    .forEach((item) => {
      existingMarkers[item].remove();
      delete existingMarkers[item];
    });

  features.forEach(({ geometry, properties }) => {
    if (geometry.type !== "Point") {
      return;
    }
    if (!properties.id) {
      throw Error("id is not provided");
    }
    if (existingMarkers[String(properties.id)] !== undefined) {
      return;
    }
    const marker = new maplibregl.Marker({
      element: createMakerElement(getMarkerSize(properties.total)),
    });
    marker
      .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
      .addTo(map);
    existingMarkers[String(properties.id)] = marker;
  });

  setClustersCounter(Object.keys(existingMarkers).length, counterElement);
};
