import React, { useState } from "react";

const Filters = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");

  const toggleFilterPanel = () => setIsOpen(!isOpen);


  // Handling filter operation
  const applyFilters = () => {
    onFilter({ category, source, date });
  };

  return (
    <div className="mb-4 py-2">
      <button
        onClick={toggleFilterPanel}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {isOpen && (
        <div className="mt-4 p-4 border rounded shadow-md bg-white">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Filter Articles
          </h2>
          <div className="mb-4">
            <label className="block text-left mb-1 text-gray-600">
              Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
                <option value="politics">Politics</option>
                <option value="world">World</option>
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-left mb-1 text-gray-600">
              Source:
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-left mb-1 text-gray-600">
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={applyFilters}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
            >
              Apply Filters
            </button>
            <button
              onClick={toggleFilterPanel}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
