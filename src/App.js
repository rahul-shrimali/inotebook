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
        <Router>
          <Navbar title = "iNotebook" mode = {mode} toggleMode = {toggleMode} />
          <Switch>
            <Route path = "/">
              <Home/>
            </Route>
            <Route exact path = "/about">
              <About />
            </Route>
          </Switch>
        </Router>
    </>
    
  );
}

export default App;
