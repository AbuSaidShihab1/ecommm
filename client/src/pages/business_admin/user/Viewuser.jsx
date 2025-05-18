import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/Business_dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
const Viewuser = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const [showmodal,setmodal]=useState(false);
       const [isCustomUserEnabled, setIsCustomUserEnabled] = useState(false);
     const uploadpost=()=>{
                setmodal(true)
     }
    function handlesidebar(){
        setactivesidebar(!activesidebar)
    }

      const handleCustomUserCheckbox = () => {
    setIsCustomUserEnabled(!isCustomUserEnabled);
  };
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
// ------------image upload popup------
 const [activeTab, setActiveTab] = useState("library"); // 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]); // List of uploaded images
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [searchTerm2, setSearchTerm2] = useState("");
   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
   const user_access_data = [
    { id: 1, name: "Administration" },
    { id: 2, name: "Sales Manager" },
    { id: 3, name: "Marketing Manager" },
  ];
  // Toggle popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages((prev) => [...prev, { id: Date.now(), title: `Image ${prev.length + 1}`, src: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Select image from popup
  const selectImage = (image) => {
    setProfileImage(image.src); // Set the selected image as the profile image
    setIsPopupOpen(false); // Close the popup
  };

  // Filter images based on the search term
  const filteredImages = uploadedImages.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCustomUserAccess = () => {
    setIsCustomUserEnabled(!isCustomUserEnabled);
  };
  // Handle input changes for suggestions
  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm2(input);

    if (input) {
      const suggestions = user_access_data.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Handle suggestion selection

  const handleSuggestionClick = (name) => {
    setSearchTerm2(name);
    setFilteredSuggestions([]);
  };
// --------------------access checkbox----------
  const [checked, setChecked] = useState(
    new Array(20).fill(false).map(() => new Array(7).fill(false)) // Initial state for each checkbox in the table
  );

  const handleRowCheck = (rowIdx, checkedValue) => {
    const updatedChecked = [...checked];
    updatedChecked[rowIdx] = updatedChecked[rowIdx].map(() => checkedValue);
    setChecked(updatedChecked);
  };

  const handleSelectAllChange = (rowIdx) => {
    const updatedChecked = [...checked];
    const allChecked = updatedChecked[rowIdx].every((checkbox) => checkbox);
    updatedChecked[rowIdx] = updatedChecked[rowIdx].map(() => !allChecked);
    setChecked(updatedChecked);
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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Zobaer Ahammed</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
             <li>Users</li>
            <li><IoIosArrowForward/></li>
            <li>Zobaer Ahammed</li>
          </ul>
        </div>
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>

            {/* -------------------form---------------------- */}
                  <form action=""className='pt-[15px] lg:pt-[20px]'>
                  
    <div className="relative w-40 h-40 mb-[30px]">
      {/* Profile Image Section */}
      <div className="w-full h-full rounded-[10px] overflow-hidden border-2 border-gray-300">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
            <span className="text-sm">Upload Image</span>
          </div>
        )}
      </div>


    </div>

                  
                    <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col'>
                        
                        <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">First Name</label>
                            <input type="text"placeholder='First Name'value="Zobaer"readOnly className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                         <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Last Name </label>
                            <input type="text"placeholder='Last Name'value="Ahammed" readOnly className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                    </div>
                               <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]  '>
                        <div className='w-[100%]'>
                            <label htmlFor=""  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"> Designation</label>
                            <input type="text"placeholder=' Designation'value="Marketer" readOnly className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                 
                    </div>
                         <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] '>
                          <div className='w-[100%]'>
                            <label htmlFor=""  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Username </label>
                            <input type="text"placeholder='Username'value="zobaerahammed" readOnly className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                 
                 
                    </div>
                         <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] '>
                          <div className='w-[100%]'>
                            <label htmlFor=""  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Email</label>
                            <input type="Email"placeholder='Email'value="zobaerahammed@gmail.com" readOnly className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                 
                 
                    </div>
                         <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] '>
                          <div className='w-[100%]'>
                            <label htmlFor=""  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Phone</label>
                            <input type="number"placeholder='Phone'value="01838304000" readOnly className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                 
                 
                    </div>
   
                       <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]  lg:flex-row flex-col'>
                     
                         <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Password</label>
                            <input type="password"placeholder='Password'value="434234234234" readOnly className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                        <div className='w-[100%] lg:w-[50%]'>
                            <label htmlFor=""  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"> Confirm Password</label>
                            <input type="password"placeholder='Confirm Password'value="434234234234" readOnly className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                    </div>
                  
              {/* User Access */}
  <div>


      {/* User Access Input */}
      <div className="mb-4 relative">
        <label   className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
          User Access 
        </label>
        <input
          type="text"
          placeholder="User Access"
          value="Administration"
          className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] px-[10px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]${
            isCustomUserEnabled ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        />

        {/* Suggestions Dropdown */}
        {!isCustomUserEnabled && filteredSuggestions.length > 0 && (
          <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
            {filteredSuggestions.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSuggestionClick(item.name)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
            {/* Checkbox for enabling Custom User Access */}
      <div className="mt-4 ">
        <label className="inline-flex items-center text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
          <input
            type="checkbox"
            className="mr-2"
            checked={isCustomUserEnabled}
            onChange={toggleCustomUserAccess}
          />
          Enable Custom User Access
        </label>

        {/* Custom User Access Input */}
        {isCustomUserEnabled && (
         <div>
             {/* Table Section */}
      {/* Table Section */}
         {/* Table Section */}
          {/* Table Section */}
<div className="overflow-x-auto ">
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
        )}
      </div>
    </div>
   

      {/* Custom User Input */}
         <div className="">

      {/* Custom User Access Section */}
      {/* <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isCustomUserEnabled}
            onChange={toggleCustomUserAccess}
          />
          Enable Custom User Access
        </label>

        {isCustomUserEnabled && (
          <div className="mt-4 mb-[20px] ">
            <label className="block text-sm font-medium mb-2">
              Custom User Access
            </label>
         <input type="text"placeholder='Custom User Access'className='w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]'/>
          </div>
        )}
      </div> */}
    </div>
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

export default Viewuser