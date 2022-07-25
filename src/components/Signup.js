import api from "../api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

const Signup = ({ setIsLogged, setUser }) => {
  let navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const author = { fullname, username, password, cpassword };
      console.log(author);
      const { data } = await api.post("/signup", author);
      localStorage.setItem("user", JSON.stringify(data));
      setIsLogged(true);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Register!</h1>
      {error && <div className="error">{error}</div>}
      <section>
        <label htmlFor="fullname">fullname</label>
        <input
          id="fullname"
          value={fullname}
          onChange={(e) => {
            setFullname(e.target.value);
          }}
          type="text"
          required
        />
      </section>
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
        <label htmlFor="password">Enter Password</label>
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
        <label htmlFor="cpassword">Confirm Password</label>
        <input
          id="password"
          value={cpassword}
          onChange={(e) => {
            setCpassword(e.target.value);
          }}
          type="password"
          required
        />
      </section>

      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
