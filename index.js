const express=require("express");
const app=express();

require('dotenv').config();

const passport=require("./config/passport");
const session = require('express-session');
const routes=require("./routes");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.use(routes);

app.use('/assets', express.static('assets'));
app.use('/static', express.static('static'));

app.listen(process.env.PORT, (e) => {
    if(e)
    console.log(`Error initializing web server ${e}`);
    else
    console.log(`Listening on port ${process.env.PORT}`);
});