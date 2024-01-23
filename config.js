"use strict"
require("dotenv").config();
// App Config
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
const URL = `http://${process.env.HOST}:${process.env.PORT}`;
const PRODUCTION = process.env.PRODUCTION === "true" ? true : false;
const LOGGING = process.env.LOGGING === "true" ? true : false;
const DEBUG_MODE = process.env.DEBUG_MODE === "true" ? true : false;
const PROJECT_NAME = process.env.PROJECT_NAME;
const AUTH_LIFE_SPAN_VALUE = process.env.AUTH_LIFE_SPAN_VALUE
const AUTH_LIFE_SPAN_METRIC = process.env.AUTH_LIFE_SPAN_METRIC
const FORMS_CONFIG_REPOSITORY = `${process.env.FORMS_CONFIG_REPOSITORY}`
const firebaseConfig = {
    apiKey : process.env.API_KEY,
    AauthDomain : process.env.AUTH_DOMAIN,
    projectId : process.env.PROJECT_ID,
    storeageBucket : process.env.STORAGE_BUCKET,
    messengingSenderId : process.env.MESSAGING_SENDER_ID,
    appId : process.env.APP_ID
}
module.exports = {
    port: PORT,
    host: HOST,
    url : URL,
    firebaseConfig,
    production: PRODUCTION,
    logging: Boolean(LOGGING),
    debugMode: Boolean(DEBUG_MODE),
    projectName: PROJECT_NAME,
    authLifeSpanMetric: AUTH_LIFE_SPAN_METRIC,
    authLifeSpanValue: AUTH_LIFE_SPAN_VALUE,
    formsConfigRepository: FORMS_CONFIG_REPOSITORY
}
