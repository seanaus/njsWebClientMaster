class ValidationError {
    constructor(
        isValid, 
        key, 
        value,
        message
    ) {
        this.isValid = isValid;
        this.key = key;
        this.value = value;
        this.message = `${key}${message}`
    }
}
module.exports = ValidationError