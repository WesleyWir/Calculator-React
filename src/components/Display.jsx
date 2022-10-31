import React from 'react';
import './../assets/css/components/Display.css';


export default props =>
    <div className="display">
        <div className="values">{props.firstValue} { props.currentOperation } { props.currentOperation ? props.secondValue : ''}</div>
        <div className="result">{props.value}</div>
    </div>