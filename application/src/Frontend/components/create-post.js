import { useRef } from "react";
import axios from "axios";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";
/**
 * @function CreatePost
 * @description - this function lets users create a post and send a post request to db
 * @returns - post page form to enter data 
 */
export function CreatePost(){
    const navigate = useNavigate();
    const emailRef = useRef();

    /**
     * @function submitPost
     * @param {*} e 
     * @description posts the form data into db
     */
    function submitPost(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const postText = formJson.postText;
        const newPost = {
            username: localStorage.getItem("username"),
            email: emailRef.current.value,
            comment: postText,
            date: Date.now().toString()
        }

        axios.post("http://34.94.97.122:8000/api/post", newPost).then((result) => {
            console.log(result);
            navigate("/jobs");
        }).catch((err) => {
            console.log(err);
        })
    

    }

    return(
        <div className="Submit-Post">
            <h3>Create A Job Post</h3>
            <form onSubmit={submitPost}>
            <label htmlFor="text">Listing Text:</label>
            <br></br>
            <textarea name="postText" rows={4} cols={40} required/>
            <br></br>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" ref={emailRef}  required></input>
            <br/>
            <input type="submit" value="Create"></input>
            </form>
        </div>
    )

}