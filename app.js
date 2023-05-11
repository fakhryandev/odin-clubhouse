var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
const clubhouseRouter = require("./routes/clubhouse");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const foundUser = await User.findOne({ username });

      if (!foundUser) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compareSync(password, foundUser.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, foundUser);
    } catch (error) {
      return done(null, false, { message: error });
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/members", authRouter);
app.use("/clubhouse", clubhouseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
