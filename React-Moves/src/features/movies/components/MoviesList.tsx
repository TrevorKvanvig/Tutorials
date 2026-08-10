import type Movie from "../models/movie.model"
import DisplayMovie from "../components/DisplayMovie"
import styles from "../components/MoviesList.module.css"
export default function MoviesList(props: MoviesListProps) {
    return (
        <div className = {styles.div}>
            {props.movies.map(movie => <DisplayMovie key={movie.id} movie={movie}/>)}
        </div>
    )

}

interface MoviesListProps {
    movies: Movie[];
}