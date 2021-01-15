 /* eslint-disable */ 
import React from 'react'
import sidebar from '../Assets/sidebar.gif'


function Intro ({clicked, closeIntro}){
    const [checked, setChecked] = React.useState(false);

    return(
        <div id = "pulse">
        <section id ="introPopup">
            <div id = "howToUse">How To Use</div>
            <div id = "sidebarwrapper1">
                
                <div id = "titlepop">
                    <div id= "titleside">SideBar</div>
                    <div id = "titlesidesmall"> The sidebar allows you to see the movies you want to nominate so you can:</div>
                    <div id = "titlesidesmall3">Drag to rearrange movie rankings</div>
                    <div id = "titlesidesmall">• Remove movies from your selection </div>
                    <div id = "titlesidesmall">• Once 5 movies are selected the submit button shows</div>
                    <div id = "titlesidesmall">• It will store your movies selection on refresh</div>
                </div>
                <div id = "titlepop">
                <div id= "titleside">Buttons</div>
                    <div>
                    <div id="buttontester">
                        <div id= "addButton" data-role="button">+</div>
                    </div>
                    <div id = "titlesidesmallbut">Add Button</div>
                    </div>
                    <div>
                    <div id="buttontester2">
                        <div id= "addButton" data-role="button">-</div>
                    </div>
                    <div id = "titlesidesmallbut">Remove Button</div>
                    </div>
                    <div id = "titlesidesmall2">• Click on the movie cover to see more information about the movie</div>
                </div>
                <div id = "titlepop">
                    <div id= "titleside">Secrets</div>
                    <div id = "titlesidesmall">I've included some secrets, here are some famous lines from some movies, add them to your list for a suprise!</div>
                    <div id = "titlesidesmall">(Turn volume low)</div>
                    <div id = "titlesidesmall">"It came without ribbons. It came without tags. It came without packages, boxes, or bags."</div>
                    <div id = "titlesidesmall">"If you douse me again, and I’m not on fire, I’m donating you to a city college." </div>
                    <div id = "titlesidesmall">"YOU SHALL NOT PASS!"</div>
                </div>
            </div>
            <div id ="continuebox">
                <div id="buttonContinue" onClick={()=>{closeIntro(checked)}}>
                    <div id= "ConButton" data-role="button">Continue</div>
                </div>
                <input id = "dontshow"type = "checkbox" onChange={() => setChecked(!checked)}></input>
                <div id = "titlesidesmallbut">Don't show this again</div>
            </div>
        </section>
                    
        </div>
    )
}
export default Intro