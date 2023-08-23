import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/noteContext";
import NoteItem from "./NoteItem";
import { Link } from "react-router-dom";

const Notes = (props) => {
  const notecontext = useContext(noteContext);
  const { notes, getNotes, editNote } = notecontext;

  const [note, setNote] = useState({
    id: "",
    title: "",
    tag: "",
    noteBody: "",
  });

  //State to pin notes
  const [pinnedNoteId, setPinnedNoteId] = useState(null);

  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6; // Number of notes per page

  //State to manage search
  const [filter, setFilter] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //update note
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote);
  };
  //edit note
  const ref = useRef(null);
  const refClose = useRef();
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    editNote(note._id, note.title, note.tag, note.noteBody);
    refClose.current.click();
  };
  //pin note
  const pinNote = (noteId) => {
    setPinnedNoteId(noteId);
    localStorage.setItem("pinnedNoteId", noteId);
  };

  const unpinNote = () => {
    setPinnedNoteId(null);
    localStorage.removeItem("pinnedNoteId");
  };
  //handle search
  const handleSearch = (e) => {
    setSearchInput(e);
    if (searchInput) {
      const searchedNotes = notes.filter((note) => {
        return Object.values(note)
          .join(" ")
          .toLowerCase()
          .includes(e.toLowerCase());
      });
      setFilter(searchedNotes);
    } else {
      setFilter(notes);
    }
  };
  // Calculate index of the first and last note of the current page
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  useEffect(() => {
    const pinnedId = localStorage.getItem("pinnedNoteId");
    if (pinnedId) {
      setPinnedNoteId(pinnedId);
    }
    getNotes();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="edit-modal modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ backgroundColor: "#000", color: "#fff" }}
          >
            <div className="modal-header" style={{borderBottom:"none"}}>
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
            </div>
            <div className="modal-body">
              <p className="my-2">Title</p>
              <input
                name="title"
                type="text"
                id="etitle"
                value={note.title}
                onChange={handleChange}
                minLength={3}
                required
                style={{
                  height: "50px",
                  width: "100%",
                  borderRadius: "10px",
                  outline: "none",
                  border: "none",
                  padding: "10px",
                }}
              />
              <div>
                <p className="my-2">Tag</p>
                <input
                  name="tag"
                  type="text"
                  id="etag"
                  value={note.tag}
                  onChange={handleChange}
                  minLength={5}
                  required
                  style={{
                    height: "50px",
                    width: "100%",
                    borderRadius: "10px",
                    outline: "none",
                    border: "none",
                    padding: "10px",
                  }}
                />
              </div>
              <div>
                <p className="my-2">Description</p>
                <textarea
                  name="noteBody"
                  type="text"
                  id="enoteBody"
                  value={note.noteBody}
                  onChange={handleChange}
                  required
                  style={{
                    height: "150px",
                    width: "100%",
                    borderRadius: "10px",
                    outline: "none",
                    border: "none",
                    padding: "10px",
                  }}
                />
              </div>
            </div>
            <div className="modal-footer" style={{borderTop:"none"}}>
              <button
                type="button"
                disabled={note.title.length < 3 || note.tag.length < 3}
                className="btn"
                onClick={handleClick}
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                Update
              </button>
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="search my-5">
          <div className="searchContainer">
            <i className="fa fa-search searchIcon"></i>
            <input
              className="searchBox"
              id="search"
              type="search"
              name="search"
              placeholder="Search by title or tag..."
              onChange={(e) => handleSearch(e.target.value)}
              value={searchInput}
            />
          </div>
       
          <Link to="addnote" >
              <button
                className="btn mx-5"
                type="submit"
                style={{
                  backgroundColor:"#000",
                  height: "50px",
                  width: "100px",
                  borderRadius: "10px",
                  outline: "none",
                  border: "none",
                  color:"#fff",
                }}
              >
               Add New
              </button>
            </Link>
        </div>
        {searchInput.length > 0 ? (
          <>
          <div className="notes-container">
            <div className="notes">
              {filter.map((note) => {
                return (
                  <NoteItem
                    key={note._id}
                    note={note}
                    updateNote={updateNote}
                    pinNote={pinNote}
                    unpinNote={unpinNote}
                    pinnedNoteId={pinnedNoteId}
                    showAlert={props.showAlert}
                  />
                );
              })}
            </div>
          </div>
          </>
        ) : (
          <>
          <div className="notes-container mx-2 my-3">
          {notes.length === 0 && "No notes to display"}
        </div>
          <div className="notes-container">
            <div className="notes">
              {currentNotes.map((note) => {
                return (
                  <NoteItem
                    key={note._id}
                    note={note}
                    updateNote={updateNote}
                    pinNote={pinNote}
                    unpinNote={unpinNote}
                    pinnedNoteId={pinnedNoteId}
                    showAlert={props.showAlert}
                  />
                );
              })}
              
            </div>
          </div>
            <div className="d-flex justify-content-center">
            {/* Pagination controls */}
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(notes.length / notesPerPage) },
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
          </>
        )}
      
      </div>
    </>
  );
};

export default Notes;
