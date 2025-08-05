const API_KEY = "c7c9edac642ecf701f26582aec880cd0";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () =>
 {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if(!response.ok) throw error("Failed to load fetch movies");
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};



