import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const location = useLocation();

    const links = [
        { to: '/', label: 'Home' },
        { to: '/projects', label: 'Projects' },
        { to: '/skills', label: 'Skills' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.brand}>
                Kushal<span style={styles.brandAccent}>.dev</span>
            </Link>

            <div style={styles.links}>
                {links.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        style={{
                            ...styles.link,
                            color: location.pathname === link.to
                                ? '#e94560' : 'white',
                            borderBottom: location.pathname === link.to
                                ? '2px solid #e94560' : '2px solid transparent',
                        }}>
                        {link.label}
                    </Link>
                ))}

                {isLoggedIn() ? (
                    <>
                        <Link to="/admin/dashboard"
                            style={styles.link}>
                            Dashboard
                        </Link>
                        <button
                            onClick={logout}
                            style={styles.logoutBtn}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/admin/login"
                        style={styles.adminBtn}>
                        Admin Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 3rem',
        backgroundColor: '#070720',
        borderBottom: '1px solid #1a1a3e',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    brand: {
        fontSize: '1.6rem',
        fontWeight: '800',
        color: 'white',
        textDecoration: 'none',
        letterSpacing: '-0.5px',
    },
    brandAccent: {
        color: '#e94560',
    },
    links: {
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '0.95rem',
        paddingBottom: '3px',
        transition: 'color 0.2s',
        fontWeight: '500',
    },
    adminBtn: {
        backgroundColor: 'transparent',
        color: '#e94560',
        border: '1px solid #e94560',
        padding: '0.4rem 1rem',
        borderRadius: '20px',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '600',
        transition: 'all 0.2s',
    },
    logoutBtn: {
        backgroundColor: '#e94560',
        color: 'white',
        border: 'none',
        padding: '0.4rem 1.2rem',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
    },
};

export default Navbar;