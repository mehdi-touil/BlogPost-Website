import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Form.css";
const Login = ({ setIsLogged, setUser }) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const author = { username, password };
      const { data } = await api.post("/login", author);
      localStorage.setItem("user", JSON.stringify(data));
      setIsLogged(true);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Authentication</h1>
      {error && <div className="error">{error}</div>}
      <section>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          required
        />
      </section>
      <section>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          required
        />
      </section>
      <section>
        {" "}
        <span>
          {" "}
          <div>
            Not Registered ?{" "}
            <a href="/signup" id="signup">
              Register Here
            </a>
          </div>
        </span>{" "}
      </section>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
