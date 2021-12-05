import maplibregl, { Map } from "maplibre-gl";
import { FeatureCollection, Point } from "geojson";
import { drawPieChart, PieChartItem } from "./pie-chart";

const createMaker: () => HTMLElement = () => {
  const data: PieChartItem[] = [
    { label: "Food", value: 1, color: "#39CCCC" },
    { label: "Party", value: 1, color: "#3D9970" },
    { label: "Rent", value: 1, color: "#001F3F" },
    { label: "Chocolates", value: 1, color: "#85144B" },
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
