import React from "react";

export default function Card({ author, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img className="card-img" src={author.image} alt={author.name} />
      <p className="card-name">{author.name}</p>
    </div>
  );
}
