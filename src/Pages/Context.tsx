import { useEffect, useState } from "react";
import iconMap from "../assets/iconMap";
import { usePokemonContext } from "../context/PokemonContext";
const ContextPage = () => {
  const [savedPokemons, setSavedPokemons] = useState<any[]>([]);
  const { pokemons, removePokemon } = usePokemonContext();

  const handleDelete = (alias: string) => {
    const pokemonToRemove = pokemons.find((pokemon) => pokemon.alias === alias);
    if (pokemonToRemove) {
      removePokemon(pokemonToRemove.id);
    }
  };
  useEffect(() => {
    setSavedPokemons(pokemons);
  }, [pokemons]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Saved Pokémon</h2>
      {savedPokemons.length === 0 ? (
        <p>No Pokémon saved yet.</p>
      ) : (
        <div className="lg:flex lg:flex-wrap gap-4 grid grid-cols-1">
          {/* Render saved pokemons here */}
          {savedPokemons.map((pokemon, index) => (
            <div
              key={index}
              className="card dark:bg-zinc-800 shadow-md rounded-md p-4 text-center justify-center items-center flex"
            >
              <h3 className="font-bold">{pokemon.name}</h3>
              <div className="font-extralight text-sm text-zinc-600">
                {pokemon.alias}
              </div>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-32 h-32"
              />
              <button
                className="btn btn-ghost hover:bg-red-500"
                onClick={() => handleDelete(pokemon.alias)}
              >
                <iconMap.FaTrash size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextPage;
