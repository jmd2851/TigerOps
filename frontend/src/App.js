import "./App.css";
import "./assets/colors.css";
import "./assets/fonts.css";
import { Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Events from "./pages/events/events";
import Help from "./pages/help/help";

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/events" element={<Events />} />
      <Route exact path="/help" element={<Help />} />
    </Routes>
  );
};

export default App;
