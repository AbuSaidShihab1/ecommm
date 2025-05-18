import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPower } from 'react-icons/fi';
import toast,{Toaster} from "react-hot-toast"
import axios from 'axios';
import { useCustomer } from '../../context/CustomerContext';
const Viewcart = () => {
   const navigate=useNavigate();
   const user = JSON.parse(localStorage.getItem("user"));
   const user_info=JSON.parse(localStorage.getItem("user"))
  const { customerData, loadingCustomer, customerError, fetchCustomerInformation,selected_package } = useCustomer();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const planImages = {
    "Free Plan": "https://pngimg.com/d/free_PNG90756.png", 
    "Starter Plan": "https://cdn.prod.website-files.com/62d0341d687fc5fc25e03d0f/645393cdf2d41424c73009d7_48f6c753.png",
    "Advance Plan": "https://designdrop.in/wp-content/uploads/2024/08/Premium-Membership-e1724743933118.png",
    "Premium Plan": "https://designdrop.in/wp-content/uploads/2024/08/Premium-Membership-e1724743933118.png",
  };
  
  useEffect(() => {
    fetchCustomerInformation();
  }, []);
const [profileOpen, setProfileOpen] = useState(false);
const dropdownRef = useRef(null);

// Close dropdown on outside click
useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setProfileOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const [totalMonths, setTotalMonths] = useState(0); // total in months
const [months, setMonths] = useState(1);
const [years, setYears] = useState(0);
const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    if (selected_package) {
      const totalMonths = years * 12 + months;
      const calculatedPrice = totalMonths * selected_package.price;
      setTotalPrice(calculatedPrice);
    }
  }, [months, years, selected_package]);
  const increase = () => {
    if (months < 11) {
      setMonths(months + 1);
    } else {
      setMonths(0);
      setYears(years + 1);
    }
  };
  
  const decrease = () => {
    // Prevent going below total 1 month (0 years and 1 month)
    const totalMonths = years * 12 + months;
    if (totalMonths <= 1) return;
  
    if (months > 0) {
      setMonths(months - 1);
    } else if (years > 0) {
      setYears(years - 1);
      setMonths(11);
    }
  };
  
 

  const [couponCode, setCouponCode] = useState('');
const [discountAmount, setDiscountAmount] = useState(0);
const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.get(`${base_url}/super/admin/coupons`);
      const coupons = response.data.coupons;
  
      const matchedCoupon = coupons.find(
        (coupon) => coupon.couponCode.toLowerCase() === couponCode.toLowerCase()
      );
  
      if (!matchedCoupon) {
        toast.error('Invalid coupon code.');
        return;
      }
  
      // Check if the coupon is active
      if (matchedCoupon.status !== 'Active') {
        toast.error('This coupon is not active.');
        return;
      }
  
      // Check if the current date is within the coupon's validity period
      const currentDate = new Date();
      const startDate = new Date(matchedCoupon.startDate);
      const expiryDate = new Date(matchedCoupon.expiryDate);
  
      if (currentDate < startDate || currentDate > expiryDate) {
        toast.error('This coupon is not valid at this time.');
        return;
      }
  
      // Check if the total price meets the minimum and maximum spend requirements
      if (totalPrice < matchedCoupon.minSpend) {
        toast.error(`Minimum spend for this coupon is ৳${matchedCoupon.minSpend}.`);
        return;
      }
  
      if (totalPrice > matchedCoupon.maxSpend) {
        toast.error(`Maximum spend for this coupon is ৳${matchedCoupon.maxSpend}.`);
        return;
      }
  
      // Calculate discount based on discount type
      let discount = 0;
      if (matchedCoupon.discountType === 'Fixed') {
        discount = matchedCoupon.couponAmount;
      } else if (matchedCoupon.discountType === 'Percentage') {
        discount = (matchedCoupon.couponAmount / 100) * totalPrice;
      }
  
      setDiscountAmount(discount);
      setAppliedCoupon(matchedCoupon);
      toast.success('Coupon applied successfully!');
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast.error('Failed to apply coupon. Please try again.');
    }
  };
  
  const finalPrice = totalPrice - discountAmount;
  useEffect(() => {
    if (selected_package) {
      const totalMonths = years * 12 + months;
      const calculatedPrice = totalMonths * selected_package.price;
      setTotalPrice(calculatedPrice);
  
      // Store in localStorage
      localStorage.setItem('selectedPlan', JSON.stringify({
        name: selected_package?.name,
        totalMonths,
        discount:discountAmount,
        subtotal:calculatedPrice,
        totalPrice:finalPrice 
      }));
    }
  }, [months, years, selected_package,discountAmount]);
    
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <Toaster/>
        {/* ------------------new customer table----------------- */}
        <section className="w-full font-poppins">
        <div className="w-full flex justify-between items-center py-[20px] px-6 relative mb-[40px]">
      {/* Logo */}
      <div>
        <img
          src="https://www.weblasser.com/wp-content/uploads/2021/04/Logo.png"
          alt="Logo"
          className="h-15"
        />
      </div>

      {/* Profile + Dropdown */}
      <div className="relative" ref={dropdownRef}>
      {/* Gradient Border Button */}
      <div className="p-[2px] rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500">
        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-white text-gray-700 font-semibold flex items-center justify-center uppercase"
        >
          {user_info.firstName?.slice(0,1)}
        </button>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-36 bg-white rounded-[5px] shadow-sm border border-gray-200 p-3 z-10"
          >
            <button
              onClick={() => alert('Logging out...')}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <FiPower className="text-lg" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
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
                       <td className="p-2 sm:p-3 ">
  <img
    src="https://pngimg.com/d/free_PNG90756.png"
    alt={selected_package?.name}
    className="w-12 h-12 sm:w-16 sm:h-16  rounded"
  />
  <span className="text-[15px] sm:text-base">{selected_package?.name}</span>
