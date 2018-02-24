import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.css';

const MainNav = () => {
    return (
        <nav className="main-nav container">
            <ul>
                <li><NavLink
                    exact
                    to="/"
                    activeClassName="active"
                >Quotes</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/add_quotes"
                    >Add Quotes</NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default MainNav;