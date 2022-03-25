import React from "react";
import "../styles/characterCard.css"

function CharacterCard({ characterImage, characterName, click, id }) {
  return (
    <div className="character-card" onClick={click} id = {id}>
      <img src={characterImage} alt={characterName} id = {id} />
      <p className="character-name" id={id}>{characterName}</p>
    </div>
  );
}

export default CharacterCard;
