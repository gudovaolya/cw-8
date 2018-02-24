import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.css';

const MainNav = () => {
    return (
        <nav className="main-nav container">
            <ul>
                <li>
                    <NavLink exact to="/" >Quotes</NavLink>
                </li>
                <li>
                    <NavLink to="/add_quote">Add New Quote</NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default MainNav;