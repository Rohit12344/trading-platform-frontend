import { UTCTimestamp } from "lightweight-charts";

export interface TradeEvent {
  E: number;
  M: boolean;
  T: number;
  e: string;
  m: boolean;
  p: string;
  q: string;
  s: string;
  t: number;
}

export type SingleKlineBar = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
];

export type KlineData = SingleKlineBar[];

export type CandleStickData = {
  color?: string;
  borderColor?: string;
  wickColor?: string;
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
  customValues?: Record<string, unknown>;
};

export interface ApiConfig {
  apiKey: string;
  secretKey: string;
  isConfigured: boolean;
}

export type OrderSide = "BUY" | "SELL";
export type OrderType = "MARKET" | "LIMIT" | "STOP_LOSS_LIMIT";

export type TimeFrame = "1m" | "5m" | "1d" | "1w";

export interface OrderFormState {
  symbol: string;
  side: OrderSide;
  type: OrderType;
  price?: string;
  quantity?: string;
}

export type ActiveTab = "trades" | "orders" | "positions";

export interface Balance {
  asset: string;
  free: string;
  locked: string;
}

export interface AccountInfo {
  balances: Balance[];
}

export type OrderStatus =
  | "NEW"
  | "PENDING_NEW"
  | "PARTIALLY_FILLED"
  | "FILLED"
  | "CANCELED"
  | "PENDING_CANCEL"
  | "REJECTED"
  | "EXPIRED";

export interface Order {
  symbol: string;
  side: OrderSide;
  type: OrderType;
  price: string;
  origQty: string;
  status: OrderStatus;
  time: UTCTimestamp;
}

export interface Trade {
  symbol: string;
  isBuyer: boolean;
  price: string;
  qty: string;
  time: number;
}
