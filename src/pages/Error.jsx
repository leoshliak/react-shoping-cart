import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'
import '../styles/Error.css'

const Error = ({ error }) => {
    const routeError = useRouteError();
    const navigate = useNavigate();
    
    return (
        <div className='error'>
            <h1>Error</h1>
            <p>{error?.message || routeError?.message || 'An error occurred while fetching data'}</p>
            <button onClick={() => navigate('/')}>Go to homepage</button>
        </div>
    )
}

export default Error