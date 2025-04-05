import React from 'react'
import '../styles/Loading.css'

const Loading = () => {
  return (
    <div>
        <div className="preload" data-preload>
        <div className="circle"></div>
        <div className="preload-text">Loading</div>
    </div>
    </div>
  )
}

export default Loading