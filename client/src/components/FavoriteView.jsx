import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { getFavorites, reset } from '../features/favorites/favoriteSlice';
import FavoriteItem from '../components/FavoriteItem';
import '../css/FavoriteView.css'

function FavoriteView() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {favorites, isLoading, isError, message} = useSelector((state) => state.favorites)
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getFavorites())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])


  // check if user is logged in
  if (!user) {
    return(
      <h3 className='empty'>Register or login to save stocks!</h3>
    )
  }
  if (isLoading) {
    return <Spinner />
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