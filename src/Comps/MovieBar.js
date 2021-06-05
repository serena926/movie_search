import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './MovieBar.css';
import Movies from './InfoMovie';

function MovieBar() {
let [allMovies, setAllMovies] = useState(0); //number of all movies
let [specificPage, setPage] = useState(1); //what page we are on
let [submittedSearch, setSearch] = useState("");
let [listMovies, setList] = useState([]);
let [showMovies, setShowMovies] = useState(false);

function afterButtonClick(e) {
    e.preventDefault();
    async function retrieve() {
       let encode = encodeURIComponent(submittedSearch);
       let getBack = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${encode}&r=json`);
       getBack = await getBack.json();
       setList(getBack.Search);
    }

    retrieve();
    setAllMovies(listMovies.length);
    setShowMovies(true);
    setSearch("");
}

function diffPages(numPage) {
    async function retrieve() {
        let encode = encodeURIComponent(submittedSearch);
        let getBack = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${encode}&spec_page=${numPage}&r=json`);
        getBack = await getBack.json();
        setList(getBack.Search);
     }
     retrieve();
     setPage(numPage);
}

return (
        <div className = "MovieBar">
            <form onSubmit = {afterButtonClick}>
                <input 
                    placeholder = "Type a movie title here"
                    value = {submittedSearch} 
                    type = "text"
                    onChange = { e => setSearch(e.target.value) }/>
                <button className = "search"> Submit </button>
            </form>
            {showMovies ? <Movies movies={listMovies}> </Movies> : <> </>}
        </div>
        )
}

export default MovieBar;