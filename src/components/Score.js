import React from "react";
import "../styles/score.css"

function Score({current, high}){
    return (
        <div className="score-layout">
            <p>Score: <span>{current}</span></p>
            <p>HighScore: <span>{high}</span></p>
        </div>
    )
}

 export default Score;