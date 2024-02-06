import React from "react";
import { Source, Layer } from "react-map-gl";

type JeniLayerProps = {
  selectedAttribute: string;
  attributeMapping: {
    [key: string]: {
      label: string;
      colors: Record<string, string>;
    };
  };
};

const borderStyle = {
  id: "jeni-border",
  type: "line" as const,
  paint: {
    "line-color": "#696969",
    "line-width": 1,
  },
};

const JeniDataLayer: React.FC<JeniLayerProps> = (props) => {
  const [data, setData] = React.useState(null);
  const { selectedAttribute, attributeMapping } = props;

  const style = {
    id: "jeni-polygon",
    type: "fill" as const,
    paint: {
      "fill-color": [
        "match",
        ["get", selectedAttribute as keyof typeof attributeMapping],
        ...Object.entries(
          attributeMapping[selectedAttribute as keyof typeof attributeMapping]
            .colors
        ).reduce(
          (acc, [key, value]) => [...acc, key, value],
          [] as (string | number)[]
        ),
        "#ccc",
      ] as any,
      "fill-opacity": 0.8,
    },
  };

  React.useEffect(() => {
    fetch("/data/Justice_Equity_Need_Index_(zip_code).geojson")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return null;

  return (
    <Source type="geojson" data={data}>
      <Layer {...style} />
      <Layer {...borderStyle} />
    </Source>
  );
};

export default JeniDataLayer;
