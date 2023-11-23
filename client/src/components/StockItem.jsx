import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockInfo = ({ symbol }) => {
  const [stockData, setStockData] = useState({})

  const fetchStockData = async () => {
    const tradierToken = process.env.REACT_APP_TRADIER_TOKEN;

    const response = await fetch(
      `https://api.tradier.com/v1/markets/quotes?symbols=${symbol}&greeks=false`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tradierToken}`,
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    const stockInfo = data.quotes.quote;
    setStockData(stockInfo)
  }

  useEffect(() => {
    fetchStockData()
  }, [])

  return (
      <div>
          <h2>{symbol}</h2>
          {/* Display your stock data here */}
      </div>
  );
};

export default StockInfo;
