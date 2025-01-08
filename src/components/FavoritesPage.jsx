import "react";
import { Link } from "react-router-dom";

const FavoritesPage = ({ favorites }) => {
  if (favorites.length === 0) return <h2>No Favorites Added</h2>;

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      <div className="pokemon-list">
        {favorites.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <h3>{pokemon.name}</h3>
            <Link to={`/pokemon/${pokemon.name}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
