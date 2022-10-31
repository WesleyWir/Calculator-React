import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/main/Index.css';
import DisplayMode from './components/DisplayMode';
import Calculator from './views/Calculator';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <DisplayMode />
      <Calculator />
    </div>
  </React.StrictMode>
);

reportWebVitals();
