import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";

const Navbar = ({ setIsAuthorized, isAuthorized }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setIsAuthorized(false);
        localStorage.removeItem("loginStatus");
      })
      .catch((err) => {
        console.log("logout error", err);
      });
  };

  return (
    <>
      <nav className="bg-green-500 flex justify-between items-center p-5">
        <NavLink to="/">
          <h1 className="text-white text-4xl">BUSY BUY</h1>
        </NavLink>

        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div
          className={`lg:flex lg:items-center lg:justify-end${
            isOpen ? " flex flex-col overflow-y-scroll h-2/5" : " hidden"
          }`}
        >
          <NavLink
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:bg-red-500 p-1 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/cart"
            className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:bg-red-500 p-1 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            CART
          </NavLink>

          <NavLink
            to=""
            className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:bg-red-500 p-1 rounded-md"
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
          >
            {isAuthorized ? "LOGOUT" : "SIGN IN"}
          </NavLink>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
