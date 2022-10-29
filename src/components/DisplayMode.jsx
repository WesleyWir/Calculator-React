import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import './../assets/css/components/DisplayMode.css';

export default props =>
    <div className="display-mode">
        <button class="light-theme-button active"><span class="icon"><FontAwesomeIcon icon={faSun} /></span></button>
        <button class="dark-theme-button"><span class="icon"><FontAwesomeIcon icon={faMoon} /></span></button>
    </div>