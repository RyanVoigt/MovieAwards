 /* eslint-disable */ 

import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import Popup from './components/Popup';
import Submitted from './components/Submitted'
import Intro from './components/Intro'

import grinchaudio from './Assets/I_Nominate_The_Grinch.mp3'
import ironaudio from './Assets/built_in_a_cave.mp3'
import lotraudio from './Assets/theyre-taking-the-hobbits.mp3'

import { DndProvider } from 'react-dnd'
import { Container } from './components/CardContainer'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Variables for tracking movie list a positioning state
let reloadedWith5 = false;
let showIntro = true;
let moviesLeftCount = 5;
let item = [
  {
    index: 0,
    id: 1,
    text: '',
  },
  {
    index: 0,
    id: 2,
    text: '',
  },
  {
    index: 0,
    id: 3,
    text: '',
  },
  {
  index: 0,
  id: 4,
  text: '',
  },
  {
  index: 0,
  id: 5,
  text: '',
  },
];
let boolitem =[false, false, false, false, false];
let firstTrigger = 0;

//Find out if you have ranked 5 movies or not, and output movies left to rank
function moviesLeft(a){
  var count = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i].text != '') {
      count = count +1;
    }
  } 
  return (5 - count);
}
//Stops you from adding a the same movie to your list
function containsTwice(a, obj) {
  var count = 0;
  for (var i = 0; i < a.length; i++) {
      if (a[i].text === obj) {
          count = count +1;
          console.log(count);
      }
  }
  console.log(count);
  if(count > 0){
      return true;
  }
  return false;
}
function App() {
  // Page States
  const [state, setState] = useState({
    s: "",
    fiveItems: false,
    showSubmitted: false,
    results: [],
    selected: {},
    submitted: [],
    listCards: [],
  });

  const apiurl = "https://www.omdbapi.com/?apikey=9e9bc420";
// Used to manage cache data checks to see if you've ranked movies in the past and also the popup checkbox
  if(firstTrigger == 0){
    if(localStorage.getItem("checked") != null){
      showIntro = false;
    }
    if (localStorage.getItem("item") === null || localStorage.getItem("boolitem") === null){
      localStorage.setItem("boolitem", JSON.stringify(boolitem));
      localStorage.setItem("item", JSON.stringify(item));
    }
    else{
      item = JSON.parse(localStorage.getItem("item") || "[]");
      boolitem = JSON.parse(localStorage.getItem("boolitem") || "[]");
      moviesLeftCount = moviesLeft(item)
        reloadedWith5 = false;

      if(moviesLeftCount == 0){
        reloadedWith5 = true;
        state.showSubmitted = true;
        state.fiveItems = true;
        state.results = item;
        setState(prevState =>{
          return { ...prevState}
        });
      }
    }
    firstTrigger = 1;
  }
// Updates index of card to track position for final display screen
const UpdateIndex = (id, index)=>{
  for (var i = 0; i < item.length; i++) {
    if (item[i].id == id) {
        item[i].index = index;
    }
  }
  localStorage.setItem("boolitem", JSON.stringify(boolitem));
  localStorage.setItem("item", JSON.stringify(item));
}

// Closes initial popup
const closeIntro = (clicked) =>{
  if(clicked == true){
    localStorage.setItem("checked", JSON.stringify(true));
  }
  showIntro = false;
  setState(prevState =>{
    return { ...prevState}
  });
}
//Updates page to show new movies, and also plays audio for secret movies
const UpdateMovieList = (imgID)=>{
    if(containsTwice(item, imgID)){
    }
    else {
      if(imgID === "https://m.media-amazon.com/images/M/MV5BNWNiNTczNzEtMjQyZC00MjFmLTkzMDMtODk4ZGMyZmE0N2E4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"){
        console.log("grinch");
        let sound = new Audio(grinchaudio)
        sound.play();
      }
      else if (imgID === "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"){
        console.log("iron");
        let sound = new Audio(ironaudio)
        sound.play();
      }
      else if (imgID === "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"){
        console.log("LOTR");
        let sound = new Audio(lotraudio)
        sound.play();
      }
       
    for(var i = 0; i<5; i++){
      let fiveItems = false
      localStorage.setItem("boolitem", JSON.stringify(boolitem));
      if(boolitem[i] == false){
        item[i].text = imgID;
        boolitem[i] = true;
        if(i == 4){
          fiveItems = true
        }
        i = 6;
        localStorage.setItem("boolitem", JSON.stringify(boolitem));
        localStorage.setItem("item", JSON.stringify(item));
        moviesLeftCount = moviesLeft(item);
        if(moviesLeftCount == 0){
          fiveItems = true;
        }
        localStorage.setItem("boolitem", JSON.stringify(boolitem));
        setState(prevState =>{
          return { ...prevState, selected: {}, fiveItems: fiveItems}
      });
    };
    }
  }
  }
// manages the search button
const search = (e) => {
  if (e.key === "Enter"){
    axios(apiurl + "&s=" + state.s).then(({data}) => {
      let results = data.Search;
        setState(prevState =>{
          return { ...prevState, results: results}
      });
    })
  }
}
//Opens the intial popup
const openPopup = id => {
  axios(apiurl + "&i=" +id).then(({data}) => {
    let result = data;
    setState(prevState => {
      return {...prevState, selected: result}
    });
  });
}
//Opens final view when you subimt your movies
const openSubmitted = id => {
    let result = item;
    let count = 0;
    let showSubmitted = false;
    for(let i = 0; i < 5; i++){
      if(item[i].text != ''){
        count = count + 1;
      }
    }
    if(count == 5){
      showSubmitted = true;
      reloadedWith5 = true;
    }
    setState(prevState => {
      return {...prevState, submitted: result, showSubmitted: showSubmitted}
    });
}
//Closes initial popup
const closePopup = () => {
  setState(prevState => {
    return {...prevState, selected: {} }
  });
}
//Manages updates for card positioning
const handleCardUpdate = (id) => {
  boolitem[id-1] = false;
  let fiveItems = false;
  reloadedWith5 = false;
  moviesLeftCount = moviesLeft(item);
  localStorage.setItem("boolitem", JSON.stringify(boolitem));
  localStorage.setItem("item", JSON.stringify(item));
  setState(prevState => {
    return {...prevState, listCards: [], fiveItems: fiveItems}
  });
}
//handles search button
  const handleInput = (e) =>{
    let s = e.target.value;
    setState(prevState => {
      return { ...prevState, s: s}
    });
    console.log(state.s)
  }
  
  return (
    <div className="App">
      <meta name="viewport" content="width=1024"></meta>
      {showIntro && <Intro closeIntro = {closeIntro}/>}
      <header>
        <h1>Movie Awards</h1>
      </header>
      <div className="sidenav">
      <h4>Rankings</h4>
          <DndProvider  backend={HTML5Backend}>
              <Container  listCards = {state.listCards} movieList={item} handleCardUpdate={handleCardUpdate} UpdateIndex = {UpdateIndex}/>
            </DndProvider>
            {(!state.fiveItems && !reloadedWith5)  &&<div  id = "rankmore">Rank {moviesLeftCount} More</div>}
        {(state.fiveItems || reloadedWith5)  &&<div id="buttonSubmit" onClick = {()=>{openSubmitted()}}>
            <div disabled={!moviesLeftCount} id= "subButton" data-role="button">Submit</div>
        </div>}
      </div>
      <main>
          <SearchBar handleInput={handleInput} search = {search} />
          <Results results={state.results} openPopup={openPopup} UpdateMovieList={UpdateMovieList}/>
          {(typeof state.selected.Title != "undefined") ? <Popup selected ={state.selected} closePopup={closePopup}/> : false}
          {state.showSubmitted && <Submitted submitted ={state.submitted}/>}
      </main>
    </div>
  );
}

export default App;
