import React from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'react-bootstrap';

function SpecMovie(props) {  //card on each movie
    return (
        <Card style={{ width: '30rem' }}>
                <Card.Img variant= "top" src = {props.poster} />
                <Card.Body>
                <p> {props.movie_title}</p>
                <button onClick = {() => props.open(props.spec_id)}> See More </button>
        </Card.Body>
        </Card>
    )
}

export default SpecMovie;