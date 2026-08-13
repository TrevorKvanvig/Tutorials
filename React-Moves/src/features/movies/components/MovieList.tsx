import type Movie from '../modules/movie.model'
import DisplayMovie from './DisplayMovie'
import styles from '../components/MoviesList.module.css'

export default function MovieList(props: MovieListProps) {
    
    if (props.movies == null) {
        return (
        <p>Loading...</p>
    )
    } else if (props.movies.length === 0) {
        return (
        <p>No Movies to Display</p>
    )
    }
    else {
        return (
        <div className={styles.div }>
            {props.movies.map((movie) => <DisplayMovie key={movie.id} movie={movie} />)}
        </div>
    )
    }
    
}

interface MovieListProps {
    movies?: Movie[]
}