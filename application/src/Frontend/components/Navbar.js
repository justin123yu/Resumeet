import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * @function Navbar
 * @description - this navbar represents the updated navbar when user is logged in/authenticated
 * @returns - navbar after authenticating user
 */
export function Navbar() {
  const [loggedIn, setLoggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = window.localStorage.getItem("username");
    if (data !== null) {
      setLoggedin(true);
    }
  }, []);

  /**
   * @function logout
   * @param {*} e 
   * @description - allows users to logout out of website 
   */
  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  }

  /**
   * @function isAuthenticate
   * @param {*} user 
   * @description - this function authenticates user and displays the appropriate navbar
   * @returns - authenticates user and displays the appropriate navbar
   */
  function isAuthenticate(user) {
    if (user === false) {
      return (
        <div className="nav-buttons">
          <NavLink to="/signup" className="signup-btn">
            Sign Up
          </NavLink>
          <NavLink to="/login" className="login-btn">
            Log In
          </NavLink>
        </div>
      );
    }
    if (user === true) {
      return (
        <div className="nav-buttons">
          <NavLink to="/profile" className="login-btn">
            My Profile
          </NavLink>
          <NavLink to="/resumeForm" className="login-btn">
            Build Resume
          </NavLink>
          <NavLink to="/createPost" className="login-btn">
            Create Post
          </NavLink>
          <button onClick={logout} className="login-btn">
            Logout
          </button>
        </div>
      );
    }
  }

  return (
    <nav>
      <div className="nav-logo">
        <NavLink to="/">ResuMeet</NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/viewResumes">View All Resumes</NavLink>
        </li>

        <li>
          <NavLink to="/jobs">Job Posts</NavLink>
        </li>
        <li>
          <NavLink to="/aboutme">About Me</NavLink>
        </li>
        <li>
          <NavLink to="/resumeUpdate">Update Resume</NavLink>
        </li>
      </ul>
      {isAuthenticate(loggedIn)}
    </nav>
  );
}
