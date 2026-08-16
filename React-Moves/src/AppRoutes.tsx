import { Routes, Route } from "react-router";
import IndexGenres from "./features/genres/components/IndexGenres";
import LandingPage from "./features/home/components/LandingPage";
import CreateGenre from "./features/genres/components/CreateGenre";
import EditGenre from "./features/genres/components/EditGenre";
import FilterMovies from "./features/movies/components/FilterMovies";
import MovieDetails from "./features/movies/components/MovieDetail";
import CreateMovie from "./features/movies/components/CreateMovie";
import EditMovie from "./features/movies/components/EditMovie";
import CreateActor from "./features/actors/components/CreateActor";
import EditActor from "./features/actors/components/EditActor";
import IndexTheaters from "./features/theaters/components/IndexTheaters";
import CreateTheater from "./features/theaters/components/createTheater";
import EditTheater from "./features/theaters/components/editTheater";
import IndexActors from "./features/actors/components/IndexActors";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Genres Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/genres" element={<IndexGenres />} />
      <Route path="/genres/create" element={<CreateGenre />} />
      <Route path="/genres/edit" element={<EditGenre />} />
      <Route path="/genres/edit" element={<EditGenre />} />
      
      
      {/* Movies Routes */}
      <Route path="/movies/filter" element={<FilterMovies />} />
      <Route path="/movie" element={<MovieDetails />} />
      <Route path="/movies/create" element={<CreateMovie />} />
      <Route path="/movies/edit" element={<EditMovie />} />
      
      {/* Actor Routes */}
      <Route path="/actors" element={<IndexActors />} />
      <Route path="/actors/create" element={<CreateActor />} />
      <Route path="/actors/edit" element={<EditActor />} />

      {/* Theater Routes */}
      <Route path="/theaters" element={<IndexTheaters />} />
      <Route path="/theaters/create" element={<CreateTheater />} />
      <Route path="/theaters/edit" element={<EditTheater />} />

    </Routes>
  );
}
