import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import NavBar from "./sections/NavBar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MovieDetails/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
