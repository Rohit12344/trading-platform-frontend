import { create } from "zustand";
import { AccountInfo } from "../types/index";

export interface StoreState {
  symbol: string;
  marketPrice: number;
  accountInfo: AccountInfo | null;
  lastOrderTime: string | null;
  theme: string;
  setMarketPrice: (newPrice: number) => void;
  setSymbol: (newSymbol: string) => void;
  setAccountInfo: (newAccountInfo: AccountInfo) => void;
  setLastOrderTime: (newOrderInfo: string) => void;
  setTheme: (newTheme: string) => void;
}

export const useAccountStore = create<StoreState>((set) => ({
  symbol: "BTCUSDT",
  marketPrice: 0,
  accountInfo: null,
  lastOrderTime: null,
  theme: "dark",
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
  setLastOrderTime: (newOrderTime) =>
    set(() => ({
      lastOrderTime: newOrderTime,
    })),
  setTheme: (newTheme) =>
    set(() => ({
      theme: newTheme,
    })),
}));
