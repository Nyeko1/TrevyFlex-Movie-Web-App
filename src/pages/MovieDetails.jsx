import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/Api.js";
import { p, span } from "framer-motion/client";
import { useParams } from "react-router-dom";
import DescriptionSection from "../sections/DescriptionSection.jsx";

const MovieDetails = () => {
  const API_KEY = "c7c9edac642ecf701f26582aec880cd0";
  const BASE_URL = "https://api.themoviedb.org/3";
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const [genres, setGenres] = useState([]);
  const [productionCompanies, setProdductionCompanies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  // Fetch-Movie-Details
  useEffect(() => {
    async function FetchMovieDetails() {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovie(data);
        setGenres(data.genres);
        setProdductionCompanies(data.production_companies);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    }

    FetchMovieDetails();
  }, [id]);

  // fetch Trailer
  useEffect(() => {
    async function fetchTrailer() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
        );
        const data = await res.json();
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    }

    fetchTrailer();
  }, [id]);

  if (!movie) {
    return <p className="text-center mt-4">Loading movie details...</p>;
  }

  return (
    
    <div>
      {/* Title displaying the path of the movie */}
      <div className="h-6 flex bg-black text-white">
        <p className="flex items-center ml-5 text-[12px] sm:text-sm space-x-1 py-3">
          <span>Home</span>
          <span className="text-3xl relative bottom-[7px]">.</span>
          <span>MovieDetails</span>
          <span className="text-3xl relative bottom-[7px]">.</span>
          <span>{movie.title}</span>
        </p>
      </div>
      
      {/* Movie details section + movie player */}
      <div className="flex flex-col-reverse sm:flex-row lg:flex-row">
        {/* Movie-details-view-section */}
        <div className="bg-black text-white flex flex-col items-center p-4 w-full sm:w-[20%] min-h-[400px] space-y-4">
          {/* image */}
          <div className="w-[180px] h-[250px] flex justify-center mt-5 items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* title */}
          <div className="text-center">
            <h1 className="font-bold text-lg sm:text-xl">{movie.title}</h1>
          </div>

          {/* description */}
          <div className="text-sm text-center px-2 relative">
            <DescriptionSection overview={movie.overview} />
          </div>

          {/* More Movie Information */}
          <div className="space-x-1">
            {/* Genres */}
            <span className="text-[12px] font-bold">Genres:</span>
            {genres.map((genre, index) => (
              <span className="text-[12px] text-gray-400" key={genre.id}>
                {genre.name}
                {index < genres.length - 1 && ","}
              </span>
            ))}
            <br />
            
            {/* Production Companies */}
            <span className="text-[12px] font-bold">
              Production Companies:{" "}
            </span>
            {productionCompanies.map((company, index) => (
              <span className="text-[12px] text-gray-400" key={company.id}>
                {company.name}
                {index < productionCompanies.length - 1 && ","}
              </span>
            ))}
            <br />
            
            {/* origin-Country */}
            <span className="text-[12px] font-bold">Country:</span>{" "}
            <span className="text-[12px] text-gray-400">
              {movie.origin_country}
            </span>
            <br />
            
            {/* Language */}
            <span className="text-[12px] font-bold">Language:</span>{" "}
            <span className="text-[12px] text-gray-400">
              {movie.original_language}
            </span>
          </div>
        </div>

        {/* Movie-Play-Section */}
        <div className="w-[100%] sm:w-[80%] ">
          <div className="w-full h-full overflow-hidden">
            {trailerKey ? (
              <div className="relative w-full h-110 pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-white p-4">Trailer not available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;