import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile_text, setPofileText] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        username,
        email,
        password,
        profile_text,
      });
      if (res.status == 200) {
        window.location.replace("/login");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="h-100 bg-secondary">
      <div className="container-fluid " style={{ height: "560px" }}>
        <div className="align-items-center d-flex h-100 justify-content-around">
          <div className="d-grid">
            <h3>Register</h3>
            <label htmlFor="">Email</label>
            <input
              className="px-2"
              placeholder="email"
              type="text"
              name=""
              id=""
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="">Username</label>
            <input
              className="px-2"
              placeholder="username"
              type="text"
              name=""
              id=""
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="">Password</label>
            <input
              className="px-2"
              placeholder="password"
              type="password"
              name=""
              id=""
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="">Bio</label>
            <input
              className="px-2"
              placeholder="Profile text"
              type="text"
              name=""
              id=""
              onChange={(e) => setPofileText(e.target.value)}
            />
            <button className="mt-3 rounded border-0" onClick={handleSubmit}>
              Register
            </button>
            {error && <span>Something went wrong</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
