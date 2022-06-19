
import './App.css';
import React from 'react';
import { useRef } from 'react';
import Tile from './Tile'
import Line from './Line'

function App() {

  const [tiles,setTiles] = React.useState([0,1,2,3,4,5,6,7,8])
  const [game,setGame] = React.useState(true)
  const [turn,setTurn] = React.useState(true)
  const [storeIndex,setStoreIndex] = React.useState([])
  const [turnCounter,setTurnCounter] = React.useState(0)
  const [showResult,setShowResult] = React.useState(false)
  const [result,setResult] = React.useState("")
  const ref = useRef(null)

  const winningIndex = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function resetStates(){
  setShowResult(false)
  setResult("")
  setTiles([0,1,2,3,4,5,6,7,8])
  setGame(true)
  setTurn(true)
  setStoreIndex([])
  setTurnCounter(0)
}

function endGame(){
  setShowResult(true)
  setGame(false)
  
}


  function allAreEqual(array) {
    return array.every(element => element === array[0])
   };

    function checkWin(){
      if(turnCounter > 4){
        for(let i = 0; i<winningIndex.length;i++){
          let arr = [];
          for(let j = 0; j<3; j++){
            arr.push(tiles[winningIndex[i][j]])
            if(j === 2){
             if(allAreEqual(arr)){
                console.log(2)
                setResult("wins")
                setStoreIndex(winningIndex[i])
                return endGame()
              } else if(turnCounter === 9 && i=== 7){
                  setResult("draw")
                  return endGame()
              }
            }
          }
        }
      }
    }

    
    React.useEffect(()=>{
      if(!showResult){
        checkWin()
        
      }
      
    },[tiles])
 

  function addTic(e){
    const tileIndex = e.target.id
    const tile = e.target.children[0]
    if(game){
      if(tile.className ==="o" || tile.className ==="x") return
      setTiles((prev)=>{
        let arr = [...prev]
        arr[tileIndex] = turn ? "x" : "o"
        return arr
        })
        setTurnCounter(prevCount => prevCount + 1)
        setTurn(prev => !prev)  
    }
  }

  function playAgain(){
    return resetStates()
  }

  const displayTiles = tiles.map((tile,index)=>{
    return <Tile tileArray = {tiles} tileIndex={index} handleClick={addTic} id={index} indexs={storeIndex}  game={showResult} />
  })
  return (
    <>
    {showResult && <h1 className='show-win'>{result ==="draw" ? "It's a draw!#fbb040; " : `${!turn ? "Player 1" : "Player 2"} wins`}</h1>}

    {!showResult && (turn ? <h1 className='player'>Player 1 turn</h1> : <h1 className='player'>Player 2 turn</h1>)}

    <div className='game-container'>
      <div ref = {ref} className='game'>
        {displayTiles}
        <Line indexs={storeIndex} res={result} refEle={ref} />
      </div>
    </div>
    {showResult && <button className='play-again' onClick={playAgain}>Play again</button>}
    </>
  );
}

export default App;
