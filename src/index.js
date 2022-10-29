import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DisplayMode from './components/DisplayMode';
import Calculator from './main/Calculator';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <DisplayMode />
      <h1>Calculadora</h1>
      <Calculator />
    </div>
  </React.StrictMode>
);

reportWebVitals();
