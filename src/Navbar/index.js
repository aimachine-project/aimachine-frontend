import React from "react";
import { BiHome, BiUser } from "react-icons/bi";

function Navbar() {
  return (
    <div className="p-2 bg-gray-300 flex flex-row justify-around lg:flex-col lg:justify-start">
      <a href="/" className="p-3">
        <BiHome className="text-5xl" aria-hidden="true" />
        <p className="hidden lg:visible">Home</p>
      </a>
      <a href="/" className="p-3">
        <BiUser className="text-5xl" aria-hidden="true" />
        <p className="hidden lg:visible">Log In</p>
      </a>
    </div>
  );
}

export default Navbar;
