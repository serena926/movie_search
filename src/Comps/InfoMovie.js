import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'react-bootstrap';

function InfoMovie(props) { //getting info on each movie depending on id
    let[title, setTitle] = useState("");
    let [released, setReleased] = useState("");
    let [runtime, setRuntime] = useState("");
    let [genre, setGenre] = useState("");
    let [director, setDirector] = useState("");
    let [actors, setActors] = useState("");
    let [language, setLanguage] = useState("");
    let [rated, setRated] = useState("");
    let [imdbRating, setIMDBRating] = useState("");
    let [plot, setPlot] = useState("");
    let [checkID, setID] = useState("");

    async function retrieve() {
        let response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${props.movie_spec.imdbID}&type=movie`);
        response = await response.json();
        setTitle(response.Title);
        setReleased(response.Released);
        setRuntime(response.Runtime);
        setGenre(response.Genre);
        setDirector(response.Director);
        setActors(response.Actors);
        setLanguage(response.Language);
        setRated(response.Rated);
        setIMDBRating(response.imdbRating);
        setID(response.imdbID);
        setPlot(response.Plot);
        }
        retrieve();

        return(
            <Card style={{ width: '30rem' }}>
                {props.check ? 
                <Card.Img variant= "top" src = {props.movie_spec.Poster} /> : ""}
                {props.check ? 
                <Card.Body>
                <button onClick = {props.returnToMoviePage}> Return to Movie Page 
                </button>
                <div class = "more_info" >
                      <p>Title: {title} </p>
                      <p>Release Date: {released}</p>
                      <p>Runtime: {runtime}</p>
                      <p>Genre: {genre}</p>
                      <p>Director: {director}</p>
                      <p>Actors: {actors}</p>
                      <p>Language: {language}</p>
                      <p>Rated: {rated}</p>
                      <p>IMDb Rating: {imdbRating}</p>
                      <p>Plot: {plot}</p>
                </div> 
                </Card.Body>
                : ""}
            </Card>
         )
}

export default InfoMovie;
