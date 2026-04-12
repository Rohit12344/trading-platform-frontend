import Chart from "@/components/Chart";
import NavBar from "@/components/NavBar";
import OrderPanel from "@/components/OrderPanel";
import Tabs from "@/components/Tabs";

export default function Home() {
  return (
    <>
      <header className="flex flex-col gap-5">
        <NavBar />
        <h1 className="col-span-3 text-2xl text-gray-400 tracking-wide text-center">
          Portfolio
        </h1>
      </header>
      <main className="sm:grid sm:grid-cols-3 sm:gap-4 flex flex-col gap-4">
        <div className="col-span-1">
          <OrderPanel />
        </div>

        <div className="col-span-2 w-full h-fit flex flex-col gap-4">
          <Chart />
          <Tabs />
        </div>
      </main>
    </>
  );
}
