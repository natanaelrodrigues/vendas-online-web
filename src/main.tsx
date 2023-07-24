import './main.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { GlobalProvider } from './shared/hooks/useGlobalContext'
import { DataProvider } from './shared/hooks/useDataContext copy';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </GlobalProvider>
)
