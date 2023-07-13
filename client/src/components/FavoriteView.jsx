import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { getFavorites, reset } from '../features/favorites/favoriteSlice';
import FavoriteItem from '../components/FavoriteItem';
import { useState } from 'react';
import axios from 'axios';

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
        ) : (<h3>You have no favorites</h3>)}
      </section>
  )
}

export default FavoriteView