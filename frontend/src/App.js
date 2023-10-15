import "./App.css";
import "./assets/colors.css";
import "./assets/fonts.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/login/login";
import Events from "./pages/events/events";
import Calendar from "./pages/calendar/calendar";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    console.log("hello world");
  });

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/events" element={<Events />} />
      <Route exact path="/calendar" element={<Calendar />} />
    </Routes>
  );
};

export default App;
