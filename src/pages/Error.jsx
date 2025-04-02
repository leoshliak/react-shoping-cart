import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'
import '../styles/Error.css'

const Error = () => {

    const error = useRouteError();
    const navigate = useNavigate();
    console.log(error)
  return (
    <div className='error' >
    <h1>An error occurred</h1>
    <p>{error.message}</p>
    <button onClick={() => navigate('/')}>Go to homepage</button>
</div>
  )
}

export default Error