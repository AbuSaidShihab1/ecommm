import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSaveAll } from "react-icons/lu";
import { FaCamera } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPower } from 'react-icons/fi';
import { FiCheck, FiX } from 'react-icons/fi';
import { BiLoaderAlt } from "react-icons/bi"
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
    const user_info=JSON.parse(localStorage.getItem("user"))

    return (
        <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%] ">
                <div className="p-4 flex justify-between items-center border-b border-gray-300">
                    <h2 className="text-lg font-semibold">Upload Images</h2>
                    <button onClick={toggle} className="text-gray-600 hover:text-gray-800">
                        ✕
                    </button>
                </div>

                <div className="flex border-b border-gray-300 ">
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

                <div className="p-4 h-[500px] overflow-y-auto">
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
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-[10px]   overflow-y-auto overflow-x-hidden">
                                {filteredImages.map((image) => (
                                    <div key={image.id} className="w-[150px] h-[150px] ">
                                        <img
                                            src={`http://localhost:8080/uploads/${user_info?._id}/${image}`}
                                            alt={image.title}
                                            className="border rounded cursor-pointer w-[150px] h-[150px] "
                                            onClick={() => selectImage(`http://localhost:8080/uploads/${user_info?._id}/${image}`)}
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

const Websettings = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const user_info=JSON.parse(localStorage.getItem("user"))
    const base_url = import.meta.env.VITE_API_KEY_Base_URL;
     console.log(user_info)
    // Form state
    const [formData, setFormData] = useState({
        // title: '',
        // tagline: '',
        organizationName: '',
        organizationPhone: '',
        organizationEmail: '',
        organizationAddress: '',
        city: '',
        postCode: '',
        stateCountry: '',
        countryRegion: '',
        // language: '',
        // timezone: '',
        // timeFormat: '',
        // dateFormat: '',
        subDomain: '',
        businesscategory:'',
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
    
    // Fetch existing settings on component mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('/api/web-settings');
                if (response.data) {
                    setFormData(response.data);
                    if (response.data.favicon) setProfileImage(response.data.favicon);
                    if (response.data.squareLogo) setSquareLogo(response.data.squareLogo);
                    if (response.data.landscapeLogo) setLandscapeLogo(response.data.landscapeLogo);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchSettings();
    }, []);

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
        console.log(currentImageType)
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

    useEffect(()=>{
       const allimages=async()=>{
        const fetchResponse = await axios.get(`${base_url}/customer/user-images/${user_info._id}`);
        if (fetchResponse.data.images) {
            console.log(fetchResponse.data)
            setUploadedImages(fetchResponse.data.images);
        }
       }
       allimages();
    },[])
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
            // Upload the image
            const uploadResponse = await axios.post(`${base_url}/customer/upload-image/${user_info._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            // If uploaded successfully, fetch the updated image list
            if (uploadResponse.data.imagePath) {
                const fetchResponse = await axios.get(`${base_url}/customer/user-images/${user_info._id}`);
                if (fetchResponse.data.images) {
                    console.log(fetchResponse.data)
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
      
        setIsLoading(true); // Show loader immediately
        setSuccessMessage('');
        
        // Prepare data
        const submissionData = {
          ...formData,
          customer_id:user_info._id,
          favicon: profileImage,
          squareLogo: squareLogo,
          landscapeLogo: landscapeLogo
        };
      
        // Wait 2 seconds before sending request
        setTimeout(async () => {
          try {
            const response = await axios({
              method: 'post',
              url: `${base_url}/customer/web-settings`,
              data: submissionData,
              headers: {
                'Content-Type': 'application/json'
              }
            });
      
            setSuccessMessage('Settings saved successfully!');
                 // ✅ Update registerStep and navigate
            localStorage.setItem('registrationStep', '3');
            navigate('/choose-package');
            setTimeout(() => setSuccessMessage(''), 5000);
          } catch (error) {
            console.error('Error saving settings:', error);
            setErrors(prev => ({
              ...prev,
              submit: error.response?.data?.message || 'Failed to save settings. Please try again.'
            }));
          } finally {
            setIsLoading(false); // Hide loader after request
          }
        }, 2000); // 2-second delay
      };
      

    // Save as draft
    const handleDraft = async () => {
        try {
            setIsLoading(true);
            
            const response = await axios({
                method: 'post',
                url: '/api/web-settings',
                data: {
                    ...formData,
                    isDraft: true
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            setSuccessMessage('Draft saved successfully!');
            setTimeout(() => setSuccessMessage(''), 5000);
            
        } catch (error) {
            console.error('Error saving draft:', error);
            setErrors(prev => ({
                ...prev,
                submit: error.response?.data?.message || 'Failed to save draft. Please try again.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    // Filter images based on the search term
    // const filteredImages = uploadedImages.filter((image) =>
    //     image.toLowerCase().includes(searchTerm.toLowerCase())
    // );
// --------------logout-button------------------
const [profileOpen, setProfileOpen] = useState(false);
const dropdownRef = useRef(null);

// Close dropdown on outside click
useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setProfileOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
// -----------------------------business-category-sugesstions--------------------------------
const suggestionsList = [
    "E-commerce",
    "Digital Marketing",
    "Web Development",
    "Graphic Design",
    "Mobile App Development",
    "Software as a Service (SaaS)",
    "Consulting Services",
    "Online Education",
    "Financial Services",
    "Affiliate Marketing",
    "Logistics & Delivery",
    "Event Management",
    "Freelancing Services",
    "Photography & Videography",
    "Real Estate Services",
    "Dropshipping",
    "Handmade Products",
    "Health & Wellness",
    "IT Support Services",
    "Gaming & Entertainment"
  ];
  
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      handleChange(e); // original onChange logic
  
      const matches = suggestionsList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setShowSuggestions(value.length > 0 && matches.length > 0);
    };
  
    const handleSuggestionClick = (value) => {
      setFormData((prev) => ({ ...prev, businesscategory: value }));
      setShowSuggestions(false);
    };

// ----------------subdomain-----------------------
const [checking, setChecking] = useState(false);
const [available, setAvailable] = useState(null); // null | true | false

const site_domain_change = (e) => {
  setFormData({ ...formData, subDomain: e.target.value });
  setAvailable(null); // reset availability check
};

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    const sub = formData.subDomain?.trim();
    if (sub?.length > 1) {
      checkAvailability(sub);
    }
  }, 500); // debounce for 500ms

  return () => clearTimeout(delayDebounce);
}, [formData.subDomain]);

const checkAvailability = async (sub) => {
  try {
    setChecking(true);
    const res = await axios.get(`${base_url}/auth/check-subdomain/${sub}`);
    setAvailable(!res.data.exists);
  } catch (error) {
    setAvailable(false); // fallback to not available
  } finally {
    setChecking(false);
  }
};
    return (
        <section className='w-full font-poppins bg-[#F9F9FB] p-[20px] xl:p-[50px] flex justify-center items-center'>
            <div className='w-[97%] md:w-[85%] lg:w-[90%] xl:w-[70%]'>
            <div className="flex justify-between items-center py-[20px] px-6 relative mb-[40px]">
      {/* Logo */}
      <div>
        <img
          src="https://www.weblasser.com/wp-content/uploads/2021/04/Logo.png"
          alt="Logo"
          className="h-15"
        />
      </div>

      {/* Profile + Dropdown */}
      <div className="relative" ref={dropdownRef}>
      {/* Gradient Border Button */}
      <div className="p-[2px] rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500">
        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-white text-gray-700 font-semibold flex items-center justify-center uppercase"
        >
          {user_info.firstName?.slice(0,1)}
        </button>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-36 bg-white rounded-[5px] shadow-sm border border-gray-200 p-3 z-10"
          >
            <button
              onClick={() => alert('Logging out...')}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <FiPower className="text-lg" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
                
            {/* Notification Messages */}
{(successMessage || errors.submit) && (
  <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-md px-4">
    <div
      className={`rounded-lg shadow-lg p-4 text-sm transition-all duration-300 ${
        successMessage
          ? 'bg-green-100 text-green-800 border border-green-300'
          : 'bg-red-100 text-red-800 border border-red-300'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span>
          {successMessage || errors.submit}
        </span>
        <button
          onClick={() => {
            setSuccessMessage('');
            setErrors(prev => ({ ...prev, submit: '' }));
          }}
          className="text-lg leading-none hover:text-black/70"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
)}

                
                <section className='w-[100%] bg-white rounded-[10px] border-[1px] border-gray-200 p-[20px]'>
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

                                {/* Language */}
                                <div className="w-full mb-[10px] relative">
      <label
        htmlFor="businesscategory"
        className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
      >
        Your Business Category
      </label>
      <input
        type="text"
        id="businesscategory"
        name="businesscategory"
        placeholder="Your Business Category"
        value={formData.businesscategory}
        onChange={handleInputChange}
        className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] ${
          errors.businesscategory ? "border-red-500" : "border-[#eee]"
        } p-[12px]`}
      />
      {errors.businesscategory && (
        <p className="text-red-500 text-sm mt-1">{errors.businesscategory}</p>
      )}

      {showSuggestions && (
        <ul className="absolute z-10 bg-white border border-gray-200 rounded-md mt-1 w-full shadow-sm max-h-48 overflow-auto">
          {filteredSuggestions.map((suggestion, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-sm"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>

                                {/* Sub-Domain */}
                                <div className="w-full mb-5">
  <label htmlFor="subDomain" className="text-sm 2xl:text-base font-medium text-gray-700">
    Your Sub-Domain
  </label>

  <div className="mt-2 flex">
    {/* Left Input */}
    <input
      type="text"
      id="subDomain"
      name="subDomain"
      value={formData.subDomain}
      onChange={site_domain_change}
      placeholder="e.g. myshop"
      className={`w-full rounded-l-md placeholder-gray-500 outline-none border text-sm 2xl:text-base h-[45px] px-4 ${
        errors.subDomain || available === false
          ? 'border-red-500'
          : available === true
          ? 'border-green-500'
          : 'border-gray-300'
      }`}
    />

    {/* Right Box */}
    <div className="flex items-center gap-1 px-3 h-[45px] bg-gray-100 text-sm 2xl:text-base text-gray-600 border-y border-r border-gray-300 rounded-r-md min-w-max">
      {checking ? (
        <BiLoaderAlt className="text-gray-500 animate-spin text-[18px]" />
      ) : available === true ? (
        <FiCheck className="text-green-600 text-[18px]" />
      ) : available === false ? (
        <FiX className="text-red-500 text-[18px]" />
      ) : null}
      <span>.subdomain.com</span>
    </div>
  </div>

  {/* Error Message */}
  {errors.subDomain && (
    <p className="text-red-500 text-sm mt-1">{errors.subDomain}</p>
  )}

  {/* Subdomain Preview */}
  {formData.subDomain?.length > 1 && (
    <p className="mt-2 text-sm 2xl:text-[15px] text-gray-600">
      Your Subdomain:&nbsp;
      <a
        href={`https://www.${formData.subDomain.replace(/\s+/g, '').toLowerCase()}.weblasser.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand_color underline"
      >
        https://www.{formData.subDomain.replace(/\s+/g, '').toLowerCase()}.weblasser.com
      </a>
    </p>
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
            </div>

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
    );
};

export default Websettings;