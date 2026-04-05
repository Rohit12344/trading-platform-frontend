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

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.msg ?? "Bad Order Request." },
        {
          status: response.status,
          statusText: response.statusText,
        },
      );
    }

    return Response.json(data, {
      status: response.status,
      statusText: response.statusText,
    });
  } catch (e: unknown) {
    if (e && e instanceof Error) {
      console.error(e);
      return Response.json(
        { error: `${e.name} : ${e.message}` },
        {
          status: 500,
        },
      );
    }

    return Response.json(
      { error: "Error while placing the order." },
      {
        status: 500,
      },
    );
  }
}
