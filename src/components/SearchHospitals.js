import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/SearchHospitals.css";

const SearchHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating loading hospitals from a database
    const loadedHospitals = [
      {
        name: "Al-Salam Hospital",
        area: "Main Street, Cairo, Egypt",
        icus: [
          { roomNumber: 101, specialization: "Cardiology", isOccupied: false },
          { roomNumber: 102, specialization: "Neurology", isOccupied: true },
        ],
        coordinates: { lat: 30.0444, long: 31.2357 },
      },
      {
        name: "Al-Hayat Hospital",
        area: "Pyramids Street, Giza, Egypt",
        icus: [
          { roomNumber: 201, specialization: "Orthopedics", isOccupied: false },
          { roomNumber: 202, specialization: "Pediatrics", isOccupied: false },
        ],
        coordinates: { lat: 29.9784, long: 31.1326 },
      },
    ];
    setHospitals(loadedHospitals);
    setFilteredHospitals(loadedHospitals);
  }, []);

  const onSubmit = (data) => {
    const { location, condition } = data;

    // Filtering hospitals based on location and health condition
    const filtered = hospitals.filter((hospital) => {
      const isLocationMatch = hospital.area.includes(location);
      const hasAvailableICU = hospital.icus.some(
        (icu) =>
          icu.specialization === condition && icu.isOccupied === false
      );
      return isLocationMatch && hasAvailableICU;
    });

    setFilteredHospitals(filtered);
  };

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleReservation = (hospital, icu) => {
    // Simulating ICU reservation
    const updatedHospitals = [...hospitals];
    const hospitalIndex = updatedHospitals.findIndex(
      (h) => h.name === hospital.name
    );
    const icuIndex = updatedHospitals[hospitalIndex].icus.findIndex(
      (i) => i.roomNumber === icu.roomNumber
    );
    updatedHospitals[hospitalIndex].icus[icuIndex].isOccupied = true;

    setHospitals(updatedHospitals);
    alert(
      `Room number ${icu.roomNumber} in the ${icu.specialization} ICU at ${hospital.name} has been reserved.`
    );
    setSelectedHospital(null); // Hide details after reservation
  };

  return (
    <div className="search-hospitals-container">
      <h2>Search for Hospitals</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="search-form">
        <div className="form-group">
          <label>Location (City or Area):</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            placeholder="Enter city or area"
          />
        </div>

        <div className="form-group">
          <label>Required Medical Specialization:</label>
          <select {...register("condition", { required: "Specialization is required" })}>
            <option value="">Select specialization</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
        </div>

        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {filteredHospitals.length > 0 ? (
        <div className="hospitals-list">
          <h3>Available Hospitals:</h3>
          {filteredHospitals.map((hospital, index) => (
            <div
              key={index}
              className="hospital-card"
              onClick={() => handleHospitalSelect(hospital)}
            >
              <h4>{hospital.name}</h4>
              <p>{hospital.area}</p>
              <div className="icus">
                <h5>ICU Departments:</h5>
                {hospital.icus.map((icu, index) => (
                  <p key={index}>
                    Room {icu.roomNumber} - {icu.specialization} -{" "}
                    {icu.isOccupied ? "Occupied" : "Available"}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hospitals available in the selected area.</p>
      )}

      {selectedHospital && (
        <div className="hospital-details">
          <h3>{selectedHospital.name} Details</h3>
          <p>{selectedHospital.area}</p>
          <div className="icus">
            <h4>ICU Departments:</h4>
            {selectedHospital.icus.map((icu, index) => (
              <div key={index} className="icu-card">
                <p>Room {icu.roomNumber} - {icu.specialization}</p>
                <p>Status: {icu.isOccupied ? "Occupied" : "Available"}</p>
                {!icu.isOccupied && (
                  <button
                    onClick={() => handleReservation(selectedHospital, icu)}
                  >
                    Reserve
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHospitals;
