import { useState, useEffect } from "react";
import loginService from "../services/login";
import ErrorNotification from "./ErrorNotification";
import { TextField, Button } from "@mui/material";

const LoginForm = ({ handleLogin, errorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const newLogin = async (event) => {
    event.preventDefault();
    handleLogin({
      username: username,
      password: password,
    });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <ErrorNotification message={errorMessage} />
      <form onSubmit={newLogin}>
        <div>
          <TextField
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
