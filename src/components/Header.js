import React from "react";

export default function Header(props) {
  return (
    <header>
      <div className="header-title">
        <h1>Memory Game</h1>
      </div>
      <div className="header-description">
        <p>
          Earn points by clicking on an image you haven`&apos;`t clicked on
          before.
        </p>
      </div>
      <div className="header-score">
        <p className="score">Score: {props.score}</p>
        <p className="score">High Score: {props.highScore}</p>
      </div>
    </header>
  );
}
