import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './MovieBar.css';
import Movies from './InfoMovie';

function MovieBar() {
let [submittedSearch, setSearch] = useState("");
let [listMovies, setList] = useState([]);
let [current_page, set_current_page] = useState(1);
let [showMovies, setShowMovies] = useState(false);
let [counter, setCounter] = useState(0);
let [check, setCheck] = useState(0);
let [validCheck, setValidCheck] = useState(false);
const e = new Event('build');



function afterButtonClick(e) {
    e.preventDefault();
    async function retrieve() {
       let encode = encodeURIComponent(submittedSearch);
       let getBack =  await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${encode}&r=json&page=${current_page}`);
       getBack = await getBack.json();

       if(getBack.Response == "False") {
           setValidCheck(true);
       }

       setList(getBack.Search);

    }
    retrieve();

    setCounter(0);
    setShowMovies(true);
    setCheck(check + 1);
    
} 

const nextPage = () => {
    if(listMovies) {
        set_current_page(current_page => current_page + 1);
        setCounter(1);
    }
}

const previousPage = () => {
    if(listMovies) {
        set_current_page(current_page - 1);
        setCounter(1);
        setCheck(check - 2);
    }
}

const resetPage = () => {
    set_current_page(1);
    setCheck(0);
    setValidCheck(false);

}

if(counter > 0) {
    afterButtonClick(e);
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
               <button onClick ={resetPage} > Submit </button>
            </form>}
            {validCheck ? "No such movie found!" : ""}
            {showMovies && !validCheck ? <Movies movies={listMovies}> </Movies> : ""}
            {!validCheck && check && (current_page != 1) ? <button onClick = {previousPage} > Previous Page </button> : ""}
            {!validCheck && check ? <button onClick={nextPage} > Next Page </button> : ""}
        </div>
        )
}

export default MovieBar;