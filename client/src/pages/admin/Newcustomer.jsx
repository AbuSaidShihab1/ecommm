import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboradheader from '../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import Dashboardleftside from '../../components/dashboard/Dashboardleftside';
import { FiChevronUp } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from 'axios';
import { FaCamera } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

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
const Newcustomer = () => {
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
        console.log(response.data.data)
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
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
      console.log(admin_info)
      const token = localStorage.getItem('adminToken');
      const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(fetchResponse)
      if (fetchResponse) {
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
      const token = localStorage.getItem('adminToken');
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

   // ------------image upload popup------
   const [isVisible, setIsVisible] = useState(true);
     const [websiteIcon, setWebsiteIcon] = useState("https://i.ibb.co.com/HBsfNMb/avatar.jpg"); // State for website icon
     const [tab, setTab] = useState("library"); // Active tab for media library/upload
     const [popupOpen, setPopupOpen] = useState(false); // State to handle popup visibility
     const [imageList, setImageList] = useState([]); // List of uploaded images
     const [searchQuery, setSearchQuery] = useState(""); // Search term for image search
     const [filteredImageList, setFilteredImageList] = useState([]); // Filtered images based on search term
   
     const [searchTerm2, setSearchTerm2] = useState("");
      const [filteredSuggestions, setFilteredSuggestions] = useState([]);
   

   
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



  const handleSelect = (plan) => {
    setQuery(plan);
    setShowSuggestions(false);
  };
// ---------------category-suggestion--------------
const [categoryInput, setCategoryInput] = useState("");
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

// ------------------toggole-box------------------------
const [isAltContactVisible, setIsAltContactVisible] = useState(true);
const [portraitLogo, setPortraitLogo] = useState("https://i.ibb.co.com/HBsfNMb/avatar.jpg");
const [isPopupVisible, setIsPopupVisible] = useState(false);
const handlePortraitLogoUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    const newImage = {
      id: Date.now(),
      src: imageURL,
      title: file.name,
    };
    setImages((prev) => [...prev, newImage]);
    setPortraitLogo(imageURL);
    togglePopupVisibility();
  }
};

const choosePortraitLogo = (image) => {
  setPortraitLogo(image.src);
  togglePopupVisibility();
};
// -------------language-----------------
// Array of timezones (you can expand this with more timezones as needed)
const timezones = [
  { value: 'UTC', name: 'UTC (Coordinated Universal Time)' },
  { value: 'GMT', name: 'GMT (Greenwich Mean Time)' },
  { value: 'EST', name: 'EST (Eastern Standard Time)' },
  { value: 'CST', name: 'CST (Central Standard Time)' },
  { value: 'MST', name: 'MST (Mountain Standard Time)' },
  { value: 'PST', name: 'PST (Pacific Standard Time)' },
  { value: 'CET', name: 'CET (Central European Time)' },
  { value: 'EET', name: 'EET (Eastern European Time)' },
  { value: 'IST', name: 'IST (Indian Standard Time)' },
  { value: 'AEST', name: 'AEST (Australian Eastern Standard Time)' },
  // Add more timezones as needed
];
// Array of common time formats
const timeFormats = [
  { value: '12-hour', name: '12-hour' },
  { value: '24-hour', name: '24-hour' },
  // You can add more time formats if needed
];
// Array of common date formats
const dateFormats = [
  { value: 'MM-DD-YYYY', name: 'MM-DD-YYYY' },
  { value: 'DD-MM-YYYY', name: 'DD-MM-YYYY' },
  // Add more formats as needed
];
const [isBusinessvisible,setisBusinessvisible]=useState(true);
       const [isCustomUserEnabled, setIsCustomUserEnabled] = useState(false);
// --------------------------desgination-----------------------
 // -------------------designation-suggestion---------------------
  const suggestions = ['Marketer', 'Manager', 'Developer', 'Designer', 'Consultant'];

  const [designationInput, setDesignationInput] = useState('Marketer');
  const [designationSuggestions, setDesignationSuggestions] = useState([]);
  const [showDesignationSuggestions, setShowDesignationSuggestions] = useState(false);

  const handleDesignationChange = (e) => {
    const value = e.target.value;
    setDesignationInput(value);

    const filtered = suggestions.filter((sugg) =>
      sugg.toLowerCase().startsWith(value.toLowerCase())
    );
    setDesignationSuggestions(filtered);
    setShowDesignationSuggestions(true);
  };

  const handleSuggestionSelect = (value) => {
    setDesignationInput(value);
    setShowDesignationSuggestions(false);
  };
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
       <div className='w-full flex justify-between items-center'>
        <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>New Customer</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[13px] lg:text-[14px]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Retail Customer</li>
            <li><IoIosArrowForward/></li>
            <li>New Customer</li>
          </ul>
        </div>
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>
            {/* -------------------form---------------------- */}
<form action="" className="pt-[15px] lg:pt-[20px]">

