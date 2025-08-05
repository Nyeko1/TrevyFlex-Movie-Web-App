import React from "react";
import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/Api";
import MovieCard from "../Components/MovieCard";
import { searchMovies } from "../services/Api";
import { motion, AnimatePresence } from "framer-motion";

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [Error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Fetching Movies
  useEffect(() => {
    async function FetchMovies() {
      try {
        setloading(true);
        setError(null);
        // Await promise for the actual data
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (e) {
        setError(e.message || "Failed to Load Movies");
        console.log(e);
      } finally {
        setloading(false);
      }
    }
    FetchMovies();
  }, []);

  // function to handle search
  async function handleSearch(e) {
    e.preventDefault();
    if (query.trim() === "") return;

    try {
      setloading(true);
      setError(null);
      const results = await searchMovies(query.trim());
      
      if (results.length === 0) {
        setMovies([]);
        setError(`No movies found for "${query}"`);
      } else {
        // Filter out movies without poster_path to reduce loading issues
        const validMovies = results.filter(movie => movie.poster_path);
        setMovies(validMovies);
        
        if (validMovies.length < results.length) {
          console.log(`Filtered out ${results.length - validMovies.length} movies without posters`);
        }
      }
    } catch (e) {
      console.log(e);
      setError(e.message || "Failed to load movies");
      setMovies([]); // Clear movies on error
    } finally {
      setloading(false);
      setQuery(""); // Clear search query after search
    }
  }

  // Reset to popular movies
  const resetToPopular = async () => {
    try {
      setloading(true);
      setError(null);
      setQuery("");
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (e) {
      setError(e.message || "Failed to Load Movies");
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center">
      {/* search Field */}
      <div className="mt-3 border-2 border-[#cae4f9] rounded-md bg-black text-white shadow-lg">
        <form onSubmit={handleSearch} className="px-2 py-2 space-x-3">
          <input
            type="text"
            placeholder="Search for a movie"
            className="outline-none bg-transparent text-white placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[hsl(214,17%,26%)] px-3 py-1 rounded hover:bg-[hsl(214,17%,30%)] transition-colors"
            disabled={loading}
          >
            {loading ? "..." : "Search"}
          </button>
          {movies.length > 0 && (
            <button
              type="button"
              onClick={resetToPopular}
              className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-500 transition-colors text-sm"
            >
              Popular
            </button>
          )}
        </form>
      </div>

      {/* Movie Grid container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4
                justify-items-center items-start
                py-4 px-4 mx-4 sm:mx-8 min-h-screen">
        {loading && (
          <div className="col-span-full text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
            Loading movies...
          </div>
        )}
        
        {Error && (
          <div className="col-span-full text-red-500 text-center bg-red-50 p-4 rounded-lg">
            <p>{Error}</p>
            <button 
              onClick={resetToPopular}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Back to Popular Movies
            </button>
          </div>
        )}

        {/* AnimatePresence will fade cards in/out */}
        <AnimatePresence>
          {!loading && !Error && movies.length > 0
            ? // Displaying the movieCards
              movies.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                >
                  <MovieCard item={item} />
                </motion.div>
              ))
            : null}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MovieGrid;