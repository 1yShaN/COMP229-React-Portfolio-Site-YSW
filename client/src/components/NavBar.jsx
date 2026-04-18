import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/JeniX_removebg.png';
import { isAuthenticated, isAdmin, signout } from './auth/auth-helper';

function NavBar() {
    const navigate = useNavigate();
    const authState = isAuthenticated();
    const admin = isAdmin();
    const userName = authState?.data?.name || 'User';

    const handleSignOut = () => {
        signout(() => {
            navigate('/signin', { replace: true });
        });
    };

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
                            {admin && <li><Link to="/projects/add">Add Project</Link></li>}
                        </ul>
                    </li>

                    {/* SERVICES */}
                    <li className="dropdown">
                        <Link to="/services">Services</Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/services/list">List Services</Link></li>
                            {admin && <li><Link to="/services/add">Add Service</Link></li>}
                        </ul>
                    </li>

                    {/* USERS */}
                    <li className="dropdown">
                        <Link to="/users">Users</Link>
                    </li>

                    {/* REFERENCES */}
                    <li className="dropdown">
                        <Link to="/references">References</Link>
                    </li>

                    <li><Link to="/contact">Contact</Link></li>

                    {!authState && <li><Link to="/signin">Sign In</Link></li>}
                    {!authState && <li><Link to="/signup">Sign Up</Link></li>}
                </ul>

                {authState && (
                    <div className="auth-corner">
                        <span className="user-greeting">Hi, {userName}</span>
                        <button className="logout-btn" onClick={handleSignOut}>Log Out</button>
                    </div>
                )}
            </nav>
        </>
    );
}

export default NavBar;