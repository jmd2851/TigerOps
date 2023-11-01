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

// PUT endpoint for updating configuration items
app.put("/config", async (req, res) => {
  const { name, value } = req.query;
  const sql = "UPDATE config SET Name = ?, Value = ? WHERE Name = ?";
  db.query(sql, [name, value, name], (err, results) => {
    if (err) {
      return res.status(400).json({
        config: [],
        message: `Failed to update configuration item with name ${name} and value ${value}`
      });
    }
    return res.status(200).json({
      config: results,
      message: `Successfully updated configuration item ${name}`
    });
  });
});

// GET endpoint for retreiving configuration items
app.get("/config", async (req, res) => {
  
  const { name } = req.query;
  // Retrieve all configuration items if no name is specified
  if (!name) {
    const sql = "SELECT * FROM config";
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(404).json({
          config: [],
          message: `Failed to get configuration, ${err}`,
      });
    }
    return res.status(200).json({
        config: results,
        message: `Successfully retreived configuration.`
    });
  });
  } else {
    const sql = "SELECT * FROM config WHERE Name = ?";
    db.query(sql, [name], (err, results) => {
      if (err) {
        return res.status(400).json({
          config: [],
          message: `Failed to get configuration with name ${name}, ${err}`
        });
      }
      return res.status(200).json({
        config: results,
        message: `Successfully retreived configuration with name ${name}`
      })
    });
  }
});

app.listen(consts.PORT, () => {
  console.log(`Express API listening on port ${consts.PORT}`);
});
