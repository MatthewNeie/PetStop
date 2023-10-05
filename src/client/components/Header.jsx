import React from 'react';
import '../style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faGem, faStar, faNewspaper, faListAlt, faUser } from '@fortawesome/free-solid-svg-icons';
    
function Header() {
        return (
            <header className="header">
                <div className="navbar-left">
                    <div className="petStopLogo" a href="/">
                            <img height="100px" src="src\client\images\Pawsitively Adorable.png" alt="Pawsitively Adorable" />
                            <h1>PetStop</h1>
                            <div className="search-bar">
                                <input type="text" placeholder="Search..." />
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                    </div>
                </div>

                <div className="navbar-center"></div>

                <nav className="nav-links">
                    <ul className="nav-list-container">
                        <li className="nav-list"><a href="/"><FontAwesomeIcon icon={faHome} /> Home</a></li>
                        <li className="nav-list"><a href="/featured"><FontAwesomeIcon icon={faStar} />Featured</a></li>
                        <li className="nav-list"><a href="/products"><FontAwesomeIcon icon={faGem} />Contact</a></li>
                        <li className="nav-list"><a href="/categories"><FontAwesomeIcon icon={faNewspaper} />Categories</a></li>
                        <li className="nav-list"><a href="/reviews"><FontAwesomeIcon icon={faListAlt} /> Reviews</a></li>
                        <li className="nav-list"><a href="/profile"><FontAwesomeIcon icon={faUser} />Profile</a></li>
                    </ul>
                </nav>
            </header>
        );
    }

export default Header;