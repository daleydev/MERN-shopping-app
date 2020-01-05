import React, { useState } from "react";

// This is all states for the app
const AppContext = React.createContext([{}, () => {}]);

const AppProvider = props => {
  const [state, setState] = useState({
       jwt: '',
       login: false,
       
  });

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };