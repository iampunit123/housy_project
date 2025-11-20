import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Home, Search, User, LogOut, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      backgroundColor: '#1a1a2e',
      padding: '1rem 5%',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'white',
          fontSize: '1.8rem',
          fontWeight: '700',
          textDecoration: 'none'
        }}>
          <Home style={{ color: '#FF7E5F' }} />
          <span>Housy</span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.3s'
          }}>Home</Link>
          <Link to="/properties" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.3s'
          }}>Properties</Link>
          
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                <User size={20} />
                <span>{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '1px solid white',
                  color: 'white',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '4px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/login" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500'
              }}>Login</Link>
              <Link to="/register" style={{
                backgroundColor: '#2E8B57',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'background-color 0.3s'
              }}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;