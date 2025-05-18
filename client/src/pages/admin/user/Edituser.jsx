import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import axios from 'axios';

const Edituser = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
      const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const admin_token = localStorage.getItem("adminToken")

  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  // User data state
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    username: '',
    email: '',
    phone: '',
    profileImage: '',
    accessLevel: '',
    customPermissions: {}
  });
  
  const [profileImage, setProfileImage] = useState("https://i.ibb.co.com/HBsfNMb/avatar.jpg");
  const [isCustomUserEnabled, setIsCustomUserEnabled] = useState(false);
  const [searchTerm2, setSearchTerm2] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [designationInput, setDesignationInput] = useState('');
  const [designationSuggestions, setDesignationSuggestions] = useState([]);
  const [showDesignationSuggestions, setShowDesignationSuggestions] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const user_access_data = [
    { id: 1, name: "Administration" },
    { id: 2, name: "Sales Manager" },
    { id: 3, name: "Marketing Manager" },
  ];

  const suggestions = ['Marketer', 'Manager', 'Developer', 'Designer', 'Consultant'];

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${base_url}/super/admin/single-user/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin_token}` // Assuming you store token in localStorage
        }
      });
        const user = response.data.data;
        
        setUserData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          designation: user.designation || '',
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
          profileImage: user.profileImage || "https://i.ibb.co.com/HBsfNMb/avatar.jpg",
          accessLevel: user.accessLevel || '',
          customPermissions: user.customPermissions || {}
        });

        setProfileImage(user.profileImage || "https://i.ibb.co.com/HBsfNMb/avatar.jpg");
        setDesignationInput(user.designation || '');
        setSearchTerm2(user.accessLevel || '');
        setIsCustomUserEnabled(user.accessLevel === 'custom');
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        setToastMessage('Failed to fetch user data');
        setToastType('error');
        setTimeout(() => setToastMessage(''), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setUserData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle user access input
  const handleAccessInputChange = (e) => {
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

  // Handle suggestion selection for user access
  const handleSuggestionClick = (name) => {
    setSearchTerm2(name);
    setFilteredSuggestions([]);
    setUserData(prev => ({
      ...prev,
      accessLevel: name
    }));
    setIsCustomUserEnabled(false);
  };

  // Handle designation input changes
  const handleDesignationChange = (e) => {
    const value = e.target.value;
    setDesignationInput(value);
    setUserData(prev => ({
      ...prev,
      designation: value
    }));

    const filtered = suggestions.filter((sugg) =>
      sugg.toLowerCase().startsWith(value.toLowerCase())
    );
    setDesignationSuggestions(filtered);
    setShowDesignationSuggestions(true);
  };

  const handleSuggestionSelect = (value) => {
    setDesignationInput(value);
    setUserData(prev => ({
      ...prev,
      designation: value
    }));
    setShowDesignationSuggestions(false);
  };

  // Toggle custom user access
  const toggleCustomUserAccess = () => {
    const newValue = !isCustomUserEnabled;
    setIsCustomUserEnabled(newValue);
    setSearchTerm2(newValue ? "" : userData.accessLevel);
    setUserData(prev => ({
      ...prev,
      accessLevel: newValue ? 'custom' : searchTerm2
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password validation
    if (password && password !== confirmPassword) {
      setToastMessage('Passwords do not match');
      setToastType('error');
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }

    setIsLoading(true);
    
    try {
      const dataToSend = {
        ...userData,
        password: password || undefined, // Only send password if it was changed
        customPermissions: isCustomUserEnabled ? userData.customPermissions : undefined
      };

      const response = await axios.put(`${base_url}/super/admin/update-user/${id}`, dataToSend,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin_token}` // Assuming you store token in localStorage
        }
      });
      
      setToastMessage('User updated successfully');
      setToastType('success');
      setTimeout(() => setToastMessage(''), 3000);
      
      // Optionally navigate back or refresh data
      // navigate('/users');
      
    } catch (error) {
      console.error('Error updating user:', error);
      setToastMessage(error.response?.data?.message || 'Failed to update user');
      setToastType('error');
      setTimeout(() => setToastMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle draft save
  const handleDraft = () => {
    // Implement draft functionality if needed
    setToastMessage('Draft saved');
    setToastType('success');
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Image upload popup state and functions
  const [activeTab, setActiveTab] = useState("library");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

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

  const selectImage = (image) => {
    setProfileImage(image.src);
    setUserData(prev => ({
      ...prev,
      profileImage: image.src
    }));
    setIsPopupOpen(false);
  };

  const filteredImages = uploadedImages.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle checkbox changes for custom permissions
  const handleCheckboxChange = (module, permission, value) => {
    setUserData(prev => ({
      ...prev,
      customPermissions: {
        ...prev.customPermissions,
        [module]: {
          ...prev.customPermissions[module],
          [permission]: value
        }
      }
    }));
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  function handlesidebar() {
    setactivesidebar(!activesidebar);
  }

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

      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>{userData.firstName} {userData.lastName}</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Users</li>
                <li><IoIosArrowForward /></li>
                <li>{userData.firstName} {userData.lastName}</li>
              </ul>
            </div>
          </div>

          {/* Edit User Form */}
          <section className='pt-[40px] pb-[30px]'>
            <form onSubmit={handleSubmit} className='pt-[15px] lg:pt-[20px]'>
              {/* Profile Image */}
              <div className="relative w-40 h-40 mb-[30px]">
                <div className="w-full h-full rounded-[10px] overflow-hidden border-2 border-gray-300">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="profileImageInput"
                  onClick={togglePopup}
                  className="absolute bottom-1 right-2 bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-500"
                >
                  <FaCamera className="w-4 h-4" />
                </label>
                <input
                  type="file"
                  id="profileImageInput"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Image Upload Popup */}
              {isPopupOpen && (
                <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
                    <div className="p-4 flex justify-between items-center border-b border-gray-300">
                      <h2 className="text-lg font-semibold">Upload Images</h2>
                      <button onClick={togglePopup} className="text-gray-600 hover:text-gray-800">✕</button>
                    </div>

                    <div className="flex border-b border-gray-300">
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

                    <div className="p-4">
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
                        <div>
                          <div className="mb-6 flex justify-end">
                            <input
                              type="text"
                              placeholder="Search by name"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-[80%] lg:w-[50%] border rounded px-4 py-2 text-sm border-gray-300 focus:outline-none focus:ring focus:ring-orange-200"
                            />
                          </div>

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
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="firstName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">First Name</label>
                  <input 
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder='First Name'
                    value={userData.firstName}
                    onChange={handleInputChange}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="lastName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Last Name</label>
                  <input 
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder='Last Name'
                    value={userData.lastName}
                    onChange={handleInputChange}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
                </div>
              </div>

              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]'>
                <div className='w-full relative'>
                  <label htmlFor="designation" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Designation</label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    placeholder="Designation"
                    value={designationInput}
                    onChange={handleDesignationChange}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
                  {showDesignationSuggestions && designationSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-[150px] overflow-y-auto">
                      {designationSuggestions.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionSelect(item)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]'>
                <div className='w-[100%]'>
                  <label htmlFor="username" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Username</label>
                  <input 
                    type="text"
                    id="username"
                    name="username"
                    placeholder='Username'
                    value={userData.username}
                    onChange={handleInputChange}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
                </div>
              </div>

              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]'>
                <div className='w-[100%]'>
                  <label htmlFor="email" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Email</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Email'
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
                </div>
              </div>

              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]'>
                <div className='w-[100%]'>
                  <label htmlFor="phone" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Phone</label>
                  <input 
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder='Phone'
                    value={userData.phone}
                    onChange={handleInputChange}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
                </div>
              </div>

              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:flex-row flex-col'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="password" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Password</label>
                  <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="confirmPassword" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Confirm Password</label>
                  <input 
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
                </div>
              </div>

              {/* User Access */}
              <div className="mb-4 relative">
                <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                  User Access
                </label>
                <input
                  type="text"
                  placeholder="User Access"
                  value={searchTerm2}
                  onChange={handleAccessInputChange}
                  disabled={isCustomUserEnabled}
                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] px-[10px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] ${
                    isCustomUserEnabled ? "bg-gray-200 cursor-not-allowed" : ""
                  }`}
                />

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

              {/* Custom User Access Checkbox */}
              <div className="mt-4">
                <label className="inline-flex items-center text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={isCustomUserEnabled}
                    onChange={toggleCustomUserAccess}
                  />
                  Enable Custom User Access
                </label>
              </div>

              {/* Custom Permissions Table */}
              {isCustomUserEnabled && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 text-sm text-center">
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
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">View List</th>
                        <th className="border border-gray-300 p-2">Select All</th>
                        <th className="border border-gray-300 p-2">View</th>
                        <th className="border border-gray-300 p-2">Edit</th>
                        <th className="border border-gray-300 p-2">Delete</th>
                        <th className="border border-gray-300 p-2">View</th>
                        <th className="border border-gray-300 p-2">Edit</th>
                        <th className="border border-gray-300 p-2">Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[
                        { section: "Dashboard", modules: ["Dashboard"] },
                        { section: "Retail Customer", modules: ["Create Cost Plan", "New Category", "Category List", "New Price Plan", "Price Plan List", "New Coupon", "Coupon List", "New Customer", "Customer List", "New Payment", "Payment Transfer", "Setting"] },
                        { section: "Upload Library", modules: ["New Library", "All Library"] },
                        { section: "Appearance", modules: ["New Theme", "Theme List", "New Theme Category", "Theme Category List", "New Theme Tag", "Theme Tag List", "Edit Theme Review", "Theme Review List"] },
                        { section: "Plugin", modules: ["New Plugin", "Plugin List", "New Plugin Category", "Plugin Category List", "New Plugin Tag", "Plugin Tag List", "Edit Plugin Review", "Plugin Review List"] },
                        { section: "Setting", modules: ["Web Setting", "New Country", "Country List", "New Language", "Language List", "New Timezone", "Timezone List", "New Time Format", "Time Format List", "New Date Format", "Date Format List", "New App Integration", "App Integration List"] },
                        { section: "Users", modules: ["New User", "User List", "New User Role", "User Role List"] },
                        { section: "Support Ticket", modules: ["New Ticket", "Ticket List"] }
                      ].map((sectionData, sectionIdx) => (
                        <React.Fragment key={sectionIdx}>
                          <tr className="bg-gray-100 font-bold">
                            <td className="border border-gray-300 p-2 text-left" colSpan={8}>
                              {sectionData.section}
                            </td>
                          </tr>
                          {sectionData.modules.map((module, idx) => (
                            <tr key={`${sectionIdx}-${idx}`}>
                              <td className="border text-left border-gray-300 p-2">{module}</td>
                              <td className="border border-gray-300 p-2">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    const row = e.target.closest("tr");
                                    const checkboxes = row.querySelectorAll("input[type=checkbox]");
                                    checkboxes.forEach((checkbox) => {
                                      checkbox.checked = e.target.checked;
                                      // Update state for all checkboxes in this row
                                      // This would need to be implemented based on your actual permission structure
                                    });
                                  }}
                                />
                              </td>
                              {[...Array(6)].map((_, colIdx) => (
                                <td key={colIdx} className="border border-gray-300 p-2">
                                  <input 
                                    type="checkbox" 
                                    checked={userData.customPermissions[module]?.[colIdx] || false}
                                    onChange={(e) => handleCheckboxChange(module, colIdx, e.target.checked)}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Form Buttons */}
              <div className='flex justify-end items-center gap-[10px] mt-[30px]'>
                <button 
                  type="button"
                  onClick={handleDraft}
                  className='px-[30px] py-[8px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'
                >
                  <LuSaveAll className='text-[18px]'/> Draft
                </button>
                <button 
                  type="submit"
                  className='px-[30px] py-[8px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center border-[2px] border-brand_color items-center rounded-[5px] cursor-pointer'
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </section>
      </section>
    </section>
  )
}

export default Edituser;