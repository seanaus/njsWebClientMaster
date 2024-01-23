const ruleDefEnum = {
    isRequired : "isRequired",
    isEmail : "isEmail",
    isNumeric : "isNumeric",
    isText : "isText",
    isPassword : "isPassword",
    matchTo : "matchTo",
    min : "min",    // For min value use min rule and isNumeric rule, for isText min length will be enforced.
    max : "max"     // For max value use max rule and isNumeric rule, for isText max length will be enforced.
}
module.exports = ruleDefEnum