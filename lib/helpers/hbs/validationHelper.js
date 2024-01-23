"use strict";
const ruleDefEnum = require("../../../enums/ruleDefEnum");
const formsRuleService = require("../../../services/formsRulesService");

const errorOverlaySource = (key, find = "") => {
    return key === find ? "formsErrorOverlaySource" : ""
}
const errorOverlayLabel = (key, find = "") => {
    return key === find ? "formsErrorOverlayLabelOn" : ""
}
const fieldType = (rules) => {
    if(formsRuleService.findRule(rules, ruleDefEnum.isNumeric)) {
        return "number"
    }
    if(formsRuleService.findRule(rules, ruleDefEnum.isPassword)) {
        return "password"
    }
    if(formsRuleService.findRule(rules, ruleDefEnum.isText)) {
        return "text"
    }
    return "text"
}
const setValue = (form, key) => {
    return form?.fields.find((field) => {
        return field?.name === key
    })?.value
}
module.exports = {
    errorOverlaySource,
    errorOverlayLabel,
    setValue,
    fieldType
}