import React, { useEffect, useState } from 'react'
import '../css/TradeModal.css'
import { useSelector, useDispatch } from 'react-redux'
import { closeTradeModal, openTradeModal } from '../features/tradeModalSlice'
import { updateUserStock } from '../features/userStocks/userStocksSlice'

function TradeModal() {
  const dispatch = useDispatch()
  const modalVisible = useSelector((state) => state.tradeModal.isOpen)
  const initialSymbol = useSelector((state) => state.tradeModal.symbol)
  const initialPrice = useSelector((state) => state.tradeModal.price)
  const [formValues, setFormValues] = useState({ symbol: initialSymbol, price: initialPrice,  quantity: 1, transactionType: 'BUY'});

  // Listen for changes in initialSymbol and update the form
  useEffect(() => {
    setFormValues({
      symbol: initialSymbol,
      price: initialPrice,
      quantity: 1,
      transactionType: 'BUY'
    });
  }, [initialSymbol]);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]:     e.target.name === 'quantity'
      ? parseInt(e.target.value, 10)
      : e.target.name === 'price'
      ? parseFloat(e.target.value)
      : e.target.value,
    });
    console.log(formValues)
  };

  const onSubmit = (e) => {
    e.preventDefault()
    const savedStockInfo = {
      transactionType: formValues.transactionType,
      stockTicker: formValues.symbol,
      shares: formValues.quantity,
      price: formValues.price,
    };
    console.log('taatawtaw')
    dispatch(updateUserStock(savedStockInfo));
  }
  // if user not logged in, show nothing
  const {user} = useSelector((state) => state.auth)
  if (!user) {
    return null;
  }

  if (!modalVisible) {
    return (
      <div className='modal-container'>
        <button className='show-modal-btn' onClick={() => dispatch(openTradeModal())}>{"<"}</button>
      </div>
    )
  }

  return (
    <div className='modal-container'>
      <div className='trade-modal'>
      <button className='exit-btn' onClick={() => dispatch(closeTradeModal())}>X</button>
      <form>
        <label>
          Transaction Type:
          <select name="transactionType" value={formValues.transactionType} onChange={handleInputChange}>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
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

        <input type="submit" value="Submit" onClick={onSubmit}/>
      </form>
    </div>
    </div>

  )
}

export default TradeModal