import React, { useContext } from "react";
import { AppContext } from "../state/AppContext";

export default function Home() {
  const [appState, setAppState] = useContext(AppContext);

  console.log(appState);
  const style = {};
  return (
    <div className='section'>Home page</div>
  );
}
