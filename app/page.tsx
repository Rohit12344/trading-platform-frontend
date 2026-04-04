import Chart from "@/components/Chart";
import OrderPanel from "@/components/OrderPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white text-xs space-y-4 sm:space-y-0 sm:text-base sm:grid sm:grid-cols-3 sm:gap-4 w-full ">
      <OrderPanel />
      <Chart />
    </main>
  );
}
