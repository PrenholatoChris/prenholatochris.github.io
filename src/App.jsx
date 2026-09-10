import { useEffect, useState } from 'react'
import NavBar from './NavBar/NavBar'
import Home from './HomePage/Home'
import About from './AboutPage/About'
import Skills from './SkillsPage/Skills'
import Projects from './ProjectPage/Projects'
import Contact from './ContactPage/Contact'
import Terminal from './Terminal/Terminal'

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)

  // The terminal is an easter egg with no visible entry point: type `sudo` anywhere
  // on the page and press Enter. Keystrokes aimed at a real field are ignored.
  useEffect(() => {
    let typed = ''
    const onKey = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target
      if (/^(input|textarea)$/i.test(el.tagName) || el.isContentEditable) return

      if (e.key === 'Enter') {
        if (typed.endsWith('sudo')) setTerminalOpen(true)
        typed = ''
        return
      }
      // Keep only the last few letters, so `xxsudo` still counts but nothing grows.
      if (e.key.length === 1) typed = (typed + e.key.toLowerCase()).slice(-4)
      else if (e.key !== 'Shift') typed = ''
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <NavBar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  )
}
