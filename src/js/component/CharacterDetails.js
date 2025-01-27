import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./navbar"; 



const CharacterDetails = () => {
  const { name } = useParams(); 
  const [character, setCharacter] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const removeFromFavorites = (name) => {
    const updatedFavorites = favorites.filter((fav) => fav.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
  };

  useEffect(() => {
    
    const storedData = localStorage.getItem("characterDetails");
    if (storedData) {
      const characters = JSON.parse(storedData);
      const selectedCharacter = characters.find((c) => c.name === name);
      setCharacter(selectedCharacter);
    }
  }, [name]);

  if (!character) {
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
            <h2 className="card-title mb-0 text-center">{character.name}</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Gender:</strong> {character.gender}
                </p>
                <p className="mb-2">
                  <strong>Hair Color:</strong> {character.hair_color}
                </p>
                <p className="mb-2">
                  <strong>Eye Color:</strong> {character.eye_color}
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Height:</strong> {character.height} cm
                </p>
                <p className="mb-2">
                  <strong>Mass:</strong> {character.mass} kg
                </p>
                <p className="mb-2">
                  <strong>Birth Year:</strong> {character.birth_year}
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

export default CharacterDetails;
