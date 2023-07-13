
import { useSelector} from 'react-redux';
import Search from '../components/Search';
import FavoriteView from '../components/FavoriteView';
import Footer from '../components/Footer';


function Dashboard() {

  const {user} = useSelector((state) => state.auth)

  return (
    <>
      <section className='heading'>
        <h1>Welcome <div className='username'>{user ? user.name : "Stranger"}</div></h1>
      </section>

      <Search />
      <FavoriteView />
      <Footer />
    </>
  );
}

export default Dashboard