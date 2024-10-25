import { useEffect, useState } from "react";

const ContextPage = () => {
  const [savedPokemons, setSavedPokemons] = useState<any[]>([]);

  useEffect(() => {
    const fetchSavedPokemons = () => {
      const saved = localStorage.getItem("pokemonssaved");
      if (saved) {
        setSavedPokemons(JSON.parse(saved));
      }
    };

    fetchSavedPokemons();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Saved Pokémon</h2>
      {savedPokemons.length === 0 ? (
        <p>No Pokémon saved yet.</p>
      ) : (
        <div className="lg:flex lg:flex-wrap gap-4 grid grid-cols-1">
          {savedPokemons.map((pokemon, index) => (
            <div
              key={index}
              className="card bg-zinc-800 shadow-md rounded-md p-4 text-center justify-center items-center flex"
            >
              <h3 className="font-bold">{pokemon.name}</h3>
              <img
                src={pokemon.detail.sprites.front_default}
                alt={pokemon.name}
                className="w-32 h-32"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextPage;
