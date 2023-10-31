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
      sameSite: "strict",
      httpOnly: true,
      secure: false,
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
  console.log(req.sessionID);
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
          message: `Internal error ${err}.`,
          err,
        });
      } else {
        res.clearCookie("connect.sid", {
          path: "/",
          domain: "localhost",
          sameSite: "strict",
          httpOnly: true,
          secure: false,
        });
        res.status(200).json({
          message: "Logout successful",
        });
      }
    });
  } else {
    res.status(400).json({
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
          message: `Internal Error $err`,
        });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].Password, (error, response) => {
          if (response) {
            req.session.user = result[0];
            res.status(200).json({
              user: req.session.user,
              message: "Successful Authentication",
            });
          } else {
            res.status(401).json({
              message: `Invalid Credentials ${err}`,
            });
          }
        });
      }
    }
  );
});

app.post("/events", async (req, res) => {
  const { name, description, starttime, endtime } = req.body;
  const sql =
    "INSERT INTO event (EventName, Description, EventStartTime, EventEndTime) VALUES ?, ?, ?, ?";
  db.query(
    sql,
    [name, description, starttime, endtime],
    function (err, results) {
      if (err) {
        return res.status(400).json({
          message: `Failed to create the event, ${err}`,
        });
      } else {
        return res.status(201).json({
          events: results,
          message: "Successfully created the event.",
          err,
        });
      }
    }
  );
});

// GET endpoint to retrieve an event by ID
app.get("/events/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM Event WHERE EventID = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(404).json({
        events: [],
        message: `Failed to find event ${id}: ${err}`,
      });
    }
    return res.status(200).json({
      events: results,
      message: `Successfully retrieved event with ID ${id}.`,
    });
  });
});

// PUT endpoint to update an event by ID
app.put("/events/:id", async (req, res) => {
  const { name, description, starttime, endtime } = req.body;
  const id = parseInt(req.params.id);
  const sql =
    "UPDATE Event SET EventName = ?, Description = ?, EventStartTime = ?, EventEndTime = ? WHERE EventID = ?";
  db.query(sql, [name, description, starttime, endtime, id], (err, results) => {
    if (err) {
      return res.status(400).json({
        events: [],
        message: `Failed to update event ${id}: ${err}`,
      });
    }
    return res.status(200).json({
      events: results,
      message: `Successfully updated event with ID ${id}.`,
    });
  });
});

// DELETE endpoint to delete an event by ID
app.delete("/events/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const sql = `DELETE FROM Event WHERE EventID = ?`;
  db.query(sql, [id], function (err, results) {
    if (err) {
      res.status(400).json({
        event: results,
        message: `Failed to delete event ${id}, ${err}`,
      });
    } else {
      res.status(200).json({
        events: [],
        message: `Successfully deleted event with ID ${id}`,
      });
    }
  });
});

// GET endpoint to retrieve events within a date range
app.get("/events", async (req, res) => {
  const { startdate, enddate } = req.query;
  const sql =
    "SELECT * FROM Event WHERE EventStartTime >= ? AND EventStartTime <= ?";
  if (!startdate || !enddate) {
    return res.status(400).json({
      events: [],
      message: "Both 'startdate' and 'enddate' query parameters are required.",
    });
  }
  db.query(sql, [startdate, enddate], (err, results) => {
    if (err) {
      return res.status(404).json({
        events: [],
        message: `Failed to find events within the date range, ${err}`,
      });
    }
    return res.status(200).json({
      events: results,
      message: `Successfully retrieved events within the specified date range.`,
    });
  });
});
app.listen(consts.PORT, () => {
  console.log(`Express API listening on port ${consts.PORT}`);
});
