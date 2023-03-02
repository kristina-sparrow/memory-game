import React from "react";
import { RxReset } from "react-icons/rx";

export default function GameOverlay({ gameOver, score, restartGame }) {
  return (
    <div className={`game-over ${gameOver ? "" : "hidden"}`}>
      <h1>Game Over!</h1>
      <p>You remembered {score} authors</p>
      <button onClick={restartGame}>
        <RxReset />
        Try Again
      </button>
    </div>
  );
}
