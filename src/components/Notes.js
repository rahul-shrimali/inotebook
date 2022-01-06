import React from 'react'
import { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import modeContext from "../context/mode/modeContext";
import NoteItem from './NoteItem';


const Notes = () => {
    const context = useContext(noteContext);
    const context2 = useContext(modeContext);
    const {mode} = context2;
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
    })

    return (
        <div  className ={`container text-${(mode === 'light') ? 'dark' : 'light'}`}>
            <AddNote/> 
            <div className='row my-3'>
                {/* {console.log(mode)} */}
                <h3 >Your Notes</h3>
                {notes.map((note, alert, showAlert) => {
                    return <NoteItem note={note} key={note._id} mode = {mode} />
                })}
            </div>
        </div>
    )
}

export default Notes
