"use client";
import Chart from "@/components/Chart";
import NavBar from "@/components/NavBar";
import OrderPanel from "@/components/OrderPanel";
import Tabs from "@/components/Tabs";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAccountStore } from "@/store";

export default function Home() {
  const symbol = useAccountStore((state) => state.symbol);
  const { price } = useWebSocket(symbol.toLowerCase());
  return (
    <>
      <NavBar />
      <header className="flex flex-col gap-5">
        <h1 className="col-span-3 text-2xl text-gray-400 tracking-wide text-center">
          Portfolio
        </h1>
      </header>
      <main className="sm:grid sm:grid-cols-3 sm:gap-4 flex flex-col gap-4">
        <div className="col-span-1">
          <OrderPanel realTimePrice={price} />
        </div>

        <div className="col-span-2 w-full h-fit flex flex-col gap-4">
          <Chart realTimePrice={price} />
          <Tabs realTimePrice={price} />
        </div>
      </main>
    </>
  );
}
