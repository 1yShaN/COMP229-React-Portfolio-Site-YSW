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
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;
