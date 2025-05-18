import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { FaQuestionCircle } from "react-icons/fa";
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css';
import { FaChevronDown, FaChevronUp, FaBars } from "react-icons/fa";
import { FaCheckCircle } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import AddMethodPopup from '../getway/AddMethodPopup';
import { AiOutlinePlus } from "react-icons/ai";
import { FaEyeSlash, FaEye } from "react-icons/fa";


const emailNotifications = [
  { email: "New order", recipient: "shihabmoni15@gmail.com", contentType: "text/html" },
  { email: "Cancelled order", recipient: "shihabmoni15@gmail.com", contentType: "text/html" },
  { email: "Failed order", recipient: "shihabmoni15@gmail.com", contentType: "text/html" },
  { email: "Order on-hold", recipient: "Customer", contentType: "text/html" },
  { email: "Processing order", recipient: "Customer", contentType: "text/html" },
  { email: "Completed order", recipient: "Customer", contentType: "text/html" },
  { email: "Refunded order", recipient: "Customer", contentType: "text/html" },
  { email: "Order details", recipient: "Customer", contentType: "text/html" },
  { email: "Customer note", recipient: "Customer", contentType: "text/html" },
  { email: "Reset password", recipient: "Customer", contentType: "text/html" },
  { email: "New account", recipient: "Customer", contentType: "text/html" }
];

const Settings = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
    function handlesidebar(){
        setactivesidebar(!activesidebar)
    }
    const [maxMindKey, setMaxMindKey] = useState("");
  const [databasePath, setDatabasePath] = useState("");
    const [activeTab, setActiveTab] = useState("General");

  const tabs = [
    "General",
    "Email",
    "Products",
    "Shipping",
    "Payments",
    "Delivery",
    "Integration",
    "Accounts & Privacy",

  ];
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
// ---------------------payments----------------------
const [rows, setRows] = useState([
  {
    id: 1,
    method: "Direct bank transfer",
    description: "Take payments in person via BACS. More commonly known as direct bank/wire transfer.",
    enabled: false,
    expanded: false,
  },
  {
    id: 2,
    method: "Cheque payments",
    description: "Take payments in person via cheques. This offline gateway can also be useful to test purchases.",
    enabled: false,
    expanded: false,
  },
  {
    id: 3,
    method: "Cash on delivery",
    description: "Have your customers pay with cash (or by other means) upon delivery.",
    enabled: false,
    expanded: false,
  },
]);





// ------------------account and-privacy------------------
const [registrationPolicy, setRegistrationPolicy] = useState("");
  const [checkoutPolicy, setCheckoutPolicy] = useState("");
  const [retentionPolicies, setRetentionPolicies] = useState({
    inactiveAccounts: { value: "N/A", unit: "Months" },
    pendingOrders: { value: "N/A", unit: "Days" },
    failedOrders: { value: "N/A", unit: "Days" },
    cancelledOrders: { value: "N/A", unit: "Days" },
    completedOrders: { value: "N/A", unit: "Months" },
  });

  const handleRetentionChange = (field, key, value) => {
    setRetentionPolicies((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [key]: value,
      },
    }));
  };
  // -------------------------delivery----------------
  const [shippingMethods, setShippingMethods] = useState([]);
  const [defaultShippingZone, setDefaultShippingZone] = useState("Default Zone");
  const [enableFreeShipping, setEnableFreeShipping] = useState(false);
  const [handlingFee, setHandlingFee] = useState("");
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");

  const handleShippingMethodChange = (index, field, value) => {
    const updatedMethods = [...shippingMethods];
    updatedMethods[index][field] = value;
    setShippingMethods(updatedMethods);
  };


  const [selectedEmail, setSelectedEmail] = useState(null);
  const [viewTemplate, setViewTemplate] = useState(false);

  // -------------------shipping-addres-------------------
  const [zoneName, setZoneName] = useState('');
  const [zoneRegions, setZoneRegions] = useState('');
  const [newMethod, setNewMethod] = useState({
    title: '',
    description: '',
    enabled: false,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showZipInput, setShowZipInput] = useState(false); // State to toggle ZIP input visibility
  const [zipCodes, setZipCodes] = useState(''); // State to store ZIP codes input

  // Handle form inputs for new shipping method
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMethod((prevMethod) => ({
      ...prevMethod,
      [name]: value,
    }));
  };

  const handleToggleEnabled = () => {
    setNewMethod((prevMethod) => ({
      ...prevMethod,
      enabled: !prevMethod.enabled,
    }));
  };

  // Add a new shipping method
  const handleAddShippingMethod = () => {
    if (newMethod.title && newMethod.description) {
      setShippingMethods((prevMethods) => [...prevMethods, newMethod]);
      setNewMethod({ title: '', description: '', enabled: false });
      setShowAddForm(false);  // Hide form after adding
    }
  };

  // Remove a shipping method
  const handleRemoveShippingMethod = (index) => {
    const updatedMethods = shippingMethods.filter((_, i) => i !== index);
    setShippingMethods(updatedMethods);
  };
