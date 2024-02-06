"use client";
import React from "react";
import ReactMapGL, {
  MapLayerMouseEvent,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Popup,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Legend from "./Legend";
import AttributeSelector from "./AttributeSelector";
import BoundaryLayer from "./Layers/BoundaryLayer";
import JeniDataLayer from "./Layers/JeniDataLayer";
import DetailPanel from "./DetailPanel";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type PopupInfoType = {
  longitude: number;
  latitude: number;
  properties: Record<string, any>;
};

export const Map = () => {
  const [viewport, setViewport] = React.useState({
    latitude: 34.0522,
    longitude: -118.2437,
    zoom: 8.8,
  });
  const [popupInfo, setPopupInfo] = React.useState<PopupInfoType | null>(null);
  const [hoverInfo, setHoverInfo] = React.useState<PopupInfoType | null>(null);
  const [selectedAttribute, setSelectedAttribute] =
    React.useState("jenicategory");

  const handleMapClick = (event: MapLayerMouseEvent) => {
    event.originalEvent.stopPropagation();
    const feature = event.features && event.features[0];
    if (!feature) return;

    setPopupInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      properties: feature?.properties ?? {},
    });
  };

  const handleMapHover = (event: MapLayerMouseEvent) => {
    const feature = event.features && event.features[0];
    if (feature) {
      setHoverInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        properties: feature?.properties ?? {},
      });
    } else {
      setHoverInfo(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <ReactMapGL
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        mapboxAccessToken={token}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={handleMapClick}
        onMouseMove={handleMapHover}
        interactive={true}
        interactiveLayerIds={["jeni-polygon", "jeni-border"]}
      >
        <JeniDataLayer
          selectedAttribute={selectedAttribute}
          attributeMapping={attributeMapping}
        />
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-right" />
        <BoundaryLayer />
        {popupInfo && (
          <DetailPanel
            longitude={popupInfo?.longitude}
            latitude={popupInfo?.latitude}
            data={popupInfo?.properties}
            onClose={() => setPopupInfo(null)}
          />
        )}
        {hoverInfo && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            closeButton={false}
            closeOnClick={false}
            anchor="top"
            offset={10}
            className="pointer-events-none"
          >
            <div className="bg-white p-4 shadow-lg rounded-lg text-gray-800 pointer-events-none">
              <strong>
                {attributeMapping[selectedAttribute].label}{" "}
                {hoverInfo.properties[selectedAttribute]}
              </strong>
              <p>
                Percentile:{" "}
                {hoverInfo.properties[attributeMapping[selectedAttribute].pctl]}
              </p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
      <div className="legend absolute bottom-4 left-0 m-4">
        <AttributeSelector
          selectedAttribute={selectedAttribute}
          onChange={(newAttribute) => setSelectedAttribute(newAttribute)}
        />
        <Legend
          attributeMapping={attributeMapping}
          selectedAttribute={selectedAttribute}
        />
      </div>
    </div>
  );
};

export type AttributeMapping = Record<
  string,
  {
    label: string;
    colors: Record<string, string>;
    pctl: string;
  }
>;

const attributeMapping: AttributeMapping = {
  jenicategory: {
    label: "JENI Category",
    pctl: "jenipctl",
    colors: {
      Lowest: "#dae8fc", // Light Blue
      Low: "#b6d4fe", // Medium Light Blue
      Moderate: "#8bb8fe", // Medium Blue
      High: "#5e97fe", // Medium Dark Blue
      Highest: "#3578fe", // Dark Blue
    },
  },
  riskcategory: {
    label: "Risk Category",
    pctl: "riskpctl",
    colors: {
      Lowest: "#e6e1f0", // Light Purple
      Low: "#c9b2d3", // Medium Light Purple
      Moderate: "#ac84c6", // Medium Purple
      High: "#8f57b5", // Medium Dark Purple
      Highest: "#7326a0", // Dark Purple
    },
  },
  driverscategory: {
    label: "Drivers Category",
    pctl: "driverspctl",
    colors: {
      Lowest: "#fff2cc", // Light Yellow
      Low: "#ffe599", // Medium Light Yellow
      Moderate: "#ffd966", // Medium Yellow
      High: "#ffc733", // Medium Dark Yellow
      Highest: "#ffbb00", // Dark Yellow
    },
  },
  systemcategory: {
    label: "System Category",
    pctl: "systempctl",
    colors: {
      Lowest: "#f4cccc", // Light Red
      Low: "#ea9999", // Medium Light Red
      Moderate: "#e06666", // Medium Red
      High: "#cc0000", // Medium Dark Red
      Highest: "#990000", // Dark Red
    },
  },
};
