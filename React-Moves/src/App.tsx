import MoviesList from "./features/movies/components/MoviesList";

function App() {
  const movies = [
    {
      id: 1,
      title: "The Matrix",
      poster: "https://i.redd.it/53b7y66oenqc1.jpeg",
    },
    {
      id: 2,
      title: "The Matrix",
      poster: "https://i.redd.it/53b7y66oenqc1.jpeg",
    },
    {
      id: 3,
      title: "The Matrix",
      poster: "https://i.redd.it/53b7y66oenqc1.jpeg",
    },
  ];

  const upcomingReleases = [
    {
      id: 1,
      title: "upcomingReleases",
      poster: "https://i.redd.it/53b7y66oenqc1.jpeg",
    },
    {
      id: 2,
      title: "upcomingReleases",
      poster: "https://i.redd.it/53b7y66oenqc1.jpeg",
    },
    {
      id: 3,
      title: "upcomingReleases",
      poster: "https://i.redd.it/53b7y66oenqc1.jpeg",
    },
  ];

  return (
    <>
      <h3>In Theaters</h3>
      <MoviesList movies={movies} />
      <h3>Upcoming Releases</h3>
      <MoviesList movies={upcomingReleases} />
    </>
  );
}

export default App;
