import { buildSignedUrl } from "@/lib/binance";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const params: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  const signedUrl = await buildSignedUrl("api/v3/openOrders", params);
  const response = await fetch(signedUrl, {
    headers: {
      "X-MBX-APIKEY": process.env.BINANCE_API_KEY!,
    },
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const data = await response.json();
  return Response.json(data);
}
