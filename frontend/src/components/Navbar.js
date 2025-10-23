import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, clearAuth, isAdmin } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🎉 EventHub</Link>
      <div style={styles.links}>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            {isAdmin() && <Link to="/admin" style={styles.link}>Admin</Link>}
            <span style={styles.user}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '1rem 2rem', 
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  logo: { 
    fontSize: '1.8rem', 
    fontWeight: '700', 
    color: 'white', 
    textDecoration: 'none'
  },
  links: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
  link: { 
    color: 'white', 
    textDecoration: 'none', 
    padding: '0.5rem 1rem',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  },
  user: { 
    fontSize: '0.9rem',
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontWeight: '500'
  },
  button: { 
    padding: '0.6rem 1.2rem', 
    background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '25px', 
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(238, 90, 82, 0.3)'
  }
};

export default Navbar;