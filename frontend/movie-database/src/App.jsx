import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies/popular')
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  const handleSearch = (query) => {
    fetch(`http://localhost:5000/api/movies/search?query=${query}`)
      .then(response => response.json())
      .then(data => setSearchResults(data));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Database</h1>
      <SearchBar onSearch={handleSearch} />
      <h2 className="text-xl font-bold mb-2">Search Results</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map(movie => (
          <li key={movie.id} className="border p-2 mb-2">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-auto" />
            <h2 className="text-xl">{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mb-2">Popular Movies</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map(movie => (
          <li key={movie.id} className="border p-2 mb-2">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-auto" />
            <h2 className="text-xl">{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
