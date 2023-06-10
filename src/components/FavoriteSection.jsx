import React, { useState, useEffect } from "react";
import {
  deleteFromDatabase,
  isUserSignedIn,
  getUserName,
  getUserFavorites,
  getFavoriteStockPrice,
  asyncGetUserName,
} from "../Firebase";
import "bootstrap/dist/css/bootstrap.css";
import FavoriteCard from "./FavoriteCard";

export default function FavoriteSection({ favorites, setFavorites }) {
  const [favoritedStocksData, setFavoritedStocksData] = useState([]);

  const handleRemoveFavorite = async (symbol) => {
    await deleteFromDatabase(symbol, getUserName());
    // remove symbol from favoritedStocksData
    const newFavoritedStocksData = favoritedStocksData.filter(
      (stock) => stock.symbol !== symbol
    );
    setFavoritedStocksData(newFavoritedStocksData);

  };

  useEffect(() => {
    async function fetchStocksData() {
      if (favorites.length === 0) {
        setFavoritedStocksData([]);
        return;
      }
      const tradierToken = process.env.REACT_APP_TRADIER_TOKEN;
      const symbolList = favorites.join(",");

      const response = await fetch(
        `https://api.tradier.com/v1/markets/quotes?symbols=${symbolList}&greeks=false`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tradierToken}`,
            Accept: "application/json",
          },
        }
      );
      const stockInfo = await response.json();
      let stockList = stockInfo.quotes.quote;
      // sometimes will return dictionary if only one stock is searched
      // if stockList is not a list, make it a list
      if (!Array.isArray(stockList)) {
        stockList = [stockList];
      }

      // for each stock in stockList, get the last price from database, add more info to each stock in stockList
      for (let i = 0; i < stockList.length; i++) {
        const stock = stockList[i];
        const userName = await asyncGetUserName();
        const savedPrice = await getFavoriteStockPrice(stock.symbol, userName);
        stock.savedPrice = savedPrice;
        const priceChange = stock.ask - savedPrice;
        stock.priceChange = priceChange;
        const savedPriceChangePercentage = (priceChange / savedPrice) * 100;
        stock.savedPriceChangePercentage =
          savedPriceChangePercentage.toFixed(2);
      }

      setFavoritedStocksData(stockList);
    }
    fetchStocksData();
  }, [favorites]);

  return (
    <div className="favorited-section">
      <h2 className="section-title">Favorited Stocks</h2>
      {!isUserSignedIn() ? (
        <div>Sign in to save favorites!</div>
      ) : (
        favoritedStocksData.length === 0 && <div>No favorites yet!</div>
      )}

      <div className="card-section">
        {favoritedStocksData.map((stock) => (
          <FavoriteCard stock={stock} handleRemoveFavorite={handleRemoveFavorite} />
        ))}
      </div>
    </div>
  );
}
