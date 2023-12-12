const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.POST || 3002;
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cookieParser('CookingBlogSecure'));
app.use('/video', express.static(__dirname + '/video'));
app.use('/code', express.static(__dirname + '/code'));

const fileUpload = require("express-fileupload");
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
