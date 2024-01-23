"use strict"
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const authService = require("../services/authService");

router.get(["/", "/home"], pageController.renderHome);
router.get("/about", pageController.renderAbout);
router.get("/products", pageController.renderProducts);
router.get("/location", pageController.renderLocation);
router.get("/cart", authService.authGuard, pageController.renderCart);
router.get("/login", pageController.renderLogIn);
router.get("/register", pageController.renderRegister);

module.exports = {
    routes: router
}