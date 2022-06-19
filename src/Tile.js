import React from "react";

export default function Tile({tileArray,tileIndex,handleClick,indexs,game}){
  
  const [colorTile,setColorTile] = React.useState(false)

   function highLightTiles(){
    for(let i =0; i<3;i++){
      if(indexs[i] === tileIndex){
        setColorTile(true)
      }
    }
   }
    
   
   React.useEffect(()=>{
    if(game){highLightTiles()}
    else if(!game){setColorTile(false)}
   },[game])

   const styles = {
    backgroundColor : colorTile ? "lightblue" : "white"
   }
    return(
        <div className='tile' style={styles} onClick={handleClick} id={tileIndex}>
          <div className={tileArray[tileIndex]}></div>
        </div>
    )
}