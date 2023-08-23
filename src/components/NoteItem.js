import React, { useContext,useState } from "react";
import noteContext from "../context/noteContext";

const NoteItem = (props) => {
  const { note, updateNote, pinNote, unpinNote, pinnedNoteId } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  //State to manage delete note
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    deleteNote(note._id);
    props.showAlert("Deleted successfully");
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  return (
    <div className={` ${note._id === pinnedNoteId ? 'pinned first-item' : ''} `} >
      <div
        className="card my-4"
        style={{"width": "20rem","height":"20rem"}}
      >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text mt-5" style={{"textTransform":"uppercase"}}>{note.tag}</p>
          <p className="card-text">{note.noteBody}</p>
          <div className="card-buttons">
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (note._id === pinnedNoteId) {
                unpinNote();
              } else {
                pinNote(note._id);
              }
            }}
          >
            {note._id === pinnedNoteId ?  <i className="fas fa-thumbtack slashPin"></i> : <i className="fas fa-thumbtack"></i>}
          </button>

          <button
            type="button"
            className="btn"
            onClick={() => {
              updateNote(note);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            className="btn"
            onClick={handleDeleteClick}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          </div>
  
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p className="my-4">Are you sure you want to delete this note?</p>
            <button className="btn my-3 mx-2 btn-danger" onClick={handleConfirmDelete}>Confirm</button>
            <button className="btn my-3 mx-2 btn-secondary" onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
