import React, { useContext, useEffect, useState } from 'react'
import { Contextapi } from '../../../../context/Appcontext';
import Dashboradheader from '../../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { LuSaveAll } from "react-icons/lu";
import Dashboardleftside from '../../../../components/dashboard/Dashboardleftside';
import { FaCamera } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

// Image Upload Modal Component
const ImageUploadModal = ({
  isOpen,
  toggle,
  activeTab,
  setActiveTab,
  handleFileUpload,
  searchTerm,
  setSearchTerm,
  filteredImages,
  selectImage,
}) => {
  if (!isOpen) return null;
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));

  return (
    <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[95%] xl:w-[75%] 2xl:w-[60%]">
        <div className="p-4 flex justify-between items-center border-b border-gray-300">
          <h2 className="text-lg font-semibold">Upload Images</h2>
          <button onClick={toggle} className="text-gray-600 hover:text-gray-800">
            ✕
          </button>
        </div>

        <div className="flex border-b border-gray-300">
          <div
            onClick={() => setActiveTab("library")}
            className={`w-1/2 py-2 text-center ${activeTab === "library"
              ? "border-b-2 border-brand_color text-brand_color cursor-pointer font-semibold"
              : "text-gray-600 hover:text-brand_color cursor-pointer"
              }`}
          >
            Media Library
          </div>
          <div
            onClick={() => setActiveTab("upload")}
            className={`w-1/2 py-2 text-center ${activeTab === "upload"
              ? "border-b-2 border-brand_color text-brand_color cursor-pointer font-semibold"
              : "text-gray-600 hover:text-brand_color cursor-pointer"
              }`}
          >
            Upload New
          </div>
        </div>

        <div className="p-4 h-[500px] overflow-y-auto w-full">
          {activeTab === "upload" && (
            <div className="w-full flex h-[150px] justify-between items-center lg:flex-row flex-col gap-[10px]">
              <div className="w-full lg:w-auto">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*"
                />
                <label
                  htmlFor="fileUpload"
                  className="block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center transition-all duration-300 ease-in-out"
                >
                  Upload New
                </label>
              </div>
            </div>
          )}

          {activeTab === "library" && (
            <>
              <div className="mb-6 flex justify-end">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[80%] lg:w-[50%] border rounded px-4 py-2 text-sm border-gray-300 focus:outline-none focus:ring focus:ring-orange-200"
                />
              </div>
              <div className="flex flex-wrap gap-[10px]">
                {filteredImages.map((image) => (
                  <div key={image.id} className="">
                    <img
                      src={`http://localhost:8080/uploads/${admin_info?._id}/${image}`}
                      alt={image.title}
                      className="border rounded w-[100px] h-[100px] m-auto cursor-pointer"
                      onClick={() => selectImage(`http://localhost:8080/uploads/${admin_info?._id}/${image}`)}
                    />
                  </div>
                ))}
                {filteredImages.length === 0 && (
                  <div className="col-span-full h-[150px] text-center flex justify-center items-center text-gray-500">
                    No images found.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Websetting = () => {
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [showmodal, setmodal] = useState(false);
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [settingsExist, setSettingsExist] = useState(false);
  const [settingsId, setSettingsId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    organizationName: '',
    organizationPhone: '',
    organizationEmail: '',
    organizationAddress: '',
    city: '',
    postCode: '',
    stateCountry: '',
    countryRegion: '',
    subDomain: '',
    businesscategory: '',
    favicon: '',
    squareLogo: '',
    landscapeLogo: ''
  });

  // Image states
  const [squareLogo, setSquareLogo] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [landscapeLogo, setLandscapeLogo] = useState("");
  
  // Image modal states
  const [activeTab, setActiveTab] = useState("library");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentImageType, setCurrentImageType] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${base_url}/super/admin/categories`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [base_url]);

  // Fetch existing settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${base_url}/super/admin/main-websettings`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data.data[0])
        if (response.data) {
          const settings = response.data.data[0];
          setSettingsExist(true);
          setSettingsId(settings._id);
          console.log(settings)
          setFormData({
            title: settings.title || '',
            tagline: settings.tagline || '',
            organizationName: settings.organizationName || '',
            organizationPhone: settings.organizationPhone || '',
            organizationEmail: settings.organizationEmail || '',
            organizationAddress: settings.organizationAddress || '',
            city: settings.city || '',
            postCode: settings.postCode || '',
            stateCountry: settings.stateCountry || '',
            countryRegion: settings.countryRegion || '',
            subDomain: settings.subDomain || '',
            businesscategory: settings.businesscategory || '',
            favicon: settings.favicon || '',
            squareLogo: settings.squareLogo || '',
            landscapeLogo: settings.landscapeLogo || ''
          });

          if (settings.favicon) setProfileImage(settings.favicon);
          if (settings.squareLogo) setSquareLogo(settings.squareLogo);
          if (settings.landscapeLogo) setLandscapeLogo(settings.landscapeLogo);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [base_url]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle business category search
  const handleCategorySearch = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      businesscategory: value
    }));

    if (value.length > 0) {
      const filtered = categories.filter(category => 
        category.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
      setShowCategoryDropdown(true);
    } else {
      setShowCategoryDropdown(false);
    }
  };

  // Select a category
  const selectCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      businesscategory: category.name
    }));
    setShowCategoryDropdown(false);
  };

  // Image handling functions
  const togglePopup = (type) => {
    setCurrentImageType(type);
    setIsPopupOpen(true);
  };

  const removeImage = () => {
    setProfileImage("");
    setFormData(prev => ({
      ...prev,
      favicon: ""
    }));
  };

  const removeSquareLogo = () => {
    setSquareLogo(null);
    setFormData(prev => ({
      ...prev,
      squareLogo: ""
    }));
  };

  const removeLandscapeLogo = () => {
    setLandscapeLogo("");
    setFormData(prev => ({
      ...prev,
      landscapeLogo: ""
    }));
  };

  const selectImage = (img) => {
    if (currentImageType === "favicon") {
      setProfileImage(img);
      setFormData(prev => ({
        ...prev,
        favicon: img
      }));
    } else if (currentImageType === "square") {
      setSquareLogo(img);
      setFormData(prev => ({
        ...prev,
        squareLogo: img
      }));
    } else if (currentImageType === "landscape") {
      setLandscapeLogo(img);
      setFormData(prev => ({
        ...prev,
        landscapeLogo: img
      }));
    }
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const allimages = async () => {
      const token = localStorage.getItem('admin_token');
      const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (fetchResponse.data.images) {
        setUploadedImages(fetchResponse.data.images);
      }
    }
    allimages();
  }, [base_url, admin_info?._id])

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setErrors(prev => ({
        ...prev,
        images: 'Only image files are allowed'
      }));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        images: 'File size must be less than 5MB'
      }));
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('admin_token');
      // Upload the image
      const uploadResponse = await axios.post(
        `${base_url}/customer/upload-image/${admin_info._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      // If uploaded successfully, fetch the updated image list
      if (uploadResponse.data.imagePath) {
        const fetchResponse = await axios.get(`${base_url}/customer/user-images/${admin_info._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (fetchResponse.data.images) {
          setUploadedImages(fetchResponse.data.images);
          setActiveTab("library")
        }
      }
    } catch (error) {
      console.error(error);
      setErrors(prev => ({
        ...prev,
        images: 'Error uploading file'
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.tagline) newErrors.tagline = 'Tagline is required';
    if (!formData.organizationName) newErrors.organizationName = 'Organization name is required';
    if (!formData.organizationEmail) newErrors.organizationEmail = 'Organization email is required';
    if (!formData.organizationPhone) newErrors.organizationPhone = 'Organization phone is required';
    if (!formData.organizationAddress) newErrors.organizationAddress = 'Organization phone is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postCode) newErrors.postCode = 'Post Code is required';
    if (!formData.stateCountry) newErrors.stateCountry = 'State is required';
    if (!formData.countryRegion) newErrors.countryRegion = 'Country is required';
    if (!formData.businesscategory) newErrors.businesscategory = 'Business Category is required';
    
    // Email validation
    if (formData.organizationEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.organizationEmail)) {
      newErrors.organizationEmail = 'Please enter a valid email address';
    }
    
    // Phone validation (basic)
    if (formData.organizationPhone && !/^[\d\s+\-()]{10,}$/.test(formData.organizationPhone)) {
      newErrors.organizationPhone = 'Please enter a valid phone number';
    }
    
    // Sub-domain validation
    if (formData.subDomain && !/^[a-zA-Z0-9-]+$/.test(formData.subDomain)) {
      newErrors.subDomain = 'Sub-domain can only contain letters, numbers and hyphens';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsLoading(true);
    
    // Prepare data
    const submissionData = {
      ...formData,
      customer_id: admin_info._id,
      favicon: profileImage,
      squareLogo: squareLogo,
      landscapeLogo: landscapeLogo
    };
  
    try {
      const token = localStorage.getItem('adminToken');
      let response;
      
      if (settingsExist) {
        // Update existing settings
        response = await axios.put(`${base_url}/super/admin/main-websettings/${settingsId}`, submissionData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        // Create new settings
        response = await axios.post(`${base_url}/super/admin/main-websettings`, submissionData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      
      setToastMessage('Settings saved successfully!');
      setToastType('success');
      setTimeout(() => setToastMessage(''), 5000);
      
      if (!settingsExist) {
        setSettingsExist(true);
        setSettingsId(response.data._id);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setToastMessage(error.response?.data?.message || 'Failed to save settings. Please try again.');
      setToastType('error');
      setTimeout(() => setToastMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Save as draft
  const handleDraft = async () => {
    try {
      setIsLoading(true);
      
      const submissionData = {
        ...formData,
        customer_id: admin_info._id,
        favicon: profileImage,
        squareLogo: squareLogo,
        landscapeLogo: landscapeLogo,
        isDraft: true
      };
      
      const token = localStorage.getItem('adminToken');
      let response;
      
      if (settingsExist) {
        response = await axios.put(`${base_url}/super/admin/main-websettings/${settingsId}`, submissionData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        response = await axios.post(`${base_url}/super/admin/main-websettings`, submissionData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      
      setToastMessage('Draft saved successfully!');
      setToastType('success');
      setTimeout(() => setToastMessage(''), 5000);
      
      if (!settingsExist) {
        setSettingsExist(true);
        setSettingsId(response.data._id);
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      setToastMessage(error.response?.data?.message || 'Failed to save draft. Please try again.');
      setToastType('error');
      setTimeout(() => setToastMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
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
      
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Web Setting</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[13px] lg:text-[14px]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Setting</li>
                <li><IoIosArrowForward /></li>
                <li>Web Settings</li>
              </ul>
            </div>
          </div>
          
          {/* Web Settings Form */}
          <section className='w-[100%] bg-white rounded-[10px] '>
            <form onSubmit={handleSubmit} className="pt-[15px] lg:pt-[20px]">
              <div className="">
                <div className=''>
                  {/* Favicon */}
                  <div>
                    <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                      Favicon
                    </label>
                    <div className="relative w-[200px] h-[200px] mt-[10px] mb-[10px] group">
                      <div className="w-[200px] h-[200px] rounded-[5px] overflow-hidden border-2 border-dashed border-brand_color">
                        {profileImage ? (
                          <>
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-[5px]">
                              <label
                                onClick={() => togglePopup("favicon")}
                                className="group-hover:block hidden bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
                              >
                                <FaCamera className="w-4 h-4" />
                              </label>
                              <button
                                type="button"
                                onClick={removeImage}
                                className="group-hover:block hidden bg-red-500 text-white p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
                              >
                                <RiDeleteBin5Line className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center flex-col w-full h-full bg-gray-200 text-gray-500">
                            <div className="flex justify-center items-center gap-[5px]">
                              <label
                                onClick={() => togglePopup("favicon")}
                                className="bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
                              >
                                <FaCamera className="w-4 h-4" />
                              </label>
                              <button
                                type="button"
                                onClick={removeImage}
                                className="bg-red-500 text-white p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
                              >
                                <RiDeleteBin5Line className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-[14px] 2xl:text-[15px] mt-[5px]">
                              <span>1200px X 600px</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Square Logo */}
                  <div>
                    <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                      Square Logo
                    </label>
                    <div className="relative w-[200px] h-[200px] mt-[10px] mb-[10px] group">
                      <div className="w-[200px] h-[200px] rounded-[5px] overflow-hidden border-2 border-dashed border-brand_color">
                        {squareLogo ? (
                          <>
                            <img src={squareLogo} alt="Square Logo" className="w-full h-full object-cover" />
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-[5px]">
                              <label
                                onClick={() => togglePopup("square")}
                                className="group-hover:block hidden bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
                              >
                                <FaCamera className="w-4 h-4" />
                              </label>
                              <button
                                type="button"
                                onClick={removeSquareLogo}
                                className="group-hover:block hidden bg-red-500 text-white p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
                              >
                                <RiDeleteBin5Line className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center flex-col w-full h-full bg-gray-200 text-gray-500">
                            <div className="flex justify-center items-center gap-[5px]">
                              <label
                                onClick={() => togglePopup("square")}
                                className="bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
                              >
                                <FaCamera className="w-4 h-4" />
                              </label>
                              <button
                                type="button"
                                onClick={removeSquareLogo}
                                className="bg-red-500 text-white p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
                              >
                                <RiDeleteBin5Line className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-[14px] 2xl:text-[15px] mt-[5px]">
                              <span>200px X 200px</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Landscape Logo */}
                  <div>
                    <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                      Landscape Logo
                    </label>
                    <div className="relative w-[300px] h-[150px] mt-[10px] mb-[10px] group">
                      <div className="w-[300px] h-[150px] rounded-[5px] overflow-hidden border-2 border-dashed border-brand_color">
                        {landscapeLogo ? (
                          <>
                            <img src={landscapeLogo} alt="Landscape Logo" className="w-full h-full object-cover" />
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-[5px]">
                              <label
                                onClick={() => togglePopup("landscape")}
                                className="group-hover:block hidden bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
                              >
                                <FaCamera className="w-4 h-4" />
                              </label>
                              <button
                                type="button"
                                onClick={removeLandscapeLogo}
                                className="group-hover:block hidden bg-red-500 text-white p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
                              >
                                <RiDeleteBin5Line className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center flex-col w-full h-full bg-gray-200 text-gray-500">
                            <div className="flex justify-center items-center gap-[5px]">
                              <label
                                onClick={() => togglePopup("landscape")}
                                className="bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
                              >
                                <FaCamera className="w-4 h-4" />
                              </label>
                              <button
                                type="button"
                                onClick={removeLandscapeLogo}
                                className="bg-red-500 text-white p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
                              >
                                <RiDeleteBin5Line className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-[14px] 2xl:text-[15px] mt-[5px]">
                              <span>300px X 150px</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="w-[100%] mb-[10px]">
                    <label htmlFor="title" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.title ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  {/* Tagline */}
                  <div className="w-[100%] mb-[10px]">
                    <label htmlFor="tagline" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                      Tagline
                    </label>
                    <input
                      type="text"
                      id="tagline"
                      name="tagline"
                      placeholder="Tagline"
                      value={formData.tagline}
                      onChange={handleChange}
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.tagline ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                    />
                    {errors.tagline && <p className="text-red-500 text-sm mt-1">{errors.tagline}</p>}
                  </div>

                  {/* Organization Name */}
                  <div className="w-[100%] mb-[10px]">
                    <label htmlFor="organizationName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                      Organization Name*
                    </label>
                    <input
                      type="text"
                      id="organizationName"
                      name="organizationName"
                      placeholder="Your Organization Name"
                      value={formData.organizationName}
                      onChange={handleChange}
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.organizationName ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                    />
                    {errors.organizationName && <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>}
                  </div>

                  {/* Organization Phone */}
                  <div className="w-[100%] mb-[10px]">
                    <label htmlFor="organizationPhone" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                      Organization Phone
                    </label>
                    <input
                      type="text"
                      id="organizationPhone"
                      name="organizationPhone"
                      placeholder="Organization Phone"
                      value={formData.organizationPhone}
                      onChange={handleChange}
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.organizationPhone ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                    />
                    {errors.organizationPhone && <p className="text-red-500 text-sm mt-1">{errors.organizationPhone}</p>}
                  </div>

                  {/* Organization Email */}
                  <div className="w-[100%] mb-[10px]">
                    <label htmlFor="organizationEmail" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                      Organization Email
                    </label>
                    <input
                      type="email"
                      id="organizationEmail"
                      name="organizationEmail"
                      placeholder="Organization Email"
                      value={formData.organizationEmail}
                      onChange={handleChange}
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.organizationEmail ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                    />
                    {errors.organizationEmail && <p className="text-red-500 text-sm mt-1">{errors.organizationEmail}</p>}
                  </div>

                  {/* Organization Address */}
                  <div className="w-[100%] mb-[10px]">
                    <label htmlFor="organizationAddress" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                      Organization Address
                    </label>
                    <input
                      type="text"
                      id="organizationAddress"
                      name="organizationAddress"
                      placeholder="Organization Address"
                      value={formData.organizationAddress}
                      onChange={handleChange}
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.organizationAddress ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                    />
                    {errors.organizationAddress && <p className="text-red-500 text-sm mt-1">{errors.organizationAddress}</p>}
                  </div>

                  {/* City and Post Code */}
                  <div className="w-full flex gap-[30px] mb-[20px] lg:flex-row flex-col">
                    <div className="w-[100%] lg:w-[50%]">
                      <label htmlFor="city" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.city ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div className="w-[100%] lg:w-[50%]">
                      <label htmlFor="postCode" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                        Post Code / Zip
                      </label>
                      <input
                        type="text"
                        id="postCode"
                        name="postCode"
                        placeholder="Post Code / Zip"
                        value={formData.postCode}
                        onChange={handleChange}
                        className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.postCode ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                      />
                      {errors.postCode && <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>}
                    </div>
                  </div>

                  {/* State and Country */}
                  <div className="w-full flex gap-[30px] mb-[20px] lg:flex-row flex-col">
                    <div className="w-[100%] lg:w-[50%]">
                      <label htmlFor="stateCountry" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                        State / Country
                      </label>
                      <input
                        type="text"
                        id="stateCountry"
                        name="stateCountry"
                        placeholder="State / Country"
                        value={formData.stateCountry}
                        onChange={handleChange}
                        className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.stateCountry ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                      />
                      {errors.stateCountry && <p className="text-red-500 text-sm mt-1">{errors.stateCountry}</p>}
                    </div>
                    <div className="w-[100%] lg:w-[50%]">
                      <label htmlFor="countryRegion" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                        Country / Region
                      </label>
                      <input
                        type="text"
                        id="countryRegion"
                        name="countryRegion"
                        placeholder="Country / Region"
                        value={formData.countryRegion}
                        onChange={handleChange}
                        className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.countryRegion ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                      />
                      {errors.countryRegion && <p className="text-red-500 text-sm mt-1">{errors.countryRegion}</p>}
                    </div>
                  </div>

                  {/* Business Category */}
                  <div className="w-full mb-[10px] relative">
                    <label htmlFor="businesscategory" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                      Your Business Category
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="businesscategory"
                        name="businesscategory"
                        placeholder="Search business category"
                        value={formData.businesscategory}
                        onChange={handleCategorySearch}
                        className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${errors.businesscategory ? "border-red-500" : "border-[#eee]"} p-[12px]`}
                        onFocus={() => setShowCategoryDropdown(true)}
                      />
                      {formData.businesscategory && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, businesscategory: '' }));
                            setShowCategoryDropdown(false);
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          <IoClose className="text-lg" />
                        </button>
                      )}
                    </div>
                    {errors.businesscategory && (
                      <p className="text-red-500 text-sm mt-1">{errors.businesscategory}</p>
                    )}

                    {showCategoryDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredCategories.length > 0 ? (
                          filteredCategories.map((category) => (
                            <div
                              key={category._id}
                              onClick={() => selectCategory(category)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              {category.image && (
                                <img 
                                  src={category.image} 
                                  alt={category.name} 
                                  className="w-8 h-8 rounded-full mr-3 object-cover"
                                />
                              )}
                              <div>
                                <p className="font-medium">{category.name}</p>
                                {category.description && (
                                  <p className="text-xs text-gray-500 truncate">{category.description}</p>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500">No categories found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex justify-end items-center gap-[10px] mt-[30px]'>
                <button
                  type="button"
                  onClick={handleDraft}
                  disabled={isLoading}
                  className={`px-[30px] py-[8px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <LuSaveAll className='text-[18px]' />
                  {isLoading ? 'Saving...' : 'Draft'}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-[30px] py-[8px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center border-[2px] border-brand_color items-center rounded-[5px] cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                  <div className="w-[60px] h-[60px] relative">
                    <div className="absolute inset-0 rounded-full border-[6px] border-t-transparent border-white animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-[4px] border-t-transparent border-brand_color animate-spin-reverse"></div>
                  </div>
                </div>
              )}
            </form>
          </section>

          {/* Image Upload Modal */}
          <ImageUploadModal
            isOpen={isPopupOpen}
            toggle={() => setIsPopupOpen(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleFileUpload={handleFileUpload}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredImages={uploadedImages}
            selectImage={selectImage}
          />
        </section>
      </section>
    </section>
  )
}

export default Websetting