import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import image from "../../assets/images/pokemon.svg";
import iconMap from "../../assets/iconMap";
const LayoutMain: React.FC = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, image]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <div className="drawer font-poppins bg-primary dark:bg-dark">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full p-5">
          <div className="navbar bg-secondary w-full shadow-md rounded-lg">
            <div className="flex justify-between w-full">
              <div className="flex-none lg:hidden dark:text-black">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex px-2 gap-3 h-full overflow-hidden">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={image} alt="Pokemon" />
                  </div>
                </div>
                <h2 className="text-xl hidden md:flex items-center dark:text-black ">
                  Pokemon
                </h2>
              </div>
            </div>
            <div className="hidden flex-none lg:block ">
              <button
                onClick={toggleTheme}
                className="btn btn-ghost hover:bg-transparent tooltip tooltip-left"
                data-tip="best experience try using dark mode"
              >
                {theme !== "light" ? (
                  <div className="flex items-center gap-1 text-zinc-800">
                    <iconMap.MdOutlineWbSunny size={25} /> <h4>light</h4>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-zinc-800">
                    <iconMap.MdOutlineDarkMode size={25} />
                    <h4>dark</h4>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Page content here */}
        <div className="p-4 min-h-screen h-fit bg-primary dark:bg-dark">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 z-10 p-4">
          {/* Sidebar content here */}
          <div>
            <button
              onClick={toggleTheme}
              className="btn btn-ghost hover:bg-transparent tooltip absolute bottom-5 tooltip-right"
              data-tip="best experience try using dark mode"
            >
              {theme !== "light" ? (
                <div className="flex items-center gap-1">
                  <iconMap.MdOutlineWbSunny size={25} /> <h4>light</h4>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <iconMap.MdOutlineDarkMode size={25} />
                  <h4>dark</h4>
                </div>
              )}
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};
export default LayoutMain;
