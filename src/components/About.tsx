import React from "react";
import "../assets/styles/About.scss";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2>About Me</h2>
        <p>
          I’m a Computer Science student at McGill University passionate about
          building intelligent, data-driven systems that bridge AI, software
          engineering, and real-world impact. I love experimenting with machine
          learning, optimization, and automation to create tools that make
          people’s lives easier and more insightful.
        </p>
        <p>
          Outside of coding, you’ll find me analyzing football stats,
          brainstorming product ideas, or perfecting my next side project.
        </p>
      </div>
    </section>
  );
}