import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getFavorites, reset } from '../features/favorites/favoriteSlice';
import FavoriteItem from '../components/FavoriteItem';
import '../css/FavoriteView.css'

function FavoriteView() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user} = useSelector((state) => state.auth)

  const favorites = ["abc", "def"]


  // check if user is logged in
  if (!user) {
    return(
      <h3 className='empty'>Register or login to save stocks!</h3>
    )
  }

  return (
    <section className='content'>
        {favorites.length > 0 ? (
          <div className='favorites'>
            {favorites.map((favorite) => (
              <FavoriteItem key={favorite.id} favorite={favorite} />
            ))}
          </div>
        ) : (<h3 className='empty'>You have no favorites</h3>)}
      </section>
  )
}

export default FavoriteView