import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Tipe Pokémon
interface Pokemon {
  name: string;
  id: number;
  image?: string;
  alias?: string;
  types: string[];
}

// Perbarui tipe untuk menyertakan nilai-nilai tambahan
interface PokemonContextProps {
  selectedPokemon: Pokemon | null;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
  pokemons: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (id: number) => void;
}

// Inisialisasi PokemonContext
const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined
);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  // Inisialisasi state dari localStorage, jika ada
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(() => {
    const savedPokemon = localStorage.getItem("selectedPokemon");
    return savedPokemon ? JSON.parse(savedPokemon) : null;
  });

  const [pokemons, setPokemons] = useState<Pokemon[]>(() => {
    const savedPokemons = localStorage.getItem("pokemonssaved");
    return savedPokemons ? JSON.parse(savedPokemons) : [];
  });

  // Set Pokemon terpilih dan simpan ke localStorage
  // Modifikasi handleSetSelectedPokemon
  const handleSetSelectedPokemon = (pokemon: any | null) => {
    if (pokemon) {
      const updatedPokemon = {
        ...pokemon,
        image: pokemon.sprites?.front_default || "",
      };
      setSelectedPokemon(updatedPokemon);
      localStorage.setItem("selectedPokemon", JSON.stringify(updatedPokemon));
    } else {
      setSelectedPokemon(null);
      localStorage.removeItem("selectedPokemon");
    }
  };

  // Fungsi untuk menambah Pokemon ke daftar dan simpan ke localStorage
  const addPokemon = (pokemon: Pokemon) => {
    console.log(pokemon);
    setPokemons((prev) => {
      const updatedPokemons = [...prev, pokemon];
      localStorage.setItem("pokemonssaved", JSON.stringify(updatedPokemons));
      return updatedPokemons;
    });
  };

  // Fungsi untuk menghapus Pokemon dari daftar dan perbarui localStorage
  const removePokemon = (id: number) => {
    setPokemons((prev) => {
      const updatedPokemons = prev.filter((p) => p.id !== id);
      localStorage.setItem("pokemonssaved", JSON.stringify(updatedPokemons));
      return updatedPokemons;
    });
  };
  // Setel nilai awal dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const savedSelectedPokemon = localStorage.getItem("selectedPokemon");
    if (savedSelectedPokemon) {
      setSelectedPokemon(JSON.parse(savedSelectedPokemon));
    }

    const savedPokemons = localStorage.getItem("pokemons");
    if (savedPokemons) {
      setPokemons(JSON.parse(savedPokemons));
    }
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
        setSelectedPokemon: handleSetSelectedPokemon,
        pokemons,
        addPokemon,
        removePokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext harus digunakan dalam PokemonProvider");
  }
  return context;
};
