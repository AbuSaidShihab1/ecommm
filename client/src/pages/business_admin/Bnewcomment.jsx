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
import { FaChevronDown } from "react-icons/fa"; // Import the arrow icon
import { FaCommentDots } from "react-icons/fa6";
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
import { CgClose } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
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
const Bnewcomment = () => {
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
const handleStatusChange = (e) => {
  const value = e.target.value;
  setStatus(value);

  // Reset `visibilityOption` if it's a different status
  if (value !== "Password Protected") {
    setVisibilityOption("");
  }
};

const handleVisibilityOptionChange = (e) => {
  const value = e.target.value;
  setVisibilityOption(value);
  if (value === "Password Protected") {
    setStatus("Password Protected");
  }
};
// -----------------review-box---------------------
const [rating, setRating] = useState(3.3);
const [hoverRating, setHoverRating] = useState(0);
const [review, setReview] = useState("This was nice in buy. This was nice in buy. This was nice in buy. This was nice in buy. This was nice in buy. This was nice in buy. This was nice in buy. This was nice in buy.");
  // States to toggle input boxes
  // States to toggle input boxes
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [status, setStatus] = useState("Publish");
  const [isEditingVisibility, setIsEditingVisibility] = useState(false);
  const [visibility, setVisibility] = useState("Approved");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [publishedDate, setPublishedDate] = useState(new Date("2024-01-16"));
    const options = [
      { label: "Approved", color: "green-500", bg: "green-100" },
      { label: "Pending", color: "orange-500", bg: "orange-100" },
      { label: "Rejected", color: "red-500", bg: "red-100" },
    ];
  // -=--------------------visibility--------------
    const [buttonText, setButtonText] = useState("Publish");
    const handleClick = () => {
    setButtonText("Update"); // Change the button text
    };
    const [visibilityOption, setVisibilityOption] = useState("Publish");
    const [passwordInput, setPasswordInput] = useState("");
    const [previousStatus, setPreviousStatus] = useState(status);
    const [previousVisibility, setPreviousVisibility] = useState(visibility);
    const [previousPublishedDate, setPreviousPublishedDate] = useState(publishedDate);
  
  const [isEditingPublishStatus, setIsEditingPublishStatus] = useState(false);
  const [publishStatus, setPublishStatus] = useState("Publish");
  const [createTime, setCreateTime] = useState("08:20 PM");
  

   const [dropdownOpen, setDropdownOpen] = useState(false);
   const comment_name="Abu Said Shihab Moni Moni mOni";
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
              <h1 className='text-[20px] font-[600] mb-[8px]'>Edit Post Comment 
              </h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Contents</li>
            <li><IoIosArrowForward/></li>
            <li>Edit Post Comment 
            </li>
          </ul>
                 </div>
                     {/* <div>
                        <button className='border-[2px] border-brand_color text-brand_color px-[20px] py-[8px] text-[16px] rounded-[5px]'>Import</button>
                     </div> */}
       </div>
              <form  onSubmit={handleSubmit} className='flex justify-center w-full flex-col xl:flex-row gap-[20px] mt-[20px]'>
                <section className='w-full xl:w-[70%] h-auto  '>
                <div className="border-[1px] border-[#eee] shadow-sm mb-[20px]">
                  <div className='px-[20px] py-[10px] border-b-[1px] border-[#eee]'>
        <h1 className='text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600 '>Author</h1>

                  </div>
      <div className="w-[100%] mb-[15px] p-[20px] ">
        {/* Page Title Input */}
        <div>
          <label
            htmlFor="page-title"
            className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
          >
            Name
          </label>
          <input
            type="text"
            id="page-title"
            placeholder="Name"
            value="Abu Said Shihab"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
          />
        </div>
        <div className='mt-[10px]'>
          <label
            htmlFor="page-title"
            className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
          >
            Email
          </label>
          <input
            type="text"
            id="page-title"
            placeholder="Email"
            value="shihabmoni@gmail.com"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
          />
        </div>
        <div className='mt-[10px]'>
          <label
            htmlFor="page-title"
            className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600"
          >
            URL
          </label>
          <input
            type="text"
            id="page-title"
            placeholder=""
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
          />
        </div>
      </div>

{/* 
      <div className="w-[100%] mb-[20px]">
        <label htmlFor="description" className="text-[16px] text-gray-600">
          Bottom Content <span className="text-red-500">*</span>
        </label>
        <div className="w-full mt-[8px]">
        <SunEditor
            setContents={content2}
            onChange={setContent2}
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
        </div>
      </div> */}
  

    
    </div>
    {/* ==================review-box======================= */}
    <div className="w-full border-[1px] border-[#eee]  shadow-sm bg-white ">
    <div className='px-[20px] py-[10px] border-b-[1px] border-[#eee]'>
        <h1 className='text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600 '>Comment </h1>

                  </div>
      {/* Star Rating */}
     <div className='px-[20px] py-[8px]  border-b-[1px] border-[#eee] flex justify-start items-center gap-[5px]'>
     <h3 className="text-[14px] 2xl:text-[19px] font-[400] mb-[7px]">Rating :</h3>
      <div className="flex items-center mb-[10px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-[14px] 2xl:text-[18px] transition-colors duration-200 ${
              (hoverRating || rating) >= star ? "text-orange-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
     </div>

      {/* Review Heading */}

      {/* Review Text Area */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full px-[20px] py-[10px]  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-700 text-sm"
        rows="4"
      />
    </div>
              {/* ------------------comments--------------------- */}
              </section>
<section className='w-[100%] xl:w-[30%]'>
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
                <p className="text-sm text-gray-600 flex justify-start items-center gap-[8px] text-nowrap">
                <FaCommentDots className='text-[18px]'/>
     <p className='text-nowrap'> In Response to:
      {
        comment_name.length > 15 ?  <span className='font-semibold ml-[5px]'>{comment_name.slice(0,15)}..</span>:<span className='font-semibold ml-[5px]'>{comment_name}</span>
      }
    </p>
    </p>
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

export default Bnewcomment