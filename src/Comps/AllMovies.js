import React from 'react';
import ReactDOM from 'react-dom';
import SpecMovie from './SpecMovie'

function AllMovies(props) { //going through all movies
    return (
    <div>
        {props.movies ? props.movies.map(movie => {
            return (
                <SpecMovie open = {props.open} spec_id = {movie.imdbID} poster = {movie.Poster} check = {props.check} movie_title = {movie.Title}>
                </SpecMovie>                  
            )
        })  
        : null       
        }
    </div>
    )
}

export default AllMovies;