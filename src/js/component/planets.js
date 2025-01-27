import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '/src/styles/planets.css';

const Planets = ({ favorites, setFavorites }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const addToFavorites = (planet) => {
    const favoriteItem = { ...planet, type: "planet" }; 
    if (!favorites.some((fav) => fav.name === planet.name)) {
      const updatedFavorites = [...favorites, favoriteItem];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (planetName) => {
    setFavorites(favorites.filter((fav) => fav.name !== planetName));
  };


  async function fetchAllPages(baseUrl) {
    let results = [];
    let nextUrl = baseUrl;
  
    while (nextUrl) {
      const response = await fetch(nextUrl);
      const data = await response.json();
      results = results.concat(data.results); 
      nextUrl = data.next; 
    }
  
    return results;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const storedData = localStorage.getItem("planetDetails");
        if (storedData) {
          setCards(JSON.parse(storedData));
          setLoading(false);
          return;
        }
  
        
        const baseUrl = "https://www.swapi.tech/api/planets";
        const allPlanets = await fetchAllPages(baseUrl);
  
        
        const planetDetails = await Promise.all(
          allPlanets.map(async (planet) => {
            const planetResponse = await fetch(planet.url);
            const planetData = await planetResponse.json();
            return planetData.result.properties; 
          })
        );
  
        
        localStorage.setItem("planetDetails", JSON.stringify(planetDetails));
        setCards(planetDetails);
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
      <h2 className="text-start">Planets</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="scroll-container">
          {cards.map((card, index) => (
            <div className="card" key={index} style={{ width: "18rem", minHeight: "22rem" }}>
              <img 
                src="https://placehold.co/250x150" 
                className="card-img-top" 
                alt="Planet Placeholder" 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate" style={{ maxWidth: "100%" }}>{card.name}</h5>
                <p className="card-text text-truncate" style={{ maxWidth: "100%" }}>Population: {card.population}</p>
                <p className="card-text text-truncate" style={{ maxWidth: "100%" }}>Terrain: {card.terrain}</p>
                <div className="mt-auto d-flex justify-content-between">
                  <button className="btn btn-primary mt-2" onClick={() => navigate(`/planet/${card.name}`)}>Learn More</button>
                  <button className="btn btn-outline-danger mt-2" onClick={() => addToFavorites(card)}>
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

export default Planets;