// --------------delivery------------------
  // State variables with new names
  const [selectedShippingZone, setSelectedShippingZone] = useState('Default Zone');
  const [isFreeShippingEnabled, setIsFreeShippingEnabled] = useState(false);
  const [additionalHandlingFee, setAdditionalHandlingFee] = useState('');
  const [deliveryTimeEstimate, setDeliveryTimeEstimate] = useState('');
  const [availableShippingMethods, setAvailableShippingMethods] = useState([{ methodName: '', methodCost: '' }]);
  const [definedShippingClasses, setDefinedShippingClasses] = useState([{ className: '' }]);
  const [isShippingCalculatorEnabled, setIsShippingCalculatorEnabled] = useState(false);
  const [isDifferentAddressAllowed, setIsDifferentAddressAllowed] = useState(false);

  // Function to add a new shipping method
  const addNewShippingMethod = () => {
    setAvailableShippingMethods([...availableShippingMethods, { methodName: '', methodCost: '' }]);
  };

  // Function to remove a shipping method
  const removeShippingMethod = (index) => {
    const updatedMethods = availableShippingMethods.filter((_, i) => i !== index);
    setAvailableShippingMethods(updatedMethods);
  };

  // Function to update a shipping method's details
  const updateShippingMethodDetails = (index, field, value) => {
    const updatedMethods = [...availableShippingMethods];
    updatedMethods[index][field] = value;
    setAvailableShippingMethods(updatedMethods);
  };

  // Function to add a new shipping class
  const addNewShippingClass = () => {
    setDefinedShippingClasses([...definedShippingClasses, { className: '' }]);
  };

  // Function to remove a shipping class
  const removeShippingClass = (index) => {
    const updatedClasses = definedShippingClasses.filter((_, i) => i !== index);
    setDefinedShippingClasses(updatedClasses);
  };

  // Function to update a shipping class name
  const updateShippingClassName = (index, value) => {
    const updatedClasses = [...definedShippingClasses];
    updatedClasses[index].className = value;
    setDefinedShippingClasses(updatedClasses);
  };
// -------------------paymnet------------------
const [paymentMethods, setPaymentMethods]  = useState([
  {
    name: 'Direct bank transfer',
    description: 'Take payments in person via BACS. More commonly known as direct bank/wire transfer.',
    enabled: true,
    action: 'Manage',
    methodName: 'BACS'
  },
  {
    name: 'Cheque payments',
    description: 'Take payments in person via cheques. This offline gateway can also be useful to test purchases.',
    enabled: false,
    action: 'Finish setup',
    methodName: 'CHEQUE'
  },
  {
    name: 'Cash on delivery',
    description: 'Have your customers pay with cash (or by other means) upon delivery.',
    enabled: false,
    action: 'Finish setup',
    methodName: 'COD'
  },
]);


// Toggle method details and action button
const toggleRow = (id) => {
  setPaymentMethods((prev) =>
    prev.map((method) =>
      method.id === id
        ? { ...method, expanded: !method.expanded, action: method.expanded ? "Finish setup" : "Manage" }
        : { ...method, expanded: false, action: "Finish setup" }
    )
  );
};

// Toggle enable/disable payment method
const toggleEnabled = (id) => {
  setPaymentMethods((prev) =>
    prev.map((method) => (method.id === id ? { ...method, enabled: !method.enabled } : method))
  );
};

// Handle drag-and-drop sorting
const handleDragEnd = (result) => {
  if (!result.destination) return;
  const items = Array.from(paymentMethods);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);
  setPaymentMethods(items);
};
// ----------------------------paymnet----------------------
const [methods, setMethods] = useState(paymentMethods);
const [showSetupForm, setShowSetupForm] = useState(false);
const [selectedMethod, setSelectedMethod] = useState(null);

const toggleSwitch = (index) => {
  const updatedMethods = [...methods];
  updatedMethods[index].enabled = !updatedMethods[index].enabled;
  setMethods(updatedMethods);
};

const toggleMethodName = (index) => {
  const updatedMethods = [...methods];
  updatedMethods[index].methodName =
    updatedMethods[index].methodName === updatedMethods[index].name
      ? paymentMethods[index].name
      : updatedMethods[index].name;
  setMethods(updatedMethods);
};

const handleActionClick = (method) => {
  if (method.action === 'Manage') {
    setShowSetupForm(true);
    setSelectedMethod(method);
  }
};



