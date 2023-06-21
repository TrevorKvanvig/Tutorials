import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0)

  function incrementCount() {
    setCount(count + 1)
  }

  function decrementCount() {
    setCount(count - 1)
  }

  return (<div className="container">
    <h1>{ count }</h1>
    <button onClick={incrementCount}>+</button>
    <button onClick={decrementCount}>-</button>
  </div>);
}

export default App;
