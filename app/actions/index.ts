"use server";

import { StateType } from "@/types";

export async function placeOrder(
  prevState: StateType | null,
  formData: FormData | null,
) {
  if (formData === null) {
    return null;
  }

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
      throw new Error(data.msg, {
        cause: `"${res.status} - ${res.statusText}", "Code ${data.code}" - "${data.msg}"`,
      });
    }

    return {
      ok: res.ok,
      message: `Order ${data.orderId} successfully placed`,
    };
  } catch (err: unknown) {
    console.error(err);
    if (err && err instanceof Error) {
      return {
        ok: false,
        message: err.message,
      };
    }

    return {
      ok: false,
      message: "Error while placing the order",
    };
  }
}
