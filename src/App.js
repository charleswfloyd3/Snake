//Hooks
import React, {useState, useRef, useEffect} from 'react'
import useInterval from './useIntervalHook'
import useSound from 'use-sound';
import './eatfood.wav' 
//Components
import Snake from './snake/snake';
import SnakeFood from './snake_food/snake_food';
import GameOver from './gameover/gameover';

//Styles
import './App.css'
import './controls.css'

function App(props) {
  
  //Variables
  const [foodalive, setfoodlifestatus] = useState(true)
  const [foodplacement, setfoodplacement] = useState(true)
  const [snakeCoordinates, setsnakeCoordinates] = useState([[50,0], [50,5], [50,10]]);
  const [foodCoordinate, setFoodCoordinate] = useState("");
  const [direction, setDirection] = useState("down")
	const [counter, setcounter] = useState(0)
  const [gameStatus, setgameStatus] = useState(true)
  const [start, setStart] = useState(false)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(125)

  //Functions
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);

    var contains = arr.some(function(ele){
        return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }
	useInterval(
		()=>{
    if(start){
    setcounter(counter+1)
    }
    else{

    }
}
    ,speed)
    useInterval(() =>{
      		for(let i = 0; i < snakeCoordinates.length - 1; i++){
		if(snakeCoordinates[i][0] >= 90.1 || snakeCoordinates[i][0] < -.1 || snakeCoordinates[i][1] >= 90.1 || snakeCoordinates[i][1] < -.1 || countOccurrences(snakeCoordinates, snakeCoordinates[i]) == 2 ) {
      setgameStatus(false)
    }

	}
    }, 1)
  const EatFoodSound = () =>{
        useSound(
    './eatfood.wav',
    { volume: 0.25 }
  );
  }
	const eatFood = () =>{
		if(isArrayInArray(snakeCoordinates, foodCoordinate)){
        setScore(score+5)
        // EatFoodSound()
        if(foodalive){
        setfoodlifestatus(false)
        }
        else{
        setfoodlifestatus(true)

        }
			

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

			
			else{

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
      setgameStatus(true)
      setScore(0)
    }
    else if(e.keyCode == "81"){
      setStart(false)
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
  const slugGamemode = () =>{
    setSpeed(200)
    setStart(true)

  }
    const wormGamemode = () =>{
    setSpeed(125)
    setStart(true)

  }
    const pythonGamemode = () =>{
    setSpeed(75)
    setStart(true)
  }
  return (
    <div className="wholepage1">
      {start ? <div className="whole_page2">

  
     <div className="snake_container">
      
		{gameStatus ?<div className="game_grid"><Snake coord={snakeCoordinates}/>
      <SnakeFood coord={foodCoordinate}/>
      </div> : <GameOver score={score}/>}
     
      </div>
       <div className="extrainfo">
         <div className="scoreContent">
          <p className="scoreTitleCurrent">Score: &nbsp;</p>
          <p className="score">{score} </p>
        </div>
      <section>
        <ul className="listOfControls">
          <li className="rkey">R - restart</li>
          <li className="spaceBar">Space - Pause </li>
          <li className="qkey">Q - quit</li>
          <section className="arrowKeys">
          <li className="leftArrow">&#11013;</li>
          <li className="upArrow">&#11014;</li>
          <li className="downArrow">&#11015;</li>
          <li className="rightArrow">&#10145;</li>
        </section>
        </ul>
      </section>
      
      </div>
    </div>: <div className="startScreen">
      <p className="startTitle"> S N A K E</p>
            <p className="chooseGameMode">CHOOSE GAMEMODE</p>
              <ul className="listOfModes">
                <li className='slug' onClick={slugGamemode}>SLUG</li>
                <li className="worm" onClick={wormGamemode}>WORM</li>
                <li className="python" onClick={pythonGamemode}>PYTHON</li>

              </ul>
      </div>}
    </div>
  );
  }

export default App;
