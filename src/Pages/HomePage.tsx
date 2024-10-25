import { useEffect, useState } from "react";
import {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchListType,
} from "../api/apiservice";
import iconMap from "../assets/iconMap";
const HomePages = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [dataDetail, setDataDetail] = useState<any>(null);
  const [filter, setFilter] = useState({
    type: "",
    limit: 10,
  }); // Untuk filter by type
  const [searchName, setSearchName] = useState(""); // Untuk pencarian
  const [alias, setAlias] = useState(""); // Untuk alias
  const [savingModal, setSavingModal] = useState(false); // Untuk modal menyimpan alias
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null); // Untuk menyimpan Pokémon yang dipilih
  const [nameDetail, setNameDetail] = useState("");
  const [listType, setListType] = useState<any[]>([]);
  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetchPokemonList(filter.limit);
      const detailedList = await Promise.all(
        res.results.map(async (pokemon: any) => {
          const details = await fetchPokemonDetails(pokemon.name);
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            types: details.types.map((typeInfo: any) => typeInfo.type.name),
          };
        })
      );
      setData(detailedList);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getDetail = async (name: string) => {
    try {
      const res = await fetchPokemonDetails(name);
      setDataDetail(res);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getType = async () => {
    setLoading(true);
    try {
      const res = await fetchListType();
      setListType(res.results);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSave = () => {
    if (alias) {
      const savedPokemons =
        JSON.parse(localStorage.getItem("pokemonssaved") || "[]") || [];
      savedPokemons.push({
        name: selectedPokemon.name,
        detail: selectedPokemon,
        alias,
      });
      localStorage.setItem("pokemonssaved", JSON.stringify(savedPokemons));
      setSavingModal(false);
      setAlias("");
    }
  };
  const detailPokemon = (pokemon: any) => {
    setSelectedPokemon(pokemon);
    getDetail(pokemon.name);
    setNameDetail(pokemon.name);
    setModal(true);
  };

  const filteredData = data.filter(
    (pokemon) =>
      (!filter.type || pokemon.types.includes(filter.type)) &&
      pokemon.name.toLowerCase().includes(searchName.toLowerCase())
  );

  useEffect(() => {
    getData();
    getType();
  }, [filter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="block w-full">
      <div className="flex flex-wrap w-full gap-5 my-2">
        {/* Filter by type */}
        <select
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, type: e.target.value }))
          }
          value={filter.type}
          className="select select-bordered w-full max-w-xs input-ghost"
        >
          <option value="">All Types</option>
          {listType.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
          {/* Tambahkan opsi type lainnya sesuai kebutuhan */}
        </select>
        {/* set limit*/}
        <select
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, limit: +e.target.value }))
          }
          value={filter.limit}
          className="select select-bordered w-full max-w-xs input-ghost"
        >
          <option value={1000000}>All</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          {/* Tambahkan opsi type lainnya sesuai kebutuhan */}
        </select>
        {/* Search by name */}
        <label className="input input-ghost input-bordered flex items-center gap-2 max-w-xs">
          <input
            type="text"
            placeholder="Search by name ..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
      </div>

      {savingModal && (
        <dialog
          id="alias_modal"
          className="modal modal-open"
          onClick={() => setSavingModal(false)}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg">
              Input Alias for {dataDetail.name}
            </h3>
            <input
              type="text"
              placeholder="Enter alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="input w-full my-2 input-bordered"
            />
            <div className="modal-action">
              <button className="btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn"
                onClick={() => {
                  setSavingModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
      {modal && (
        <dialog
          id="my_modal_1"
          className="modal modal-open"
          onClick={() => setModal(false)}
        >
          <div
            className="modal-box dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <section className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{nameDetail}</h3>
              <button onClick={() => setModal(false)}>
                <iconMap.IoClose size={20} />
              </button>
            </section>
            <div className="py-4 flex justify-around">
              <div className="items-center justify-center flex">
                <img
                  src={dataDetail ? dataDetail.sprites.front_default : ""}
                  alt="pokemon"
                  className="w-40 h-40 items-center"
                />
              </div>
              <div className="grid grid-cols-2 my-auto gap-4">
                <div className="py-2">
                  <h2 className="text-xl">Types:</h2>
                  <ul className="list-disc list-inside">
                    {dataDetail &&
                      dataDetail.types.map((type: any, index: number) => (
                        <li className="truncate" key={index}>
                          {type.type.name}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="py-2">
                  <h2 className="text-xl">Abilities:</h2>
                  <ul className="list-disc list-inside">
                    {dataDetail &&
                      dataDetail.abilities.map(
                        (ability: any, index: number) => (
                          <li key={index} className="truncate">
                            {ability.ability.name}
                          </li>
                        )
                      )}
                  </ul>
                </div>
                <div className="py-2">
                  <h2 className="text-xl">Height:</h2>
                  <p className="truncate">
                    {dataDetail && dataDetail.height} m{" "}
                  </p>
                </div>
                <div className="py-2">
                  <h2 className="text-xl">Weight:</h2>
                  <p className="truncate">
                    {dataDetail && dataDetail.weight} m
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSavingModal(true),
                  setModal(false),
                  setSelectedPokemon(dataDetail);
              }}
            >
              <iconMap.MdFormatListBulletedAdd size={20} />
            </button>
          </div>
        </dialog>
      )}
      <h1>Pokémon List:</h1>
      <div className="flex flex-wrap gap-4 my-2">
        {filteredData.map((pokemon: any, index) => (
          <div
            className="card dark:bg-zinc-800 shadow-md rounded-xl p-20 flex-grow flex-shrink-0 w-1/10 text-center items-center font-light shadow-zinc-200 dark:shadow-zinc-900 text-lg hover:p-24 cursor-pointer hover:text-yellow-300 dark:hover:text-yellow-200 hover:text-shadow-xl transition-all  ease-in-out delay-100 hover:shadow-lg"
            key={index}
            onClick={() => {
              detailPokemon(pokemon);
            }}
          >
            {pokemon.name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomePages;
