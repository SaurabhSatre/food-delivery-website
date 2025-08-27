import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, UPDATE } from '../slices/cartSlice';
import { toast } from 'react-toastify';

function BasicExample(props) {
  let dispatch = useDispatch();
  let data = useSelector(state => state.cart);
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItems;

  let [quantity, setQuantity] = useState(1);
  let [size, setSize] = useState("");
  let [isHovered, setIsHovered] = useState(false);
  
  // Generate random rating between 4.1 and 4.8
  const [rating] = useState(() => {
    const ratings = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8];
    return ratings[Math.floor(Math.random() * ratings.length)];
  });

  const HandleAddToCart = async () => {
    if (!size) {
      toast.error('Please select a size first!');
      return;
    }

    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }

    if (food) {
      if (food.size === size) {
        await dispatch(UPDATE({ id: foodItem._id, quantity: quantity, price: finalPrice }));
        toast.success(`🛒 Updated ${foodItem.name} in cart! (Qty: ${quantity}, Size: ${size})`);
        return;
      } else if (food.size !== size) {
        await dispatch(ADD({ id: foodItem._id, name: foodItem.name, size: size, quantity: quantity, price: finalPrice }));
        toast.success(`🛒 Added ${foodItem.name} to cart! (Qty: ${quantity}, Size: ${size})`);
        return;
      }
      return;
    }

    await dispatch(ADD({ id: foodItem._id, name: foodItem.name, size: size, quantity: quantity, price: finalPrice }));
    toast.success(`🛒 Added ${foodItem.name} to cart! (Qty: ${quantity}, Size: ${size})`);
  };

  let finalPrice = quantity * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div
      className="food-card"
      style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: isHovered 
          ? '0 8px 25px rgba(0,0,0,0.12)' 
          : '0 2px 12px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        border: '1px solid #f8f9fa',
        position: 'relative',
        height: 'auto',
        minHeight: '380px',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Food Image with Overlay */}
      <div style={{ 
        position: 'relative', 
        height: '200px', 
        overflow: 'hidden',
        width: '100%'
      }}>
        <img
          src={foodItem.img}
          alt={foodItem.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          className={isHovered ? 'zoom-image' : ''}
        />
        
        {/* Rating Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '6px 10px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#ff914d',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          backdropFilter: 'blur(4px)',
          minWidth: '50px',
          justifyContent: 'center'
        }}>
          ⭐ {rating}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 200px)',
        justifyContent: 'space-between'
      }}>
        {/* Top Section */}
        <div>
          {/* Food Name */}
          <h5 style={{
            margin: '0 0 8px 0',
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#2c3e50',
            lineHeight: '1.3',
            minHeight: '1.3em'
          }}>
            {foodItem.name}
          </h5>

          {/* Description */}
          <p style={{
            margin: '0 0 16px 0',
            fontSize: '0.85rem',
            color: '#7f8c8d',
            lineHeight: '1.4',
            height: '2.8em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            Food provides essential nutrients for overall health and well-being
          </p>
        </div>

        {/* Options Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '16px'
        }}>
          {/* Quantity Selector */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <label style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#34495e',
              minWidth: '60px',
              flexShrink: 0
            }}>
              Qty:
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '2px solid #e9ecef',
                background: '#fff',
                fontSize: '0.85rem',
                fontWeight: '500',
                color: '#2c3e50',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flex: 1,
                minWidth: '80px',
                minHeight: '44px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff914d';
                e.target.style.boxShadow = '0 0 0 3px rgba(255,145,77,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          {/* Size Selector */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <label style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#34495e',
              minWidth: '60px',
              flexShrink: 0
            }}>
              Size:
            </label>
            <select
              ref={priceRef}
              value={size}
              onChange={(e) => setSize(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '2px solid #e9ecef',
                background: '#fff',
                fontSize: '0.85rem',
                fontWeight: '500',
                color: '#2c3e50',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flex: 1,
                minWidth: '80px',
                minHeight: '44px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff914d';
                e.target.style.boxShadow = '0 0 0 3px rgba(255,145,77,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginTop: 'auto'
        }}>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: '800',
            color: '#ff914d',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            flexShrink: 0
          }}>
            ₹{finalPrice}
          </div>

          <button
            onClick={HandleAddToCart}
            style={{
              padding: '12px 20px',
              borderRadius: '25px',
              background: 'linear-gradient(45deg, #ff914d, #ff5e62)',
              border: 'none',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(255,145,77,0.3)',
              flex: 1,
              maxWidth: '140px',
              whiteSpace: 'nowrap',
              minHeight: '48px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(255,145,77,0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(255,145,77,0.3)';
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <style jsx>{`
        .zoom-image {
          transform: scale(1.05);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .food-card {
          animation: fadeIn 0.5s ease-out;
        }

        /* Mobile Responsive Design - Reduced Margins */
        @media (max-width: 768px) {
          .food-card {
            max-width: 100%;
            min-height: 400px;
            margin: 0 4px;
          }
        }

        @media (max-width: 576px) {
          .food-card {
            max-width: 100%;
            min-height: 420px;
            margin: 0 2px;
          }
        }

        @media (max-width: 480px) {
          .food-card {
            max-width: 100%;
            min-height: 440px;
            margin: 0 1px;
          }
        }

        @media (max-width: 375px) {
          .food-card {
            max-width: 100%;
            min-height: 450px;
            margin: 0;
          }
        }

        /* Touch-friendly improvements */
        @media (hover: none) and (pointer: coarse) {
          .food-card {
            transform: none !important;
          }
          
          .food-card:hover {
            transform: none !important;
          }
        }

        /* Ensure proper touch targets */
        @media (max-width: 768px) {
          select, button {
            min-height: 44px !important;
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
        }
      `}</style>
    </div>
  );
}

export default BasicExample;