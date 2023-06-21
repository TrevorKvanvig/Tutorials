import React, { useState } from "react";

function App() {
  const [clicked, changeClicked] = useState(false);
  const [isMouseOver, changeMouseOver] = useState(false);
  const [name, setName] = useState("");
  const [nameToDisplay, setNameToDisplay] = useState("");

  function handleClicked(event) {
    if (clicked) {
      changeClicked(false);
    } else {
      changeClicked(true);
    }

    setNameToDisplay(name);
  }

  function handleMouseOver() {
    changeMouseOver(true);
  }
  function handleMouseOut() {
    changeMouseOver(false);
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div className="container">
      <h1>Hello {nameToDisplay}</h1>
      <input
        type="text"
        onChange={handleChange}
        value={name}
        placeholder="What's your name?"
      />

      <button
        style={{ backgroundColor: isMouseOver ? "black" : "white" }}
        onClick={handleClicked}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
