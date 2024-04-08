
export default class KeyboardService {
    _handleKeyDown = (event) => {
        const value = event.key;
        const isValid = ((this.isNumeric(value)) || (this.hasMathSymbols(value)))
        if(isValid) {
            console.log(value);
        }       
    }



    isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    hasMathSymbols(value) {
        const mathSymbolsRegex = /[+\-.*\/^()]/;        
        return mathSymbolsRegex.test(value);
    }

    isEnterOrDeleteKey(value) {
        return value === 'Enter' || value === 'Delete';
    }
}