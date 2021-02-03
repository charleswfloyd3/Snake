import React, {useState} from 'react'
import './snake.css'
function Snake(props) {


  return (
      <div>

      {props.coord.map((unit, i) =>{
        const style = {
          left: `${unit[0]}%`,
          top: `${unit[1]}%`

        } 
        return(
          <div className="snake_unit" key={i} style={style} ></div>
          
        )
      }
        
        )}


      </div>

  )
}

export default Snake;
