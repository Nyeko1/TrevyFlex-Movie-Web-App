import { PlayIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useState } from "react";

const MovieCard = ({ item }) => {
  // track if the image poster has loaded
  const [imgLoaded, setImgLoaded] = useState(false);
  // Direct TMDB URL or empty string
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "";

  // A generic placeholder
  const placeholder = "https://via.placeholder.com/200x300.svg?text=No+Image";

  return (
    <div
      className=" group flex flex-col overflow-hidden bg-[#cae4f9] justify-items-center rounded-xl"
      key={item.id}
    >
      {/* image poster */}
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <Link
          to={`/MovieDetails/${item.id}`}
          className="absolute inset-0 z-10"
        ></Link>

        {/*skeleton placeholder */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
        )}

        {/* Real Image */}
        <img
          src={posterUrl || placeholder}
          alt={item.title}
          className={`object-cover w-full h-full transition-opacity duration-200
            ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            // swap broken URL to the placeholder
            e.currentTarget.onerror = null; // prevent loops
            e.currentTarget.src = placeholder;
          }}
        />

        {/* play-icon ovelay */}
        <div
          className="absolute inset-0 flex items-center justify-center 
                     bg-[#08080893] bg-opacity-20 opacity-0 transition-opacity 
                     duration-200 group-hover:opacity-100"
        >
          <PlayIcon className="h-12 w-12 text-white" />
        </div>
      </div>
      {/* MovieInfor */}
      <div className="flex flex-col text-center mt-1">
        <h1 className="text-sm line-clamp-2">{item.title}</h1>
        <p>{item.release_date.split("-")[0]}</p>
      </div>
    </div>
  );
};

export default MovieCard;
