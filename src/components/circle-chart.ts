import maplibregl, { Map } from "maplibre-gl";
import { FeatureCollection, Point } from "geojson";
import { drawPieChart, PieChartItem } from "./pie-chart";

const createMaker: () => HTMLElement = () => {
  const data: PieChartItem[] = [
    { label: "Food", value: 1, color: "#003f5c" },
    { label: "Party", value: 1, color: "#7a5195" },
    { label: "Rent", value: 1, color: "#ef5675" },
    { label: "Chocolates", value: 1, color: "#ffa600" },
  ];

  return drawPieChart(data);
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
