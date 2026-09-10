import './About.css';
import React, { useEffect, useState } from 'react';
import { useLang } from '../lang';

import imgGym from "../assets/dumbbell.svg";
import imgController from "../assets/controller.svg";
import imgAirplane from "../assets/airplane.svg";
import myImg from "../assets/me.webp";

const DownloadIcon = () => (
    <svg className="download-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
    </svg>
);

function About() {
    const { lang, t } = useLang();
    const [githubUser, setGithubUser] = useState(null);

    useEffect(() => {
        async function fetchGithubUser() {
            try {
                const res = await fetch('https://api.github.com/users/prenholatochris');
                const data = await res.json();
                // Rate-limited responses are 403 with a `message` field and no profile data.
                if (res.ok) setGithubUser(data);
            } catch (err) {
                console.error('Error fetching GitHub user info:', err);
            }
        }
        fetchGithubUser();
    }, []);

    const avatarUrl = githubUser?.avatar_url || myImg;
    const otherLang = lang === 'pt' ? 'en' : 'pt';

    // Every tile reads from the same response About already fetches for the avatar.
    const stats = githubUser && [
        { value: githubUser.public_repos, label: t.ui.stats.repos },
        { value: githubUser.followers, label: t.ui.stats.followers },
        { value: new Date(githubUser.created_at).getFullYear(), label: t.ui.stats.since },
    ];

    return (
        <div id='About' className="About">
            <div className="container">
                <h1>{t.ui.about.heading}</h1>
                <div className='topo'>
                    <img src={avatarUrl} alt={t.ui.about.photoAlt} className="profile-img" />
                    <div className="profile-info">
                        <h2>{t.ui.about.resume}</h2>
                        <p>
                            {t.about.resumeDescription}<br />
                            <br />
                            {t.about.technologiesDescription}
                        </p>

                        {stats && (
                            <div className="github-stats">
                                {stats.map(({ value, label }) => (
                                    <div key={label} className="stat">
                                        <strong>{value}</strong>
                                        <span>{label}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="profile-actions">
                            <a href={t.about.cvLinks[lang]} target="_blank" rel="noopener noreferrer" className="download-btn">
                                <DownloadIcon />
                                {t.ui.about.cvPrimary}
                            </a>
                            <a href={t.about.cvLinks[otherLang]} target="_blank" rel="noopener noreferrer" className="cv-alt-link">
                                {t.ui.about.cvOther}
                            </a>
                        </div>
                    </div>
                </div>
                <div className='baixo'>
                    <div className="timelines-container">
                        <div className="education">
                            <h2>{t.ui.about.education}</h2>
                            {t.about.education.map((edu, idx) => (
                                <div key={idx}>
                                    <h3>{edu.degree}</h3>
                                    <p>{edu.period}<br />{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                        <div className="experience">
                            <h2>{t.ui.about.experience}</h2>
                            {t.about.experience.map((exp, idx) => (
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
                            <h2>{t.ui.about.languages}</h2>
                            {t.about.languages.map((langItem, idx) => (
                                <React.Fragment key={idx}>
                                    <h3>{langItem.name}</h3>
                                    <p>{langItem.level}</p>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="interests">
                            <h2>{t.ui.about.interests}</h2>
                            <ul>
                                <li><img src={imgGym} alt={t.ui.about.gym} /></li>
                                <li><img src={imgController} alt={t.ui.about.gaming} /></li>
                                <li><img src={imgAirplane} alt={t.ui.about.travel} /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
