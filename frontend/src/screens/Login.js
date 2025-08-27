import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../Images/logo.webp"
import BackgroundImg from "../Images/BackgroundImg.png"
export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/loginuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      if (response.ok) {
        const json = await response.json();

        if (json.success) {
          localStorage.setItem("authToken", json.authToken);
          localStorage.setItem("userEmail", credentials.email);
          navigate("/");
          toast.success("Logged In Successfully🥳🥳");
          toast.info(`Welcome back, ${credentials.email}! 🎉`);
        }
        if (!json.success) {
          toast.error('Please Enter correct Information');
        }
      }
      else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing the request.');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: `linear-gradient(135deg, #f8fafc 60%, #ffe5b4 100%)`, backgroundImage: `url(${BackgroundImg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '20px', background: 'rgba(255,255,255,0.95)' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Food Icon" style={{ width: '60px', borderRadius: '50%' }} />
          <h2 className="mt-3" style={{ fontWeight: 700, color: '#ff914d' }}>Login to HungryHub</h2>
          <p className="text-muted">Welcome back! Order your favorites now.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>Email address</label>
            <input type='email' className='form-control rounded-pill' id='exampleInputEmail1' aria-describedby='emailHelp' name='email' value={credentials.email} onChange={onChange} required />
            <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>Password</label>
            <input type='password' className='form-control rounded-pill' id='exampleInputPassword1' name='password' value={credentials.password} onChange={onChange} required minLength={6} />
          </div>
          <button type='submit' className='btn btn-warning w-100 rounded-pill fw-bold' style={{ background: '#ff914d', border: 'none' }}>Login</button>
          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account?</span>
            <Link to={'/createuser'} className='btn btn-link text-decoration-none fw-bold' style={{ color: '#ff914d' }}>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}


// if email is already exist we cannot create a new user -- Add Functionality
