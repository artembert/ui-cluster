import maplibregl, { Marker } from "maplibre-gl";
import { drawPieChart, PieChartItem } from "./pie-chart";
import { ClusterFeature } from "../models/cluster-feature.model";
import { setClustersCounter } from "./clusters-counter";

const existingMarkers: Record<string, Marker> = {};

const createMakerElement: () => HTMLElement = () => {
  const data: PieChartItem[] = [
    { label: "Food", value: 1, color: "#003f5c" },
    { label: "Party", value: 1, color: "#7a5195" },
    { label: "Rent", value: 1, color: "#ef5675" },
    { label: "Chocolates", value: 1, color: "#ffa600" },
  ];

  return drawPieChart(data);
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
      element: createMakerElement(),
    });
    marker
      .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
      .addTo(map);
    existingMarkers[String(properties.id)] = marker;
  });

  setClustersCounter(Object.keys(existingMarkers).length, counterElement);
};
