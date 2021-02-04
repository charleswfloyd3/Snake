import './App.css';
import React, {useState, useRef, useEffect} from 'react'
import useInterval from './useIntervalHook'
import Snake from './snake/snake';
import './App.css'
import SnakeFood from './snake_food/snake_food';
import GameOver from './gameover/gameover';
import Controls from './controls/controls'
import Scoreboard from './scoreboard/scoreboard';
function App(props) {
    
  const [foodalive, setfoodlifestatus] = useState(true)
  const [foodplacement, setfoodplacement] = useState(true)
  const [snakeCoordinates, setsnakeCoordinates] = useState([[50,0], [50,5], [50,10]]);
  const [foodCoordinate, setFoodCoordinate] = useState("");
  const [direction, setDirection] = useState("down")
	const [counter, setcounter] = useState(0)
	const [gameStatus, setgameStatus] = useState(true)
  const [score, setScore] = useState(0)
  function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);

    var contains = arr.some(function(ele){
        return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }
	useInterval(
		()=>{
		setcounter(counter+1)
}
    ,125)
    useInterval(() =>{
      		for(let i = 0; i < snakeCoordinates.length - 1; i++){
		if(snakeCoordinates[i][0] >= 90.1 || snakeCoordinates[i][0] < -.1 || snakeCoordinates[i][1] >= 90.1 || snakeCoordinates[i][1] < -.1){
			setgameStatus(false)
		}
	}
    }, 1)
	const eatFood = () =>{
		if(isArrayInArray(snakeCoordinates, foodCoordinate)){
			if(foodalive){
				if(direction == "down"){
					snakeCoordinates.unshift([snakeCoordinates[0][0], snakeCoordinates[0][1] - 5])
				}
				else if(direction == "up"){
					snakeCoordinates.unshift([snakeCoordinates[0][0], snakeCoordinates[0][1] + 5])
				}
				else if(direction == "left"){
					snakeCoordinates.unshift([snakeCoordinates[0][0] +5, snakeCoordinates[0][1]])
				}
				else if(direction == "right"){
					snakeCoordinates.unshift([snakeCoordinates[0][0] -5, snakeCoordinates[0][1]])

				}			
        setfoodlifestatus(false)
        setScore(score+5)
			}
			else{
			setfoodlifestatus(true)

			}
		}
	}		
	useEffect(()=>{
				moveSnake()
				eatFood()

	},[counter])
  useEffect(
        () => {
        let randomCoordinateOptions = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90]

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
    else if(e.keyCode == "82"){
      setDirection("down")
      setsnakeCoordinates([[50,0], [50,5], [50,10]])
      // setfoodlifestatus(false)
      setgameStatus(true)
    }
  }

  document.onkeydown = checkKey;
  let snakeCoordinatesLive = snakeCoordinates
  let head = snakeCoordinatesLive[snakeCoordinatesLive.length-1]    
   
  const moveSnake = () =>{

			 
      if (direction == "up") {
          head = [head[0], head[1] - 5]
          snakeCoordinatesLive.push(head)
          snakeCoordinatesLive.shift()
          setsnakeCoordinates(snakeCoordinatesLive)
      }
      else if (direction == "down") {   
          head = [head[0], head[1] + 5]
          snakeCoordinatesLive.push(head)
          snakeCoordinatesLive.shift()
          setsnakeCoordinates(snakeCoordinatesLive)          
      }
      else if (direction == "left") {
          head = [head[0] - 5, head[1]]
          snakeCoordinatesLive.push(head)
          snakeCoordinatesLive.shift()
          setsnakeCoordinates(snakeCoordinatesLive)
      }
      else if (direction == "right") {
          head = [head[0] + 5, head[1]]
          snakeCoordinatesLive.push(head)
          snakeCoordinatesLive.shift()
          setsnakeCoordinates(snakeCoordinatesLive)
      }        
  }

  return (

    <div className="snake_container">
      
		{gameStatus ?<div className="game_grid"><Snake coord={snakeCoordinates}/>
      <SnakeFood coord={foodCoordinate}/>
      </div> : <GameOver />}
      <div className="extrainfo">
      {/* <p className="scoreTitleCurrent">Score: &nbsp;{score} </p> */}
	
      
      </div>
    </div>
  );
  }

export default App;
