import React from 'react'

function SearchBar ({handleInput, search}){
    return(
        <section className ="searchbox-wrap">
            <input type="text" placeholder="Search For Movies" className="searchbox" onChange={handleInput} onKeyPress={search}/>
        </section>
    )
}
export default SearchBar