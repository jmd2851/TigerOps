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

app.post("/event", async (req, res) => {
  const { name, description, starttime, endtime } = req.body;
  db.query(
    `INSERT INTO event (EventName, Description, EventStartTime, EventEndTime)
      VALUES ?, ?, ?, ?`,
    [name, description, starttime, endtime],
    function (err, results) {
      if (err) {
        res.status(500).send("Failed to create event.");
      } else {
        res.status(200).send("Successfully created an event.");
      }
    }
  );
});

app.get("/event/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  db.query(
    "SELECT * FROM Event WHERE EventID = ?",
    [id],
    function (err, results) {
      if (err) {
        res.status(500).send(`Unable to retrieve event with the id ${id}.`);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.put("/event/:id", async (req, res) => {
  const { name, description, starttime, endtime } = req.body;
  const id = parseInt(req.params.id);
  db.query(
    `UPDATE Event SET EventName = ?, EventStartDate = ?, EventEndDate = ? WHERE EventID = ?`,
    [name, starttime, endtime, id],
    function (err, results) {
      if (err) {
        res.status(500).send(`Unable to update event with the id ${id}.`);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.delete("/event/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  db.query(
    `DELETE FROM Event WHERE EventID = ?`,
    [id],
    function (err, results) {
      if (err) {
        console.log(err)
        res.status(500).send(`Unable to delete event with the id ${id}.`);
      } else {
        res.status(200).send(`Event deleted with ID: ${id}`);
      }
    }
  );
});

app.listen(consts.PORT, () => {
  console.log(`Express API listening on port ${consts.PORT}`);
});