// ---------------------------deposit-metod---------------------------
  const [withdrawGateways, setWithdrawGateways] = useState([]);

  // Fetch the data from the backend when the component mounts
  useEffect(() => {
    const fetchWithdrawMethods = async () => {
      try {
        const response = await axios.get("http://localhost:8080/super/admin/deposit-methods");
        console.log(response)
        setWithdrawGateways(response.data);  // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWithdrawMethods();
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  // Handle enabling/disabling the deposit method
  const handleStatusUpdate = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Toggle the status (enable if disabled, and vice versa)
      const response = await axios.put(
        `http://localhost:8080/settings/manual/status/${id}`,
        { enabled: newStatus }
      );

      // Show success message
      Swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
      });

      // Re-fetch data after update
      const updatedGateways = await axios.get("http://localhost:8080/super/admin/deposit-methods");
      setWithdrawGateways(updatedGateways.data);

    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update status.",
        icon: "error",
      });
    }
  };

  // Handle editing the deposit method (you can implement the modal for editing here)
  const handleEdit = (id) => {
    // Implement the editing logic here, like opening a modal or navigating to another page for editing
    console.log("Edit method:", id);
  };

  // Handle deleting a deposit method
  const handleDelete = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
        const response = await axios.delete(`http://localhost:8080/super/admin/deposit-methods/${id}`);
        Swal.fire("Deleted!", response.data.message, "success");

        // Re-fetch the updated list
        const updatedGateways = await axios.get("http://localhost:8080/super/admin/deposit-methods");
        setWithdrawGateways(updatedGateways.data);
      }
    } catch (error) {
      console.error("Error deleting method:", error);
      Swal.fire("Error", "Failed to delete the deposit method.", "error");
    }
  };

  // -------------payment-method-popup------------------
    const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState([]);

  const handleAddField = (newField) => {
    setUserData([...userData, newField]);
  };

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
        
 <section className='w-[100%] pt-[30px] px-[20px]'>
 <div className='w-full md:w-auto mb-[30px]'>
                <h1 className='text-[20px] font-[600] mb-[8px]'>Setting</h1>
            <ul className='w-full flex justify-start items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
              <li>Dashboard</li>
              <li><IoIosArrowForward/></li>
              <li>Products</li>
              <li><IoIosArrowForward/></li>
              <li>Setting</li>
            </ul>
          </div>
    <div className="w-full ">
      <div className="bg-white ">
        {/* Tabs */}
        <div className="border-b border-gray-300">
