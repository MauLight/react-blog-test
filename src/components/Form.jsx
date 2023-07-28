/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from 'react'
import PropTypes from 'prop-types'


export default function LoginForm({ handleSubmit }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const logSubmit = (e) => {

    const logObj = {
      username,
      password
    }

    e.preventDefault()
    handleSubmit(logObj)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={logSubmit}>
      <div className="flex flex-col">
        <label className='text-sm text-start' htmlFor='username'>Username:</label>
        <input
          className='rounded h-8'
          type='text'
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className='text-sm text-start' htmlFor='password'>Password:</label>
        <input
          className='rounded h-8'
          type='password'
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div >
        <button
          id='login-btn'
          className="w-full h-12 mt-5 bg-[#e3e3e3] text-[#242424] hover:bg-[#242424] hover:text-[#e3e3e3] active:bg-[#e3e3e3] active:text-[#242424] transition-all duration-75" type='submit'>
          Log in
        </button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

