import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE, DROP } from '../slices/cartSlice';
import { toast } from 'react-toastify';

export default function Cart({ onClose }) {
  let data = useSelector(state => state.cart);
  let dispatch = useDispatch();

  if (data.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffe5b4 100%)',
        padding: '1rem'
      }}>
        <div className="text-center p-4" style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
          <h3 className="mb-3" style={{ color: '#ff914d', fontWeight: 700, fontSize: '1.5rem' }}>Your Cart is Empty!</h3>
          <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>Looks like you haven't added any delicious items yet.</p>
          <button
            className="btn rounded-pill px-4 py-2 fw-bold"
            style={{
              background: 'linear-gradient(90deg, #ff914d 0%, #ff5e62 100%)',
              color: '#fff',
              border: 'none',
              boxShadow: '0 4px 15px rgba(255,145,77,0.3)',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem',
              minHeight: '44px'
            }}
            onClick={() => {
              console.log('Start Ordering button clicked!'); // Debug log
              toast.success('🍽️ Taking you to our delicious menu!');
              dispatch(DROP()); // Clear the cart
              console.log('Cart cleared, closing modal...'); // Debug log

              // Close the modal if onClose function is provided
              if (onClose) {
                setTimeout(() => {
                  onClose();
                }, 500);
              }
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255,145,77,0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255,145,77,0.3)';
            }}
          >
            Start Ordering
          </button>
        </div>
      </div>
    );
  }

  const HandleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    console.log('Checkout button clicked!'); // Debug log

    // Show initialization toast
    toast.info('🚀 Order has been initialized! Processing your request...', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    console.log('Toast should appear now'); // Debug log

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/orderdata`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "order_data": data,
          "email": userEmail,
          "order_date": new Date().toLocaleString()
        })
      });

      let responseData = await response.json();

      if (responseData.success) {
        toast.success('🎉 Order placed successfully! Your food is being prepared.');
        dispatch(DROP());
      } else {
        toast.error('❌ Failed to place order. Please try again.');
      }
    } catch (error) {
      toast.error('❌ Something went wrong. Please try again.');
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);
  const deliveryFee = totalPrice > 500 ? 0 : 40;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <>
      <div className="cart-container" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffe5b4 100%)',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div className='container-fluid p-3 p-lg-4' style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header */}
          <div className="text-center mb-4 sticky-header">
            <h1 className="mb-2" style={{
              color: '#ff914d',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              🛒 Your Cart
            </h1>
            <p className="text-muted" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
              You have {data.length} item{data.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <div className="row g-3 g-lg-4">
            {/* Cart Items */}
            <div className="col-12 col-lg-8">
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                height: 'fit-content'
              }}>
                <div className="p-3 p-lg-4" style={{ background: 'linear-gradient(90deg, #ff914d 0%, #ff5e62 100%)' }}>
                  <h3 className="text-white mb-0 fw-bold" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>Order Items</h3>
                </div>

                <div className="p-3 p-lg-4 cart-items-container" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  {data.map((food, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center mb-3 p-3"
                      style={{
                        background: '#f8f9fa',
                        borderRadius: '12px',
                        border: '1px solid #e9ecef',
                        transition: 'all 0.3s ease',
                        animation: 'slideIn 0.5s ease-out'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="me-3" style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(45deg, #ff914d, #ff5e62)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        flexShrink: 0
                      }}>
                        {food.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex-grow-1 min-w-0">
                        <h5 className="mb-1 fw-bold" style={{
                          color: '#2c3e50',
                          fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                          lineHeight: '1.3'
                        }}>
                          {food.name}
                        </h5>
                        <p className="mb-1 text-muted" style={{
                          fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                          lineHeight: '1.4'
                        }}>
                          Quantity: {food.quantity} • Size: {food.size}
                        </p>
                        <span className="fw-bold" style={{
                          color: '#ff914d',
                          fontSize: 'clamp(1rem, 2.5vw, 1.1rem)'
                        }}>
                          ₹{food.price}
                        </span>
                      </div>

                      <button
                        type='button'
                        className='btn btn-outline-danger rounded-circle ms-2'
                        style={{
                          width: '36px',
                          height: '36px',
                          border: '2px solid #ff5e62',
                          transition: 'all 0.3s ease',
                          flexShrink: 0,
                          minWidth: '36px',
                          minHeight: '36px',
                          display: 'flex',           // Add this
                          alignItems: 'center',      // Add this
                          justifyContent: 'center'   // Add this
                        }}
                        aria-label={`Remove ${food.name} from cart`}  // Add this for accessibility
                        onClick={() => {
                          dispatch(REMOVE({ index: index }));
                          toast.info(`Removed ${food.name} from cart`);
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = '#ff5e62';
                          e.target.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#ff5e62';
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          style={{ flexShrink: 0 }}  // Prevent icon from shrinking
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </button>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-12 col-lg-4">
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                position: 'sticky',
                top: '20px',
                height: 'fit-content'
              }}>
                <div className="p-3 p-lg-4" style={{ background: 'linear-gradient(90deg, #ff914d 0%, #ff5e62 100%)' }}>
                  <h3 className="text-white mb-0 fw-bold" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>Order Summary</h3>
                </div>

                <div className="p-3 p-lg-4">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted" style={{ fontSize: 'clamp(0.85rem, 2.2vw, 0.9rem)' }}>
                      Subtotal ({data.length} items)
                    </span>
                    <span className="fw-bold" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>₹{totalPrice}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted" style={{ fontSize: 'clamp(0.85rem, 2.2vw, 0.9rem)' }}>Delivery Fee</span>
                    <span className="fw-bold" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>
                      {deliveryFee === 0 ? (
                        <span style={{ color: '#28a745' }}>FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  {deliveryFee > 0 && (
                    <div className="alert alert-info mb-3" style={{
                      borderRadius: '10px',
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                      background: '#e3f2fd',
                      border: '1px solid #bbdefb',
                      padding: '0.75rem'
                    }}>
                      💡 Order ₹{500 - totalPrice} more for FREE delivery!
                    </div>
                  )}

                  <hr style={{ borderColor: '#e9ecef', margin: '1rem 0' }} />

                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold" style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)'
                    }}>
                      Total Amount
                    </span>
                    <span className="fw-bold" style={{
                      color: '#ff914d',
                      fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'
                    }}>
                      ₹{finalTotal}
                    </span>
                  </div>

                  <button
                    className='btn w-100 py-3 fw-bold rounded-pill'
                    style={{
                      background: 'linear-gradient(90deg, #ff914d 0%, #ff5e62 100%)',
                      color: '#fff',
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(255,145,77,0.3)',
                      transition: 'all 0.3s ease',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                      minHeight: '48px'
                    }}
                    onClick={HandleCheckOut}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(255,145,77,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(255,145,77,0.3)';
                    }}
                  >
                    🚀 Proceed to Checkout
                  </button>

                  <div className="text-center mt-3">
                    <small className="text-muted" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.8rem)' }}>
                      🔒 Secure payment • 🚚 Fast delivery • 🍽️ Fresh food
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cart-container {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 10;
          background: linear-gradient(135deg, #f8fafc 0%, #ffe5b4 100%);
          padding: 1rem 0;
          margin: -1rem 0 1rem 0;
        }

        .cart-items-container {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #ff914d #f0f0f0;
        }

        .cart-items-container::-webkit-scrollbar {
          width: 6px;
        }

        .cart-items-container::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 3px;
        }

        .cart-items-container::-webkit-scrollbar-thumb {
          background: #ff914d;
          border-radius: 3px;
        }

        .cart-items-container::-webkit-scrollbar-thumb:hover {
          background: #ff5e62;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .cart-container {
            height: 100vh;
            overflow-y: auto;
          }
          
          .sticky-header {
            position: sticky;
            top: 0;
            background: linear-gradient(135deg, #f8fafc 0%, #ffe5b4 100%);
            padding: 0.5rem 0;
            margin: 0 0 1rem 0;
          }
          
          .cart-items-container {
            max-height: 50vh !important;
            overflow-y: auto;
          }
        }

        @media (max-width: 576px) {
          .cart-container {
            padding: 0;
          }
          
          .container-fluid {
            padding: 0.5rem !important;
          }
        }

        /* Touch-friendly improvements */
        @media (hover: none) and (pointer: coarse) {
          .btn:hover {
            transform: none !important;
          }
          
          .d-flex.align-items-center:hover {
            transform: none !important;
          }
        }

        /* Ensure toast is visible */
        .Toastify__toast-container {
          position: fixed !important;
          top: 20px !important;
          right: 20px !important;
          z-index: 9999 !important;
        }

        .Toastify__toast {
          position: relative !important;
          z-index: 9999 !important;
        }
      `}</style>


    </>
  );
}