<ul className="flex text-sm font-medium gap-x-2">
  {tabs.map((tab) => (
    <li
      key={tab}
      className={`px-4 py-2 cursor-pointer border ${
        activeTab === tab
          ? "border-gray-400 border-b-0 bg-white"
          : "border-t border-l border-r border-b-0 border-gray-400 bg-gray-100 hover:bg-gray-300"
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </li>
  ))}
</ul>


        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "General" &&   <section className="w-[60%] ">
            <div className="bg-white py-6 w-full">
      <h2  className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2">General Settings</h2>

      {/* Store Address Section */}
      <div className="space-y-4">
        {/* Address Line 1 */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Address Line 1</label>
          <input type="text"  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[40px] border-[1px] border-gray-300 p-[12px]" placeholder="" />

        </div>

        {/* Address Line 2 */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Address Line 2</label>
          <input type="text"  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[40px] border-[1px] border-gray-300 p-[12px]" placeholder="" />
        </div>

        {/* City */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">City</label>
          <input type="text"  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]" placeholder="" />
        </div>

        {/* Country / State */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Country / State</label>
          <select  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]">
            <option>Bangladesh - Dhaka</option>
          </select>
        </div>

        {/* Postcode / ZIP */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Postcode / ZIP</label>
          <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="" />
        </div>
      </div>

      {/* General Options Section */}
      <div className="mt-8 space-y-4">
        {/* Selling Location */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Selling Location(s)</label>
          <select  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]">
            <option>Sell to all countries</option>
          </select>
        </div>

        {/* Shipping Location */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Shipping Location(s)</label>
          <select  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]">
            <option>Ship to all countries you sell to</option>
          </select>
        </div>

        {/* Default Customer Location */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Default Customer Location</label>
          <select  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]">
            <option>Shop country/region</option>
          </select>
        </div>

        {/* Currency Options */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Currency</label>
          <select  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]">
            <option>USD - US Dollar</option>
            <option>EUR - Euro</option>
            <option>GBP - British Pound</option>
            <option>BDT - Bangladeshi Taka</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Currency Position</label>
          <select  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]">
            <option>Left</option>
            <option>Right</option>
            <option>Left with space</option>
            <option>Right with space</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Thousand Separator</label>
          <input type="text"  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]" placeholder="," />
        </div>

        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Decimal Separator</label>
          <input type="text"  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]" placeholder="." />
        </div>

        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Number of Decimals</label>
          <input type="number"  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]" placeholder="2" />
        </div>
      </div>

      {/* Enable Taxes and Coupons Section */}
      <div className="mt-8 space-y-4">
        {/* Enable Taxes */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Enable Taxes</label>
          <div className="flex items-center">
            <input type="checkbox" id="enable-taxes" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
            <label htmlFor="enable-taxes" className="ml-2 text-sm text-gray-700">Enable tax rates and calculations</label>
          </div>
        </div>

        {/* Enable Coupons */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Enable Coupons</label>
          <div className="flex items-center">
            <input type="checkbox" id="enable-coupons" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
            <label htmlFor="enable-coupons" className="ml-2 text-sm text-gray-700">Enable the use of coupon codes</label>
            <FaQuestionCircle className="ml-2 text-gray-400" />
          </div>
        </div>

        {/* Sequential Coupons */}
        <div className="grid grid-cols-2 gap-x-4 items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Sequential Coupons</label>
          <div className="flex items-center">
            <input type="checkbox" id="sequential-coupons" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
            <label htmlFor="sequential-coupons" className="ml-2 text-sm text-gray-700">Calculate coupon discounts sequentially</label>
            <FaQuestionCircle className="ml-2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="mt-8 flex justify-start">
        <button className="px-6 py-2 bg-brand_color text-white rounded-[2px] text-sm hover:bg-brand_color">Save Changes</button>
      </div>
    </div>
    </section>}
    {activeTab === "Email" && (
  <section className="w-full py-[15px] ">
   <div className="">
        {selectedEmail ? (
          <div className='w-full'>
            <h2 className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2"> Email Notification</h2>
            <p className="text-gray-600 mb-4">Configure settings for {selectedEmail.email}.</p>
            <label className="block mb-2">Enable/Disable</label>
            <input type="checkbox" className="mb-2" />
            <label className="block">Recipient</label>
            <input type="text" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]"defaultValue={selectedEmail.recipient} />
            <label className="block mt-2">Subject</label>
            <input type="text" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]" />
            <label className="block mt-2">Email Heading</label>
            <input type="text"className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]" />
            <label className="block mt-2">Additional Content</label>
            <textarea className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[120px] border-[1px] border-gray-300 p-[12px]"></textarea>
            <label className="block">Email Type</label>
            <select className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]">
              <option>HTML</option>
              <option>Plain Text</option>
            </select>
            <div className="flex gap-4 mt-[10px]">
              <button onClick={() => setViewTemplate(!viewTemplate)} className="px-6 py-2 bg-brand_color text-white rounded-[2px] text-sm hover:bg-brand_color">View Template</button>
              <button onClick={() => setSelectedEmail(null)} className="px-6 py-2 bg-gray-300 text-gray-600 rounded-[2px] text-sm hover:bg-brand_color">Dismiss</button>
            </div>
            {viewTemplate && (
              <div className="mt-4">
                <h3 className="text-[18px] 2xl:text-lg font-semibold text-gray-700  mb-2">Email Template</h3>
                <textarea className="w-full p-2 border border-gray-300 rounded bg-gray-100 h-[240px]" disabled>
                  {`<html>
                    <head><title>Email Template</title></head>
                    <body>
                      <h1>Email Template Preview</h1>
                      <p>This is a sample email template.</p>
                    </body>
                  </html>`}
                </textarea>
              </div>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-[18px] 2xl:text-lg font-semibold text-gray-700  mb-2">Email Notifications</h2>
            <p className="text-gray-600 mb-4">Email notifications sent from WooCommerce are listed below. Click on an email to configure it.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left border border-gray-300">Email</th>
                    <th className="p-3 text-left border border-gray-300">Content Type</th>
                    <th className="p-3 text-left border border-gray-300">Recipient(s)</th>
                    <th className="p-3 text-left border border-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {emailNotifications.map((notification, index) => (
                    <tr key={index} className="border border-gray-300 hover:bg-gray-100">
                      <td className="p-3 flex items-center gap-2  mt-[10px] ">
                        <FaCheckCircle className="text-blue-500" /> {notification.email}
                      </td>
                      <td className="p-3 border border-gray-300">{notification.contentType}</td>
                      <td className="p-3 border border-gray-300">{notification.recipient}</td>
                      <td className="p-3 border border-gray-300">
                        <button onClick={() => setSelectedEmail(notification)} className="border-[1px] border-brand_color text-[14px] px-4 text-brand_color py-2 rounded hover:bg-brand_color hover:text-white">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

    {/* Email Sender Options */}
    <div className="mt-8 space-y-4 w-[60%]">
      <h3 className="text-[16px] 2xl:text-lg font-semibold text-gray-800">Email Sender Options</h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center">
          <label className="w-1/3 text-sm font-medium text-gray-700">"From" Name</label>
          <input
            type="text"
           className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[40px] border-[1px] border-gray-300 p-[12px]"
            placeholder="Your Name"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-sm font-medium text-gray-700">"From" Address</label>
          <input
            type="email"
     className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[40px] border-[1px] border-gray-300 p-[12px]"
            placeholder="youremail@example.com"
          />
        </div>
      </div>
    </div>

    {/* Email Template Settings */}
    <div className="mt-8 space-y-4 w-[60%]">
      <h3 className="text-[16px] 2xl:text-lg font-semibold text-gray-800">Email Template</h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center">
          <label className="w-1/3 text-sm font-medium text-gray-700">Header Image</label>
          <input
            type="text"
          className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[40px] border-[1px] border-gray-300 p-[12px]"
            placeholder="Image URL"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-sm font-medium text-gray-700">Base Color</label>
          <input
            type="color"
            className="w-[100px] h-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue="#5575d9"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-sm font-medium text-gray-700">Background Color</label>
          <input
            type="color"
            className="w-[100px] h-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue="#ffffff"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-sm font-medium text-gray-700">Body Text Color</label>
          <input
            type="color"
            className="w-[100px] h-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue="#000000"
          />
        </div>
      </div>
    </div>

    {/* Save Changes Button */}
    <div className="mt-8 flex justify-start">
    <button className="px-6 py-2 bg-brand_color text-white rounded-[2px] text-sm hover:bg-brand_color">Save Changes</button>
    </div>
  </section>
)}
{activeTab === "Products" && (
  <section className="w-full bg-white py-[15px]">
    <h2  className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2">Products Settings</h2>

    {/* Shop Pages Section */}
    <div className="space-y-6">
      <div className="flex items-center">
        <label className="w-1/3 text-sm font-medium text-gray-700">Shop Page</label>
        <select
        className="w-1/3 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]"
        >
          <option value="shop">Shop</option>
        </select>
      </div>
      <div className="flex items-center">
        <label className="w-1/3 text-sm font-medium text-gray-700">Add to Basket Behaviour</label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700">
              Redirect to the basket page after successful addition
            </span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700">
              Enable AJAX add to basket buttons on archives
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <label className="w-1/3 text-sm font-medium text-gray-700">Placeholder Image</label>
        <input
          type="text"
        className="w-1/3 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]"
          placeholder="12"
        />
      </div>
    </div>

    {/* Measurements Section */}
    <div className="mt-8 space-y-4">
      <h3  className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2">Measurements</h3>
      <div className="flex items-center">
        <label className="w-1/3 text-sm font-medium text-gray-700">Weight Unit</label>
        <select
        className="w-1/3 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]"
        >
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>
      </div>
      <div className="flex items-center">
        <label className="w-1/3 text-sm font-medium text-gray-700">Dimensions Unit</label>
        <select
        className="w-1/3 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]"
        >
          <option value="cm">cm</option>
          <option value="in">in</option>
        </select>
      </div>
    </div>

    {/* Reviews Section */}
    <div className="mt-8 space-y-4">
      <h3  className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2">Reviews</h3>
      <div className="flex items-center">
        <label className="w-1/3 text-sm font-medium text-gray-700">Enable Reviews</label>
        <div className="w-2/3 space-y-2">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700">Enable product reviews</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700">
              Show "verified owner" label on customer reviews
            </span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700">
              Reviews can only be left by "verified owners"
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <label className="w-1/3 text-sm font-medium text-gray-700">Product Ratings</label>
        <div className="w-2/3 space-y-2">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700">Enable star rating on reviews</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700">
              Star ratings should be required, not optional
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Save Changes Button */}
    <div className="mt-8 flex justify-start">
    <button className="px-6 py-2 bg-brand_color text-white rounded-[2px] text-sm hover:bg-brand_color">Save Changes</button>

    </div>
  </section>
)}


{activeTab === "Shipping" && (
      <div className="bg-white py-[15px]">
      <h1  className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2">Shipping zones &gt; Zone</h1>

      <div className="mb-6 flex items-center">
        <label className="w-1/4 text-sm font-medium text-gray-700">Zone name</label>
        <input
          type="text"
          placeholder="Zone name"
        className="w-2/3 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]"
          value={zoneName}
          onChange={(e) => setZoneName(e.target.value)}
        />
      </div>

      <div className="mb-6 flex items-center">
        <label className="w-1/4 text-sm font-medium text-gray-700">Zone regions</label>
        <div className="w-3/4">
          <input
            type="text"
            placeholder="Start typing to filter zones"
          className="w-2/3 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]"
            value={zoneRegions}
            onChange={(e) => setZoneRegions(e.target.value)}
          />
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline mt-2 block"
            onClick={() => setShowZipInput(!showZipInput)} // Toggle ZIP input visibility
          >
            Limit to specific ZIP/postcodes
          </a>

          {showZipInput && (
            <div className="mt-2">
              <input
                type="text"
                value={zipCodes}
                onChange={(e) => setZipCodes(e.target.value)}
                placeholder="Enter ZIP/postcodes (comma separated)"
             className="w-2/3 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <label className="w-1/4 text-sm font-medium text-gray-700">Shipping methods</label>
        <div className="w-3/4">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Title</th>
                <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Enabled</th>
                <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Description</th>
                <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shippingMethods.map((method, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-sm text-gray-700">{method.title}</td>
                  <td className="border border-gray-300 p-2 text-sm text-gray-700">
                    {method.enabled ? 'Yes' : 'No'}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm text-gray-700">{method.description}</td>
                  <td className="border border-gray-300 p-2 text-sm text-gray-700">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleRemoveShippingMethod(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Show Add Shipping Method Form */}
      <div className="mb-6 flex items-center space-x-4">
        <button
        className="px-6 py-2 bg-brand_color text-white rounded-[2px] text-sm hover:bg-brand_color"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Shipping Method'}
        </button>
      </div>

      {showAddForm && (
        <div>
          <div className="mb-6 flex items-center">
            <label className="w-1/4 text-sm font-medium text-gray-700">Shipping method title</label>
            <input
              type="text"
              name="title"
              placeholder="Shipping method title"
              className="w-3/4 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={newMethod.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-6 flex items-center">
            <label className="w-1/4 text-sm font-medium text-gray-700">Shipping method description</label>
            <textarea
              name="description"
              placeholder="Shipping method description"
              className="w-3/4 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={newMethod.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              checked={newMethod.enabled}
              onChange={handleToggleEnabled}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">Enable shipping method</label>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="px-6 py-2 bg-brand_color text-white rounded-[2px] text-sm hover:bg-brand_color"
              onClick={handleAddShippingMethod}
            >
              Add method
            </button>
            <button           
   className="px-6 py-2 bg-brand_color text-white rounded-[2px] text-sm hover:bg-brand_color"
              disabled
            >
              Save changes
            </button>
          </div>
        </div>
      )}
    </div>
      )}
       {activeTab === "Payments" && (
 <div className="">
 {!showSetupForm ? (
   <div>
     <div className='flex justify-between items-center'>
    <div>
        <h2  className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2 mt-[20px]">Payment Methods</h2>
     <p className="text-sm text-gray-600 mb-4">
       Installed payment methods are listed below and can be sorted to control their display order on the frontend.
     </p>
    </div>
     <button 
        onClick={() => setShowPopup(true)}
        className='px-[20px] py-[10px] bg-orange-500 text-white text-[15px] rounded-[5px] flex items-center gap-1'
      >
        <AiOutlinePlus /> Add New
      </button>

      <AddMethodPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
        onSubmit={handleAddField}
      />
     </div>
      <div className="py-[20px] w-full">
          <div className="w-full mx-auto bg-white overflow-hidden border-[1px] border-neutral-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-800 text-[15px] text-center">
                <tr>
                  <th className="py-2 px-6 font-semibold">Gateway</th>
                  <th className="py-2 px-6 font-semibold">Status</th>
                  <th className="py-2 px-6 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-[15px]">
                {withdrawGateways.map((gateway, index) => (
                  <tr key={index} className="border-b border-neutral-200 last:border-none text-center">
                    <td className="py-4 px-6 border-r-[1px] border-neutral-300 flex justify-center items-center gap-2">
                      <img className='w-[50px] h-[50px] rounded-[5px]' src={`http://localhost:8080/uploads/${gateway.image}`}/>
                      <p className='text-[18px] font-[500]'>{gateway.gatewayName}</p>
                                          </td>
                    <td className="py-4 px-6 border-r-[1px] border-neutral-300">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${
                          gateway.enabled
                            ? "text-green-500 border-green-300 bg-green-50"
                            : "text-orange-500 border-orange-300 bg-orange-50"
                        }`}
                      >
                        {gateway.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="py-4 px-6 space-x-2 whitespace-nowrap">
                      {/* <button
                        onClick={() => handleEdit(gateway._id)}
                        className="inline-flex items-center px-3 py-1 text-sm text-[#4f3ffe] border border-[#4f3ffe] rounded-md hover:bg-[#4f3ffe] hover:text-white transition"
                      >
                        <FiEdit className="mr-1" /> Edit
                      </button> */}
                      {gateway.enabled ? (
                        <button
                          onClick={() => handleStatusUpdate(gateway._id, gateway.enabled)}
                          className="inline-flex items-center px-3 py-1 text-sm text-white border bg-red-500 border-red-300 rounded-md hover:bg-red hover:text-white transition"
                        >
                          <FaEyeSlash className="mr-1" /> Disable
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusUpdate(gateway._id, gateway.enabled)}
                          className="inline-flex items-center px-3 py-1 text-sm text-green-500 border border-green-300 rounded-md hover:bg-green-500 hover:text-white transition"
                        >
                          <FaEye className="mr-1" /> Enable
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(gateway._id)}
                        className="inline-flex items-center px-3 py-1 bg-red-500 text-sm text-white border border-red-500 rounded-md hover:bg-red hover:text-white transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
   </div>
 ) : (
   <div className="bg-white">
     <h2  className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2 mt-[20px]">{selectedMethod.name}</h2>
     <p className="mb-4 text-sm text-gray-600">{selectedMethod.description}</p>
     <div className="mb-4">
       <label className="block mb-2 font-medium">Enable/Disable</label>
       <input type="checkbox" className="mr-2" /> Enable {selectedMethod.name}
     </div>
     <div className="mb-4">
       <label className="block mb-2 font-medium">Title</label>
       <input
         type="text"
         className="w-full border p-2 rounded"
         defaultValue={selectedMethod.name}
       />
     </div>
     <div className="mb-4">
       <label className="block mb-2 font-medium">Description</label>
       <textarea
         className="w-full border p-2 rounded"
         defaultValue={selectedMethod.description}
       ></textarea>
     </div>
     <div className="mb-4">
       <label className="block mb-2 font-medium">Instructions</label>
       <textarea className="w-full border p-2 rounded"></textarea>
     </div>
     <button
          className="px-6 py-2 bg-brand_color text-white rounded-[2px] text-sm hover:bg-brand_color"

       onClick={() => setShowSetupForm(false)}
     >
       Save changes
     </button>
   </div>
 )}
</div>
)}

          { activeTab === "Accounts & Privacy" && (
   <div className="p-6 bg-white ">
   <h2 className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2">Accounts & Privacy</h2>
   <div className="space-y-6">
     {/* Enable Guest Checkout */}
     <div className="flex items-start">
       <label className="text-sm font-medium text-gray-600 flex items-center w-1/3">
         <input type="checkbox" className="mr-2" />
         Enable guest checkout (recommended)
       </label>
       <p className="text-sm text-gray-500 w-2/3">
         Allows customers to check out without creating an account.
       </p>
     </div>
 
     {/* Account Creation */}
     <div className="flex items-start">
       <label className="text-sm font-medium text-gray-600 w-1/3">
         Account Creation
       </label>
       <div className="w-2/3">
         <div className="flex items-center space-x-6">
           <label className="flex items-center">
             <input type="radio" name="accountCreation" className="mr-2" />
             During Checkout
           </label>
           <label className="flex items-center">
             <input type="radio" name="accountCreation" className="mr-2" />
             After Checkout (recommended)
           </label>
         </div>
         <p className="text-sm text-gray-500 mt-2">
           Customers can create an account before placing their order or after.
         </p>
       </div>
     </div>
 
     {/* Privacy Policies */}
     <div>
       <h3 className="text-md font-semibold mb-2">Privacy Policy</h3>
       <div className="space-y-4">
         <div className="flex items-start">
           <label className="text-sm font-medium text-gray-600 w-1/3">
             Registration Privacy Policy
           </label>
           <textarea
             value={registrationPolicy}
             onChange={(e) => setRegistrationPolicy(e.target.value)}
             placeholder="Your personal data will be used to support your experience through this website..."
             className="w-2/3 rounded-[5px] placeholder-gray-400  text-[14px] h-[100px] border-[1px] border-[#eee] p-[10px]"
           ></textarea>
         </div>
         <div className="flex items-start">
           <label className="text-sm font-medium text-gray-600 w-1/3">
             Checkout Privacy Policy
           </label>
           <textarea
             value={checkoutPolicy}
             onChange={(e) => setCheckoutPolicy(e.target.value)}
             placeholder="Your personal data will be used to process your order and for other purposes..."
             className="w-2/3 rounded-[5px] placeholder-gray-400 outline-brand_color text-[14px] h-[100px] border-[1px] border-[#eee] p-[10px]"
           ></textarea>
         </div>
       </div>
     </div>
 
     {/* Retention Policies */}
     <div>
       <h3 className="text-md font-semibold mb-2">Retention Policies</h3>
       {Object.entries(retentionPolicies).map(([key, { value, unit }]) => (
         <div key={key} className="flex items-center mb-4">
           <label className="text-sm font-medium text-gray-600 w-1/3 capitalize">
             {key.replace(/([A-Z])/g, " $1")}
           </label>
           <div className="w-2/3 flex items-center space-x-4">
             <input
               type="number"
               value={value === "N/A" ? "" : value}
               onChange={(e) =>
                 handleRetentionChange(key, "value", e.target.value || "N/A")
               }
               placeholder="N/A"
               className="w-[100px] rounded-[5px] border-[1px] outline-brand_color border-[#eee] p-[5px] text-[14px]"
             />
             <select
               value={unit}
               onChange={(e) => handleRetentionChange(key, "unit", e.target.value)}
               className="rounded-[5px] border-[1px] border-[#eee] p-[5px] text-[14px]"
             >
               <option value="Days">Days</option>
               <option value="Months">Months</option>
               <option value="Years">Years</option>
             </select>
           </div>
         </div>
       ))}
     </div>
   </div>
           <button
          type="button"
      className="px-6 py-2 bg-brand_color text-white rounded-[2px] text-sm hover:bg-brand_color mt-[40px]" 
        >
          Save Changes
        </button>
 </div>
 
      )  }
          {activeTab === "Integration" && (
      <div className="py-[15px] bg-white ">
        <h2 className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2">MaxMind Geolocation</h2>
        <p className="text-gray-600 text-[15px] 2xl:text-[16px] mb-4">
          An integration for utilizing MaxMind to do Geolocation lookups. Please
          note that this integration will only do country lookups.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {/* MaxMind License Key */}
          <label className="text-sm font-medium text-gray-600">
            MaxMind License Key
          </label>
          <input
            type="text"
            value={maxMindKey}
            onChange={(e) => setMaxMindKey(e.target.value)}
            placeholder="Enter MaxMind License Key"
 className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]"
          /> 
          <br />

          {/* Database File Path */}
          <label className="text-sm font-medium text-gray-600">
            Database File Path
          </label>
          <input
            type="text"
            value={databasePath}
            onChange={(e) => setDatabasePath(e.target.value)}
            placeholder="C:\\path\\to\\file"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]"

          />
        </div>

        <button
          type="button"
      className="px-6 py-2 bg-brand_color text-white rounded-[2px] text-sm hover:bg-brand_color mt-[40px]" 
          onClick={() => alert("Changes Saved")}
        >
          Save Changes
        </button>
      </div>
    )}
          {activeTab === "Delivery" && (
        <div className="py-[15px] bg-white">
        <h2  className="text-[18px] 2xl:text-lg font-semibold text-gray-700 mb-2">Delivery Settings</h2>
        <div className="space-y-6">
          {/* Shipping Zone Selection */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 w-1/3">
              Default Shipping Zone
            </label>
            <select
              value={selectedShippingZone}
              onChange={(e) => setSelectedShippingZone(e.target.value)}
         className="w-2/3 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 px-[12px]"
            >
              <option value="Default Zone">Default Zone</option>
              <option value="International">International</option>
              <option value="Local">Local</option>
            </select>
          </div>
  
          {/* Free Shipping Option */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 w-1/3">
              Enable Free Shipping
            </label>
            <input
              type="checkbox"
              checked={isFreeShippingEnabled}
              onChange={(e) => setIsFreeShippingEnabled(e.target.checked)}
              className="w-[20px] h-[20px] rounded-[3px] border-[1px] border-[#eee]"
            />
          </div>
  
          {/* Handling Fee Input */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 w-1/3">
              Handling Fee
            </label>
            <input
              type="number"
              value={additionalHandlingFee}
              onChange={(e) => setAdditionalHandlingFee(e.target.value)}
              placeholder="Enter handling fee"
     className="w-2/3 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]"
            />
          </div>
  
          {/* Estimated Delivery Time */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 w-1/3">
              Estimated Delivery Time
            </label>
            <input
              type="text"
              value={deliveryTimeEstimate}
              onChange={(e) => setDeliveryTimeEstimate(e.target.value)}
              placeholder="e.g., 3-5 business days"
          className="w-2/3 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[32px] 2xl:h-[37px] border-[1px] border-gray-300 p-[12px]"
            />
          </div>
  
          {/* Shipping Methods */}
          <div>
            <h3 className="text-md font-semibold mb-2">Shipping Methods</h3>
            {availableShippingMethods.map((method, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Shipping Method Name"
                  value={method.methodName}
                  onChange={(e) =>
                    updateShippingMethodDetails(index, 'methodName', e.target.value)
                  }
                  className="w-1/3 rounded-[5px] border-[1px] border-[#eee] p-[5px] text-[14px] mr-2 outline-brand_color"
                />
                <input
                  type="number"
                  placeholder="Cost"
                  value={method.methodCost}
                  onChange={(e) =>
                    updateShippingMethodDetails(index, 'methodCost', e.target.value)
                  }
                  className="w-[150px] rounded-[5px] border-[1px] border-[#eee] p-[5px] text-[14px] mr-4 outline-brand_color"
                />
                <button
                  onClick={() => removeShippingMethod(index)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addNewShippingMethod}
              className="text-sm text-orange-600"
            >
              + Add Shipping Method
            </button>
          </div>
  
          {/* Shipping Classes */}
          <div>
            <h3 className="text-md font-semibold mb-2">Shipping Classes</h3>
            {definedShippingClasses.map((shippingClass, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Shipping Class Name"
                  value={shippingClass.className}
                  onChange={(e) => updateShippingClassName(index, e.target.value)}
                  className="w-2/3 rounded-[5px] border-[1px] border-[#eee] p-[5px] text-[14px]  outline-brand_color"
                />
                <button
                  onClick={() => removeShippingClass(index)}
                  className="ml-4 text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addNewShippingClass}
              className="text-sm text-orange-600"
            >
              + Add Shipping Class
            </button>
          </div>
  
          {/* Enable Shipping Calculator */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 w-1/3">
              Enable Shipping Calculator
            </label>
            <input
              type="checkbox"
              checked={isShippingCalculatorEnabled}
              onChange={(e) => setIsShippingCalculatorEnabled(e.target.checked)}
              className="w-[20px] h-[20px] rounded-[3px] border-[1px] border-[#eee]"
            />
          </div>
  
          {/* Ship to Different Address */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 w-1/3">
              Ship to a Different Address
            </label>
            <input
              type="checkbox"
              checked={isDifferentAddressAllowed}
              onChange={(e) => setIsDifferentAddressAllowed(e.target.checked)}
              className="w-[20px] h-[20px] rounded-[3px] border-[1px] border-[#eee]"
            />
          </div>
        </div>
      </div>)}
        </div>
      </div>
    </div>
    
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Settings