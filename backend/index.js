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
      name: "session",
      maxAge: consts.SESSIONAGE,
      sameSite: "lax",
      httpOnly: false,
    },
    resave: false,
    store: sessionStore,
  })
);

app.use(cookieparser());

// Add admin account for testing
bcrypt.genSalt(10, (err, salt) => {
  if (err) return next(err);
  bcrypt.hash("tigerops", salt, (err, hash) => {
    if (err) return;
    db.query(
      `INSERT IGNORE INTO User (FirstName, LastName, Email, Password, UserRole) VALUES (?, ?, ?, ?, ?)`,
      ["test", "test", "tigerops@test.com", hash, "admin"],
      function (err, results) {
        if (err) {
          console.log(err);
        }
      }
    );
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      status: "failed",
      data: [],
      message: "Insufficient Login Credentials Provided. ",
      err,
    });
  }
  db.query(
    "SELECT Password FROM user where Email = ?",
    [req.body.email],
    function (err, results) {
      if (err || !bcrypt.compare(results[0].Password, req.body.password)) {
        res.status(401).json({
          status: "failed",
          data: [],
          message: "Invalid Login Credentials. ",
          err,
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: [],
        message: "Successful Authentication",
      });
    }
  );
});

app.listen(consts.PORT, () => {
  console.log(`Express API listening on port ${consts.PORT}`);
});
