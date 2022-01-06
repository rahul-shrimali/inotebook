import React from "react";
import noteContext from '../context/notes/noteContext'
import { useContext } from "react";

const NoteItem = (props) => {
  const { note, mode} = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;
  return (
    // {console.log(alert)}
    <div className={`col-md-3 my-3`}>
      <div className="card " style={{
        backgroundColor : (mode === 'light') ? 'white' : '#a5a5a5',
        color : (mode === 'dark') ? 'white' : 'black'
        }} >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="far fa-edit mx-2"></i>
        </div>
      </div> 
    </div>
  );
};

export default NoteItem;
