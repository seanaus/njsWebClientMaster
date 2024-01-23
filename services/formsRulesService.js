// const config = require("../config");
const loggerService = require("../services/loggerService");
// const fs = require('fs');
// const path = require('path')
const emailValidator = require('deep-email-validator');
const formNames = require("../enums/formNameEnum");
const formFields = require("../enums/formFieldEnum");
const ruleDefinitions = require("../enums/ruleDefEnum");
const Rule = require("../models/rule");
const ErrorOverlay = require("../models/formsErrorOverlay");

// const rulesIsRequired = " is a required field";
// const rulesIsNumeric = " should be a numeric field";
// const rulesIsText = " should be a text field";
// const rulesIsPassword = " should be alpha numeric";
// const rulesIsEmail = " invalid email"
// const rulesMinValue = " should be >= ${min}";
// const rulesMaxValue = " should be <= ${max}";
// const rulesMinLength = " should be min ${min} chars";
// const rulesMaxLength = " should be max ${max} chars";
// const rulesMatchTo = " does not match ${matchTo}";
const rulesEmptyString = "";

// const load = (fileName) => {
//     const file = config.formsConfigRepository + `${fileName}.json`
//     try {
//         const data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
//         return JSON.parse(data);
//     } catch (error) {
//         loggerService.logError(error);
//         return {}
//     }
// }
const get = (config, FieldName) => {
    let item = config.fields.filter((field) => {
        return field === FieldName
    })
}
const applyRules = async (fields, index) => {
    let errorOverlay = new ErrorOverlay("", "", "");
    try {
        let message = rulesEmptyString;
        for (const rule of fields[index]?.rules) {
            message = await applyRule(fields, index, rule);
            if (ruleFailure(message)) {
                errorOverlay.name = fields[index]?.name;
                errorOverlay.value = fields[index]?.value;
                errorOverlay.message = message;
                break;
            }
        }
    } catch (error) {
        loggerService.logError(error);
    }
    return errorOverlay
}
const applyRule = async (fields, index, rule) => {
    switch (rule.name) {
        case ruleDefinitions.isRequired:
            return isRequired(fields, index, rule)
        case ruleDefinitions.isNumeric:
            return isNumeric(fields, index, rule)
        case ruleDefinitions.isText:
            return isText(fields, index, rule)
        case ruleDefinitions.isPassword:
            return await isPassword(fields, index, rule)
        case ruleDefinitions.isEmail:
            return await isEmail(fields, index, rule)
        case ruleDefinitions.min:
            return min(fields, index, rule)
        case ruleDefinitions.max:
            return max(fields, index, rule)
        case ruleDefinitions.matchTo:
            return matchTo(fields, index, rule)
        default:
            return rulesEmptyString
    }
}
const isRequired = (fields, index, rule) => {
    return fields[index].value === rulesEmptyString ? rule.message : rulesEmptyString;
};
const isNumeric = (fields, index, rule) => {
    return typeof fields[index].value !== "number" ? rule.message : rulesEmptyString;
};
const isText = (fields, index, rule) => {
    return typeof fields[index].value !== 'string' && Object.prototype.toString.call(fields[index].value) !== '[object String]' ? rule.message : rulesEmptyString;
};
const isPassword = (fields, index, rule) => {
    return typeof fields[index].value !== 'string' && Object.prototype.toString.call(fields[index].value) !== '[object String]' ? rule.message : rulesEmptyString;
};
const isEmail = async (fields, index, rule) => {
    const options = {
        email: fields[index].value,
        sender: value,
        validateRegex: true,
        validateMx: true,
        validateTypo: true,
        validateDisposable: true,
        validateSMTP: false,
    }
    const { valid, reason, validators } = await emailValidator.validate(options);
    return !valid ? rule.message : rulesEmptyString
};
const min = (fields, index, rule) => {
    if (typeof fields[index].value === 'number') {
        return fields[index].value < rule?.value ? rule.message.replace("${min}", rule?.value) : rulesEmptyString
    } else {
        return fields[index].value?.length < rule?.value ? rule.message.replace("${min}", rule?.value) : rulesEmptyString
    }
};
const max = (fields, index, rule) => {
    if (typeof fields[index].value === 'number') {
        return fields[index].value > rule?.value ? rule.message.replace("${max}", rule?.value) : rulesEmptyString
    } else {
        return fields[index].value?.length > rule?.value ? rule.message.replace("${max}", rule?.value) : rulesEmptyString
    }
};
const matchTo = (fields, index, rule) => {
    const matchToField = fields.filter((field) => { return field.name === rule.value.toString() });
    const value = Array.isArray(matchToField) ? matchToField[0].value : "";
    return fields[index].value.toString() !== value.toString() ?
        rule.message.replace("${matchTo}", rule?.value) : rulesEmptyString
};
const ruleFailure = (message) => {
    return message === rulesEmptyString ? false : true;
};
const findRule = (rules, name) => {
    return rules.find(rule => {
        return rule.name === name
    })
}
module.exports = {
    get,
    // load,
    findRule,
    applyRules,
    ruleFailure
}
