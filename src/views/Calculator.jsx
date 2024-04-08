import React, { Component } from 'react';
import './../assets/scss/views/Calculator.scss';


import Button from '../components/Button';
import Display from '../components/Display';
import History from '../components/History';
import DisplayMode from '../components/DisplayMode';
import OperationFactory from '../services/OperationFactory';
import HistoryService from '../services/History';
import KeyboardService from '../services/Keyboard';

const initialState = {
    displayValue: '0',
    previewResult: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState };

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.historyService = new HistoryService();
        this.keyboardService = new KeyboardService();
    }

    componentDidMount() {
        document.title = "Calculator";
        document.addEventListener("keydown", (e) => this.keyboardService._handleKeyDown(e));
        this.refreshHistoryToState();
    }

    clearMemory() {
        this.setState({ ...initialState });
    }

    async clearHistory() {
        await this.historyService.clearHistoryStorage();
        this.refreshHistoryToState();
    }

    async pushFromHistory(operation) {
        const valuesArray = operation.split(/[^\d]+/).filter(Boolean);
        const symbolArray = operation.split(/\d+/).filter(Boolean);
        operation = symbolArray[0] ?? null;
        const values = valuesArray.map(Number);
        const previewResult = (new OperationFactory()).executeOperation(values[0], values[1], operation);
        this.setState({ previewResult, operation, values });
        this.setOperation(operation);
    }

    refreshHistoryToState() {
        this.setState({
            operationsHistory: this.historyService.getOperationsHistory(),
            resultsHistory: this.historyService.getResultsHistory()
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
            await this.historyService.storeOperationInLocalStorage(firstValue, currentOperation, secondValue, result);
            this.setState({
                displayValue: values[0],
                operation: finish ? null : operation,
                current: finish ? 0 : 1,
                clearDisplay: !finish,
                values,
            });
            this.refreshHistoryToState();
        } catch (error) {
            console.error(error);
        }
    }

    previewResult() {
        const values = [...this.state.values];
        const currentOperation = this.state.operation;
        return (new OperationFactory()).executeOperation(values[0], values[1], currentOperation);
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
            this.setState({ values }, () => {
                const previewResult = this.previewResult();
                this.setState({ previewResult });
            });
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
                    <Display firstValue={this.state.values[0]} secondValue={this.state.values[1]} value={this.state.previewResult} currentOperation={this.state.operation} />
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
                <History
                    operationsHistory={this.state.operationsHistory}
                    resultsHistory={this.state.resultsHistory}
                    clearHistory={() => this.clearHistory()}
                    pushFromHistory={(operation) => this.pushFromHistory(operation)}
                />
            </main>
        )
    }
}