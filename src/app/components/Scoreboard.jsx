import React from "react";

export default function Scoreboard({ score, highScore }) {
  return (
    <div className="scoreboard">
      <div className="score-description">
        <p>
          Earn points by clicking on an image you haven&apos;t clicked on
          before.
        </p>
      </div>
      <div className="score-display">
        <p className="score">Score: {score}</p>
        <p className="score">High Score: {highScore}</p>
      </div>
    </div>
  );
}
