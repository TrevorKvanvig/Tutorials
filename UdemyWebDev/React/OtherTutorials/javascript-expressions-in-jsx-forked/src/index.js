import React from "react";
import ReactDOM from "react-dom";

const name = 'Trevor';
const num = 10;
 
ReactDOM.render(<div><h1>Hello {name}!</h1>
<p>Your favorite number is {num}</p></div>
  , document.getElementById("root"));
