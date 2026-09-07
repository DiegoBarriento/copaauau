import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode> // strictMOde faz com que a pagina de desenvolvimento runs mais de uma vez, a pagina deve rodar normalmente na aplicação padrão
    <App />
  </StrictMode>,
)
