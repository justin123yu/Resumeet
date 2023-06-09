import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profiles.css"

export function Profiles({onDeleteProfile}) {
  const [profile, setProfile] = useState({});
  const [text, setText] = useState("");
  const [resumes, setResumes] = useState([]);
  const [keywordInput, setKeywordInput] = useState(""); // New state for keyword input

  useEffect(() => {
    const username = window.localStorage.getItem("username");

    if (username) {
      axios.get(`http://34.94.97.122:8000/profile/${username}`).then((response) => {
        setProfile(response.data);
      });

      axios.get(`http://34.94.97.122:8000/api/resume/${username}`).then((response) => {
        setResumes(response.data);
      });
    }
  }, []);
  const navigate = useNavigate();
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();

    const username = window.localStorage.getItem("username");

    if (!username || !text) {
      return;
    }

    try {
      const response = await axios.post(`http://34.94.97.122:8000/api/resume`, {
        username: username,
        text: text,
        date: new Date(),
        filter: [],
      });

      console.log("Resume uploaded successfully:", response.data);

      // Fetch resumes for the profile
      const resumeResponse = await axios.get(`http://34.94.97.122:8000/api/resume/${username}`);
      setResumes(resumeResponse.data);

      setText("");
    } catch (error) {
      console.log("Error uploading resume:", error);
    }
  };
  const handleKeywordInputChange = (e) => {
    setKeywordInput(e.target.value);
  };
  const handleAddKeyword = async (resumeId) => {
    try {
      await axios.patch(`http://34.94.97.122:8000/api/resume/${resumeId}/add_keyword`, {
        keyword: keywordInput,
      });

      const resumeResponse = await axios.get(`http://34.94.97.122:8000/api/resume/${profile.username}`);
      setResumes(resumeResponse.data);

      setKeywordInput("");
    } catch (error) {
      console.log("Error adding keyword:", error);
    }
  }; 
  const handleRemoveKeyword = async (resumeId, keyword) => {
    try {
      await axios.patch(`http://34.94.97.122:8000/api/resume/${resumeId}/remove_keyword`, {
        keyword: keyword,
      });

      const resumeResponse = await axios.get(`http://34.94.97.122:8000/api/resume/${profile.username}`);
      setResumes(resumeResponse.data);
    } catch (error) {
      console.log("Error removing keyword:", error);
    }
  };
  const handleDelete = async (resumeId) => {
    try {
      await axios.delete(`http://34.94.97.122:8000/api/resume/${resumeId}`);
      console.log("Resume deleted successfully");

      // Fetch updated resumes for the profile
      const resumeResponse = await axios.get(
        `http://34.94.97.122:8000/api/resume/${profile.username}`
      );
      setResumes(resumeResponse.data);
    } catch (error) {
      console.log("Error deleting resume:", error);
    }
  };
  const handleDeleteProfile = async () => {
    const username = window.localStorage.getItem("username");

    if (!username) {
      return;
    }

    try {
      await axios.delete(`http://34.94.97.122:8000/api/profile/${username}`);
      console.log("Profile deleted successfully");

      onDeleteProfile();
      // Remove user data from local storage and navigate back to the home page
      window.localStorage.removeItem("username");
      navigate("/");
    } catch (error) {
      console.log("Error deleting profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="home-page">
      <h2>Your Profile</h2>
      <div className="profile-details">
        <p>
          <strong>Username: </strong>
          {profile.username}
        </p>
        <p>
          <strong>Email: </strong>
          {profile.email}
        </p>
        <p>
          <strong>Join Date: </strong>
          {profile.date}
        </p>
      </div>
      </div>
      <div className="resume-upload">
        <textarea value={text} onChange={handleTextChange}></textarea>
        <button onClick={handleUpload}>Upload Resume</button>
      </div>
      <div className="resumes">
        <h3>Your Resumes</h3>
        {resumes.length > 0 ? (
          resumes.map((resume) => (
            <div key={resume._id} className="resume">
              <h5>{resume.text}</h5>
              {/* Add keyword input and button */}
              <input
                className="keyword-input"
                value={keywordInput}
                onChange={handleKeywordInputChange}
                placeholder="Add a keyword"
              />
              <button onClick={() => handleAddKeyword(resume._id)}>Add Keyword</button>

              {/* Display keywords */}
              <div className="keywords">
                {resume.filter.map((keyword) => (
                  <div className="keyword" key={keyword}>
                    {keyword}
                    <button onClick={() => handleRemoveKeyword(resume._id, keyword)}>x</button>
                  </div>
                ))}
              </div>

              <button className="delete-resume" onClick={() => handleDelete(resume._id)}>
                Delete Resume
              </button>
            </div>
          ))
        ) : (
          <p>No resumes found.</p>
        )}
      </div>

      <div className="delete-profile">
        <button onClick={handleDeleteProfile}>Delete Profile</button>
      </div>
    </div>
  );
}
