import iconMap from "../assets/iconMap";
import menuItems from "../assets/menuItems.json";
import React from "react";
interface SidebarProps {
  toggleTheme: () => void;
  toggleProfile: () => void;
  theme: string;
}
const sidebar: React.FC<SidebarProps> = ({
  toggleTheme,
  theme,
  toggleProfile,
}) => {
  const basename = import.meta.env.BASE_URL;
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 min-h-full w-80 z-10 p-4">
        {/* Sidebar content here */}
        {/* Render menu items dynamically */}
        {menuItems.map((item, index) => {
          const iconKey = item.icon as keyof typeof iconMap;
          const IconComponent = iconMap[iconKey];

          return (
            <li key={index} className="mb-2">
              <a
                href={basename + item.route.replace(/^\//, "")}
                className="flex items-center gap-2"
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {IconComponent
                  ? React.createElement(IconComponent, { size: 25 })
                  : null}
                {/* Render the icon if it exists */}
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}

        <div>
          <div
            className="absolute bottom-8 right-4 p-0.5 cursor-pointer"
            onClick={toggleProfile}
          >
            Nadifdzaikra
          </div>
          {/* Toggle theme button */}
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
  );
};
export default sidebar;
