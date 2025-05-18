import React,{useState,useEffect,useRef} from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
const Sendotp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [error, setError] = useState('');
  const {email}=useParams()
  const navigate=useNavigate();
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const finalOtp = otp.join('');
    if (finalOtp.length !== 6) {
      return setError('Please enter all 6 digits of the OTP.');
    }

    try {
      const { data } = await axios.post(`${base_url}/auth/verifyotp`, {
        email: email,
        otp: finalOtp,
      });
      toast.success(data.message);
      // Save token and registration step to localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user)); // Add more user info if available
    localStorage.setItem('registrationStep', '2');
   setTimeout(() => {
    navigate("/web-settings")
   }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      await axios.post(`${base_url}/auth/resend-otp`, { email: email });
      setTimer(prev => prev + 30);
      toast.success('OTP resent successfully');
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, otp.length);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (!/^\d$/.test(pastedData[i])) continue;
      newOtp[i] = pastedData[i];
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = pastedData[i];
      }
    }
  
    setOtp(newOtp);
  
    // Focus next empty input after paste
    for (let i = 0; i < newOtp.length; i++) {
      if (newOtp[i] === '' && inputRefs.current[i]) {
        inputRefs.current[i].focus();
        break;
      }
    }
  };
  
  return (
    <section className='font-poppins relative'>
      <Toaster/>
               <NavLink to="/"> <h1 className='flex pl-[30px] xl:pl-[30px]   2xl:pl-[140px] py-[15px] justify-start items-center gap-[5px] cursor-pointer text-[14px] lg:text-neutral-600'><IoIosArrowRoundBack className='text-[22px]'/> Back to home</h1></NavLink>
    <section className='w-full font-poppins lg:mt-0 mt-[70px] h-auto flex justify-center items-center  gap-[30px]  pb-[30px]'>
        {/* -------------left side---------------- */}
        <section className='w-[90%] lg:w-[45%] xl:w-[45%] xl:pl-[30px] 2xl:pl-[70px]'>
      <div className='w-[90%] xl:w-[80%] m-auto'>
        <div className='mt-[25px] flex mb-[25px] lg:mb-[30px] justify-center lg:justify-start items-center gap-[20px]'>
          <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-primary.f9d5d4f7.svg" alt="" />
          <h2 className='font-[600] text-black'>isomorphic</h2>
        </div>

        <div className='text-center lg:text-left w-[90%] lg:m-0 m-auto mb-[40px]'>
          <h1 className='text-[28px] lg:text-[35px] lg:leading-[55px] font-bold mb-[20px]'>Enter your OTP.</h1>
          <p className='mt-[10px] text-neutral-700'>We have sent a One Time Password to your email.</p>
        </div>

        {/* ------------OTP Form------------- */}
        <form onSubmit={handleSubmit} className='py-[50px]'>
          <div className='w-full flex justify-center items-center gap-[10px] mb-[30px]'>
            {otp.map((digit, index) => (
        <input
        key={index}
        type="text"
        maxLength={1}
        value={digit}
        ref={(el) => (inputRefs.current[index] = el)}
        onChange={(e) => handleChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        onPaste={index === 0 ? handlePaste : undefined}
        className='w-[50px] h-[50px] text-center rounded-[5px] border-[2px] outline-brand_color text-[18px] border-neutral-200'
      />
      
            ))}
          </div>
          {error && (
  <p className="text-center  text-red-500 text-[16px] mb-[10px]">{error}</p>
)}
          <button type="submit" className='mt-[15px] mb-[30px] rounded-[5px] text-white w-full h-[50px] bg-brand_color'>
            Verify OTP
          </button>

          <div className='flex justify-center'>
            {timer > 0 ? (
              <h2 className='text-[14px] text-neutral-500'>
                You can resend OTP in <span className='font-semibold text-black'>{timer}s</span>
              </h2>
            ) : (
              <h2 className='text-[14px] text-neutral-500'>
                Didn't get OTP?{' '}
                <span onClick={handleResend} className='text-black font-[600] text-[14px] cursor-pointer'>
                  Resend
                </span>
              </h2>
            )}
          </div>
        </form>
        {/* ------------OTP Form------------- */}
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
    </section>

  )
}

export default Sendotp