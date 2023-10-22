import * as consts from "./constants.js";

import express from "express";
import mysql from "mysql2";
import cors from "cors";
import cookieparser from "cookie-parser";
import sessions from "express-session";
import expressMysqlSession from "express-mysql-session";

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

const db = mysql.createConnection({
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(500).json({ error: "Invalid Login Credentials. ", err });
  }
  db.query(
    "SELECT Password, FirstName, LastName FROM user where Email = ?",
    [req.body.email],
    function (err, results) {
      if (err || results[0].Password != req.body.password) {
        res.status(500).json({ error: "Invalid Login Credentials. ", err });
      } else {
        res.status(200).json({
          message: "Successful Authentication",
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
          status: "failed",
          data: {},
          message: `Failed to create the event, ${err}`,
        });
      } else {
        return res.status(201).json({
          status: "success",
          data: {},
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
        status: "failed",
        data: {},
        message: `Failed to find event ${id}: ${err}`,
      });
    }
    return res.status(200).json({
      status: "success",
      data: { event: results[0] },
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
        status: "failed",
        data: {},
        message: `Failed to update event ${id}: ${err}`,
      });
    }
    return res.status(200).json({
      status: "success",
      data: { event: results[0] },
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
        status: "error",
        data: { events: results },
        message: `Failed to delete event ${id}, ${err}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {},
        message: `Successfully deleted event with ID ${id}`,
      });
    }
  });
});

// GET endpoint to retrieve events within a date range
app.get("/events", async (req, res) => {
  const { startdate, enddate } = req.query;
  const sql =
    "SELECT * FROM Event WHERE EventStartTime >= ? AND EventEndTime <= ?";
  if (!startdate || !enddate) {
    return res.status(400).json({
      status: "failed",
      data: {},
      message: "Both 'startdate' and 'enddate' query parameters are required.",
    });
  }
  db.query(sql, [startdate, enddate], (err, results) => {
    if (err) {
      return res.status(404).json({
        status: "failed",
        data: {},
        message: `Failed to find events within the date range, ${err}`,
      });
    }
    return res.status(200).json({
      status: "success",
      data: { events: results },
      message: `Successfully retrieved events within the specified date range.`,
    });
  });
});

app.listen(consts.PORT, () => {
  console.log(`Express API listening on port ${consts.PORT}`);
});
