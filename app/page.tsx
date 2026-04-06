import Chart from "@/components/Chart";
import OrderPanel from "@/components/OrderPanel";
import Tabs from "@/components/Tabs";

export default function Home() {
  return (
    <main className="sm:grid sm:grid-cols-3 sm:gap-4 flex flex-col gap-4">
      <div className="col-span-1">
        <OrderPanel />
      </div>

      <div className="col-span-2 w-full h-fit flex flex-col gap-4">
        <Chart />
        <Tabs />
      </div>
    </main>
  );
}
