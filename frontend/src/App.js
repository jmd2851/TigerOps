import "./App.css";
import "./assets/colors.css";
import "./assets/fonts.css";
import { Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Events from "./pages/events/events";
import Calendar from "./pages/calendar/calendar";
import Help from "./pages/help/help.js";
import Configuration from "./pages/configuration/configuration.js";

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/events" element={<Events />} />
      <Route exact path="/Calendar" element={<Calendar />} />
      <Route exact path="/Help" element={<Help />} />
      <Route exact path="/Configuration" element={<Configuration />} />
    </Routes>
  );
};

export default App;
