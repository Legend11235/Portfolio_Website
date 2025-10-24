import React, { useEffect, useState, useMemo } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Main.scss";
import myHeadshot from "../assets/images/headshot.jpg";
import LetterGlitch from "./LetterGlitch";
import TextPressure from "./TextPressure";

export default function Main() {
  const helloText = "Hello World, I'm";
  const [helloTyped, setHelloTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setHelloTyped(helloText.slice(0, i + 1));
      i++;
      if (i === helloText.length) clearInterval(timer);
    }, 75);
    return () => clearInterval(timer);
  }, []);

  const phrases = useMemo(
    () => [
      "Aspiring Software Engineer",
      "ML Enthusiast",
      "Problem Solver",
      "Gamer",
      "Aspiring Data Scientist",
      "Crazy Soccer Fan",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const TYPING_SPEED = 90;
  const DELETING_SPEED = 50;
  const PAUSE_MS = 1200;

  useEffect(() => {
    const current = phrases[index];
    if (!isDeleting && subIndex === current.length) {
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_MS);
      return () => clearTimeout(pause);
    }
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
    <section id="home" className="main-section">
      {/* ✅ Glitch stays in the background but above page base */}
      <div className="glitch-layer">
        <LetterGlitch
          glitchColors={["#00ff55", "#00cc44", "#00aa33"]}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      <div className="about-section">
        <div className="image-wrapper">
          <img src={myHeadshot} alt="Avatar" />
        </div>

        <div className="content">
          <div className="social_icons">
            <div className="icon-bg">
              <a
                href="https://github.com/Legend112358"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon />
              </a>
            </div>
            <div className="icon-bg">
              <a
                href="https://www.linkedin.com/in/sohumguha/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div className="terminal-line">
            <span className="terminal-text">{helloTyped}</span>
          </div>

          <div
            style={{
              width: "100%",
              height: "250px",
              marginTop: "15px",
              marginBottom: "-45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <TextPressure
              text={"SOHUM_GUHA"}
              flex={true}
              alpha={false}
              stroke={true}
              width={true}
              weight={true}
              italic={true}
              textColor="#ccffcc"
              strokeColor="#00ff55"
              minFontSize={120}
            />
          </div>

          <div className="terminal-line">
            <span className="terminal-text">{subtitle}</span>
            <span className="terminal-cursor">█</span>
          </div>
        </div>
      </div>
    </section>
  );
}