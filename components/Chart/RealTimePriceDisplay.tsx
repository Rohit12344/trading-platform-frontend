function RealTimePriceDisplay({
  symbol,
  price,
}: {
  symbol: string;
  price: string;
}) {
  return (
    <>
      <h2 className="text-xl">{symbol}</h2>
      <h1 className="text-2xl">$ {price}</h1>{" "}
    </>
  );
}

export default RealTimePriceDisplay;
