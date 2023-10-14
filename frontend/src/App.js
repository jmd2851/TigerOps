import "./App.css";
import "./assets/colors.css";
import "./assets/fonts.css";
import { Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Events from "./pages/events/events";
import Calendar from "./pages/calendar/calendar";
import Configuration from "./pages/configuration/configuration";

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/events" element={<Events />} />
      <Route exact path="/calendar" element={<Calendar />} />
      <Route exact path="/configuration" element={<Configuration />} />
    </Routes>
  );
};

export default App;
