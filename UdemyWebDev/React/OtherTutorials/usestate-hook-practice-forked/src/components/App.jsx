import React, { useState, useEffect } from "react";

function App() {
  let time = new Date().toLocaleTimeString();
  const [currentTime, update] = useState(time);

 

  useEffect(function(){
    const interval = setInterval(() => {
      update(new Date().toLocaleTimeString())
    }, 1000);
    
    return () => clearInterval(interval);
  })

  return (
    <div className="container">
      <h1>{currentTime}</h1>
      <button>Get Time</button>
    </div>
  );
}

export default App;

