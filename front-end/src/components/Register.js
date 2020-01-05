import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [registerState, setRegisterState] = useState({
    username: "",
    email: "",
    password: "",
    isSuccess: false
  });

  const [errState, setErrState] = useState("");

  console.log(registerState);
  

  const [inputState, setInputState] = useState(false);

  const onInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    return setRegisterState(state => ({ ...state, [name]: value }));
  };

  const submitHandler = () => {
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: registerState.username,
        email: registerState.email,
        password: registerState.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log('register success');
          return setRegisterState(state => ({ ...state, isSuccess: true }));
        }else{
          console.log('register fail');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='section' style={{height:'100vh'}}>
      <div class='card' style={{ maxWidth: "500px", margin: 'auto',  }}>
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
                  placeholder='username'
                  onChange={e => onInput(e)}
                  value={registerState.username}
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
                  value={registerState.email}
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
                  type='password'
                  name='password'
                  placeholder='password'
                  onChange={e => onInput(e)}
                  value={registerState.password}
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-key'></i>
                </span>
              </div>
              <p class='help level-left'>Min length is 6 characters</p>
            </div>

            
            <p class='help is-success' style={registerState.isSuccess ? {display:'block'}:{display:'none'}}>Register successfull. Please<a href='/login'>  login</a></p>
            <button class='button is-primary' onClick={submitHandler} style={{marginTop: '30px'}}>
              Submit
            </button>
          </div>
        </div>
        {/* <footer class='card-footer'>
          <a href='#' onClick={submitHandler} class='card-footer-item'>
            Submit
          </a>

        </footer> */}
      </div>
    </div>
  );
}
