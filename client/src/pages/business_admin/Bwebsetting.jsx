import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboradheader from '../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import Dashboardleftside from '../../components/dashboard/Dashboardleftside';
import { FiChevronUp } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const Bwebsetting = () => {
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
     const [websiteIcon, setWebsiteIcon] = useState("https://i.ibb.co.com/HBsfNMb/avatar.jpg"); // State for website icon
     const [tab, setTab] = useState("library"); // Active tab for media library/upload
     const [popupOpen, setPopupOpen] = useState(false); // State to handle popup visibility
     const [imageList, setImageList] = useState([]); // List of uploaded images
     const [searchQuery, setSearchQuery] = useState(""); // Search term for image search
     const [filteredImageList, setFilteredImageList] = useState([]); // Filtered images based on search term
     const [squareLogo, setSquareLogo] = useState(null);

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
  // ----------------------handle-custome-domain------------------
    const [isCustomDomainChecked, setIsCustomDomainChecked] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const handleCustomDomainCheckbox = (e) => {
      setIsCustomDomainChecked(e.target.checked);
    };
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
// ------------------------sub domain---------------
 const [shopName, setShopName] = useState('');
  
  // Handle the change in the input field
  const site_domain_change = (e) => {
    setShopName(e.target.value);
  };
  // ---------------plan-suggestion-------------------------
  const plans = ["Basic Plan", "Standard Plan", "Premium Plan", "Enterprise Plan"];
  const [query, setQuery] = useState("");
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      setFilteredPlans(plans.filter((plan) => plan.toLowerCase().includes(value.toLowerCase())));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (plan) => {
    setQuery(plan);
    setShowSuggestions(false);
  };
// ---------------category-suggestion--------------
const categories = ["Electronics", "Fashion", "Home & Kitchen", "Books", "Toys", "Beauty"];
const [categoryInput, setCategoryInput] = useState("");
const [filteredCategories, setFilteredCategories] = useState([]);
const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);

const handleCategoryChange = (e) => {
  const value = e.target.value;
  setCategoryInput(value);
  if (value) {
    setFilteredCategories(categories.filter((category) => category.toLowerCase().includes(value.toLowerCase())));
    setShowCategorySuggestions(true);
  } else {
    setShowCategorySuggestions(false);
  }
};

const handleCategorySelect = (category) => {
  setCategoryInput(category);
  setShowCategorySuggestions(false);
};
// -----------designation-suggestion--------------
const designations = ["Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Marketing Lead"];
const [designationInput, setDesignationInput] = useState("");
const [filteredDesignations, setFilteredDesignations] = useState([]);
const [showDesignationSuggestions, setShowDesignationSuggestions] = useState(false);

const handleDesignationChange = (e) => {
  const value = e.target.value;
  setDesignationInput(value);
  if (value) {
    setFilteredDesignations(designations.filter((designation) => designation.toLowerCase().includes(value.toLowerCase())));
    setShowDesignationSuggestions(true);
  } else {
    setShowDesignationSuggestions(false);
  }
};

const handleDesignationSelect = (designation) => {
  setDesignationInput(designation);
  setShowDesignationSuggestions(false);
};
// ------------------toggole-box------------------------
const [isAltContactVisible, setIsAltContactVisible] = useState(true);
const [portraitLogo, setPortraitLogo] = useState("https://i.ibb.co.com/HBsfNMb/avatar.jpg");
const [isPopupVisible, setIsPopupVisible] = useState(false);
const handlePortraitLogoUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    const newImage = {
      id: Date.now(),
      src: imageURL,
      title: file.name,
    };
    setImages((prev) => [...prev, newImage]);
    setPortraitLogo(imageURL);
    togglePopupVisibility();
  }
};

