import type Movie from "../../movies/modules/movie.model";

export default interface LandingPageDTO {
    iconicMovies?: Movie[];
    newReleases?: Movie[];
}