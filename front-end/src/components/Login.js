import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../state/AppContext";
import jwt from "jsonwebtoken";

export default function Login(props) {
  const [appState, setAppState] = useContext(AppContext);
  console.log(appState);

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    emailErrMessage: '',
    passwordErrMessage: ''
  });

  const onInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    // validation
    if (name === 'email'){
      if (value !== '') {setLoginState(loginState => ({ ...loginState, emailErrMessage: '' }));}
    }

    if (name === 'password'){
      if (value !== '') {setLoginState(state => ({ ...state, passwordErrMessage: '' }))}
    }
    return setLoginState(loginState => ({ ...loginState, [name]: value }));
  };

  const submitHandler = () => {
    //validation
    if (loginState.email === '') {
      setLoginState(state => ({ ...state, emailErrMessage: 'Email connot be empty.' }))
    }else if (!loginState.email.includes('@','.')){
      setLoginState(state => ({ ...state, emailErrMessage: 'Wrong email format.' }))
    };
    
    if (loginState.password === '') {setLoginState(state => ({ ...state, passwordErrMessage: 'Password connot be empty.' }))}


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
        const deJwt = jwt.decode(data.token);
        
        setAppState(state => ({
          ...state,
          jwt: data.token,
          login: true,
          userId: deJwt._id
        }));

        return props.history.push('/');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='section'>
      <div class='card' style={{ maxWidth: "500px", margin: "auto" }}>
        <header class='card-header'>
          <p class='card-header-title is-centered'>Login</p>
        </header>
        <div class='card-content'>
          <div class='content'>
            <div class='field'>
              <label class='label level-left'>Email</label>
              <div class='control has-icons-left has-icons-right'>
                <input
                  class='input'
                  type='email'
                  name='email'
                  placeholder='example@mail.com'
                  onChange={e => onInput(e)}
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-envelope'></i>
                </span>
                {/* <span class='icon is-small is-right'>
                  <i class='fas fa-exclamation-triangle'></i>
                </span> */}
              </div>
              <p class='help is-danger level-left'>{loginState.emailErrMessage}</p>
            </div>

            <div class='field'>
              <label class='label level-left'>Password</label>
              <div class='control has-icons-left'>
                <input
                  class='input'
                  type='password'
                  name='password'
                  placeholder='your password'
                  onChange={e => onInput(e)}
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-key'></i>
                </span>
              </div>
              <p class='help is-danger level-left'>{loginState.passwordErrMessage}</p>
            </div>

            <button class='button is-primary' onClick={submitHandler} style={{marginTop: '30px'}}>
              Submit
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
