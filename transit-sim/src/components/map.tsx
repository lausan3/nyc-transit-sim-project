import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// Center on NYC
const INITIAL_VIEW_STATE = {
  longitude: -74.006,
  latitude: 40.7128,
  zoom: 11,
  // pitch: 45, // NOTE: experiment with 3D view
  bearing: 0,
};

// A free, dark-themed base map from CARTO
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// Dummy data: A line representing a mock subway connection
const data = [
  {
    sourcePosition: [-74.006, 40.7128], // City Hall
    targetPosition: [-73.987, 40.758], // Times Square
  },
];

export default function TransitMap() {
  const layers = [
    new LineLayer({
      id: "mock-subway-line",
      data,
      getSourcePosition: (d) => d.sourcePosition,
      getTargetPosition: (d) => d.targetPosition,
      getColor: [0, 255, 128],
      getWidth: 5,
    }),
  ];

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
