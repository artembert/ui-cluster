import maplibregl, { Marker } from "maplibre-gl";
import { drawPieChart, PieChartItem } from "./pie-chart";
import { Point } from "geojson";

interface ClusterFeature {
  geometry: Point;
  properties: { id: number };
}

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

const setCount: (count: number, counter: HTMLElement | null) => void = (
  count,
  counter
) => {
  if (!counter) {
    return;
  }
  const res = count.toString(10).padStart(3);
  counter.innerText = "Total:" + res;
};

export const updateMarkers: (
  map: maplibregl.Map,
  counterElement: HTMLElement | null,
  sourceLayersNames: string[]
) => void = (map, counterElement, sourceLayersNames) => {
  const clusterFeatures = map.queryRenderedFeatures(undefined, {
    layers: sourceLayersNames,
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

  setCount(Object.keys(existingMarkers).length, counterElement);
};
