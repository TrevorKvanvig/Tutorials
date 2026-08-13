import { useEffect, useState } from "react";
import MovieList from "./features/movies/components/MovieList";
import type Movie from "./features/movies/modules/movie.model";
function App() {
  const [movies, setMovies] = useState<AppState>({});
  useEffect(() => {
    const iconicMovies: Movie[] = [
      {
        id: 1,
        title: "Jurrassic Park",
        poster:
          "https://img.buzzfeed.com/buzzfeed-static/static/2022-04/4/20/asset/0f12255e2129/sub-buzz-817-1649105149-10.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
      },
      {
        id: 2,
        title: "Back to the Future",
        poster:
          "https://imgc.allpostersimages.com/img/posters/back-to-the-future-1985-directed-by-robert-zemeckis_u-L-Q1H92330.jpg",
      },
    ];
    const newReleases: Movie[] = [
      {
        id: 1,
        title: "The Odyssey",
        poster:
          "https://cdn.displate.com/artwork/230x320/2026-01-08/b169fdab-a2a6-4dc3-b53f-a48f0ee36ce9.jpg",
      },
      {
        id: 1,
        title: "Spider-Man Brand New Day",
        poster:
          "https://cdn.displate.com/artwork/230x320/2026-06-10/3395c6b833df3f6bad30d06cb4cb132a_2b61f35aed2cba3b115940cee00c6629.jpg",
      },
    ];

    setTimeout(() => {
      setMovies({iconicMovies, newReleases})
    }, 1000)
  }, []);

  return (
    <>
      <h3>Iconic Movies</h3>
      <MovieList movies={movies.iconicMovies} />
      <h3>New Releases</h3>
      <MovieList movies={movies.newReleases} />
    </>
  );
}

interface AppState {
  iconicMovies?: Movie[];
  newReleases?: Movie[];
}
export default App;
