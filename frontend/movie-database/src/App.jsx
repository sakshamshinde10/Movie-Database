import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/movies/popular')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    setLoading(true);
    fetch(`http://localhost:5000/api/movies/search?query=${query}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 text-white py-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-center">Movie Database</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <Loader />
        ) : (
          <>
            {searchResults.length > 0 && (
              <>
                <h2 className="text-3xl font-semibold mb-6 mt-6">Search Results</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {searchResults.map(movie => (
                    <li key={movie.id} className="bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 overflow-hidden">
                      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-72 object-cover" />
                      <div className="p-4">
                        <h2 className="text-xl font-bold">{movie.title}</h2>
                        <p className="text-gray-400">Release Date: {movie.release_date}</p>
                        <p className="text-gray-400">Rating: {movie.vote_average}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <h2 className="text-3xl font-semibold mb-6 mt-6">Popular Movies</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {movies.map(movie => (
                <li key={movie.id} className="bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 overflow-hidden">
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-72 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{movie.title}</h2>
                    <p className="text-gray-400">Release Date: {movie.release_date}</p>
                    <p className="text-gray-400">Rating: {movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
