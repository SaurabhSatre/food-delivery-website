import React from 'react'

export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="mt-3 text-muted">
          <div>Loading delicious food...</div>
          <small>Please wait while we fetch the menu</small>
        </div>
      </div>
    </div>
  )
}


