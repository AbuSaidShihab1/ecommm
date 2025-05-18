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
import { FiPlus } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FiChevronUp } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";

const Bnewcustomer = () => {
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
   // ------------image upload popup------
   const [isVisible, setIsVisible] = useState(true);
     const [websiteIcon, setWebsiteIcon] = useState(""); // State for website icon
     const [tab, setTab] = useState("library"); // Active tab for media library/upload
     const [popupOpen, setPopupOpen] = useState(false); // State to handle popup visibility
     const [imageList, setImageList] = useState([]); // List of uploaded images
     const [searchQuery, setSearchQuery] = useState(""); // Search term for image search
     const [filteredImageList, setFilteredImageList] = useState([]); // Filtered images based on search term
   
      const [profileImage, setProfileImage] = useState(
       "https://i.ibb.co.com/HBsfNMb/avatar.jpg"
     );
   
    const [activeTab, setActiveTab] = useState("library"); // 
       const [isPopupOpen, setIsPopupOpen] = useState(false);
     const [uploadedImages, setUploadedImages] = useState([]); // List of uploaded images
     const [searchTerm, setSearchTerm] = useState(""); // Search term
     const [searchTerm2, setSearchTerm2] = useState("");
      const [filteredSuggestions, setFilteredSuggestions] = useState([]);
   
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
      // Toggle the visibility of the popup
  const togglePopupVisibility = () => {
    setPopupOpen(!popupOpen);
  };

  // Handle file upload (website icon in this case)
  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageList((prev) => [
          ...prev,
          { id: Date.now(), title: `Image ${prev.length + 1}`, src: reader.result },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Select image as website icon
  const chooseImageAsIcon = (image) => {
    setWebsiteIcon(image.src); // Set the selected image as the website icon
    setPopupOpen(false); // Close the popup
  };

  // Filter images based on the search term
  const filterImages = imageList.filter((image) =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // ---------------------
  //  ----------handle image 

  
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
     const user_access_data = [
      { id: 1, name: "Administration" },
      { id: 2, name: "Sales Manager" },
      { id: 3, name: "Marketing Manager" },
    ];


  
    // Filter images based on the search term
   
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
    // -=-----------------------------multi email and phone add-----------------------
    const [emails, setEmails] = useState([""]);
    const [phones, setPhones] = useState([""]);
    const [mobiles, setMobiles] = useState([""]);
  
    const addNewField = (setFields, fields) => {
      setFields([...fields, ""]);
    };
  
    const removeField = (index, setFields, fields) => {
      const updatedFields = fields.filter((_, i) => i !== index);
      setFields(updatedFields);
    };
  
    const updateFieldValue = (index, value, setFields, fields) => {
      const updatedFields = fields.map((field, i) =>
        i === index ? value : field
      );
      setFields(updatedFields);
    };
  
    const renderFieldGroup = (label, fields, setFields) => (
      <div>
        <label  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">{label}</label>
        {fields.map((field, index) => (
          <div className="flex items-center space-x-2 mb-2" key={index}>
            <input
              type="text"
              value={field}
              onChange={(e) =>
                updateFieldValue(index, e.target.value, setFields, fields)
              }
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(index, setFields, fields)}
                className="text-red-500 mt-[8px] h-input_height 2xl:h-[45px] flex justify-center items-center px-[6px] 2xl:px-[10px] text-[17px] 2xl:text-[24px] hover:text-red-700"
              >
                <IoClose/>
              </button>
            )}
            {index === fields.length - 1 && (
              <button
                type="button"
                onClick={() => addNewField(setFields, fields)}
                className="px-[10px] 2xl:px-[20px] h-input_height 2xl:h-[45px] flex justify-center mt-[8px] bg-brand_color rounded-[5px] text-white items-center hover:text-blue-700"
              >
                <FiPlus  className='text-[22px]'/>
              </button>
            )}
          </div>
        ))}
      </div>
    );
  // -----------------------------
  const [sellType, setSellType] = useState("");
  const [customerType, setCustomerType] = useState("");

  const sellTypeColors = {
    Retailer: "bg-blue-100",
    Wholesaler: "bg-green-100",
    Dealer: "bg-yellow-100",
  };

  const customerTypeColors = {
    Individual: "bg-purple-100",
    Business: "bg-orange-100",
  };
  const [isShippingVisible, setIsShippingVisible] = useState(true);
  const [isBillingVisible, setIsBillingVisible] = useState(true);
  const [isContactVisible, setIsContactVisible] = useState(true);
  const CustomDropdown = ({ label, options, selectedOption, setSelectedOption, customColors }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative w-full">
        <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">{label}</label>
        <div
          className={`w-full mt-[8px] h-input_height 2xl:h-[45px] flex items-center justify-between rounded-[5px] border-[1px] border-[#eee] p-[15px] cursor-pointer ${
            customColors[selectedOption] || "bg-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
            {selectedOption || `Select ${label}`}
          </span>
          <FiChevronDown className="text-gray-500" />
        </div>
        {isOpen && (
          <ul className="absolute z-10 mt-[4px] w-full bg-white border-[1px] border-[#eee] rounded-[5px] shadow-lg">
            {options.map((option, index) => (
              <li
                key={index}
                className="p-[10px] text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
// --------------------company-name------------------
const [companyList, setCompanyList] = useState([""]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleAddCompany = () => {
    setCompanyList([...companyList, ""]);
  };

  const handleUpdateCompany = (index, value) => {
    const updatedList = [...companyList];
    updatedList[index] = value;
    setCompanyList(updatedList);
  };

  const handleRemoveCompany = (index) => {
    if (companyList.length > 1) {
      setCompanyList(companyList.filter((_, i) => i !== index));
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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>New Product Customer</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[13px] lg:text-[14px]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Products</li>
            <li><IoIosArrowForward/></li>
            <li>New Customer</li>
          </ul>
        </div>
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>
            {/* -------------------form---------------------- */}
<form action="" className="pt-[15px] lg:pt-[20px]">
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
  
        {/* Camera Icon Button */}
        <label
          htmlFor="profileImageInput"
          onClick={togglePopup}
          className="absolute bottom-1 right-2 bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
        >
          <FaCamera className="w-4 h-4" />
        </label>
  
        {/* Popup */}
  {  isPopupOpen && (
        <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-300">
              <h2 className="text-lg font-semibold">Upload Images </h2>
              <button
                onClick={togglePopup}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
  
            {/* Tabs */}
            <div className="flex border-b  border-gray-300">
                  <div
                onClick={() => setActiveTab("library")}
                className={`w-1/2 py-2 text-center ${
                  activeTab === "library"
                    ? "border-b-2 border-brand_color text-brand_color font-semibold"
                    : "text-gray-600 hover:text-brand_color"
                }`}
              >
                Media Library
              </div>
              <div
                onClick={() => setActiveTab("upload")}
                className={`w-1/2 py-2 text-center ${
                  activeTab === "upload"
                    ? "border-b-2 border-brand_color text-brand_color font-semibold"
                    : "text-gray-600 hover:text-brand_color"
                }`}
              >
                Upload New
              </div>
          
            </div>
  
            {/* Content */}
            <div className="p-4">
              {activeTab === "upload" && (
                <div>
                  {/* Upload New File */}
                  <div className="w-full flex h-[150px] justify-between items-center lg:flex-row flex-col gap-[10px]">
                    <div className="w-full lg:w-auto">
                      <input
                        type="file"
                        id="fileUpload"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <label
                        htmlFor="fileUpload"
                        className="block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center transition-all duration-300 ease-in-out"
                      >
                        Upload New 
                      </label>
                    </div>
                  </div>
                </div>
              )}
  
              {activeTab === "library" && (
                <div>
                  {/* Search Box for Media Library */}
                  <div className="mb-6 flex justify-end">
                    <input
                      type="text"
                      placeholder="Search by name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-[80%] lg:w-[50%] border rounded px-4 py-2 text-sm border-gray-300 focus:outline-none focus:ring focus:ring-orange-200"
                    />
                  </div>
  
                  {/* Uploaded Images */}
                  <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[10px]">
                    {filteredImages.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="border rounded cursor-pointer w-[200px] h-[200px]"
                          onClick={() => selectImage(image)}
                        />
                        <span className="absolute bottom-1 left-1 text-xs bg-gray-800 text-white px-1 rounded">
                          {image.title}
                        </span>
                      </div>
                    ))}
                    {filteredImages.length === 0 && (
                      <div className="col-span-full h-[150px] text-center flex justify-center items-center text-gray-500">
                        No images found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
  
            {/* Footer */}
            {/* <div className="p-4 border-t border-gray-300">
              <button
                onClick={togglePopup}
                className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-2 rounded-lg hover:shadow-md"
              >
                Save File
              </button>
            </div> */}
          </div>
        </div>
      )
    }
  
      </div>
      <div className="w-[100%] mb-[15px]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Customer ID
      </label>
      <input
        type="text"
        placeholder="Customer ID"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
  <div className="w-full flex gap-[30px] mb-[20px] lg:flex-row flex-col">
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        First Name
      </label>
      <input
        type="text"
        placeholder="First Name"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Last Name
      </label>
      <input
        type="text"
        placeholder="Last Name"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
  </div>
  <div className="w-full">
      {renderFieldGroup("E-Mail Address", emails, setEmails)}
      {renderFieldGroup("Mobile Number", phones, setPhones)}
      {renderFieldGroup("Phone Number", mobiles, setMobiles)}
    </div>

       <div className="w-[100%] mb-[15px]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Fax Number
      </label>
      <input
        type="number"
        placeholder="Fax Number"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-full mb-[15px]">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Company Name
      </label>

      {companyList.map((company, index) => (
        <div className="flex items-center space-x-2 mt-2" key={index}>
          <input
            type="text"
            value={company}
            onChange={(e) => handleUpdateCompany(index, e.target.value)}
            placeholder="Company Name"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
          />


          {companyList.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveCompany(index)}
              className="text-red-500 h-input_height 2xl:h-[45px] flex justify-center items-center px-[6px] 2xl:px-[10px] text-[17px] 2xl:text-[24px] hover:text-red-700"
            >
              <IoClose />
            </button>
          )}

          {index === companyList.length - 1 && (
            <>
           
          <div className="relative w-32 ml-2">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex cursor-pointer  justify-between items-center px-4 py-2 rounded-md bg-gray-200 text-gray-600"
            >
              {selectedLanguage} <IoChevronDown />
            </div>
            {isDropdownOpen && (
              <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
                <div
                  onClick={() => { setSelectedLanguage("English"); setIsDropdownOpen(false); }}
                  className="w-full text-left cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  English
                </div>
                <div
                  onClick={() => { setSelectedLanguage("Bangla"); setIsDropdownOpen(false); }}
                  className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100"
                >
                  Bangla
                </div>
              </div>
            )}
          </div> 
          <button
              type="button"
              onClick={handleAddCompany}
              className="px-[10px] 2xl:px-[20px] h-input_height 2xl:h-[45px] flex justify-center bg-brand_color rounded-[5px] text-white items-center hover:bg-orange-500"
            >
              <FiPlus className="text-[22px]" />
            </button>
            </>
         
          )}
        </div>
      ))}
    </div>
             <div className="w-[100%] mb-[10px] lg:mb-[20px]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Designation
      </label>
      <input
        type="text"
        placeholder="Designation"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col">
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Department
      </label>
      <input
        type="text"
        placeholder="Department"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Industry
      </label>
      <input
        type="text"
        placeholder="Industry "
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
  </div>
  
  <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col">
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Tax Number
      </label>
      <input
        type="text"
        placeholder="Tax Number"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        GST Number
      </label>
      <input
        type="text"
        placeholder="GST Number"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
  </div>

  <div className="w-full mb-[10px] lg:mb-[20px]">
    <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      Address
    </label>
    <textarea
      placeholder="Address"
   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[60px] 2xl:h-[80px] border-[1px] border-[#eee] p-[12px]"
    ></textarea>
  </div>
      <div className='  mb-[15px] flex justify-center gap-[10px] lg:gap-[30px] lg:flex-row flex-col'>
      <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        City
      </label>
      <input
        type="text"
        placeholder="City"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-[100%] lg:w-[50%] ">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      Postcode / ZIP 
      </label>
      <input
        type="text"
        placeholder="Postcode / ZIP"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
      </div>
  <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col">
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      State / County
      </label>
      <input
        type="text"
        placeholder="State / County"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      County / Region
      </label>
      <input
        type="text"
        placeholder="County"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
  </div>

  {/* ------------------------sell type------------------- */}
  <div className="w-full flex flex-col gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row">
      {/* Sell Type */}
      <div className="w-[100%] lg:w-[50%]">
        <CustomDropdown
          label="Sell Type"
          options={["Retailer", "Wholesaler", "Dealer"]}
          selectedOption={sellType}
          setSelectedOption={setSellType}
          customColors={sellTypeColors}
        />
      </div>

      {/* Customer Type */}
      <div className="w-[100%] lg:w-[50%]">
        <CustomDropdown
          label="Customer Type"
          options={["Individual", "Business"]}
          selectedOption={customerType}
          setSelectedOption={setCustomerType}
          customColors={customerTypeColors}
        />
      </div>
    </div>
  {/* ------------------------sell type------------------- */}

  <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col">
    <div className="w-[100%] ">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Previous Due
      </label>
      <input
        type="text"
        placeholder="Previous Due"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
  </div>
  <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col">
  <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Payment Terms
      </label>
      <input
        type="text"
        placeholder="Payment Terms"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
       Website 
      </label>
      <input
        type="text"
        placeholder="Website "
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
 
  </div>


  <div className="w-full border mb-[15px] border-brand_color rounded-lg shadow-sm">
      {/* Header Section with Toggle */}
      <div
        className={isContactVisible ? "flex w-full justify-between border-b-[1px] border-gray-300 p-4 py-[14px] items-center cursor-pointer":"flex w-full justify-between  p-4 py-[14px] items-center cursor-pointer"}
        onClick={() => setIsContactVisible(!isContactVisible)}
      >
        <h2 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600">Alternative Contact</h2>
        <div className="text-gray-500 p-[6px] 2xl:p-[10px] bg-[#E4E4E4] rounded-full" aria-label="Toggle visibility">
          {isContactVisible ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>

      {/* Form Section */}
      {isContactVisible && (
        <form className="w-full p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Name</label>
            <input
              type="text"
              placeholder="Name"
          className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Phone</label>
            <input
              type="text"
              placeholder="Phone"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Email</label>
            <input
              type="email"
              placeholder="Email"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>
        </form>
      )}
    </div>
  <div className="w-full  border border-brand_color rounded-lg shadow-sm">
      {/* Header Section with Toggle */}
      <div
        className={isVisible ? "flex w-full justify-between border-b-[1px] border-gray-300 p-4 py-[14px] items-center cursor-pointer":"flex w-full justify-between  p-4 py-[14px] items-center cursor-pointer"}
        onClick={() => setIsVisible(!isVisible)}
      >
        <h2 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600">Bank Account Details</h2>
        <div className="text-gray-500  p-[6px] 2xl:p-[10px] bg-[#E4E4E4] rounded-full" aria-label="Toggle visibility">
          {isVisible ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>

      {/* Form Section */}
      {isVisible && (
        <form className="w-full p-4 space-y-4">
          {/* Bank Name */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
              Bank Name
            </label>
            <input
              type="text"
              placeholder="Bank Name"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"

            />
          </div>

          {/* Account Name */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
              Account Name
            </label>
            <input
              type="text"
              placeholder="Account Name"
              className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
          </div>

          {/* Account Number and Routing Number */}
          <div className="text-[15px] flex gap-[30px] justify-center w-full mt-[15px] font-[500] text-gray-600">
            <div className='w-[100%] lg:w-[50%]'>
              <label className="block text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                Account Number
              </label>
              <input
                type="text"
                placeholder="Account Number"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                />
            </div>
            <div className=' w-[100%] lg:w-[50%]'>
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                Routing Number
              </label>
              <input
                type="text"
                placeholder="Routing Number"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                />
            </div>
          </div>

          {/* Branch Name */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
              Branch Name
            </label>
            <input
              type="text"
              placeholder="Branch Name"
              className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
          </div>

          {/* SWIFT Code */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
              SWIFT Code
            </label>
            <input
              type="text"
              placeholder="SWIFT Code"
             className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
          </div>
        </form>
      )}
    </div>
    {/* ------------------- */}
    <div className="w-full  border mt-[15px] border-brand_color rounded-lg shadow-sm">
      {/* Header Section with Toggle */}
      <div
       className={isBillingVisible ? "flex w-full justify-between border-b-[1px] border-gray-300 p-4 py-[14px] items-center cursor-pointer":"flex w-full justify-between  p-4 py-[14px] items-center cursor-pointer"}
        onClick={() => setIsBillingVisible(!isBillingVisible)}
      >
        <h2 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600">Billing Address</h2>
        <div className="text-gray-500  p-[6px] 2xl:p-[10px] bg-[#E4E4E4] rounded-full" aria-label="Toggle visibility">
          {isBillingVisible ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>

      {/* Form Section */}
      {isBillingVisible && (
        <form className="w-full space-y-4 p-4">
          {/* First Name and Last Name */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
              className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Email</label>
            <input
              type="email"
              placeholder="Email"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Phone</label>
            <input
              type="text"
              placeholder="Phone"
              className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Company</label>
            <input
              type="text"
              placeholder="Company"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          {/* Address Line 1 and Address Line 2 */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Address Line 1</label>
            <input
              type="text"
              placeholder="Address Line 1"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Address Line 2</label>
            <input
              type="text"
              placeholder="Address Line 2"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          {/* City and Postcode/ZIP */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">City</label>
              <input
                type="text"
                placeholder="City"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Postcode / ZIP</label>
              <input
                type="text"
                placeholder="Postcode / ZIP"
             className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
          </div>

          {/* State/County and Country/Region */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">State / County</label>
              <input
                type="text"
                placeholder="State / County"
             className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Country / Region</label>
              <input
                type="text"
                placeholder="Country / Region"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
          </div>
        </form>
      )}
    </div>
    <div className="w-full  border mt-[15px] border-brand_color rounded-lg shadow-sm">
      {/* Header Section with Toggle */}
      <div
             className={isShippingVisible ? "flex w-full justify-between border-b-[1px] border-gray-300 p-4 py-[14px] items-center cursor-pointer":"flex w-full justify-between  p-4 py-[14px] items-center cursor-pointer"}
        onClick={() => setIsShippingVisible(!isShippingVisible)}
      >
        <h2 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600">Shipping Address</h2>
        <div className="text-gray-500  p-[6px] 2xl:p-[10px] bg-[#E4E4E4] rounded-full" aria-label="Toggle visibility">
          {isShippingVisible ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>

      {/* Form Section */}
      {isShippingVisible && (
        <form className="w-full  space-y-4 p-4">
          {/* First Name and Last Name */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">First Name</label>
              <input
                type="text"
                placeholder="First Name"
              className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Email</label>
            <input
              type="email"
              placeholder="Email"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Phone</label>
            <input
              type="text"
              placeholder="Phone"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Company</label>
            <input
              type="text"
              placeholder="Company"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          {/* Address Line 1 and Address Line 2 */}
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Address Line 1</label>
            <input
              type="text"
              placeholder="Address Line 1"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>
          <div>
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Address Line 2</label>
            <input
              type="text"
              placeholder="Address Line 2"
              className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          {/* City and Postcode/ZIP */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">City</label>
              <input
                type="text"
                placeholder="City"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Postcode / ZIP</label>
              <input
                type="text"
                placeholder="Postcode / ZIP"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
          </div>

          {/* State/County and Country/Region */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">State / County</label>
              <input
                type="text"
                placeholder="State / County"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="w-1/2">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Country / Region</label>
              <input
                type="text"
                placeholder="Country / Region"
                 className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  <div className="flex justify-end items-center gap-[10px] mt-[20px]">
      <button className='px-[30px] py-[10px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'><LuSaveAll className='text-[20px]'/>Draft</button>
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

export default Bnewcustomer