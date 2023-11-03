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
  `SELECT * FROM user WHERE Email = ?`,
  [adminEmail],
  function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    if (results.length === 0) {
      // Admin account doesn't exist, so insert it
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash("tigerops", salt, (err, hash) => {
          db.query(
            `INSERT INTO user (FirstName, LastName, Email, Password, UserRole) VALUES (?, ?, ?, ?, ?)`,
            ["test", "test", adminEmail, hash, "admin"]
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
          message: `Failed to log out, ${err}`,
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
    "SELECT * FROM user where Email = ?",
    [email],
    function (err, result) {
      if (err) {
        res.status(500).json({
          message: `Failed to login in, ${err}.`,
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
          }
        });
      } else {
        res.status(401).json({
          message: `Invalid Credentials ${err}`,
        });
      }
    }
  );
});

app.post("/events", async (req, res) => {
  const { name, description, startTime, endTime } = req.body;
  const sql =
    "INSERT INTO event (EventName, EventDescription, EventStartTime, EventEndTime) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [name, description, startTime, endTime],
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
  const sql = "SELECT * FROM event WHERE EventID = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(404).json({
        events: [],
        message: `Failed to find event ${id}, ${err}.`,
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
  const { name, description, startTime, endTime } = req.body;
  const id = parseInt(req.params.id);
  const sql =
    "UPDATE event SET EventName = ?, Description = ?, EventStartTime = ?, EventEndTime = ? WHERE EventID = ?";
  db.query(sql, [name, description, startTime, endTime, id], (err, results) => {
    if (err) {
      return res.status(400).json({
        events: [],
        message: `Failed to update event ${id}, ${err}`,
      });
    }
    return res.status(200).json({
      events: results,
      message: `Successfully updated event with ID ${id}`,
    });
  });
});

// DELETE endpoint to delete an event by ID
app.delete("/events/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const sql = `DELETE FROM event WHERE EventID = ?`;
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
  const { startTime, endTime } = req.query;
  const sql =
    "SELECT * FROM event WHERE EventStartTime >= ? AND EventStartTime <= ?";
  if (!startTime || !endTime) {
    return res.status(400).json({
      events: [],
      message: "Both 'startTime' and 'endTime' query parameters are required.",
    });
  }
  db.query(sql, [startTime, endTime], (err, results) => {
    if (err) {
      return res.status(404).json({
        events: [],
        message: `Failed to find events within the date range, ${err}`,
      });
    }
    return res.status(200).json({
      events: results,
      message: `Successfully retrieved events within the specified date range`,
    });
  });
});

app.post("/menus", (req, res) => {
  const { menuData, date } = req.body;
  const sql = "INSERT INTO menu (MenuData, Date) VALUES (?, ?)";
  db.query(sql, [JSON.stringify(menuData), date], (err, result) => {
    if (err) {
      return res.status(400).json({
        message: `Failed to create the menu: ${err}`,
      });
    }
    res.status(201).json({
      message: "Menu created successfully",
      menuId: result.insertId,
    });
  });
});

app.get("/menus", (req, res) => {
  const sql = "SELECT * FROM menu";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: `Failed to fetch menus: ${err}`,
      });
    }
    res.status(200).json(results);
  });
});

app.get("/menus/:menuId", (req, res) => {
  const menuId = req.params.menuId;
  const sql = "SELECT * FROM menu WHERE MenuID = ?";
  db.query(sql, [menuId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: `Failed to fetch the menu: ${err}`,
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        message: "Menu not found",
      });
    }
    res.status(200).json(results[0]);
  });
});

app.put("/menus/:menuId", (req, res) => {
  const menuId = req.params.menuId;
  const { data, date } = req.body;
  const sql = "UPDATE menu SET MenuData = ?, Date = ? WHERE MenuID = ?";
  db.query(sql, [JSON.stringify(data), date, menuId], (err, result) => {
    if (err) {
      return res.status(400).json({
        message: `Failed to update the menu: ${err}`,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Menu not found",
      });
    }
    res.status(200).json({
      message: "Menu updated successfully",
    });
  });
});

app.delete("/menus/:id", (req, res) => {
  const menuId = req.params.menuId;
  const sql = "DELETE FROM menu WHERE MenuID = ?";
  db.query(sql, [menuId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: `Failed to delete the menu: ${err}`,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Menu not found",
      });
    }
    res.status(200).json({
      message: "Menu deleted successfully",
    });
  });
});

app.get("/menus/date", (req, res) => {
  const { date } = req.query;
  const sql = "SELECT * FROM Menu WHERE Date = ?";
  db.query(sql, [date], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: `Failed to fetch menus on the date ${date}: ${err}`,
      });
    }
    res.status(200).json({
      message: `Menus on the date ${date} retrieved successfully`,
      menus: results,
    });
  });
});

app.post("/users", (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      message: "Email, password, first name, and last name are required",
    });
  }
  if (req.session.user && req.session.user.UserRole != "Admin") {
    return res
      .status(401)
      .json({ message: "Unauthorized to create a new user." });
  }
  db.query("SELECT * FROM user WHERE Email = ?", [email], (_, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    bcrypt.hash(password, 10, (_, hash) => {
      const sql =
        "INSERT INTO User (Email, Password, FirstName, LastName, UserRole) VALUES (?, ?, ?, ?, ?)";
      db.query(sql, [email, hash, firstName, lastName, role], (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: `Failed to create user ${err}` });
        }
        res.status(201).json({
          user: result.affectedRows[0],
          message: "Successfully created a new user",
        });
      });
    });
  });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: `Failed to retrieve user ${err}` });
    }
    res.status(201).json({
      users: results,
      message: "Successfully retrieved all new users",
    });
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params.id;
  if (req.session.user && req.session.user.UserRole != "Admin") {
    return res
      .status(401)
      .json({ message: "Unauthorized to create update users." });
  }

  db.query("SELECT * FROM user WHERE UserID = ?", [id], (err, results) => {
    const user = results[0];
    if (user.UserRole == "Admin") {
      return res
        .status(403)
        .json({ message: "Permission to edit an admin account denied." });
    }
  });
  const sql = "UPDATE user SET UserRole = ? WHERE UserId = ?";
  db.query(sql, [role, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: `Failed to update user ${err}` });
    }
    return res.status(200).json({
      user: result.affectedRows[0],
      message: `Successfully updated user with ID ${id}`,
    });
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params.id;
  if (req.session.user && req.session.user.UserRole != "Admin") {
    return res.status(401).json({ message: "Unauthorized to delete users." });
  }
  db.query("SELECT * FROM user WHERE UserID = ?", [id], (err, results) => {
    const user = results[0];
    if (user.UserRole == "Admin") {
      return res
        .status(403)
        .json({ message: "Permission to delete an admin account denied." });
    }
  });
  const sql = "DELETE FROM user WHERE UserId = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: `Failed to delete user ${err}` });
    }
    return res.status(200).json({
      message: `Successfully deleted user with ID ${id}`,
    });
  });
});

app.listen(consts.PORT, () => {
  console.log(`Express API listening on port ${consts.PORT}`);
});
