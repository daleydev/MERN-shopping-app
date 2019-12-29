import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: ""
  });

  console.log(state);

  const [inputState, setInputState] = useState({
    isNameValid: true,
    isEmailValid: true,
    isPasswordValid: true
  });

  const onInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    return setState(state => ({ ...state, [name]: value }));
  };

  const submitHandler = () => {
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    // props.history.push('/')
  };

  return (
    <div className='section'>
      <div class='card' style={{ maxWidth: "500px" }}>
        <header class='card-header'>
          <p class='card-header-title is-centered'>Registration</p>
        </header>
        <div class='card-content'>
          <div class='content'>
            <div class='field'>
              <label class='label level-left'>Username</label>
              <div class='control has-icons-left has-icons-right'>
                <input
                  class='input'
                  name='username'
                  type='text'
                  onChange={e => onInput(e)}
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-user'></i>
                </span>
              </div>
            </div>

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
              {/* <p class='help is-danger'>This email is invalid</p> */}
            </div>

            <div class='field'>
              <label class='label level-left'>Password</label>
              <div class='control has-icons-left'>
                <input
                  class='input'
                  type='text'
                  name='password'
                  placeholder='your password'
                  onChange={e => onInput(e)}
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-key'></i>
                </span>
              </div>
              <p class='help level-left'>Min length is 6 characters</p>
            </div>
          </div>
        </div>
        <footer class='card-footer'>
          <a href='#' onClick={submitHandler} class='card-footer-item'>
            Submit
          </a>
          <a href='#' class='card-footer-item'>
            Login
          </a>
          <a href='/' class='card-footer-item'>
            Cancel
          </a>
        </footer>
      </div>
    </div>
  );
}
