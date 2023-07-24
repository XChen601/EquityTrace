import { useDispatch } from 'react-redux'
import { deleteFavorite } from '../features/favorites/favoriteSlice'
import { useEffect } from 'react';
import { useState } from 'react';
import {FiTrash} from 'react-icons/fi'
import { openTradeModal, setTradeModal } from '../features/tradeModalSlice';

function FavoriteItem({ favorite }) {
  const [stockData, setStockData] = useState({})
  const dispatch = useDispatch()

  const onTradeClick = () => {
    const tradeInfo = {
      symbol: favorite.stockTicker,
      price: stockData.ask
    }
    dispatch(setTradeModal(tradeInfo))
    dispatch(openTradeModal())
  }


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
        <h4>Notes: <div>{favorite.notes}</div></h4>      
        
        <div className='trade-info'>
          <h4>Shares Held: <div>{favorite.shares}</div></h4>
          <h4>Average Bought Price: <div>${favorite.averagePrice.toFixed(2)}</div></h4>
          <RealizedProfit profit={favorite.profit} />
        </div>
        
        
        <button className='trade' onClick={onTradeClick}>Trade</button>
        <div className='item-footer'>Last Updated: {new Date(favorite.createdAt).toLocaleDateString("en-US")}</div>
      </div>
    </div>
  )
}

const RealizedProfit = ({ profit }) => {
  let formattedProfit = profit >= 0 ? `$${profit.toFixed(2)}` : `-$${Math.abs(profit).toFixed(2)}`;
  return (
      <h4>Realized Profit: <div>{formattedProfit}</div></h4>
  );
}

export default FavoriteItem