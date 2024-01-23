class formsFieldModel {
    constructor(name, value, rules) {
        this.name = name ?? "";
        this.value = value ?? "";
        this.rules = rules?? [];
    }
}
module.exports = formsFieldModel