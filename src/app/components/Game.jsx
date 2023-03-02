import React, { useState, useEffect } from "react";
import CardGrid from "./CardGrid";
import Scoreboard from "./Scoreboard";
import GameOverlay from "./GameOverlay";
import authorList from "../data/authors";

export default function Game() {
  const [level, setLevel] = useState(1);
  const [authors, setAuthors] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameReset, setGameReset] = useState(false);

  // LOAD CARDS
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

  function loadCards() {
    const amount = calculateRequiredCards(level);
    setAuthors(shuffleCards(fetchAuthors(amount)));
  }

  function fetchAuthors(amount) {
    const generatedIndexes = [];
    const authors = [];
    for (let i = 0; i < amount; i++) {
      let randomIndex = getUniqueIndex(generatedIndexes, 12);
      generatedIndexes.push(randomIndex);
      const { name, image } = authorList[randomIndex];
      authors.push({ name, image });
    }
    return authors;
  }

  function getUniqueIndex(generatedIndexes, max) {
    let randomIndex = Math.floor(Math.random() * max);
    while (generatedIndexes.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * max);
    }
    return randomIndex;
  }

  function shuffleCards(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  // ON CARD CLICK
  function handleCardClick(e) {
    const card = e.target.parentNode.lastChild.textContent;
    if (!clickedCards) {
      updateScore();
      setClickedCards([card]);
      setAuthors(shuffleCards(authors));
      return;
    } else if (clickedCards.includes(card)) {
      if (score > highScore) setHighScore(score);
      setGameOver(true);
      return;
    }
    setClickedCards([...clickedCards, card]);
    updateScore();
    if (clickedCards.length === calculateRequiredCards(level) - 1) {
      setClickedCards([]);
      setLevel(level + 1);
    }
    setAuthors(shuffleCards(authors));
  }

  function updateScore() {
    const newScore = score + 1;
    if (newScore > highScore) setHighScore(newScore);
    setScore(newScore);
  }

  useEffect(() => {
    loadCards();
  }, [level]);

  // GAME OVER & RESET
  function restartGame() {
    setScore(0);
    setGameOver(false);
    setGameReset(true);
  }

  useEffect(() => {
    if (gameReset === true) {
      setLevel(1);
      loadCards();
      setClickedCards([]);
      setGameReset(false);
    }
  }, [gameReset]);

  return (
    <main>
      <Scoreboard score={score} highScore={highScore} />
      <CardGrid authors={authors} onClick={handleCardClick} />
      <GameOverlay
        score={score}
        gameOver={gameOver}
        restartGame={restartGame}
      />
    </main>
  );
}
