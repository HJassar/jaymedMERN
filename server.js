const express = require("express");
const app = express();
const expressSession = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const enforce = require("express-sslify");
const cron = require("cron").CronJob;
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");



//CORS
app.use(cors());


// Models
const Question = require("./models/question");
const User = require("./models/user");

// Configuation
const port = process.env.PORT || 5000;
const ip = process.env.IP;
const db = process.env.DATABASEURL || "mongodb://localhost/jaymed-react";
const environment = process.env.NODE_ENV || "dev";

// Controllers
const seeds = require('./controllers/seeds');
seeds();

// Special for Dev Environment
if (environment == "dev") {
    require("dotenv").config();
    // Simulate loading
    const slowness = process.env.SLOWNESS || 0;
    let loadTime = slowness * 1000 * Math.random();
    app.use((req, res, next) => {
        setTimeout(() => {
            loadTime = slowness * 1000 * Math.random();
            next();
        }, loadTime);
    });
    app.get("/", (req, res) => {
        res.send("This page shows in dev mode only");
    });
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongoose connection
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("connected to: " + db);
    })
    .catch((err) => {
        console.log(err);
    });


//Passport Configuration
app.use(
    expressSession({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


// Define the routers
const questionAPI = require('./routes/questions');
const subjectAPI = require('./routes/subjects');
const cardAPI = require('./routes/cards');
const commentAPI = require('./routes/comments');
const userAPI = require('./routes/users');
const adminAPI = require('./routes/admin');
const authAPI = require('./routes/auth');

// Creating routes
app.use('/questions', questionAPI);
app.use('/subjects', subjectAPI);
app.use('/cards', cardAPI);
app.use('/comments', commentAPI);
app.use('/users', userAPI);
app.use('/admin', adminAPI);
app.use('/auth', authAPI)


// Redirect to React in non Dev environment
if (environment !== "dev") {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join("client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// Listening to the server
app.listen(port, ip, () => {
    console.log("Server running on port", port);
});
