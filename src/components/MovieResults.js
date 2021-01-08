 /* eslint-disable */ 
import React from 'react'

function MovieResults ({movieresults, openPopup, UpdateMovieList}){
    console.log(movieresults);
    return(
        <div className ="movieresults" >
            <div id="wrapper">
            <div id="button" onClick={()=>{UpdateMovieList(movieresults.Poster)}}>
                <div id= "addButton" data-role="button">+</div>
            </div>
            <img id = "moviecover" src={movieresults.Poster} onClick={() => openPopup(movieresults.imdbID)}/>     
            <h3>{movieresults.Title} ({movieresults.Year})</h3> 
            <h3>{movieresults.imdbRating}</h3>  
            </div>
        </div>
    )
}
export default MovieResults