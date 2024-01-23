const FormsModel = require("../models/formsModel");
const FormsFieldModel = require("../models/formsFieldModel");
const FormsErrorOverlay = require('../models/formsErrorOverlay');
const config = require("../config");
const loggerService = require("./loggerService");
const formsRulesService = require("./formsRulesService");
const ruleDefEnum = require("../enums/ruleDefEnum");
const fs = require('fs');
const path = require('path');

const get = async (url, data, validate = false) => {
    try {
        const fileName = getFileNameFromUrl(url);
        if (fileName !== "") {
            let form = new FormsModel (
                fileName,
                data?.title,
                data?.key === undefined ? true : false,
                new FormsErrorOverlay (
                    data?.key, 
                    data?.value, 
                    data?.message
                )
            );
            const json = loadConfig(fileName);
            return await getFields(form, json.fields, data, validate);
        }
    } catch (error) {
        loggerService.logError(error);
        return {}
    }
}
const getFileNameFromUrl = (url) => {
    return url.split("?")[0].replace("/", "")
}
const getFields = async (form, config, data, validate) => {
    try {
        let index = -1;
        for (const [key, rules] of Object.entries(config)) {
            index++;
            // const value = data[key] ?? "";
            form.fields = [...form.fields, new FormsFieldModel(key, data[key] ?? "", rules)];
            if (form.isValid && validate) {
                form.errorOverlay = await formsRulesService.applyRules(form.fields, index);
                if (formsRulesService.ruleFailure(form?.errorOverlay?.message ?? "")) {
                    form.isValid = false;
                    break
                }
            }
        }
        return form
    } catch (error) {
        loggerService.logError(error);
        return {}
    }
}
const validate = async (req) => {
    return await get(req.url, req.body, true)
}
const pageRefresh = (form, res) => {
    let url = ""
    if (Array.isArray(form?.fields)) {
        form?.fields.forEach((field) => {
            if (formsRulesService.findRule(field?.rules, ruleDefEnum.isPassword) === undefined) {
                url += `&${field.name}=${field.value}`
            }
        })
    }
    url = `/${form?.name}?key=${form?.errorOverlay?.name}&message=${form?.errorOverlay?.message}${url}`
    res.redirect(url);
}
const loadConfig = (fileName) => {
    const file = config.formsConfigRepository + `${fileName}.json`
    try {
        const data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
        return JSON.parse(data);
    } catch (error) {
        loggerService.logError(error);
        return {}
    }
}
module.exports = {
    get,
    loadConfig,
    validate,
    pageRefresh
}