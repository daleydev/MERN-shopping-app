import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../state/AppContext";

const Profile = props => {
  const [appState, setAppState] = useContext(AppContext);
  const [profileState, setProfileState] = useState({});
  console.log(appState);
  console.log(profileState);
  console.log(window.localStorage.getItem('state'));

  const getProfile = () => {
    fetch(`http://localhost:5000/api/profile/${appState.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": appState.jwt
      }
    })
      .then(res => res.json())
      .then(data => {
        return setProfileState(data.user);
      });
  };

  useEffect(() => {
    if (appState.isLogin) {
      getProfile();
    } else {
      props.history.push("/login");
    }
  }, []);

  return (
    <div>
      <div>
        User Name: <input type='text' value={profileState.username} />
      </div>
      <div>
        Email: <input type='text' value={profileState.email} />
      </div>
    </div>
  );
};

export default Profile;
