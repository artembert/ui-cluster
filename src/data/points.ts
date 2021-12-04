import { Feature, FeatureCollection, Point } from "geojson";
import { CircleChartProperties } from "../models/circle-chart";

const isInverseRandom: () => boolean = () => Math.random() > 0.5;

const getRandomCoordinates: () => [number, number] = () => {
  const center = [95, 17] as const;
  const deviation = 5;
  return [
    center[0] + (isInverseRandom() ? 1 : -1) * Math.random() * deviation,
    center[1] + (isInverseRandom() ? 1 : -1) * Math.random() * deviation,
  ];
};

export const getPoints: (count?: number) => FeatureCollection<Point> = (
  count = 10
) => {
  const features = new Array(count).fill(undefined).map<Feature<Point>>(() => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: getRandomCoordinates(),
    },
    properties: {
      content: ["a", "b", "c"],
    } as CircleChartProperties,
  }));
  return {
    type: "FeatureCollection",
    features,
  };
};
