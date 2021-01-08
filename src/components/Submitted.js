 /* eslint-disable */ 
import React from 'react'
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
let itemranked = []
// Function for submitting the movies
function Submitted ({submitted}){
    localStorage.setItem("boolitem", JSON.stringify(boolitem));
    localStorage.setItem("item", JSON.stringify(item));
    for(let i = 1; i < 6; i++){
        for(let q = 0; q < 5; q++){
            if(i == submitted[q].index){
                itemranked[i] = submitted[q]
            }
        }
    }
    console.log(submitted);
    return(
        <section className ="popup">
            <h5>Your Nominations</h5>
            <h6>Congratulations! Your movies have been submitted to the Shoppie Awards!</h6>
            <div id="fontpersonal">Check out my personal website to see some of my other projects</div>
            <a id="website" href="https://ryanvoigt.github.io"> Personal Website</a>

            <div id = "movieWrapper">
            <div id ="finalMovieNum1">
                <h3>{itemranked[1].index}</h3>
                <img id = "finalMovie1" src={itemranked[1].text}/>
            </div> 
            <div id ="finalMovieNum2">
                <h3>{itemranked[2].index}</h3>
                <img id = "finalMovie2" src={itemranked[2].text}/>
            </div>
            <div id ="finalMovieNum3">  
                <h3>{itemranked[3].index} </h3>
                <img id = "finalMovie3" src={itemranked[3].text}/> 
            </div>  
            <div id ="finalMovieNum4">
                <h3>{itemranked[4].index}</h3>  
                <img id = "finalMovie4" src={itemranked[4].text}/>  
            </div> 
            <div id ="finalMovieNum5">
                <h3>{itemranked[5].index} </h3>
                <img id = "finalMovie5" src={itemranked[5].text}/>
            </div>        

                
            </div>
        </section>
    )
}
export default Submitted