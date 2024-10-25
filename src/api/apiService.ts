import axiosInstance from "../utils/axiosConfig";

// Fungsi untuk mengambil data Pokemon
export const fetchPokemonList = async (limit: number) => {
  try {
    const response = await axiosInstance.get("pokemon", {
      params: { limit: limit },
    });
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch Pokémon data");
  }
};

// Fungsi lainnya (misalnya untuk mengambil detail Pokemon)
export const fetchPokemonDetails = async (name: string) => {
  try {
    const response = await axiosInstance.get(`pokemon/${name}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch Pokémon data");
  }
};
