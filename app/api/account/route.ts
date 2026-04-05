import { buildSignedUrl } from "@/lib/binance";

export async function GET() {
  const signedUrl = await buildSignedUrl("api/v3/account");
  const response = await fetch(signedUrl, {
    headers: {
      "X-MBX-APIKEY": process.env.NEXT_PUBLIC_BINANCE_API_KEY!,
    },
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const data = await response.json();
  return Response.json(data);
}
