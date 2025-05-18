import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLightbulb, FaRocket, FaCrown } from 'react-icons/fa';
import { FaCcPaypal, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { FiPower } from 'react-icons/fi';
import toast, { Toaster } from "react-hot-toast"
import axios from 'axios';
import { useCustomer } from '../../context/CustomerContext';
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { BsCurrencyDollar, BsCurrencyBitcoin } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const depositMethods = [
  {
    src: "https://elon.casino/casino/icons-elon/payments/226.svg",
    label: "BKASH",
    agentNumber: "01415854748"
  },
  {
    src: "https://elon.casino/casino/icons-elon/payments/227.svg",
    label: "NAGAD",
    agentNumber: "01415854748"
  },
  {
    src: "https://elon.casino/casino/icons-elon/payments/103.svg",
    label: "ROCKET",
    agentNumber: "01415854748"
  },
];

const WalletPopup = ({ 
  walletPopupOpen, 
  setWalletPopupOpen,
  accountNumber,
  setAccountNumber,
  transactionId,
  setTransactionId,
  activeMethod,
  setActiveMethod,
  errors,
  setErrors,
  setIsLoading
}) => {
  const [tab, setTab] = useState("Peer-to-Peer");

  const handleCopy = () => {
    if (activeMethod !== null) {
      const agentNumber = depositMethods[activeMethod].agentNumber;
      navigator.clipboard.writeText(agentNumber);
      toast.success("Agent number copied to clipboard!");
    } else {
      toast.error("Please select a method first");
    }
  };

  const handleConfirm = async () => {
    const newErrors = {};
    if (!accountNumber) newErrors.accountNumber = "Account number is required";
    if (!transactionId) newErrors.transactionId = "Transaction ID is required";
    if (activeMethod === null) newErrors.paymentMethod = "Payment method is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setWalletPopupOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={walletPopupOpen ? "fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center" : "hidden"}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#121829] text-white rounded-[10px] w-full max-w-md p-6 relative"
        >
          <button onClick={() => { setWalletPopupOpen(false) }} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl">
            <MdClose />
          </button>

          <h2 className="text-xl font-bold text-center mb-5">Wallet</h2>

          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setTab("Peer-to-Peer")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${tab === "Peer-to-Peer" ? "bg-brand_color" : "border border-brand_color text-gray-300 hover:bg-brand_color"}`}
            >
              Peer-to-Peer
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mb-5">Please choose a method</p>

          {tab === "Peer-to-Peer" && (
            <>
              <p className="text-sm font-semibold mb-3">Payment Methods</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {depositMethods.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveMethod(i)}
                    className={`cursor-pointer p-3 rounded-[5px] text-center text-xs ${activeMethod === i ? "bg-brand_color" : "bg-[#1c2333] hover:bg-[#252f47]"}`}
                  >
                    <img src={item.src} alt="method" className="h-6 mx-auto mb-2" />
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-white mb-1 block">Agent Number</label>
                <div className="flex items-center rounded overflow-hidden border border-gray-600 bg-[#1c2333]">
                  <input
                    type="text"
                    readOnly
                    value={activeMethod !== null ? depositMethods[activeMethod].agentNumber : ""}
                    placeholder="Select a method to see agent number"
                    className="w-full p-2 text-white bg-transparent focus:outline-none text-sm placeholder-gray-400"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3 py-2 bg-brand_color hover:bg-opacity-80 text-sm font-medium text-white"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium">Account Number</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 rounded bg-[#1c2333] border border-gray-600 focus:outline-none"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
                {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium">Transaction ID</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 rounded bg-[#1c2333] border border-gray-600 focus:outline-none"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
                {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}
              </div>

              <button
                onClick={handleConfirm}
                className="w-full mt-3 py-2 bg-brand_color hover:bg-opacity-80 rounded text-sm font-semibold"
              >
                Confirm
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Customercheckout = () => {
  const navigate = useNavigate();
  const user_info = JSON.parse(localStorage.getItem("user"));
  const { customerData } = useCustomer();
  const savedPlan = JSON.parse(localStorage.getItem('selectedPlan'));

  // Form states
  const [formData, setFormData] = useState({
    firstName: customerData?.firstName || "",
    lastName: customerData?.lastName || "",
    email: customerData?.email || "",
    company: customerData?.organizationName || "",
    phone: customerData?.organizationPhone || "",
    address1: "",
    address2: "",
    city: customerData?.city || "",
    zip: customerData?.postCode || "",
    state: customerData?.stateCountry || "",
    country: customerData?.countryRegion || "",
    saveInfo: false,
  });

  // Wallet states
  const [walletPopupOpen, setWalletPopupOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [activeMethod, setActiveMethod] = useState(null);
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Email is not valid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.address1.trim()) newErrors.address1 = "Address line 1 is required";
    if (!formData.address2.trim()) newErrors.address2 = "Address line 2 is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zip.trim()) newErrors.zip = "Zip code is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setWalletPopupOpen(true);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const checkoutData = {
        user_id: user_info._id,
        ...formData,
        paymentMethod: activeMethod !== null ? depositMethods[activeMethod].label : "",
        selectedPlan: savedPlan || {},
        totalPrice: savedPlan?.totalPrice || 0,
        totalMonths: savedPlan?.totalMonths || 1,
        totaldiscount: savedPlan?.discount || 0,
        availableCredits: 0, // You might want to calculate this
        transactionId,
        accountNumber,
        agentNumber: activeMethod !== null ? depositMethods[activeMethod].agentNumber : "",
        reference: "", // Add reference if needed
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        createBy: user_info.firstName,
        publishBy: user_info.firstName
      };

      // Add 2-second delay before actual submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await axios.post('http://localhost:8080/customer/checkout', checkoutData);
      toast.success("Checkout successful!");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Call handleSubmit when wallet details are confirmed and loading starts
  useEffect(() => {
    if (isLoading && walletPopupOpen === false) {
      handleSubmit();
    }
  }, [isLoading, walletPopupOpen]);

  const inputStyle = (name) =>
    `w-full mt-1 rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text text-[15px] h-[45px] border-[1px] ${
      errors[name] ? "border-red-500" : "border-[#eee]"
    } p-[12px]`;
  
  const textareaStyle = (name) =>
    `w-full mt-1 rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text text-[15px] border-[1px] ${
      errors[name] ? "border-red-500" : "border-[#eee]"
    } p-[12px]`;
  
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <Toaster />
      <WalletPopup 
        walletPopupOpen={walletPopupOpen} 
        setWalletPopupOpen={setWalletPopupOpen}
        accountNumber={accountNumber}
        setAccountNumber={setAccountNumber}
        transactionId={transactionId}
        setTransactionId={setTransactionId}
        activeMethod={activeMethod}
        setActiveMethod={setActiveMethod}
        errors={errors}
        setErrors={setErrors}
        setIsLoading={setIsLoading}
      />
      {/* ------------------new customer table----------------- */}
      <section className='w-full'>
        <div className="w-full flex justify-between items-center py-[20px] px-6 relative mb-[40px]">
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
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
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
        <form onSubmit={handlePlaceOrder} className="font-poppins w-full">
          {/* Progress Bar here */}
          <div className="w-full font-jost p-4 grid pt-[50px] grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section - Delivery Details */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Delivery</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input type="text" name="firstName" placeholder="First name" className={inputStyle("firstName")} value={formData.firstName} onChange={handleChange} />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div>
                  <input type="text" name="lastName" placeholder="Last name" className={inputStyle("lastName")} value={formData.lastName} onChange={handleChange} />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>

              <div className="mt-3">
                <input type="text" name="email" placeholder="Email" className={inputStyle("email")} value={formData.email} onChange={handleChange} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="mt-3">
                <input type="text" name="company" placeholder="Company" className={inputStyle("company")} value={formData.company} onChange={handleChange} />
                {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
              </div>

              <div className="mt-3">
                <input type="text" name="phone" placeholder="Phone" className={inputStyle("phone")} value={formData.phone} onChange={handleChange} />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <textarea name="address1" placeholder="Address Line1" className={textareaStyle("address1")} value={formData.address1} onChange={handleChange}></textarea>
                  {errors.address1 && <p className="text-red-500 text-sm">{errors.address1}</p>}
                </div>
                <div>
                  <textarea name="address2" placeholder="Address Line2" className={textareaStyle("address2")} value={formData.address2} onChange={handleChange}></textarea>
                  {errors.address2 && <p className="text-red-500 text-sm">{errors.address2}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <input type="text" name="city" placeholder="City" className={inputStyle("city")} value={formData.city} onChange={handleChange} />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                <div>
                  <input type="text" name="zip" placeholder="Post Code / Zip" className={inputStyle("zip")} value={formData.zip} onChange={handleChange} />
                  {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <input type="text" name="state" placeholder="State / Country" className={inputStyle("state")} value={formData.state} onChange={handleChange} />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>
                <div>
                  <input type="text" name="country" placeholder="Country / Region" className={inputStyle("country")} value={formData.country} onChange={handleChange} />
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2 my-4">
                <input type="checkbox" id="save-info" name="saveInfo" checked={formData.saveInfo} onChange={handleChange} />
                <label htmlFor="save-info">Save this information for next time</label>
              </div>
            </div>

            {/* Right Section - Summary */}
            <div className="border rounded-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src="https://cdn.sanity.io/images/599r6htc/regionalized/5d0e1904750a4c01182e678e7b60ff90dd475be3-2880x1440.png?w=2880&h=1440&q=75&fit=max&auto=format" className="w-16 h-16 rounded-md border-gray-200 p-[10px]" />
                <div><p>{savedPlan?.name}</p></div>
              </div>
              <div className="flex justify-between mb-4"><span>Subtotal - 1 item</span><span className="font-bold">৳{savedPlan?.subtotal}</span></div>
              <div className="flex justify-between mb-4"><span>Duration</span><span className="font-bold">{savedPlan?.totalMonths} {savedPlan?.totalMonths === 1 ? "Month" : "Months"}</span></div>
              <div className="flex justify-between mb-4"><span>Discount</span><span className="font-bold">৳{savedPlan?.discount}</span></div>
              <hr className="my-4" />
              <div className="flex justify-between text-xl font-bold"><span>Total</span><span>{savedPlan?.totalPrice}</span></div>
              <button 
                type="submit" 
                className="w-full flex justify-center items-center cursor-pointer bg-brand_color text-white p-3 rounded-md mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </section>
      {/* --------------loading------------------ */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="w-[60px] h-[60px] relative">
            <div className="absolute inset-0 rounded-full border-[6px] border-t-transparent border-white animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-[4px] border-t-transparent border-brand_color animate-spin-reverse"></div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Customercheckout;