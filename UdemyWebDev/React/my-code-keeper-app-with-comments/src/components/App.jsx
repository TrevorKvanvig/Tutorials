// IMPORTS
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

// What To Return when <App /> is rendered in index.js
function App() {
  // create variables for use state hook
  // notesArray: contains all notes in current state of app
  // manageNotesArray: function to be used to manipulate all notes in array
  const [notesArray, manageNoteArray] = useState([]);

  // note: variable passed from CreateArea.jsx containes the note object to add to array
  function handleClick(note) {
    // use function from use state
    // allPreviousNotes: all notes in current state
    manageNoteArray((allPreviousNotes) => {
      // use SPREAD operator to add note passed from CreateArea.jsx to notesArray
      return [...allPreviousNotes, note];
    });
  }

  // noteId: value passed from Note.jsx contaning the index of the note we want to delete
  function handleDelete(noteId) {
    //use state function
    //allNotes: contains all notes in current state
    manageNoteArray((allNotes) => {
      // return all notes that the index is not the one we passed to delete
      // this will delete note we want to delete from dom
      return allNotes.filter((note, index) => {
        return index !== noteId;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onClick={handleClick} />

      {notesArray.map((currentNote, index) => (
        <Note
          key={index}
          id={index}
          title={currentNote.noteTitle}
          content={currentNote.noteContent}
          onClick={handleDelete}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
