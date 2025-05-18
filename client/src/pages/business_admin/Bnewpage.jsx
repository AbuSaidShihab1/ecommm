import React, { useContext, useEffect, useState,useRef} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import DatePicker from "react-datepicker"; // Importing the date picker
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "react-datepicker/dist/react-datepicker.css"; 
import { FaKey, FaEye, FaCalendarAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaCamera } from "react-icons/fa";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";
import { FaChevronDown } from "react-icons/fa"; // Import the arrow icon
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { IoIosArrowForward } from "react-icons/io";
const Bnewpage = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
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
//  ==========================permalink=======================
   const [pageTitle, setPageTitle] = useState("");
   const [full_slug,set_fullslug]=useState()
   const basePermalink = "https://ecom.weblasser.com/";
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const [permalink, setPermalink] = useState("current-slug"); // Actual slug
   const [tempPermalink, setTempPermalink] = useState(permalink); // Temporary slug for editing
   const [isEditingPermalink, setIsEditingPermalink] = useState(false); // Controls edit mode
   const generatePermalink = (title) => {
     const maxPermalinkLength = 40; // Limit for the permalink
     let permalink = title
       .trim()
       .toLowerCase()
       .replace(/\s+/g, "-") // Replace spaces with dashes
       .replace(/[^a-z0-9\-]/g, "");
       let permalink2 = title
       .trim()
       .toLowerCase()
       .replace(/\s+/g, "-") // Replace spaces with dashes
       .replace(/[^a-z0-9\-]/g, ""); // Remove non-alphanumeric characters
     // Truncate if the permalink is too long
     console.log(permalink)
     if (permalink.length > maxPermalinkLength) {
       const firstPart = permalink.slice(0, 20); // Start
       const lastPart = permalink.slice(-15); // End
       permalink = `${firstPart}...${lastPart}`;
     }
     set_fullslug(permalink2)
    
     return permalink;
   };
   const handleInputChange2 = (e) => {
     const title = e.target.value;
     setPageTitle(title);
     setPermalink(generatePermalink(title)); // Update permalink as title changes
   };
   const handleEdit = () => {
   setTempPermalink(permalink); // Set the temporary slug to the current slug
   setIsEditingPermalink(true); // Enable edit mode
   };
   const savePermalink = () => {
   setPermalink(tempPermalink); // Update the actual slug
   setIsEditingPermalink(false); // Disable edit mode
   };
   const cancelEdit = () => {
   setTempPermalink(permalink); // Revert to the original slug
   setIsEditingPermalink(false); // Disable edit mode
  };

//  ==========================permalink=======================
    const [content, setContent] = useState(''); // State for editor content
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
  const [visibilityOption, setVisibilityOption] = useState("Public");
  const [passwordInput, setPasswordInput] = useState("");
  const [isCodeView, setIsCodeView] = useState(false); // Flag to toggle between code view and rich text view
  const [previousStatus, setPreviousStatus] = useState(status);
  const [previousVisibility, setPreviousVisibility] = useState(visibility);
  const [previousPublishedDate, setPreviousPublishedDate] = useState(publishedDate);
  const handleStatusChange = (e) => {
  const value = e.target.value;
  setStatus(value);

  // Reset `visibilityOption` if it's a different status
  if (value !== "Password Protected") {
    setVisibilityOption("");
  }
  };
  // Function to update the content in the text editor and sync it to code editor
