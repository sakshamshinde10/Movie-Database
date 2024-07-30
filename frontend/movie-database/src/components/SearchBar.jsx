import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="border border-gray-300 p-2 rounded-l-lg flex-grow text-black" // Added text-black class
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
