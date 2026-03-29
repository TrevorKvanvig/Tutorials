import GenericList from "../../../components/GenericList"
import type Movie from "../models/movie.model"
import DisplayMovie from "./DisplayMovie"
import styles from "./MovieList.module.css"
interface MovieListProps {
    movies?: Movie[]
}

export default function MovieList({ movies }: MovieListProps) {
    return (
        <GenericList list={movies} 
        emptyUI={'No Movies in List'}>
            <div className={styles.div}>
                {movies?.map(currentMovie => <DisplayMovie
                    key={currentMovie.id}
                    movie={currentMovie}
                />)}
            </div>
        </GenericList>
    )
}