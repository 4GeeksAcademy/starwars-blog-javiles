import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles/vehicles.css";

const VehicleCards = ({ favorites, setFavorites }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Agregar vehículo a favoritos
  const addToFavorites = (vehicle) => {
    const favoriteItem = { ...vehicle, type: "vehicle" }; 
    if (!favorites.some((fav) => fav.name === vehicle.name)) {
      const updatedFavorites = [...favorites, favoriteItem];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  
  const removeFromFavorites = (vehicleName) => {
    const updatedFavorites = favorites.filter((fav) => fav.name !== vehicleName);
    setFavorites(updatedFavorites);
   
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  
  const fetchAllPages = async (url) => {
    let results = [];
    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      results = results.concat(data.results); 
      url = data.next; 
    }
    return results;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const storedData = localStorage.getItem("vehicleDetails");
        if (storedData) {
          setCards(JSON.parse(storedData));
          setLoading(false);
          return;
        }

        
        const baseUrl = "https://www.swapi.tech/api/vehicles";
        const allVehicles = await fetchAllPages(baseUrl);

       
        const vehicleDetails = await Promise.all(
          allVehicles.map(async (vehicle) => {
            const vehicleResponse = await fetch(vehicle.url);
            const vehicleData = await vehicleResponse.json();
            return { ...vehicleData.result.properties, id: vehicle.uid }; // Extraer las propiedades del vehículo y agregar el ID
          })
        );

        
        localStorage.setItem("vehicleDetails", JSON.stringify(vehicleDetails));
        setCards(vehicleDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-start">Vehicle Cards</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="scroll-container">
          {cards.map((card, index) => (
            <div
              className="card"
              key={index}
              style={{ width: "18rem", minHeight: "22rem" }}
            >
              <img
                src="https://placehold.co/250x150"
                className="card-img-top"
                alt="Vehicle Placeholder"
              />
              <div className="card-body d-flex flex-column">
                <h5
                  className="card-title text-truncate"
                  style={{ maxWidth: "100%" }}
                >
                  {card.name}
                </h5>
                <p
                  className="card-text text-truncate"
                  style={{ maxWidth: "100%" }}
                >
                  Model: {card.model}
                </p>
                <p
                  className="card-text text-truncate"
                  style={{ maxWidth: "100%" }}
                >
                  Manufacturer: {card.manufacturer}
                </p>
                <p
                  className="card-text text-truncate"
                  style={{ maxWidth: "100%" }}
                >
                  Cost in Credits: {card.cost_in_credits}
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => navigate(`/vehicle/${card.name}`)}
                  >
                    Learn More
                  </button>
                  <button
                    className={`btn mt-2 ${
                      favorites.some((fav) => fav.name === card.name)
                        ? "btn-danger"
                        : "btn-outline-danger"
                    }`}
                    onClick={() =>
                      favorites.some((fav) => fav.name === card.name)
                        ? removeFromFavorites(card.name)
                        : addToFavorites(card)
                    }
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleCards;
