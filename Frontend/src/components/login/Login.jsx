import React from "react";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendLoginData = async () => {
    const res = await axios
      .post("http://localhost:3000/api/user/login", {
        email: formData.email,
        password: formData.password,
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(res);
    const data = await res.data;
    console.log(data.user)
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLoginData().then(() => navigate("/"));
  };

  return (
    <div className="login-section">
      <div className="login-container">
        <div className="login-form">
          <h4>Login</h4>
          <form autoComplete="off">
            <div className="input-group">
              <input
                name="email"
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="submit-sec">
              <input
                type="submit"
                className="submit-btn"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
