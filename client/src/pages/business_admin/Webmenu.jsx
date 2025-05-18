import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { GoEye } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { BiFilterAlt } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import Select from "react-tailwindcss-select";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css';
import format from "date-fns/format";
import { addDays } from "date-fns";
const Webmenu = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);

       const [activeSection2, setActiveSection2] = useState(null);

  const toggleSection2 = (section) => {
    setActiveSection2(activeSection2 === section ? null : section);
  };

  const pages = [
    "Wishlist", "Affiliate", "Career", "Privacy Policy", "Return Policy", "Contact Us"
  ];
  const [activeTab, setActiveTab] = useState("recent");
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  const mostRecent = pages.slice(0, 3);
  const viewAll = pages;
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
 <section className='w-[100%] m-auto py-[20px]  xl:py-[40px] px-[20px] lg:px-[30px]'>
     <div className='w-full flex md:justify-between items-center  md:flex-row flex-col justify-start'>
        <div className='w-full md:w-auto'>
              <h1 className='text-[20px] font-[600] mb-[8px]'>Web Menus</h1>
          <ul className='w-full   md:w-auto flex lg:justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Appearance</li>
            <li><IoIosArrowForward/></li>
            <li>Web Menus</li>
          </ul>
        </div>
        {/* -------------------table------------------- */}

       </div>
       {/* -------------notice-------------------------- */}
       <div className='w-full bg-gray-50 border-[1px] border-l-[3px] border-l-brand_color border-[#eee] px-[20px] py-[10px] mt-[20px]'>
        <p className='text-[14px] 2xl:text-[15px]'>Edit your menu below, or <span className='text-brand_color underline'>create a new menu</span>. Do not forget to save your changes!</p>
       </div>
       {/* ------------------new customer table----------------- */}
