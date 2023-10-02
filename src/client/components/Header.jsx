

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faGem, faStar, faNewspaper, faListAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import
    function Header() {
        return (
            <header className="header">
                <div className="petStopLogo">
                    <a href="/">
                        <img src="src\client\images\Pawsitively Adorable.png" alt="Pawsitively Adorable" />
                        <h1>PetStop</h1>
                    </a>
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <FontAwesomeIcon icon={faSearch} />
                </div>

                <nav className="nav-links">
                    <ul>
                        <li><a href="/"><FontAwesomeIcon icon={faHome} /> Home</a></li>
                        <li><a href="/featured"><FontAwesomeIcon icon={faStar} />Featured</a></li>
                        <li><a href="/products"><FontAwesomeIcon icon={faGem} />Contact</a></li>
                        <li><a href="/categories"><FontAwesomeIcon icon={faNewspaper} />Categories</a></li>
                        <li><a href="/reviews"><FontAwesomeIcon icon={faListAlt} /> Reviews</a></li>
                        <li><a href="/profile"><FontAwesomeIcon icon={faUser} />Profile</a></li>
                    </ul>
                </nav>
            </header>
        );
    }

export default Header;
