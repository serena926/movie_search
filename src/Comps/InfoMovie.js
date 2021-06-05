import React from 'react';
import { Card } from 'react-bootstrap';

function Movies(props) {
    return(
        <div>
            {props.movies.map(movie => {
                return(
                <Card style={{ width: '30rem' }}>
                    <Card.Img variant="top" src = {movie.Poster} />
                    <Card.Body>
                       {/* <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>
                            {movie.Year}
                       </Card.Text>*/}
                       <p>
                            <a href = " # " > 
                            Click to see movie info 
                            </a>
                       </p>
                    </Card.Body>
                </Card>
                )
            })}
        </div>
    )
}

export default Movies;