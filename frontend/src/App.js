import "./App.css";
import "./assets/colors.css";
import "./assets/fonts.css";
import { Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Events from "./pages/events/events";
import Create from "./pages/create/create";

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/events" element={<Events />} />
      <Route exact path="/create" element={<Create />} />
    </Routes>
  );
};

export default App;
