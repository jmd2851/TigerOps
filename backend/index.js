import * as consts from "./constants.js";

import express from "express";
import mysql from "mysql2";
import cors from "cors";
import cookieparser from "cookie-parser";
import sessions from "express-session";
import expressMysqlSession from "express-mysql-session";
import bcrypt from "bcryptjs";

const app = express();

const mysqlStore = expressMysqlSession(sessions);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

const db = mysql.createPool({
  host: consts.DBHOST,
  user: consts.DBUSER,
  password: consts.DBPASS,
  database: consts.DBNAME,
});

const sessionStore = new mysqlStore(
  {
    expiration: consts.SESSIONAGE,
    createDatabaseTable: true,
  },
  db
);

app.use(
  sessions({
    secret: consts.SESSIONSECRET,
    saveUninitialized: true,
    cookie: {
      maxAge: consts.SESSIONAGE,
      sameSite: "lax",
    },
    resave: false,
    store: sessionStore,
  })
);

app.use(cookieparser());

// Add admin account for testing only if it doesn't already exist
const adminEmail = "tigerops@test.com";

db.query(
  `SELECT * FROM User WHERE Email = ?`,
  [adminEmail],
  function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    if (results.length === 0) {
      // Admin account doesn't exist, so insert it
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err);
          return;
        }
        bcrypt.hash("tigerops", salt, (err, hash) => {
          if (err) {
            console.log(err);
            return;
          }
          db.query(
            `INSERT INTO User (FirstName, LastName, Email, Password, UserRole) VALUES (?, ?, ?, ?, ?)`,
            ["test", "test", adminEmail, hash, "admin"],
            function (err, results) {
              if (err) {
                console.log(err);
              }
            }
          );
        });
      });
    }
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({
      authenticated: true,
      user: req.session.user,
    });
  } else {
    res.send({
      authenticated: false,
    });
  }
});

app.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({
          status: "error",
          data: {},
          message: "Internal error ",
          err,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {},
          message: "Logout successful",
        });
      }
    });
  } else {
    res.status(400).json({
      status: "failed",
      data: {},
      message: "The user is not logged in",
    });
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM User where Email = ?",
    [email],
    function (err, result) {
      if (err) {
        res.status(500).json({
          status: "error",
          data: {},
          message: "Internal Error",
          err,
        });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].Password, (error, response) => {
          if (response) {
            req.session.user = result[0];
            res.status(200).json({
              status: "success",
              data: { user: req.session.user },
              message: "Successful Authentication",
            });
          } else {
            res.status(401).json({
              status: "failed",
              data: {},
              message: "Invalid Credentials",
              err,
            });
          }
        });
      }
    }
  );
});

app.listen(consts.PORT, () => {
  console.log(`Express API listening on port ${consts.PORT}`);
});
