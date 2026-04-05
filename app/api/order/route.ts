import { buildSignedUrl } from "@/lib/binance";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const params: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  const signedUrl = await buildSignedUrl("api/v3/order", params);
  try {
    const response = await fetch(signedUrl, {
      method: "POST",
      headers: {
        "X-MBX-APIKEY": process.env.NEXT_PUBLIC_BINANCE_API_KEY!,
      },
    });
    const data = await response.json();
    console.log(data);
    return Response.json(data);
  } catch (e) {
    console.log(e);
  }
}

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
