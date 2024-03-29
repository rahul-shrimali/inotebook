import React from 'react'
import { useContext, useState } from 'react';
import alertContext from '../context/alerts/alertContext';
import noteContext from '../context/notes/noteContext'


const AddNote = (props) => {
    const c2 = useContext(alertContext)
    const context = useContext(noteContext);
    const {addNote} = context;
    const mode = props;
    const {showAlert} = c2
    const [note, setNote] = useState({title :"", description :"", tag : ""});
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Note added", "success")
        setNote({title :"", description :"", tag : ""})
    }

    const handleChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value});
    }

    return (
        <div >
            <h3>Add a note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title </label>
                    <input type="text" className="form-control" id="title" name = "title" aria-describedby="emailHelp" value={note.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description </label>
                    <input type="text" className="form-control" id="description" name = "description" value={note.description} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag </label>
                    <input type="text" className="form-control" id="tag" name = "tag" value={note.tag} onChange={handleChange}/>
                </div>
                <button disabled={note.title.length <= 5 || note.description.length <= 5} type="submit" className={`btn btn-${(mode === 'light') ? 'light' : 'dark'}`}onClick={handleClick}>Submit</button>
            </form>

        </div>
    )
}

export default AddNote
