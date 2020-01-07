import React from "react";
import "./Header.scss";

function Header() {
    return (
        <nav className="navigation">
            <ul className="navigation-list">
                <li className='navigation-list__item'>library</li>
                <li className='navigation-list__item'>profile</li>
            </ul>
        </nav>
    );
}

export default Header;
