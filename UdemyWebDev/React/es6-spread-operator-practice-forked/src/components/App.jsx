import React, { useState } from "react";
import Form from "./Form";
import List from "./List";
import Heading from "./Heading";

function App() {
  const [itemInput, setItemInput] = useState("");
  const [toDoItems, setToDoItems] = useState([]);

  function handleChange(event) {
    const { value } = event.target;

    setItemInput(value);
  }

  function handleAdd(event) {
    setToDoItems((previous) => {
      return [...toDoItems, itemInput];
    });
    setItemInput("");
  }

  return (
    <div className="container">
      <Heading />
      <Form onChange={handleChange} value={itemInput} onClick={handleAdd} />
      <List items={toDoItems} setToDoItems={setToDoItems} />
    </div>
  );
}

export default App;
