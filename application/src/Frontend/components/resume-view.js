import axios from "axios"
import { useEffect, useState } from "react"
import "./resume-view.css"
export function ResumeView() {
  
  let [resume, setResume] = useState([]);
  let [filteredResume, setFilteredResume] = useState([]);
  let [keywords, setKeywords] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let [keywordValue, setKeywordValue] = useState("");


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get('http://34.94.97.122:8000/api/resume').then((res) => {
      setResume(res.data);
    })
  }

  const searchBar = (event) => {
    event.preventDefault();
    const searchValue = event.target.value.toLowerCase();
    setSearchValue(searchValue);
  };

  const keywordSearch = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const keyword = event.target.value.toLowerCase();
      let updatedKeywords = [...keywords];
  
      if (keyword && !updatedKeywords.includes(keyword)) {
        updatedKeywords.push(keyword);
      }
      setKeywords(updatedKeywords);
      setKeywordValue(""); // Clear input field by setting the state to an empty string only when Enter is pressed
    }
  };
  
  const handleInputChange = (event) => {
    setKeywordValue(event.target.value.toLowerCase()); // Allow typing in the box
  };

  const removeKeyword = (keyword) => {
    const updatedKeywords = keywords.filter(kw => kw !== keyword);
    setKeywords(updatedKeywords);
  };



  useEffect(() => {
    let filteredResumes = resume;
  
    // Filter resumes by keywords
    if (keywords.length > 0) {
      filteredResumes = filteredResumes.filter(resume => {
        return resume.filter && Array.isArray(resume.filter) && keywords.some(kw =>
          resume.filter.map(filter => filter.toLowerCase()).includes(kw)
        );
      });
    }
  
    // Further filter resumes by search value
    if (searchValue.length > 0) {
      filteredResumes = filteredResumes.filter(resume => {
        const filtersMatch =
          resume.filter &&
          Array.isArray(resume.filter) &&
          resume.filter.some(filter =>
            filter.toLowerCase().includes(searchValue)
          );
        const textMatch = resume.text
          ? resume.text.toLowerCase().includes(searchValue)
          : false;
        return filtersMatch || textMatch;
      });
    }
  
    setFilteredResume(filteredResumes);
  }, [searchValue, keywords, resume]);

  
  




  function resumeDisplay(x) {
    return (
      <div className="Resumes-Grid">
        {x.map((element) => {
          return (
            <div key={element._id} className="resume-container">
              <h2 className="resume-username">{element.username}</h2>
              <p className="resume-text">{element.text}</p>
              <div className="resume-filters">
                {element.filter.map((filter, index) => (
                  <span key={index} className="resume-filter-item">{filter.trim()}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }


  return (
    <div>
      <h1 className="heading">View Resumes</h1>
  
      <input
        type="text"
        placeholder="Search Here"
        onChange={searchBar}
      />
  
  <input
  type="text"
  placeholder="Search by Keyword"
  value={keywordValue}
  onChange={handleInputChange}
  onKeyDown={keywordSearch}
/>
  
      <div className="keyword-container">
        {keywords.map((kw, index) => (
          <div key={index} className="keyword">
            {kw}
            <button onClick={() => removeKeyword(kw)}>x</button>
          </div>
        ))}
      </div>
  
      {resumeDisplay(filteredResume)}
    </div>
  );


}
