import React from "react";
import { Source, Layer } from "react-map-gl";

type BoundaryLayerProps = {};

const style = {
  id: "la-boundaries",
  type: "line" as const,
  paint: {
    "line-color": "#007cbf",
    "line-width": 2,
  },
};

const BoundaryLayer: React.FC<BoundaryLayerProps> = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/data/la_boundaries.geojson")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return null;

  return (
    <Source id="la-boundary-source" type="geojson" data={data}>
      <Layer {...style} />
    </Source>
  );
};

export default BoundaryLayer;
