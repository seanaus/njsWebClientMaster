"use strict"
const authService = require("../services/authService");
const componentService = require("../services/componentService");
const settingsService = require("../services/settingsService");
const formsService = require("../services/formsService");
const formsRulesService = require("../services/formsRulesService");

const renderHome = async (req, res) => {
    res.render("pages/home", {
        title: (await settingsService.get("settings")).projectName,
        navBar: await componentService.get("navBar"),
        auth: authService.authUser(),
        url: req.url
    });
}
const renderAbout = async (req, res) => {
    res.render("pages/about", {
        title: (await settingsService.get("settings")).projectName,
        navBar: await componentService.get("navBar"),
        auth: authService.authUser(),
        url: req.url
    });
}
const renderLocation = async (req, res) => {
    res.render("pages/location", {
        title: (await settingsService.get("settings")).projectName,
        navBar: await componentService.get("navBar"),
        auth: authService.authUser(),
        url: req.url
    });
}
const renderProducts = async (req, res) => {
    res.render("pages/products", {
        title: (await settingsService.get("settings")).projectName,
        navBar: await componentService.get("navBar"),
        auth: authService.authUser(),
        url: req.url
    });
}
const renderCart = async (req, res) => {
    res.render("pages/cart", {
        title: (await settingsService.get("settings")).projectName,
        navBar: await componentService.get("navBar"),
        auth: authService.authUser(),
        url: req.url
    });
}
const renderLogIn = async (req, res) => {
    res.render("pages/logIn", {
        title: (await settingsService.get("settings")).projectName,
        navBar: await componentService.get("navBar"),
        auth: authService.authUser(),
        // url: req.url,
        form: await formsService.get(req.url, req?.query) ?? {}
    });
}
const renderRegister = async (req, res) => {
    try {
        res.render("pages/register", {
            title: (await settingsService.get("settings")).projectName,
            navBar: await componentService.get("navBar"),
            auth: authService.authUser(),
            // url: req.url,
            form: await formsService.get(req.url, req?.query) ?? {}
        });
    } catch (error) {
        console.log(error.description)
    }

}
module.exports = {
    renderHome,
    renderAbout,
    renderProducts,
    renderLocation,
    renderCart,
    renderRegister,
    renderLogIn
}