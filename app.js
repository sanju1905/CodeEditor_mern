const express=require("express");
const expressLayouts=require("express-ejs-layouts");
const cookieParser=require('cookie-parser')
const session=require('express-session')
const flash=require('connect-flash')

const app=express()
const port=process.env.POST || 3001;
require('dotenv').config();
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cookieParser('CookingBlogSecure'));
const fileUpload = require("express-fileupload");
// app.use(session({
//     secret:"CookingBlogSecretSession",
//     resave:true,
//     //saveUninitializes:true
// }))
app.use(flash());
app.use(fileUpload());

app.set('layout','./layouts/main');
app.set('view engine','ejs');

const routes=require('./server/routes/recipeRoutes.js');

app.use('/',routes);

app.listen(port,()=>
    {
        console.log(`Server is running ${port}`)
    });