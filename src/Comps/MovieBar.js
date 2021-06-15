import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './MovieBar.css';
import InfoMovie from './InfoMovie';
import AllMovies from './AllMovies';

function MovieBar() {
let [submittedSearch, setSearch] = useState("");
let [listMovies, setList] = useState([]);
let [current_page, set_current_page] = useState(1);
let [showMovies, setShowMovies] = useState(false);
let [counter, setCounter] = useState(0);
let [check, setCheck] = useState(0);
let [validCheck, setValidCheck] = useState(false);
let[length, setLength] = useState(0);
let [movie_spec, setMovie_spec] = useState("");
const e = new Event('build');

function afterButtonClick(e) { //getting info from the API 
    e.preventDefault();
    async function retrieve() {
       let encode = encodeURIComponent(submittedSearch);
       let getBack =  await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${encode}&r=json&page=${current_page}&type=movie`);
       getBack = await getBack.json();
       if(getBack.Response == "False") {
           setValidCheck(true);
       }
       setList(getBack.Search); //setting listMovies to array of 10 elements returned
       if(getBack.Search != undefined) {
       setLength(getBack.Search.length);
       } else {
           setLength(0);
       }

    }
    retrieve();
    setCounter(0);
    setShowMovies(true);
    setCheck(check + 1);
} 

const nextPage = () => { //to get to the next page (incrementing current_page)
    if(listMovies) {
        set_current_page(current_page => current_page + 1);
        setCounter(1);
    }
}

const previousPage = () => { //to get to the previous page (decrementing current_page)
    if(listMovies) {
        set_current_page(current_page - 1);
        setCounter(1);
        setCheck(check - 2);
    }
}

const resetPage = () => { //resetting page number to 1, once a new search has been made 
    set_current_page(1);
    setCheck(0);
    setValidCheck(false);
    setMovie_spec(null);
}

if(counter > 0) { 
    afterButtonClick(e); //in order to get 10 movies per page when next or previous are clicked
} 

const open = (passed_in) => {
    let temp = "";
    let num = 0;
    listMovies.forEach(holder => {
        if(passed_in == holder.imdbID) {
            temp = holder;
            num++;
        }
    })
    setMovie_spec(temp);  
    setShowMovies(false);
  }

  const returnToMoviePage = () => {
    setMovie_spec(null);
    setShowMovies(true);
  }

return (
        <div className = "MovieBar">
            {<form onSubmit = {afterButtonClick}>
                <input required
                    placeholder = "Type a movie title here"
                    value = {submittedSearch} 
                    type = "text"
                    onChange = { 
                        e => setSearch(e.target.value) 
                        }/>
               <button onClick ={resetPage} > Submit </button> {/*resetting page number once submit is pressed again */}
            </form>}
            {validCheck ? "No such movie found! (Please check spelling or delete any unnecessary spaces)" : ""} {/*Response returned false (input movie not found*/}
            {showMovies && !validCheck ? <AllMovies movies={listMovies} open={open} check = {check}> </AllMovies> : ""}
            {!showMovies && movie_spec != null ? <InfoMovie returnToMoviePage={returnToMoviePage} movie_spec = {movie_spec} check = {check}> </InfoMovie> : ""}
            {!validCheck && check && (current_page != 1) && movie_spec == null? 
            <button onClick = {previousPage} > Previous Page </button> : ""} {/*No previous button if first page of movies*/}
            {!validCheck && check && (length == 10) && movie_spec == null ? <button onClick={nextPage} > Next Page </button> : ""}
        </div>
        )
}

export default MovieBar;