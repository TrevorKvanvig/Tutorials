import React from "react";

function EmojiTerm(props) {
  return (
    <div className="term">
      <dt>
        <span className="emoji" role="img" aria-label="Tense Biceps">
          {props.emoji}
        </span>
        <span>{props.name}</span>
      </dt>
      <dd>{props.meaning}</dd>
    </div>
  );
}

function createCard(card) {
  return (
    <EmojiTerm
      key={card.id}
      emoji={card.emoji}
      name={card.name}
      meaning={card.meaning}
    />
  );
}

export default EmojiTerm;
export {createCard};