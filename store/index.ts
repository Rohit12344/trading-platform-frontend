import { create } from "zustand";
import { AccountInfo } from "../types/index";

export interface StoreState {
  symbol: string;
  marketPrice: number;
  accountInfo: AccountInfo | null;
  setMarketPrice: (newPrice: number) => void;
  setSymbol: (newSymbol: string) => void;
  setAccountInfo: (newAccountInfo: AccountInfo) => void;
}

export const useAccountStore = create<StoreState>((set) => ({
  symbol: "BTCUSDT",
  marketPrice: 0,
  accountInfo: null,
  setMarketPrice: (newPrice) =>
    set(() => ({
      marketPrice: newPrice,
    })),
  setSymbol: (newSymbol) =>
    set(() => ({
      symbol: newSymbol,
    })),
  setAccountInfo: (newAccountInfo) =>
    set(() => ({
      accountInfo: newAccountInfo,
    })),
}));
