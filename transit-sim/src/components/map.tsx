import DeckGL from "@deck.gl/react";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ParsedRoute } from "../models/Parsed.ts";
import MakeRouteLineLayer from "../layers/route_line.ts";
import MakeStopIconLayer from "../layers/stop_marker.ts";
import FetchRoutes from "../utils/fetch-routes.ts";
import { Layer } from "deck.gl";

// Center on NYC
const INITIAL_VIEW_STATE = {
  longitude: -74.006,
  latitude: 40.7128,
  zoom: 13,
  // pitch: 45, // NOTE: experiment with 3D view
  bearing: 0,
};

// A free, dark-themed base map from CARTO
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

const BASE_DATA_PATH = "raw/gtfs";
const subwayStopsDataPath = `${BASE_DATA_PATH}_subway/routes_and_stops.json`;

const routes_to_stops: ParsedRoute[] = await FetchRoutes(subwayStopsDataPath);

export default function TransitMap() {
  const layers: Layer[] = routes_to_stops.flatMap((route) => {
    return [MakeRouteLineLayer(route), MakeStopIconLayer(route)];
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <Map mapStyle={MAP_STYLE} />
    </DeckGL>
  );
}
