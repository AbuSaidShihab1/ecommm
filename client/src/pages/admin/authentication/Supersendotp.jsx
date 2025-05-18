import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { NavLink } from 'react-router-dom';
const Supersendotp = () => {
  return (
    <section className='font-poppins relative'>
               <NavLink to="/"> <h1 className='flex pl-[30px] xl:pl-[30px]   2xl:pl-[140px] py-[15px] justify-start items-center gap-[5px] cursor-pointer text-[14px] lg:text-neutral-600'><IoIosArrowRoundBack className='text-[22px]'/> Back to home</h1></NavLink>
    <section className='w-full font-poppins lg:mt-0 mt-[70px] h-auto flex justify-center items-center  gap-[30px]  pb-[30px]'>
        {/* -------------left side---------------- */}
        <section className='w-[90%] lg:w-[45%] xl:w-[45%]   xl:pl-[30px] 2xl:pl-[70px]'>
            <div className='w-[90%] xl:w-[80%] m-auto'>
                <div className='mt-[25px]  flex mb-[25px] lg:mb-[30px] justify-center lg:justify-start items-center gap-[20px]'>
                    <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-primary.f9d5d4f7.svg" alt="" />
                    <h2 className='font-[600] text-black'>isomorphic</h2>
                </div>
                <div className=' text-center lg:text-left w-[90%] lg:m-0 m-auto mb-[40px] '>
                     <h1 className='text-[28px] lg:text-[35px] lg:leading-[55px] font-bold mb-[20px]'>Enter your OTP.</h1>
                     <p className='mt-[10px] text-neutral-700'>We have sent you One Time Password to your email.</p>
                </div>

                    {/* ------------registration form------------- */}
                       <form className='py-[50px]'>
                          <div className='w-full flex justify-center items-center gap-[10px] mb-[30px]'>
                             <input type="text"className='w-[50px] h-[50px] text-center rounded-[5px] border-[2px] outline-brand_color text-[18px] border-neutral-200'placeholder='o' />
                             <input type="text"className='w-[50px] h-[50px] text-center rounded-[5px] border-[2px] outline-brand_color text-[18px] border-neutral-200'placeholder='o' />
                             <input type="text"className='w-[50px] h-[50px] text-center rounded-[5px] border-[2px] outline-brand_color text-[18px] border-neutral-200'placeholder='o' />
                             <input type="text"className='w-[50px] h-[50px] text-center rounded-[5px] border-[2px] outline-brand_color text-[18px] border-neutral-200'placeholder='o' />
                             
                          </div>
                       <button className='mt-[15px] mb-[30px] rounded-[5px] text-white w-full h-[50px] bg-brand_color'>Verify OTP</button>
                      <div className='flex'>
                      <h2 className='text-[14px] text-neutral-500'>Didn't get OTP?  <span className='text-black font-[600] text-[14px] cursor-pointer'><span className=''>Resend</span></span></h2>
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
    </section>

  )
}

export default Supersendotp