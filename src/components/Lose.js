import React from "react";
import "../styles/lose.css";

function Lose({clickStart}) {
    return (
        <div className="loser-popup" onClick = {clickStart}>
            <h3>Picked the same person twice!</h3>
            <p>Click anywhere on game board, to play again.</p>
        </div>
    )
}

export default Lose;