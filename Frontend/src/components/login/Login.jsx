import React from "react";
import "./login.css";


const Login = () => {
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
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-group">
              <input
                name="password"
                type="password"
                id="password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="submit-sec">
              <input
                type="submit"
                className="submit-btn"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
