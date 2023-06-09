/**
 * signup.js
 * @fileoverview - Signup function generates the html page and sign up form where users can enter their info and signup
 * @description - sddsds
 * @return - returns html and sign up form and sends post request to api
 */

import { useRef } from "react";
import "./Signup.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/** 
* @function SignUp
* @description - creates sign up for form 
* @returns Login form and sends post request to db
*/

export function Signup(){
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const [error, setError] = useState(false);
    const [status, setStatus] = useState(0);

    const navigate = useNavigate();

    /**
     * @function @async onSubmit
     * @description - sends post to api regarding sign up credentials
     */
    async function onSubmit(e){
        e.preventDefault();
        const newProfile = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
            date: new Date().toLocaleString()
        }
        axios.post('http://34.94.97.122:8000/api/profile', newProfile).then((value) => {
                console.log("Sucesses in posting in sign up" + value.status);
                navigate("/login");
        })
        .catch(error =>{ 
            console.error(error.response.data.message);
            setError(true);
            setStatus(error.response.status)
        })
    }

    function errorMessage(enable) {
        if(enable && status == 300) return (
            <div className="error-message">
                <div className="error-message-icon">
                    <i className="fas fa-exclamation-circle"></i>
                </div>
                <div className="error-message-text">
                    Sorry, this username is already taken, please choose another one.
                </div>
            </div>
        )
        if(enable && status == 301) return (
            <div className="error-message">
                <div className="error-message-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="error-message-text">
                    Your password must be at least 6 characters long. Please try again.
                </div>
            </div>
        )
    }


    return(
        <div className="sign-up">
            <h3>Sign Up</h3>
            <form onSubmit={onSubmit}>
                {errorMessage(error)}
            <br></br>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" ref={usernameRef} required></input>
            <br/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" ref={passwordRef}  required></input>
            <br/>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" ref={emailRef}  required></input>
            <br/>
            <input type="submit" value="Sign Up"></input>
            </form>
        </div>
    )
}
