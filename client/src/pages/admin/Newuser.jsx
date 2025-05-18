import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import axios from 'axios';
import { LuSaveAll } from "react-icons/lu";
import { FaCamera } from "react-icons/fa";

const Newuser = () => {
  const navigate = useNavigate();
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const admin_token = localStorage.getItem("adminToken")

  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    image: 'https://i.ibb.co.com/HBsfNMb/avatar.jpg',
    userAccess: '',
    customAccess: []
  });

  // Errors state
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    image: ''
  });

  // Image upload states
  const [profileImage, setProfileImage] = useState("https://i.ibb.co.com/HBsfNMb/avatar.jpg");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("library");
  const [uploadedImages, setUploadedImages] = useState([]);

  // User access states
  const [isCustomUserEnabled, setIsCustomUserEnabled] = useState(false);
  const [searchTerm2, setSearchTerm2] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const user_access_data = [
    { id: 1, name: "Administration" },
    { id: 2, name: "Sales Manager" },
    { id: 3, name: "Marketing Manager" },
  ];

  // Designation suggestions
  const [designationInput, setDesignationInput] = useState('Marketer');
  const [designationSuggestions, setDesignationSuggestions] = useState([]);
  const [showDesignationSuggestions, setShowDesignationSuggestions] = useState(false);
  const suggestions = ['Marketer', 'Manager', 'Developer', 'Designer', 'Consultant'];

  // Access control table state
  const [checked, setChecked] = useState(
    new Array(20).fill(false).map(() => new Array(7).fill(false))
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      designation: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      image: ''
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
      valid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!formData.image || formData.image === 'https://i.ibb.co.com/HBsfNMb/avatar.jpg') {
      newErrors.image = 'Profile image is required';
      valid = false;
    }

    if (!isCustomUserEnabled && !formData.userAccess) {
      newErrors.userAccess = 'User access level is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
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
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToastMessage('Please fix the errors in the form');
      setToastType('error');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call with 2 second delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Prepare data to send
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        designation: formData.designation,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        profileImage: formData.image,
        accessLevel: isCustomUserEnabled ? 'custom' : formData.userAccess,
        customPermissions: isCustomUserEnabled ? getCheckedAccess() : null,
        admin_id:admin_info._id,
      };

      // In a real app, you would make an actual API call here:
      const response = await axios.post(`${base_url}/super/admin/create-new-user`, userData, {
        headers: {
          'Authorization': `Bearer ${admin_token}`
        }
      });
         console.log(response)
      // For demo purposes, we'll simulate a successful response
      console.log('User data to submit:', userData);
      setToastMessage('User created successfully!');
      setToastType('success');

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        designation: 'Marketer',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        image: 'https://i.ibb.co.com/HBsfNMb/avatar.jpg',
        userAccess: '',
        customAccess: []
      });
      setProfileImage("https://i.ibb.co.com/HBsfNMb/avatar.jpg");
       
    

    } catch (error) {
      console.error('Error creating user:', error);
      setToastMessage(error.response?.data?.message || 'Failed to create user');
      setToastType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Save as draft
  const handleSaveDraft = () => {
    // Validate required fields for draft
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setToastMessage('Please fill at least first name, last name and email to save as draft');
      setToastType('error');
      return;
    }

    // In a real app, you would save to local storage or make an API call
    const draftData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      image: formData.image
    };

    localStorage.setItem('userDraft', JSON.stringify(draftData));
    setToastMessage('Draft saved successfully');
    setToastType('success');
  };

  // Image handling functions
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const selectImage = (img) => {
    const imageUrl = `http://localhost:8080/uploads/${admin_info?._id}/${img}`;
    setProfileImage(imageUrl);
    setFormData({
      ...formData,
      image: imageUrl
    });
    setIsPopupOpen(false);
    setErrors({
      ...errors,
      image: ''
    });
  };

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
      const uploadResponse = await axios.post(
        `${base_url}/api/upload/image/admin-upload-image/${admin_info._id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (uploadResponse.data.imagePath) {
        const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`);
        if (fetchResponse.data.images) {
          setUploadedImages(fetchResponse.data.images);
           console.log(fetchResponse)
          setActiveTab("library");
        }
      }
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, image: 'Error uploading file' });
    }
  };
