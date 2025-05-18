import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { FaCheck, FaBoxOpen } from 'react-icons/fa';
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserAlt, FaLightbulb, FaRocket, FaCrown } from 'react-icons/fa';
import { FaCamera } from "react-icons/fa";
const Billingupdate = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
  const [activePlanIndex, setActivePlanIndex] = useState(null);
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
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
       <div className='w-full flex justify-between items-center'>
        <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Billing Update</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
             <li>Setting</li>
            <li><IoIosArrowForward/></li>
            <li>Billing Update</li>
          </ul>
        </div>
        <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
            <BiImport className='text-[25px]'/>
            Import
        </button>
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>
  <div className="">

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan, index) => (
        <div
          key={index}
          className="bg-white   p-6 cursor-pointer border border-[#eee] text-center transition transform hover:scale-105 hover:shadow-lg duration-300"
        >
          <div className="text-[22px] lg:text-[42px] text-brand_color mb-4 flex justify-center items-center">
            {plan.icon}
          </div>
          <h2 className="text-xl font-[600] mb-2">{plan.title}</h2>
          <p className="text-gray-500 mb-4">{plan.description}</p>
         <div className='w-full flex justify-center items-center'>
           <ul className="text-left mb-4 space-y-2 ">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center">
                <FaCheck className="text-green-500 mr-2" />
                <span className='text-gray-600'>{feature}</span>
              </li>
            ))}
          </ul>
         </div>
          <p className="font-[600]">Technology:</p>
          <p className="mb-2">{plan.technology}</p>
          <p className="font-[600]">Support:</p>
          <p className="mb-4">{plan.support}</p>
          <div className='border-t-[1px] border-gray-200 py-[15px] flex justify-center items-center gap-[12px]'>
            <h2 className='font-[700] text-[22px]'>৳{plan.price}</h2>
            <h2 className='font-[500] text-gray-600 text-[17px] line-through'>৳{plan.price2}</h2>
          </div>
          <NavLink to="/cart">
          <button
            className={`${
              activePlanIndex === index
                ? "bg-green-500"
                : "bg-brand_color"
            } text-white text-[14px] 2xl:text-[15px] py-2 px-[25px] rounded-[5px]  transition duration-300`}
            onClick={() => setActivePlanIndex(index)}
          >
            {activePlanIndex === index ? "Active" : "Buy Now"}
          </button>
          </NavLink>
        </div>
      ))}
    </div>
    </div>
            {/* -------------------form---------------------- */}
         </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Billingupdate