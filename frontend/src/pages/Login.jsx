import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { silentRefreshLoop } from "../utils/token";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("email and password must be defined");
      return;
    }
    // const emailAndPasswordBase64 = btoa(`${email}:${password}`);
    // const authorization = `Basic ${emailAndPasswordBase64}`;

    fetch("http://localhost:9999/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success) return setErrorMessage(message || "failed to login");
        const authorization = `Bearer ${result.tokens.accessToken}`;
        onLoginSuccess(authorization, result);
        silentRefreshLoop(
          result.tokens.accessToken,
          function onSilentRefreshDoneCallback(newAccessToken) {
            const authorization = `Bearer ${newAccessToken}`;
            onLoginSuccess(authorization, result.user);
          }
        );

        setErrorMessage("");
        setSuccessMessage(
          "Login successful, please  go to Dashboard and enjoy!"
        );
      });
    setEmail("");
    setPassword("");
    // navigate("/");
  };

  return (
    <section className="loginPage">
      <div className="welcome">
        <p>welcome to </p>
        <h1>Login</h1>
      </div>
      <div className="formPart">
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
        <div className="buttonPart">
          <button onClick={loginUser}>Login</button>
          <p style={{ fontSize: "16px", marginTop: "1rem" }}>
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#2A9D8F" }}>
              Sign Up
            </a>
          </p>
        </div>
        <p>{errorMessage} </p>
        <p>{successMessage} </p>
      </div>
    </section>
  );
};

export default Login;
