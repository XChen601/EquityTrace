import { useDispatch } from 'react-redux'
import { deleteFavorite } from '../features/favorites/favoriteSlice'
import { useEffect } from 'react';
import { useState } from 'react';
import {FiTrash} from 'react-icons/fi'

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
          <button className="close-btn" onClick={() => dispatch(deleteFavorite(favorite._id))}><FiTrash /></button>
        </div>
        <p className='description'>{stockData.description}</p>
        <h4>Current Price: <div>${stockData.ask}</div></h4>
        <h4>Price Movement: <div>{stockData.change_percentage}%</div></h4>


        <h4>Saved Price: <div>${favorite.savedPrice}</div></h4>
        <h4>Notes: <div>{favorite.notes}</div></h4>      
        
        
        <h4>Overall Performance: <div>{((stockData.ask - favorite.savedPrice)/favorite.savedPrice * 100).toFixed(2)}%</div></h4>

        <div className='item-footer'>Last Updated: {new Date(favorite.createdAt).toLocaleDateString("en-US")}</div>
      </div>
    </div>
  )
}

export default FavoriteItem