const choosePortraitLogo = (image) => {
  setPortraitLogo(image.src);
  togglePopupVisibility();
};
// -------------language-----------------
// Array of timezones (you can expand this with more timezones as needed)
const timezones = [
  { value: 'UTC', name: 'UTC (Coordinated Universal Time)' },
  { value: 'GMT', name: 'GMT (Greenwich Mean Time)' },
  { value: 'EST', name: 'EST (Eastern Standard Time)' },
  { value: 'CST', name: 'CST (Central Standard Time)' },
  { value: 'MST', name: 'MST (Mountain Standard Time)' },
  { value: 'PST', name: 'PST (Pacific Standard Time)' },
  { value: 'CET', name: 'CET (Central European Time)' },
  { value: 'EET', name: 'EET (Eastern European Time)' },
  { value: 'IST', name: 'IST (Indian Standard Time)' },
  { value: 'AEST', name: 'AEST (Australian Eastern Standard Time)' },
  // Add more timezones as needed
];
// Array of common time formats
const timeFormats = [
  { value: '12-hour', name: '12-hour' },
  { value: '24-hour', name: '24-hour' },
  // You can add more time formats if needed
];
// Array of common date formats
const dateFormats = [
  { value: 'MM-DD-YYYY', name: 'MM-DD-YYYY' },
  { value: 'DD-MM-YYYY', name: 'DD-MM-YYYY' },
  // Add more formats as needed
];
const [isBusinessvisible,setisBusinessvisible]=useState(true);
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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Web Setting</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[13px] lg:text-[14px]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Setting</li>
            <li><IoIosArrowForward/></li>
            <li>Web Settings</li>
          </ul>
        </div>
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>
            {/* -------------------form---------------------- */}