<section className='mt-[2px] lg:mt-[20px] '>
<div className="flex w-full gap-6 lg:flex-row flex-col">
  {/* Left Section: Add Menu Items */}
  <div className="w-full lg:w-1/3 ">
    <h2 className="text-lg font-semibold mb-4">Add menu items</h2>
    <div className="mb-6 border border-gray-200">
      <div className="flex border-b">
        <button 
          className={`w-1/2 py-2 text-center ${activeTab === "recent" ? "bg-white border-b-2 border-brand_color" : "bg-gray-100"}`} 
          onClick={() => setActiveTab("recent")}
        >
          Most Recent
        </button>
        <button 
          className={`w-1/2 py-2 text-center ${activeTab === "all" ? "bg-white border-b-2 border-brand_color" : "bg-gray-100"}`} 
          onClick={() => setActiveTab("all")}
        >
          View All
        </button>
      </div>
      
      <ul className="space-y-3 max-h-60 overflow-y-auto px-4 py-4">
        {(activeTab === "recent" ? mostRecent : viewAll).map((page, index) => (
          <li key={index}>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm">{page}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className='flex justify-between items-center px-4 py-3 border-t border-gray-200'>
        <label className='flex items-center space-x-2 cursor-pointer'>
          <input type="checkbox" className='w-4 h-4' />
          <span className='text-sm text-gray-600'>Select All</span>
        </label>
        <button className="px-4 py-2 border border-brand_color text-brand_color text-sm rounded">Add to Menu</button>
      </div>
      <div className="w-full bg-gray-100">
        {/* Posts Dropdown with Tabs */}
        <div className="border-b border-gray-300">
          {/* <button
            className="flex justify-between items-center w-full px-4 py-3 text-sm font-medium bg-white hover:bg-gray-50"
            onClick={() => toggleSection("posts")}
          >
            <span>Posts</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${activeSection === "posts" ? "rotate-180" : "rotate-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button> */}
          {activeSection === "posts" && (
            <div className="px-4 py-3 space-y-2 bg-gray-50 text-sm">
              <button className="w-full text-left">Most Recent Post</button>
              <button className="w-full text-left">View All Posts</button>
            </div>
          )}
        </div>
        
        {/* Custom Links Section */}
        <div className="border-b ">
          <button
            className="flex justify-between items-center w-full px-4 py-3 text-sm font-medium bg-white"
            onClick={() => toggleSection("customLinks")}
          >
            <span>Custom Links</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${activeSection === "customLinks" ? "rotate-180" : "rotate-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {activeSection === "customLinks" && (
            <div className="px-4 py-3 space-y-2 bg-white text-sm">
              <input type="text" placeholder="Link Text" className="w-full p-2 border border-gray-300 rounded mb-2" />
              <input type="url" placeholder="URL" className="w-full p-2 border border-gray-300 rounded mb-2" />
                <div className='flex justify-end items-center'>
                     <button               className="px-3 py-2 bg-brand_color text-white rounded-[5px] text-sm hover:bg-brand_color"                     >Add to Menu</button>
                </div>
            </div>
          )}
        </div>

    </div>
    </div>

  </div>
  {/* Right Section: Menu Structure */}
  <div className="w-full lg:w-2/3">
    <h2 className="text-lg font-semibold mb-4 ">Menu Structure</h2>
   <div className='border-[1px] border-[#eee]'>
     <div className="mb-4 text-[15px] lg:text-[17px] font-medium bg-[whitesmoke] px-[20px] py-[4px] flex justify-start items-center gap-[10px]">
      <label htmlFor="menu-name" className="block text-sm font-medium  text-nowrap ">Menu Name</label>
      <input id="menu-name" type="text" placeholder="Customer Care"   className="border p-2 h-[33px] 2xl:h-[39px] rounded text-[12px] outline-brand_color 2xl:text-[13px] font-[500] w-[40%] my-[4px]" />
    </div>
    <p className='px-[20px] text-[14px]'>Give your menu a name, then click Create Menu.</p>
    {/* <div className='px-[15px] mb-[20px]'>
        <h2 className='text-[15px] text-neutral-600 mb-[10px]'>Drag the items into the order you prefer.click the arrow one the right</h2>
      <div className='flex justify-start items-center gap-[5px] bg-[whitesmoke] w-auto lg:w-[20%] py-[12px]  border-[1px] border-[#eee] rounded-[5px] px-[10px]'>
            <input type="checkbox" className='w-[18px] h-[18px] cursor-pointer text-neutral-500' name="" id="" />
            <label htmlFor="" className=' text-neutral-500 text-[15px]'>Bulk Select</label>
        </div>
    </div> */}
     {/* <div className="w-full bg-white px-[15px]">
      <div className="border-[1px] mb-[10px] border-gray-300  ">
        <button
          className="flex justify-between items-center w-full px-[15px] py-3 text-sm font-medium bg-[whitesmoke] hover:bg-gray-50"
          onClick={() => toggleSection2("posts")}
        >
          <span>Customer Services</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              activeSection2 === "posts" ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {activeSection2 === "posts" && (
          <div className="px-4 py-3 space-y-2 bg-gray-50 text-sm">
            <p>Post Option 1</p>
            <p>Post Option 2</p>
          </div>
        )}
      </div>

      <div className="border-[1px] mb-[10px] border-gray-300 ">
        <button
          className="flex justify-between items-center w-full px-4 py-3 text-sm font-medium bg-[whitesmoke] hover:bg-gray-50"
          onClick={() => toggleSection2("customLinks")}
        >
          <span>Privacy Plocy</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              activeSection2 === "customLinks" ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {activeSection2 === "customLinks" && (
          <div className="px-4 py-3 space-y-2 bg-gray-50 text-sm">
            <p>Custom Link 1</p>
            <p>Custom Link 2</p>
          </div>
        )}
      </div>

      <div className="border-[1px] mb-[10px] border-gray-300">
        <button
          className="flex justify-between items-center w-full px-4 py-3 text-sm font-medium  bg-[whitesmoke] hover:bg-gray-50"
          onClick={() => toggleSection2("categories")}
        >
          <span>Terms & Condition</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              activeSection2 === "categories" ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {activeSection2 === "categories" && (
          <div className="px-4 py-3 space-y-2 bg-gray-50 text-sm">
            <p>Category 1</p>
            <p>Category 2</p>
          </div>
        )}
      </div>

      <div className='border-[1px] mb-[10px] border-gray-300'>
        <button
          className="flex justify-between items-center w-full px-4 py-3 text-sm font-medium bg-[whitesmoke] hover:bg-gray-50"
          onClick={() => toggleSection2("wooCommerce")}
        >
          <span>Best Seller</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              activeSection2 === "wooCommerce" ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {activeSection2 === "wooCommerce" && (
          <div className="px-4 py-3 space-y-2 bg-gray-50 text-sm">
            <p>Endpoint 1</p>
            <p>Endpoint 2</p>
          </div>
        )}
      </div>
    </div> */}
<div className="mt-6 border-t pt-4 px-[15px] pb-[20px]">
  <h3 className="text-sm font-semibold mb-3">Menu Settings</h3>
  <div className="space-y-3">
    <div>
      <label className="flex items-center space-x-2">
        <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
        <span className="text-sm">Automatically add new top-level pages to this menu</span>
      </label>
    </div>
    <div>
      <h4 className="text-sm font-medium mb-2">Display location</h4>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
          <span className="text-sm">Main Menu <span className="text-gray-400">(Currently set to Main Menu)</span></span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
          <span className="text-sm">Vertical Menu <span className="text-gray-400">(Currently set to Vertical Menu)</span></span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
          <span className="text-sm">Top Menu - Only show level 1</span>
        </label>
      </div>
    </div>
  </div>
</div>
  <div className="mt-6 flex justify-start px-[15px] space-x-3 py-[10px] bg-[whitesmoke] border-t-[1px] border-[#eee]">
    <button className="text-sm text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-100">Delete Menu</button>
    <button className="text-sm bg-brand_color text-white px-4 py-2 rounded hover:bg-orange-600">Create Menu</button>
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

export default Webmenu