// State for storing fetched designations
  const [designationOptions, setDesignationOptions] = useState([]);
  const [isLoadingDesignations, setIsLoadingDesignations] = useState(false);

  // ... (keep all your existing state declarations)

  // Fetch designations when component mounts
  useEffect(() => {
    const fetchDesignations = async () => {
      setIsLoadingDesignations(true);
      try {
        const response = await axios.get(`${base_url}/super/admin/all-users`, {
          headers: {
            'Authorization': `Bearer ${admin_token}`
          }
        });
        console.log(response)
        if (response.data.success && response.data.data) {
          // Extract unique designations from customers
          const designations = [...new Set(
            response.data.data
              .map(customer => customer.designation)
              .filter(designation => designation) // Filter out null/undefined
          )];
          
          setDesignationOptions(designations);
        }
      } catch (error) {
        console.error('Error fetching designations:', error);
      } finally {
        setIsLoadingDesignations(false);
      }
    };

    fetchDesignations();
  }, []);

  // Modify the handleDesignationChange function to use fetched designations
  const handleDesignationChange = (e) => {
    const value = e.target.value;
    setDesignationInput(value);
    setFormData({
      ...formData,
      designation: value
    });

    // Filter suggestions based on fetched designations
    const filtered = designationOptions.filter((sugg) =>
      sugg.toLowerCase().includes(value.toLowerCase())
    );
    setDesignationSuggestions(filtered);
    setShowDesignationSuggestions(true);
  };
  // User access functions
  const toggleCustomUserAccess = () => {
    setIsCustomUserEnabled(!isCustomUserEnabled);
    setSearchTerm2("");
    setErrors({
      ...errors,
      userAccess: ''
    });
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm2(input);
    setFormData({
      ...formData,
      userAccess: input
    });

    if (input) {
      const suggestions = user_access_data.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm2(name);
    setFormData({
      ...formData,
      userAccess: name
    });
    setFilteredSuggestions([]);
    setErrors({
      ...errors,
      userAccess: ''
    });
  };

 

  const handleSuggestionSelect = (value) => {
    setDesignationInput(value);
    setFormData({
      ...formData,
      designation: value
    });
    setShowDesignationSuggestions(false);
    setErrors({
      ...errors,
      designation: ''
    });
  };

  // Access control table functions
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

  // Get checked access permissions (for custom access)
  const getCheckedAccess = () => {
    // This would return the custom access permissions
    // Implement based on your checkbox states
    return checked.map(row => row.map(cell => cell));
  };

  const handlesidebar = () => {
    setactivesidebar(!activesidebar);
  };

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
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
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="w-[60px] h-[60px] relative">
            <div className="absolute inset-0 rounded-full border-[6px] border-t-transparent border-white animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-[4px] border-t-transparent border-brand_color animate-spin-reverse"></div>
          </div>
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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>New User</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Users</li>
                <li><IoIosArrowForward /></li>
                <li>New User</li>
              </ul>
            </div>
            <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
              <BiImport className='text-[25px]' />
              Import
            </button>
          </div>
          
          {/* New User Form */}
          <section className='pt-[40px] pb-[30px]'>
            <form onSubmit={handleSubmit} className='pt-[15px] lg:pt-[20px]'>
              {/* Profile Image */}
              <div className="relative w-40 h-40 mb-[30px]">
                <div className="w-full h-full rounded-[10px] overflow-hidden border-2 border-gray-300">
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <label
                  htmlFor="profileImageInput"
                  onClick={togglePopup}
                  className="absolute bottom-1 right-2 bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-500"
                >
                  <FaCamera className="w-4 h-4" />
                </label>
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>

              {/* Image Upload Popup */}
              {isPopupOpen && (
                <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
                    <div className="p-4 flex justify-between items-center border-b border-gray-300">
                      <h2 className="text-lg font-semibold">Upload Images</h2>
                      <button onClick={togglePopup} className="text-gray-600 hover:text-gray-800">
                        ✕
                      </button>
                    </div>

                    <div className="flex border-b border-gray-300">
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

                    <div className="p-4 h-[200px] overflow-y-auto">
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
                          <div className="flex flex-wrap gap-[10px]">
                            {uploadedImages.map((image) => (
                              <div key={image}>
                                <img
                                  src={`http://localhost:8080/uploads/${admin_info?._id}/${image}`}
                                  alt={image}
                                  className="border rounded w-[100px] h-[100px] m-auto cursor-pointer"
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

              {/* Name Fields */}
              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="firstName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder='First Name'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.firstName ? 'border-red-500' : 'border-[#eee]'}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="lastName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder='Last Name'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.lastName ? 'border-red-500' : 'border-[#eee]'}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

 
      {/* Designation Field - modify this part */}
      <div className='w-full relative mb-[10px] lg:mb-[20px]'>
        <label htmlFor="designation" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
          Designation {isLoadingDesignations && <span className="text-sm text-gray-500">(Loading...)</span>}
        </label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleDesignationChange}
          placeholder="Designation"
          className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.designation ? 'border-red-500' : 'border-[#eee]'}`}
        />
        {showDesignationSuggestions && designationSuggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-[150px] overflow-y-auto shadow-lg">
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
        {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
      </div>

              {/* Username */}
              <div className='w-full mb-[10px] lg:mb-[20px]'>
                <label htmlFor="username" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder='Username'
                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.username ? 'border-red-500' : 'border-[#eee]'}`}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>

              {/* Email */}
              <div className='w-full mb-[10px] lg:mb-[20px]'>
                <label htmlFor="email" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Email'
                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.email ? 'border-red-500' : 'border-[#eee]'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className='w-full mb-[10px] lg:mb-[20px]'>
                <label htmlFor="phone" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Phone'
                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.phone ? 'border-red-500' : 'border-[#eee]'}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Password Fields */}
              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="password" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.password ? 'border-red-500' : 'border-[#eee]'}`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="confirmPassword" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Confirm Password'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.confirmPassword ? 'border-red-500' : 'border-[#eee]'}`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* User Access */}
              <div className="mb-4">
                <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                  User Access
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="User Access"
                    value={searchTerm2}
                    onChange={handleInputChange}
                    disabled={isCustomUserEnabled}
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] px-[10px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${
                      isCustomUserEnabled ? "bg-gray-200 cursor-not-allowed" : ""
                    } ${errors.userAccess ? 'border-red-500' : 'border-[#eee]'}`}
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
                {errors.userAccess && <p className="text-red-500 text-sm mt-1">{errors.userAccess}</p>}
                
                {/* Checkbox for enabling Custom User Access */}
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

                {/* Custom User Access Table */}
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
  {
    section: "Dashboard",
    modules: ["Dashboard"]
  },
  {
    section: "Retail Customer",
    modules: [
      "Create Cost Plan",
      "New Category",
      "Category List",
      "New Price Plan",
      "Price Plan List",
      "New Coupon",
      "Coupon List",
      "New Customer",
      "Customer List",
      "New Payment",
      "Payment Transfer",
      "Setting"
    ]
  },
  {
    section: "Upload Library",
    modules: ["New Library", "All Library"]
  },
  {
    section: "Appearance",
    modules: [
      "New Theme",
      "Theme List",
      "New Theme Category",
      "Theme Category List",
      "New Theme Tag",
      "Theme Tag List",
      "Edit Theme Review",
      "Theme Review List"
    ]
  },
  {
    section: "Plugin",
    modules: [
      "New Plugin",
      "Plugin List",
      "New Plugin Category",
      "Plugin Category List",
      "New Plugin Tag",
      "Plugin Tag List",
      "Edit Plugin Review",
      "Plugin Review List"
    ]
  },
  {
    section: "Setting",
    modules: [
      "Web Setting",
      "New Country",
      "Country List",
      "New Language",
      "Language List",
      "New Timezone",
      "Timezone List",
      "New Time Format",
      "Time Format List",
      "New Date Format",
      "Date Format List",
      "New App Integration",
      "App Integration List"
    ]
  },
  {
    section: "Users",
    modules: [
      "New User",
      "User List",
      "New User Role",
      "User Role List"
    ]
  },
  {
    section: "Support Ticket",
    modules: [
      "New Ticket",
      "Ticket List"
    ]
  }
].map((sectionData, sectionIdx) => (
                          <React.Fragment key={sectionIdx}>
                            <tr className="bg-gray-100 font-bold">
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
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className='flex justify-end items-center gap-[10px] mt-[30px]'>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className='px-[30px] py-[8px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer hover:bg-gray-100 transition'
                >
                  <LuSaveAll className='text-[18px]' />Draft
                </button>
                <button
                  type="submit"
                  className='px-[30px] py-[8px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center border-[2px] border-brand_color items-center rounded-[5px] cursor-pointer hover:bg-orange-600 transition'
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Newuser;