
export default class KeyboardService {
    _handleKeyDown = (event, calculatorComponent) => {
        console.log(event)
        const value = event.key;
        const isEnter = (this.isEnterKey(value));
        const isNumeric = (this.isNumeric(value));
        const isMathSymbols = (this.isMathSymbols(value));
        const isValid = (isNumeric || isMathSymbols || isEnter)
        if (!isValid) {
            return;
        }
        if (isEnter) {
            return calculatorComponent.setOperation('=');
        }
        if (isNumeric) {
            return calculatorComponent.addDigit(value);
        }
        if (isMathSymbols) {
            return calculatorComponent.setOperation(value);
        }
    }



    isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    isMathSymbols(value) {
        const mathSymbolsRegex = /[+\-.*\/^()]/;
        return mathSymbolsRegex.test(value);
    }

    isEnterKey(value) {
        return value === "Enter";
    }

    isDeleteKey(value) {
        return value === "Delete";
    }

}