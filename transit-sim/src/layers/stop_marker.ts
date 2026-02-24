import { IconLayer } from "deck.gl";
import type { ParsedRoute } from "../models/Parsed.ts";

export default function MakeStopIconLayer(route: ParsedRoute) {
  const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
  };

  const color = route.route_color;

  const r = Number("0x" + color.slice(0, 2));
  const g = Number("0x" + color.slice(2, 4));
  const b = Number("0x" + color.slice(4, 6));

  return new IconLayer({
    id: `StopLayer-${route.route_id}`,
    data: route.stop_ids,
    iconAtlas:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
    iconMapping: ICON_MAPPING,
    getSize: 25,
    getColor: (_) => [r, g, b],
    getIcon: (_) => "marker",
    getPosition: (stop, i) => {
      const currStop = stop;
      return [Number(currStop[2]), Number(currStop[3])];
    },
  });
}
