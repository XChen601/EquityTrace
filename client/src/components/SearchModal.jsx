import { useEffect, useState } from "react";
//import { addToDatabase, getUserFavorites, getUserName } from "../Firebase";
import {  useDispatch } from "react-redux";
import {updateFavorite} from "../features/favorites/favoriteSlice";
import "../css/SearchModal.css";
import DetailedView from "./DetailedView";
import {MDBModal} from 'mdb-react-ui-kit' 

export default function SearchModal({
  stockName,
  modalVisibility,
  toggleModalVisibility,
  setModalVisibility,
}) {
  const [stockInfo, setStockInfo] = useState({});

  const dispatch = useDispatch();

  const onFavoriteClick = () => {
    const savedStockInfo = {
      stockTicker: stockInfo.symbol,
      savedPrice: stockInfo.ask,
      notes: "This is a note",
    }; 

    dispatch(updateFavorite(savedStockInfo));
  };

  const setNotFound = () => {
    setStockInfo({
      symbol: "Not Found",
      description: "Not Found",
      ask: "Not Found",
      change_percentage: "Not Found",
    });
  };

  useEffect(() => {
    async function fetchStockInfo(symbol) {
      const tradierToken = process.env.REACT_APP_TRADIER_TOKEN;
      try {
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
        const stocksData = await response.json();
        if (stocksData.quotes.quote === undefined) {
          setNotFound();
          return;
        }
        setStockInfo(stocksData.quotes.quote);
        return stocksData.quotes.quote;
      } catch (error) {
        setNotFound();
      }
    }
    fetchStockInfo(stockName);
  }, [stockName]);

  if (!modalVisibility) return null;

  return (
      <div className="modal-background">
        <div className="modal">
          <div>Stock Information:</div>
          <button
            className="close-btn"
            color="none"
            onClick={toggleModalVisibility}
          >X</button>

          <h3>{stockInfo.symbol}</h3>
          <div>{stockInfo.description}</div>
          <div>Price: {stockInfo.ask}</div>
          <div>Day Change: {stockInfo.change_percentage}%</div>
          
          <DetailedView stockInfo={stockInfo}/>
          <button className="favorite-btn" onClick={onFavoriteClick}>
            Favorite
          </button>
        </div>
      </div>
  );
}
