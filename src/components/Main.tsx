import React, { useEffect, useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';

function Main() {
  // Typewriter state
  const fullText = "Hello World, I'm";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const speedMs = 75; // typing speed
    const timer = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(timer);
    }, speedMs);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img
            src="https://my-aws-assets.s3.us-west-2.amazonaws.com/portfolio-img/avatar_circle.jpeg"
            alt="Avatar"
          />
        </div>

        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/yujisatojr" target="_blank" rel="noreferrer">
              <GitHubIcon/>
            </a>
            <a href="https://www.linkedin.com/in/yujisato/" target="_blank" rel="noreferrer">
              <LinkedInIcon/>
            </a>
          </div>

          {/* Terminal-style typing line above your name */}
          <div className="terminal-line" aria-label="typed hello world">
            <span className="terminal-text">{typed}</span>
            <span className="terminal-cursor" aria-hidden="true">█</span>
          </div>

          <h1>Sohum Guha</h1>
          <p>Full Stack Engineer</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/yujisatojr" target="_blank" rel="noreferrer">
              <GitHubIcon/>
            </a>
            <a href="https://www.linkedin.com/in/yujisato/" target="_blank" rel="noreferrer">
              <LinkedInIcon/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;