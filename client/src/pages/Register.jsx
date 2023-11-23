import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register } from '../actions/authActions'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
      return
    }

    dispatch(register({ username, password }))
  }

  return (
    <div className='main-content'>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
          />
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
          />
          <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Password2"
              required
          />
          <button type="submit">Register</button>
        </form>
      </section>
    </div>
  )
}

export default Register