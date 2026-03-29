import type Movie from "../models/movie.model";
import styles from "./DisplayMovie.module.css"
interface DisplayMovieProps {
    movie: Movie
}

export default function DisplayMovie({movie}: DisplayMovieProps) {
    const buildLink = () => `/movie/${movie.id}`

    return (
        <div className={styles.div}>
            <a href={buildLink()}>
                <img src={movie.poster}/>
            </a>
            <p>
                <a href={buildLink()}>{movie.title}</a>
            </p>
        </div>
    )
}