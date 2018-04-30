const fs         = require('fs');
const path       = require('path');
const express    = require('express');
const routes     = require('./routes');
// const appConfig  = require("./config").config;
const bodyParser = require('body-parser');
// var multer     = require('multer');
const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'controllers')));

// routes(app);
app.use('/api', routes);

// app.listen(appConfig.port);

console.log("the app server run at port :%d in %s mode. ", 9091, app.settings.env);

module.exports = app;
