export async function placeOrder(formData: FormData) {
  const params: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && key !== "total") params[key] = value;
  }

  const searchParams = new URLSearchParams(params);
  try {
    const res = await fetch(`/api/order?${searchParams}`, { method: "POST" });

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
