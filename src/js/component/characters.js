import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '/src/styles/characters.css';

const CharacterCards = ({ favorites, setFavorites }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 
  const addToFavorites = (character) => {
    const favoriteItem = { ...character, type: "character" }; 
    if (!favorites.some((fav) => fav.name === character.name)) {
      const updatedFavorites = [...favorites, favoriteItem];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // Eliminar personaje de favoritos
  const removeFromFavorites = (characterName) => {
    setFavorites(favorites.filter((fav) => fav.name !== characterName));
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
        
        const storedData = localStorage.getItem("characterDetails");
        if (storedData) {
          setCards(JSON.parse(storedData));
          setLoading(false);
          return;
        }

        
        const baseUrl = "https://www.swapi.tech/api/people";
        const allCharacters = await fetchAllPages(baseUrl);

       
        const characterDetails = await Promise.all(
          allCharacters.map(async (character) => {
            const charResponse = await fetch(character.url);
            const charData = await charResponse.json();
            return charData.result.properties; 
          })
        );

        
        localStorage.setItem("characterDetails", JSON.stringify(characterDetails));
        setCards(characterDetails);
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
      <h2 className="text-start">Character Cards</h2>
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
                alt="Character Placeholder" 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate" style={{ maxWidth: "100%" }}>{card.name}</h5>
                <p className="card-text text-truncate" style={{ maxWidth: "100%" }}>Gender: {card.gender}</p>
                <p className="card-text text-truncate" style={{ maxWidth: "100%" }}>Hair Color: {card.hair_color}</p>
                <p className="card-text text-truncate" style={{ maxWidth: "100%" }}>Eye Color: {card.eye_color}</p>
                <div className="mt-auto d-flex justify-content-between">
                <button
  className="btn btn-primary mt-2"
  onClick={() => navigate(`/character/${card.name}`)}
>
                    Learn More
                  </button>
                  <button
                    className={`btn mt-2 ${favorites.some((fav) => fav.name === card.name) ? "btn-danger" : "btn-outline-danger"}`}
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

export default CharacterCards;
