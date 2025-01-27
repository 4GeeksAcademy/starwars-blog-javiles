import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./views/home";
import PlanetDetails from "./component/PlanetDetails"; // Import the new component
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import CharacterDetails from "./component/CharacterDetails";
import VehicleDetails from "./component/VehicleDetails";


const Layout = () => {
  const basename = process.env.BASENAME || "";


  const [favorites, setFavorites] = useState([]);

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
			
			
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home favorites={favorites} setFavorites={setFavorites} />} />

            <Route path="/planet/:name" element={<PlanetDetails />} />
            <Route path="/character/:name" element={<CharacterDetails />} />
            <Route path="/vehicle/:name" element={<VehicleDetails />} />
            
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
