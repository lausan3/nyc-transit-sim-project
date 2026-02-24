import { LineLayer } from "@deck.gl/layers";
import type { StopPair } from "../models/StopPair.ts";
import type { ParsedRoute } from "../models/Parsed.ts";

export default function MakeRouteLineLayer(route: ParsedRoute) {
  const color = route.route_color;

  const r = Number("0x" + color.slice(0, 2));
  const g = Number("0x" + color.slice(2, 4));
  const b = Number("0x" + color.slice(4, 6));

  const stopPairs: StopPair[] = [];

  for (let i = 0; i < route.stop_ids.length - 1; i++) {
    const fromStop = route.stop_ids[i];
    const toStop = route.stop_ids[i + 1];

    stopPairs.push({
      from: {
        name: fromStop.stop_name,
        coordinates: [Number(fromStop.stop_lon), Number(fromStop.stop_lat)],
      },
      to: {
        name: toStop.stop_name,
        coordinates: [Number(toStop.stop_lon), Number(toStop.stop_lat)],
      },
    });
  }

  return new LineLayer({
    id: `LineLayer-${route.route_id}`,
    data: stopPairs,
    getWidth: 3,
    getColor: (_) => [r, g, b],
    getSourcePosition: (stop: StopPair) => stop.from.coordinates,
    getTargetPosition: (stop: StopPair) => stop.to.coordinates,
  });
}
