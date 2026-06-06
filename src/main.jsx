import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './HomePage/Home'
import NavBar from './NavBar/NavBar'
import About from './AboutPage/About'
import Skills from './SkillsPage/Skills'
import Projects from './ProjectPage/Projects'
import Contact from './ContactPage/Contact'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <NavBar />
    <Home />
    <About />
    <Skills />
    <Projects />
    <Contact />
  </>
  // </React.StrictMode>
)
