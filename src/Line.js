import React from "react";

export default function Line(props){
    const {indexs,res,refEle}= props
    const [divHeight, setDivHeight] = React.useState(0)
    const [posLine,setPosLine] = React.useState({
        rotate:0,
        x:0,
        y:0,
    })
  

    function calculateXandY(){
        console.log(`height: ${divHeight}`)
        let x = 0;
        let y = 0;
        let rotate = 0;

        if(indexs[0]===0){
            y = (divHeight/6);
            if(indexs[1]===3){
                x=(-divHeight/3);
                y=(divHeight/2)
                rotate = 90;
            } else if(indexs[1]===4){
                y =(divHeight/2);
                rotate = 45;
            }
        } else if(indexs[0] ===2){
            if(indexs[1]===5){
                x=(divHeight/3);
                y=(divHeight/2);
                rotate = 90
            } else{rotate = 135;y=(divHeight/2)}
        } else if(indexs[0]===1){
            y=(divHeight/2);
            rotate=90;
        } else if(indexs[0]===3){
            y=(divHeight/2);
        } else if(indexs[0]===6){
            y=(divHeight*0.825);
        }
        setPosLine((prev)=>{
            return {
                x:x,
                y:y,
                rotate:rotate
            }
        })
    }

    React.useEffect(()=>{
        setDivHeight(refEle.current.clientHeight);
        window.addEventListener("resize",()=>{
            setDivHeight(refEle.current.clientHeight);
        })
    },[indexs])

    React.useEffect(()=>{
        calculateXandY()
    },
    [indexs,divHeight])

    const lineStyles = {
        transform: `translateY(${posLine.y}px) translateX(${posLine.x}px) rotate(${posLine.rotate}deg)`,
        transition: "all 100ms ease-in-out"
    }
    return(
        res === "wins" && <div style={lineStyles}className="line"></div>
    )
}