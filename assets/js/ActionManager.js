export default class ActionManager {
    constructor() {
        this.actions = [];
        this.balance = 0;
    }
    get(propName) {
        return this[propName];
    }
    set(propName, value) {
        this[propName] = value;
    }
    addAction(action) {
        this.actions.push(action);
        this.calcBalance();
    }
    deleteAction(id) {
        let indexToRemove = this.actions.findIndex((action) =>
            action.id == id)
        this.actions.splice(indexToRemove, 1);
        this.calcBalance();
    }
    updateAction(id, newAmount) {
        let indexToUpdate = this.actions.findIndex((action) => action.id == id)
        this.actions[indexToUpdate].amount = this.actions[indexToUpdate].type == "expense" ? -newAmount : newAmount;
        /* if (newAmount >= 0 && this.actions[indexToUpdate].type == "expense") this.actions[indexToUpdate].type = "income"; */ 
        this.calcBalance();
    }
    calcBalance() {
        this.balance = this.actions.reduce((total, action) => total + action.amount, 0);
        document.getElementById("balance").innerHTML = `Balance: ${this.balance}`;
    }
}