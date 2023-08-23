import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_BACKEND_API;
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  //Fetch all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  //Add new note
  const addNote = async (title, tag, noteBody) => {
    const response = await fetch(`${host}/api/notes/addnewnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, tag, noteBody }),
    });
    // Add in UI
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  //Edit note
  const editNote = async (id, title, tag, noteBody) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, tag, noteBody }),
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Edit in UI
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].tag = tag;
        newNotes[index].noteBody = noteBody;
        break;
      }
    }
    setNotes(newNotes);
  };
  //Delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    //delete in UI
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  return (
    <noteContext.Provider
      value={{ notes, getNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
