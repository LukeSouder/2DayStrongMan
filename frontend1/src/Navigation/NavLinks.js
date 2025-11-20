import React from "react";
import './NavLinks.css';
import { NavLink } from 'react-router-dom';

const NavLinks = props => {
    return (
        <ul className="nav-links">
            <li><NavLink to="/" exact>Home Page</NavLink></li>
             <li><NavLink to="login" exact>Login</NavLink></li>
              <li><NavLink to="/day1" exact>Day 1</NavLink></li>
               <li><NavLink to="/day2" exact>Day 2</NavLink></li>
        </ul>
    )
};

export default NavLinks;