import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendData = async () => {
    const res = await axios
      .post("http://localhost:3000/api/user/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(res)
    const Data = await res.data;
    console.log(Data.user);
    return Data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendData().then(() => navigate('/login') );
    setTimeout(() => {
      setFormData({ name: "", email: "", password: "" });
    }, [4000]);
  };

  return (
    <div className="sign-section">
      <div className="sign-container">
        <div className="sign-form">
          <h4>Sign Up</h4>
          <form autoComplete="off">
            <div className="input-group">
              <input
                type="text"
                id="name"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
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
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="submit-sec">
              <button
                type="submit"
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