<div className="border border-orange-300 rounded-md mb-6 overflow-hidden">
      {/* Header */}
      <div onClick={() => setIsAltContactVisible(!isAltContactVisible)}  className={isAltContactVisible ? "flex w-full justify-between border-b-[1px] border-gray-300 p-4 py-[14px] items-center cursor-pointer":"flex w-full justify-between  p-4 py-[14px] items-center cursor-pointer"}>
        <h2 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600">User</h2>
        <div className="text-gray-500 cursor-pointer p-[6px] 2xl:p-[10px] bg-[#E4E4E4] rounded-full" aria-label="Toggle visibility">
      {isAltContactVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
      </div>
    
      {/* Content */}
      {isAltContactVisible && (
        <div className="p-4 bg-white">
          <div className="w-full flex gap-[30px] mb-[20px] lg:flex-row flex-col">
            <div className="w-[100%] lg:w-[50%]">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="w-[100%] lg:w-[50%]">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
          </div>

          <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]  '>
                               <div className='w-full relative'>
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
        Designation
      </label>
      <input
        type="text"
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

          <div className="w-[100%] mb-[10px] lg:mb-[20px]">
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          <div className="w-[100%] mb-[10px] lg:mb-[20px]">
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>

          <div className="w-[100%] mb-[10px] lg:mb-[20px]">
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
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
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                Password
              </label>
              <input
                type="text"
                placeholder="Password"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
            <div className="w-[100%] lg:w-[50%]">
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                Confirm Password
              </label>
              <input
                type="text"
                placeholder="Confirm Password "
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
          </div>
          <div className="w-[100%] mb-[10px] lg:mb-[20px]">
            <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
              User Access
            </label>
            <input
              type="text"
              placeholder="user access"
              value="Propitor"
              className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
            />
          </div>
        </div>
      )}
    </div>

    {/* -----------------business------------------- */}
   <div className='rounded-md'>
   <div className={isBusinessvisible ? "border border-orange-300 rounded-md mb-6 pb-[5px]":"border border-orange-300 rounded-md mb-6 "}>
      {/* Header */}
      <div onClick={() => setisBusinessvisible(!isBusinessvisible)}  className={isBusinessvisible ? "flex w-full justify-between border-b-[1px] border-gray-300 p-4 py-[14px] items-center cursor-pointer":"flex w-full justify-between  p-4 py-[14px] items-center cursor-pointer"}>
        <h2 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600">Business</h2>
        <div className="text-gray-500 cursor-pointer p-[6px] 2xl:p-[10px] bg-[#E4E4E4] rounded-full" aria-label="Toggle visibility">
      {isBusinessvisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
      </div>
      {isBusinessvisible && (
        
        <div className='p-4 bg-white'>
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
                {/* Your Shop Name */}
                <div className="w-[100%] mb-[10px]">
                 <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Organization Name 
                 </label>
                 <input
                   type="text"
                   id="customDomainInput"
                   placeholder="  Organization Name "
                   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                 />
               </div>
               <div className="w-[100%] mb-[10px]">
                 <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Organization Phone 
                 </label>
                 <input
                   type="text"
                   id="customDomainInput"
                   placeholder=" Organization Phone "
                   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                 />
               </div>
               <div className="w-[100%] mb-[10px]">
                 <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Organization Email 
                 </label>
                 <input
                   type="text"
                   id="customDomainInput"
                   placeholder="Organization Email "
                   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                 />
               </div>
               {/* <div className="w-[100%] mb-[10px]">
                 <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Organization Address 
                 </label>
                 <input
                   type="text"
                   id="customDomainInput"
                   placeholder="Organization Address"
                   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                 />
               </div> */}
               <div className="w-full flex gap-[30px] mb-[20px] lg:flex-row flex-col">
                   <div className="w-[100%] lg:w-[50%]">
                     <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                       City
                     </label>
                     <input
                       type="text"
                       placeholder="City"
                       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                     />
                   </div>
                   <div className="w-[100%] lg:w-[50%]">
                     <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                       Post Code / Zip
                     </label>
                     <input
                       type="text"
                       placeholder="Post Code / Zip"
                       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                     />
                   </div>
                 </div>
                 <div className="w-full flex gap-[30px] mb-[20px] lg:flex-row flex-col">
                   <div className="w-[100%] lg:w-[50%]">
                     <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                       State / Country
                     </label>
                     <input
                       type="text"
                       placeholder="State / Country"
                       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                     />
                   </div>
                   <div className="w-[100%] lg:w-[50%]">
                     <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                       Country / Region
                     </label>
                     <input
                       type="text"
                       placeholder="Country / Region"
                       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                     />
                   </div>
                 </div>
                 <div className="w-[100%] mb-[10px]">
                 <label htmlFor="customDomainInput" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Language 
                 </label>
                 <input
                   type="text"
                   id="customDomainInput"
                   placeholder="Language"
                   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                 />
               </div>
                     {/* Language */}
             {/* <div className="w-[100%] mb-[10px]">
               <label htmlFor="language" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                 Language
               </label>
              <select name="language" id="" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] px-[12px]">
               <option value="">Select Language</option>
               <option value="English">English</option>
               <option value="Bangla">Bangla</option>
              </select>
             </div> */}
       <div className='w-full flex gap-[30px] mb-[20px] lg:flex-row flex-col'>
                    {/* Timezone */}
                    <div className="w-[100%] lg:w-[50%]">
             <label htmlFor="timezone" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
               Timezone
             </label>
             <select
               name="timezone"
               id="timezone"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] px-[12px]"
             >
               <option value="">Select Timezone</option>
               {timezones.map((timezone) => (
                 <option key={timezone.value} value={timezone.value}>
                   {timezone.name}
                 </option>
               ))}
             </select>
           </div>
       
             {/* Time Format */}
             <div className="w-[100%] lg:w-[50%]">
             <label htmlFor="timeFormat" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
               Time Format
             </label>
             <select
               name="timeFormat"
               id="timeFormat"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] px-[12px]"
             >
               <option value="">Select Time Format</option>
               {timeFormats.map((format) => (
                 <option key={format.value} value={format.value}>
                   {format.name}
                 </option>
               ))}
             </select>
           </div>
       </div>
                     {/* Date Format */}
        <div className="w-[100%] mb-[10px]">
             <label htmlFor="dateFormat" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
               Date Format
             </label>
             <select
               name="dateFormat"
               id="dateFormat"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] px-[12px]"
             >
               <option value="">Select Date Format</option>
               {dateFormats.map((format) => (
                 <option key={format.value} value={format.value}>
                   {format.name}
                 </option>
               ))}
             </select>
           </div>
             <div className="w-[100%] mb-[5px]">
               <label htmlFor="shopName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
               Your Sub-Domain
               </label>
               <div className="relative w-full  mt-[8px]">
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
                <div className="mb-[10px] relative w-[100%] lg:w-[50%]">
                               <label htmlFor="businesscategory" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                                 Select Category
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
        )}

      
