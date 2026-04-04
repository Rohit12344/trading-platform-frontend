import { create } from "zustand";
import { AccountInfo } from "../types/index";

export interface StoreState {
  symbol: string;
  accountInfo: AccountInfo | null;
  setSymbol: (newSymbol: string) => void;
  setAccountInfo: (newAccountInfo: AccountInfo) => void;
}

export const useAccountStore = create<StoreState>((set) => ({
  symbol: "BTCUSDT",
  accountInfo: null,
  setSymbol: (newSymbol) =>
    set(() => ({
      symbol: newSymbol,
    })),
  setAccountInfo: (newAccountInfo) =>
    set(() => ({
      accountInfo: newAccountInfo,
    })),
}));
