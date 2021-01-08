import React from 'react'
import MovieResults from './MovieResults'

function Results ({results, openPopup, UpdateMovieList}){
    if(results == null){
        return(
            <h1 id = "noresults">
                No Results
            </h1>
        )
    }
    else{
    return(
        <section className ="results">
            {results.map(movieresults => (
                <MovieResults key={movieresults.imdbID} movieresults={movieresults} openPopup={openPopup} UpdateMovieList={UpdateMovieList}/>
            ))}
        </section>
    )
            }
}
export default Results