import React from 'react'
import './scoreboard.css'

function Scoreboard(props){

    return(
        <div className="scoreboard_container">
            <p className="scoreTitleRecord">Website Record Score: </p>
            <p></p>
            <p className="scoreTitleCurrent">Your current Score: </p>
            <p className="currentscore">{props.score}</p>
        </div>
    );
}

export default Scoreboard;