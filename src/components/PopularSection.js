import { useState, useEffect } from "react";
import "../css/PopularSection.css";
const PopularSection = ({ addToFavorites }) => {
  const [topStocksInfo, setTopStocksInfo] = useState([]);
  const [displayAmount, setDisplayAmount] = useState(8);
  const tradierToken = process.env.REACT_APP_TRADIER_TOKEN;

  const getTopStockSymbols = async (number) => {
    const tradierToken = process.env.REACT_APP_TRADIER_TOKEN;
    const response = await fetch(
      `https://api.tradier.com/v1/markets/lookup?q=`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tradierToken}`,
          Accept: "application/json",
        },
      }
    );
    const json = await response.json();
    const stocksData = json.securities.security;

    const symbols = stocksData.map((stock) => stock["symbol"]).slice(0, number);

    return symbols; // ["AMZN", "GOOG"...]
  };

  const getTopStockInfo = async (number) => {
    const symbolList = await getTopStockSymbols(number);
    const symbolStringList = symbolList.join(",");
    const response = await fetch(
      `https://api.tradier.com/v1/markets/quotes?symbols=${symbolStringList}&greeks=false`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tradierToken}`,
          Accept: "application/json",
        },
      }
    );
    const json = await response.json();
    const stockInfo = json.quotes.quote;
    setTopStocksInfo(stockInfo);
  };

  useEffect(() => {
    getTopStockInfo(4);
  }, []);

  const showMoreHandler = () => {
    getTopStockInfo(displayAmount);
    setDisplayAmount(displayAmount + 4);
  };
  return (
    <div className="popular-section">
      <h2 className="section-title">Popular Stocks</h2>

      <div className="card-section">
        {topStocksInfo.map((stock) => (
          <div className="stock-card">
            <h4 className="card-title">{stock.symbol}</h4>
            <div>{stock.description}</div>
            <br></br>
            <div>Current Price: ${stock.ask}</div>
            <div>Day Change: {stock.change_percentage}%</div>
            <button
              className="favorite-btn"
              onClick={() => addToFavorites(stock.symbol, stock.ask)}
            >
              Favorite!
            </button>
          </div>
        ))}
      </div>
      <button className="expand-btn" onClick={showMoreHandler}>
        SHOW MORE
      </button>
    </div>
  );
};

export default PopularSection;
