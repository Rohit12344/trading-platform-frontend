"use client";

import { useAccountStore } from "@/store";
import Link from "next/link";
import { useEffect } from "react";
import { IoSettings, IoSunny } from "react-icons/io5";

function NavBar() {
  const theme = useAccountStore((state) => state.theme);
  const setTheme = useAccountStore((state) => state.setTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("body")?.classList.remove("light");
      document.querySelector("body")?.classList.add("dark");
    } else {
      document.querySelector("body")?.classList.remove("dark");
      document.querySelector("body")?.classList.add("light");
    }
  }, [theme, setTheme]);

  return (
    <div
      className={`border border-gray-700 rounded-4xl py-2 px-2 flex justify-between sm:px-6 sticky top-0 bg-[#111317] w-2/3 self-center z-99 ${theme === "light" ? "bg-gray-200 text-white" : ""}`}
    >
      <div className="flex gap-3 items-center">
        <div className="inline-block bg-green-400 rounded-full w-3 h-3"></div>
        <Link href={"/"}>
          <span className={theme === "light" ? "text-blue-700" : ""}>
            Numatix
          </span>
        </Link>
      </div>

      <div className="flex gap-2 items-center sm:gap-4">
        <div className="rounded-2xl bg-gray-800 px-4 h-full flex items-center gap-3">
          {" "}
          <div className="inline-block bg-green-400 rounded-full w-3 h-3"></div>{" "}
          <span>Testnet</span>
        </div>

        <div
          className="rounded-full bg-gray-800 cursor-pointer flex items-center p-2"
          onClick={() => {
            if (theme === "dark") {
              setTheme("light");
            } else {
              setTheme("dark");
            }
          }}
        >
          <IoSunny className="w-6 h-6"></IoSunny>
        </div>

        <div className="rounded-full bg-gray-800 cursor-pointer flex items-center p-2">
          <Link href={"/settings"}>
            <IoSettings className="w-6 h-6"></IoSettings>
          </Link>
        </div>

        <div className="rounded-full bg-gray-800 p-3 flex items-center">
          <span className="text-xs">RG</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
