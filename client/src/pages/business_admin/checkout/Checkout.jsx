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
import { FaRegCircle } from "react-icons/fa";
import { FaCcPaypal, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";
const Checkout = () => {
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
const [selectedShipping, setSelectedShipping] = useState("inside");
  const [paymentMethod, setPaymentMethod] = useState("sslcommerz");
  const [billingAddress, setBillingAddress] = useState("same");
  const [products, setProducts] = useState([]);

  // Calculate the total price
  const calculateTotalPrice = () => {
    const subtotal = products.reduce((total, product) => total + product.price, 0);
    const shippingPrice = selectedShipping === "inside" ? 65 : 110;
    return subtotal + shippingPrice;
  };
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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Checkout </h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
             <li>Setting</li>
            <li><IoIosArrowForward/></li>
            <li>Checkout </li>
          </ul>
        </div>
        <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
            <BiImport className='text-[25px]'/>
            Import
        </button>
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
                 <div className="text-brand_color text-center sm:text-left">
                   <span className="text-2xl sm:text-3xl font-bold">02</span> CHECKOUT DETAILS
                   <p className="text-xs sm:text-sm">Checkout Your Items List</p>
                 </div>
                 <div className="text-gray-300 text-center sm:text-left">
                   <span className="text-2xl sm:text-3xl font-bold">03</span> ORDER COMPLETE
                   <p className="text-xs sm:text-sm">Review Your Order</p>
                 </div>
               </div>
             </div>
         <div className="w-full font-jost p-4 grid pt-[50px] grid-cols-1 font-baji md:grid-cols-2 gap-8">
           {/* Left Section - Delivery Details */}
           <div>
          
             <h2 className="text-2xl font-bold mb-4">Delivery</h2>
       
             <div className="grid grid-cols-2 gap-4">
               <input type="text" placeholder="First name"className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"               />
               <input type="text" placeholder="Last name"className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
 />
             </div>
             <div className='mt-[10px]'>
              <input
                type="text"
                placeholder="Email"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                />
            </div>
            <div className='mt-[10px]'>
              <input
                type="text"
                placeholder="Company"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                />
            </div>
            <div className='mt-[10px]'>
              <input
                type="text"
                placeholder="Phone"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-[10px]">
            <textarea placeholder="Address Line1"className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px]  border-[1px] border-[#eee] p-[12px]"></textarea>
            <textarea placeholder="Address Line2"className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px]  border-[1px] border-[#eee] p-[12px]"></textarea>

             </div>
             <div className="grid grid-cols-2 gap-4 mt-[10px]">
               <input type="text" placeholder="City"className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"               />
               <input type="text" placeholder="Post Code / Zip"className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
 />
             </div>
             <div className="grid grid-cols-2 gap-4 mt-[10px]">
               <input type="text" placeholder="State / Country"className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"               />
               <input type="text" placeholder="Country / Region"className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
 />
             </div>
             <div className="flex items-center space-x-2 mb-4 mt-[10px]">
               <input type="checkbox" id="save-info" />
               <label htmlFor="save-info">Save this information for next time</label>
             </div>
     
     
     
             <div className="w-full mt-6 p-4 border bg-white rounded-md">
      <h2 className="text-xl font-semibold">Payment Methods</h2>
      <p className="text-sm text-gray-600 mt-1 mb-4">All transactions are secure and encrypted.</p>

      {/* Payment Method Options */}
      <div className=" rounded-md divide-y">
        {/* PayPal Option */}
        <label
          className={`flex items-start p-4 gap-3 cursor-pointer bg-gray-100 ${
            paymentMethod === "paypal" ? "bg-gray-50" : ""
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
            className="mt-1"
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2">
              <span className="text-md font-semibold">PayPal</span>
              <FaCcPaypal className="text-2xl text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.
            </p>
          </div>
        </label>

        {/* Credit/Debit Card Option */}
        <label
          className={`flex items-center p-4 gap-3 cursor-pointer ${
            paymentMethod === "card" ? "bg-gray-50" : ""
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
            className="mt-1"
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2">
              <span className="text-md font-semibold">Credit/Debit Cards</span>
              <div className="flex items-center gap-1 mt-1 text-xl text-gray-600">
                <FaCcAmex />
                <FaCcDiscover />
                <FaCcVisa />
                <FaCcMastercard />
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
           </div>
     
           {/* Right Section - Order Summary */}
           <div className="border rounded-md p-6">
             <div>
             <div className="flex items-center gap-4 mb-4">
                   <img  src="https://www.roopban.com/wp-content/uploads/2024/12/Untitled-5-1-450x450.jpg" className="w-16 h-16 rounded-md border-[1px] border-gray-200 p-[10px]" />
                   <div>
                     <p>TIA’M – Pore Minimizing </p>
                   </div>
                 </div>
             </div>
             <div className="flex justify-between mb-4">
               <span>Subtotal - 1 items</span>
               <span className="font-bold">৳1,199.00</span>
             </div>
             <div className="flex justify-between mb-4">
               <span>Discount</span>
               <span className="font-bold">222.00</span>
             </div>
             <div className="flex justify-between mb-4">
               <span>Taxes</span>
               <span className="font-bold">222.00</span>
             </div>
             <hr className="my-4" />
             <div className="flex justify-between text-xl font-bold">
               <span>Total</span>
               <span>3199.00</span>
               {/* -------comment----- */}
             </div>
             <NavLink to="/order-confirmation">
             <button className="w-full bg-brand_color text-white p-3 rounded-md mt-4">Place Order</button>
             </NavLink>
        
           </div>
         </div>
        </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Checkout