import './Terminal.css'
import { useEffect, useRef, useState } from 'react'
import { useLang, locales } from '../lang'

export default function Terminal({ open, onClose }) {
  const { lang, setLang, t } = useLang()
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const returnFocusRef = useRef(null)

  const term = t.ui.terminal
  const print = (...out) => setLines(prev => [...prev, ...out.flat()])

  function run(raw) {
    const line = raw.trim()
    print({ echo: line })
    if (!line) return

    const [cmd, ...args] = line.toLowerCase().split(/\s+/)

    switch (cmd) {
      case 'help':
        return print(term.help)
      case 'whoami':
        return print(t.about.resumeDescription, '', t.about.technologiesDescription)
      case 'cv':
        print(term.cv)
        return window.open(t.about.cvLinks[lang], '_blank', 'noopener,noreferrer')
      case 'skills':
        return print(t.skillCategories.map(c => `${c.title}: ${c.skills.join(', ')}`))
      case 'projects':
        print(term.projectsMsg)
        onClose()
        return document.getElementById('Projects')?.scrollIntoView({ behavior: 'smooth' })
      case 'contact':
        return print(
          term.contactMsg,
          `  ${t.contact.email}`,
          `  ${t.contact.githubUrl}`,
          `  ${t.contact.linkedinUrl}`,
        )
      case 'lang': {
        const next = args[0]
        if (!(next in locales)) return print(term.langUsage)
        setLang(next)
        // Confirm in the language just switched to, not the one we're leaving.
        return print(locales[next].ui.terminal.langSwitched)
      }
      case 'clear':
        return setLines([])
      case 'exit':
        return onClose()
      default:
        return print(`${term.notFound} ${cmd}`, term.tryHelp)
    }
  }

  useEffect(() => {
    if (!open) return
    returnFocusRef.current = document.activeElement
    setLines(prev => (prev.length ? prev : [term.hint]))
    inputRef.current?.focus()

    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      returnFocusRef.current?.focus?.()
    }
  }, [open, onClose, term.hint])

  // Keep the newest output in view.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  if (!open) return null

  return (
    <div className="terminal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="terminal" role="dialog" aria-modal="true" aria-label={term.title}>
        <div className="terminal-header">
          <div className="terminal-header-buttons">
            <button type="button" className="red" onClick={onClose} aria-label="close" />
            <span className="yellow" />
            <span className="green" />
          </div>
          <span className="terminal-title">{term.title}</span>
        </div>

        <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {lines.map((l, i) =>
            typeof l === 'object'
              ? <p key={i} className="echo"><span className="prompt">{term.prompt}</span> {l.echo}</p>
              : <p key={i}>{l || ' '}</p>
          )}

          <form
            className="terminal-input-row"
            onSubmit={e => { e.preventDefault(); run(input); setInput('') }}
          >
            <span className="prompt">{term.prompt}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              aria-label={term.inputLabel}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
