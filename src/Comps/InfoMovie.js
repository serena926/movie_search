import React from 'react';
import { Card } from 'react-bootstrap';

function Movies(props) {
    return(
        <div>
            {props.movies ? props.movies.map(movie => { /*going through movies and creating cards and creating a hover area with 
            movie details on each card*/
                return(
                <Card style={{ width: '30rem' }}>
                    <Card.Img variant= "top" src = {movie.Poster} />
                    <Card.Body>
                      <div id = "parent"> Hover here for more details! 
                      <div id = "hover_area">
                           <p>Title: {movie.Title} </p> 
                           <p> Released: {movie.Year} </p>
                           <p>Movie ID: {movie.imdbID} </p>
                          <p> Link to Poster: {movie.Poster} </p> 
                      </div>
                    </div>
                    </Card.Body>
                </Card>
                )
            })
            : null
            }   
        </div>
    ) 

}

export default Movies;