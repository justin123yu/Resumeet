import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./post-view.css"

/**
 * @function PostView
 * @description - this function allows users to use search bar and filter the data presented
 * @returns - a search bar where users are allowed to query for data
 */
export function PostView() {
  let [post, setPost] = useState([]);
  let [filterPost, setfilterPost] = useState([]);


    useEffect(() => {
      fetchData();
    }, []);
    
    /**
     * @async fetchData
     * @description - gets data from api and sets posts
     */
    const fetchData = async () => {
      await axios.get("http://34.94.97.122:8000/api/post").then((res) => {
        setPost(res.data);
      });
    };

  const navigate = useNavigate();

    /**
     * searchBar
     * @description - filters search bar
     * @param {*} event 
     */
    const searchBar = (event) => {
      event.preventDefault();
      if (event.target.value.length > 0) {
        let filter = post.filter(function (user) {
          return user.username.includes(event.target.value);
        });
        setfilterPost(filter);
      } else {
        setfilterPost(post);
      }
    };

    function tailorResume(comment) {
      navigate("/resumeUpdate", { state: { comment } });
    }

  /**
   * postDisplay
   * @param {*} x 
   * @description - shows job post information 
   * @returns - jobs posts and the information of the user who uploaded the post
   */
  function postDisplay(x) {
    if (x.length === 0) {
      x = post;
    }
    return (
      <div className="Post-Grid">
        {x.map((element) => {
          return (
            <div key={element._id}>
              <h2>{element.username}</h2>
              <h4>{element.date}</h4>
              <p>{element.comment}</p>
              <p>{element.email}</p>
              <button onClick={() => tailorResume(element.comment)}>
              Tailor Resume
            </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <h1 className="heading">Job Posts</h1>
      <input
        type="text"
        placeholder="Search Here"
        onChange={searchBar}
      ></input>
      {postDisplay(filterPost)}
    </div>
  );
}