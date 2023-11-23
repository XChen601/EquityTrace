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
    setStockData(data.quotes.quote)
  }

  useEffect(() => {
    fetchStockData()
  }, [])

  return (
<div className="favorite">
      <div>
        <div className='favorite-head'>
          <h2>{symbol}</h2>
        </div>
        <p className='description'>{stockData.description}</p>
        <h4>Current Price: <div>${stockData.ask}</div></h4>
        <h4>Price Movement: <div>{stockData.change_percentage}%</div></h4>
        <h4>Volume: <div>{stockData.last_volume}</div></h4>
        <h4>52 Week High: <div>{stockData.week_52_high}</div></h4>
        <h4>52 Week Low: <div>{stockData.week_52_low}</div></h4>
      </div>
    </div>
  );
};

export default StockInfo;