<form action="" className="pt-[15px] lg:pt-[20px]">



    {/* -----------------business------------------- */}
    <div className="">
      {/* Header */}

      <div className=''>
        <div className="w-[100%] mb-[10px] lg:mb-[20px]">
                     <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                       Title
                     </label>
                     <input
                       type="text"
                       placeholder="Title"
                       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                     />
                   </div>
                   <div className="w-[100%] mb-[10px] lg:mb-[20px]">
                     <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                       Tagline
                     </label>
                     <input
                       type="text"
                       placeholder="Tagline"
                       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                     />
                   </div>
        
      
              {/* Site Icon */}
             <div className="relative ">
             {/* Profile Image Section */}
                <div className="relative  mb-[10px]">
                     <div className="">
               
               {profileImage ? (
                 <img
                   src={profileImage}
                   alt="Profile"
                   className="w-[150px] h-[100px]  rounded-[10px] overflow-hidden border-2 border-gray-300"
                 />
               ) :""
               }
               
             </div>
                    <label htmlFor="tagline" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Favicon
               </label>
                       {/* Profile Image Section */}
         
            
       
       
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
           <div className=" overflow-hidden w-full cursor-pointer text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] rounded-[5px]  flex justify-center items-center  border-[1px] mt-[5px]"  onClick={togglePopup}>
               {profileImage ? (
                 
               <div>
                
                 <div className=''>Upload Icon</div>
               </div>
               ) : (
             <div>
                 <div className=''>Upload Icon</div>
               </div>
               )}
             </div>
             {/* Popup */}
          {popupOpen && (
                 <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
                   <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
                     {/* Header */}
                     <div className="p-4 flex justify-between items-center border-b border-gray-300">
                       <h2 className="text-lg font-semibold">Upload Images</h2>
                       <button onClick={togglePopupVisibility} className="text-gray-600 hover:text-gray-800">
                         ✕
                       </button>
                     </div>
       
                     {/* Tabs */}
                     <div className="flex border-b border-gray-300">
                       <div
                         onClick={() => setTab("library")}
                         className={`w-1/2 py-2 text-center ${
                           tab === "library" ? "border-b-2 cursor-pointer border-brand_color text-brand_color font-semibold" : "text-gray-600 cursor-pointer hover:text-brand_color"
                         }`}
                       >
                         Media Library
                       </div>
                       <div
                         onClick={() => setTab("upload")}
                         className={`w-1/2 py-2 text-center ${
                           tab === "upload" ? "border-b-2 cursor-pointer border-brand_color text-brand_color font-semibold" : "text-gray-600 cursor-pointer hover:text-brand_color"
                         }`}
                       >
                         Upload New
                       </div>
                     </div>
       
                     {/* Content */}
                     <div className="p-4">
                       {tab === "upload" && (
                         <div>
                           {/* Upload New File */}
                           <div className="w-full flex h-[150px] justify-between items-center lg:flex-row flex-col gap-[10px]">
                             <div className="w-full lg:w-auto">
                               <input
                                 type="file"
                                 id="fileUpload"
                                 className="hidden"
                                 onChange={handleIconUpload}
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
       
                       {tab === "library" && (
                         <div>
                           {/* Search Box for Media Library */}
                           <div className="mb-6 flex justify-end">
                             <input
                               type="text"
                               placeholder="Search by name"
                               value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               className="w-[80%] lg:w-[50%] border rounded px-4 py-2 text-sm border-gray-300 focus:outline-none focus:ring focus:ring-orange-200"
                             />
                           </div>
       
                           {/* Uploaded Images */}
                           <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[10px]">
                             {filterImages.map((image) => (
                               <div key={image.id} className="relative">
                                 <img
                                   src={image.src}
                                   alt={image.title}
                                   className="border rounded cursor-pointer w-[200px] h-[200px]"
                                   onClick={() => chooseImageAsIcon(image)}
                                 />
                                 <span className="absolute bottom-1 left-1 text-xs bg-gray-800 text-white px-1 rounded">
                                   {image.title}
                                 </span>
                               </div>
                             ))}
                             {filterImages.length === 0 && (
                               <div className="col-span-full h-[150px] text-center flex justify-center items-center text-gray-500">
                                 No images found.
                               </div>
                             )}
                           </div>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
               )}
       
           </div>
       
             {/* Site Logo */}
           <div className="relative  mb-[10px]">
             {/* Website Icon Section */}
             <div className="relative mb-[10px]  mt-[10px]">
               <div>
                 {websiteIcon ? (
                   <img
                     src={websiteIcon}
                     alt="Website Icon"
                     className="w-[150px] h-[100px] rounded-[10px] overflow-hidden border-2 border-gray-300"
                   />
                 ) : (
                   <p></p>
                 )}
               </div>
               <label htmlFor="tagline" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                Square Logo 
               </label>
               <div
                 className="overflow-hidden w-full cursor-pointer rounded-[5px] text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] flex justify-center items-center border-[1px] mt-[5px]"
                 onClick={togglePopupVisibility}
               >
                 <div>Upload Logo</div>
               </div>
       
               {/* Popup for Image Upload */}
               {popupOpen && (
                 <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
                   <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
                     {/* Header */}
                     <div className="p-4 flex justify-between items-center border-b border-gray-300">
                       <h2 className="text-lg font-semibold">Upload Images</h2>
                       <button onClick={togglePopupVisibility} className="text-gray-600 hover:text-gray-800">
                         ✕
                       </button>
                     </div>
       
                     {/* Tabs */}
                     <div className="flex border-b border-gray-300">
                       <div
                         onClick={() => setTab("library")}
                         className={`w-1/2 py-2 text-center ${
                           tab === "library" ? "border-b-2 cursor-pointer border-brand_color text-brand_color font-semibold" : "text-gray-600 cursor-pointer hover:text-brand_color"
                         }`}
                       >
                         Media Library
                       </div>
                       <div
                         onClick={() => setTab("upload")}
                         className={`w-1/2 py-2 text-center ${
                           tab === "upload" ? "border-b-2 cursor-pointer border-brand_color text-brand_color font-semibold" : "text-gray-600 cursor-pointer hover:text-brand_color"
                         }`}
                       >
                         Upload New
                       </div>
                     </div>
       
                     {/* Content */}
                     <div className="p-4">
                       {tab === "upload" && (
                         <div>
                           {/* Upload New File */}
                           <div className="w-full flex h-[150px] justify-between items-center lg:flex-row flex-col gap-[10px]">
                             <div className="w-full lg:w-auto">
                               <input
                                 type="file"
                                 id="fileUpload"
                                 className="hidden"
                                 onChange={handleIconUpload}
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
       
                       {tab === "library" && (
                         <div>
                           {/* Search Box for Media Library */}
                           <div className="mb-6 flex justify-end">
                             <input
                               type="text"
                               placeholder="Search by name"
                               value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               className="w-[80%] lg:w-[50%] border rounded px-4 py-2 text-sm border-gray-300 focus:outline-none focus:ring focus:ring-orange-200"
                             />
                           </div>
       
                           {/* Uploaded Images */}
                           <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[10px]">
                             {filterImages.map((image) => (
                               <div key={image.id} className="relative">
                                 <img
                                   src={image.src}
                                   alt={image.title}
                                   className="border rounded cursor-pointer w-[200px] h-[200px]"
                                   onClick={() => chooseImageAsIcon(image)}
                                 />
                                 <span className="absolute bottom-1 left-1 text-xs bg-gray-800 text-white px-1 rounded">
                                   {image.title}
                                 </span>
                               </div>
                             ))}
                             {filterImages.length === 0 && (
                               <div className="col-span-full h-[150px] text-center flex justify-center items-center text-gray-500">
                                 No images found.
                               </div>
                             )}
                           </div>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
               )}
             </div>
             {/* ------------------------Portrait-logo------------------------------- */}
             <div className="relative mb-[10px] mt-[10px]">
             {/* Display selected logo */}
             <div>
               {portraitLogo ? (
                 <img
                   src={portraitLogo}
                   alt="Portrait Logo"
                   className="w-[100px] h-[150px] rounded-[10px] overflow-hidden border-2 border-gray-300 object-cover"
                 />
               ) : (
                 <p className="text-sm text-gray-400">No portrait logo selected</p>
               )}
             </div>
       
             <label
               htmlFor="portraitLogo"
               className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
             >
               Portrait Logo
             </label>
       
             <div
               className="overflow-hidden w-full cursor-pointer rounded-[5px] text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] flex justify-center items-center border-[1px] mt-[5px]"
               onClick={togglePopupVisibility}
             >
               <div>Upload Portrait Logo</div>
             </div>
       
             {/* Popup */}
             {isPopupVisible && (
               <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
                 <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
                   {/* Header */}
                   <div className="p-4 flex justify-between items-center border-b border-gray-300">
                     <h2 className="text-lg font-semibold">Upload Portrait Logo</h2>
                     <button
                       onClick={togglePopupVisibility}
                       className="text-gray-600 hover:text-gray-800"
                     >
                       ✕
                     </button>
                   </div>
       
                   {/* Tabs */}
                   <div className="flex border-b border-gray-300">
                     <div
                       onClick={() => setTab("library")}
                       className={`w-1/2 py-2 text-center ${
                         tab === "library"
                           ? "border-b-2 cursor-pointer border-orange-500 text-orange-500 font-semibold"
                           : "text-gray-600 cursor-pointer hover:text-orange-500"
                       }`}
                     >
                       Media Library
                     </div>
                     <div
                       onClick={() => setTab("upload")}
                       className={`w-1/2 py-2 text-center ${
                         tab === "upload"
                           ? "border-b-2 cursor-pointer border-orange-500 text-orange-500 font-semibold"
                           : "text-gray-600 cursor-pointer hover:text-orange-500"
                       }`}
                     >
                       Upload New
                     </div>
                   </div>
       
                   {/* Content */}
                   <div className="p-4">
                     {tab === "upload" && (
                       <div className="w-full flex h-[150px] justify-between items-center lg:flex-row flex-col gap-[10px]">
                         <div className="w-full lg:w-auto">
                           <input
                             type="file"
                             id="fileUpload"
                             className="hidden"
                             onChange={handlePortraitLogoUpload}
                             accept="image/*"
                           />
                           <label
                             htmlFor="fileUpload"
                             className="block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center transition-all duration-300 ease-in-out"
                           >
                             Upload Portrait
                           </label>
                         </div>
                       </div>
                     )}
       
                     {tab === "library" && (
                       <div>
                         <div className="mb-6 flex justify-end">
                           <input
                             type="text"
                             placeholder="Search by name"
                             value={searchQuery}
                             onChange={(e) => setSearchQuery(e.target.value)}
                             className="w-[80%] lg:w-[50%] border rounded px-4 py-2 text-sm border-gray-300 focus:outline-none focus:ring focus:ring-orange-200"
                           />
                         </div>
       
                         <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[10px]">
                           {filterImages.map((image) => (
                             <div key={image.id} className="relative">
                               <img
                                 src={image.src}
                                 alt={image.title}
                                 className="border rounded cursor-pointer w-[100px] h-[150px] object-cover"
                                 onClick={() => choosePortraitLogo(image)}
                               />
                               <span className="absolute bottom-1 left-1 text-xs bg-gray-800 text-white px-1 rounded">
                                 {image.title}
                               </span>
                             </div>
                           ))}
                           {filterImages.length === 0 && (
                             <div className="col-span-full h-[150px] text-center flex justify-center items-center text-gray-500">
                               No images found.
                             </div>
                           )}
                         </div>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             )}
           </div>
       
             {/* --------------------------portrait-logo-------------------------- */}
           </div>
       
                {/* Your Shop Name */}
                
                <div className="w-[100%] mb-[10px]">
                 <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Organization Name 
                 </label>
                 <input
                   type="text"
                   id="customDomainInput"
                   placeholder=" Your Organization Name "
                   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                 />
               </div>
                        
               <div className="w-[100%] mb-[10px]">
             <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
              Organization Phone
             </label>
             <input
               type="text"
               id="customDomainInput"
               placeholder="Organization Phone"
       
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
             />
             
          
           </div>
               <div className="w-[100%] mb-[10px]">
                 <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Organization Email 
                 </label>
                 <input
                   type="text"
                   id="customDomainInput"
                   placeholder="Organization Email "
                   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                 />
               </div>
               <div className="w-[100%] mb-[10px]">
                 <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Organization Address 
                 </label>
                 <input
                   type="text"
                   id="customDomainInput"
                   placeholder="Organization Address"
                   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                 />
               </div>
               <div className="w-full flex gap-[30px] mb-[20px] lg:flex-row flex-col">
                   <div className="w-[100%] lg:w-[50%]">
                     <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                       City
                     </label>
                     <input
                       type="text"
                       placeholder="City"
                       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                     />
                   </div>
                   <div className="w-[100%] lg:w-[50%]">
                     <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                       Post Code / Zip
                     </label>
                     <input
                       type="text"
                       placeholder="Post Code / Zip"
                       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                     />
                   </div>
                 </div>
                 <div className="w-full flex gap-[30px] mb-[20px] lg:flex-row flex-col">
                   <div className="w-[100%] lg:w-[50%]">
                     <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                       State / Country
                     </label>
                     <input
                       type="text"
                       placeholder="State / Country"
                       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                     />
                   </div>
                   <div className="w-[100%] lg:w-[50%]">
                     <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                       Country / Region
                     </label>
                     <input
                       type="text"
                       placeholder="Country / Region"
                       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                     />
                   </div>
                 </div>
                 <div className="w-[100%] mb-[10px]">
                 <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Language 
                 </label>
                 <input
                   type="text"
                   id="customDomainInput"
                   placeholder="Language"
                   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                 />
               </div>
          
        <div className="w-full flex gap-[30px] mb-[20px] lg:flex-row flex-col">
                     {/* Timezone */}
        <div className="w-[100%] lg:w-[50%]">
             <label htmlFor="timezone" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
               Timezone
             </label>
             <select
               name="timezone"
               id="timezone"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] px-[12px]"
             >
               <option value="">Select Timezone</option>
               {timezones.map((timezone) => (
                 <option key={timezone.value} value={timezone.value}>
                   {timezone.name}
                 </option>
               ))}
             </select>
           </div>
       
             {/* Time Format */}
             <div className="w-[100%] lg:w-[50%]">
             <label htmlFor="timeFormat" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
               Time Format
             </label>
             <select
               name="timeFormat"
               id="timeFormat"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] px-[12px]"
             >
               <option value="">Select Time Format</option>
               {timeFormats.map((format) => (
                 <option key={format.value} value={format.value}>
                   {format.name}
                 </option>
               ))}
             </select>
           </div>
        </div>
                     {/* Date Format */}
        <div className="w-[100%] mb-[10px]">
             <label htmlFor="dateFormat" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
               Date Format
             </label>
             <select
               name="dateFormat"
               id="dateFormat"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] px-[12px]"
             >
               <option value="">Select Date Format</option>
               {dateFormats.map((format) => (
                 <option key={format.value} value={format.value}>
                   {format.name}
                 </option>
               ))}
             </select>
           </div>
             <div className="w-[100%] mb-[5px]">
               <label htmlFor="shopName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
               Your Sub-Domain
               </label>
               <div className="relative w-full  mt-[8px]">
                 <input
                   type="text"
                   id="shopName"
                           value={shopName}
               onChange={site_domain_change}
                   placeholder="Your Sub-Domain"
                   className="w-full rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                 />
                 <div className="absolute top-0 right-0 w-auto px-[10px] h-input_height 2xl:h-[45px]  bg-[whitesmoke] flex justify-center items-center">
                   <span  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">.subdomain.com</span>
                 </div>
               </div>
             </div>
          {/* Only show domain name if shopName has length greater than 1 */}
             {shopName.length > 1 && (
               <p className="mb-[10px] text-[14px] 2xl:text-[16px] text-gray-700">
                 Your Sub Domain: <a href=''target='_blank' className='text-brand_color underline cursor-pointer'>https://www.{shopName.replace(/\s+/g, '').toLowerCase()}.weblasser.com</a>
               </p>
             )}
                 {/* Custom Domain Checkbox */}
                 <div className="w-[100%] mb-[10px] flex items-center gap-[10px]">
                   <input
                     type="checkbox"
                     id="customDomain"
                     checked={isCustomDomainChecked}
                     onChange={handleCustomDomainCheckbox}
                     className="text-brand_color"
                   />
                   <label htmlFor="customDomain" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                     Enable Custom Domain
                   </label>
                 </div>
           
                 {/* Custom Domain Input */}
            {isCustomDomainChecked && (
             <div>
               <div className="w-[100%] mb-[10px]">
                 <label
                   htmlFor="customDomainInput"
                   className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                 >
                   Your Custom Domain
                 </label>
                 <input
                   type="text"
                   id="customDomainInput"
                   placeholder="Your Custom Domain"
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                   onKeyDown={(e) => {
                     if (e.key === "Enter" && e.target.value.trim()) {
                       e.preventDefault(); // Prevent form submission
                       setIsFormSubmitted(true);
                     }
                   }}
                 />
               </div>
           
               {/* Domain Record Section */}
               {isFormSubmitted && (
                 <section className="w-full h-auto p-[20px] mt-[25px] border-[1px] border-[#eee] mb-[20px] rounded-[5px]">
                   <div>
                     <div className="w-full px-[20px] py-[15px] bg-cyan-200 rounded-[5px]">
                       <h1 className="text-[14px] xl:text-[16px] font-[500]">
                         Please update your domain name servers to:
                       </h1>
                     </div>
                     <div className="mt-[15px] bg-[whitesmoke] p-[15px] rounded-[10px]">
                       <ul>
                         <li className="flex justify-start mb-[7px] items-center gap-[10px] text-[18px]">
                           ns1.digitalocean.com <button><MdContentCopy /></button>
                         </li>
                         <li className="flex justify-start mb-[7px] items-center gap-[10px] text-[18px]">
                           ns2.digitalocean.com <button><MdContentCopy /></button>
                         </li>
                         <li className="flex justify-start mb-[7px] items-center gap-[10px] text-[18px]">
                           ns3.digitalocean.com <button><MdContentCopy /></button>
                         </li>
                       </ul>
                     </div>
                   </div>
           
                   <div>
                     <div className="w-full px-[20px] py-[15px] bg-cyan-200 mt-[10px] rounded-[5px]">
                       <h1 className="text-[14px] xl:text-[16px] font-[500]">
                         Alternative: Add 'A' record of your domain to
                       </h1>
                     </div>
                     <div className="mt-[15px] bg-[whitesmoke] p-[15px] rounded-[10px]">
                       <ul>
                         <li className="flex justify-start mb-[7px] items-center gap-[10px] text-[18px]">
                           139.59.240.168 <button><MdContentCopy /></button>
                         </li>
                       </ul>
                     </div>
                   </div>
                 </section>
               )}
             </div>
           )}
   
       
        </div>
      
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

export default Bwebsetting