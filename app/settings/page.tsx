"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useAccountStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function Settings() {
  const router = useRouter();
  const { item: apiKey, setItem: setApiKeyInLocalStorage } =
    useLocalStorage("api-key");
  const { item: secretKey, setItem: setSecretKeyInLocalStorage } =
    useLocalStorage("secret-key");
  const [apikey, setApikey] = useState<string>(apiKey || "");
  const [secretkey, setSecretkey] = useState<string>(secretKey || "");
  const theme = useAccountStore((state) => state.theme);

  return (
    <div className="flex flex-col gap-6 flex-1 backdrop-blur-3xl">
      <button
        onClick={() => router.back()}
        className={`border border-gray-600 px-4 py-2 cursor-pointer w-fit  self-start justify-self-start ${theme === "light" ? "hover:bg-gray-400" : "hover:bg-gray-800"}`}
      >
        Back to main page
      </button>

      <form
        action={(payload) => {
          if (payload.get("apiKey")?.toString().length !== 64) {
            toast.error("Please enter a valid API Key.");
            return;
          }
          if (payload.get("secretKey")?.toString().length !== 64) {
            toast.error("Please enter a valid Secret Key.");
            return;
          }
          for (const [key, value] of payload.entries()) {
            if (typeof value === "string") {
              if (key === "apiKey") setApiKeyInLocalStorage(value);
              else setSecretKeyInLocalStorage(value);
            }
          }
          toast.success("Keys saved.");
        }}
        className="flex flex-col self-center gap-7 min-w-3xl border border-gray-700 rounded-4xl p-12 hover:shadow-xl hover:shadow-gray-700 shadow-2xs shadow-blue-400 justify-center"
      >
        <label htmlFor="apiKey">API Key</label>
        <input
          id="apiKey"
          name="apiKey"
          type="text"
          required
          className="border border-gray-600 p-3"
          value={apikey}
          onChange={(e) => setApikey(e.target.value)}
        ></input>
        <label htmlFor="apiKey">Secret Key</label>
        <input
          id="secretKey"
          name="secretKey"
          type="password"
          autoComplete="new-password"
          required
          className="border border-gray-600 p-3 "
          value={secretkey}
          onChange={(e) => setSecretkey(e.target.value)}
        ></input>

        <div className="flex gap-4">
          <button
            type="submit"
            className={`border border-gray-600 px-4 py-2 cursor-pointer w-fit  active:transform-[scale(0.9)] active:transition-all active:duration-200 ${theme === "light" ? "hover:bg-gray-400" : "hover:bg-gray-800"}`}
          >
            Save Keys
          </button>

          <button
            type="reset"
            className={`border border-gray-600 px-4 py-2 cursor-pointer w-fit  active:transform-[scale(0.9)] active:transition-all active:duration-200 ${theme === "light" ? "hover:bg-gray-400" : "hover:bg-gray-800"}`}
            onClick={async () => {
              const res = await fetch("/api/account");
              try {
                await res.json();
                toast.success("Connection is active.");
              } catch (err) {
                console.log(err);
                toast.error("Connection failed.");
              }
            }}
          >
            Test Connection
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
