import React, {useState} from 'react'
import './gameover.scss'
function GameOver(props) {

  return (
        <div className="game_over">
				  <p className="game_overtitle">G A M E &nbsp; O V E R</p>
          <p className="scoreFinal">Score: &nbsp;{props.score}</p>
          <p className="playagainorquit">&nbsp;Press R to Restart&nbsp;  | &nbsp; Press Q to QUIT</p>
		    </div> 
  )
}

export default GameOver;
