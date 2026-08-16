import { Routes, Route } from "react-router";
import IndexGenres from "./features/genres/components/IndexGenres";
import LandingPage from "./features/home/components/LandingPage";
import CreateGenre from "./features/genres/components/CreateGenre";
import EditGenre from "./features/genres/components/EditGenre";
import FilterMovies from "./features/movies/components/FilterMovies";
import MovieDetails from "./features/movies/components/MovieDetail";
import CreateMovie from "./features/movies/components/CreateMovie";
import EditMovie from "./features/movies/components/EditMovie";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/genres" element={<IndexGenres />} />
      <Route path="/genres/create" element={<CreateGenre />} />
      <Route path="/genres/edit" element={<EditGenre />} />
      <Route path="/genres/edit" element={<EditGenre />} />
      
      
      <Route path="/movies/filter" element={<FilterMovies />} />
      <Route path="/movie" element={<MovieDetails />} />
      <Route path="/movies/create" element={<CreateMovie />} />
      <Route path="/moivies/edit" element={<EditMovie />} />


    </Routes>
  );
}
