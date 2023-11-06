import logo from "../../assets/images/logo.png";
import "./styles.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AppContext from "../../AppContext";
import { Link, useNavigate } from "react-router-dom";
import config from "../../configs.json";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user, setUser, setIsLoading } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate("/calendar");
    }
  }, user);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setShowError(true);
      setShowSuccess(false);
      return;
    }
    const body = JSON.stringify({
      email,
      password,
    });
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(
        `${config[process.env.NODE_ENV].apiDomain}/login`,
        body,
        axiosConfig
      )
      .then((response) => {
        setShowSuccess(true);
        setShowError(false);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setUser(response.data.user);
        }, 2000);
      })
      .catch((error) => {
        setShowError(true);
        setShowSuccess(false);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="loginPage">
      <img src={logo} className="App-logo" alt="St. Peter's Kitchen logo" />
      <div className="loginContainer">
        <div className="login">
          <div className="header">
            <p className="headerTitle">login</p>
            <p className="bodyText">
              enter your email address and password to log in.
            </p>
          </div>
          <div className="inputs">
            <TextField
              fullWidth
              id="email"
              value={email}
              label="Email"
              variant="filled"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              fullWidth
              id="password"
              value={password}
              label="Password"
              variant="filled"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {showError && (
            <Alert
              severity="error"
              onClose={() => {
                setShowError(false);
              }}
            >
              Invalid login credentials. Please check and try again.
            </Alert>
          )}
          {showSuccess && (
            <Alert severity="success">You have successfully logged in!</Alert>
          )}

          <div className="forgotPasswordContainer">
            <p className="subtitle">
              <a href="">Forgot password?</a>
            </p>
          </div>

          <div className="loginButtonContainer">
            <Button id="loginButton" variant="contained" onClick={handleLogin}>
              login
            </Button>
          </div>
        </div>

        <div className="visitor">
          <div className="header">
            <p className="headerTitle">no account?</p>
            <p className="bodyText">
              click the button below to view St. Peter's Kitchen's menu, news,
              reminders and events.
            </p>
          </div>

          <div className="visitorButtonContainer">
            <Link to="/events">
              <Button fullWidth variant="contained">
                continue as viewer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
