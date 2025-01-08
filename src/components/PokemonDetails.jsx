import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const PokemonDetails = ({ favorites, setFavorites }) => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await axios.get(`${API_URL}/${name}`);
      setPokemon(response.data);
    };
    fetchPokemonDetails();
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;

  const toggleFavorite = () => {
    const isFavorited = favorites.some((fav) => fav.name === pokemon.name);
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.name !== pokemon.name));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };

  return (
    <div className="pokemon-details">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
      <h2>Types</h2>
      <ul>
        {pokemon.types.map((type) => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>
      <button onClick={toggleFavorite}>
        {favorites.some((fav) => fav.name === pokemon.name)
          ? "Unfavorite"
          : "Favorite"}
      </button>
    </div>
  );
};

export default PokemonDetails;
