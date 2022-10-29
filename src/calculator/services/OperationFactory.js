import { Addition, Subtraction, Multiplication, Division } from './Operations';

export default class OperationFactory {
    executeOperation(firstValue, secondValue, operation = '+'){
        let operationClass = this.getOperationClass(operation);
        return operationClass.execute(firstValue, secondValue);
    }

    getOperationClass(operation){
        switch (operation) {
            case '+':
                return new Addition();
            case '-':
                return new Subtraction();
            case '*':
                return new Multiplication();
            case '/':
                return new Division();
            default:
                return new Addition();
        }
    }
}