"use client";

export function getValueFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}

export function setValueInLocalStorage(key: string, value: string) {
  return localStorage.setItem(key, value);
}
