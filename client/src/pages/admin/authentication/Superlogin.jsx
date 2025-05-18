import React, { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { NavLink, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const Superlogin = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
      setToastType('');
    }, 3000); // hide after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true); // Start loading
  
    try {
      const { data } = await axios.post(`${base_url}/api/admin/admin-login`, { email, password });
  
      if (data.success) {
        showToast('Login successful!', 'success');
        localStorage.setItem('adminToken', data.jwtToken);
        localStorage.setItem('admin_ecommerce', JSON.stringify(data.admin));
        setTimeout(() => {
          navigate("/super-dashboard");
        }, 1000);
      } else {
        showToast(data.message || 'Login failed', 'error');
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false); // End loading
    }
  };
  
  return (
    <section className="w-full font-poppins min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 via-white to-blue-100 py-12">
      {/* Custom Toast */}
      {toastMessage && (
  <div 
    className={`fixed top-6 right-6 z-50 flex items-center gap-4 px-6 py-4 rounded-lg shadow-lg text-white font-medium transition-all duration-300 animate-fade-in
      ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
  >
    <span>{toastMessage}</span>
    <button 
      onClick={() => setToastMessage('')} 
      className="text-white text-xl leading-none hover:text-gray-200 transition"
    >
      &times;
    </button>
  </div>
)}


      <div className="flex flex-col items-center w-full">
        <img
          src="https://www.weblasser.com/wp-content/uploads/2021/04/Logo.png"
          alt="Admin Logo"
          className="mb-6"
        />

        <div className="bg-white p-10 rounded-[5px] border-[1px] border-gray-200 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-brand_color mb-8 font-comic">Admin Sign in</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-[5px] outline-brand_color transition`}
                placeholder="admin@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-[5px] outline-brand_color transition`}
                placeholder="••••••••"
              />
              <div
                className="absolute top-10 right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
  type="submit"
  disabled={loading}
  className={`w-full bg-brand_color text-white font-semibold py-3 rounded-[5px] transition transform hover:scale-105
    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'}`}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"></path>
      </svg>
      Signing in...
    </div>
  ) : (
    'Sign in'
  )}
</button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Superlogin;
