import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import { FaTrophy } from "react-icons/fa";
import DatePicker from "react-datepicker";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { FaCamera } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
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
import { CgClose } from "react-icons/cg";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,Legend, PieChart,
  Cell,
  ResponsiveContainer,BarChart,Bar,Pie} from "recharts"
import { Pagination } from 'swiper/modules';
import { IoIosArrowForward } from "react-icons/io";

const Newtimezone = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const [showmodal, setmodal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
   // State for UI controls
   const [isEditingStatus, setIsEditingStatus] = useState(false);
   const [isEditingVisibility, setIsEditingVisibility] = useState(false);
   const [isEditingDate, setIsEditingDate] = useState(false);
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const [hoveredItem, setHoveredItem] = useState(null);
  // Form state
  const [formData, setFormData] = useState({
    timezoneName: '',
    description: '',
    status: 'Publish',
    visibility: 'Approved',
    publishedDate: new Date()
  });
  
  const [errors, setErrors] = useState({
    timezoneName: '',
    description: ''
  });

  // Toast notification timeout
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Validation function
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      timezoneName: '',
      description: ''
    };

    if (!formData.timezoneName.trim()) {
      newErrors.timezoneName = 'Timezone name is required';
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post(`${base_url}/super/admin/timezone`, {
        timezoneName: formData.timezoneName,
        description: formData.description,
        status: formData.status,
        visibility: formData.visibility,
        admin_id: admin_info._id
      });

      setToastMessage('Timezone created successfully!');
      setToastType('success');
      
      // Reset form after successful submission
      setFormData({
        timezoneName: '',
        description: '',
        status: 'Publish',
        visibility: 'Approved',
        publishedDate: new Date()
      });
    
    } catch (error) {
      console.error('Error creating timezone:', error);
      setToastMessage(error.response?.data?.message || 'Failed to create timezone');
      setToastType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle editor content change
  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      description: content
    });
    
    // Clear error when user starts typing
    if (errors.description) {
      setErrors({
        ...errors,
        description: ''
      });
    }
  };

  // Handle status change
  const handleStatusChange = (value) => {
    setFormData({
      ...formData,
      status: value
    });
  };

  // Handle visibility change
  const handleVisibilityChange = (value) => {
    setFormData({
      ...formData,
      visibility: value
    });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      publishedDate: date
    });
  };

  // ... (keep all your existing useEffect and other helper functions)

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      {/* Loading overlay */}
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

      {/* Rest of your component */}
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside/>
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
        <section className='w-[100%]  m-auto py-[20px] xl:py-[40px] px-[10px] xl:px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] font-[600] mb-[8px]'>New Timezone</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward/></li>
                <li>Setting</li>
                <li><IoIosArrowForward/></li>
                <li>New Timezone</li>
              </ul>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className='flex justify-center w-full flex-col xl:flex-row gap-[20px] mt-[20px]'>
            <section className='w-full xl:w-[70%] h-auto'>
              <div className="mt-[20px]">
                <div className="w-[100%] space-y-[5px] mb-[15px]">
                  {/* Timezone Name Input */}
                  <div>
                    <label
                      htmlFor="timezoneName"
                      className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="timezoneName"
                      name="timezoneName"
                      placeholder="Timezone Name"
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.timezoneName ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                      value={formData.timezoneName}
                      onChange={handleInputChange}
                    />
                    {errors.timezoneName && <p className="text-red-500 text-sm">{errors.timezoneName}</p>}
                  </div>
                </div>

                {/* Description */}
                <div className="w-[100%] mb-[20px]">
                  <label htmlFor="description" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                    Description
                  </label>
                  <div className="w-full mt-[3px] 2xl:mt-[8px]">
                    <SunEditor
                      setContents={formData.description}
                      onChange={handleEditorChange}
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
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                  </div>
                </div>
              </div>
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
                          Visibility: <span className="font-semibold">{formData.status}</span>
                          <button
                            onClick={() => setIsEditingStatus(!isEditingStatus)}
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
                                onChange={() => handleStatusChange("Publish")}
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
                                onChange={() => handleStatusChange("Private")}
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
                                onChange={() => handleStatusChange("Draft")}
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
                          onClick={() => setIsEditingVisibility(!isEditingVisibility)}
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
                                  handleVisibilityChange(option.label);
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
                          onClick={() => setIsEditingVisibility(false)}
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
                          onClick={() => setIsEditingDate(!isEditingDate)}
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
                          onChange={handleDateChange}
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
                            onClick={() => setIsEditingDate(false)}
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
                        type="submit"
                        className="mt-4 bg-brand_color text-white px-4 py-2 rounded text-sm hover:bg-orange-600"
                      >
                        Publish
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

export default Newtimezone;