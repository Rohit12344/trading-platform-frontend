import {
  CandleStickData,
  KlineData,
  KlineEvent,
  Order,
  SingleKlineBar,
  TimeFrame,
  Trade,
} from "@/types";
import { CandlestickData, UTCTimestamp } from "lightweight-charts";

export async function signRequest(
  queryString: string,
  secretKey: string,
): Promise<string> {
  const textEncoder = new TextEncoder();
  const encodedQueryString = textEncoder.encode(queryString);
  const encodedSecretKey = textEncoder.encode(secretKey);

  const key = await crypto.subtle.importKey(
    "raw",
    encodedSecretKey,
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encodedQueryString,
  );

  const signatureArray = new Uint8Array(signatureBuffer);

  let signature = "";
  for (const byte of signatureArray) {
    signature += byte.toString(16).padStart(2, "0");
  }

  return signature;
}

export async function buildSignedUrl(
  endpoint: string,
  params?: Record<string, string>,
): Promise<string> {
  const timestamp = Date.now();
  const searchParams = new URLSearchParams(params);
  searchParams.append("timestamp", timestamp.toString());
  const signature = await signRequest(
    searchParams.toString(),
    process.env.BINANCE_SECRET_KEY!,
  );

  searchParams.append("signature", signature);

  return `${process.env.NEXT_PUBLIC_BINANCE_TESTNET_URL!}/${endpoint}?${searchParams.toString()}`;
}

export async function getKlines(
  symbol: string,
  interval: TimeFrame,
  limit: number,
): Promise<KlineData> {
  const url = `${process.env.NEXT_PUBLIC_BINANCE_TESTNET_URL!}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json() as Promise<KlineData>;
}

// export async function getAccountInfo(): Promise<AccountInfo> {
//   const signedUrl = await buildSignedUrl("api/v3/account");
//   const response = await fetch(signedUrl, {
//     headers: {
//       "X-MBX-APIKEY": process.env.BINANCE_API_KEY!,
//     },
//   });
//   if (!response.ok) {
//     throw new Error(`Response status: ${response.status}`);
//   }
//   return response.json() as Promise<AccountInfo>;
// }

export async function getOpenOrders(symbol?: string): Promise<Order[]> {
  const signedUrl = await buildSignedUrl(
    "/api/v3/openOrders",
    symbol ? { symbol } : undefined,
  );
  const response = await fetch(signedUrl, {
    headers: {
      "X-MBX-APIKEY": process.env.BINANCE_API_KEY!,
    },
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json() as Promise<Order[]>;
}

export async function getTradeHistory(symbol: string): Promise<Trade[]> {
  const signedUrl = await buildSignedUrl("/api/v3/myTrades", { symbol });
  const response = await fetch(signedUrl, {
    headers: {
      "X-MBX-APIKEY": process.env.BINANCE_API_KEY!,
    },
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json() as Promise<Trade[]>;
}

// interface LimitOrderParam {
//   timeInForce?: "GTC" | "IOC" | "FOK";
// }
// export async function placeOrder({
//   symbol,
//   side,
//   type,
//   timeInForce,
//   quantity,
//   price,
// }: OrderFormState & LimitOrderParam): Promise<Order> {
//   const params =
//     type === "MARKET"
//       ? { symbol, side, type, quantity }
//       : { symbol, side, type, quantity, timeInForce, price };

//   const signedUrl = await buildSignedUrl(
//     "/api/v3/order",
//     params as Record<string, string>,
//   );
//   const response = await fetch(signedUrl, {
//     method: "POST",
//     headers: {
//       "X-MBX-APIKEY": process.env.NEXT_PUBLIC_BINANCE_API_KEY!,
//     },
//   });
//   if (!response.ok) {
//     throw new Error(`Response status: ${response.status}`);
//   }
//   return response.json() as Promise<Order>;
// }

export function convertKlineToCandlestick(
  kline: SingleKlineBar,
): CandleStickData {
  const [time, open, high, low, close] = kline;

  return {
    time: (Number(time) / 1000) as UTCTimestamp,
    open: Number(open),
    high: Number(high),
    low: Number(low),
    close: Number(close),
  };
}

export function convertKlineEventToCandlestick(
  data: KlineEvent,
): CandlestickData {
  const {
    k: { t: time, o: open, h: high, l: low, c: close },
  } = data;

  return {
    time: (Number(time) / 1000) as UTCTimestamp,
    open: Number(open),
    high: Number(high),
    low: Number(low),
    close: Number(close),
  };
}
