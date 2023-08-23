import React, { useContext, useState } from "react";

import noteContext from "../context/noteContext";
import { useNavigate,Link } from "react-router-dom";

const AddNote = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", tag: "", noteBody: "" });
  const handleClick = () => {
    const title = document.querySelector("#title");
    const tag = document.querySelector("#tag");
    const noteBody = document.querySelector("#noteBody");
    if (title.value === "") {
      props.showAlert("Please add a title.");
    } else if (tag.value === "") {
      props.showAlert("Please add a tag.");
    } else if (noteBody.value === "") {
      props.showAlert("Please add a description.");
    } else {
      addNote(note.title, note.tag, note.noteBody);
      setNote({ title: "", tag: "", noteBody: "" });
      props.showAlert("Note added successfully", "success");
      navigate("/");
    }
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="addnote">
      <h3 className="my-3">Add a new note</h3>
      <div>
        <h6 className="my-3">Title</h6>
        <input
          name="title"
          id="title"
          type="text"
          value={note.title}
          onChange={handleChange}
          style={{
            height: "50px",
            width: "500px",
            borderRadius: "5px",
            outline: "none",
            border: "none",
            padding: "10px",
            border:"1px solid black"
          }}
        />
      </div>
      <div>
        <h6 className="my-3">Tag</h6>
        <input
          name="tag"
          id="tag"
          type="text"
          value={note.tag}
          onChange={handleChange}
          style={{
            height: "50px",
            width: "500px",
            borderRadius: "5px",
            outline: "none",
            border: "none",
            padding: "10px",
            border:"1px solid black"
          }}
        />
      </div>
      <div>
        <h6 className="my-3">Description</h6>
        <textarea
          name="noteBody"
          id="noteBody"
          type="text"
          value={note.noteBody}
          onChange={handleChange}
          style={{
            height: "50px",
            width: "500px",
            borderRadius: "5px",
            outline: "none",
            border: "none",
            padding: "10px",
            border:"1px solid black"
          }}
        />
      </div>
      <div className="d-flex">
        
        <button
          className="my-3 mx-2"
          onClick={handleClick}
          style={{
            height: "60px",
            width: "150px",
            borderRadius: "5px",
            outline: "none",
            border: "none",
            backgroundColor: "#000",
            color:"#fff"
          }}
        >
         Add note
        </button>
        <Link to="/" >
              <button
                className="btn my-3 mx-2"
                type="btn"
                style={{
                  height: "60px",
                  width: "150px",
                  borderRadius: "5px",
                  outline: "none",
                  border: "none",
                  backgroundColor: "#000",
                  color:"#fff"
                }}
              >
               Cancel
              </button>
            </Link>

      </div>
    </div>
  );
};

export default AddNote;
