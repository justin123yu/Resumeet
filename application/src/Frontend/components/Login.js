/**
 * Login module
 * @fileoverview Login.js
 * - Login file imports react, login.css, axios, react-router-dom
 * @description Login function is used to create a login page where users are able to enter data
 * @returns Login page form where user enters data and performs the necessary steps to sent a post request to login
 */

import { useState } from "react";
import "./Login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * @function Login
 * @description - creates form 
 * @returns Login form and sends post request to db
 */
export function Login(){
    const navigate = useNavigate();
    const[form, setForm] = useState({
        username: "",
        password: "",

    });

    /**
     * @function usernameEvent
     * @description takes in a form as a parameter, the form consists of (username value and password value) and stores username info
     * @param {form} e 
     */
    function usernameEvent(e){
        setForm({
            ...form,
            username: e.target.value
        });
    }

        /**
     * @function passwordEvent
     * @description takes in a form as a parameter, the form consists of (username value and password value) and stores password info
     * @param {form} e 
     */
    function passwordEvent(e){
        setForm({
            ...form,
            password: e.target.value
        });
    }

    /**
     * @function @async onSubmit
     * @description sends a post request to api and verifies login information 
     * @param {form} e - form consists of username and password values
     */
    async function onSubmit(e){
        e.preventDefault();
        const profile = {
            username: form.username,
            password: form.password,
        }
        axios.post("http://34.94.97.122:8000/api/login", profile).then((value) => {
            if(value.data == null){
                console.log("username and password is incorrect")
            } else {
                console.log("Welcome");
                window.localStorage.setItem("username", form.username);
                navigate("/");
                window.location.reload();
            }
        })
        .catch(err =>{ 
            console.log("error happened in login post");
            console.log(err)
        })
    }

    return(
        <div className="log-in">
            <h3>Log In</h3>
            <form onSubmit={onSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={form.username} onChange={usernameEvent} required></input>
            <br/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={form.password} onChange={passwordEvent} required></input>
            <br/>
            <input type="submit" value="Log In"></input>
            </form>
        </div>
    )
}
