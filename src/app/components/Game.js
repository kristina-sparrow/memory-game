import React, { useState, useEffect } from "react";
import CardGrid from "./CardGrid";
import authorList from "../data/authors";
import Scoreboard from "./Scoreboard";

export default function Game() {
  const [level, setLevel] = useState(1);
  const [authors, setAuthors] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  function calculateRequiredCards(level) {
    switch (level) {
      case 1:
        return 4;
      case 2:
        return 6;
      case 3:
        return 8;
      case 4:
        return 10;
      case 5:
        return 12;
      default:
        return 12;
    }
  }

  useEffect(() => {
    function loadCards() {
      const amount = calculateRequiredCards(level);
      setAuthors(shuffleCards(fetchAuthors(amount)));
    }
    loadCards();
  }, [level]);

  function fetchAuthors(amount) {
    const authors = [];
    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * 12);
      const author = authorList[randomIndex];
      const name = author.name;
      const image = author.imageURL;
      authors.push({ name, image });
    }
    return authors;
  }

  function shuffleCards(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function handleCardClick(e) {
    const card = e.target.parentNode.lastChild.textContent;
    playSelection(card);
    setAuthors(shuffleCards(authors));
  }

  function playSelection(card, level) {
    if (!clickedCards) {
      updateScore();
      setClickedCards([card]);
      return;
    }
    if (clickedCards.includes(card)) {
      if (score > highScore) {
        setHighScore(score);
      }
      toggleGameOver();
      return;
    }
    setClickedCards([...clickedCards, card]);
    updateScore();
    if (clickedCards.length === calculateRequiredCards(level) - 1) {
      setClickedCards([]);
      setLevel(level + 1);
    }
  }

  function updateScore() {
    const newScore = score + 1;
    if (newScore > highScore) setHighScore(newScore);
    setScore(newScore);
  }

  function toggleGameOver() {
    //do something...
  }

  return (
    <main>
      <Scoreboard score={score} highScore={highScore} />
      <CardGrid authors={authors} onClick={handleCardClick} />
    </main>
  );
}
