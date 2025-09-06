import React, { useEffect, useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import myHeadshot from "../assets/images/headshot.jpg"; // match your actual file name/case

export default function Main() {
  /* -------- Hello World (type once) -------- */
  const helloText = "Hello World, I'm";
  const [helloTyped, setHelloTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const speed = 75;
    const timer = setInterval(() => {
      setHelloTyped(helloText.slice(0, i + 1));
      i++;
      if (i === helloText.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, []);

  /* -------- Rotating subtitle (type → pause → delete → next) -------- */
  const phrases = [
    "Aspiring Software Engineer",
    "ML Enthusiast",
    "Problem Solver",
    "Gamer",
    "Aspiring Data Scientist",
    "Crazy Soccer Fanatic",
  ];

  const TYPING_SPEED = 90;     // ms per character (typing)
  const DELETING_SPEED = 50;   // ms per character (deleting)
  const PAUSE_MS = 1200;       // pause after a full word before deleting

  const [index, setIndex] = useState(0);        // which phrase
  const [subIndex, setSubIndex] = useState(0);  // how many chars shown
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];

    // finished typing the whole word → pause → start deleting
    if (!isDeleting && subIndex === current.length) {
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_MS);
      return () => clearTimeout(pause);
    }

    // finished deleting → go to next word
    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, phrases]);

  const subtitle = phrases[index].slice(0, subIndex);

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={myHeadshot} alt="Avatar" />
        </div>

        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/yujisatojr" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/yujisato/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>

          {/* Terminal line: Hello World */}
          <div className="terminal-line">
            <span className="terminal-text">{helloTyped}</span>
          </div>

          {/* Name with your frosted pill styles */}
          <h1>Sohum Guha</h1>

          {/* Terminal line: rotating subtitle with terminal background */}
          <div className="terminal-line">
            <span className="terminal-text">{subtitle}</span>
            <span className="terminal-cursor">█</span>
          </div>

          <div className="mobile_social_icons">
            <a href="https://github.com/yujisatojr" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/yujisato/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}