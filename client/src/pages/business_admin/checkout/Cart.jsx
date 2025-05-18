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
const Cart = () => {
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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Cart</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
             <li>Setting</li>
            <li><IoIosArrowForward/></li>
            <li>Cart</li>
          </ul>
        </div>
        <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
            <BiImport className='text-[25px]'/>
            Import
        </button>
       </div>
       {/* ------------------new customer table----------------- */}
       <section className="w-full font-poppins">
         <section>
           <div className="w-full">
             <div className="bg-[#FAFAFA] lg:hidden px-[20px] mt-[10px] border-[1px] bordr-gray-200 py-[10px] text-[20px] font-[600] text-center">
               <h2>Shopping Cart</h2>
             </div>
             {/* Progress Bar */}
             <div className="w-full lg:flex hidden  bg-[#FAFAFA] px-[20px]">
               <div className="mx-auto flex w-full  py-[20px]  flex-col sm:flex-row justify-between items-center pb-4 mb-4 text-base sm:text-lg font-semibold">
                 <div className="text-brand_color text-center sm:text-left">
                   <span className="text-2xl sm:text-3xl font-bold">01</span> SHOPPING CART
                   <p className="text-gray-500 text-xs sm:text-sm">Manage Your Items List</p>
                 </div>
                 <div className="text-gray-300 text-center sm:text-left">
                   <span className="text-2xl sm:text-3xl font-bold">02</span> CHECKOUT DETAILS
                   <p className="text-xs sm:text-sm">Checkout Your Items List</p>
                 </div>
                 <div className="text-gray-300 text-center sm:text-left">
                   <span className="text-2xl sm:text-3xl font-bold">03</span> ORDER COMPLETE
                   <p className="text-xs sm:text-sm">Review Your Order</p>
                 </div>
               </div>
             </div>
   
             {/* Cart Section */}
             <section className="mx-auto w-full px-[20px] py-[20px] lg:flex-row flex-col flex gap-[50px] lg:gap-[30px]">
               <section className="w-full lg:w-[65%]">
               <div className="overflow-x-auto">
                     <table className="w-full border text-left text-sm sm:text-base">
                       <thead>
                         <tr className="border-b">
                           <th className="p-2 sm:p-3 font-[500]">ITEM</th>
                           <th className="p-2 sm:p-3 font-[500]">PRICE</th>
                           <th className="p-2 sm:p-3 font-[500]">DURATION</th>
                           <th className="p-2 sm:p-3 font-[500] lg:block hidden">TOTAL AMOUNT</th>
                         </tr>
                       </thead>
                       <tbody>
                       <tr className="border-b">
                             <td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
                               <img src="https://www.startech.com.bd/image/catalog/home/banner/2025/ac-ton-calculator.webp" alt="image" className="w-12 h-12 sm:w-16 sm:h-16 object-cover  rounded" />
                               <span className="text-[15px] sm:text-base">Premium Package</span>
                             </td>
                             <td className="p-2 sm:p-3">৳ 500</td>
                             <td className="p-2 sm:p-3">
     <div className="flex items-center border rounded px-2 py-1 w-28 justify-between">
       <div className="flex items-center text-lg">
         <span className="w-6 text-right">{value}</span>
         <span className="ml-1">year</span>
       </div>
       <div className="grid grid-rows-2 ml-2 border-l">
         <button
           onClick={() => setValue((prev) => Math.min(prev + 1, 99))}
           className="h-4 w-5 flex items-center justify-center text-xs border-b hover:bg-gray-100"
         >
           ▲
         </button>
         <button
           onClick={() => setValue((prev) => Math.max(prev - 1, 1))}
           className="h-4 w-5 flex items-center justify-center text-xs hover:bg-gray-100"
         >
           ▼
         </button>
       </div>
     </div>
   </td>
   
                
                             <td className="p-2 sm:p-3">
                               <span>৳ 400</span>
                             </td>
                           </tr>
                       </tbody>
                     </table>
                   </div>
   
                 <div className="flex flex-wrap lg:flex-row flex-col gap-2 mt-4">
                   {/* Coupon Input and Apply Button */}
                   <div className="flex gap-2 flex-1">
                     <input type="text" placeholder="Enter Coupon Code" className="border p-2 sm:p-3 flex-1 rounded text-xs sm:text-sm" />
                     <button className="bg-brand_color text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-[500] text-xs sm:text-[13px]">
                       APPLY COUPON
                     </button>
                   </div>
   
           
           
                 </div>
               </section>
     {/* Cart Totals */}
   
               {/* Cart Totals */}
               <div className="w-full lg:w-[35%] border-[2px] p-4 sm:p-6 rounded shadow-sm  bg-gray-50 text-sm sm:text-base">
                 <h3 className="font-[500] mb-[30px] sm:mb-[40px] text-lg sm:text-xl">CART TOTALS</h3>
                 <p className="flex justify-between text-[16px] lg:text-[17px] font-[500] border-b pb-2 sm:pb-3">
                   <span>Subtotal</span> <span>৳ 500</span>
                 </p>
   
               
                 <p className="flex justify-between font-[500]  text-lg sm:text-[20px] mt-4">
                   <span >Total</span> <span className="text-brand_color font-[600]">৳ 500</span>
                 </p>
                 <NavLink to="/checkout">
                 <button className="bg-brand_color text-white w-full mt-4 sm:mt-6 py-2 sm:py-3  text-sm sm:text-[15px] font-[500]">PROCEED TO CHECKOUT</button>
                 </NavLink>
               </div>
             </section>
           </div>
         </section>
       </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Cart