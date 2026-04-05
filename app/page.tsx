import Chart from "@/components/Chart";
import OrderPanel from "@/components/OrderPanel";

export default function Home() {
  return (
    <main className="sm:grid sm:grid-cols-3 sm:gap-4">
      <div className="col-span-1">
        <OrderPanel />
      </div>

      <div className="col-span-2 w-full h-fit border border-gray-700 rounded-4xl">
        <Chart />
      </div>
    </main>
  );
}
