
import { useSelector} from 'react-redux';
import Search from '../components/Search';
import UserStocks from '../components/UserStocks';
import TradeModal from '../components/TradeModal';
import PopularStocks from '../components/PopularStocks';

function Homepage() {

  const {user} = useSelector((state) => state.auth)

  return (
    <div className='main-content'>
      <section className='heading'>
        <h1>Welcome <div className='username'>{user ? user.username : "Stranger"}</div></h1>
      </section>

      <Search />
      <UserStocks />
      <PopularStocks />
      <TradeModal />
    </div>
  );
}

export default Homepage