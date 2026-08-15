import type Movie from '../modules/movie.model'
import DisplayMovie from './DisplayMovie'
import styles from '../components/MoviesList.module.css'
import GenericList from '../../../components/GenericList'

export default function MovieList(props: MovieListProps) {
    
    return (
        <GenericList list={props.movies}
        emptyUI={<h1>THIS EMPTY!!!!!!!!!</h1>}>
            <div className={styles.div }>
                {props.movies?.map((movie) => <DisplayMovie key={movie.id} movie={movie} />)}
            </div>
        </GenericList>
    )
    
}

interface MovieListProps {
    movies?: Movie[]
}