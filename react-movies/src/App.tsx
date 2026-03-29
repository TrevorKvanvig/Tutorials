import './App.css'
import type Movie from './features/movies/models/movie.model'
import MovieList from './features/movies/components/MovieList'
import { useEffect, useState } from 'react'
import Button from './components/Button'
import Menu from './features/home/components/Menu'
function App() {
  const wildRobotPoster = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPLFUb5bY1KEe2Dl08gjQ7yVS4Cb9d54t6zRKupLQcm5VNg_3V'
  const sinnersPoster = 'https://a.ltrbxd.com/resized/film-poster/1/1/1/6/6/0/0/1116600-sinners-2025-0-230-0-345-crop.jpg?v=5996b7d555'
  const oddesyPoster = 'https://m.media-amazon.com/images/M/MV5BN2MyYjk2MWMtODMyZS00MDUyLWE0OGQtOTQ3MGY0MDE0ZjVmXkEyXkFqcGc@._V1_.jpg'
  const spidermanPoster = 'https://cdn.marvel.com/content/2x/spidermanbrandnewday_lob_crd_01.jpg'
  
  const [movies, setMovies] = useState<AppState>({})
  
  useEffect(() => {
    const inTheaters: Movie [] = [
    {
      id: 1,
      title: "Sinners",
      poster: sinnersPoster
    },
    {
      id: 2,
      title: "Wild Robot",
      poster: wildRobotPoster
    },
  ]

  const upcomingReleases: Movie [] = [
    {
      id: 3,
      title: "Oddesy",
      poster: oddesyPoster
    },
    {
      id: 4,
      title: "Spider-Man: Brand New Day",
      poster: spidermanPoster
    }
  ]
    setTimeout(() => {
      setMovies({inTheaters, upcomingReleases})
    }, 200)
  }, [])
  

  return (
    <>
    <Menu/>
    <div className='container'>
      <Button>Test</Button>
      <h3>In Theaters</h3>
      <MovieList movies={movies.inTheaters}/>
      <h3>Upcoming Releases</h3>
      <MovieList movies={movies.upcomingReleases}/>
    </div>
    </>
  )
}

interface AppState {
  inTheaters?:Movie[]
  upcomingReleases?:Movie[]
}

export default App
