import React from "react";
import './MainNavigation.css';
import {Link} from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

const MainNavigation = props => {

    return (
        <MainHeader>
            <Link to='/' className="main-nav-name"><h1>2 Day StrongMan</h1></Link>
            <nav>
                <NavLinks/>
            </nav>
        </MainHeader>
    );
};

export default MainNavigation;