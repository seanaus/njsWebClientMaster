"use strict";
const authService = require("../services/authService");
const formsService = require("../services/formsService");
const formFieldEnum = require("../enums/formFieldEnum");

const register = async (req, res) => {
    const form = await formsService.validate(req);
    if (form?.isValid) {
        const accessToken = await authService.register(req, res);
        if (!authService.validateToken(accessToken)) {
            form.isValid = false;
            form.errorOverlay.name = formFieldEnum.email;
            form.errorOverlay.message = accessToken;
        }
    }
    if (form?.isValid) {
        res.redirect("/home");
    } else {
        formsService.pageRefresh(form, res)
    }
}
const logIn = async (req, res) => {
    const form = await formsService.validate(req);
    if (form?.isValid) {
        const accessToken = await authService.logIn(req, res);
        res.redirect("/home");
    } else {
        formsService.pageRefresh(form, res)
    }
}
const logOut = async (req, res) => {
    await authService.logOut(req, res);
    res.redirect("/home");
}
module.exports = {
    register,
    logIn,
    logOut
}