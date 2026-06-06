import React from 'react';
import './Skills.css';
import profileData from '../data/profile.json';

function Skills() {
  const skillCategories = profileData.skillCategories;

  return (
    <div id="Skills" className="Skills">
      <div className="container">
        <h1>SKILLS</h1>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skills-card">
              <h2>{category.title}</h2>
              <div className="skills-list">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
