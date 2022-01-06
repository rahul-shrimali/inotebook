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
        console.log(json);

        setNotes(json);

      }


      // Add a note
      const addNote = async (title, description, tag)=>{
        // console.log("Adding a new note");
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

        const json = response.json();
        const note = {
          "_id": "2bf1e65c91f96711680",
          "user": "61b6e59e892335e0ee207435",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-12-22T06:01:02.441Z",
          "__v": 0
        };

        setNotes(notes.concat(note));
      }

      //Delete a Note
      const deleteNote = (id)=>{
        // console.log("deleting" + id);
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
        const response = await fetch(url, {
          method : 'PUT',
          headers :{
            'Content-Type' : 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNmU1OWU4OTIzMzVlMGVlMjA3NDM1In0sImlhdCI6MTYzOTcxODQ4N30.rMUl4g9FPjTLfMUObRxYgBzx3rlIsjkhVObla0k8lbU'
          },
          body : JSON.stringify({title, description, tag})
        });

        const json = response.json();

        for(var i = 0; i <notes.length; i++){
          if(notes[i]._id === id){
            notes[i].title = title;
            notes[i].description = description;
            notes[i].tag = tag;
            break;
          }
        }
      }
    return (
        <NoteContext.Provider value = {{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;