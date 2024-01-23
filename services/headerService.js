"use strict";
const settingsService = require("../services/settingsService");
const loggerService = require("./loggerService");
const authService = require("../services/authService");
const cookieService = require("../services/cookieService");
const { cookieEnum } = require("../enums/cookieEnum");
const { headerEnum } = require("../enums/headerEnum");
const AuthCookie = require("../models/authCookie");

// (async function settings() {
//     return await Promise.resolve(settingsService.get("settings"));
// }());

// SET HEADERS (With 'Authorization') BEFORE MAKING SERVER REQUEST
const set = async (req, res) => {
    try {
        let authCookie = cookieService.getAuth(req);
        if (!authCookie.timedOut) {
            if (authService.loggedIn()) {
                if (authService.tokenExpired(authCookie.token)) {
                    authCookie.token = await authService.getToken();
                    await cookieService.setAuth(req, res, authCookie.token);
                }
                if (cookieService.get(req, cookieEnum.Authorization)) {
                    req.headers[headerEnum.Authorization] = `Bearer ${req.cookies[cookieEnum.Authorization]}`
                    loggerService.log(`Authorization Header Is: ${req.headers[headerEnum.Authorization]}`)
                    loggerService.log(`Timestamp Header Is: ${req.cookies[cookieEnum.Timestamp]}`)
                }
            }
        } else {
            await authService.logOut(req, res);
        }
        return authCookie
    } catch (error) {
        loggerService.logError(error);
        return new AuthCookie("", "", false)
    }
}
const get = (req) => {
    const header = req?.headers[headerEnum.Authorization] ?? "Bearer NONE";
    return header.split(" ").length > 0 ? header.split(" ")[1] : ""
}
module.exports = {
    get,
    set
}