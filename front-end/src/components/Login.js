import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [state,setState] = useState({
    email: 'gp1@mail.com',
    password: '123456'
  })
  
  console.log(state);

  const inputOnChange = (e) => {
    const name = e.target.name; 
    const value = e.target.value;
    return setState(state => ({...state, [name]: value }))
  }

  const  login = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
    .then(res => console.log(res))
    .then(data => console.log(data))
    .catch(error => console.log(error))

    props.history.push('/')
  }


  return (
    <div className='container'>
      <div class='card'>
        <div class='card-body'>
          <h5 class='card-title'>Login</h5>

          <form>
            <div class='form-group'>
              <label for='exampleInputEmail1'>Email</label>
              <input
                type='email'
                name='email'
                class='form-control'
                value={state.email}
                aria-describedby='emailHelp'
                onChange={(e)=> inputOnChange(e)}
              />
              <small id='emailHelp' class='form-text text-muted'>
              </small>
            </div>
            <div class='form-group'>
              <label for='exampleInputPassword1'>Password</label>
              <input
                type='password'
                name='password'
                class='form-control'
                value={state.password}
                id='exampleInputPassword1'
                onChange={(e)=> inputOnChange(e)}
              />
            </div>
            <div class='form-group form-check'>
              <input
                type='checkbox'
                class='form-check-input'
                id='exampleCheck1'
              />
              <label class='form-check-label' for='exampleCheck1'>
                Check me out
              </label>
            </div>
            <button type='submit' onClick={e => login(e)} class='btn btn-primary' >
              Login
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
