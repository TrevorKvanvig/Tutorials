import type Movie from "../modules/movie.model"
import styles from "../components/DisplayMovie.module.css"
export default function DisplayMovie({movie}: DisplayMovieProps) {
    const buildLink = () => `/movie/${movie.id}`
    return (
        <div className={styles.div}>
            <a href={buildLink()}>
                <img src={movie.poster}/>
            </a>
            <a href={buildLink()}>
                <h3>{movie.title}</h3>
            </a>
        </div>
    )
}

interface DisplayMovieProps {
    movie: Movie;
}