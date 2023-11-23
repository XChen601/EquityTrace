import React from 'react';
import StockItem from './StockItem';


const PopularStocks = () => {
  const stockList = ["AAPL", "AMZN", "TSLA", "MSFT", "NVDA"]

  return (
    <section className='content'>
      <h2>Popular Stocks</h2>
      <div className='favorites'>
        {stockList.map(symbol => (
          <StockItem key={symbol} symbol={symbol} />
        ))}
      </div>
    </section>
  );
};

export default PopularStocks;
