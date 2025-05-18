import React, { useContext, useEffect, useState,useRef} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import revenueData from '../../data/revenueData';
import { FaTrophy } from "react-icons/fa";
import DatePicker from "react-datepicker"; // Importing the date picker
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "react-datepicker/dist/react-datepicker.css"; 
import { MdDateRange } from "react-icons/md";
import { FaKey, FaEye, FaCalendarAlt } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiImport } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { LuSaveAll } from "react-icons/lu";
import JoditEditor from 'jodit-react';
import { IoKeySharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,Legend, PieChart,
  Cell,
  ResponsiveContainer,BarChart,Bar,Pie} from "recharts"

import { Pagination } from 'swiper/modules';
import { IoIosArrowForward } from "react-icons/io";
// -----------add-tag------------------
const TagInput = ({ label, placeholder, availableTags }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const addTag = (event) => {
    if (event.key === "Enter" && input.trim()) {
      event.preventDefault();
      const trimmedInput = input.trim();

      if (!tags.some(tag => tag.value.toLowerCase() === trimmedInput.toLowerCase())) {
        setTags([...tags, { value: trimmedInput, position: tags.length }]);
      }

      setInput("");
      setFilteredSuggestions([]);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  
    if (value.trim()) {
      const filtered = availableTags
        .filter(tag =>
          tag.toLowerCase().includes(value.toLowerCase()) &&
          !tags.some(t => t.value.toLowerCase() === tag.toLowerCase())
        )
        .sort((a, b) => a.localeCompare(b)); // Sort alphabetically A-Z
  
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };
  

  const handleSuggestionClick = (tag) => {
    if (!tags.some(t => t.value.toLowerCase() === tag.toLowerCase())) {
      setTags([...tags, { value: tag, position: tags.length }]);
    }
    setInput("");
    setFilteredSuggestions([]);
  };

  return (
    <div className="mb-4 w-full">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        {label}
      </label>
      <div className="w-full mt-1 border border-gray-300 rounded-md p-1 min-h-[35px] flex flex-wrap gap-2 items-center">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center text-sm"
          >
            {tag.value} 
            <button
              className="ml-2 text-red-500 text-xs"
              onClick={() => removeTag(index)}
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none flex-grow p-1 text-sm"
          value={input}
          onChange={handleInputChange}
          onKeyDown={addTag}
        />
      </div>

      {input && filteredSuggestions.length > 0 && (
        <div className="mt-2 border border-gray-300 rounded-md max-h-40 overflow-y-auto">
          <div className="flex flex-wrap gap-2 p-2">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer text-sm hover:bg-blue-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
const getAvailableTags = (label) => {
  switch (label) {
    case "Products":
      return ['Product', 'Fresh Product', 'Vegetables', 'Dairy', 'Frozen Foods', 'Meat'];
    case "Exclude Products":
      return ['Expired Product', 'Damaged Product', 'Out of Stock', 'Discontinued'];
    case "Product Categories":
      return ['Electronics', 'Home Appliances', 'Fashion', 'Beauty', 'Groceries'];
    case "Exclude Categories":
      return ['Sale', 'Discounted', 'Limited Edition'];
    case "Product Tags":
      return ['Best Seller', 'New Arrival', 'Popular', 'Limited Offer'];
    case "Exclude Tags":
      return ['Out of Stock', 'Seasonal', 'Clearance'];
    case "Product Brands":
      return ['Samsung', 'Apple', 'Sony', 'LG', 'Nike'];
      case "Exclude Brands":
        return ['Samsung', 'Apple', 'Sony', 'LG', 'Nike'];
        case "Allowed Emails":
          return ['shihabmoni16@gmail.com', 'rakib77@gmail.com', 'rimon88@gmail.com'];
          case "Exclude Emails":
            return ['shihabmoni16@gmail.com', 'rakib77@gmail.com', 'rimon88@gmail.com'];
    default:
      return [];
  }
};
const Bnewcoupon = () => {
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
  //  ---------------all post------------
   const [pageTitle, setPageTitle] = useState("");
     const [permalink, setPermalink] = useState("");
     const [isEditing, setIsEditing] = useState(false);
      const [dropdownOpen, setDropdownOpen] = useState(false);
   
     const handleInputChange = (e) => {
       const value = e.target.value;
       const formattedValue = value.replace(/\s+/g, "-").toLowerCase(); // Replace spaces with hyphens
       setPageTitle(value);
       setPermalink(formattedValue);
     };
   
     const handleEdit = () => {
       setIsEditing(true);
     };
   
     const handleSave = () => {
       setIsEditing(false);
     };

  // States to toggle input boxes
   const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [status, setStatus] = useState("Publish");

  const [isEditingVisibility, setIsEditingVisibility] = useState(false);
  const [visibility, setVisibility] = useState("Approved");

  const [isEditingDate, setIsEditingDate] = useState(false);
  const [publishedDate, setPublishedDate] = useState(new Date("2024-01-16"));

  const [isEditingPublishStatus, setIsEditingPublishStatus] = useState(false);
  const [publishStatus, setPublishStatus] = useState("Publish");

//    editor config
 const editor = useRef(null); // Ref for the editor instance

const [content, setContent] = useState("");
const [content2, setContent2] = useState("");

  const [codeInput, setCodeInput] = useState("");
  const [renderedCSS, setRenderedCSS] = useState(""); // For storing CSS content
  const [isCodeView, setIsCodeView] = useState(false); // Flag to toggle between code view and rich text view

  // Function to handle the conversion of code (HTML + CSS) into rendered HTML content for the Text Editor
  const handleCodeToDesign = () => {
    const htmlMatch = codeInput.match(/<style>(.*?)<\/style>/s);
    const css = htmlMatch ? htmlMatch[1] : "";
    setRenderedCSS(css);

    const htmlWithoutCss = codeInput.replace(/<style>.*?<\/style>/s, "").trim();
    setContent(htmlWithoutCss);
    setIsCodeView(false); // Set code view to false (rich text mode)
    setActiveTab("text");
  };

  useEffect(() => {
    if (renderedCSS) {
      const styleElement = document.getElementById("dynamic-css");
      styleElement.innerHTML = renderedCSS;
    }
  }, [renderedCSS]);

  // Function to update the content in the text editor and sync it to code editor
  const handleTextEditorChange = (newContent) => {
    setContent(newContent);

    const htmlContent = newContent;
    setCodeInput(`<style>${renderedCSS}</style>` + htmlContent);
  };

  const [message,setmessage]=useState("");

  // ==================file upload with preview==============
 const [image, setImage] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
// -=--------------------visibility--------------
const [parentCategory, setParentCategory] = useState("None");
const [categories, setCategories] = useState([]); // Store categories




const addCategoryToTree = (tree, parentName, newCategory) => {
  return tree.map((cat) => {
    if (cat.name === parentName) {
      return {
        ...cat,
        children: [...cat.children, newCategory],
      };
    }
    return {
      ...cat,
      children: addCategoryToTree(cat.children, parentName, newCategory),
    };
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (!pageTitle) {
    return;
  }

  const newCategory = { name: pageTitle, children: [] };

  if (parentCategory === "None") {
    // Create a new parent category
    setCategories([...categories, newCategory]);
  } else {
    // Add the new category as a child to the selected parent category
    setCategories(addCategoryToTree(categories, parentCategory, newCategory));
  }

  // Reset form fields
  setPageTitle("");
  setPermalink("");
  setParentCategory("None");
};

const renderCategoryOptions = (tree, prefix = "") => {
  return tree.flatMap((cat) => [
    <option key={prefix + cat.name} value={cat.name}>
      {prefix + cat.name}
    </option>,
    ...renderCategoryOptions(cat.children, prefix + "- "),
  ]);
};

const handleVisibilityOptionChange = (e) => {
  const value = e.target.value;
  setVisibilityOption(value);
  if (value === "Password Protected") {
    setStatus("Password Protected");
  }
};
// ----------------coupon-tab----------------
const [activeTab, setActiveTab] = useState("General");
const [isExpanded, setIsExpanded] = useState(true);
// -------------publish-button----------
 // States to toggle input boxes

// -=--------------------visibility--------------
const [buttonText, setButtonText] = useState("Publish");

const handleClick = () => {
  setButtonText("Update"); // Change the button text
};
const [visibilityOption, setVisibilityOption] = useState("Publish");
const [passwordInput, setPasswordInput] = useState("");
const [createTime, setCreateTime] = useState("08:20 PM");
const handleStatusChange = (e) => {
  const value = e.target.value;
  setStatus(value);

  // Reset `visibilityOption` if it's a different status
  if (value !== "Password Protected") {
    setVisibilityOption("");
  }
};
// ----------------date-format------------------
const [startDate, setStartDate] = useState("");
const [expiryDate, setExpiryDate] = useState("");

// Format date from YYYY-MM-DD to DD-MM-YYYY
const formatDateToDDMMYYYY = (date) => {
  if (!date) return ""; // Handle empty input
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

// Format date from DD-MM-YYYY to YYYY-MM-DD
const formatDateToYYYYMMDD = (date) => {
  if (!date) return ""; // Handle empty input
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};
// -----------tag-add-system-------------
 // States to toggle input boxes
   // -=--------------------visibility--------------
    const [previousStatus, setPreviousStatus] = useState(status);
    const [previousVisibility, setPreviousVisibility] = useState(visibility);
    const [previousPublishedDate, setPreviousPublishedDate] = useState(publishedDate);
    const [hoveredItem, setHoveredItem] = useState(null);
      const options = [
        { label: "Approved", color: "green-500", bg: "green-100" },
        { label: "Pending", color: "orange-500", bg: "orange-100" },
        { label: "Rejected", color: "red-500", bg: "red-100" },
      ];
   
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%]  m-auto py-[20px] xl:py-[40px] px-[10px] xl:px-[30px]'>
             <div className='w-full flex justify-between items-center'>
                   <div>
              <h1 className='text-[20px] font-[600] mb-[8px]'>New Product Coupon</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Products</li>
            <li><IoIosArrowForward/></li>
            <li>New Product Coupon</li>
          </ul>
                 </div>
                     {/* <div>
                        <button className='border-[2px] border-brand_color text-brand_color px-[20px] py-[8px] text-[16px] rounded-[5px]'>Import</button>
                     </div> */}
       </div>
              <form  onSubmit={handleSubmit} className='flex justify-center w-full flex-col xl:flex-row gap-[20px] mt-[20px]'>
                <section className='w-full xl:w-[70%] h-auto '>
                <div className="mt-[20px]">
      <div className="w-[100%] space-y-[5px] mb-[15px]">
        {/* Page Title Input */}
        <div>
          <label
            htmlFor="page-title"
            className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
          >
            Coupon Code
          </label>
          <input
            type="text"
            id="page-title"
            placeholder="Coupon Code"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
          />
        </div>
      </div>


      {/* Description */}
      <div className="w-[100%] mb-[20px]">
        <label htmlFor="description" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
          Description 
        </label>
        {/* <div className="w-full mt-[8px]">
        <SunEditor
            setContents={content}
            onChange={setContent}
            setOptions={{
              width: "100%",
              height: 250,
              buttonList: [
                ["undo", "redo"],
                ["formatBlock", "fontSize"],
                ["bold", "italic", "underline", "strike"],
                ["fontColor", "hiliteColor"],
                ["align", "list", "indent", "outdent"],
                ["table", "link", "image"],
                ["codeView"],
              ],
            }}
            enableCodeView={isCodeView}
          />
        </div> */}
        <textarea name="" id=""placeholder='Description...'className="w-full mt-[8px] rounded-[5px] placeholder-gray-700 outline-brand_color text-[15px] h-[200px] border-[1px] border-[#eee] p-[15px]"        ></textarea>
      </div>

  

   <section>
   <div className="max-w-6xl mx-auto bg-white rounded-md border-[1px] border-[#eee]">
  {/* Header with Toggle */}
  <div
    className="flex items-center justify-between px-4 py-[10px] border-b border-gray-200 cursor-pointer"
    onClick={() => setIsExpanded(!isExpanded)}
  >
    <h2 className='text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600'>Coupon Data</h2>
    {isExpanded ? (
      <div className='w-[40px] h-[40px] bg-gray-100 flex justify-center items-center rounded-full  '>
        <FaChevronUp className="text-gray-500" />
      </div>
    ) : (
      <div className='w-[40px] h-[40px] bg-gray-100 flex justify-center items-center rounded-full '>
       <FaChevronDown className="text-gray-500" />
    </div>
     
    )}
  </div>

  {isExpanded && (
    <div className="flex">
      {/* Left Side Tab Navigation */}
      <div className="w-1/4 border-r border-gray-200">
        {[
          { name: "General", id: "General" },
          { name: "Usage Restriction", id: "UsageRestriction" },
          { name: "Usage Limit", id: "UsageLimit" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`block w-full text-left px-4 py-2 font-medium text-sm border-l-4 transition-all ${
              activeTab === tab.id
                ? "text-brand_color border-brand_color bg-[#EEEEEE]"
                : "text-gray-500 border-transparent hover:bg-[#EEEEEE]"
            } text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Right Side Tab Content */}
      <div className="w-3/4 p-5">
        {activeTab === "General" && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="discount-type"
                className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
              >
                Discount Type
              </label>
              <select
                id="discount-type"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] px-[12px]"
              >
                <option value="Fixed">Fixed</option>
                <option value="Percentage">Percentage</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="coupon-amount"
                className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
              >
                Coupon Amount
              </label>
              <input
                type="number"
                id="coupon-amount"
                placeholder="0"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="free-shipping"
                className="mr-2"
              />
              <label
                htmlFor="free-shipping"
                className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
              >
                Allow Free Shipping
              </label>
            </div>
            <div className="mb-4">
  <label
    htmlFor="start-date"
    className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
  >
    Coupon Start Date
  </label>
  
  <input
    type="date"
    id="start-date-placeholder"
    placeholder="DD-MM-YYYY"
    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
  />
  {/* Date input field */}
  <input
    type="date"
    id="start-date"
     placeholder="DD-MM-YYYY"
    className="hidden"
  />
</div>

{/* Expiry Date Field */}
<div className="mb-4">
  <label
    htmlFor="expiry-date"
    className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
  >
    Coupon Expiry Date
  </label>
  <input
    type="date"
    id="expiry-date-placeholder"
    placeholder={expiryDate ? formatDateToDDMMYYYY(expiryDate) : "DD-MM-YYYY"}
    value={expiryDate ? formatDateToDDMMYYYY(expiryDate) : ""}
    onChange={(e) => {
      const dateStr = e.target.value;
      if (isValidDate(dateStr)) {
        setExpiryDate(formatDateToYYYYMMDD(dateStr));
      }
    }}
    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
  />
  {/* Date input field */}
  <input
    type="date"
    id="expiry-date"
    value={expiryDate} // Keep it in YYYY-MM-DD for the input
    onChange={(e) => setExpiryDate(e.target.value)} // Store the raw value in state
    className="hidden"
  />
</div>

          </div>
        )}

        {activeTab === "UsageRestriction" && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="min-spend"
                className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
              >
                Minimum Spend
              </label>
              <input
                type="number"
                id="min-spend"
                placeholder="Minimum Spend"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="max-spend"
                className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
              >
                Maximum Spend
              </label>
              <input
                type="number"
                id="max-spend"
                placeholder="Maximum Spend"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="individual-use"
                className="mr-2"
              />
              <label
                htmlFor="individual-use"
                className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
              >
                Individual Use Only
              </label>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="exclude-sale-items"
                className="mr-2"
              />
              <label
                htmlFor="exclude-sale-items"
                className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
              >
                Exclude Sale Items
              </label>
            </div>
            <div className="w-full">
            <TagInput label="Products" placeholder="Add product" availableTags={getAvailableTags("Products")} />
      <TagInput label="Exclude Products" placeholder="Add product to exclude" availableTags={getAvailableTags("Exclude Products")} />
      <TagInput label="Product Categories" placeholder="Add category" availableTags={getAvailableTags("Product Categories")} />
      <TagInput label="Exclude Product Categories" placeholder="Add category to exclude" availableTags={getAvailableTags("Exclude Categories")} />
      <TagInput label="Product Tags" placeholder="Add tag" availableTags={getAvailableTags("Product Tags")} />
      <TagInput label="Exclude Product Tags" placeholder="Add tag to exclude" availableTags={getAvailableTags("Exclude Tags")} />
      <TagInput label="Product Brands" placeholder="Add brand" availableTags={getAvailableTags("Product Brands")} />
      <TagInput label="Exclude Product Brands" placeholder="Add brand" availableTags={getAvailableTags("Exclude Brands")} />
      <TagInput label="Allowed Emails" placeholder="Allowed Email" availableTags={getAvailableTags("Allowed Emails")} />
      <TagInput label="Exclude Emails" placeholder="Exclude Email" availableTags={getAvailableTags("Exclude Emails")} />


    </div>
          </div>
        )}

        {activeTab === "UsageLimit" && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="usage-limit-per-coupon"
                className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
              >
                Usage limit per coupon
              </label>
              <input
                type="number"
                id="usage-limit-per-coupon"
                placeholder=" Usage limit per coupon"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="usage-limit-per-user"
                className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
              >
                Usage limit per user
              </label>
              <input
                type="number"
                id="usage-limit-per-user"
                placeholder="Usage limit per user"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="usage-limit-per-day"
                className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
              >
                Usage limit per day
              </label>
              <input
                type="number"
                id="usage-limit-per-day"
                placeholder="Usage limit per day"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )}
</div>

   </section>
    </div>
                    
              {/* ------------------comments--------------------- */}
              </section>
<section className='w-[100%] xl:w-[30%] mt-[40px]'>
<section className='border-[1px] border-[#eee] rounded-[5px]'>
  <div className="space-y-4 flex justify-start flex-col bg-white">
    <div className='border-b-[1px] px-[20px] py-[10px] border-[#eee]'>
      <h1 className='text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600'>Publish</h1>
    </div>
    <div className='px-[15px] py-[10px] space-y-4 flex justify-start flex-col'>
      {/* Status Section */}
      <div className="">
        <div className="flex items-center">
          <FaKey className="text-gray-500 mr-2" />
          <p className="text-sm text-gray-700">
            Visibility: <span className="font-semibold">{status}</span>
            <button
              onClick={() => {
                setPreviousStatus(status); // Store the current status before editing
                setIsEditingStatus(!isEditingStatus);
              }}
              className="text-brand_color text-sm ml-2 hover:underline"
            >
              Edit
            </button>
          </p>
        </div>
        {isEditingStatus && (
          <div className="ml-6">
            <div>
              <label className="block">
                <input
                  type="radio"
                  name="visibility"
                  value="Publish"
                  checked={status === "Publish"}
                  onChange={handleStatusChange}
                  className="mr-2 cursor-pointer"
                />
                Publish
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="visibility"
                  value="Password"
                  checked={status === "Password"}
                  onChange={handleStatusChange}
                  className="mr-2 cursor-pointer"
                />
                Password
              </label>
              {status === "Password" && (
                <input
                  type="text"
                  placeholder="Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="border p-2 h-[33px] 2xl:h-[39px] rounded text-[15px] outline-brand_color 2xl:text-[16px] w-full my-[4px]"
                />
              )}
              <label className="block">
                <input
                  type="radio"
                  name="visibility"
                  value="Private"
                  checked={status === "Private"}
                  onChange={handleStatusChange}
                  className="mr-2 cursor-pointer"
                />
                Private
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="visibility"
                  value="Draft"
                  checked={status === "Draft"}
                  onChange={handleStatusChange}
                  className="mr-2 cursor-pointer"
                />
                Draft
              </label>
            </div>
            <button
              onClick={() => setIsEditingStatus(false)}
              className="mt-2 bg-brand_color text-white px-3 py-1 rounded text-sm hover:bg-brand_color_hover"
            >
              Update
            </button>
            <button
              onClick={() => {
                setStatus(previousStatus); // Revert to the previous status
                setIsEditingStatus(false);
              }}
              className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Visibility Section */}
      <div className="flex items-center">
        <FaEye className="text-gray-500 mr-2" />
        <p className="text-sm text-gray-700">
          Authorized: <span className="font-semibold">{visibility}</span>
          <button
            onClick={() => {
              setPreviousVisibility(visibility); // Store the current visibility before editing
              setIsEditingVisibility(!isEditingVisibility);
            }}
            className="text-orange-500 text-sm ml-2 hover:underline"
          >
            Edit
          </button>
        </p>
      </div>
      {isEditingVisibility && (
        <div className="ml-6 mt-2 relative">
          {/* Dropdown Box */}
          <div
            className="border p-2 rounded text-sm w-full pl-2 pr-2 cursor-pointer flex items-center justify-between"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <span className="flex items-center justify-start gap-2">
              <span
                className={`w-2 h-2 rounded-full bg-${
                  options.find((opt) => opt.label === visibility)?.color
                }`}
              ></span>
              <span className={`text-${options.find((opt) => opt.label === visibility)?.color}`}>
                {visibility}
              </span>
            </span>
            <FaChevronDown
              className={`text-gray-500 transform mt-[2px] transition-transform ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Dropdown Options */}
          {dropdownOpen && (
            <ul
              className="absolute z-10 bg-white border mt-1 text-sm rounded w-full shadow"
              onMouseLeave={() => setHoveredItem(null)}
            >
              {options.map((option) => (
                <li
                  key={option.label}
                  onClick={() => {
                    setVisibility(option.label);
                    setDropdownOpen(false);
                  }}
                  onMouseEnter={() => setHoveredItem(option.label)}
                  className={`p-2 flex items-center text-${option.color} gap-2 cursor-pointer transition ${
                    hoveredItem === option.label
                      ? "bg-gray-100"
                      : visibility === option.label
                      ? `${option.bg}`
                      : ""
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full bg-${option.color}`}></span>
                  {option.label}
                </li>
              ))}
            </ul>
          )}

          {/* Action Buttons */}
          <button
            onClick={() => setIsEditingVisibility(false)}
            className="mt-2 bg-brand_color text-white px-3 py-1 rounded text-sm hover:bg-orange-500"
          >
            Update
          </button>
          <button
            onClick={() => {
              setVisibility(previousVisibility); // Revert to the previous visibility
              setIsEditingVisibility(false);
            }}
            className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Published Date Section */}
      <div className="flex items-center w-full">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <p className="text-sm text-gray-700">
          Publish Date:{" "}
          <span className="font-semibold">
            {`${publishedDate.getDate()}-${publishedDate.toLocaleString('default', { month: 'long' })}-${publishedDate.getFullYear()}`}
          </span>
          <button
            onClick={() => {
              setPreviousPublishedDate(publishedDate); // Store the current date before editing
              setIsEditingDate(!isEditingDate);
            }}
            className="text-orange-500 text-sm ml-2 hover:underline"
          >
            Edit
          </button>
        </p>
      </div>
      {isEditingDate && (
        <div className="ml-6 mt-2">
          <DatePicker
            selected={publishedDate}
            onChange={(date) => setPublishedDate(date)}
            className="border p-1 rounded text-sm w-full"
            dateFormat="dd-MMMM-yyyy"
          />
          <div>
            <button
              onClick={() => setIsEditingDate(false)}
              className="mt-2 bg-brand_color text-white px-3 py-1 rounded text-sm hover:bg-brand_color"
            >
              Update
            </button>
            <button
              onClick={() => {
                setPublishedDate(previousPublishedDate); // Revert to the previous date
                setIsEditingDate(false);
              }}
              className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Publish Button at the bottom */}
      <div className="w-full flex justify-end items-center">
        <button
          onClick={handleClick}
          className="mt-4 bg-brand_color text-white px-4 py-2 rounded text-sm hover:bg-orange-600"
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
</section>


</section>
              </form>
              </section>
        </section>
    </section>
  )
}

export default Bnewcoupon