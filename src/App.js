import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';


function App() {
  const [mode, setMode] = useState("light")

  const toggleMode = ()=>{
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#464343";
     
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
     
    }
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar title = "iNotebook" mode = {mode} toggleMode = {toggleMode} />
          <Switch>
            <Route exact path = "/">
              <Home/>
            </Route>
            <Route exact path = "/about">
              <About/>
            </Route>
          </Switch>
        </Router>
      </NoteState>
    </>
    
  );
}

export default App;
