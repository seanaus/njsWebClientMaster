"use strict";
const UserCredential = require("../models/userCredential");
const loggerService = require("./loggerService");
const userService = require("./userService");
const cookieService = require("./cookieService");
const firebaseErrors = require("../enums/firebaseErrorsEnum");
const ruleDefEnum = require("../enums/ruleDefEnum");
const formsRulesService = require("./formsRulesService");

const { admin } = require('../firebaseAdmin');
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getIdToken
} = require("firebase/auth");

const auth = getAuth();

const register = async (req, res) => {
    try {
        let user = {};
        user = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
        user = new UserCredential(JSON.parse(JSON.stringify(user.user)));
        user.setDisplayName(`${req.body.forename} ${req.body.surname}`);
        await cookieService.setAuth(req, res, user.stsTokenManager.accessToken);
        await userService.save(user);
        return user.stsTokenManager.accessToken
    } catch (error) {
        loggerService.logError(error);
        return error.code
    }
}
const logIn = async (req, res) => {
    try {
        let user = {};
        user = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        user = new UserCredential(JSON.parse(JSON.stringify(user.user)));
        await cookieService.setAuth(req, res, user.stsTokenManager.accessToken);
        if (await userService.update(user)) {
            return user.stsTokenManager.accessToken
        } else {
            return error.code
        }
    } catch (error) {
        loggerService.logError(error);
        return error.code
    }
}
const logOut = async (req, res) => {
    try {
        await signOut(auth);
        cookieService.clearAuth(req, res)
    } catch (error) {
        loggerService.logError(error);
    }
}
const tokenExpired = async (value) => {
    try {
        const cache = await admin.auth().verifyIdToken(value);
        loggerService.log(`New Access Token Aquired: ${value}`)
        return false
    } catch (error) {
        return true
    }
}
const getToken = async () => {
    if (loggedIn()) {
        return await getIdToken(auth.currentUser, true);
    } else {
        return ""
    }
}
const authUser = () => {
    return auth?.currentUser?.uid ?? ""
}
const loggedIn = () => {
    return auth?.currentUser?.uid === undefined ? false : true
}
const authGuard = async (req, res, next) => {
    const id = authUser();
    if (id === "") {
        return res.redirect("login");
    }
    next();
}
const validateToken = (code) => {
    let matched = false;
    if (code == firebaseErrors.claimsTooLarge) {
        matched = true;
    }
    if (code == firebaseErrors.emailAlreadyExists) {
        matched = true;
    }
    if (code == firebaseErrors.emailAlreadyInUse) {
        matched = true;
    }
    if (code == firebaseErrors.idTokenExpired) {
        matched = true;
    }
    if (code == firebaseErrors.idTokenRevoked) {
        matched = true;
    }
    if (code == firebaseErrors.insufficientPermission) {
        matched = true;
    }
    if (code == firebaseErrors.internalError) {
        matched = true;
    }
    if (code == firebaseErrors.invalidArgument) {
        matched = true;
    }
    if (code == firebaseErrors.invalidClaims) {
        matched = true;
    }
    if (code == firebaseErrors.invalidContinueUri) {
        matched = true;
    }
    if (code == firebaseErrors.invalidCreationTime) {
        matched = true;
    }
    if (code == firebaseErrors.invalidCredential) {
        matched = true;
    }
    if (code == firebaseErrors.invalidDisabledField) {
        matched = true;
    }
    if (code == firebaseErrors.invalidDisplayName) {
        matched = true;
    }
    if (code == firebaseErrors.invalidDynamicLinkDomain) {
        matched = true;
    }
    if (code == firebaseErrors.invalidEmail) {
        matched = true;
    }
    if (code == firebaseErrors.invalidEmailVerified) {
        matched = true;
    }
    if (code == firebaseErrors.invalidHashAlgorithm) {
        matched = true;
    }
    if (code == firebaseErrors.invalidHashBlockSize) {
        matched = true;
    }
    if (code == firebaseErrors.invalidHashDerivedKeyLength) {
        matched = true;
    }
    if (code == firebaseErrors.invalidHashKey) {
        matched = true;
    }
    if (code == firebaseErrors.invalidHashMemoryCost) {
        matched = true;
    }
    if (code == firebaseErrors.invalidHashParallelization) {
        matched = true;
    }
    if (code == firebaseErrors.invalidHashRounds) {
        matched = true;
    }
    if (code == firebaseErrors.invalidHashSaltSeparator) {
        matched = true;
    }
    if (code == firebaseErrors.invalidIUdToken) {
        matched = true;
    }
    if (code == firebaseErrors.invalidLastSignInTime) {
        matched = true;
    }
    if (code == firebaseErrors.invalidPageToken) {
        matched = true;
    }
    if (code == firebaseErrors.invalidPassword) {
        matched = true;
    }
    if (code == firebaseErrors.invalidPasswordHash) {
        matched = true;
    }
    if (code == firebaseErrors.invalidPasswordSalt) {
        matched = true;
    }
    if (code == firebaseErrors.invalidPhoneNumber) {
        matched = true;
    }
    if (code == firebaseErrors.invalidPhotoUrl) {
        matched = true;
    }
    if (code == firebaseErrors.invalidProviderData) {
        matched = true;
    }
    if (code == firebaseErrors.invalidProviderId) {
        matched = true;
    }
    if (code == firebaseErrors.invalidOauthResponsetype) {
        matched = true;
    }
    if (code == firebaseErrors.invalidSessionCookieDuration) {
        matched = true;
    }
    if (code == firebaseErrors.invalidUid) {
        matched = true;
    }
    if (code == firebaseErrors.invalidUserImport) {
        matched = true;
    }
    if (code == firebaseErrors.maximumUserCountExceeded) {
        matched = true;
    }
    if (code == firebaseErrors.missingAndroidPkgName) {
        matched = true;
    }
    if (code == firebaseErrors.missingContinueUri) {
        matched = true;
    }
    if (code == firebaseErrors.missingHashAlgorithm) {
        matched = true;
    }
    if (code == firebaseErrors.missingIosBundleId) {
        matched = true;
    }
    if (code == firebaseErrors.missingUid) {
        matched = true;
    }
    if (code == firebaseErrors.missingOauthClientSecret) {
        matched = true;
    }
    if (code == firebaseErrors.operationNotAllowed) {
        matched = true;
    }
    if (code == firebaseErrors.phoneNumberAlreadyExists) {
        matched = true;
    }
    if (code == firebaseErrors.projectNotFound) {
        matched = true;
    }
    if (code == firebaseErrors.reservedClaims) {
        matched = true;
    }
    if (code == firebaseErrors.sessionCookieExpired) {
        matched = true;
    }
    if (code == firebaseErrors.sessionCookieRevoked) {
        matched = true;
    }
    if (code == firebaseErrors.uidAlreadyExists) {
        matched = true;
    }
    if (code == firebaseErrors.unauthorizedContinueUri) {
        matched = true;
    }
    if (code == firebaseErrors.userNotFound) {
        matched = true;
    }
    return !matched
}
module.exports = {
    register,
    logIn,
    logOut,
    authUser,
    authGuard,
    tokenExpired,
    getToken,
    loggedIn,
    validateToken
}
