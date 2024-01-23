"use strict"
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.logIn);
router.get("/logout", authController.logOut);
router.post("/register", authController.register);

module.exports = {
    routes: router
}