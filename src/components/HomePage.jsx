import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=50";

const HomePage = ({ favorites, setFavorites }) => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(API_URL);
      const detailedPokemons = await Promise.all(
        response.data.results.map((pokemon) => axios.get(pokemon.url))
      );
      setPokemons(detailedPokemons.map((res) => res.data));
    };
    fetchPokemons();
  }, []);

  const toggleFavorite = (pokemon) => {
    const isFavorited = favorites.some((fav) => fav.name === pokemon.name);
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.name !== pokemon.name));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="homepage">
      <input
        type="text"
        placeholder="Search Pokémon"
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <button onClick={() => toggleFavorite(pokemon)}>
              {favorites.some((fav) => fav.name === pokemon.name)
                ? "Unfavorite"
                : "Favorite"}
            </button>

            <Link to={`/pokemon/${pokemon.name}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
