import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from '../components/Search';


function Dashboard() {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  useEffect(() => {

  }, [user, navigate])
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user ? user.name : "Stranger"}</h1>
      </section>

      <Search />
    </>
  );
}

export default Dashboard