import React from 'react';
import './../assets/scss/components/History.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faHistory } from '@fortawesome/free-solid-svg-icons'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    if (props.operationsHistory && !props.operationsHistory.length) { return '' };
    let historyItems = [];
    if (props.operationsHistory) {
        for (const [index, operation] of props.operationsHistory.entries()) {
            historyItems.push(
                <button className="button item" key={index}
                    onClick={() => props.pushFromHistory(operation)}
                >
                    <span><strong>{operation}<br /><span className='green-text'>={props.resultsHistory[index]}</span></strong></span>
                </button>
            )
        }
        historyItems = historyItems.reverse();
    }
    return (
        <div id="history">
            <div className="history-title">
                <h3><FontAwesomeIcon icon={faHistory} /> Histórico</h3>
            </div>
            <div className="history-values">{historyItems}</div>
            <div className="clear-history">
                <button className='button clear-history-button' onClick={e => props.clearHistory()}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Limpar Histórico
                </button>
            </div>
        </div>
    );
}