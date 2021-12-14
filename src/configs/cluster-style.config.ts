import { CirclePaint } from "maplibre-gl";

export const clusterStyleConfig: CirclePaint = {
  "circle-color": "transparent",
  "circle-stroke-color": "transparent",
  "circle-stroke-width": 0,
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
};
