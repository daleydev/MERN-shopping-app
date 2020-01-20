import React, { useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { AppContext } from "../state/AppContext";

export default function Navbar() {
  const [appState, setAppState] = useContext(AppContext);
  console.log(appState);

  return (
    <Router>
      <nav style={{display:'', width:'100vw',border: '1px solid #ddd',height:'80px'}}>
        <span style={{fontSize:'30px',}}>
          <a href='/'>Shop Demo</a>
        </span>
        <span style={{float:'right'}}>
          <button>Login</button>
        </span>
        <span style={{float:'right'}}>
          <button>Register</button>
        </span>

      </nav>
    </Router>
  );
}


const style = {
  container: {}
}