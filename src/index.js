import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './component/App';
import { QuizzProvider } from './component/context/QuizzContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <QuizzProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QuizzProvider>
);
