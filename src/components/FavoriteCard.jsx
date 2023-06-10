
export default function FavoriteCard ({ stock, handleRemoveFavorite }) {
  return (
    <div className="stock-card">
      <h4 className="card-title">{stock.symbol}</h4>
      <div>{stock.description}</div>
      <br></br>
      <div>Current Price: ${stock.ask}</div>
      <div>Day Change: {stock.change_percentage}%</div>
      <br></br>
      <div>Performance: {stock.savedPriceChangePercentage}%</div>

      <button
        onClick={() => handleRemoveFavorite(stock.symbol)}
        className="remove-btn"
      >
        Remove Favorite
      </button>
    </div>
  );
}