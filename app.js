"use strict"
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const app = express();
const cookieParser = require('cookie-parser');
const config = require("./config");
const authRoute = require("./routes/authRoute");
const pageRoute = require("./routes/pageRoute");
const handlebars = require("express-handlebars");
const generalHelper = require('./lib/helpers/hbs/generalHelper');
const navBarHelper = require('./lib/helpers/hbs/navBarHelper');
const validationHelper = require('./lib/helpers/hbs/validationHelper');
const headerService = require('./services/headerService');
const cors = require('cors');

const hbs = handlebars.create({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials',
    helpers: {
        ifCond: generalHelper.ifCond,
        setUp: navBarHelper.setUp,
        isSelected: navBarHelper.isSelected,
        errorOverlaySource: validationHelper.errorOverlaySource,
        fieldType: validationHelper.fieldType,
        setValue: validationHelper.setValue,
        errorOverlayLabel: validationHelper.errorOverlayLabel
    },
})

app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public/favicon/", "favicon.ico")));

app.use(async (req, res, next) => {
    await headerService.set(req, res);
    next();
});

app.use(
    "/matIcon/",
    express.static(
        path.join(__dirname, "node_modules/material-design-icons/iconfont")
    )
);
app.use(
    "/matIconFix/",
    express.static(
        path.join(__dirname, "node_modules/@fontsource/material-icons")
    )
);

app.use("/", authRoute.routes);
app.use("/", pageRoute.routes);

app.listen(config.port, () => {
    console.log(`App listening on ${config.port}.......`);
});