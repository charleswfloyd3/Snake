import React, {useState} from 'react'
import './gameover.scss'
function GameOver(props) {

  return (
        <div className="game_over">
				  <p className="game_overtitle">G A M E  &nbsp; &nbsp; O V E R</p>
          <p className="playagainorquit">Press R to Restart</p>
          <p className="playagainorquit">Press Q to QUIT</p>
		    </div> 
  )
}

export default GameOver;
