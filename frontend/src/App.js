import "./App.css";
import "./assets/colors.css";
import "./assets/fonts.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./pages/login/login";
import Events from "./pages/events/events";
import Calendar from "./pages/calendar/calendar";
import Information from "./pages/information/information";
import Configuration from "./pages/configuration/configuration";
import Create from "./pages/create/create";
import Edit from "./pages/edit/edit";
import Fullscreen from "./pages/slideshow/fullscreen";

import AppContext from "./AppContext";
import LoadingScreen from "./components/LoadingScreen";
import config from "./configs.json";
import { ProtectedRoute } from "./Route";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${config[process.env.NODE_ENV].apiDomain}/login`, {
        withCredentials: true,
      })
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
    <AppContext.Provider value={{ user, setUser, setIsLoading }}>
      <LoadingScreen loading={isLoading} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/slides" element={<Events />} />
        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/information" element={<Information />} />
        <Route
          exact
          path="/configuration"
          element={<ProtectedRoute auth={user} Component={Configuration} />}
        />
        <Route
          exact
          path="/create"
          element={<ProtectedRoute auth={user} Component={Create} />}
        />
        <Route
          exact
          path="/edit"
          element={<ProtectedRoute auth={user} Component={Edit} />}
        />
        <Route exact path="/fullscreen" element={<Fullscreen />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
