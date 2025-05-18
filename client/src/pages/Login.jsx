import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { NavLink } from 'react-router-dom';
const Login = () => {
  return (
    <section className='w-full font-poppins h-auto flex justify-center  gap-[30px]  py-[30px]'>
        {/* -------------left side---------------- */}
        <section className='w-[90%] lg:w-[45%] xl:w-[45%]   xl:pl-[30px] 2xl:pl-[70px]'>
            <div className='w-[90%] xl:w-[80%] m-auto'>
               <NavLink to="/"> <h1 className='flex  justify-start items-center gap-[5px] cursor-pointer text-[14px] text-neutral-600'><IoIosArrowRoundBack className='text-[22px]'/> Back to home</h1></NavLink>
                <div className='mt-[25px] lg:mt-[70px] flex mb-[25px] lg:mb-[30px] justify-center lg:justify-start items-center gap-[20px]'>
                    <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-primary.f9d5d4f7.svg" alt="" />
                    <h2 className='font-[600] text-black'>isomorphic</h2>
                </div>
                <div className=' text-center lg:text-left w-[90%] lg:m-0 m-auto mb-[40px] '>
                     <h1 className='text-[28px] lg:text-[35px] lg:leading-[55px] font-bold mb-[20px]'>Welcome back! Please Sign in to continue.</h1>
                <p className='text-[13px] font-[500] text-neutral-700 leading-[26px]'>By signing up, you will gain access to exclusive content, special offers, and be the first to hear about exciting news and updates.</p>
                </div>
                 <div className='flex justify-center md:flex-row flex-col mt-[40px]  gap-[20px]'>
                    <button className='w-full lg:w-[50%] hover:shadow-sm transition-all duration-100 px-[20px] py-[10px] border-[1px] border-[#eee] flex justify-center items-center gap-[10px] rounded-[5px] text-[14px] text-neutral-700'><SiApple className='text-[17px]'/> Signin With Apple</button>
                    <button className='w-full lg:w-[50%] px-[20px] hover:shadow-sm transition-all duration-100 py-[10px] border-[1px] border-[#eee] flex justify-center items-center gap-[10px] rounded-[5px] text-[14px] text-neutral-700'><SiApple className='text-[17px]'/> Signin With Google</button>
                 </div>
                    <div class="my-8 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-[17px] text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            OR
                        </div>
                    </div>
                    {/* ------------registration form------------- */}
                       <form>
                            <div className='w-full mt-[10px] mb-[15px]'>
                            <label htmlFor="name"className='text-[14px] lg:text-[16px] text-neutral-800'>Email</label> <br />
                            <input type="text"placeholder='Enter your email'className='px-[15px] text-[14px] outline-brand_color mt-[5px] w-full h-[50px] border-[2px] border-[#eee] rounded-[5px]' />
                            </div>  
                          <div className='w-full mt-[10px] mb-[15px]'>
                            <label htmlFor="name"className='text-[14px] lg:text-[16px] text-neutral-800'>Password</label> <br />
                            <input type="password"placeholder='Enter your password'className='px-[15px] text-[14px] outline-brand_color mt-[5px] w-full h-[50px] border-[2px] border-[#eee] rounded-[5px]' />
                            </div>  
                          <div className='flex justify-between items-center py-[15px]'>
                               <div className='flex justify-start  items-center gap-[10px]'>
                        <input type="checkbox"className='w-[15px] h-[15px] border-[1px] ' />
                        <h3 className='text-[16px] '>Remember Me</h3>
                       </div>
                       <NavLink className="text-indigo-700  font-[500] underline ">
                          <span>Forget Password?</span>
                       </NavLink>
                          </div>
                       <button className='mt-[20px] mb-[20px] rounded-[5px] text-white w-full h-[50px] bg-brand_color'>Get Started</button>
                      <div className='flex'>
                        <h2 className='text-[14px] text-neutral-500'>Don’t have an account? <span className='text-black font-[600] text-[14px]'>Sign Up</span></h2>
                      </div>
                       </form>
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

export default Login