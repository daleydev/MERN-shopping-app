import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bulma/css/bulma.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { AppProvider } from "./state/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className='App'>
          <Navbar />

          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/login' component={Login}></Route>

            <Route path='/register' component={Register}></Route>
          </Switch>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
