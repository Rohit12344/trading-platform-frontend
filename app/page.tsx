import Chart from "@/components/Chart";
import OrderPanel from "@/components/OrderPanel";

export default function Home() {
  return (
    <main className="flex-1 bg-gray-950 text-white text-xs space-y-4 sm:space-y-0 sm:text-base sm:grid sm:grid-cols-3 sm:gap-4 w-full p-6">
      <div className="">
        <OrderPanel />
      </div>

      <div className="col-span-2 w-full h-2/3 border border-gray-700 rounded-4xl">
        <Chart />
      </div>
    </main>
  );
}
