import React from "react";

type LegendProps = {
  attributeMapping: {
    [key: string]: {
      label: string;
      colors: Record<string, string>;
    };
  };
  selectedAttribute: string;
};

const Legend = ({ attributeMapping, selectedAttribute }: LegendProps) => {
  const categories = Object.entries(
    attributeMapping[selectedAttribute].colors
  ).map(([category, color]) => ({
    category,
    color,
  }));

  return (
    <div className="mt-2 p-4 bg-white text-black shadow-md rounded-md">
      <h4 className="font-bold mb-2">
        {attributeMapping[selectedAttribute].label}
      </h4>
      {categories.map(({ category, color }) => (
        <div key={category} className="flex items-center mb-1">
          <span
            className="block w-4 h-4 mr-2"
            style={{ backgroundColor: color }}
          ></span>
          <span className="text-black">{category}</span>
        </div>
      ))}
      <div className="flex items-center mb-1">
        <span
          className="block w-4 h-4 mr-2"
          style={{ backgroundColor: "#ccc" }}
        ></span>
        <span className="text-black">No data</span>
      </div>
    </div>
  );
};

export default Legend;
