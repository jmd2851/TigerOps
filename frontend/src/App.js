import "./App.css";
import "./assets/colors.css";
import "./assets/fonts.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./pages/login/login";
import Events from "./pages/events/events";
import Calendar from "./pages/calendar/calendar";
import Help from "./pages/help/help";
import Configuration from "./pages/configuration/configuration";
import Create from "./pages/create/create";
import Edit from "./pages/create/edit";

import AppContext from "./AppContext";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/login", { withCredentials: true })
      .then((response) => {
        if (response.data.authenticated) {
          setUser(response.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/events" element={<Events />} />
        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/help" element={<Help />} />
        <Route exact path="/configuration" element={<Configuration />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/edit" element={<Edit />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