</div>
   </div>
  {/* ----------------business------------------------ */}
    <div className="w-full border mb-[15px] border-brand_color rounded-lg shadow-sm">
        {/* Header Section with Toggle */}
        <div
          className={isContactVisible ? "flex w-full justify-between border-b-[1px] border-gray-300 p-4 py-[14px] items-center cursor-pointer":"flex w-full justify-between  p-4 py-[14px] items-center cursor-pointer"}
          onClick={() => setIsContactVisible(!isContactVisible)}
        >
          <h2 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600">Alternative Contact</h2>
          <div className="text-gray-500 p-[6px] 2xl:p-[10px] bg-[#E4E4E4] rounded-full" aria-label="Toggle visibility">
            {isContactVisible ?<FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
  
        {/* Form Section */}
        {isContactVisible && (
          <form className="w-full p-4 space-y-4">
            {/* Name */}
            <div>
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Name</label>
              <input
                type="text"
                placeholder="Name"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
  
            {/* Phone */}
            <div>
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Phone</label>
              <input
                type="text"
                placeholder="Phone"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
  
            {/* Email */}
            <div>
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Email</label>
              <input
                type="email"
                placeholder="Email"
                 className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
            </div>
          </form>
        )}
      </div>
    <div className="w-full  border border-brand_color rounded-lg shadow-sm">
        {/* Header Section with Toggle */}
        <div
          className={isVisible ? "flex w-full justify-between border-b-[1px] border-gray-300 p-4 py-[14px] items-center cursor-pointer":"flex w-full justify-between  p-4 py-[14px] items-center cursor-pointer"}
          onClick={() => setIsVisible(!isVisible)}
        >
          <h2 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600">Bank Account Details</h2>
          <div className="text-gray-500  p-[6px] 2xl:p-[10px] bg-[#E4E4E4] rounded-full" aria-label="Toggle visibility">
            {isVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
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
        {/* Form Section */}
        {isVisible && (
          <form className="w-full p-4 space-y-4">
            {/* Bank Name */}
            <div>
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                Bank Name
              </label>
              <input
                type="text"
                placeholder="Bank Name"
              className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
  
              />
            </div>
  
            {/* Account Name */}
            <div>
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                Account Name
              </label>
              <input
                type="text"
                placeholder="Account Name"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                />
            </div>
  
            {/* Account Number and Routing Number */}
            <div className="text-[15px] flex gap-[30px] justify-center w-full mt-[15px] font-[500] text-gray-600">
              <div className='w-[100%] lg:w-[50%]'>
                <label className="block text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Account Number"
                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
              </div>
              <div className=' w-[100%] lg:w-[50%]'>
                <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                  Routing Number
                </label>
                <input
                  type="text"
                  placeholder="Routing Number"
                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
              </div>
            </div>
  
            {/* Branch Name */}
            <div>
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                Branch Name
              </label>
              <input
                type="text"
                placeholder="Branch Name"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                />
            </div>
  
            {/* SWIFT Code */}
            <div>
              <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                SWIFT Code
              </label>
              <input
                type="text"
                placeholder="SWIFT Code"
               className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                />
            </div>
          </form>
        )}
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
    </section>
  )
}

export default Newcustomer