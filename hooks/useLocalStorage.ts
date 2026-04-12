"use client";
import { useEffect, useState } from "react";

function useLocalStorage(key: string) {
  const [item, setItem] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key) || "";
    } else return "";
  });

  useEffect(() => {
    if (item) {
      localStorage.setItem(key, item);
    }
  }, [item, key]);

  return { item, setItem };
}

export default useLocalStorage;
