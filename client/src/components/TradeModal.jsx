import React from 'react'
import '../css/TradeModal.css'

function TradeModal() {
  return (
    <div className='trade-modal'>
      <button className='exit-btn'>X</button>
      <form>
        <label>
          Transaction Type:
          <select name="transactionType">
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </label>
        <br />
        <label>
          Symbol:
          <input type="text" name="symbol"/>
        </label>
        <label>
          Quantity:
          <input type="number" min="1" step="1" name="quantity"/>
        </label>
        <br />
        <label>
            Price:
            <input type="number" min="0" step="0.01" name="price"/>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default TradeModal