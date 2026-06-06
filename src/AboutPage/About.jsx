import './About.css';
import React, { useEffect, useState } from 'react';
import profileData from '../data/profile.json';

import imgGym from "../assets/dumbbell.svg";
import imgController from "../assets/controller.svg";
import imgAirplane from "../assets/airplane.svg";
import myImg from "../assets/me.jpg";

import curriculo_pt from "../assets/CHRISTIAN_CV_PT.pdf";
import curriculo_en from "../assets/CHRISTIAN_CV_EN.pdf";

function About() {
    const [githubUser, setGithubUser] = useState(null);

    useEffect(() => {
        async function fetchGithubUser() {
            try {
                const res = await fetch('https://api.github.com/users/prenholatochris');
                const data = await res.json();
                setGithubUser(data);
            } catch (err) {
                console.error('Error fetching GitHub user info:', err);
            }
        }
        fetchGithubUser();
    }, []);

    const avatarUrl = githubUser?.avatar_url || myImg;
    const displayName = githubUser?.name || "Christian Prenholato";

    return (
        <div id='About' className="About">
            <div className="container">
                <h1>ABOUT ME</h1>
                <div className='topo'>
                    <img src={avatarUrl} alt={`A photo of ${displayName}`} className="profile-img" />
                    <div className="profile-info">
                        <h2>Resume</h2>
                        <p>
                            {profileData.about.resumeDescription}<br />
                            <br />
                            {profileData.about.technologiesDescription}
                        </p>
                        <div className="profile-actions">
                            <a href={curriculo_pt} download="Christian_Prenholato_CV.pdf" className="download-btn">
                                <svg className="download-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
                                </svg>
                                Portuguese Resume
                            </a>
                            <a href={curriculo_en} download="Christian_Prenholato_CV.pdf" className="download-btn">
                                <svg className="download-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
                                </svg>
                                English Resume
                            </a>
                        </div>
                        {/* <div className="profile-actions">
                        </div> */}
                    </div>
                </div>
                <div className='baixo'>
                    <div className="timelines-container">
                        <div className="education">
                            <h2>Education</h2>
                            {profileData.about.education.map((edu, idx) => (
                                <div key={idx}>
                                    <h3>{edu.degree}</h3>
                                    <p>{edu.period}<br />{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                        <div className="experience">
                            <h2>Experience</h2>
                            {profileData.about.experience.map((exp, idx) => (
                                <div key={idx}>
                                    <h3>{exp.role}</h3>
                                    <p><strong>{exp.type}</strong><br />
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="info-cards-container">
                        <div className="languages">
                            <h2>Languages</h2>
                            {profileData.about.languages.map((lang, idx) => (
                                <React.Fragment key={idx}>
                                    <h3>{lang.name}</h3>
                                    <p>{lang.level}</p>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="interests">
                            <h2>Interests</h2>
                            <ul>
                                <li><img src={imgGym} alt="Gym" /></li>
                                <li><img src={imgController} alt="Gaming" /></li>
                                <li><img src={imgAirplane} alt="Travel" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
