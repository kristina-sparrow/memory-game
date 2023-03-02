import React from "react";

export default function Scoreboard({ score, highScore }) {
  return (
    <div className="scoreboard">
      <div className="score-group">
        <p className="score-title">Score</p>
        <p className="score-num current">{score}</p>
      </div>
      <div className="score-group">
        <p className="score">High Score</p>
        <p className="score-num high">{highScore}</p>
      </div>
    </div>
  );
}
