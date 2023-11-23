import { useEffect, useState } from "react";
//import { addToDatabase, getUserFavorites, getUserName } from "../Firebase";
import {  useDispatch, useSelector } from "react-redux";
import { createUserStock, updateUserStock } from "../features/userStocks/userStocksSlice";
import "../css/SearchModal.css";
import DetailedView from "./DetailedView";
import {MDBModal} from 'mdb-react-ui-kit'

export default function SearchModal({
  stockName,
  modalVisibility,
  toggleModalVisibility,
  setModalVisibility,
}) {
  const {userStocks} = useSelector((state) => state.userStocks)
  const [stockInfo, setStockInfo] = useState({});
  const [notes, setNotes] = useState("");

  const dispatch = useDispatch();

  const onSave = (e) => {
    e.preventDefault();
    const savedStockInfo = {
      stockTicker: stockInfo.symbol,
      savedPrice: stockInfo.ask,
      notes: notes,
      shares: 0,
      price: 0,
    };

    // check if in userStocks, if not add to it, else do nothing
    const stockExists = userStocks.find((stock) => stock.stockTicker === stockInfo.symbol)
    if (stockExists) {
      return;
    }
    dispatch(createUserStock(savedStockInfo));
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
        <form className="modal">
          <div className="modal-heading">STOCK INFORMATION</div>
          <button
            className="close-btn"
            color="none"
            onClick={toggleModalVisibility}
          >X</button>

          <h2>{stockInfo.symbol}</h2>
          <div className="description">{stockInfo.description}</div>

          <div className="form-group">
            <label htmlFor="notes"></label>
            <input type="text" placeholder="Add a note" onChange={(e) => setNotes(e.target.value)}/>
          </div>

          <div>Current Price: ${stockInfo.ask}</div>
          <div>Day Change: {stockInfo.change_percentage}%</div>

          <DetailedView stockInfo={stockInfo}/>
          <button className="favorite-btn" onClick={onSave}>
            Save
          </button>
        </form>
      </div>
  );
}
