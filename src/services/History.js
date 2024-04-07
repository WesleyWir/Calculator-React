
export default class HistoryService {
    operationsKey = 'operations_history';
    resultsKey = 'results_history';
    maxLenght = 12;

    async storeOperationInLocalStorage(firstValue, operation, secondValue, result) {
        const operationString = `${firstValue}${operation}${secondValue}`;
        await this.store(this.operationsKey, operationString);
        await this.store(this.resultsKey, result);
    }

    async store(key, payload) {
        const items = this.getHistoryStorage(key) ?? [];
        await this.validateHistoryLength();
        items.push(payload);
        this.setHistoryStorage(key, items);
    }

    async validateHistoryLength() {
        const keys = [this.operationsKey, this.resultsKey];
        for (const key of keys) {
            const items = this.getHistoryStorage(key);
            if (!items) continue;
            if (items.length > this.maxLenght) this.deleteFirstItemFromStorage(key);
        }
    }

    deleteFirstItemFromStorage(key) {
        const items = this.getHistoryStorage(key);
        items.shift();
        this.setHistoryStorage(key, items);
    }

    getOperationsHistory() {
        return this.getHistoryStorage(this.operationsKey) ?? [];
    }

    getResultsHistory() {
        return this.getHistoryStorage(this.resultsKey) ?? [];
    }

    getHistoryStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    async clearHistoryStorage() {
        const keys = [this.operationsKey, this.resultsKey];
        for (const key of keys) {
            this.setHistoryStorage(key, []);
        }
    }

    setHistoryStorage(key, data) {
        return localStorage.setItem(key, JSON.stringify(data));
    }
}
