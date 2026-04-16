import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from "react-icons/io5";

const SidebarSubMenu = ({ route }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <li className="relative px-6 py-3" key={route.name}>
        <button
          className="inline-flex items-center justify-between focus:outline-none w-full text-sm font-semibold transition-colors duration-150 hover:text-green-600 dark:hover:text-gray-200"
          onClick={() => setOpen(!open)}
          aria-haspopup="true"
        >
          <span className="inline-flex items-center">
            <route.icon className="w-5 h-5" aria-hidden="true" />
            <span className="ml-4 mt-1">{t(`${route.name}`)}</span>
            <span className="pl-4 mt-1">
              {open ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
            </span>
          </span>
        </button>
        {open && route.routes && (
          <ul
            className="p-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md dark:text-gray-400 dark:bg-gray-900"
            aria-label="submenu"
          >
            {route.routes.map((child, index) => (
              <li key={index}>
                {child.outside ? (
                  <a
                    href={child.path}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-green-600 cursor-pointer"
                  >
                    <span className="text-xs text-gray-500 pr-1">
                      <IoRemoveSharp />
                    </span>
                    <span className="text-gray-500 hover:text-green-600 dark:hover:text-gray-200">
                      {t(`${child.name}`)}
                    </span>
                  </a>
                ) : (
                  <NavLink
                    to={child.path}
                    className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-green-600 cursor-pointer"
                    activeStyle={{
                      color: "#0d9e6d",
                    }}
                    rel="noreferrer"
                  >
                    <span className="text-xs text-gray-500 pr-1">
                      <IoRemoveSharp />
                    </span>
                    <span className="text-gray-500 hover:text-green-600 dark:hover:text-gray-200">
                      {t(`${child.name}`)}
                    </span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        )}
        {/* Debugging: Log the route.routes to verify its structure */}
        {console.log("Submenu Routes:", route.routes)}
      </li>
    </>
  );
};

export default SidebarSubMenu;
