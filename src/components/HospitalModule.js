import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/HospitalModule.css";

const HospitalModule = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addHospital = async (data) => {
    try {
      // Simulate adding a hospital to the system
      const newHospital = {
        name: data.hospitalName,
        area: data.area,
        coordinates: { lat: data.latitude, long: data.longitude },
        admin: {
          username: data.adminUsername,
          password: data.adminPassword,
        },
        icus: [],
      };

      setHospitals((prevHospitals) => [...prevHospitals, newHospital]);
      setSuccess("Hospital and its Admin added successfully!");
      setError(null);
    } catch (error) {
      setError("Failed to add the hospital. Please try again.");
      setSuccess(null);
    }
  };

  const addIcuToHospital = (hospitalIndex, icuData) => {
    try {
      const updatedHospitals = [...hospitals];
      const updatedIcu = {
        specialization: icuData.specialization,
        roomNumber: icuData.roomNumber,
        isOccupied: false,
      };
      updatedHospitals[hospitalIndex].icus.push(updatedIcu);
      setHospitals(updatedHospitals);
      setSuccess("ICU added successfully!");
      setError(null);
    } catch (error) {
      setError("Failed to add ICU.");
      setSuccess(null);
    }
  };

  const onSubmitHospital = (data) => {
    addHospital(data);
  };

  const onSubmitICU = (hospitalIndex, data) => {
    addIcuToHospital(hospitalIndex, data);
  };

  return (
    <div className="hospital-module-container">
      <div className="hospital-form">
        <h2>Add a New Hospital</h2>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit(onSubmitHospital)}>
          <div className="form-group">
            <label>Hospital Name:</label>
            <input
              type="text"
              {...register("hospitalName", { required: "Hospital name is required" })}
              placeholder="Enter hospital name"
            />
            {errors.hospitalName && <p className="error-text">{errors.hospitalName.message}</p>}
          </div>

          <div className="form-group">
            <label>Area (Street, City, Country):</label>
            <input
              type="text"
              {...register("area", { required: "Area is required" })}
              placeholder="Enter area"
            />
            {errors.area && <p className="error-text">{errors.area.message}</p>}
          </div>

          <div className="form-group">
            <label>Coordinates (Latitude):</label>
            <input
              type="number"
              step="any"
              {...register("latitude", { required: "Latitude is required" })}
              placeholder="Enter latitude"
            />
            {errors.latitude && <p className="error-text">{errors.latitude.message}</p>}
          </div>

          <div className="form-group">
            <label>Coordinates (Longitude):</label>
            <input
              type="number"
              step="any"
              {...register("longitude", { required: "Longitude is required" })}
              placeholder="Enter longitude"
            />
            {errors.longitude && <p className="error-text">{errors.longitude.message}</p>}
          </div>

          <h3>Hospital Admin Details</h3>
          <div className="form-group">
            <label>Admin Username:</label>
            <input
              type="text"
              {...register("adminUsername", { required: "Admin username is required" })}
              placeholder="Enter admin username"
            />
            {errors.adminUsername && <p className="error-text">{errors.adminUsername.message}</p>}
          </div>

          <div className="form-group">
            <label>Admin Password:</label>
            <input
              type="password"
              {...register("adminPassword", { required: "Admin password is required" })}
              placeholder="Enter admin password"
            />
            {errors.adminPassword && <p className="error-text">{errors.adminPassword.message}</p>}
          </div>

          <button type="submit" className="add-hospital-btn">
            Add Hospital
          </button>
        </form>
      </div>

      <div className="icu-form">
        <h2>Add an ICU to a Hospital</h2>
        {hospitals.length === 0 && <p>No hospitals registered currently.</p>}
        {hospitals.map((hospital, index) => (
          <div key={index}>
            <h3>{hospital.name} - {hospital.area}</h3>
            <p><strong>Admin:</strong> {hospital.admin.username}</p>
            <form onSubmit={handleSubmit((data) => onSubmitICU(index, data))}>
              <div className="form-group">
                <label>Specialization:</label>
                <input
                  type="text"
                  {...register("specialization", { required: "Specialization is required" })}
                  placeholder="Enter specialization"
                />
                {errors.specialization && <p className="error-text">{errors.specialization.message}</p>}
              </div>

              <div className="form-group">
                <label>Room Number:</label>
                <input
                  type="number"
                  {...register("roomNumber", { required: "Room number is required" })}
                  placeholder="Enter room number"
                />
                {errors.roomNumber && <p className="error-text">{errors.roomNumber.message}</p>}
              </div>

              <button type="submit" className="add-icu-btn">
                Add ICU
              </button>
            </form>

            <div>
              <h4>ICUs in {hospital.name}:</h4>
              {hospital.icus.length === 0 ? (
                <p>No ICUs available yet.</p>
              ) : (
                <ul>
                  {hospital.icus.map((icu, i) => (
                    <li key={i}>
                      <p>Room Number {icu.roomNumber} - {icu.specialization}</p>
                      <p>Status: {icu.isOccupied ? "Occupied" : "Available"}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalModule;
