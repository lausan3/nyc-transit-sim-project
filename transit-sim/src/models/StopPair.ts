export type Coordinate = [number, number];

export type StopPair = {
  from: { name: string; coordinates: Coordinate };
  to: { name: string; coordinates: Coordinate };
};
