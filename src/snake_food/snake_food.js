import React, {useState} from 'react'
import './snake_food.css'
function SnakeFood(props) {

          const style = {
          left: `${props.coord[0]}%`,
          top: `${props.coord[1]}%`

        } 
  return (
          <div className="snake_food" style={style}></div>
  )
}

export default SnakeFood;
