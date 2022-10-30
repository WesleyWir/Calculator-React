import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import './../assets/css/components/DisplayMode.css';

export default class DisplayMode extends Component {
    constructor(props) {
        super(props);
        this.darkThemeButton = React.createRef();
        this.lightThemeButton = React.createRef();
        this.activeLightTheme = this.activeLightTheme.bind(this);
        this.activeDarkTheme = this.activeDarkTheme.bind(this);
    }

    activeLightTheme = (event) => {
        this.darkThemeButton.current.classList.remove('active');
        this.lightThemeButton.current.classList.add('active');
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }
    activeDarkTheme = (event) => {
        this.lightThemeButton.current.classList.remove('active');
        this.darkThemeButton.current.classList.add('active');
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    }

    render() {
        return (
            <div className="display-mode">
                <button className="light-theme-button active" ref={this.lightThemeButton} onClick={this.activeLightTheme}><span className="icon"><FontAwesomeIcon icon={faSun} /></span></button>
                <button className="dark-theme-button" ref={this.darkThemeButton} onClick={this.activeDarkTheme}><span className="icon"><FontAwesomeIcon icon={faMoon} /></span></button>
            </div>
        )
    }
}    