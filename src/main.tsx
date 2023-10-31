import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';

import VConsole from 'vconsole';

// 开发环境时开启 Vconsole
if (import.meta.env.MODE === 'development') {
  new VConsole();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
