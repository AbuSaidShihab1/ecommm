import React,{useState,useEffect} from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import toast,{Toaster} from 'react-hot-toast';
import axios from 'axios';
import { FiCheck, FiX } from 'react-icons/fi';
import zxcvbn from 'zxcvbn';
const Signup = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [tab, setTab] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = async(e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
      // Validate the username
  if (e.target.name === 'username') {
    if (value.length < 3) {
      setErrors({ ...errors, username: 'Username must be at least 3 characters long.' });
    } else {
      setErrors({ ...errors, username: '' });
      try {
        const response = await axios.get(`${base_url}/auth/username`,{username:e.target.value});
        if (response.data.message === 'Username already exists.') {
          setUsernameAvailable(false);
        } else {
          setUsernameAvailable(true);
        }
      } catch (error) {
        console.error(error);
        setUsernameAvailable(true); // Assuming it’s available in case of server errors
      }
    }
  }
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
  
    // First Name
    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First Name must be at least 2 characters';
    } else if (formData.firstName.length > 30) {
      newErrors.firstName = 'First Name must be less than 30 characters';
    }
  
    // Last Name
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last Name must be at least 2 characters';
    } else if (formData.lastName.length > 30) {
      newErrors.lastName = 'Last Name must be less than 30 characters';
    }
  

  
    // Username
    const usernameRegex = /^[a-zA-Z0-9_-]+$/; // allows letters, numbers, _ and -
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username must be less than 20 characters';
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, underscores, and hyphens';
    }
  
    // Email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }
  
    // Phone (Bangladeshi phone number validation)
    const phoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/; // Bangladeshi phone format
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid Bangladeshi phone number format';
    }
  
    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (formData.password.length > 20) {
      newErrors.password = 'Password must be less than 20 characters';
    }
  
    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    return newErrors;
  };
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${base_url}/auth/signup`, {
        registration_type: tab,
        ...formData,
      });
      console.log(response.data);
       // Save the step completion in localStorage
    localStorage.setItem('registrationStep', '1'); // Store step 1 as completed
      toast.success('Registration successful!');
      navigate(`/otp/${formData.email}`)

      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Registration failed';
      toast.error(errMsg);
    }
  };
// ---------------user-name-validation--------------------
const handleusernameChange = async (e) => {
  const { name } = e.target;
  let value = e.target.value.toLowerCase();

  // Allow only lowercase letters, numbers, underscores, and hyphens
  const usernameRegex = /^[a-z0-9_-]*$/;

  // If invalid characters are detected
  if (!usernameRegex.test(value)) {
    setFormData({ ...formData, [name]: value }); // Still update to show input
    setErrors((prev) => ({
      ...prev,
      username: 'Username can only contain letters, numbers, underscores (_), and hyphens (-)',
    }));
    return;
  }

  // Valid input: update state and clear errors
  setFormData({ ...formData, [name]: value });
  setErrors((prev) => ({ ...prev, username: '' }));

  if (name === 'username') {
    try {
      const response = await axios.get(`${base_url}/auth/username/${value}`);
      if (response.data.message === 'Username already exists.') {
        setUsernameAvailable(false);
      } else {
        setUsernameAvailable(true);
      }
    } catch (error) {
      console.error(error);
      setUsernameAvailable(true); // fallback
    }
  }
};


// Generate 2 username suggestions based on input
const generateUsernameSuggestions = (username) => {
  const suffixes = [
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 10000),
  ];
  return suffixes.map((suf) => `${username}${suf}`);
};
// --------------password-validation------------------

const getPasswordStrength = (password) => {
  const result = zxcvbn(password);
  return result.score; // 0: weak, 1: fair, 2: good, 3: strong
};

const passwordStrengthColor = (score, part) => {
  if (score === 0) {
    return part === 1 ? 'bg-red-500' : 'bg-gray-200';
  } else if (score === 1) {
    return part === 1 ? 'bg-yellow-500' : part === 2 ? 'bg-yellow-500' : 'bg-gray-200';
  } else if (score === 2) {
    return part === 1 ? 'bg-green-500' : part === 2 ? 'bg-green-500' : 'bg-gray-200';
  } else {
    return part === 1 ? 'bg-green-500' : part === 2 ? 'bg-green-500' : 'bg-green-500';
  }
};
  return (
    <section className='w-full font-poppins h-auto flex justify-center  gap-[30px]  py-[30px]'>
      <Toaster/>
        {/* -------------left side---------------- */}
        <section className='w-[90%] lg:w-[45%] xl:w-[45%]  xl:pl-[30px] 2xl:pl-[70px]'>
            <div className='w-[90%] xl:w-[80%] m-auto'>
               <NavLink to="/"> <h1 className='flex justify-start items-center gap-[5px] cursor-pointer text-[14px] text-neutral-600'><IoIosArrowRoundBack className='text-[22px]'/> Back to home</h1></NavLink>
                <div className='mt-[25px] lg:mt-[20px] flex mb-[25px]  lg:mb-[30px] justify-center lg:justify-start items-center gap-[20px]'>
                    <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-primary.f9d5d4f7.svg" alt="" />
                    <h2 className='font-[600] text-black'>isomorphic</h2>
                </div>
                <div className=' text-center lg:text-left w-[90%] lg:m-0 m-auto mb-[40px] '>
                     <h1 className='text-[28px] lg:text-[35px] lg:leading-[55px] font-bold mb-[20px]'>Join us and never miss a thing - SIGN UP!</h1>
                <p className='text-[13px] font-[500] text-neutral-700 leading-[26px]'>By signing up, you will gain access to exclusive content, special offers, and be the first to hear about exciting news and updates.</p>
                </div>
                 {/* <div className='flex justify-center md:flex-row flex-col mt-[40px]  gap-[20px]'>
                    <button className='w-full lg:w-[50%] hover:shadow-sm transition-all duration-100 px-[20px] py-[10px] border-[1px] border-[#eee] flex justify-center items-center gap-[10px] rounded-[5px] text-[14px] text-neutral-700'><SiApple className='text-[17px]'/> Signin With Apple</button>
                    <button className='w-full lg:w-[50%] px-[20px] hover:shadow-sm transition-all duration-100 py-[10px] border-[1px] border-[#eee] flex justify-center items-center gap-[10px] rounded-[5px] text-[14px] text-neutral-700'><FaGoogle className='text-[17px]'/> Signin With Google</button>
                 </div>
                    <div class="my-8 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-[17px] text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            OR
                        </div>
                    </div> */}
                    {/* ------------registration form------------- */}
                    <div className="w-full mt-10 py-6">
                    <div className="relative flex border-[2px] border-gray-200 p-1 rounded-lg mb-4">
      {/* Phone Button */}
      <button
        onClick={() => setTab("phone")}
        className="flex-1 relative z-10"
      >
        {tab === "phone" && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-brand_color rounded-md shadow-md"
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        )}
        <span
          className={`relative z-10 p-2 block text-center font-semibold transition-colors duration-300 ${
            tab === "phone" ? "text-white" : "text-gray-600"
          }`}
        >
          Phone No.
        </span>
      </button>

      {/* Email Button */}
      <button
        onClick={() => setTab("email")}
        className="flex-1 relative z-10"
      >
        {tab === "email" && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-brand_color rounded-md shadow-md"
            transition={{ type: "spring", stiffness: 200, damping: 40 }}
          />
        )}
        <span
          className={`relative z-10 p-2 block text-center font-semibold transition-colors duration-300 ${
            tab === "email" ? "text-white" : "text-gray-600"
          }`}
        >
          Email
        </span>
      </button>
    </div>

    <motion.div key={tab} className="mt-4">
  <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md outline-brand_color ${errors.firstName ? 'border-red-500' : ''}`}
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md outline-brand_color ${errors.lastName ? 'border-red-500' : ''}`}
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
      </div>
    </div>
    <div className="mt-4 relative">
  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
  <input
    type="text"
    name="username"
    value={formData.username}
    onChange={handleusernameChange}
    className={`w-full p-2 border rounded-md pr-10 outline-brand_color ${
      formData.username.length >= 4
        ? !usernameAvailable
          ? 'border-red-500'
          : 'border-green-500'
        : ''
    }`}
  />

  {/* ✅ Tick icon */}
  {formData.username.length >= 4 && usernameAvailable && !errors.username && (
    <FiCheck className="absolute right-3 top-9 text-green-500 text-xl" />
  )}

  {/* ❌ Cross icon */}
  {formData.username.length >= 4 && !usernameAvailable && !errors.username && (
    <FiX className="absolute right-3 top-9 text-red-500 text-xl" />
  )}

  {/* ❌ Error message */}
  {errors.username && (
    <p className="text-red-500 text-sm">{errors.username}</p>
  )}

  {/* ❌ Username taken message + suggestions */}
  {formData.username.length >= 4 && !usernameAvailable && !errors.username && (
    <>
      <div className="flex justify-between items-center mt-2">
      <p className="text-red-500 text-sm mb-1">Username already exists.</p>

        <ul className="flex text-[13px] gap-[5px]">
          {generateUsernameSuggestions(formData.username).map((suggestion, idx) => (
            <li
              key={idx}
              className="cursor-pointer text-green-500 bg-green-100 px-2 py-1 rounded-full"
              onClick={() => handleusernameChange({ target: { name: 'username', value: suggestion } })}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </>
  )}
</div>

    {tab === "phone" ? (
      <>
<div className="mt-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
  <div className={ errors.phone ? 'flex border  rounded-md overflow-hidden border-red-500' :"flex border border-gray-300 rounded-md overflow-hidden"}>
    {/* Country code section with flag */}
    <div className="flex items-center bg-gray-100 pl-3 pr-5  border-r border-gray-300">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/2560px-Flag_of_Bangladesh.svg.png"
        alt="BD Flag"
        className="w-5 h-3 rounded-sm object-cover"
      />
      <span className="ml-2 text-sm text-gray-800">+880</span>
    </div>
    {/* Phone input field */}
    <input
      type="text"
      name="phone"
      placeholder="Enter your phone number"
      value={formData.phone}
      onChange={handleChange}
      className={`w-full px-3 py-2.5 text-sm outline-none ${
        errors.phone ? 'border-red-500' : ''
      }`}
    />
  </div>
  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
</div>


        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md outline-brand_color ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
      </>
    ) : (
      <>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md outline-brand_color ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mt-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
  <div className={ errors.phone ? 'flex border  rounded-md overflow-hidden border-red-500' :"flex border border-gray-300 rounded-md overflow-hidden"}>
    {/* Country code section with flag */}
    <div className="flex items-center bg-gray-100 pl-3 pr-5  border-r border-gray-300">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/2560px-Flag_of_Bangladesh.svg.png"
        alt="BD Flag"
        className="w-5 h-3 rounded-sm object-cover"
      />
      <span className="ml-2 text-sm text-gray-800">+880</span>
    </div>
    {/* Phone input field */}
    <input
      type="text"
      name="phone"
      placeholder="Enter your phone number"
      value={formData.phone}
      onChange={handleChange}
      className={`w-full px-3 py-2.5 text-sm outline-none ${
        errors.phone ? 'border-red-500' : ''
      }`}
    />
  </div>
  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
</div>
      </>
    )}
 <div className="mt-4 grid grid-cols-1 gap-4 relative">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md outline-brand_color ${errors.password ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        {/* Password Strength Progress Bar */}
        {formData.password.length >= 5 && (
          <div className="mt-2">
            <div className="w-full h-2 rounded-full flex">
              {/* 1st Part of Progress Bar */}
              <motion.div
                className={`h-full rounded-l-full ${passwordStrengthColor(getPasswordStrength(formData.password), 1)}`}
                initial={{ width: '0%' }}
                animate={{ width: `${(getPasswordStrength(formData.password) >= 1 ? 33 : 0)}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>

              {/* Gap between sections */}
              <div className="w-1 px-1"></div>

              {/* 2nd Part of Progress Bar */}
              <motion.div
                className={`h-full ${passwordStrengthColor(getPasswordStrength(formData.password), 2)}`}
                initial={{ width: '0%' }}
                animate={{ width: `${(getPasswordStrength(formData.password) >= 2 ? 33 : 0)}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>

              {/* Gap between sections */}
              <div className="w-1 px-1"></div>

              {/* 3rd Part of Progress Bar */}
              <motion.div
                className={`h-full rounded-r-full ${passwordStrengthColor(getPasswordStrength(formData.password), 3)}`}
                initial={{ width: '0%' }}
                animate={{ width: `${(getPasswordStrength(formData.password) === 3 ? 33 : 0)}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <div className="text-sm mt-1 text-center">
              {getPasswordStrength(formData.password) === 0 && 'Weak'}
              {getPasswordStrength(formData.password) === 1 && 'Medium'}
              {getPasswordStrength(formData.password) === 2 && 'Strong'}
              {getPasswordStrength(formData.password) === 3 && 'Very Strong'}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md outline-brand_color ${errors.confirmPassword ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>
    </div>

    <button
      type="submit"
      className="w-full mt-6 p-2 bg-brand_color text-white rounded-md text-lg font-semibold shadow-md hover:bg-brand_color transition-all duration-300"
    >
      Get Started
    </button>
    <div className="text-center mt-6 text-sm text-gray-600">
  <p>
    Don’t have an account?{" "}
    <span className="text-blue-600 font-medium cursor-pointer hover:underline">
      Sign up
    </span>
  </p>
  <p className="mt-2">
    By signing up you agree to the{" "}
    <span className="text-blue-600 font-medium cursor-pointer hover:underline">
      Terms of Use
    </span>{" "}
    &{" "}
    <span className="text-blue-600 font-medium cursor-pointer hover:underline">
      Privacy Policy
    </span>{" "}
    of Weblesser.
  </p>
</div>

  </form>
</motion.div>

    </div>
                    {/* ------------registration form------------- */}
            </div>
        </section>
        {/* ------------right side--------------- */}
        <section className='w-[100%] h-auto hidden  lg:w-[55%] lg:flex justify-center items-center bg-[#FAFAFA] p-[25px] rounded-[10px]'>
             <div>
              <div className='w-[90%] xl:w-[60%] m-auto pt-[70px] mb-[40px]'>
                  <h2 className='text-[18px] lg:text-[24px] xl:text-[28px] font-[600] text-center mb-[15px]'>The simplest way to manage your workspace.</h2>
                <p className='text-[15px] mt-[10px] mt-[25px] text-center text-neutral-600'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit officia consequat duis.</p>
              </div>
              <div className='pl-[40px]'>
                <img src="https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Fauth%2Fsign-up.webp&w=1920&q=75" alt="" />

              </div>
             </div>
        </section>
        {/* ----------------right side--------------- */}
    </section>
  )
}

export default Signup