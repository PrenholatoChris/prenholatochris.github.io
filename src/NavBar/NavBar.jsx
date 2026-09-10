import './NavBar.css'
import { useEffect, useState } from 'react'
import { useLang } from '../lang'

const SECTIONS = ['Home', 'About', 'Skills', 'Projects', 'Contact']
const NAV_KEYS = { Home: 'home', About: 'about', Skills: 'skills', Projects: 'projects', Contact: 'contact' }

// Tracks which section owns the viewport so the nav underline follows the scroll.
function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    // A zero-height detection line at 45% viewport height: sections are contiguous, so
    // exactly one crosses it at a time. One callback per boundary instead of a burst of
    // ratio updates per section on every scroll tick.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find(e => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-45% 0px -55% 0px', threshold: 0 }
    )
    SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return active
}

function NavBar() {
    const { lang, setLang, t } = useLang()
    const active = useActiveSection()

    return (
        <nav className="NavBar">
            <div>
                <ul>
                    {SECTIONS.map(id => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={active === id ? 'active' : undefined}
                                aria-current={active === id ? 'true' : undefined}
                            >
                                {t.ui.nav[NAV_KEYS[id]]}
                            </a>
                        </li>
                    ))}

                    <li className="lang-switch" role="group" aria-label={t.ui.nav.language}>
                        {['pt', 'en'].map(code => (
                            <button
                                key={code}
                                type="button"
                                onClick={() => setLang(code)}
                                aria-pressed={lang === code}
                                className={lang === code ? 'active' : undefined}
                            >
                                {code.toUpperCase()}
                            </button>
                        ))}
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default NavBar
