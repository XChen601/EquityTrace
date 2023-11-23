import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../actions/authActions'
import Loading from '../components/Loading'
import '../css/LoginRegister.css'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, error } = useSelector(state => state.auth);

  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className='main-content'>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to track and favorite stocks</p>
      </section>

      <section className='form'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control'
            id='username'
            name='username'
            value={userData.username}
            placeholder='Enter your username'
            onChange={handleChange}
          />
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={userData.password}
            placeholder='Enter password'
            onChange={handleChange}
          />

          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}

export default Login