import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/NotFound.css'

const NotFound = () => {
 
    const navigate = useNavigate();

  return (
    <div className='not-found' >
        <h1>404 | Page not found</h1>
        <br />
        <button onClick={() => navigate('/')}>Go to homepage</button>
    </div>
  )
}

export default NotFound