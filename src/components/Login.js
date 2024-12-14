import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/Login.css";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Simulate login validation
      console.log("Logging in user:", data);

      // Simulate data validation
      const { username, password } = data;

      if (username === "patient" && password === "patient123") {
        // Store patient data in localStorage
        localStorage.setItem("patientID", username);
        setError(null);
        navigate("/patient/dashboard");
      } else if (username === "admin" && password === "admin123") {
        // Store admin data in localStorage
        localStorage.setItem("adminID", username);
        setError(null);
        navigate("/admin/dashboard");
      } else {
        throw new Error("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter username"
            />
            {errors.username && <p className="error-text">{errors.username.message}</p>}
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              placeholder="Enter password"
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/patient/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;