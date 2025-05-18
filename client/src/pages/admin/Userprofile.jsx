import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";

const Userprofile = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const [showmodal,setmodal]=useState(false);
     const uploadpost=()=>{
                setmodal(true)
     }
    function handlesidebar(){
        setactivesidebar(!activesidebar)
    }
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 md:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto md:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
       <div className='w-full flex justify-between items-center'>
        <div>
              <h1 className='text-[20px] font-[600] mb-[8px]'>User Profile</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>User Profile</li>
          </ul>
        </div>
        {/* <button className='px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
            <BiImport className='text-[25px]'/>
            Import
        </button> */}
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>
            <div>
                <h2 className='text-[20px] font-[600]'>User Information</h2>
            </div>
            {/* -------------------form---------------------- */}
                  <form action=""className='pt-[20px]'>
                         <div className='w-full flex gap-[30px] mb-[20px]'>
                        <div className='w-[100%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'> Designation <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder=' Designation'className='w-full mt-[8px] rounded-[5px] placeholder-gray-700 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                 
                    </div>
                    <div className='w-full flex gap-[30px] mb-[20px]'>
                        <div className='w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>First Name <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder='First Name'className='w-full mt-[8px] rounded-[5px] placeholder-gray-700 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                         <div className='w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Last Name <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder='Last Name'className='w-full mt-[8px] rounded-[5px] placeholder-gray-700 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                    </div>
                       <div className='w-full flex gap-[30px] mb-[20px]'>
                        <div className='w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Username <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder='Username'className='w-full mt-[8px] rounded-[5px] placeholder-gray-700 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                         <div className='w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Email <span className='text-red-500'>*</span></label>
                            <input type="text"placeholder='Email'className='w-full mt-[8px] rounded-[5px] placeholder-gray-700 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                    </div>
                       <div className='w-full flex gap-[30px] mb-[20px]'>
                        <div className='w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Phone <span className='text-red-500'>*</span></label>
                            <input type="number"placeholder='Phone'className='w-full mt-[8px] rounded-[5px] placeholder-gray-700 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                         <div className='w-[50%]'>
                            <label htmlFor=""className='text-[15px] font-[500] text-gray-600'>Password <span className='text-red-500'>*</span></label>
                            <input type="password"placeholder='Password'className='w-full mt-[8px] rounded-[5px] placeholder-gray-700 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
                        </div>
                    </div>

              <div className='flex justify-end items-center gap-[10px]'>
                <button className='px-[30px] py-[10px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'><LuSaveAll className='text-[22px]'/>Draft</button>
                                  <button className='px-[30px] py-[10px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>Submit</button>
                                </div>
                  </form>
            {/* -------------------form---------------------- */}
         </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Userprofile