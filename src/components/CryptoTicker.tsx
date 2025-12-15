const tickerData = [
  { symbol: "BTC", name: "Bitcoin", change: "+2.45%", positive: true },
  { symbol: "ETH", name: "Ethereum", change: "+1.82%", positive: true },
  { symbol: "SOL", name: "Solana", change: "+5.67%", positive: true },
  { symbol: "XRP", name: "Ripple", change: "-0.92%", positive: false },
  { symbol: "ADA", name: "Cardano", change: "+3.21%", positive: true },
  { symbol: "DOGE", name: "Dogecoin", change: "-1.45%", positive: false },
  { symbol: "AVAX", name: "Avalanche", change: "+4.12%", positive: true },
  { symbol: "DOT", name: "Polkadot", change: "+2.89%", positive: true },
  { symbol: "MATIC", name: "Polygon", change: "-0.34%", positive: false },
  { symbol: "LINK", name: "Chainlink", change: "+1.56%", positive: true },
];

const CryptoTicker = () => {
  // Triple the data for seamless infinite scroll
  const tripleData = [...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="w-full overflow-hidden bg-secondary/50 border-b border-border/30 py-2">
      <div className="inline-flex gap-8 animate-ticker">
        {tripleData.map((coin, index) => (
          <div key={index} className="flex items-center gap-2 px-4 whitespace-nowrap">
            <span className="font-semibold text-foreground">{coin.symbol}</span>
            <span className="text-muted-foreground text-sm">{coin.name}</span>
            <span
              className={`font-medium text-sm ${
                coin.positive ? "text-success" : "text-destructive"
              }`}
            >
              {coin.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoTicker;
