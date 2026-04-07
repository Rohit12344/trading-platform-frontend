import React from "react";
import { IoSunny } from "react-icons/io5";

function NavBar() {
  return (
    <div className="border border-gray-700 rounded-4xl py-2 px-2 flex justify-between sm:px-6">
      <div className="flex gap-3 items-center">
        <div className="inline-block bg-green-400 rounded-full w-3 h-3"></div>
        <span>Numatix</span>
      </div>

      <div className="flex gap-2 items-center sm:gap-4">
        <div className="rounded-2xl bg-gray-800 px-4 h-full flex items-center gap-3">
          {" "}
          <div className="inline-block bg-green-400 rounded-full w-3 h-3"></div>{" "}
          <span>Testnet</span>
        </div>

        <div className="rounded-full bg-gray-800 cursor-pointer flex items-center p-2">
          <IoSunny className="w-6 h-6"></IoSunny>
        </div>

        <div className="rounded-full bg-gray-800 p-3 flex items-center">
          <span className="text-xs">RG</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
