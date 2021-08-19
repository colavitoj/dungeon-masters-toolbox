import React from 'react'
import LoginButton from './LoginButton'

function Homepage() {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="navbar-nav ms-auto">
                    <li className="nav-item ms-auto" >

                        <LoginButton />

                    </li>
                </div>
            </nav>
            <h3>Welcome to the DM Tool application. Please sign in to access resources.</h3>
        </div>

    )
}

export default Homepage
