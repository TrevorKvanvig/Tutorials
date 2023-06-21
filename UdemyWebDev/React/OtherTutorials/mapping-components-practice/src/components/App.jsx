import React from "react";
import emogipedia from "../emojipedia";
import { createCard } from "./EmojiTerm";

function App() {
  return (
    <div>
      <h1>
        <span>Emojipedia</span>
      </h1>
      <dl className="dictionary">{emogipedia.map(createCard)}</dl>
    </div>
  );
}

export default App;
