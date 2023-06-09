import {AboutMe} from "./components/about-me.js";
import {Home} from "./components/Home.js";
import {ResumeForm} from "./components/resume-form.js";
import {Navbar} from "./components/Navbar.js"
import {Signup} from "./components/Signup.js";
import {Route, Routes } from "react-router-dom";
import {Login} from "./components/Login.js";
import {Profiles} from "./components/Profiles.js";
import {ResumeUpdateForm} from "./components/resume-update.js"
import {ResumeView} from "./components/resume-view.js";
import {PostView} from "./components/post-view.js";
import { useNavigate } from "react-router-dom";
import {CreatePost} from "./components/create-post.js";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/aboutme" element={<AboutMe></AboutMe>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/resumeForm" element={<ResumeForm />} />
          <Route path="/resumeUpdate" element={<ResumeUpdateForm/>}/>
          <Route path="/profile" element={<Profiles onDeleteProfile={() => {
            
            navigate("/");
            window.location.reload();
          }}></Profiles>}></Route>
          <Route path="/viewResumes" element={<ResumeView></ResumeView>}></Route>
          <Route path="/jobs" element={<PostView></PostView>}></Route>
          <Route path="/createPost" element={<CreatePost></CreatePost>}></Route>
        </Routes>
      </div>
    );
  }

  export {App};
