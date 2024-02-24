import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setSearchTerm } from "../redux/actions/Search.action";

const Search = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // This might be redundant if not wrapped in a form
    dispatch(setSearchTerm(searchInput));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="mx-auto relative">
      {/* Consider wrapping your input and button in a form element */}
      <div className="flex">
        {/* Dropdown and Input elements */}
        <input
          type="search"
          id="search-dropdown"
          className="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos, Design Templates..."
          required
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {/* Icon and SR-only text */}
        </button>
      </div>
    </div>
  );
}

export default Search;
