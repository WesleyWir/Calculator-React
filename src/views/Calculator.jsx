import React, { Component } from 'react';
import './../assets/scss/views/Calculator.scss';


import Button from '../components/Button';
import Display from '../components/Display';
import History from '../components/History';
import DisplayMode from '../components/DisplayMode';
import OperationFactory from '../services/OperationFactory';
import HistoryService from '../services/History';

const historyService = new HistoryService();
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState };

    componentDidMount() {
        document.title = "Calculator";
        this.refreshHistoryToState();
    }

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory() {
        this.setState({ ...initialState });
    }

    async clearHistory() {
        await historyService.clearHistoryStorage();
        this.refreshHistoryToState();
    }

    refreshHistoryToState() {
        this.setState({
            operationsHistory: historyService.getOperationsHistory(),
            resultsHistory: historyService.getResultsHistory()
        });
    }

    async setOperation(operation) {
        try {
            if (this.state.current === 0) {
                return this.setState({ operation, current: 1, clearDisplay: true });
            }

            const finish = operation === '=';
            const currentOperation = this.state.operation;
            const values = [...this.state.values];
            const firstValue = values[0];
            const secondValue = values[0];
            values[0] = (new OperationFactory()).executeOperation(values[0], values[1], currentOperation);
            const result = values[0];
            values[1] = 0;
            await historyService.storeOperationInLocalStorage(firstValue, currentOperation, secondValue, result);
            this.setState({
                displayValue: values[0],
                operation: finish ? null : operation,
                current: finish ? 0 : 1,
                clearDisplay: !finish,
                values,
            });
            this.refreshHistoryToState();
            console.log(this.state.resultsHistory)
        } catch (error) {
            console.error(error);
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) return;
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;
        this.setState({ displayValue, clearDisplay: false });
        if (n !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
        }
    }

    render() {
        let historyItems = []
        if (this.state.operationsHistory) {
            for (const [index, operation] of this.state.operationsHistory.entries()) {
                historyItems.push(
                    <button className="button item">
                        <span><strong>{operation}<br /><span className='green-text'>{this.state.resultsHistory[index]}</span></strong></span>
                    </button>
                )
            }
        }

        return (
            <main id="main">
                <div className="calculator">
                    <DisplayMode />
                    <Display firstValue={this.state.values[0]} secondValue={this.state.values[1]} value={this.state.displayValue} currentOperation={this.state.operation} />
                    <div className="calculator-buttons">
                        <Button label="AC" click={this.clearMemory} triple />
                        <Button label="/" click={this.setOperation} operation />
                        <Button label="7" click={this.addDigit} />
                        <Button label="8" click={this.addDigit} />
                        <Button label="9" click={this.addDigit} />
                        <Button label="*" click={this.setOperation} operation />
                        <Button label="4" click={this.addDigit} />
                        <Button label="5" click={this.addDigit} />
                        <Button label="6" click={this.addDigit} />
                        <Button label="-" click={this.setOperation} operation />
                        <Button label="1" click={this.addDigit} />
                        <Button label="2" click={this.addDigit} />
                        <Button label="3" click={this.addDigit} />
                        <Button label="+" click={this.setOperation} operation />
                        <Button label="0" click={this.addDigit} double />
                        <Button label="." click={this.addDigit} />
                        <Button label="=" click={this.setOperation} operation />
                    </div>
                </div>
                <History operationsHistory={this.state.operationsHistory} resultsHistory={this.state.resultsHistory} clearHistory={() => this.clearHistory()} />
            </main>
        )
    }
}