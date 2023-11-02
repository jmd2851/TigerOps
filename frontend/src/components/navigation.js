import React from "react";
import "./navigation.css";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import axios from "axios";

export default function Navigation() {
  const { user, setUser } = React.useContext(AppContext);

  const role = user ? user.UserRole : "Guest";

  const handleLogout = () => {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then((response) => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="navContainer">
      <div className="nav">
        <h1 className="User">
          {role.toUpperCase()}
          {user == null && (
            <p>
              <a href="/login">(Click here to login)</a>
            </p>
          )}
        </h1>
        <div className="calendarOptions">
          <div className="topOptions">
            <h2 className="links">
              <Link to="/events">Events </Link>
            </h2>
          </div>
          <div className="topOptions">
            <h2 className="links">
              <Link to="/calendar"> Calendar View </Link>
            </h2>
          </div>
        </div>
        <div className="border"></div>
        <div className="bottomOptions">
          <h2 className="links">
            <Link to="/configuration"> Configuration </Link>
          </h2>
        </div>
        <h2 className="links">
          <Link to="/help">Help </Link>
        </h2>

        {user != null && (
          <div className="bottomOptions">
            <h2 className="links">
              <Link to="/events" onClick={handleLogout}>
                Log Out
              </Link>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
