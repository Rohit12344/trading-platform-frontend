import { OrderSide, TableTabsType, TimeFrame } from "@/types";

export const TimeFrames: TimeFrame[] = ["1m", "5m", "1d", "1w"];
export const OrderSides: OrderSide[] = ["BUY", "SELL"];
export const OrderTypes: string[] = ["LIMIT", "MARKET", "STOP MARKET"];
export const TableTabs: TableTabsType[] = ["Positions", "Orders", "Trades"];

export const TableColumns: Record<TableTabsType, string[]> = {
  Positions: [
    "Symbol",
    "Size",
    "Entry Price",
    "Market Price",
    "Unrealized Pnl",
    "Realized Pnl",
  ],
  Orders: [],
  Trades: [],
};

export const errorMsg: Record<string, string> = {
  "Filter failure: PRICE_FILTER":
    "price is too high, too low, and/or not following the tick size rule for the symbol.",
  "Filter failure: PERCENT_PRICE_BY_SIDE":
    "price is X% too high or X% too low from the average weighted price over the last Y minutes.",
  "Filter failure: LOT_SIZE":
    "quantity is too high, too low, and/or not following the step size rule for the symbol.",
  "Filter failure: MIN_NOTIONAL":
    "price * quantity is too low to be a valid order for the symbol.",
  "Filter failure: NOTIONAL":
    "price * quantity is not within range of the minNotional and maxNotional",
  "Filter failure: ICEBERG_PARTS":
    "ICEBERG order would break into too many parts; icebergQty is too small.",
  "Filter failure: MARKET_LOT_SIZE":
    "MARKET order's quantity is too high, too low, and/or not following the step size rule for the symbol.",
  "Filter failure: MAX_POSITION":
    "The account's position has reached the maximum defined limit. This is composed of the sum of the balance of the base asset, and the sum of the quantity of all open BUY orders.",
  "Filter failure: MAX_NUM_ORDERS":
    "Account has too many open orders on the symbol.",
  "Filter failure: MAX_NUM_ALGO_ORDERS":
    "Account has too many open stop loss and/or take profit orders on the symbol.",
  "Filter failure: MAX_NUM_ICEBERG_ORDERS":
    "Account has too many open iceberg orders on the symbol.",
  "Filter failure: MAX_NUM_ORDER_AMENDS":
    "Account has made too many amendments to a single order on the symbol.",
  "Filter failure: MAX_NUM_ORDER_LISTS":
    "Account has too many open order lists on the symbol.",
  "Filter failure: TRAILING_DELTA":
    "trailingDelta is not within the defined range of the filter for that order type.",
  "Filter failure: EXCHANGE_MAX_NUM_ORDERS":
    "Account has too many open orders on the exchange.",
  "Filter failure: EXCHANGE_MAX_NUM_ALGO_ORDERS":
    "Account has too many open stop loss and/or take profit orders on the exchange.",
  "Filter failure: EXCHANGE_MAX_NUM_ICEBERG_ORDERS":
    "Account has too many open iceberg orders on the exchange.",
  "Filter failure: EXCHANGE_MAX_NUM_ORDER_LISTS":
    "Account has too many open order lists on the exchange.",
};
