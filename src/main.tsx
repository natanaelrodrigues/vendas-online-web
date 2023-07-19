import './main.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { GlobalProvider } from './shared/hooks/useGlobalContext'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
)
