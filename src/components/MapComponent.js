import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";

const MapComponent = ({ hospitals }) => {
  const [activeHospital, setActiveHospital] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // لتصحيح مشكلة الـ marker icon التي قد تظهر بشكل غير صحيح
    const defaultIcon = new L.Icon({
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  const handleMarkerClick = (hospital) => {
    setActiveHospital(hospital);
  };

  const handleReserve = (hospital, icu) => {
    // محاكاة الحجز في قسم العناية المركزة
    alert(
      `تم حجز غرفة رقم ${icu.roomNumber} في قسم ${icu.specialization} في مستشفى ${hospital.name}`
    );
    navigate(`/hospital/${hospital.name}/icu/${icu.roomNumber}`); // الانتقال إلى تفاصيل المستشفى
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[30.0444, 31.2357]} // الإحداثيات الافتراضية (القاهرة)
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            position={[hospital.coordinates.lat, hospital.coordinates.long]}
            eventHandlers={{
              click: () => handleMarkerClick(hospital),
            }}
          >
            <Popup>
              <h4>{hospital.name}</h4>
              <p>{hospital.area}</p>
              {hospital.icus.some((icu) => !icu.isOccupied) ? (
                <div>
                  <h5>أقسام العناية المركزة المتاحة:</h5>
                  {hospital.icus
                    .filter((icu) => !icu.isOccupied)
                    .map((icu, index) => (
                      <div key={index}>
                        <p>
                          غرفة رقم {icu.roomNumber} - {icu.specialization}
                        </p>
                        <button
                          onClick={() => handleReserve(hospital, icu)}
                          className="reserve-btn"
                        >
                          حجز
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <p>لا توجد غرف شاغرة حالياً</p>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {activeHospital && (
        <div className="hospital-details">
          <h3>تفاصيل مستشفى {activeHospital.name}</h3>
          <p>{activeHospital.area}</p>
          <h4>أقسام العناية المركزة:</h4>
          {activeHospital.icus.map((icu, index) => (
            <div key={index}>
              <p>غرفة رقم {icu.roomNumber} - {icu.specialization}</p>
              <p>الحالة: {icu.isOccupied ? "ممتلئة" : "شاغرة"}</p>
              {!icu.isOccupied && (
                <button
                  onClick={() => handleReserve(activeHospital, icu)}
                  className="reserve-btn"
                >
                  حجز
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
