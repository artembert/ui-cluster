import { Feature, FeatureCollection, Geometry } from "geojson";

const isInverseRandom: () => boolean = () => Math.random() > 0.5;

const getRandomCoordinates: () => [number, number] = () => {
  const center = [95, 17] as const;
  const deviation = 5;
  return [
    center[0] + (isInverseRandom() ? 1 : -1) * Math.random() * deviation,
    center[1] + (isInverseRandom() ? 1 : -1) * Math.random() * deviation,
  ];
};

export const getPoints: (count?: number) => FeatureCollection<Geometry> = (
  count = 10
) => {
  const features = new Array(count).fill(undefined).map<Feature>(() => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: getRandomCoordinates(),
    },
    properties: {},
  }));
  console.log(features);
  return {
    type: "FeatureCollection",
    features,
  };
};
