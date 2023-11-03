import React from 'react'
import { Link } from 'react-router-dom'
import "./sidebar.scss"

const Sidebar = () => {

    return (
        <div className="sidebar">
            <div className='header'>
                <span>Pokemon</span>
            </div>
            <div className="body">
                <ul>
                    <p className="title">Home</p>
                    <Link to="/" className='link'>
                        <li>
                            
                            <span>Pokemon List</span>
                        </li>
                    </Link>
                    <p className="title">Personal</p>
                    <Link to="/my-pokemon" className='link'>
                        <li>
                            
                            <span>My Pokemon</span>
                        </li>
                    </Link> 
                </ul>
            </div>
            {/* <div className='footer'>
                <span>{time}</span>
            </div> */}
        </div>
    )
}

export default Sidebar