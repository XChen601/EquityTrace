import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../components/Search';
import Spinner from '../components/Spinner';
import { getFavorites, reset } from '../features/favorites/favoriteSlice';
import FavoriteItem from '../components/FavoriteItem';

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {favorites, isLoading, isError, message} = useSelector((state) => state.favorites)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getFavorites())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user ? user.name : "Stranger"}</h1>
      </section>

      <Search />

      <section className='content'>
        {favorites.length > 0 ? (
          <div className='favorites'>
            {favorites.map((favorite) => (
              <FavoriteItem key={favorite.id} favorite={favorite} />
            ))}
          </div>
        ) : (<h3>You have no favorites</h3>)}
      </section>
    </>
  );
}

export default Dashboard