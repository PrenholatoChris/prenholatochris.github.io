import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LangProvider } from './lang'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LangProvider>
    <App />
  </LangProvider>
)
