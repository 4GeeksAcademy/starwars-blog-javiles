import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import CharacterCards from "../component/characters";
import Planets from "../component/planets";
import { Navbar } from "../component/navbar";
import VehicleCards from "../component/vehicles";

export const Home = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <Navbar favorites={favorites} setFavorites={setFavorites} />
      <div className="text-center mt-5">
        <CharacterCards favorites={favorites} setFavorites={setFavorites} />
        <Planets favorites={favorites} setFavorites={setFavorites} />
        <VehicleCards favorites={favorites} setFavorites={setFavorites} />
      </div>
    </>
  );
};
