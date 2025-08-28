import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useSelector } from 'react-redux';
import logo from '../Images/logo.webp';

function Navbar_func() {
  let data = useSelector(state => state.cart);
  const [cartView, setCartView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const UserEmail = localStorage.getItem('userEmail');
  const [UserAdminStatus, setUserAdminStatus] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/getUserData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: UserEmail,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        setUserAdminStatus(responseData.isAdmin);
      }
    };
    if (UserEmail) {
      fetchUserData();
    }
  }, [UserEmail]);

  return (
    <>
      <Navbar
        expand="lg"
        className="navbar navbar-expand-lg"
        style={{
          background: isScrolled 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'linear-gradient(135deg, #ff914d 0%, #ff5e62 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: isScrolled 
            ? '1px solid rgba(255, 145, 77, 0.1)' 
            : 'none',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          minHeight: '80px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isScrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.12)' 
            : '0 4px 20px rgba(255, 145, 77, 0.25)',
        }}
      >
        <Container fluid className="px-4">
          {/* Logo */}
          <Navbar.Brand 
            as={Link} 
            to="/" 
            className="d-flex align-items-center fw-bold"
            style={{ 
              color: isScrolled ? '#ff914d' : '#fff',
              fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
              letterSpacing: '1px',
              textShadow: isScrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              textDecoration: 'none'
            }}
          >
            <img 
              src={logo} 
              alt="HungryHub Logo" 
              style={{ 
                width: 'clamp(35px, 6vw, 45px)', 
                height: 'clamp(35px, 6vw, 45px)', 
                borderRadius: '50%', 
                marginRight: '12px', 
                boxShadow: '0 4px 12px rgba(255,145,77,0.3)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: 'logoFloat 3s ease-in-out infinite'
              }} 
            />
            HungryHub
          </Navbar.Brand>

          {/* Mobile Toggle Button */}
          <Navbar.Toggle 
            aria-controls="navbar-nav" 
            className="border-0"
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span 
              className="navbar-toggler-icon"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='white' stroke-linecap='round' stroke-miterlimit='10' stroke-width='3' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
                transition: 'all 0.3s ease',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}
            />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav">
            {/* Navigation Links */}
            <Nav className="me-auto ms-4 align-items-center">
              <Link 
                to='/' 
                className='nav-link fw-semibold mx-3'
                style={{ 
                  color: isScrolled ? '#2c3e50' : '#fff',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  textShadow: isScrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  position: 'relative',
                  textDecoration: 'none',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = isScrolled ? 'rgba(255,145,77,0.15)' : 'rgba(255,255,255,0.25)';
                  e.target.style.transform = 'translateY(-2px) scale(1.05)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255,145,77,0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Home</span>
              </Link>
              {localStorage.getItem('authToken') && (
                <Link 
                  to='/myorder' 
                  className='nav-link fw-semibold mx-3'
                  style={{ 
                    color: isScrolled ? '#2c3e50' : '#fff',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    textShadow: isScrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '12px',
                    padding: '10px 18px',
                    textDecoration: 'none',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = isScrolled ? 'rgba(255,145,77,0.15)' : 'rgba(255,255,255,0.25)';
                    e.target.style.transform = 'translateY(-2px) scale(1.05)';
                    e.target.style.boxShadow = '0 6px 20px rgba(255,145,77,0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>My Orders</span>
                </Link>
              )}
            </Nav>

            {/* Action Buttons */}
            <div className="d-flex align-items-center gap-3">
              {!localStorage.getItem('authToken') ? (
                <>
                  <Button
                    as={Link}
                    to='/createuser'
                    className='rounded-pill fw-bold px-4 py-2'
                    style={{
                      background: 'linear-gradient(135deg, #ff914d 0%, #ffb347 100%)',
                      border: 'none',
                      color: '#fff',
                      boxShadow: '0 6px 20px rgba(255,145,77,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      minHeight: '44px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-3px) scale(1.05)';
                      e.target.style.boxShadow = '0 8px 25px rgba(255,145,77,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 6px 20px rgba(255,145,77,0.3)';
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>Sign Up</span>
                  </Button>
                  <Button
                    as={Link}
                    to='/login'
                    className='rounded-pill fw-bold px-4 py-2'
                    style={{
                      background: 'linear-gradient(135deg, #ff5e62 0%, #ff914d 100%)',
                      border: 'none',
                      color: '#fff',
                      boxShadow: '0 6px 20px rgba(255,94,98,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      minHeight: '44px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-3px) scale(1.05)';
                      e.target.style.boxShadow = '0 8px 25px rgba(255,94,98,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 6px 20px rgba(255,94,98,0.3)';
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>Login</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className='rounded-pill fw-bold px-4 py-2 d-flex align-items-center gap-2'
                    style={{
                      background: isScrolled ? '#fff' : 'rgba(255,255,255,0.95)',
                      color: '#ff914d',
                      border: `2px solid ${isScrolled ? '#ff914d' : '#fff'}`,
                      boxShadow: '0 6px 20px rgba(255,145,77,0.25)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      minHeight: '44px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onClick={() => setCartView(true)}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-3px) scale(1.05)';
                      e.target.style.boxShadow = '0 8px 25px rgba(255,145,77,0.35)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 6px 20px rgba(255,145,77,0.25)';
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>🛒 Cart</span>
                    <Badge 
                      pill 
                      style={{ 
                        background: 'linear-gradient(135deg, #ff5e62 0%, #ff914d 100%)',
                        color: '#fff', 
                        fontWeight: '700', 
                        fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                        minWidth: '22px',
                        height: '22px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: data.length > 0 ? 'pulse 2s infinite' : 'none'
                      }}
                    >
                      {data.length}
                    </Badge>
                  </Button>
                  {cartView && (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart onClose={() => setCartView(false)} />
                    </Modal>
                  )}
                  <Button
                    className='rounded-pill fw-bold px-4 py-2'
                    style={{
                      background: 'linear-gradient(135deg, #ff5e62 0%, #ff914d 100%)',
                      border: 'none',
                      color: '#fff',
                      boxShadow: '0 6px 20px rgba(255,94,98,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      minHeight: '44px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onClick={handleLogout}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-3px) scale(1.05)';
                      e.target.style.boxShadow = '0 8px 25px rgba(255,94,98,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 6px 20px rgba(255,94,98,0.3)';
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>Logout</span>
                  </Button>
                </>
              )}
              {UserAdminStatus && (
                <Button
                  as={Link}
                  to='/admin'
                  className='rounded-pill fw-bold px-4 py-2'
                  style={{
                    background: 'linear-gradient(135deg, #ffb347 0%, #ff914d 100%)',
                    border: 'none',
                    color: '#fff',
                    boxShadow: '0 6px 20px rgba(255,179,71,0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    minHeight: '44px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px) scale(1.05)';
                    e.target.style.boxShadow = '0 8px 25px rgba(255,179,71,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 6px 20px rgba(255,179,71,0.3)';
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>Dashboard</span>
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>

        <style>{`
          @keyframes logoFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          @keyframes slideInFromTop {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .navbar {
            animation: slideInFromTop 0.6s ease-out;
          }

          /* Mobile Responsive Styles */
          @media (max-width: 991px) {
            .navbar-collapse {
              background: rgba(255, 255, 255, 0.98);
              border-radius: 20px;
              margin-top: 15px;
              padding: 24px;
              box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
              backdrop-filter: blur(20px);
              animation: slideInFromTop 0.4s ease-out;
            }
            
            .nav-link {
              color: #2c3e50 !important;
              margin: 10px 0 !important;
              padding: 14px 20px !important;
              border-radius: 16px !important;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              font-weight: 600 !important;
            }
            
            .nav-link:hover {
              background: rgba(255, 145, 77, 0.15) !important;
              transform: translateX(8px) scale(1.02);
              box-shadow: 0 4px 15px rgba(255, 145, 77, 0.2);
            }
            
            .d-flex.align-items-center.gap-3 {
              flex-direction: column;
              width: 100%;
              gap: 16px !important;
              margin-top: 20px;
            }
            
            .btn {
              width: 100%;
              justify-content: center;
              padding: 12px 20px !important;
              font-size: 1rem !important;
            }
          }

          @media (max-width: 576px) {
            .navbar-brand {
              font-size: 1.4rem !important;
            }
            
            .container-fluid {
              padding-left: 12px !important;
              padding-right: 12px !important;
            }

            .navbar {
              min-height: 70px;
            }
          }

          /* Touch-friendly improvements */
          @media (hover: none) and (pointer: coarse) {
            .btn:hover {
              transform: none !important;
            }
            
            .nav-link:hover {
              transform: none !important;
            }
          }
        `}</style>
      </Navbar>
    </>
  );
}

export default Navbar_func;

