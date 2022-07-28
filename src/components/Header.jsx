import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='container-fluid text-center shadow p-3 mb-3 bg-body rounded'>
        <div className='fs-2 text-primary '>
          <Link to="/" style={{ textDecoration: 'none' }}>
            The Drink Map
          </Link>
        </div>
    </div>
  )
}

export default Header