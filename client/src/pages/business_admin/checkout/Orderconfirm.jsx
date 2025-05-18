import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/Business_dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { FaCheck, FaBoxOpen } from 'react-icons/fa';
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserAlt, FaLightbulb, FaRocket, FaCrown } from 'react-icons/fa';
import { FaCamera } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const Orderconfirm = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
  const [activePlanIndex, setActivePlanIndex] = useState(null);
  const [value, setValue] = useState(1);

        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
const plans = [
  {
    title: "Free Plan",
    description: "Ideal for beginners.",
    features: ["10 Credits", "500MB Library", "500MB Traffic"],
    technology: "Android, iOS",
    support: "Email, Chat",
    price:300,
    price2:350,
    icon: <FaUserAlt />,
  },
  {
    title: "Starter Plan",
    description: "Perfect for small projects.",
    features: ["5,000 Credits", "5,000MB Library", "5,000MB Traffic"],
    technology: "Android, iOS",
    support: "Email, Chat",
    price:400,
    price2:450,
    icon: <FaLightbulb />,
  },
  {
    title: "Advance Plan",
    description: "Great for growing teams.",
    features: ["10,000 Credits", "10,000MB Library", "10,000MB Traffic"],
    technology: "Android, iOS",
    support: "Email, Chat",
    price:455,
    price2:500,
    icon: <FaRocket />,
  },
  {
    title: "Premium Plan",
    description: "Best for enterprises.",
    features: ["100,000 Credits", "100,000MB Library", "100,000MB Traffic"],
    technology: "Android, iOS",
    support: "Email, Chat",
    price:555,
    price2:620,
    icon: <FaCrown />,
  },
];

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] '>
       <div className='w-full flex justify-between items-center'>
        <div className='xl:py-[40px] px-[30px]'>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Order Confirmation</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
             <li>Setting</li>
            <li><IoIosArrowForward/></li>
            <li>Order Confirmation</li>
          </ul>
        </div>
       </div>
       {/* ------------------new customer table----------------- */}
     <section className="font-poppins">
        {/* Progress Bar */}
        <div className="w-full lg:flex hidden  bg-[#FAFAFA] px-[20px]">
               <div className="mx-auto flex w-full  py-[20px]  flex-col sm:flex-row justify-between items-center pb-4 mb-4 text-base sm:text-lg font-semibold">
                 <div className="text-gray-300 text-center sm:text-left">
                   <span className="text-2xl sm:text-3xl font-bold">01</span> SHOPPING CART
                   <p className="text-gray-500 text-xs sm:text-sm">Manage Your Items List</p>
                 </div>
                 <div className="text-gray-300 text-center sm:text-left">
                   <span className="text-2xl sm:text-3xl font-bold">02</span> CHECKOUT DETAILS
                   <p className="text-xs sm:text-sm">Checkout Your Items List</p>
                 </div>
                 <div className="text-brand_color text-center sm:text-left">
                   <span className="text-2xl sm:text-3xl font-bold">03</span> ORDER COMPLETE
                   <p className="text-xs sm:text-sm">Review Your Order</p>
                 </div>
               </div>
             </div>
       <div className="mx-auto w-full  px-[15px] py-[10px] lg:py-[20px] m-auto ">
        <div className="bg-white py-[30px] w-full">
          <div className="border-b pb-4 mb-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <FaCheckCircle className="text-green-500 text-2xl mr-2" />
              <span className="text-gray-700 font-semibold text-lg">
                Thank you. Your order has been received.
              </span>
            </div>
          </div>
  
          <div className="grid grid-cols-4 border-b pb-4 mb-4 text-sm text-gray-700 text-center">
            <div>
              <p className="font-semibold">Order Number</p>
              <p className="text-gray-900">22496</p>
            </div>
            <div>
              <p className="font-semibold">Date</p>
              <p className="text-gray-900">March 7, 2025</p>
            </div>
            <div>
              <p className="font-semibold">Total</p>
              <p className="text-gray-900">$105.93</p>
            </div>
            <div>
              <p className="font-semibold">Payment Method</p>
              <p className="text-gray-900">Cash on delivery</p>
            </div>
          </div>
  
          <p className="text-gray-700 text-center mb-4">Pay with cash upon delivery.</p>
  
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Order details</h2>
            <div className="flex justify-between border-b pb-2 mb-2">
              <p>Performance Cam Gear for Nissan/Datsun, Skyline, 1989-1989 × 1</p>
              <p className="font-semibold">$99.00</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Subtotal:</p>
              <p>99.00</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Discount:</p>
              <p>33.00</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Taxes:</p>
              <p>3.93</p>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 border-t pt-2 mt-2 text-lg">
              <p>TOTAL:</p>
              <p className="text-red-500">105.93</p>
            </div>
          </div>
  
        </div>
      </div>
  
     </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Orderconfirm