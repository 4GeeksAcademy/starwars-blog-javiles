import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ favorites, setFavorites }) => {
  const removeFromFavorites = (name) => {
    const updatedFavorites = favorites.filter((fav) => fav.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
  };

  return (
    <nav className="navbar sticky-top bg-white mb-3">
      <div className="container mt-2">
        <Link to="/">
          <img
            src="https://i.pinimg.com/736x/9e/4b/8c/9e4b8cd05a0e5c0b1e9237d9013417af.jpg"
            alt="Star Wars Logo"
            className="navbar-brand mb-0 h1"
            style={{ height: "60px" }}
          />
        </Link>
        <div className="ml-auto">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="favoritesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites ({favorites.length})
            </button>
            <ul className="dropdown-menu" aria-labelledby="favoritesDropdown">
              {favorites.length === 0 ? (
                <li className="dropdown-item text-muted">No favorites added</li>
              ) : (
                favorites.map((item) => (
                  <li
                    key={item.name}
                    className="dropdown-item d-flex justify-content-between align-items-center"
                  >
                    <Link
                      to={`/${item.type || "unknown"}/${item.name}`} 
                      className="text-decoration-none text-dark"
                    >
                      {item.name}
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => removeFromFavorites(item.name)}
                    >
                      <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
