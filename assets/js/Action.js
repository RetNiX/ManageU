export default class Action {
    constructor(type, description, amount) {
        this.id = Math.floor(Math.random() * 1001); /* generate a random num from 0 to 1000 included */
        this.type = type;
        this.description = description;
        this.amount = type == "expense" ? -amount : amount;
    }
    get(propName) {
        return this[propName];
    }
    set(propName, value) {
        this[propName] = value;
    }
}