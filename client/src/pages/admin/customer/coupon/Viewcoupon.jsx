import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
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

// TagInput component (keep the same as before)
const TagInput = ({ label, placeholder, availableTags, tags, setTags, error, disabled }) => {
  // ... (keep the same implementation but add disabled prop to all input elements)
};

const getAvailableTags = (label) => {
  // ... (keep the same implementation)
};

const Viewcoupon = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [isLoading, setIsLoading] = useState(false);
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const { id } = useParams();
  const admin_token = localStorage.getItem("adminToken");
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
    
    // Fetch coupon data when component mounts
    fetchCouponData();
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
  const [buttonText, setButtonText] = useState("Update");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = [
    { label: "Approved", color: "green-500", bg: "green-100" },
    { label: "Pending", color: "orange-500", bg: "orange-100" },
    { label: "Rejected", color: "red-500", bg: "red-100" },
  ];

  // Fetch coupon data
  const fetchCouponData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base_url}/super/admin/coupons/${id}`, {
        headers: {
          Authorization: `Bearer ${admin_token}`
        }
      });
      
      const couponData = response.data;
      
      // Format the data for the form
      setFormData({
        couponCode: couponData.couponCode,
        description: couponData.description,
        discountType: couponData.discountType,
        couponAmount: couponData.couponAmount,
        allowFreeShipping: couponData.allowFreeShipping,
        startDate: couponData.startDate ? formatDateToYYYYMMDD(new Date(couponData.startDate).toLocaleDateString()) : '',
        expiryDate: couponData.expiryDate ? formatDateToYYYYMMDD(new Date(couponData.expiryDate).toLocaleDateString()) : '',
        minSpend: couponData.minSpend,
        maxSpend: couponData.maxSpend,
        individualUseOnly: couponData.individualUseOnly,
        excludeSaleItems: couponData.excludeSaleItems,
        usageLimitPerCoupon: couponData.usageLimitPerCoupon,
        usageLimitPerUser: couponData.usageLimitPerUser || '',
        usageLimitPerDay: couponData.usageLimitPerDay,
        status: couponData.status,
        visibility: couponData.visibility || couponData.authorized,
        publishedDate: new Date(couponData.publishedDate),
        password: couponData.password || '',
      });
      
      // Set packages
      if (couponData.packages && couponData.packages.length > 0) {
        setPackages(couponData.packages.map((pkg, index) => ({ value: pkg, position: index })));
      }
      
      // Set exclude packages
      if (couponData.excludePackages && couponData.excludePackages.length > 0) {
        setExcludePackages(couponData.excludePackages.map((pkg, index) => ({ value: pkg, position: index })));
      }
      
    } catch (error) {
      console.error('Error fetching coupon data:', error);
      setErrors({
        ...errors,
        fetchError: error.response?.data?.message || 'Failed to fetch coupon data. Please try again.'
      });
    } finally {
      setIsLoading(false);
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
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Remove all edit handlers since this is view only
  const handleChange = () => {};
  const handleDateChange = () => {};
  const handleStatusChange = () => {};
  const validateForm = () => {};
  const handleSubmit = () => {};

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
              <h1 className='text-[20px] font-[600] mb-[8px]'> {formData.couponCode}</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward/></li>
                <li>Retail Customer</li>
                <li><IoIosArrowForward/></li>
                <li>{formData.couponCode}</li>
              </ul>
            </div>
          </div>
          
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">Coupon created successfully.</span>
            </div>
          )}
          
          {errors.fetchError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{errors.fetchError}</span>
            </div>
          )}

          <form className='flex justify-center w-full flex-col xl:flex-row gap-[20px] mt-[20px]'>
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
                      disabled
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] bg-gray-100 cursor-not-allowed`}
                    />
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
                    disabled
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[200px] border-[1px] p-[12px] bg-gray-100 cursor-not-allowed`}
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
                                  disabled
                                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] px-[12px] bg-gray-100 cursor-not-allowed"
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
                                  disabled
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] bg-gray-100 cursor-not-allowed`}
                                />
                              </div>
                              <div className="mb-4 flex items-center">
                                <input
                                  type="checkbox"
                                  id="allowFreeShipping"
                                  name="allowFreeShipping"
                                  checked={formData.allowFreeShipping}
                                  onChange={handleChange}
                                  disabled
                                  className="mr-2 cursor-not-allowed"
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
                                  onChange={handleChange}
                                  disabled
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] bg-gray-100 cursor-not-allowed`}
                                />
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
                                  onChange={handleChange}
                                  disabled
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] bg-gray-100 cursor-not-allowed`}
                                />
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
                                  disabled
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] bg-gray-100 cursor-not-allowed`}
                                />
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
                                  disabled
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] bg-gray-100 cursor-not-allowed`}
                                />
                              </div>
                              <div className="mb-4 flex items-center">
                                <input
                                  type="checkbox"
                                  id="individualUseOnly"
                                  name="individualUseOnly"
                                  checked={formData.individualUseOnly}
                                  onChange={handleChange}
                                  disabled
                                  className="mr-2 cursor-not-allowed"
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
                                  disabled
                                  className="mr-2 cursor-not-allowed"
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
                                  disabled={true}
                                />
                                <TagInput 
                                  label="Exclude Package" 
                                  placeholder="Add Package to exclude" 
                                  availableTags={getAvailableTags("Exclude Package")} 
                                  tags={excludePackages} 
                                  setTags={setExcludePackages}
                                  disabled={true}
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
                                  disabled
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] bg-gray-100 cursor-not-allowed`}
                                />
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
                                  disabled
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] bg-gray-100 cursor-not-allowed`}
                                />
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
                                  disabled
                                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] bg-gray-100 cursor-not-allowed`}
                                />
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
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FaEye className="text-gray-500 mr-2" />
                      <p className="text-sm text-gray-700">
                        Authorized: <span className="font-semibold">{formData.visibility}</span>
                      </p>
                    </div>

                    <div className="flex items-center w-full">
                      <FaCalendarAlt className="text-gray-500 mr-2" />
                      <p className="text-sm text-gray-700">
                        Publish Date:{" "}
                        <span className="font-semibold">
                          {`${formData.publishedDate.getDate()}-${formData.publishedDate.toLocaleString('default', { month: 'long' })}-${formData.publishedDate.getFullYear()}`}
                        </span>
                      </p>
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

export default Viewcoupon;