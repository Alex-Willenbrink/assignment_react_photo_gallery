import React from "react";

const DropDownFilter = ({filterArray, onChange}) => {
  return (
    <select onChange={onChange}>
      {filterArray.map(filter => <option value={filter.value} key={filter.value}>
        {filter.text}
      </option>)}
    </select>
  );
};

export default DropDownFilter;
