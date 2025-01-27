import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./navbar"; 

const PlanetDetails = () => {
  const { name } = useParams(); 
  const [planet, setPlanet] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
   
    const storedData = localStorage.getItem("planetDetails");
    if (storedData) {
      const planets = JSON.parse(storedData);
      const selectedPlanet = planets.find((p) => p.name === name);
      setPlanet(selectedPlanet);
    }
  }, [name]);

  if (!planet) {
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
            <h2 className="card-title mb-0 text-center">{planet.name}</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Population:</strong> {planet.population}
                </p>
                <p className="mb-2">
                  <strong>Terrain:</strong> {planet.terrain}
                </p>
                <p className="mb-2">
                  <strong>Climate:</strong> {planet.climate}
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Diameter:</strong> {planet.diameter} km
                </p>
                <p className="mb-2">
                  <strong>Gravity:</strong> {planet.gravity}
                </p>
                <p className="mb-2">
                  <strong>Surface Water:</strong> {planet.surface_water}%
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

export default PlanetDetails;
