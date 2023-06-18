//Create a React app from scratch.
import React from 'react';
import ReactDOM from 'react-dom';
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
let greeting
let cColor
let currentTime = new Date()
let midnight =  new Date();
let afternoon = new Date();
let six = new Date();
midnight.setHours(0,0,0);
afternoon.setHours(12,0,0);
six.setHours(18,0,0)

if (currentTime >= midnight && currentTime < afternoon) {
  greeting = "Goodmorning"
  cColor = "red"
}else if (currentTime >= afternoon && currentTime <= six) {
  greeting ="Good afternoon"
  cColor = "green"
} else {
  greeting ="Good night"
  cColor = "blue"
}

let currentStyle = {
  color: cColor
}

ReactDOM.render( 
  <div>
    <h1 className="heading" style={currentStyle}>{greeting}</h1>
  </div>
  , document.getElementById('root'))
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.
