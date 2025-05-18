import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { NavLink } from 'react-router-dom';
const Superconfirmpassword = () => {
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
                     <h1 className='text-[28px] lg:text-[35px] lg:leading-[55px] font-bold mb-[20px]'>Confirm your password!</h1>
                </div>

                    {/* ------------registration form------------- */}
                       <form>
                          <div className='w-full mt-[10px] mb-[15px]'>
                            <label htmlFor="name"className='text-[14px] lg:text-[16px] text-neutral-800'>New Password</label> <br />
                            <input type="password"placeholder='Enter your new password'className='px-[15px] text-[14px] outline-brand_color mt-[5px] w-full h-[50px] border-[2px] border-[#eee] rounded-[5px]' />
                            </div>  
                                    <div className='w-full mt-[10px] mb-[15px]'>
                            <label htmlFor="name"className='text-[14px] lg:text-[16px] text-neutral-800'>Confirm Password</label> <br />
                            <input type="password"placeholder='Enter your confirm password'className='px-[15px] text-[14px] outline-brand_color mt-[5px] w-full h-[50px] border-[2px] border-[#eee] rounded-[5px]' />
                            </div>  
                       <button className='mt-[15px] mb-[20px] rounded-[5px] text-white w-full h-[50px] bg-brand_color'>Change Password</button>
                      <div className='flex'>
                        <h2 className='text-[14px] text-neutral-500'>Don’t want to reset your password? <span className='text-black font-[600] text-[14px]'>Sign In</span></h2>
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

export default Superconfirmpassword