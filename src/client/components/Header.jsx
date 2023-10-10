import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faGem, faStar, faNewspaper, faListAlt, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {

    const [token, setToken] = useState(window.localStorage.getItem("token"))

    useEffect(() => {

    }, [token])

    const logout = () => {
    window.localStorage.clear();
    setToken("");
    console.log(token)
  }

    return (
        <header className="header">
            <div className="navbar-left">
                <div className="petStopLogo" a href="/">
                    <img height="100px" className="logo-image" src="src\client\images\Pawsitively Adorable.png" alt="Pawsitively Adorable" />
                    <h1>PetStop</h1>
                    <div className="search-bar">
                        <input className="search-bar-input" type="text" placeholder="Search..." />
                    </div>
                    <FontAwesomeIcon className="search-icon" icon={faSearch} />
                </div>
            </div>



            <nav className="nav-links">
                <ul className="nav-list-container">
                    <li className="nav-list">
                        <Link to="/">
                            <FontAwesomeIcon icon={faHome} /> Home
                        </Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/featured">
                            <FontAwesomeIcon icon={faStar} /> Featured
                        </Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/products">
                            <FontAwesomeIcon icon={faGem} /> Products
                        </Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/categories">
                            <FontAwesomeIcon icon={faNewspaper} /> Categories
                        </Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/reviews">
                            <FontAwesomeIcon icon={faListAlt} /> Reviews
                        </Link>
                    </li>
                    <li className="nav-list">
                        {!token ? null : <Link to="/profile">
                            <FontAwesomeIcon icon={faUser} /> Profile
                        </Link> }
                    </li>
                    <li className="nav-list">
                        {!token ? null : <Link to="/" onClick={logout}>| Log-out</Link>}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