</td>

                             <td className="p-2 sm:p-3">৳ {selected_package?.price}</td>
                             <td className="p-2 sm:p-3">
                             <div className="flex items-center border rounded px-2 py-1 w-40 justify-between">
      <div className="flex items-center text-lg">
        <span className="w-16 text-right text-[14px] text-nowrap">
          {years > 0 && `${years} yr `}
          {months > 0 && `${months} mo`}
          {years === 0 && months === 0 && "0 mo"}
        </span>
      </div>
      <div className="grid grid-rows-2 ml-2 border-l">
        <button
          onClick={increase}
          className="h-4 w-5 flex items-center justify-center text-xs border-b hover:bg-gray-100"
        >
          ▲
        </button>
        <button
          onClick={decrease}
          className="h-4 w-5 flex items-center justify-center text-xs hover:bg-gray-100"
        >
          ▼
        </button>
      </div>
    </div>
   </td>
   
                
                             <td className="p-2 sm:p-3">
                               <span>৳ {totalPrice} </span>
                             </td>
                           </tr>
                       </tbody>
                     </table>
                   </div>
   
                   <div className="flex gap-2 flex-1 mt-[10px]">
  <input
    type="text"
    placeholder="Enter Coupon Code"
    className="border p-2 sm:p-3 flex-1 rounded text-xs sm:text-sm outline-brand_color"
    value={couponCode}
    onChange={(e) => setCouponCode(e.target.value)}
  />
  <button
    className="bg-brand_color text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-[500] text-xs sm:text-[13px]"
    onClick={handleApplyCoupon}
  >
    APPLY COUPON
  </button>
</div>
               </section>
     {/* Cart Totals */}
   
               {/* Cart Totals */}
               <div className="w-full lg:w-[35%] border-[2px] p-4 sm:p-6 rounded shadow-sm bg-gray-50 text-sm sm:text-base">
  <h3 className="font-[500] mb-[30px] sm:mb-[40px] text-lg sm:text-xl">CART TOTALS</h3>
  <p className="flex justify-between text-[16px] lg:text-[17px] font-[500] border-b pb-2 sm:pb-3">
    <span>Subtotal</span> <span>৳ {totalPrice.toFixed(2)}</span>
  </p>
  {appliedCoupon && (
    <p className="flex justify-between text-[16px] lg:text-[17px] font-[500] border-b py-2 sm:pb-3">
      <span>Discount ({appliedCoupon.couponCode})</span> <span>-৳ {discountAmount.toFixed(2)}</span>
    </p>
  )}
  <p className="flex justify-between font-[500] text-lg sm:text-[20px] mt-4">
    <span>Total</span> <span className="text-brand_color font-[600]">৳ {finalPrice.toFixed(2)}</span>
  </p>
  <NavLink to="/confirm-checkout">
    <button className="bg-brand_color text-white w-full mt-4 sm:mt-6 py-2 sm:py-3 text-sm sm:text-[15px] font-[500]">
      PROCEED TO CHECKOUT
    </button>
  </NavLink>
</div>
             </section>
           </div>
         </section>
       </section>
       {/* ------------------------new customer table-------------------- */}
    </section>
  )
}

export default Viewcart