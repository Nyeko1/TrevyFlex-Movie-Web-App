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
        setloading(false);
      } catch (e) {
        setError(e.message || "Failed to Load Movies");
        console.log(e);
      } finally {
        setloading(false);
      }
    }
    FetchMovies();
  }, []);
  console.log(movies);

  // function to handle search
  async function handleSearch(e) {
    e.preventDefault();
    setQuery("");
    if (query.trim() === "") return;

    try {
      setloading(true);
      setError(null);
      const results = await searchMovies(query.trim());
      if (results.length === 0) {
        setMovies([]);
        setError(`No movies found for ${query}`);
      } else {
        setMovies(results);
        setloading(false);
      }
    } catch (e) {
      console.log(e);
      setError(e.message || "Failed to load movies");
    } finally {
      setloading(false);
    }
  }

  return (
    <section className="w-full flex flex-col items-center">
      {/* search Field */}
      <div className="mt-3 border-2 border-[#cae4f9] rounded-md bg-black text-white shadow-lg">
        <form onSubmit={handleSearch} className="px-2 py-2 space-x-3">
          <input
            type="text"
            placeholder="Enter a name"
            className="outline-none "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="
          bg-red-600 px-2 rounded"
          >
            Search
          </button>
        </form>
      </div>

      {/* Movie Grid container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4
                justify-items-center items-start
                py-4 px-4 mx-4 sm:mx-8 min-h-screen">
        {loading && <div className=" col-span-full text-center">Loading..</div>}
        {Error && (
          <div className="col-span-full text-red-500 text-center">{Error}</div>
        )}

        {/* AnimatePresence will fade cards in/out */}
        <AnimatePresence>
          {!loading && !Error && movies.length > 0
            ? // Displaying the movieCards
              movies.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                >
                  <MovieCard item={item} key={index} />
                </motion.div>
              ))
            : null}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MovieGrid;
