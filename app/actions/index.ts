"use server";
import { errorMsg } from "@/constants";

export async function placeOrder(prevState: unknown, formData: FormData) {
  const params: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && key !== "total" && !key.includes("$"))
      params[key] = value;
  }

  const searchParams = new URLSearchParams(params);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL!}/api/order?${searchParams}`,
      {
        method: "POST",
      },
    );
    const data = await res.json();

    if (!res.ok) {
      return `Order request failed: ${errorMsg[data.error] ?? data.error ?? res.statusText}`;
    }
    return data?.orderId;
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      console.error(err.message);
    }
    return "Order request failed: Error in placing the order";
  }
}
