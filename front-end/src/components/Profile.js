import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../state/AppContext";
import jwt from "jsonwebtoken";

const Profile = props => {
  const [appState, setAppState] = useContext(AppContext);
  const [profileState, setProfileState] = useState({});
  console.log(appState);
  console.log(profileState);

  const getProfile = (id) => {
    fetch(`http://localhost:5000/api/profile/${id}`, {
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

  const updateProfile = () => {
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
  }

  const profileOnChange = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    return setProfileState(state => ({ ...state, [inputName]: inputValue }));
  };

  useEffect(() => {
    if (appState.isLogin) {
      const deJWT = jwt.decode(appState.jwt);
      const userId = deJWT._id;
      console.log(userId);
      getProfile(userId);
    } else {
      props.history.push("/login");
    }
  }, []);

  return (
    <div class='card' style={{ width: "40vw", margin: "auto" }}>
      {/* <div class='card-image'>
        <figure class='image is-4by3'>
          <img
            src='https://bulma.io/images/placeholders/1280x960.png'
            alt='Placeholder image'
          />
        </figure>
      </div> */}
      <header class='card-header'>
        <p class='card-header-title'>Profile</p>
      </header>

      <div class='card-content'>
        <div class='content'>
          <div class='field'>
            <label class='label'>Name</label>
            <div class='control'>
              <input class='input' type='text' value={profileState.username} />
            </div>
          </div>

          <div class='field'>
            <label class='label'>Email</label>
            <div class='control'>
              <input
                class='input'
                type='email'
              />
            </div>
          </div>

          <label class='checkbox'>
            <input type='checkbox' /> Make me public
          </label>

          <div class='field is-grouped'>
            <div class='control'>
              <button class='button is-link'>Save</button>
            </div>
            <div class='control'>
              <button class='button is-link is-light'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
