import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import DatePicker from "react-datepicker";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { FaCamera } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css"; 
import { FaKey, FaEye, FaCalendarAlt } from "react-icons/fa";
import axios from 'axios';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import 'swiper/css';
import 'swiper/css/pagination';
import { IoIosArrowForward } from "react-icons/io";

const Newcountry = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [showmodal, setmodal] = useState(false);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  
  // Form states
  const [formData, setFormData] = useState({
    countryName: "",
    description: "",
    status: "Publish",
    visibility: "Approved",
    publishedDate: new Date(),
    image: null
  });
  
  const [errors, setErrors] = useState({
    countryName: "",
    description: "",
    image: ""
  });
  
  // Loading and toast states
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  
  // Image upload states
  const [activeTab, setActiveTab] = useState("library");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [currentImageType, setCurrentImageType] = useState('favicon');
  
  // UI states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingVisibility, setIsEditingVisibility] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [previousStatus, setPreviousStatus] = useState("Publish");
  const [previousVisibility, setPreviousVisibility] = useState("Approved");
  const [previousPublishedDate, setPreviousPublishedDate] = useState(new Date());
  const [buttonText, setButtonText] = useState("Publish");
  
  const options = [
    { label: "Approved", color: "green-500", bg: "green-100" },
    { label: "Pending", color: "orange-500", bg: "orange-100" },
    { label: "Rejected", color: "red-500", bg: "red-100" },
  ];

  // Editor ref
  const editor = useRef(null);
  const [content, setContent] = useState("");
  
  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`);
      if (fetchResponse.data.images) {
        setUploadedImages(fetchResponse.data.images);
      }
    };
    fetchImages();
  }, []);
  
  // Handle scroll for topbar
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      countryName: "",
      description: "",
      image: ""
    };
    
    if (!formData.countryName.trim()) {
      newErrors.countryName = "Country name is required";
      isValid = false;
    }
    
    if (!content.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    
    if (!formData.image) {
      newErrors.image = "Image is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Handle status change
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      status: value
    });
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setErrors({ ...errors, image: 'Only image files are allowed' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: 'File size must be less than 5MB' });
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const uploadResponse = await axios.post(`${base_url}/api/upload/image/admin-upload-image/${admin_info._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (uploadResponse.data.imagePath) {
        const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`);
        if (fetchResponse.data.images) {
          setUploadedImages(fetchResponse.data.images);
          setActiveTab("library");
        }
      }
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, image: 'Error uploading file' });
    }
  };

  // Select image from library
  const selectImage = (img) => {
    setFormData({
      ...formData,
      image: `http://localhost:8080/uploads/${admin_info?._id}/${img}`
    });
    setIsPopupOpen(false);
    setErrors({
      ...errors,
      image: ""
    });
  };

  // Remove image
  const removeImage = () => {
    setFormData({
      ...formData,
      image: null
    });
    setErrors({
      ...errors,
      image: "Image is required"
    });
  };

  // Toggle sidebar
  const handlesidebar = () => {
    setactivesidebar(!activesidebar);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare the data object
      const countryData = {
        countryName: formData.countryName,
        description: content, // Using the content from SunEditor
        status: formData.status,
        visibility: formData.visibility,
        image: formData.image, // This should be the image path/URL
        admin_id: admin_info._id // Include admin ID
      };
      
      const response = await axios.post(`${base_url}/super/admin/country`, countryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setToastMessage("Country added successfully!");
      setToastType("success");
      setButtonText("Update");
      
      // Optionally reset form after successful submission
      // setFormData({
      //   countryName: "",
      //   description: "",
      //   status: "Publish",
      //   visibility: "Approved",
      //   publishedDate: new Date(),
      //   image: null
      // });
      // setContent("");
      
      // Navigate or refresh data as needed
      // navigate('/countries');
      
    } catch (error) {
      setToastMessage(
        error.response?.data?.message || 
        "Failed to add country. Please try again."
      );
      setToastType("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
    }
  };

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      {/* Sidebar */}
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      
      {/* Main Content */}
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="w-[60px] h-[60px] relative">
              <div className="absolute inset-0 rounded-full border-[6px] border-t-transparent border-white animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-[4px] border-t-transparent border-brand_color animate-spin-reverse"></div>
            </div>
          </div>
        )}
        
        {/* Toast Notification */}
        {toastMessage && (
          <div 
            className={`fixed top-6 right-6 z-[1000000] flex items-center gap-4 px-6 py-4 rounded-lg shadow-lg text-white font-medium transition-all duration-300 animate-fade-in
              ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            <span>{toastMessage}</span>
            <button 
              onClick={() => setToastMessage('')} 
              className="text-white text-xl leading-none hover:text-gray-200 transition"
            >
              &times;
            </button>
          </div>
        )}
        
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[10px] xl:px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] font-[600] mb-[8px]'>New Country</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Setting</li>
                <li><IoIosArrowForward /></li>
                <li>New Country</li>
              </ul>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className='flex justify-center w-full flex-col xl:flex-row gap-[20px] mt-[20px]'>
            {/* Left Section */}
            <section className='w-full xl:w-[70%] h-auto'>
              <div className="mt-[20px]">
                <div className="w-[100%] space-y-[5px] mb-[15px]">
                  {/* Country Name Input */}
                  <div>
                    <label
                      htmlFor="countryName"
                      className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                    >
                      New Country
                    </label>
                    <input
                      type="text"
                      id="countryName"
                      name="countryName"
                      placeholder="New Country"
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.countryName ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                      value={formData.countryName}
                      onChange={handleInputChange}
                    />
                    {errors.countryName && <p className="text-red-500 text-sm">{errors.countryName}</p>}
                  </div>
                </div>

                {/* Description */}
                <div className="w-[100%] mb-[20px]">
                  <label htmlFor="description" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                    Description
                  </label>
                  <div className="w-full mt-[3px] 2xl:mt-[8px]">
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
                    />
                  </div>
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
              </div>
            </section>
            
            {/* Right Section */}
            <section className='w-[100%] xl:w-[30%]'>
              {/* Publish Section */}
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
                          Visibility: <span className="font-semibold">{formData.status}</span>
                          <button
                            onClick={() => {
                              setPreviousStatus(formData.status);
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
                                checked={formData.status === "Publish"}
                                onChange={handleStatusChange}
                                className="mr-2 cursor-pointer"
                              />
                              Publish
                            </label>
                            <label className="block">
                              <input
                                type="radio"
                                name="visibility"
                                value="Private"
                                checked={formData.status === "Private"}
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
                                checked={formData.status === "Draft"}
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
                              setFormData({...formData, status: previousStatus});
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
                        Authorized: <span className="font-semibold">{formData.visibility}</span>
                        <button
                          onClick={() => {
                            setPreviousVisibility(formData.visibility);
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
                        <div
                          className="border p-2 rounded text-sm w-full pl-2 pr-2 cursor-pointer flex items-center justify-between"
                          onClick={() => setDropdownOpen((prev) => !prev)}
                        >
                          <span className="flex items-center justify-start gap-2">
                            <span
                              className={`w-2 h-2 rounded-full bg-${
                                options.find((opt) => opt.label === formData.visibility)?.color
                              }`}
                            ></span>
                            <span className={`text-${options.find((opt) => opt.label === formData.visibility)?.color}`}>
                              {formData.visibility}
                            </span>
                          </span>
                          <FaChevronDown
                            className={`text-gray-500 transform mt-[2px] transition-transform ${
                              dropdownOpen ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </div>

                        {dropdownOpen && (
                          <ul
                            className="absolute z-10 bg-white border mt-1 text-sm rounded w-full shadow"
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            {options.map((option) => (
                              <li
                                key={option.label}
                                onClick={() => {
                                  setFormData({...formData, visibility: option.label});
                                  setDropdownOpen(false);
                                }}
                                onMouseEnter={() => setHoveredItem(option.label)}
                                className={`p-2 flex items-center text-${option.color} gap-2 cursor-pointer transition ${
                                  hoveredItem === option.label
                                    ? "bg-gray-100"
                                    : formData.visibility === option.label
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

                        <button
                          onClick={() => setIsEditingVisibility(false)}
                          className="mt-2 bg-brand_color text-white px-3 py-1 rounded text-sm hover:bg-orange-500"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            setFormData({...formData, visibility: previousVisibility});
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
                          {`${formData.publishedDate.getDate()}-${formData.publishedDate.toLocaleString('default', { month: 'long' })}-${formData.publishedDate.getFullYear()}`}
                        </span>
                        <button
                          onClick={() => {
                            setPreviousPublishedDate(formData.publishedDate);
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
                          selected={formData.publishedDate}
                          onChange={(date) => setFormData({...formData, publishedDate: date})}
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
                              setFormData({...formData, publishedDate: previousPublishedDate});
                              setIsEditingDate(false);
                            }}
                            className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Publish Button */}
                    <div className="w-full flex justify-end items-center">
                      <button
                        type="submit"
                        className="mt-4 bg-brand_color text-white px-4 py-2 rounded text-sm hover:bg-orange-600"
                      >
                        {buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Image Upload Section */}
              <div className="relative w-full h-40 mt-[10px] mb-[10px] group">
                <div className="relative w-full h-40 mt-[10px] mb-[10px] group">
                  <div className={`w-full h-full rounded-[5px] overflow-hidden border-2 ${errors.image ? 'border-red-500' : 'border-dashed border-brand_color'}`}>
                    {formData.image ? (
                      <>
                        <img
                          src={formData.image}
                          alt="Country"
                          className="w-full h-full object-cover"
                        />
                        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center gap-[5px]'>
                          <label
                            htmlFor="profileImageInput"
                            onClick={() => setIsPopupOpen(true)}
                            className="group-hover:block hidden bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
                          >
                            <FaCamera className="w-4 h-4" />
                          </label>
                          <button
                            onClick={removeImage}
                            className="group-hover:block hidden bg-red-500 text-white p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
                          >
                            <RiDeleteBin5Line className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center flex-col w-full h-full bg-gray-200 text-gray-500">
                        <div className='flex justify-center items-center gap-[5px]'>
                          <label
                            htmlFor="profileImageInput"
                            onClick={() => setIsPopupOpen(true)}
                            className="bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
                          >
                            <FaCamera className="w-4 h-4" />
                          </label>
                          <button
                            onClick={removeImage}
                            className="bg-red-500 text-white p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
                          >
                            <RiDeleteBin5Line className="w-4 h-4" />
                          </button>
                        </div>
                        <p className='text-[14px] 2xl:text-[15px] mt-[5px]'><span>1200px X 600px</span></p>
                      </div>
                    )}
                  </div>
                </div>
                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
              </div>
              
              {/* Image Upload Popup */}
              {isPopupOpen && (
                <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg w-[97%] xl:w-[75%] 2xl:w-[60%]">
                    <div className="p-4 flex justify-between items-center border-b border-gray-300">
                      <h2 className="text-lg font-semibold">Upload Images</h2>
                      <button onClick={() => setIsPopupOpen(false)} className="text-gray-600 hover:text-gray-800">
                        ✕
                      </button>
                    </div>

                    <div className="flex w-full border-b border-gray-300 ">
                      <div
                        onClick={() => setActiveTab("library")}
                        className={`w-1/2 py-2 text-center ${activeTab === "library"
                          ? "border-b-2 border-brand_color text-brand_color font-semibold"
                          : "text-gray-600 hover:text-brand_color"
                          }`}
                      >
                        Media Library
                      </div>
                      <div
                        onClick={() => setActiveTab("upload")}
                        className={`w-1/2 py-2 text-center ${activeTab === "upload"
                          ? "border-b-2 border-brand_color text-brand_color font-semibold"
                          : "text-gray-600 hover:text-brand_color"
                          }`}
                      >
                        Upload New
                      </div>
                    </div>

                    <div className="p-4 w-full h-[400px] overflow-y-auto">
                      {activeTab === "upload" && (
                        <div>
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
                        <div className='w-full'>
                          <div className="w-full flex flex-wrap gap-[10px]">
                            {uploadedImages.map((image) => (
                              <div key={image}>
                                <img
                                  src={`http://localhost:8080/uploads/${admin_info?._id}/${image}`}
                                  alt={image}
                                  className="border rounded w-[80px] lg:w-[100px] h-[80px] lg:h-[100px] cursor-pointer"
                                  onClick={() => selectImage(image)}
                                />
                              </div>
                            ))}
                            {uploadedImages.length === 0 && (
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
            </section>
          </form>
        </section>
      </section>
    </section>
  );
}

export default Newcountry;