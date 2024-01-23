const fs = require('fs');
const path = require('path');
// DONT USE settingsService AS IT USES THIS SERVICE (WILL CAUSE CIRCULAR DEPENDANCy)
const config = require("../config");
const logFile = "log.csv";

const logError = (err) => {
    if (config.logging) {
        const line = [
            `ERROR,${csvText(err.code)},${getDateTime('GB')} \n`,
            `ERROR,${csvText(err.message)},${getDateTime('GB')} \n`
        ]
        line.forEach((item) => {
            if (!config.debugMode) {
                logToFile(logFile, item);
            } else {
                console.log(item);
            }
        })
    }
}
const log = (message) => {
    const line = `INFO,${csvText(message)},${getDateTime('GB')} \n`;
    if (config.logging) {
        if (!config.debugMode) {
            logToFile(logFile, line);
        } else {
            console.log(line)
        }
    }

}
const logToFile = (file, data) => {
    return fs.appendFile(file, data, err => {
        if (err) {
            console.log(err)
            return false
        } else {
            return true
        }
    })
}
const getDateTime = (timeZone = "UTC") => {
    return new Date().toLocaleString('en-GB', { timeZone: timeZone })
}
const csvText = (text) => {
    if (text !== undefined && text !== null) {
        text = text.replace(",", "");
        text = text.replace(/\s+/g, ' ').trim();
        return text
    } else {
        return ""
    }
}
module.exports = {
    logError,
    log,
    logToFile
}