import { useDispatch } from 'react-redux'
import { deleteFavorite } from '../features/favorites/favoriteSlice'
import { useEffect } from 'react';
import { useState } from 'react';

function FavoriteItem({ favorite }) {
  const [stockData, setStockData] = useState({})
  const dispatch = useDispatch()

  const fetchStockData = async () => {
    const tradierToken = process.env.REACT_APP_TRADIER_TOKEN;

    const response = await fetch(
      `https://api.tradier.com/v1/markets/quotes?symbols=${favorite.stockTicker}&greeks=false`,
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
    <div className="favorite">
      <div>
        <div className='favorite-head'>
          <h2>{favorite.stockTicker}</h2>
          <button className="close-btn" onClick={() => dispatch(deleteFavorite(favorite._id))}>X</button>
        </div>
        <p className='description'>{stockData.description}</p>
        <h3>Saved Price: {favorite.savedPrice}</h3>
        <h3>Saved Notes: {favorite.notes}</h3>      
        <h3>Current Price: {stockData.ask}</h3>
        <h3>Price Change: {stockData.change_percentage}%</h3>
        <h3>Overall Performance: {((stockData.ask - favorite.savedPrice)/favorite.savedPrice * 100).toFixed(2)}%</h3>

        <div>Last Updated: {new Date(favorite.createdAt).toLocaleDateString("en-US")}</div>
      </div>
    </div>
  )
}

export default FavoriteItem