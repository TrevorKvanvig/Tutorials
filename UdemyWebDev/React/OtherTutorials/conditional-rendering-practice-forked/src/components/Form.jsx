import React from "react";


function Form(props) {
  
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />

      {props.isRegistered === false && <input type="password" placeholder="Confirm Password" />}
      {props.isRegistered ? <button type="submit">login</button> : <button type="submit">Register</button>}
    </form>
  );
}

export default Form;
