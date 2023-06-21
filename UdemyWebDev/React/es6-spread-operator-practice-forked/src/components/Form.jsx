import React from "react";

function Form(props) {
  return (
    <div className="form">
      <input type="text" onChange={props.onChange} value={props.value} />

      <button onClick={props.onClick}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default Form;
