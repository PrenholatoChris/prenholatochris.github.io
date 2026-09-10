import { createContext, useContext, useState, useEffect } from 'react'
import en from './data/profile.en.json'
import pt from './data/profile.pt.json'

export const locales = { en, pt }
const Ctx = createContext(null)

// localStorage throws (not returns null) in Safari private mode and with site data blocked.
const store = {
  get: () => { try { return localStorage.getItem('lang') } catch { return null } },
  set: v => { try { localStorage.setItem('lang', v) } catch { /* not fatal */ } },
}

const initialLang = () => {
  const saved = store.get()
  if (saved in locales) return saved
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    store.set(lang)
    document.documentElement.lang = lang
    document.title = locales[lang].ui.meta.title
    document.querySelector('meta[name="description"]')
      ?.setAttribute('content', locales[lang].ui.meta.description)
  }, [lang])

  return <Ctx.Provider value={{ lang, setLang, t: locales[lang] }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
