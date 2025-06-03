import React from 'react';

const Filters = ({ onFilterChange }) => {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filters">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>
      <div className="flex flex-col gap-2">
        <label>
          <span>Image Format:</span>
          <select name="format" onChange={handleFilterChange} className="border rounded p-1">
            <option value="all">All</option>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="gif">GIF</option>
          </select>
        </label>
        <label>
          <span>Color Filter:</span>
          <select name="color" onChange={handleFilterChange} className="border rounded p-1">
            <option value="all">All</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
        </label>
        <label>
          <span>Size:</span>
          <select name="size" onChange={handleFilterChange} className="border rounded p-1">
            <option value="all">All</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filters;