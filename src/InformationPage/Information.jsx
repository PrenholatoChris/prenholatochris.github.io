import './Information.css'
import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import profileData from '../data/profile.json';

function Information() {
  const [githubName, setGithubName] = useState("Christian Prenholato");

  useEffect(() => {
    async function fetchName() {
      try {
        const res = await fetch('https://api.github.com/users/prenholatochris');
        const data = await res.json();
        if (data.name) {
          setGithubName(data.name);
        }
      } catch (err) {
        console.error('Error fetching GitHub user info for name:', err);
      }
    }
    fetchName();
  }, []);

  function calculateAge(birthDate, otherDate) {
    birthDate = new Date(birthDate);
    otherDate = new Date(otherDate);
    var years = (otherDate.getFullYear() - birthDate.getFullYear());
    if (otherDate.getMonth() < birthDate.getMonth() ||
      otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
      years--;
    }
    return years;
  }
  const birthDate = new Date(profileData.birthDate)
  const todayDate = new Date(Date.now())
  const myAge = calculateAge(birthDate, todayDate)

  const messages = [`Hi I'm ${githubName}.`,
    `I'm ${myAge} years old`,
    `Developing ideas`,
  ]

  const [message, setMessage] = useState(messages[0])

  // Update message when githubName is fetched and messages array updates
  useEffect(() => {
    setMessage(messages[0]);
  }, [githubName]);

  const indexRef = useRef(0)
  const shuffle = useCallback(() => {
    let nextIndex = indexRef.current >= messages.length - 1 ? 0 : indexRef.current + 1;
    indexRef.current = nextIndex;

    let activeDot = document.getElementsByClassName("dot-on")[0]
    if (activeDot) {
      activeDot.className = "dot"
    }

    let dots = document.getElementsByClassName("dot")
    if (dots[nextIndex]) {
      dots[nextIndex].className = "dot dot-on"
    }

    setMessage(messages[nextIndex]);
  }, [messages]);


  useEffect(() => {
    const intervalID = setInterval(shuffle, 5000);
    return () => clearInterval(intervalID);
  }, [shuffle])



  return (
    <div onClick={shuffle} id='Information' className="Information">
      <div className='container'>


        <div>
          <span>{message}</span>
        </div>

        <div className='box'>
          {messages.map((_, i) => (
            <div key={i} className={i === 0 ? "dot dot-on" : "dot"}></div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Information
