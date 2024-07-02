import React, { useState } from 'react';
import eyeClose from './images/eye-close.png';
import './styles/signup.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export default function SignUpForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate();

  async function handleSingUp(event) {
    event.preventDefault();
    setEmailError('');
    setPassError('');

    try {
      const response = await axios.post('http://localhost:8000/signup', {
        email: email,
        password: pass,
        firstname: firstname,
        lastname: lastname,
      }, {
        withCredentials: true,
      });
      console.log("response got" ,response);
      if(response.data.email==="The email is already registered."){
        setEmailError('The email is already registered.');
      }
      if (response.data.user) {

        console.log('Account Created successfully!');
        swal({
            title: "Account Created Successfully",
            icon: "success",
            // buttons: true,
          })
          .then((val) => {
              navigate("/");
          });
      }
    } catch (error) {
      console.error('Login error:', error);
      const error_element = error.response.data.errors;

      setEmailError('');
      setPassError('');
      setFirstnameError('');
      setLastnameError('');

      if (error_element.password) {
        setPassError(error_element.password);
      }
      if (error_element.email) {
        setEmailError(error_element.email);
      }
    //   if (error_element.firstname) {
    //     setFirstnameError(error_element.firstname);
    //   }
    //   if (error_element.lastname) {
    //     setLastnameError(error_element.lastname);
    //   }
    }
  }


  function goLogin() {
    navigate("/login");
  }

  return (
    <div className="whole_signup">
      <div className="container" id="home">
        <div className="login-left">
          <div className="login-header">
            <h1>Welcome</h1>
            <p>Create your  account...</p>
          </div>
          <form className="login-form" autoComplete="off" onSubmit={handleSingUp}>
            <div className="login-content">
              <div className="form-item">
                <label htmlFor="firstname">Enter First Name</label>
                <input
                  onChange={(event) => { setFirstname(event.target.value); }}
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  required
                />
                {firstnameError && <div className="error-message">{firstnameError}</div>}
              </div>
              <div className="form-item">
                <label htmlFor="lastname">Enter Last Name</label>
                <input
                  onChange={(event) => { setLastname(event.target.value); }}
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  required
                />
                {lastnameError && <div className="error-message">{lastnameError}</div>}
              </div>
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
                <div className="sing-up">Already have an account <a href="#" className="text-link" id="sign-up" onClick={goLogin} >Login Here</a></div>
              </div>
              <button type="submit">Create Account</button>
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
