import React, { useState } from 'react';
import eyeClose from './images/eye-close.png';
import './styles/login.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import swal from 'sweetalert';
export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate=useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setEmailError('');
    setPassError('');
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: pass,
      }, {
        withCredentials: true,
      });
      if (response.data.user) {
        swal({
          title: "Logged In Successfully",
          icon: "success",
         
        })
        .then((val) => {
            navigate("/");
        });
        console.log('Logged in successfully!');
      }
    } catch (error) {
      console.error('Login error:', error);
      const error_element = error.response.data.errors;
    
      setEmailError('');
      setPassError('');

      if (error_element.password) {
        setPassError(error_element.password);
      }
      if (error_element.email) {
        setEmailError(error_element.email);
      }
    }
  }
  function goSignup(){
    navigate("/signup");
  }

  return (
    <div className="whole_login" >


      <div className="container" id="home">
        <div className="login-left">
          <div className="login-header">
            <h1>Welcome</h1>
            <p>Please login to continue...</p>
          </div>
          <form className="login-form" autoComplete="off" onSubmit={handleLogin}>
            <div className="login-content">
              <div className="form-item">
                <label htmlFor="email">Enter Email</label>
                <input
                  onChange={(event) => { setEmail(event.target.value); }}
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  required
                />
                {emailError && <div className="error-message">{emailError}</div>}
              </div>
              <div className="form-item">
                <label htmlFor="password">Enter Password</label>
                <input
                  onChange={(event) => { setPass(event.target.value); }}
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your Password"
                  required
                  className="pass-key"
                />
                <img
                  src={eyeClose}
                  id="eyeicon"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  alt="Toggle visibility"
                />
                {passError && <div className="error-message">{passError}</div>}
              </div>
              <div className="form-item">
                <div className="checkbox">
                  <input type="checkbox" id="rememberMeCheckbox" defaultChecked />
                  <label htmlFor="rememberMeCheckbox" className="checkboxlabel">Remember Me</label>
                </div>
              </div>

              <div className="bg-grey">
                <div className="sing-up">Don't have an account? <a href="#" className="text-link" id="sign-up" onClick={goSignup} >Sign up</a></div>
              </div>
              <button type="submit">LogIn</button>
            </div>
          </form>
        </div>
        <div className="login-right">
          <img src="Data Arranging_Two Color.svg" alt="Data Arranging" />
        </div>
      </div>
    </div>
  );
}
