import { useDispatch } from 'react-redux'
import { deleteFavorite } from '../features/favorites/favoriteSlice'

function FavoriteItem({ favorite }) {
  const dispatch = useDispatch()
  return (
    <div className="favorite">
      <div>
        <div>Last Updated: {new Date(favorite.createdAt).toLocaleDateString("en-US")}</div>
        <h2>{favorite.stockTicker}</h2>
        <h3>{favorite.savedPrice}</h3>
        <h3>{favorite.notes}</h3>
        <button onClick={() => dispatch(deleteFavorite(favorite._id))}></button>
      </div>
    </div>
  )
}

export default FavoriteItem