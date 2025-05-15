import React, { useState } from "react";

const FilterBar = () => {

    const [fillterData, setFillterData] = useState([]);

    const handleFilter = (e) => {
       
    }
  return (
    <div>
      <h1>Filter bar</h1>

      <div>
        <select onChange={handleFilter}>
          <option value='all'>All</option>
          <option value='active'>Active</option>
          <option value='completed'>Completed</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
