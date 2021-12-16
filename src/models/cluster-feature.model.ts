import { Point } from "geojson";

export interface ClusterFeature {
  geometry: Point;
  source: string;
  sourceLayer: string;
  properties: { id: number; total: number };
}
