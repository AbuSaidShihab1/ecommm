import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../../context/Appcontext';
import Dashboardleftside from '../../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../../components/dashboard/Dashboardheader';
import DatePicker from "react-datepicker";
import "suneditor/dist/css/suneditor.min.css";
import "react-datepicker/dist/react-datepicker.css"; 
import { FaKey, FaEye, FaCalendarAlt } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import 'swiper/css';
import 'swiper/css/pagination';
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';

// TagInput component
const TagInput = ({ label, placeholder, availableTags, tags, setTags, error }) => {
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
        .sort((a, b) => a.localeCompare(b));
  
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
      <div className={`w-full mt-1 border rounded-md p-1 min-h-[35px] flex flex-wrap gap-2 items-center ${error ? 'border-red-500' : 'border-gray-300'}`}>
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
      {error && <p className="text-red-500 text-sm">{error}</p>}

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
    case "Package":
      return ['Package', 'Premium Package', 'Silver', 'Gold'];
    case "Exclude Package":
      return ['Gold Package', 'Silver Package',"Premium Package"];
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

const Newcoupon = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [isLoading, setIsLoading] = useState(false);
  const admin_info=JSON.parse(localStorage.getItem("admin_ecommerce"))
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    couponCode: '',
    description: '',
    discountType: 'Fixed',
    couponAmount: '',
    allowFreeShipping: false,
    startDate: '',
    expiryDate: '',
    minSpend: '',
    maxSpend: '',
    individualUseOnly: false,
    excludeSaleItems: false,
    usageLimitPerCoupon: '',
    usageLimitPerUser: '',
    usageLimitPerDay: '',
    status: 'Publish',
    visibility: 'Approved',
    publishedDate: new Date(),
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Tag states
  const [packages, setPackages] = useState([]);
  const [excludePackages, setExcludePackages] = useState([]);

  // UI states
  const [activeTab, setActiveTab] = useState("General");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingVisibility, setIsEditingVisibility] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [previousStatus, setPreviousStatus] = useState(formData.status);
  const [previousVisibility, setPreviousVisibility] = useState(formData.visibility);
  const [previousPublishedDate, setPreviousPublishedDate] = useState(formData.publishedDate);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [buttonText, setButtonText] = useState("Publish");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = [
    { label: "Approved", color: "green-500", bg: "green-100" },
    { label: "Pending", color: "orange-500", bg: "orange-100" },
    { label: "Rejected", color: "red-500", bg: "red-100" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      status: value
    });
  };

  const validateForm = () => {
    const validationErrors = {};
    
    if (!formData.couponCode.trim()) {
      validationErrors.couponCode = 'Coupon code is required';
    }
    if (!formData.description.trim()) {
      validationErrors.description = 'Description is required';
    }
    if (!formData.couponAmount) {
      validationErrors.couponAmount = 'Coupon amount is required';
    } else if (isNaN(formData.couponAmount)) {
      validationErrors.couponAmount = 'Coupon amount must be a number';
    } else if (formData.discountType === 'Percentage' && (formData.couponAmount < 1 || formData.couponAmount > 100)) {
      validationErrors.couponAmount = 'Percentage must be between 1 and 100';
    }
    
    if (formData.startDate && formData.expiryDate && new Date(formData.startDate) > new Date(formData.expiryDate)) {
      validationErrors.expiryDate = 'Expiry date must be after start date';
    }
    
    if (formData.minSpend && isNaN(formData.minSpend)) {
      validationErrors.minSpend = 'Minimum spend must be a number';
    }
    
    if (formData.maxSpend && isNaN(formData.maxSpend)) {
      validationErrors.maxSpend = 'Maximum spend must be a number';
    }
    
    if (formData.minSpend && formData.maxSpend && parseFloat(formData.minSpend) > parseFloat(formData.maxSpend)) {
      validationErrors.maxSpend = 'Maximum spend must be greater than minimum spend';
    }
    
    if (formData.usageLimitPerCoupon && isNaN(formData.usageLimitPerCoupon)) {
      validationErrors.usageLimitPerCoupon = 'Usage limit must be a number';
    }
    
    if (formData.usageLimitPerUser && isNaN(formData.usageLimitPerUser)) {
      validationErrors.usageLimitPerUser = 'Usage limit must be a number';
    }
    
    if (formData.usageLimitPerDay && isNaN(formData.usageLimitPerDay)) {
      validationErrors.usageLimitPerDay = 'Usage limit must be a number';
    }
    
    if (formData.status === 'Password' && !formData.password) {
      validationErrors.password = 'Password is required for password protected coupons';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    setIsLoading(true);

    try {
      // Prepare data for submission
      const submissionData = {
        ...formData,
        admin_id:admin_info._id,
        packages: packages.map(pkg => pkg.value),
        excludePackages: excludePackages.map(pkg => pkg.value),
        publishedDate: formData.publishedDate.toISOString(),
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : null,
      };
console.log(submissionData)
      // Replace with your actual API endpoint
      const response = await axios.post(`${base_url}/super/admin/coupons`, submissionData);
      
      if (response.status === 200 || response.status === 201) {
        setSubmitSuccess(true);
        setButtonText('Update');
        setTimeout(() => {
        setSubmitSuccess(false);
          
        }, 2000);
        // Optionally redirect or show success message
        // setTimeout(() => {
        //   navigate('/coupons'); // Redirect to coupons list after success
        // }, 2000);
      }
    } catch (error) {
      console.error('Error submitting coupon:', error);
      setErrors({
        ...errors,
        submitError: error.response?.data?.message || 'Failed to create coupon. Please try again.'
      });
    }finally{
      setIsLoading(false);
      setIsSubmitting(false);

    }
    
  };

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateToYYYYMMDD = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  const isValidDate = (dateStr) => {
    return !isNaN(new Date(dateStr));
  };

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside/>
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[10px] xl:px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] font-[600] mb-[8px]'>New Coupon</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward/></li>
                <li>Retail Customer</li>
                <li><IoIosArrowForward/></li>
                <li>New Coupon</li>
              </ul>
            </div>
          </div>
          
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">Coupon created successfully.</span>
            </div>
          )}
          
          {errors.submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{errors.submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className='flex justify-center w-full flex-col xl:flex-row gap-[20px] mt-[20px]'>
            <section className='w-full xl:w-[70%] h-auto'>
              <div className="mt-[20px]">
                <div className="w-[100%] space-y-[5px] mb-[15px]">
                  <div>
                    <label htmlFor="couponCode" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      id="couponCode"
                      name="couponCode"
                      value={formData.couponCode}
                      onChange={handleChange}
                      placeholder="Coupon Code"
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.couponCode ? 'border-red-500' : 'border-[#eee]'}`}
                    />
                    {errors.couponCode && <p className="text-red-500 text-sm">{errors.couponCode}</p>}
                  </div>
                </div>

                <div className="w-[100%] mb-[20px]">
                  <label htmlFor="description" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                    Description 
                  </label>
                  <textarea 
                    name="description" 
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Description'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[200px]  border-[1px] p-[12px] ${errors.couponCode ? 'border-red-500' : 'border-[#eee]'}`}
                  ></textarea>
                </div>

                <section>
                  <div className="max-w-6xl mx-auto bg-white rounded-md border-[1px] border-[#eee]">
                    <div
                      className="flex items-center justify-between px-4 py-[10px] border-b border-gray-200 cursor-pointer"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      <h2 className='text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600'>Coupon Data</h2>
                      {isExpanded ? (
                        <div className='w-[40px] h-[40px] bg-gray-100 flex justify-center items-center rounded-full'>
                          <FaChevronUp className="text-gray-500" />
                        </div>
                      ) : (
                        <div className='w-[40px] h-[40px] bg-gray-100 flex justify-center items-center rounded-full'>
                          <FaChevronDown className="text-gray-500" />
                        </div>
                      )}
                    </div>

                    {isExpanded && (
                      <div className="flex">
                        <div className="w-1/4 border-r border-gray-200">
                          {[
                            { name: "General", id: "General" },
                            { name: "Usage Restriction", id: "UsageRestriction" },
                            { name: "Usage Limit", id: "UsageLimit" },
                          ].map((tab) => (
                            <div
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`block w-full text-left cursor-pointer px-4 py-2 font-medium text-sm border-l-4 transition-all ${
                                activeTab === tab.id
                                  ? "text-brand_color border-brand_color bg-[#EEEEEE]"
                                  : "text-gray-500 border-transparent hover:bg-[#EEEEEE]"
                              } text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600`}
                            >
                              {tab.name}
                            </div>
                          ))}
                        </div>

                        <div className="w-3/4 p-5">
                          {activeTab === "General" && (
                            <div>
                              <div className="mb-4">
                                <label htmlFor="discountType" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Discount Type
                                </label>
                                <select
                                  id="discountType"
                                  name="discountType"
                                  value={formData.discountType}
                                  onChange={handleChange}
                                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] px-[12px]"
                                >
                                  <option value="Fixed">Fixed</option>
                                  <option value="Percentage">Percentage</option>
                                </select>
                              </div>
                              <div className="mb-4">
                                <label htmlFor="couponAmount" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Coupon Amount
                                </label>
                                <input
                                  type="number"
                                  id="couponAmount"
                                  name="couponAmount"
                                  value={formData.couponAmount}
                                  onChange={handleChange}
                                  placeholder="0"
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.couponAmount ? 'border-red-500' : 'border-[#eee]'}`}
                                />
                                {errors.couponAmount && <p className="text-red-500 text-sm">{errors.couponAmount}</p>}
                              </div>
                              <div className="mb-4 flex items-center">
                                <input
                                  type="checkbox"
                                  id="allowFreeShipping"
                                  name="allowFreeShipping"
                                  checked={formData.allowFreeShipping}
                                  onChange={handleChange}
                                  className="mr-2"
                                />
                                <label htmlFor="allowFreeShipping" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Allow Free Shipping
                                </label>
                              </div>
                              <div className="mb-4">
                                <label htmlFor="startDate" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Coupon Start Date
                                </label>
                                <input
                                  type="date"
                                  id="startDate"
                                  name="startDate"
                                  value={formData.startDate}
                                  onChange={(e) => handleChange({
                                    target: {
                                      name: 'startDate',
                                      value: e.target.value
                                    }
                                  })}
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.startDate ? 'border-red-500' : 'border-[#eee]'}`}
                                />
                                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                              </div>
                              <div className="mb-4">
                                <label htmlFor="expiryDate" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Coupon Expiry Date
                                </label>
                                <input
                                  type="date"
                                  id="expiryDate"
                                  name="expiryDate"
                                  value={formData.expiryDate}
                                  onChange={(e) => handleChange({
                                    target: {
                                      name: 'expiryDate',
                                      value: e.target.value
                                    }
                                  })}
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.expiryDate ? 'border-red-500' : 'border-[#eee]'}`}
                                />
                                {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                              </div>
                            </div>
                          )}

                          {activeTab === "UsageRestriction" && (
                            <div>
                              <div className="mb-4">
                                <label htmlFor="minSpend" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Minimum Spend
                                </label>
                                <input
                                  type="number"
                                  id="minSpend"
                                  name="minSpend"
                                  value={formData.minSpend}
                                  onChange={handleChange}
                                  placeholder="Minimum Spend"
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.minSpend ? 'border-red-500' : 'border-[#eee]'}`}
                                />
                                {errors.minSpend && <p className="text-red-500 text-sm">{errors.minSpend}</p>}
                              </div>
                              <div className="mb-4">
                                <label htmlFor="maxSpend" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Maximum Spend
                                </label>
                                <input
                                  type="number"
                                  id="maxSpend"
                                  name="maxSpend"
                                  value={formData.maxSpend}
                                  onChange={handleChange}
                                  placeholder="Maximum Spend"
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.maxSpend ? 'border-red-500' : 'border-[#eee]'}`}
                                />
                                {errors.maxSpend && <p className="text-red-500 text-sm">{errors.maxSpend}</p>}
                              </div>
                              <div className="mb-4 flex items-center">
                                <input
                                  type="checkbox"
                                  id="individualUseOnly"
                                  name="individualUseOnly"
                                  checked={formData.individualUseOnly}
                                  onChange={handleChange}
                                  className="mr-2"
                                />
                                <label htmlFor="individualUseOnly" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Individual Use Only
                                </label>
                              </div>
                              <div className="mb-4 flex items-center">
                                <input
                                  type="checkbox"
                                  id="excludeSaleItems"
                                  name="excludeSaleItems"
                                  checked={formData.excludeSaleItems}
                                  onChange={handleChange}
                                  className="mr-2"
                                />
                                <label htmlFor="excludeSaleItems" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Exclude Sale Items
                                </label>
                              </div>
                              <div className="w-full">
                                <TagInput 
                                  label="Package" 
                                  placeholder="Add Package" 
                                  availableTags={getAvailableTags("Package")} 
                                  tags={packages} 
                                  setTags={setPackages}
                                />
                                <TagInput 
                                  label="Exclude Package" 
                                  placeholder="Add Package to exclude" 
                                  availableTags={getAvailableTags("Exclude Package")} 
                                  tags={excludePackages} 
                                  setTags={setExcludePackages}
                                />
                              </div>
                            </div>
                          )}

                          {activeTab === "UsageLimit" && (
                            <div>
                              <div className="mb-4">
                                <label htmlFor="usageLimitPerCoupon" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Usage limit per coupon
                                </label>
                                <input
                                  type="number"
                                  id="usageLimitPerCoupon"
                                  name="usageLimitPerCoupon"
                                  value={formData.usageLimitPerCoupon}
                                  onChange={handleChange}
                                  placeholder="Usage limit per coupon"
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.usageLimitPerCoupon ? 'border-red-500' : 'border-[#eee]'}`}
                                />
                                {errors.usageLimitPerCoupon && <p className="text-red-500 text-sm">{errors.usageLimitPerCoupon}</p>}
                              </div>
                              <div className="mb-4">
                                <label htmlFor="usageLimitPerUser" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Usage limit per user
                                </label>
                                <input
                                  type="number"
                                  id="usageLimitPerUser"
                                  name="usageLimitPerUser"
                                  value={formData.usageLimitPerUser}
                                  onChange={handleChange}
                                  placeholder="Usage limit per user"
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.usageLimitPerUser ? 'border-red-500' : 'border-[#eee]'}`}
                                />
                                {errors.usageLimitPerUser && <p className="text-red-500 text-sm">{errors.usageLimitPerUser}</p>}
                              </div>
                              <div className="mb-4">
                                <label htmlFor="usageLimitPerDay" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
                                  Usage limit per day
                                </label>
                                <input
                                  type="number"
                                  id="usageLimitPerDay"
                                  name="usageLimitPerDay"
                                  value={formData.usageLimitPerDay}
                                  onChange={handleChange}
                                  placeholder="Usage limit per day"
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.usageLimitPerDay ? 'border-red-500' : 'border-[#eee]'}`}
                                />
                                {errors.usageLimitPerDay && <p className="text-red-500 text-sm">{errors.usageLimitPerDay}</p>}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </section>

            <section className='w-[100%] xl:w-[30%] mt-[40px]'>
              <section className='border-[1px] border-[#eee] rounded-[5px]'>
                <div className="space-y-4 flex justify-start flex-col bg-white">
                  <div className='border-b-[1px] px-[20px] py-[10px] border-[#eee]'>
                    <h1 className='text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600'>Publish</h1>
                  </div>
                  <div className='px-[15px] py-[10px] space-y-4 flex justify-start flex-col'>
                    <div className="">
                      <div className="flex items-center">
                        <FaKey className="text-gray-500 mr-2" />
                        <p className="text-sm text-gray-700">
                          Status: <span className="font-semibold">{formData.status}</span>
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
                                name="status"
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
                                name="status"
                                value="Password"
                                checked={formData.status === "Password"}
                                onChange={handleStatusChange}
                                className="mr-2 cursor-pointer"
                              />
                              Password
                            </label>
                            {formData.status === "Password" && (
                              <div>
                                <input
                                  type="text"
                                  name="password"
                                  placeholder="Password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  className={`border p-2 h-[33px] 2xl:h-[39px] rounded text-[15px] outline-brand_color 2xl:text-[16px] w-full my-[4px] ${errors.password ? 'border-red-500' : 'border-[#eee]'}`}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                              </div>
                            )}
                            <label className="block">
                              <input
                                type="radio"
                                name="status"
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
                                name="status"
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
                              setFormData({
                                ...formData,
                                status: previousStatus
                              });
                              setIsEditingStatus(false);
                            }}
                            className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

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
                                    setFormData({
                                      ...formData,
                                      visibility: option.label
                                    });
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
                            className="mt-2 bg-brand_color text-white px-3 py-1 rounded text-sm hover:bg-brand_color_hover"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => {
                              setFormData({
                                ...formData,
                                visibility: previousVisibility
                              });
                              setIsEditingVisibility(false);
                            }}
                            className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
  
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
                            onChange={(date) => setFormData({
                              ...formData,
                              publishedDate: date
                            })}
                            className="border p-1 rounded text-sm w-full"
                            dateFormat="dd-MMMM-yyyy"
                          />
                          <div>
                            <button
                              onClick={() => setIsEditingDate(false)}
                              className="mt-2 bg-brand_color text-white px-3 py-1 rounded text-sm hover:bg-brand_color_hover"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  publishedDate: previousPublishedDate
                                });
                                setIsEditingDate(false);
                              }}
                              className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
  
                      <div className="w-full flex justify-end items-center">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="mt-4 bg-brand_color text-white px-4 py-2 rounded text-sm hover:bg-brand_color_hover disabled:opacity-70"
                        >
                          {isSubmitting ? 'Saving...' : buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </form>
            {isLoading && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
    <div className="w-[60px] h-[60px] relative">
      <div className="absolute inset-0 rounded-full border-[6px] border-t-transparent border-white animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-[4px] border-t-transparent border-brand_color animate-spin-reverse"></div>
    </div>
  </div>
)}
          </section>
        </section>
      </section>
    );
  };
  
  export default Newcoupon;