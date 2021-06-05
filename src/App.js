import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import MovieBar from './Comps/MovieBar';
import Header from './Comps/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <MovieBar />
    </div>
  );
}

export default App;
