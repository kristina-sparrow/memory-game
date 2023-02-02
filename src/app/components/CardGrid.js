import React from "react";
import Card from "./Card";

export default function CardGrid({ authors, onClick }) {
  const authorCards = authors.map((author) => (
    <Card key={author.id} author={author} onClick={onClick} />
  ));

  return <div className="grid">{authorCards}</div>;
}
