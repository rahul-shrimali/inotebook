import React from "react";
import noteContext from '../context/notes/noteContext'
import { useContext } from "react";

const NoteItem = (props) => {
  const { note, mode, updateNote} = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;
  return (
    // {console.log(alert)}
    <div className={`col-md-3 my-3`}>
      <div className="card " style={{
        backgroundColor : (mode === 'light') ? 'white' : 'rgb(107 103 103)',
        color : (mode === 'dark') ? 'white' : 'black'
        }} >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div> 
    </div>
  );
};

export default NoteItem;
