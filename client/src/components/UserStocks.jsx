import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getUserStocks, reset } from '../features/userStocks/userStocksSlice';
import UserStockItem from './UserStockItem';
import '../css/UserStocks.css';

function UserStocks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userStocks, isLoading, isError, message } = useSelector((state) => state.userStocks);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getUserStocks());
  }, [user, navigate, isError, message, dispatch]);

  // Calculate total profit
  const totalProfit = userStocks.reduce((total, stock) => total + stock.profit, 0);

  // check if user is logged in
  if (!user) {
    return <h3 className='empty'>Register or login to save stocks!</h3>;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className='content'>
      {userStocks.length > 0 ? (
        <div className='favorites'>
          {[...userStocks].reverse().map((stock) => (
            <UserStockItem key={stock.id} stock={stock} />
          ))}
          <p id="totalProfit">Total Profit: ${totalProfit}</p>
        </div>
      ) : (
        <h3 className='empty'>You have no stocks saved</h3>
      )}
    </section>
  );
}

export default UserStocks;
