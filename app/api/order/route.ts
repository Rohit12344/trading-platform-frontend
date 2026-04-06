import { buildSignedUrl } from "@/lib/binance";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const params: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  try {
    const signedUrl = await buildSignedUrl("api/v3/order", params);

    const response = await fetch(signedUrl, {
      method: "POST",
      headers: {
        "X-MBX-APIKEY": process.env.BINANCE_API_KEY!,
      },
    });

    if (!response.ok) {
      return Response.json(await response.json(), {
        status: response.status,
        statusText: response.statusText,
      });
    }
    const data = await response.json();

    return Response.json(data);
  } catch (e: unknown) {
    console.error(e);
    return Response.error();
  }
}
