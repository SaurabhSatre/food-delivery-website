import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../Images/logo.webp";
import BackgroundImg from "../Images/BackgroundImg.png"
export default function SignUp() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    // The preventDefault() method is used to prevent the browser from executing the default action of the selected element.
    event.preventDefault();
    console.log("This is event ", event);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      toast.success('Submitted Successfully🥳🥳');
      toast.info(`Welcome to HungryHub, ${credentials.name}! 🎉`);
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/");
    }
    else {
      toast.error("Please!! Enter Valid Information🥰🥰");
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
          <h2 className="mt-3" style={{ fontWeight: 700, color: '#ff914d' }}>Sign Up to HungryHub</h2>
          <p className="text-muted">Get your favorite food delivered fast!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>Name</label>
            <input type='text' className='form-control rounded-pill' name='name' value={credentials.name} onChange={onChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>Email address</label>
            <input type='email' className='form-control rounded-pill' id='exampleInputEmail1' aria-describedby='emailHelp' name='email' value={credentials.email} onChange={onChange} required />
            <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>Password</label>
            <input type='password' className='form-control rounded-pill' id='exampleInputPassword1' name='password' value={credentials.password} onChange={onChange} required minLength={6} />
          </div>
          <button type='submit' className='btn btn-warning w-100 rounded-pill fw-bold' style={{ background: '#ff914d', border: 'none' }}>Sign Up</button>
          <div className="text-center mt-3">
            <span className="text-muted">Already have an account?</span>
            <Link to={'/login'} className='btn btn-link text-decoration-none fw-bold' style={{ color: '#ff914d' }}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

