import * as consts from "./constants.js";

import express from "express";
import mysql from "mysql2";
import cors from "cors";
import cookieparser from "cookie-parser";
import sessions from "express-session";
import expressMysqlSession from "express-mysql-session";
import bcrypt from "bcryptjs";

import multer from "multer";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = "./public/images/";

const fileFilter = (req, file, cb) => {
  if (fs.existsSync(path.join(UPLOAD_DIR, file.originalname))) {
    cb(null, false);
    return;
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

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

app.use(express.static("public"));

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

app.post("/events", upload.single("image"), async (req, res) => {
  const {
    name,
    description,
    startTime,
    endTime,
    imagePath,
    imageAlt,
    isVisible,
  } = req.body;
  const sql =
    "INSERT INTO event (EventName, EventDescription, EventStartTime, EventEndTime, IsVisible, ImagePath, ImageAlt) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      name,
      description,
      startTime,
      endTime,
      parseInt(isVisible),
      imagePath,
      imageAlt,
    ],
    function (err, results) {
      if (err) {
        try {
          fs.unlinkSync(path.join(UPLOAD_DIR, imagePath));
        } catch (err) {}
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
app.put("/events/:id", upload.single("image"), async (req, res) => {
  const {
    name,
    description,
    startTime,
    endTime,
    isVisible,
    imagePath,
    imageAlt,
    oldImagePath,
  } = req.body;
  const id = parseInt(req.params.id);
  const sql =
    "UPDATE event SET EventName = ?, EventDescription = ?, EventStartTime = ?, EventEndTime = ?, IsVisible = ?, ImagePath = ?, ImageAlt = ? WHERE EventID = ?";
  db.query(
    sql,
    [
      name,
      description,
      startTime,
      endTime,
      parseInt(isVisible),
      imagePath,
      imageAlt,
      id,
    ],
    (err, results) => {
      if (err) {
        return res.status(400).json({
          events: [],
          message: `Failed to update event ${id}, ${err}`,
        });
      }
      if (oldImagePath != imagePath) {
        try {
          fs.unlinkSync(path.join(UPLOAD_DIR, oldImagePath));
        } catch (err) {}
      }
      return res.status(200).json({
        events: results,
        message: `Successfully updated event with ID ${id}`,
      });
    }
  );
});

// DELETE endpoint to delete an event by ID
app.delete("/events/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const getEventImagePathSQL = `SELECT ImagePath FROM event WHERE EventID = ?`;
  const deleteEventSQL = `DELETE FROM event WHERE EventID = ?`;
  db.query(getEventImagePathSQL, [id], function (err, results) {
    if (err || results.length === 0) {
      return res.status(400).json({
        message: `Failed to fetch event ${id} or event not found: ${err}`,
      });
    }
    const imagePath = results[0].ImagePath;
    db.query(deleteEventSQL, [id], function (err, deleteResult) {
      if (err) {
        return res.status(400).json({
          message: `Failed to delete event ${id}: ${err}`,
        });
      }
      if (imagePath) {
        try {
          fs.unlinkSync(path.join(UPLOAD_DIR, imagePath));
        } catch (err) {}
      }
      return res.status(200).json({
        events: [],
        message: `Successfully deleted event with ID ${id}`,
      });
    });
  });
});

// GET endpoint to retrieve events within a date range
app.get("/events", async (req, res) => {
  const { startTime, endTime } = req.query;
  const sql =
    "SELECT * FROM event WHERE EventStartTime BETWEEN ? AND ? OR EventStartTime BETWEEN ? AND ?";
  if (!startTime || !endTime) {
    return res.status(400).json({
      events: [],
      message: "Both 'startTime' and 'endTime' query parameters are required.",
    });
  }
  db.query(sql, [startTime, endTime, startTime, endTime], (err, results) => {
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

app.post("/menus", upload.single("image"), (req, res) => {
  const { menuData, date, isVisible, imagePath, imageAlt } = req.body;
  const sql =
    "INSERT INTO menu (MenuData, Date, IsVisible, ImagePath, ImageAlt) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      JSON.stringify(JSON.parse(menuData)),
      date,
      parseInt(isVisible),
      imagePath,
      imageAlt,
    ],
    (err, result) => {
      if (err) {
        try {
          fs.unlinkSync(path.join(UPLOAD_DIR, imagePath));
        } catch (err) {}
        return res.status(400).json({
          message: `Failed to create the menu: ${err}`,
        });
      }
      res.status(201).json({
        message: "Menu created successfully",
        menuId: result.insertId,
      });
    }
  );
});

app.get("/menus", (req, res) => {
  const { startDate, endDate } = req.query;
  const sql = "SELECT * FROM menu WHERE Date BETWEEN ? AND ?";
  db.query(sql, [startDate, endDate], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: `Failed to retrieve menus: ${err}`,
      });
    }
    res.status(200).json({
      menus: results,
      message: "Successfully retrieved menu.",
    });
  });
});

app.get("/menus/:menuId", (req, res) => {
  const menuId = parseInt(req.params.menuId);
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

app.put("/menus/:menuId", upload.single("image"), (req, res) => {
  const menuId = parseInt(req.params.menuId);
  const { menuData, date, isVisible, imagePath, imageAlt, oldImagePath } =
    req.body;
  const sql =
    "UPDATE menu SET MenuData = ?, Date = ?, IsVisible = ?, ImagePath = ?, ImageAlt = ? WHERE MenuID = ?";
  db.query(
    sql,
    [
      JSON.stringify(JSON.parse(menuData)),
      date,
      parseInt(isVisible),
      imagePath,
      imageAlt,
      menuId,
    ],
    (err, result) => {
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
      if (imagePath != oldImagePath) {
        try {
          fs.unlinkSync(path.join(UPLOAD_DIR, oldImagePath));
        } catch (err) {}
      }
      res.status(200).json({
        message: "Menu updated successfully",
      });
    }
  );
});

app.delete("/menus/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const getMenuImagePathSQL = `SELECT ImagePath FROM menu WHERE MenuID = ?`;
  const deleteMenuSQL = `DELETE FROM menu WHERE MenuID = ?`;
  db.query(getMenuImagePathSQL, [id], function (err, results) {
    if (err || results.length === 0) {
      return res.status(400).json({
        message: `Failed to fetch menu ${id} or menu not found: ${err}`,
      });
    }
    const imagePath = results[0].ImagePath;
    db.query(deleteMenuSQL, [id], function (err, result) {
      if (err) {
        return res.status(400).json({
          message: `Failed to delete the menu ${id}: ${err}`,
        });
      }
      if (imagePath) {
        try {
          fs.unlinkSync(path.join(UPLOAD_DIR, imagePath));
        } catch (err) {}
      }
      res.status(200).json({
        message: `Successfully deleted menu with ID ${id}`,
      });
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

// PUT endpoint for updating configuration items
app.put("/config", (req, res) => {
  const { name, value } = req.body;
  const sql = "UPDATE config SET Value = ? WHERE Name = ?";
  db.query(sql, [value, name], (err, results) => {
    if (err) {
      return res.status(400).json({
        config: [],
        message: `Failed to update configuration item with name ${name} and value ${value}`,
      });
    }
    return res.status(200).json({
      config: results,
      message: `Successfully updated configuration item ${name}`,
    });
  });
});

app.get("/config", (req, res) => {
  const { name } = req.query;
  if (!name) {
    const sql = "SELECT * FROM config";
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(404).json({
          message: `Failed to get configuration, ${err}`,
        });
      }
      return res.status(200).json({
        config: results,
        message: `Successfully retreived configuration.`,
      });
    });
  } else {
    const sql = "SELECT * FROM config WHERE Name = ?";
    db.query(sql, [name], (err, results) => {
      if (err) {
        return res.status(400).json({
          message: `Failed to get configuration with name ${name}, ${err}`,
        });
      }
      return res.status(200).json({
        config: results[0],
        message: `Successfully retreived configuration with name ${name}`,
      });
    });
  }
});

app.post("/users", (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      message: "Email, password, first name, and last name are required",
    });
  }
  if (!req.session.user || req.session.user.UserRole.toLowerCase() != "admin") {
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
        "INSERT INTO user (Email, Password, FirstName, LastName, UserRole) VALUES (?, ?, ?, ?, ?)";
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
  const { id } = req.params;
  const { role } = req.body;
  if (
    !req.session.user ||
    req.session.user.UserRole.toLowerCase() !== "admin"
  ) {
    return res.status(401).json({ message: "Unauthorized to update users." });
  }
  db.query("SELECT * FROM user WHERE UserID = ?", [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: `Failed to retrieve user: ${err}` });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    const user = results[0];
    if (user.UserRole.toLowerCase() === "admin") {
      return res
        .status(403)
        .json({ message: "Permission to edit an admin account denied." });
    }
    const updateSql = "UPDATE user SET UserRole = ? WHERE UserId = ?";
    db.query(updateSql, [role, id], (updateErr, result) => {
      if (updateErr) {
        return res
          .status(500)
          .json({ message: `Failed to update user: ${updateErr}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.status(200).json({
        user: result.affectedRows,
        message: `Successfully updated user with ID ${id}`,
      });
    });
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  if (
    !req.session.user ||
    req.session.user.UserRole.toLowerCase() !== "admin"
  ) {
    return res.status(401).json({ message: "Unauthorized to delete users." });
  }
  db.query("SELECT * FROM user WHERE UserID = ?", [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: `Failed to retrieve user: ${err}` });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    const user = results[0];
    if (user.UserRole.toLowerCase() === "admin") {
      return res
        .status(403)
        .json({ message: "Permission to delete an admin account denied." });
    }
    const deleteSql = "DELETE FROM user WHERE UserId = ?";
    db.query(deleteSql, [id], (deleteErr, deleteResult) => {
      if (deleteErr) {
        return res
          .status(500)
          .json({ message: `Failed to delete user: ${deleteErr}` });
      }
      return res
        .status(200)
        .json({ message: `Successfully deleted user with ID ${id}` });
    });
  });
});

app.listen(consts.PORT, () => {
  console.log(`Express API listening on port ${consts.PORT}`);
});
