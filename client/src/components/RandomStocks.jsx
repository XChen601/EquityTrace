import React from 'react';
import StockItem from './StockItem';

const RandomStocks = () => {
  const stockList = ["AAPL", "AMZN", "TSLA", "MSFT", "NVDA"]
  return (
    <div>
      {stockList.map(symbol => (
                <StockItem key={symbol} symbol={symbol} />
            ))}
    </div>
  );
};

export default RandomStocks;
