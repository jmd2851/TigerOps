import logo from "../../assets/images/logo.png";
import "./styles.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .catch((error) => {
        console.log(error);
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
              label="Email"
              id="email"
              variant="filled"
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              type="password"
              fullWidth
              id="password"
              label="Password"
              variant="filled"
              margin="normal"
              onChange={handleChange}
            />
          </div>

          <div className="forgotPasswordContainer">
            <p className="subtitle">
              <a href="">Forgot password?</a>
            </p>
          </div>

          <div className="loginButtonContainer">
            <Button id="loginButton" variant="contained" onClick={handleLogin}>
              submit
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
            <Button fullWidth variant="contained">
              continue as viewer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
