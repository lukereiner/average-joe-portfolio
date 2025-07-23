import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  return (
    <>
      <div className="welcome-page-background">
        <div className="title">
          <img src="src/images/title-page.png" alt="" id="avgJoeImg" />
          <Link to="/guide">
            <div className="startButton" id="welcomeButton">
              <div className="startButtonLabel">Begin</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Welcome;
