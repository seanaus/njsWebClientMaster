"use strict";
const loggerService = require("./loggerService");
const app = require("../firebaseApp");
const User = require("../models/user");
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
} = require("firebase/firestore");

const db = getFirestore();
const getAll = async () => {
    let userArray = [];
    try {
        const colRef = collection(db, "users");
        const snapshot = await getDocs(colRef);
        snapshot.forEach(doc => {
            const user = new User({
                id: doc.data().id,
                email: doc.data().email,
                emailVerified: doc.data().emailVerified,
                displayName: doc.data().displayName,
                created: doc.data().created,
                modified: doc.data().modified
            })
            userArray = [...userArray, user]
        })
    } catch (error) {
        loggerService.logError(error);
    }
    return userArray
}
const get = async (id) => {
    const docRef = doc(db, "users", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
        const data = snapshot.data();
        return new User({
            id: data.id,
            email: data.email,
            emailVerified: data.emailVerified,
            displayName: data.displayName,
            created: data.created,
            modified: data.modified
        })
    } else {
        return new User({
            id: "-1",
            email: "",
            emailVerified: false,
            displayName: "",
            created: "",
            modified: ""
        })
    }
}
const save = async (user) => {
    try {
        const docRef = doc(db, "users", user.id);
        await setDoc(docRef, {
            id: user.id,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.providerData[user.providerData.length - 1].displayName ?? "",
            created: new Date(+user?.createdAt).toLocaleString() ?? "",
            modified: new Date(+user?.lastLoginAt).toLocaleString() ?? ""
        });
        return true
    } catch (error) {
        loggerService.logError(error);
        return false
    }
}
const update = async (user) => {
    try {
        const docRef = doc(db, "users", user.id);
        await setDoc(docRef, {
            modified: new Date(+user?.lastLoginAt).toLocaleString() ?? ""
        },
            {
                merge: true
            })
        return true
    } catch (error) {
        loggerService.logError(error);
        return false
    }
}
module.exports = {
    getAll,
    get,
    save,
    update
}