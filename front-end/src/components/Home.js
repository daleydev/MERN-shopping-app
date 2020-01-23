import React, { useContext,useEffect } from "react";
import { AppContext } from "../state/AppContext";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Home() {
  const [appState, setAppState] = useContext(AppContext);
  console.log(appState);

  const getStateFromStorage = () => {
    const localState = window.localStorage.getItem('state');
    const sessionState = window.sessionStorage.getItem('state');
    console.log(localState);
    console.log(sessionState);
    
    if (localState) {
      const localStateObj = JSON.parse(localState);
      return setAppState(state => ({
        ...state,
        ...localStateObj
      }));
    }

    if(sessionState){
      const sessionStateObj = JSON.parse(sessionState);
      return setAppState(state => ({
        ...state,
        ...sessionStateObj
      }));
    }
  }

  useEffect(()=>{
    getStateFromStorage()
  },[])

  return (
    <div className=''>
      <div className='home-section'>
        <div className='home-intro'>
          <div className='home-primary-text'>Welcome</div>
          <div className='home-secondary-text'>Shop online or Ship online.</div>
        </div>
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
