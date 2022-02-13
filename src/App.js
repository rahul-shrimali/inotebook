import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import AlertState from './context/alerts/AlertState';
import ModeState from './context/mode/ModeState';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {

  return (
    <>
      <NoteState>
        <AlertState>
          <ModeState>
            <Router>
              <Navbar title = "iNotebook"/>
              <Alert />
              <div className="container">
              <Switch>
                <Route exact path = "/">
                  <Home/> 
                </Route>
                <Route exact path = "/about">
                  <About/>
                </Route>
                <Route exact path = "/login">
                  <Login></Login>
                </Route>
                <Route exact path = "/signUp">
                  <SignUp></SignUp>
                </Route>
              </Switch>
              </div>
            </Router>
          </ModeState>
        </AlertState>
      </NoteState>
    </>
    
  );
}

export default App;
