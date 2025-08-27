import './App.css';
import Home from './screens/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MyOrder from './screens/MyOrder';
import Protected from './screens/Admin Screen/ProtectedRouteAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<SignUp />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/admin" element={<Protected Component={Home} /> } />
      </Routes>
      
      {/* Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999
        }}
      />
    </BrowserRouter>
  );
}

export default App;
