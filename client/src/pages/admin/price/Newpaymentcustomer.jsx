import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import Dashboardleftside from '../../../components/Dashboard/Dashboardleftside';

const Newpaymentcustomer = () => {
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
  return (
    <section className='w-full flex font-poppins'>
      <section className='w-[100%] m-auto  px-[30px]'>

       {/* ------------------new customer table----------------- */}
         <section className=' '>
            {/* -------------------form---------------------- */}
<form action="" className="pt-[15px] lg:pt-[20px]">

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
  <div className="relative w-[100%] mb-[10px] lg:mb-[20px]">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Designation
      </label>
      <input
        type="text"
        placeholder="Designation"
        value={designationInput}
        onChange={handleDesignationChange}
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
      {showDesignationSuggestions && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md z-10">
          {filteredDesignations.length > 0 ? (
            filteredDesignations.map((designation, index) => (
              <li key={index} onClick={() => handleDesignationSelect(designation)} className="p-2 cursor-pointer hover:bg-gray-200">
                {designation}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No matching designations</li>
          )}
        </ul>
      )}
    </div>
    <div className="w-[100%] mb-[10px] lg:mb-[20px]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Username
      </label>
      <input
        type="text"
        placeholder="Username"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-[100%] mb-[10px] lg:mb-[20px]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Email
      </label>
      <input
        type="text"
        placeholder="Email"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-[100%] mb-[10px] lg:mb-[20px]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Phone
      </label>
      <input
        type="text"
        placeholder="Phone"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col">
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Password
      </label>
      <input
        type="text"
        placeholder="Password"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-[100%] lg:w-[50%]">
      <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Confirm Password
      </label>
      <input
        type="text"
        placeholder="Confirm Password "
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
  </div>
  <div className="w-[100%] mb-[10px]">
          <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
          Your Organization Name 
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
      Your Organization Address
      </label>
      <input
        type="text"
        id="customDomainInput"
        placeholder="Your Organization Address"

        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
      
   
    </div>
 
         {/* Your Shop Name */}
      <div className="w-[100%] mb-[5px]">
        <label htmlFor="shopName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
        Your Sub-Domain
        </label>
        <div className="relative w-full mt-[8px]">
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
    <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col">
    <div className="relative w-[100%] lg:w-[50%]">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Select Plan
      </label>
      <input
        type="text"
        placeholder="Select Plan"
        value={query}
        onChange={handleChange}
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
      {showSuggestions && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md z-10">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan, index) => (
              <li key={index} onClick={() => handleSelect(plan)} className="p-2 cursor-pointer hover:bg-gray-200">
                {plan}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No matching plans</li>
          )}
        </ul>
      )}
    </div>
    <div className="relative w-[100%] lg:w-[50%]">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Select Category
      </label>
      <input
        type="text"
        placeholder="Select Category"
        value={categoryInput}
        onChange={handleCategoryChange}
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
      {showCategorySuggestions && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md z-10">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <li key={index} onClick={() => handleCategorySelect(category)} className="p-2 cursor-pointer hover:bg-gray-200">
                {category}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No matching categories</li>
          )}
        </ul>
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
  )
}

export default Newpaymentcustomer