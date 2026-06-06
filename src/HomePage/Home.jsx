import React, { useState, useEffect } from 'react';
import './Home.css';
import Information from '../InformationPage/Information';
import profileData from '../data/profile.json';

function Home() {
  const titles = profileData.homeTitles;
  const [currentText, setCurrentText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = titles[titleIndex];

    if (!isDeleting && charIndex < activeWord.length) {
      // Type next character
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 100);
    } else if (!isDeleting && charIndex === activeWord.length) {
      // Finished typing: wait, then start deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && charIndex > 0) {
      // Delete character
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 50);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting: move to next word
      setIsDeleting(false);
      setTitleIndex(prev => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <div id='Home' className="home">
      <h1>
        STILL<br />
        <span className="typed-text">{currentText}</span>
        <span className="typed-cursor">|</span>
      </h1>
      {/* <Information /> */}
    </div>
  );
}

export default Home;
