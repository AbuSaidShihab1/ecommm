import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
const Bnewuserrole = () => {
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
  //  ----------handle image 
   const [profileImage, setProfileImage] = useState(
    "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
  );

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>New User Role</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
             <li>Users</li>
            <li><IoIosArrowForward/></li>
            <li>New User Role</li>
          </ul>
        </div>
        <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
            <BiImport className='text-[25px]'/>
            Import
        </button>
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>
  
            {/* -------------------form---------------------- */}
            <form action="" className="pt-[20px]">
      {/* Role Name */}
      <div className="w-[100%] mb-[10px]">
        <label
          htmlFor="roleName"
          className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
        >
        Name
        </label>
        <input
          id="roleName"
          type="text"
          placeholder="Enter name"
          className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        />
      </div>

      {/* Description */}
      <div className="w-[100%] mb-[20px]">
        <label
          htmlFor="description"
         className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="Enter description"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        />
      </div>

      {/* Select User Access */}
      <div className="w-[100%] mb-[20px] ">
        <label
          htmlFor="userAccess"
 className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
        >
          Select User Access
        </label>
                     {/* Table Section */}
<div className="overflow-x-auto">
  <table className="min-w-full border-collapse border border-gray-300 text-sm text-center">
    {/* Table Header */}
    <thead className='uppercase'>
      <tr>
        <th className="border border-gray-300 p-2 text-white bg-[#22C55E]">Module</th>
        <th colSpan={1} className="border border-gray-300 p-2 bg-blue-500 text-white">
          AUTO
        </th>
        <th colSpan={3} className="border border-gray-300 p-2 bg-orange-500 text-white">
          OWN DATA
        </th>
        <th colSpan={3} className="border border-gray-300 p-2 bg-red-500 text-white">
          OTHER USER DATA
        </th>
      </tr>
      <tr className="bg-gray-200 ">
        <th className="border border-gray-300 p-2 ">View List</th>
        <th className="border border-gray-300 p-2">Select All</th>
        <th className="border border-gray-300 p-2">View</th>
        <th className="border border-gray-300 p-2">Edit</th>
        <th className="border border-gray-300 p-2">Delete</th>
        <th className="border border-gray-300 p-2">View</th>
        <th className="border border-gray-300 p-2">Edit</th>
        <th className="border border-gray-300 p-2">Delete</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {[
  {
    section: "Dashboard",
    modules: ["Dashboard"],
  },
  {
    section: "Pages",
    modules: ["New Page", "Page List"],
  },
  {
    section: "Contents",
    modules: [
      "New Post",
      "Post List",
      "New Post Category",
      "Post Category List",
      "New Post Tag",
      "Post Tag List",
      "Edit Post Comment",
      "Post Comment List"
    ],
  },
  {
    section: "Products",
    modules: [
      "New Product",
      "Product List",
      "New Category",
      "Category List",
      "New Tag",
      "Tag List",
      "New Brand",
      "Brand List",
      "Edit Review",
      "Review List",
      "New Coupon",
      "Coupon List",
      "New Order",
      "Order List",
      "New Delivery",
      "Delivery List",
      "New Customer",
      "Customer List",
      "Setting"
    ],
  },
  {
    section: "Upload Library",
    modules: ["New Library", "All Library"],
  },
  {
    section: "Appearance",
    modules: [
      "Themes",
      "Web Menus",
      "Required Plugins",
      "Install Plugins"
    ],
  },
  {
    section: "Settings",
    modules: [
      "Web Setting",
      "Billing Update",
      "Payment Transfer",
      "App Integration"
    ],
  },
  {
    section: "Users",
    modules: [
      "New User",
      "User List",
      "New User Role",
      "User Role List"
    ],
  },
  {
    section: "Support Ticket",
    modules: ["New Ticket", "Ticket List"],
  }
]
.map((sectionData, sectionIdx) => (
        <>
          <tr key={sectionIdx} className="bg-gray-100 font-bold">
            <td className="border border-gray-300 p-2 text-left" colSpan={8}>
              {sectionData.section}
            </td>
          </tr>
          {sectionData.modules.map((module, idx) => (
            <tr key={idx}>
              <td className="border text-left border-gray-300 p-2">{module}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const row = e.target.closest("tr");
                    row
                      .querySelectorAll("input[type=checkbox]")
                      .forEach((checkbox) => {
                        checkbox.checked = e.target.checked;
                      });
                  }}
                />
              </td>
              {[...Array(6)].map((_, colIdx) => (
                <td key={colIdx} className="border border-gray-300 p-2">
                  <input type="checkbox" defaultChecked={false} />
                </td>
              ))}
            </tr>
          ))}
        </>
      ))}
    </tbody>
  </table>
</div>
</div>


      {/* Buttons */}
           <div className='flex justify-end items-center gap-[10px] mt-[30px]'>
                         <button className='px-[30px] py-[8px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'><LuSaveAll className='text-[18px]'/>Draft</button>
                                                                            <button className='px-[30px] py-[8px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center border-[2px] border-brand_color items-center rounded-[5px] cursor-pointer'>Submit</button>
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

export default Bnewuserrole