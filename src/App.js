import { useEffect, useState } from "react";
import CharacterCard from "./components/CharacterCard";
import Score from "./components/Score";
import Lose from "./components/Lose"
import "./App.css";

function App() {
  const [memoryCard, setMemoryCard] = useState([]);
  const [changeCharacters, setChangeCharacters] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loseGame, setLoseGame] = useState(false);

  function characterArray() {
    const characters = [];
    const numberCharacter = 12;

    for (let i = 0; i < numberCharacter; i++) {
      characters.push(Math.ceil(Math.random() * 501));
    }
    return characters;
  }

  function clickCard(e) {
    const targetId = parseInt(e.target.id);
    const index = memoryCard.findIndex((card) => card.id === targetId);
    if (!memoryCard[index].selected && !loseGame) {
      setCurrentScore((prevScore) => prevScore + 1);
      setHighScore((prevHigh) => {
        if(prevHigh < (currentScore + 1)){
          return currentScore + 1;
        } else{
          return prevHigh;
        }
      })
      setMemoryCard((prevCard) => {
        const newArr = prevCard.map((card) => {
          if (card.id === targetId) {
            return { ...card, selected: !card.selected };
          } else {
            return card;
          }
        });
        return shuffleCards(newArr);
      });
    } else {
      setLoseGame(prevState => !prevState);
      setMemoryCard((prevCard) =>
        prevCard.map((card) => ({ ...card, selected: false }))
      );
      setHighScore((prevHigh) =>
        prevHigh < currentScore ? currentScore : prevHigh
      );
      setCurrentScore(0);
    }
  }

  function startNew() {
    setLoseGame(prevState => !prevState);
  }

  function shuffleCards(arr) {
    const newArr = [];
    let randomNumber;

    for (let i = 0; i < arr.length; i++) {
      randomNumber = Math.ceil(Math.random() * 2);
      if (i === 0) {
        newArr.push(arr[i]);
      } else if (randomNumber === 1) {
        newArr.push(arr[i]);
      } else {
        newArr.unshift(arr[i]);
      }
    }
    return newArr;
  }

  useEffect(() => {
    const characters = characterArray();

    fetch(`https://bobsburgers-api.herokuapp.com/characters/${characters}`)
      .then((respons) => respons.json())
      .then((data) =>
        setMemoryCard(
          data.map((char) => ({
            name: char.name,
            image: char.image,
            selected: false,
            id: char.id,
          }))
        )
      );
  }, [changeCharacters]);

  const card = memoryCard.map((data) => (
    <CharacterCard
      key={data.id}
      id={data.id}
      click={clickCard}
      characterImage={data.image}
      characterName={data.name}
    />
  ));

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title-app">Bob's Burgers Memory Game</h1>
        <Score current={currentScore} high={highScore} />
      </header>
      <div className="card-grid">
        {loseGame && <Lose clickStart = {startNew} />}
        {card}
        </div>
    </div>
  );
}

export default App;
