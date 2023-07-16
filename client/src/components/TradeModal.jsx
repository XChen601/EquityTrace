import React, { useEffect, useState } from 'react'
import '../css/TradeModal.css'
import { useSelector, useDispatch } from 'react-redux'
import { closeTradeModal, openTradeModal } from '../features/tradeModalSlice'
import { updateFavorite } from '../features/favorites/favoriteSlice'
function TradeModal() {
  const dispatch = useDispatch()
  const modalVisible = useSelector((state) => state.tradeModal.isOpen)
  const initialSymbol = useSelector((state) => state.tradeModal.symbol)
  const initialPrice = useSelector((state) => state.tradeModal.price)
  const [formValues, setFormValues] = useState({ symbol: initialSymbol, price: initialPrice,  quantity: 1, transactionType: ''});

  // Listen for changes in initialSymbol and update the form
  useEffect(() => {
    setFormValues({
      symbol: initialSymbol,
      price: initialPrice
    });
  }, [initialSymbol]);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault()
    const savedStockInfo = {
      stockTicker: formValues.symbol,
      shares: formValues.quantity,

    }; 

    dispatch(updateFavorite(savedStockInfo));
  }

  if (!modalVisible) {
    return (
      <div className='trade-modal'>
        <button className='show-modal-btn' onClick={() => dispatch(openTradeModal())}>{">"}</button>
      </div>
    )
  }

  return (
    <div className='trade-modal'>
      <button className='exit-btn' onClick={() => dispatch(closeTradeModal())}>X</button>
      <form>
        <label>
          Transaction Type:
          <select name="transactionType">
            <option value="Buy">BUY</option>
            <option value="Sell">SELL</option>
          </select>
        </label>

        <label>
          Symbol:
          <input type="text" name="symbol" defaultValue={initialSymbol}
          value={formValues.symbol} onChange={handleInputChange}/>
        </label>
        <label>
          Quantity:
          <input type="number" min="1" step="1" defaultValue={1} name="quantity"
          value={formValues.quantity} onChange={handleInputChange}/>
        </label>

        <label>
            Price:
            <input type="number" min="0" step="0.01" name="price" defaultValue={initialPrice}
            value={formValues.price} onChange={handleInputChange}/>
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default TradeModal