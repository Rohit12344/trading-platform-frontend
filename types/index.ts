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

export interface KlineEvent {
  e: "kline"; // Event type
  E: number; // Event time
  s: string; // Symbol
  k: {
    t: number; // Kline start time
    T: number; // Kline close time
    s: string; // Symbol
    i: TimeFrame; // Interval
    f: number; // First trade ID
    L: number; // Last trade ID
    o: string; // Open price
    c: string; // Close price
    h: string; // High price
    l: string; // Low price
    v: string; // Base asset volume
    n: number; // Number of trades
    x: boolean; // Is this kline closed?
    q: string; // Quote asset volume
    V: string; // Taker buy base asset volume
    Q: string; // Taker buy quote asset volume
    B: string; // Ignore
  };
}

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

export interface OrderErrorResponse {
  code: string;
  msg: string;
}

export interface StateType {
  ok: boolean;
  message?: string;
  orderId?: string;
}

export type TableTabsType = "Positions" | "Orders" | "Trades";

export interface PositionsTableType {
  symbol: string;
  size: string;
  price: string;
  marketPrice: number;
  unrealizedPnl: number;
}

export interface TradeTableType {
  symbol: string;
  side: OrderSide;
  qty: string;
  price: string;
  realizedPnl: number;
  time: string;
}

export interface OrderTableType {
  symbol: string;
  side: OrderSide;
  qty: string;
  price: string;
  status: string;
  time: string;
}
