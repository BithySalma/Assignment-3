import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import PokemonDetails from "./components/PokemonDetails";
import FavoritesPage from "./components/FavoritesPage";
import "./styles/styles.css";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage favorites={favorites} setFavorites={setFavorites} />
          }
        />
        <Route
          path="/pokemon/:name"
          element={
            <PokemonDetails favorites={favorites} setFavorites={setFavorites} />
          }
        />
        <Route
          path="/favorites"
          element={<FavoritesPage favorites={favorites} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
