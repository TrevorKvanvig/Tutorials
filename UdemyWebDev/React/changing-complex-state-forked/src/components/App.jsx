import React, { useState } from "react";

function App() {
  const [name, setName] = useState({
    firstName: "",
    lastName: ""
  });

  function handleNameChange(event) {
    const { name, value } = event.target;

    setName((prev) => {
      if (name === "fName") {
        return {
          firstName: value,
          lastName: prev.lastName
        };
      } else if (name === "lName") {
        return {
          firstName: prev.firstName,
          lastName: value
        };
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {name.firstName} {name.lastName}
      </h1>
      <form>
        <input
          onChange={handleNameChange}
          name="fName"
          placeholder="First Name"
          value={name.firstName}
        />
        <input
          onChange={handleNameChange}
          name="lName"
          placeholder="Last Name"
          value={name.lastName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
