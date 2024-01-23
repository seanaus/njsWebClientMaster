const { initializeApp } = require ("firebase/app");
const config = require("./config");

const app = initializeApp(config.firebaseConfig);

module.exports = {
    app
}