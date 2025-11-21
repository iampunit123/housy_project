import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Home, Search, User, LogOut, Menu, X, Plus, Settings } from 'lucide-react';

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
              {/* Landlord Links - Show for landlords OR tenants who can apply */}
              {(user?.userType === 'landlord' || user?.userType === 'tenant') && (
                <Link 
                  to="/create-property" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#2E8B57',
                    color: 'white',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'background-color 0.3s'
                  }}
                >
                  <Plus size={16} />
                  <span>List Property</span>
                </Link>
              )}
              
              {/* Admin Links */}
              {user?.userType === 'admin' && (
                <Link 
                  to="/admin" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#8B5FBF',
                    color: 'white',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'background-color 0.3s'
                  }}
                >
                  <Settings size={16} />
                  <span>Admin Panel</span>
                </Link>
              )}
              
              {/* User Info */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: 'white',
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '4px'
              }}>
                <User size={16} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user?.name}</span>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    opacity: '0.8',
                    textTransform: 'capitalize'
                  }}>
                    {user?.userType}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
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
                fontWeight: '500',
                transition: 'color 0.3s'
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div style={{
          display: 'none',
          padding: '1rem 0',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
        className="mobile-menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link 
              to="/" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            
            {isAuthenticated ? (
              <>
                {/* Mobile Landlord Links */}
                {(user?.userType === 'landlord' || user?.userType === 'tenant') && (
                  <Link 
                    to="/create-property" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: '#2E8B57',
                      color: 'white',
                      padding: '0.8rem 1rem',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontWeight: '500',
                      margin: '0.5rem 0'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus size={16} />
                    <span>List Property</span>
                  </Link>
                )}
                
                {/* Mobile Admin Links */}
                {user?.userType === 'admin' && (
                  <Link 
                    to="/admin" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: '#8B5FBF',
                      color: 'white',
                      padding: '0.8rem 1rem',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontWeight: '500',
                      margin: '0.5rem 0'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings size={16} />
                    <span>Admin Panel</span>
                  </Link>
                )}
                
                {/* Mobile User Info */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: 'white',
                  padding: '1rem 0',
                  borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <User size={16} />
                  <div>
                    <div style={{ fontWeight: '500' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.8rem', opacity: '0.8' }}>
                      {user?.userType}
                    </div>
                  </div>
                </div>
                
                {/* Mobile Logout */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid white',
                    color: 'white',
                    padding: '0.8rem 1rem',
                    borderRadius: '4px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <Link 
                  to="/login" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.8rem 1rem',
                    border: '1px solid white',
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  style={{
                    backgroundColor: '#2E8B57',
                    color: 'white',
                    padding: '0.8rem 1rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    textAlign: 'center'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
          .desktop-nav {
            display: none !important;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Header;