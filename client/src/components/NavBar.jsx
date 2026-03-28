import { Link } from 'react-router-dom';
import Logo from '../assets/JeniX_removebg.png';

function NavBar() {
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <img src={Logo} alt="Logo" id="logo" height="70px" width="100px"/>
                </div>

                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>

                    {/* PROJECTS */}
                    <li className="dropdown">
                        <Link to="/projects">Projects</Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/projects/list">List Projects</Link></li>
                        </ul>
                    </li>

                    {/* SERVICES */}
                    <li className="dropdown">
                        <Link to="/services">Services</Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/services">List Services</Link></li>
                        </ul>
                    </li>

                    {/* USERS */}
                    <li className="dropdown">
                        <Link to="/users">Users</Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/users">List Users</Link></li>
                        </ul>
                    </li>

                    {/* REFERENCES */}
                    <li className="dropdown">
                        <Link to="/references">References</Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/references">List References</Link></li>
                        </ul>
                    </li>

                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;