
import { useSelector} from 'react-redux';
import Search from '../components/Search';
import FavoriteView from '../components/FavoriteView';
import TradeModal from '../components/TradeModal';
import { useState, useEffect } from 'react';

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // get user information
    }
  }, []);


  return (
    <div className='main-content'>
      <section className='heading'>
        <h1>Welcome <div className='username'>{user ? user.name : "Stranger"}</div></h1>
      </section>

      <Search />
      <FavoriteView />
      <TradeModal />
    </div>
  );
}

export default Dashboard