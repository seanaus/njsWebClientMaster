const AuthCookie = require("../models/authCookie");
const settingsService = require("../services/settingsService");
const loggerService = require("./loggerService");
const { cookieEnum } = require("../enums/cookieEnum");

const get = (req, _name) => {
    return req?.cookies !== undefined ? _name in req.cookies ? true : false : false
}
const set = (res, _name, value, options) => {
    try {
        res.cookie(_name, value, options)
        return true
    } catch (error) {
        loggerService.logError(error);
        return false
    }
}
const getAuth = (req) => {

    let auth = new AuthCookie("", "", false);
    let count = -1;

    if (get(req, cookieEnum.Authorization)) {
        auth.Authorization = req.cookies[cookieEnum.Authorization] ?? "";
        count++
    }
    if (get(req, cookieEnum.Timestamp)) {
        auth.timestamp = req.cookies[cookieEnum.Timestamp] ?? "";
        count++
    }

    if (count < 0 || new Date().valueOf() > new Date(auth.timestamp).valueOf()) auth.timedOut = true;

    return auth
}
const setAuth = async (req, res, value) => {
    // CREATE AUTH COOKIES - Authorization HOLDS THE CURRENT ACCESS TOKEN
    //                     - Timestamp HOLDS THE EXPIRY DATE OF Authorization COOKIE
    //                     - options : COOKIE OPTIONS FOR FILE CREATION
    //                     - SET VALUE OF TIMESTAMP COOKIE TO EXPIRY DATE OF Authorization COOKIE
    try {
        const options = await authOptions(req);
        if(set(res, cookieEnum.Authorization, value, options));
            set(res, cookieEnum.Timestamp, options.expires.toString(), options);
        return true
    } catch (error) {
        loggerService.logError(error);
        return false
    }
}
const clearALL = (req, res) => {
    for (cookie in req.cookies) {
        clear(req, res, cookie)
    }
}
const clear = (req, res, _name) => {
    if (get(req, _name)) {
        res.clearCookie(_name);
    }
}
const clearAuth = (req, res) => {
    if (get(req, cookieEnum.Authorization)) {
        res.clearCookie(cookieEnum.Authorization);
    }
    if (get(req, cookieEnum.Timestamp)) {
        res.clearCookie(cookieEnum.Timestamp);
    }
}
const authOptions = async (req) => {
    let options = {
        expires: "0",
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }
    try {
        // IF ALREADY LOGGED IN USE TIMESTAMP COOKIE FOR EXPIRES VALUE, THIS IS THE EXPIRY DATE SET DURING THE LOGIN PROCESS
        // IF USER LOGGED IN FOR LONGER THAN ACCESS TOKENS LIFE SPAN A NEW TOKEN IS CREATED AND THE Authorization COOKIE RECREATED
        // Expires DATE OF Authorization COOKIE IS SET TO VALUE OF TIMESTAMP COOKIE 
        if (get(req, cookieEnum.Timestamp)) {
            options["expires"] = new Date(req.cookies[cookieEnum.Timestamp])
        } else {
            // NO TIMESTAMP COOKIE MEANS ITS A LOGIN ATTEMPT SO CALCULATE EXPIRES VALUE
            options["expires"] = new Date(Date.now() + await settingsService.authLifeSpan())
        }
    } catch (error) {
        loggerService.logError(error);
    }
    return options
}
module.exports = {
    get,
    set,
    getAuth,
    setAuth,
    clear,
    clearALL,
    clearAuth,
    authOptions
}