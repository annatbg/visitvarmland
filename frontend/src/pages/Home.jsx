import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../store/useUser";
import "./styles/Home.css";
import { loginUser, signupUser } from "../hooks/api/authApi";

function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", password: "" });
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(formData.username, formData.password);
      login(result.username);
      navigate("/user");
    } catch (error) {
      alert(error.message || "An error occurred while logging in.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await signupUser(formData);
      setMessage("User created!");
    } catch (error) {
      alert(error.message || "An error occurred while signing up.");
    }
  };

  return (
    <div className="container">
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      {isLogin ? (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              required
              className="input-field"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              required
              className="input-field"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              required
              className="input-field"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              required
              className="input-field"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Signup
          </button>
        </form>
      )}
      {message && <p className="success-message">{message}</p>}
      <p className="toggle-message">
        {isLogin ? "Don't have an account?" : "Already have an account?"} <br />
        <button onClick={toggleForm} className="toggle-button">
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}

export default Home;
