import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className='App'>
        <AppBar />

        <Switch>
          <Route exact path='/' component={Home}>
            
          </Route>
            <Route path='/login' component={Login}>
            
          </Route>

         <Route path='/register' component={Register}>
            
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
