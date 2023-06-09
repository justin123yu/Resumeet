import "./App.css";

/**
 * Illustrates the about me page of website
 * @function AboutMe
 * @description - shows the information of ResuMeet Team
 * @returns - team about me information
 */
export function AboutMe(){
    return (
        <div className="container">
          <div className="card">
            <img className="avatar" alt="" src="https://papik.pro/en/uploads/posts/2022-06/1654761931_42-papik-pro-p-cute-duck-drawing-46.png" />
            <h2 className="name">Joycelyn Chan</h2>
            <p className="bio">Scrum/Front End Support</p>
          </div>
  
          <div className="card">
            <img className="avatar" alt="" src="https://daily.jstor.org/wp-content/uploads/2022/07/bugs_bunny_scholarship_is_a_wascally_wesearch_wabbit_hole_1050x700.jpg" />
            <h2 className="name">Cristian Garcia</h2>
            <p className="bio">Front End Lead / Github Support</p>
          </div>
  
          <div className="card">
            <img className="avatar" alt="" src="https://cdn.discordapp.com/attachments/1072333796201996321/1077312827922059264/image0.jpg" />
            <h2 className="name">Justin Yu</h2>
            <p className="bio">Git Hub Master/ Back End</p>
          </div>
  
          <div className="card">
            <img className="avatar" alt="" src="https://www.w3schools.com/howto/img_avatar2.png" />
            <h2 className="name">Eduardo Loza</h2>
            <p className="bio">Back-End Lead</p>
          </div>
  
          <div className="card">
            <img className="avatar" alt="" src="https://www.w3schools.com/howto/img_avatar.png" />
            <h2 className="name">Marco Tinoco</h2>
            <p className="bio">Team Lead / Front End Support</p>
          </div>
  
          <div className="card">
            <img className="avatar" alt="" src="https://cdn.shopify.com/s/files/1/0017/7461/6627/collections/SpongeBob_SquarePants.jpg?v=1657679842" />
            <h2 className="name">Mason Tsai</h2>
            <p className="bio">Database / Webserver</p>
          </div>
        </div>
      );
}