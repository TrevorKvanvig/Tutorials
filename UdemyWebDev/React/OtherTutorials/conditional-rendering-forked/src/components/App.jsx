import React from "react";
import LoginForm from "./LoginForm";

var isLoggedIn = false;

function App() {
  return <div className="container">{ isLoggedIn ? <h1>Hello</h1> : <LoginForm /> }</div>;
}

export default App;
