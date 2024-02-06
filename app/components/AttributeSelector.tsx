import React from "react";

type AttributeSelectorProps = {
  selectedAttribute: string;
  onChange: (newAttribute: string) => void;
};

const AttributeSelector: React.FC<AttributeSelectorProps> = ({
  selectedAttribute,
  onChange,
}) => {
  return (
    <select
      value={selectedAttribute}
      onChange={(e) => onChange(e.target.value)}
      className="z-20 bg-white text-black opacity-90 hover:opacity-100 focus:opacity-100 p-2 rounded-md border-none shadow-lg"
      style={{ fontSize: "1rem", cursor: "pointer" }}
    >
      <option value="jenicategory">JENI Category</option>
      <option value="riskcategory">Risk Category</option>
      <option value="driverscategory">Drivers Category</option>
      <option value="systemcategory">System Category</option>
    </select>
  );
};

export default AttributeSelector;
