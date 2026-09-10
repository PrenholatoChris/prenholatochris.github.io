import React from 'react';
import './Skills.css';
import { useLang } from '../lang';

function Skills() {
  const { t } = useLang();

  return (
    <div id="Skills" className="Skills">
      <div className="container">
        <h1>{t.ui.skills.heading}</h1>
        <div className="skills-grid">
          {t.skillCategories.map((category, index) => (
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
