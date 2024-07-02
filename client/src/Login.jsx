import React, { useState } from 'react';
import '.styles/style.css';
import eyeClose from './eye-close.png';
import facebookIcon from 'https://img.icons8.com/color/512/facebook-new.png';
import googleIcon from 'https://img.icons8.com/fluency/512/google-logo.png';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            <header id="header">
                <div className="logo"><a href="#">Minimal</a> </div>
                <div className="hamburger" id="toggle">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <nav className="nav-bar" id="navbar">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="#product">Products</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <div className="login" id="login">
                            <li><a href="#" className="navlogin">Login</a></li>
                        </div>
                    </ul>
                </nav>
            </header>

            <div className="container" id="home">
                <div className="login-left">
                    <div className="login-header">
                        <h1>Welcome</h1>
                        <p>Please login to continue...</p>
                    </div>
                    <form className="login-form" autoComplete="off">
                        <div className="login-content">
                            <div className="form-item">
                                <label htmlFor="email">Enter Email</label>
                                <input type="email" id="email" placeholder="example@email.com" required />
                            </div>
                            <div className="form-item">
                                <label htmlFor="password">Enter Password</label>
                                <input type={passwordVisible ? "text" : "password"} id="password" placeholder="Enter your Password" required className="pass-key" />
                                <img src={eyeClose} id="eyeicon" className="password-toggle" onClick={togglePasswordVisibility} alt="Toggle visibility" />
                            </div>
                            <div className="form-item">
                                <div className="checkbox">
                                    <input type="checkbox" id="rememberMeCheckbox" defaultChecked />
                                    <label htmlFor="rememberMeCheckbox" className="checkboxlabel">Remember Me</label>
                                </div>
                            </div>
                            <div className="remember-forgot">
                                <a href="#">Forgot password?</a>
                            </div>
                            <div className="bg-grey">
                                <div className="sing-up">Don't have an account? <a href="#" className="text-link" id="sign-up">Sign up</a></div>
                            </div>
                            <button type="submit">LogIn</button>
                        </div>
                        <div className="login-footer">
                            <a href="#">
                                <img width="30" src={facebookIcon} alt="facebook" />Facebook
                            </a>
                            <a href="#">
                                <img width="30" src={googleIcon} alt="google" />Google
                            </a>
                        </div>
                    </form>
                </div>
                <div className="login-right">
                    <img src="images/Data Arranging_Two Color.svg" alt="Data Arranging" />
                </div>
            </div>
        </div>
    );
};

export default Login;
