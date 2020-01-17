import React, { useContext } from "react";
import { AppContext } from "../state/AppContext";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Home() {
  const [appState, setAppState] = useContext(AppContext);
  console.log(appState);
  
  return (
    <div className='container'>
      {/* jumbotron */}
      <div class='jumbotron mt-4'>
        <h1 class='display-4'>Welcome</h1>
        <p class='lead'>This is a simple shopping site demo.</p>
        <hr class='my-4' />

        {/* not login */}
        <div style={ appState.isLogin ? {display:'none'} : {display:'block'}}>
          <p className='mb-3'>You can be customer or seller, or both!</p>
          <Link to='/register' className='btn btn-primary btn-lg' role='button' >
            Sign up now
          </Link>
          <span className='mx-3'> Or </span>
          <Link to='/login' className='btn btn-primary btn-lg' role='button'>
            Sign in
          </Link>
        </div>

        {/* login */}
        <div style={ appState.isLogin ? {display:'block'} : {display:'none'}}>
          <p className='mb-3'>You can be customer or seller, or both!</p>
          <Link to='/register' className='btn btn-primary btn-lg' role='button' >
            Buy
          </Link>
          <span className='mx-3'> Or </span>
          <Link to='/login' className='btn btn-primary btn-lg' role='button'>
            Sell
          </Link>
        </div>
        {/* <button onClick={() => window.location.reload(true)}>Click to reload!</button> */}
      </div>

      <div
        className='container mt-2'
        style={{ border: "1px solid #ddd", height: "20vh" }}
      >
        Featured stores
      </div>

      <div
        className='container mt-2'
        style={{ border: "1px solid #ddd", height: "20vh" }}
      >
        Popular products
      </div>
    </div>
  );
}
