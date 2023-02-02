import React from "react";

export default function GameOverlay({ gameOver, score, restartGame }) {
  return (
    <div className={`game-over ${gameOver ? "" : "hidden"}`}>
      <h1>Game Over!</h1>
      <p>You remembered {score} authors!</p>
      <button onClick={restartGame}>Try Again</button>
    </div>
  );
}
