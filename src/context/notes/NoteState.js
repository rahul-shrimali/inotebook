import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
   
    const host  = "http://localhost:5000"
    const notesInitial =[];
      const [notes, setNotes] = useState(notesInitial);

      //GET ALL NOTES
      const getNotes = async ()=>{
        const url = host + "/api/notes/fetchallnotes";
        const response = await fetch(url, {
          method : 'GET',
          headers :{
            'Content-Type' : 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNmU1OWU4OTIzMzVlMGVlMjA3NDM1In0sImlhdCI6MTYzOTcxODQ4N30.rMUl4g9FPjTLfMUObRxYgBzx3rlIsjkhVObla0k8lbU'
          }
        });

        const json = await response.json();
        // console.log(json);

        setNotes(json);

      }


      // Add a note
      const addNote = async (title, description, tag)=>{ 
        //API CALL
        const url = host + "/api/notes/addnote";
        const response = await fetch(url, {
          method : 'POST',
          headers :{
            'Content-Type' : 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNmU1OWU4OTIzMzVlMGVlMjA3NDM1In0sImlhdCI6MTYzOTcxODQ4N30.rMUl4g9FPjTLfMUObRxYgBzx3rlIsjkhVObla0k8lbU'
          },
          body : JSON.stringify({title, description, tag})
        });

        const json = await response.json();

        setNotes(notes.concat(json));
      }

      //Delete a Note
      const deleteNote = async (id)=>{
        //Api Call
        const url = host + "/api/notes/deletenote/" + id;
        await fetch(url, {
          method : 'DELETE',
          headers :{
            'Content-Type' : 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNmU1OWU4OTIzMzVlMGVlMjA3NDM1In0sImlhdCI6MTYzOTcxODQ4N30.rMUl4g9FPjTLfMUObRxYgBzx3rlIsjkhVObla0k8lbU'
          }
        });

        const newNotes = notes.filter((note)=>{
          return id !== note._id;
        });
        // console.log(newNotes);
        setNotes(newNotes);
      }

      // Edit a note 
      const editNote = async (id, title, description, tag)=>{
        //API CALL
        const url = host + "/api/notes/updatenote/" + id;
        await fetch(url, {
          method : 'PUT',
          headers :{
            'Content-Type' : 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNmU1OWU4OTIzMzVlMGVlMjA3NDM1In0sImlhdCI6MTYzOTcxODQ4N30.rMUl4g9FPjTLfMUObRxYgBzx3rlIsjkhVObla0k8lbU'
          },
          body : JSON.stringify({title, description, tag})
        });
        

        for(var i = 0; i <notes.length; i++){
          if(notes[i]._id === id){
            notes[i].title = title;
            notes[i].description = description;
            notes[i].tag = tag;
            break;
          }
        }
        
        getNotes();
      }
    return (
        <NoteContext.Provider value = {{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;