import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../state/AppContext";
// import jwt from "jsonwebtoken";

export default function Login(props) {
  const [appState, setAppState] = useContext(AppContext);
  console.log(appState);

  const [isRemember, setIsRemember] = useState(false);
  console.log(isRemember);

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    emailErrMessage: "",
    passwordErrMessage: ""
  });

  const onInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    // validation
    if (name === "email") {
      if (value !== "") {
        setLoginState(loginState => ({ ...loginState, emailErrMessage: "" }));
      }
    }

    if (name === "password") {
      if (value !== "") {
        setLoginState(state => ({ ...state, passwordErrMessage: "" }));
      }
    }
    return setLoginState(loginState => ({ ...loginState, [name]: value }));
  };

  const switchRemember = () =>{
    return setIsRemember(!isRemember);
  }

  const submitHandler = () => {
    //validation
    if (loginState.email === "") {
      setLoginState(state => ({
        ...state,
        emailErrMessage: "Email connot be empty."
      }));
    } else if (!loginState.email.includes("@", ".")) {
      setLoginState(state => ({
        ...state,
        emailErrMessage: "Wrong email format."
      }));
    }

    if (loginState.password === "") {
      setLoginState(state => ({
        ...state,
        passwordErrMessage: "Password connot be empty."
      }));
    }

    // submission
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: loginState.email,
        password: loginState.password
      })
    })
      .then(res => res.json())
      .then(data => {
        // const deJwt = jwt.decode(data.token);
        const newState = {
          isLogin: true,
          jwt: data.token
          // userId: deJwt._id
        };

        setAppState(state => ({
          ...state,
          ...newState
        }));

        const sessionKeyName = "state";
        if (isRemember) {
          window.localStorage.setItem(sessionKeyName, JSON.stringify(newState));
        } else {
          window.sessionStorage.setItem(
            sessionKeyName,
            JSON.stringify(newState)
          );
        }

        return props.history.push("/");
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='section'>
      <div className='card' style={{ maxWidth: "500px", margin: "auto" }}>
        <header className='card-header'>
          <p className='card-header-title is-centered'>Login</p>
        </header>
        <div className='card-content'>
          <div className='content'>
            <div className='field'>
              <label className='label level-left'>Email</label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  className='input'
                  type='email'
                  name='email'
                  placeholder='example@mail.com'
                  onChange={e => onInput(e)}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-envelope'></i>
                </span>
                {/* <span className='icon is-small is-right'>
                  <i className='fas fa-exclamation-triangle'></i>
                </span> */}
              </div>
              <p className='help is-danger level-left'>
                {loginState.emailErrMessage}
              </p>
            </div>

            <div className='field'>
              <label className='label level-left'>Password</label>
              <div className='control has-icons-left'>
                <input
                  className='input'
                  type='password'
                  name='password'
                  placeholder='your password'
                  onChange={e => onInput(e)}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-key'></i>
                </span>
              </div>
              <p className='help is-danger level-left'>
                {loginState.passwordErrMessage}
              </p>
            </div>

            <label class='checkbox'>
              <input type='checkbox' checked={isRemember} onChange={switchRemember} /> Remember me
            </label>

            <button
              className='button is-primary'
              onClick={submitHandler}
              style={{ marginTop: "30px" }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
