"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
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

  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 ">
      <button
        onClick={() => router.back()}
        className="border border-gray-600 px-4 py-2 cursor-pointer w-fit hover:bg-gray-800"
      >
        Back
      </button>

      <form
        onSubmit={() => {
          toast.success("Keys saved.");
        }}
        action={(payload) => {
          for (const [key, value] of payload.entries()) {
            if (typeof value === "string") {
              if (key === "apiKey") setApiKeyInLocalStorage(value);
              else setSecretKeyInLocalStorage(value);
            }
          }
        }}
        className="flex flex-col gap-4 min-w-3xl border border-gray-700 rounded-4xl p-9 hover:shadow-xl bg-[rgba(209, 16, 29, 0.7)] hover:shadow-gray-700"
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

        <button
          type="submit"
          className="border border-gray-600 px-4 py-2 cursor-pointer w-fit hover:bg-gray-800 "
        >
          Save Keys
        </button>
      </form>
    </div>
  );
}

export default Settings;
