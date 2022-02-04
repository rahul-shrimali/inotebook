import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import modeContext from "../context/mode/modeContext";
import NoteItem from './NoteItem';


const Notes = () => {
    const context = useContext(noteContext);
    const context2 = useContext(modeContext);
    const { mode } = context2;
    const { notes, getNotes, editNote } = context;


    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });


    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line 
    }, [])

    const ref = useRef(null);

    const updateNote = (currnote) => {
        // console.log(ref.current);
        ref.current.click()
        setNote({ id: currnote._id, etitle: currnote.title, edescription: currnote.description, etag: currnote.tag });
    }

    return (
        <div className={`container text-${(mode === 'light') ? 'dark' : 'light'}`}>
            <AddNote mode = {mode}/>


            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{
                        backgroundColor: (mode === 'light') ? 'white' : 'rgb(107 103 103 / 95%)',
                        color: (mode === 'dark') ? 'white' : 'black'
                    }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title </label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description </label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag </label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length <= 5 || note.edescription.length <= 5} className={`btn btn-${(mode === 'light') ? 'dark' : 'light'}`} data-bs-dismiss="modal" onClick={() => { editNote(note.id, note.etitle, note.edescription, note.etag) }}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row my-3'>

                <h3 >Your Notes</h3>
                <div className='container my-2 mr-3' >{notes.length === 0 && "No notes to show"}</div>
                {notes.map((note, alert, showAlert) => {
                    return <NoteItem note={note} key={note._id} mode={mode} updateNote={updateNote} />
                })}
            </div>
        </div>
    )
}

export default Notes
