"use strict";
const app = require("../firebaseApp");
const Settings = require("../models/settings");
const config = require("../config");
const loggerService = require("./loggerService");
const { 
    getFirestore, 
    collection, 
    getDocs,
    getDoc,
    onSnapshot, 
    addDoc,
    setDoc,
    deleteDoc, 
    doc, 
    query, 
    where,
} = require ("firebase/firestore");

const db = getFirestore();

const get = async(id) => {

    try {
        const docRef = doc(db, "project", id);
        const docSnap  = await getDoc(docRef);
        if(docSnap.exists()) {
            return new Settings(
                id,
                docSnap.data().projectName ?? config.projectName,
                docSnap.data().production ?? config.production,
                docSnap.data().authLifeSpanMetric ?? config.authLifeSpanMetric,
                docSnap.data().authLifeSpanValue ?? config.authLifeSpanValue
            )
        }
    } catch(error) {
        loggerService.logError(error);
        return new Settings(
            id, 
            config.projectName, 
            config.production, 
            config.authLifeSpanMetric, 
            config.authLifeSpanValue
        )
    }

}
const authLifeSpan = async() => {

    const toHours = 3600000;
    const toMinutes = 60000;
    const toSeconds = 1000;
    
    const settings = await get("settings");

    if(settings.authLifeSpanMetric.toUpperCase() === "H") {
        return settings.authLifeSpanValue * toHours
    }
    if(settings.authLifeSpanMetric.toUpperCase() === "M") {
        return settings.authLifeSpanValue * toMinutes
    }
    if(settings.authLifeSpanMetric.toUpperCase() === "S") {
        return settings.authLifeSpanValue * toSeconds
    }
    if(settings.authLifeSpanMetric.toUpperCase() === "MS") {
        return settings.authLifeSpanValue;
    }
}
// const verify = () => {
//     return true
// }
// const loggedIn = () => {
//     return true
// }
module.exports = {
    get,
    authLifeSpan
    // loggedIn,
    // verify
}