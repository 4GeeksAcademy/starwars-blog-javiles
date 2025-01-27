import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./navbar"; 

const VehicleDetails = () => {
  const { name } = useParams(); 
  const [vehicle, setVehicle] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    if (!name) {
      console.error("Error: Vehicle name is undefined. Check the URL format.");
      return;
    }


    const storedData = localStorage.getItem("vehicleDetails");
    if (storedData) {
      const vehicles = JSON.parse(storedData);
      const selectedVehicle = vehicles.find((v) => v.name === name);
      setVehicle(selectedVehicle);
    }
  }, [name]);

  if (!name) {
    return (
      <div className="text-center">
        <p>Error: Vehicle name is undefined. Check the URL format.</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
     
      <Navbar favorites={favorites} setFavorites={setFavorites} />

      <div className="container mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white">
            <h2 className="card-title mb-0 text-center">{vehicle.name}</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Model:</strong> {vehicle.model}
                </p>
                <p className="mb-2">
                  <strong>Manufacturer:</strong> {vehicle.manufacturer}
                </p>
                <p className="mb-2">
                  <strong>Cost in Credits:</strong> {vehicle.cost_in_credits}
                </p>
                <p className="mb-2">
                  <strong>Length:</strong> {vehicle.length}
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Max Speed:</strong> {vehicle.max_atmosphering_speed}
                </p>
                <p className="mb-2">
                  <strong>Crew:</strong> {vehicle.crew}
                </p>
                <p className="mb-2">
                  <strong>Passengers:</strong> {vehicle.passengers}
                </p>
                <p className="mb-2">
                  <strong>Cargo Capacity:</strong> {vehicle.cargo_capacity}
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <button
              className="btn btn-secondary"
              onClick={() => window.history.back()}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleDetails;
