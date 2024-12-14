import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/Register.css";

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Simulate API call for registration
      console.log("Registering user:", data);
      // Simulate success
      setTimeout(() => {
        setSuccess("Registration successful! You will be redirected to the login page...");
        setError(null);
        setTimeout(() => navigate("/patient/login"), 2000);
      }, 1000);
    } catch (error) {
      setError("Registration failed. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Patient Registration</h2>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 1, message: "Age must be greater than 0" },
              })}
              placeholder="Enter your age"
            />
            {errors.age && <p className="error-text">{errors.age.message}</p>}
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              defaultValue=""
            >
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="error-text">{errors.gender.message}</p>}
          </div>

          <div className="form-group">
            <label>Health Condition:</label>
            <select
              {...register("condition", { required: "Health condition is required" })}
              defaultValue=""
            >
              <option value="" disabled>Select your health condition</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>
            {errors.condition && <p className="error-text">{errors.condition.message}</p>}
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              placeholder="Enter your location"
            />
            {errors.location && <p className="error-text">{errors.location.message}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              {...register("contactNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,12}$/,
                  message: "Please enter a valid phone number (10 to 12 digits)",
                },
              })}
              placeholder="Enter your phone number"
            />
            {errors.contactNumber && <p className="error-text">{errors.contactNumber.message}</p>}
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
              placeholder="Enter a secure password"
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          <button type="submit" className="register-btn">
            Register Now
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/patient/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
