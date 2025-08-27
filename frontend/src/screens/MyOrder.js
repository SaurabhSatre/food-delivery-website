import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setorderData] = useState({})

  const fetchMyOrder = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/myOrderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    }).then(async (res) => {
      let response = await res.json()
      await setorderData(response)
    })
  }

  useEffect(() => {
    fetchMyOrder()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff3e0 0%, #f8fafc 100%)', padding: '0 0 40px 0' }}>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-5" style={{ color: '#ff5e62', fontWeight: 800, letterSpacing: '2px', textShadow: '0 2px 8px #ffb34744' }}>
          <span role="img" aria-label="orders">🧾</span> My Orders
        </h2>
        <div className="row g-4 justify-content-center">
          {orderData && orderData.orderData && orderData.orderData.order_data && orderData.orderData.order_data.length > 0 ? (
            orderData.orderData.order_data.slice(0).reverse().map((item, idx) => (
              <React.Fragment key={idx}>
                {item.map((arrayData, index) => (
                  arrayData.Order_date ? (
                    <div key={index} className="col-12 text-center mb-3">
                      <span className="badge rounded-pill px-4 py-2" style={{ background: 'linear-gradient(90deg, #ff914d 0%, #ff5e62 100%)', color: '#fff', fontSize: '1.1rem', boxShadow: '0 2px 8px #ffb34733' }}>
                        <span role="img" aria-label="calendar" style={{ marginRight: '8px' }}>📅</span>
                        {arrayData.Order_date}
                      </span>
                    </div>
                  ) : (
                    <div className="col-12 col-md-6 col-lg-4 d-flex" key={index}>
                      <div className="card h-100 shadow border-0 flex-fill" style={{ borderLeft: '6px solid #ff914d', borderRadius: '18px', transition: 'transform 0.2s', background: '#fff', minWidth: '260px', maxWidth: '350px', margin: '0 auto' }}>
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div className="d-flex align-items-center mb-2">
                            <span role="img" aria-label="food" style={{ fontSize: '2rem', marginRight: '10px' }}>🍽️</span>
                            <h5 className="card-title mb-0" style={{ color: '#ff5e62', fontWeight: 700, fontSize: '1.3rem' }}>{arrayData.name}</h5>
                          </div>
                          <div className="mb-2">
                            <span className="badge bg-warning text-dark me-2">{arrayData.qty} Qty</span>
                            <span className="badge bg-info text-dark me-2">{arrayData.size}</span>
                            <span className="badge bg-light text-dark">{arrayData.price} ₹</span>
                          </div>
                          <div className="text-end mt-auto">
                            <span className="fw-bold" style={{ color: '#ff914d', fontSize: '1.1rem' }}>
                              Ordered on: <span style={{ color: '#ff5e62' }}>{arrayData.Order_date || ''}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </React.Fragment>
            ))
          ) : (
            <div className="text-center text-muted fs-4">No orders found.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}