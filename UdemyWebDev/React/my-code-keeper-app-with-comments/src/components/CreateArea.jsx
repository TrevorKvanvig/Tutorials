import React, { useState } from "react";

function CreateArea(props) {
  // noteElements: stores the values of what user types into create area
  // setNoteElement: function used to manipulate note elements
  const [noteElements, setNoteElement] = useState({
    noteTitle: "",
    noteContent: ""
  });

  // whenever there is a change in the Create area title or content this is triggered
  function handleChange(event) {
    const { name, value: newValue } = event.target;

    setNoteElement((previousNoteValues) => {
      // use spread operator to dynamically change title or content depending on the event name
      // this works becasue name atribute from inputs are the same as noteElements in Use state
      return {
        ...previousNoteValues,
        [name]: newValue
      };
    });
  }

  return (
    <div>
      <form>
        <input
          name="noteTitle"
          onChange={handleChange}
          placeholder="Title"
          value={noteElements.noteTitle}
        />
        <textarea
          name="noteContent"
          onChange={handleChange}
          placeholder="Take a note..."
          rows="3"
          value={noteElements.noteContent}
        />
        <button
          onClick={(event) => {
            props.onClick(noteElements);
            event.preventDefault();
            setNoteElement(() => ({
              noteTitle: "",
              noteContent: ""
            }));
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
