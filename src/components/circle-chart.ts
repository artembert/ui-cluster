import maplibregl, { Map } from "maplibre-gl";
import { FeatureCollection, Point } from "geojson";

const createMaker: () => HTMLElement = () => {
  const el = document.createElement("div");
  el.className = "marker";
  return el;
};

export const renderCircleChartMarkers: (
  map: Map,
  features: FeatureCollection<Point>
) => void = (map, features) => {
  features.features.forEach(({ geometry }) => {
    const markerEl = createMaker();
    new maplibregl.Marker({
      element: markerEl,
    })
      .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
      .addTo(map);
  });
};