// ------------image upload popup------
   const [profileImage, setProfileImage] = useState("");
   const [activeTab, setActiveTab] = useState("library"); // 
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [uploadedImages, setUploadedImages] = useState([]); // List of uploaded images
   const [searchTerm, setSearchTerm] = useState(""); // Search term
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
  const removeImage = () => {
    setProfileImage(null);
  };

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
              <h1 className='text-[20px] font-[600] mb-[8px]'>New Page</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Pages</li>
            <li><IoIosArrowForward/></li>
            <li>New Page</li>
          </ul>
                 </div>
                     {/* <div>
                        <button className='border-[2px] border-brand_color text-brand_color px-[20px] py-[8px] text-[16px] rounded-[5px]'>Import</button>
                     </div> */}
       </div>
              <section className='flex justify-center w-full flex-col lg:flex-row gap-[20px] mt-[20px]'>
                <section className='w-full lg:w-[75%] h-auto '>
                      <div action=""className='mt-[20px]'>
                      <div className="w-[100%] space-y-4 mb-[15px]">
  {/* Page Title Input */}
  <div>
    {/* Title Input */}
    <label
      htmlFor="page-title"
      className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
    >
      New Title
    </label>
    <input
      type="text"
      id="page-title"
      placeholder="New Title"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      value={pageTitle}
      onChange={handleInputChange2}
    />

    {/* Permalink Section */}
    {pageTitle && (
      <div className="mt-2 text-sm text-gray-500 flex justify-start items-center gap-[5px]">
        <label className="font-medium">Permalink:</label>{" "}
        {isEditingPermalink ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tempPermalink} // Temporary slug for editing
              onChange={(e) => setTempPermalink(e.target.value)} // Update temporary slug
              className="main_input border-[1px] border-gray-300 rounded px-2 py-1 text-gray-700 w-full"
            />
            <div
              onClick={savePermalink}
              className="bg-orange-600 text-white cursor-pointer px-3 py-1 rounded text-sm hover:bg-orange-700"
            >
              OK
            </div>
            <div
              onClick={cancelEdit}
              className="bg-gray-500 text-white cursor-pointer px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <a
              href={`${basePermalink + full_slug}`}
              target="_blank"
              className="text-brand_color underline"
            >
              {basePermalink + permalink}
            </a>
            <div
              onClick={handleEdit}
              className="bg-orange-600 text-white px-3 cursor-pointer py-1 rounded text-sm hover:bg-orange-700"
            >
              Edit
            </div>
          </div>
        )}
      </div>
    )}
  </div>
</div>
                       
                           <div className='w-[100%]  mb-[20px]'>
                            <label htmlFor=""className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-500'>Description</label>
<div className='mt-[3px] 2xl:mt-[7px]'>
<SunEditor
            setContents={content}
            onChange={setContent}
            setOptions={{
              width: "100%",
              height: 400,
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
                        </div>
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
                                    {/* --------------------publish--------------- */}
                          {/* -------------file upload---------------- */}
     {/* -------------file upload---------------- */}
   <div className="relative w-full h-40 mt-[10px] mb-[10px] group">
      {/* Profile Image Section */}
      <div className="w-full h-full rounded-[5px] overflow-hidden border-2 border-dashed border-brand_color">
        {profileImage ? (
         <>
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center gap-[5px]'>
          <label
        htmlFor="profileImageInput"
        onClick={togglePopup}
        className=" group-hover:block hidden bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
      >
        <FaCamera className="w-4 h-4" />
      </label>
          <button
              onClick={removeImage}
              className="group-hover:block hidden bg-red-500text-white bg-red-500 p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
            >
              <RiDeleteBin5Line   className="w-4 h-4 text-white" />
            </button>
      
          </div>
           
            {/* <div className='w-full h-full absolute top-0 flex justify-center items-center left-0'>
     <label
        htmlFor="profileImageInput"
        onClick={togglePopup}
        className=" group-hover:block hidden bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
      >
        <FaCamera className="w-4 h-4" />
      </label>
     </div> */}
         </>
        ) : (
          <div className="flex items-center justify-center flex-col w-full h-full bg-gray-200 text-gray-500">
             <div className='flex justify-center items-center gap-[5px]'>
             <label
        htmlFor="profileImageInput"
        onClick={togglePopup}
        className="  bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
      >
        <FaCamera className="w-4 h-4" />
               </label>
               <button
              onClick={removeImage}
              className=" bg-red-500 text-white  p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
            >
              <RiDeleteBin5Line   className="w-4 h-4 text-white" />
            </button>
             </div>
            <p className='text-[14px] 2xl:text-[15px] mt-[5px]'><span>1200px X 600px</span></p>
        
          </div>
        )}
      </div>

      {/* Camera Icon Button */}
     

      {/* Popup */}
{  isPopupOpen && (
      <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b  border-gray-300">
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
              className={`w-1/2 py-2 text-center  ${
                activeTab === "library"
                  ? "border-b-2 border-brand_color text-brand_color cursor-pointer font-semibold"
                  : "text-gray-600 hover:text-brand_color cursor-pointer"
              }`}
            >
              Media Library
            </div>
            <div
              onClick={() => setActiveTab("upload")}
              className={`w-1/2 py-2 text-center ${
                activeTab === "upload"
                  ? "border-b-2 border-brand_color text-brand_color cursor-pointer font-semibold"
                  : "text-gray-600 hover:text-brand_color cursor-pointer"
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




   
</section>
              </section>
              </section>
        </section>
    </section>
  )
}

export default Bnewpage