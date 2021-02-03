import './App.css';
import React, {useState, useRef, useEffect} from 'react'
import useInterval from './useIntervalHook'
import Snake from './snake/snake';
import './App.css'
import SnakeFood from './snake_food/snake_food';
function App(props) {
    
  const [foodalive, setfoodlifestatus] = useState(true)
  const [foodplacement, setfoodplacement] = useState(true)
  const [snakeCoordinates, setsnakeCoordinates] = useState([[50,0], [50,10], [50,20]]);
  const [foodCoordinate, setFoodCoordinate] = useState("");
  const [direction, setDirection] = useState("down")

  function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);

    var contains = arr.some(function(ele){
        return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }

  useEffect(
        () => {

    
        let randomCoordinateOptions = [0,10,20,30,40,50,60,70,80,90]

        let x = randomCoordinateOptions[Math.floor(Math.random() * randomCoordinateOptions.length)];
        let y = randomCoordinateOptions[Math.floor(Math.random() * randomCoordinateOptions.length)];

        if(isArrayInArray(snakeCoordinates, [x,y])){
        if(foodplacement){
        setfoodplacement(false)
        }
        else{
        setfoodplacement(true)

        }
        }
        else{
        setFoodCoordinate([x,y])
        }

    
  }, [foodalive])
    
  const checkKey = (e) => {
    e = e || window.event;
    if (e.keyCode == '38') {
        console.log("up")
        setDirection("up")
    }
    else if (e.keyCode == '40') {
        console.log("down")
        setDirection("down")
    }
    else if (e.keyCode == '37') {
        console.log("left")
        setDirection("left")
    }
    else if (e.keyCode == '39') {
        console.log("right")
        setDirection("right")
    }
  }

  document.onkeydown = checkKey;
        
  const moveSnake = () =>{
    console.log("its rendering")
      let snakeCoordinatesLive = snakeCoordinates
      let head = snakeCoordinatesLive[snakeCoordinatesLive.length-1] 
      if (direction == "up") {
          head = [head[0], head[1] - 10]
          snakeCoordinatesLive.push(head)
          snakeCoordinatesLive.shift()
          setsnakeCoordinates(snakeCoordinatesLive)
      }
      else if (direction == "down") {   
          head = [head[0], head[1] + 10]
          snakeCoordinatesLive.push(head)
          snakeCoordinatesLive.shift()
          console.log(snakeCoordinates)          
          setsnakeCoordinates(snakeCoordinatesLive)          
      }
      else if (direction == "left") {
          head = [head[0] - 10, head[1]]
          snakeCoordinatesLive.push(head)
          snakeCoordinatesLive.shift()
          setsnakeCoordinates(snakeCoordinatesLive)
      }
      else if (direction == "right") {
          head = [head[0] + 10, head[1]]
          snakeCoordinatesLive.push(head)
          snakeCoordinatesLive.shift()
          setsnakeCoordinates(snakeCoordinatesLive)
      }        
  }


    setTimeout(move)






  return (
    <div className="snake_container">
      <div className="game_grid">
        <Snake coord={snakeCoordinates}/>
        <SnakeFood coord={foodCoordinate}/>
      </div>
    </div>
  );
  }

export default App;
