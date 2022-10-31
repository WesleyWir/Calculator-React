import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/views/Index.scss';
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
