import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { GoEye } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BiExport } from "react-icons/bi";
import { BiFilterAlt } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { DateRange } from 'react-date-range';
import { motion } from "framer-motion";
import toast,{Toaster} from "react-hot-toast"
import axios from "axios"

import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import empty_img from "../../../assets/empty.png"
import format from "date-fns/format";
import { Contextapi } from '../../../context/Appcontext';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import Dashboardleftside from '../../../components/Dashboard/Dashboardleftside';
import { useSuper } from '../../../context/Superprovider';

const Paymenttransfer = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const admin_token = localStorage.getItem("adminToken")

  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const inputRef = useRef(null);




  // Close the picker if clicked outside
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setPickerVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });
        const [filter_sidebar,setfilter_sidebar]=useState(false);
        const [filter_sidebar2,setfilter_sidebar2]=useState(false);

    const {checkouts,loadingCheckouts } = useSuper();
  console.log(checkouts)
  // --------------table coulms
  const [data,setData]=useState(checkouts)
// const [data,setData] = useState([
//   {
//     id: 1,
//       invoice:"#7662w323s",
//       name: "Abu Said Shihab",
//       customer:{
//         avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
//         name: "Mr. Gregory Medhurst-Lubowitz",
//         email: "general.bergstrom@yahoo.com", 
//       },
       
//     invoice_date: "21-October-2023",
//     invoice_time: "10:30 AM",
//     due_date: "21-October-2023",
//     due_time: "10:30 AM",
//     reference:"Rimon Rahman",
//     total:"300$",
//     create_by: "Zobaer Ahmmed",
//     create_date: "21-October-2023",
//     create_time: "10:30 AM",
//     publish_by: "Zobaer Ahmmed",
//     publish_date: "21-October-2023",
//     publish_time: "02:00 PM",
//     updateby: "Zobaer Ahmmed",
//     updateDate: "21-October-2023",
//     update_time: "08:20 PM",
//     authorized: "Approved",
//     visibility:"Draft",
//     payment: "Paid",
//     status: "Active",
//   },
//   {
//     id: 1,
//       invoice:"#fsdf433",
//       customer:{
//         avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
//         name: "Mr. Gregory Medhurst-Lubowitz",
//         email: "general.bergstrom@yahoo.com", 
//       },
       
//     invoice_date: "21-October-2023",
//     invoice_time: "10:30 AM",
//     due_date: "21-October-2023",
//     due_time: "10:30 AM",
//     reference:"Rimon Rahman",
//     total:"300$",
//     create_by: "Zobaer Ahmmed",
//     create_date: "21-October-2023",
//     create_time: "10:30 AM",
//     publish_by: "Zobaer Ahmmed",
//     publish_date: "21-October-2023",
//     publish_time: "02:00 PM",
//     updateby: "Zobaer Ahmmed",
//     updateDate: "21-October-2023",
//     update_time: "08:20 PM",
//     authorized: "Approved",
//     visibility:"Publish",
//     payment: "Paid",
//     status: "Inactive",
//     action: "",
//   },
//   {
//     id: 1,
//       invoice:"#5435dsfsdf",
//       name: "Abu Said Shihab",
//       customer:{
//         avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
//         name: "Mr. Gregory Medhurst-Lubowitz",
//         email: "general.bergstrom@yahoo.com", 
//       },
       
//     invoice_date: "21-October-2023",
//     invoice_time: "10:30 AM",
//     due_date: "21-October-2023",
//     due_time: "10:30 AM",
//     reference:"Zobaer Ahammed",
//     total:"300$",
//     create_by: "Abu Siad Shihab",
//     create_date: "21-October-2023",
//     create_time: "10:30 AM",
//     publish_by: "Abu Siad Shihab",
//     publish_date: "21-October-2023",
//     publish_time: "02:00 PM",
//     updateby: "Abu Siad Shihab",
//     updateDate: "21-October-2023",
//     update_time: "08:20 PM",
//     authorized: "Pending",
//     visibility:"Draft",
//     payment: "Paid",
//     status: "Active",
//     action: "",
//   },
//   {
//     id: 2,
//       invoice:"#7662w323s",
//       name: "Rakib Hossain",
//       customer:{
//         avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
//         name: "Mr. Gregory Medhurst-Lubowitz",
//         email: "general.bergstrom@yahoo.com", 
//       },
       
//     invoice_date: "21-October-2023",
//     invoice_time: "10:30 AM",
//     due_date: "21-October-2023",
//     due_time: "10:30 AM",
//     reference:"Rakib Hossain",
//     total:"300$",
//     create_by: "Rakib Hossain",
//     create_date: "21-October-2023",
//     create_time: "10:30 AM",
//     publish_by: "Rakib Hossain",
//     publish_date: "21-October-2023",
//     publish_time: "02:00 PM",
//     updateby: "Rakib Hossain",
//     updateDate: "21-October-2023",
//     update_time: "08:20 PM",
//     authorized: "Rejected",
//     visibility:"Publish",
//     payment: "Unpaid",
//     status: "Inactive",
//     action: "",
//   },
// ]);
const columns = [
  { key: "id", label: "ID" },
  { key: "invoiceId", label: "Invoice" },
  { key: "profile_pic", label: "Customer" },
  { key: "invoiceDate", label: "Invoice Date" },
  { key: "dueDate", label: "Due Date" },
  { key: "reference", label: "Reference" },
  { key: "totalPrice", label: "Total" },
  { key: "createDate", label: "Create Date" },
  { key: "createBy", label: "Create By" },
  // { key: "create_time", label: "Created Time" },
  { key: "publishDate", label: "Publish Date" },
  { key: "publishBy", label: "Publish By" },
    { key: "updateDate", label: "Update Date" },
  { key: "updateBy", label: "Update By" },
  // { key: "publish_time", label: "Published Time" },
  { key: "authorized", label: "Authorized" },
  { key: "visibility", label: "Visibility" },
  { key: "payment", label: "Payment" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];


 const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.key)
  );

  const minVisibleColumns = 4; // Minimum number of columns that must remain visible

  // Handle column toggle
  const handleColumnToggle = (key) => {
    if (key === "action") return; // Do nothing if trying to uncheck the action column
 const handleStatusToggle = (index) => {
    const updatedData = [...data];
    updatedData[index].status =
      updatedData[index].status === "Active" ? "Inactive" : "Active";
    setData(updatedData);
  };
    setVisibleColumns((prev) => {
      if (prev.includes(key)) {
        // If the column is already visible, uncheck it, but make sure to respect the minimum visible columns
        if (prev.length > minVisibleColumns) {
          return prev.filter((colKey) => colKey !== key);
        }
      } else {
        // If the column is not visible, check it
        return [...prev, key];
      }
      return prev;
    });
  };
   // --------------------visibility-----------
                        const [selectedOption2, setSelectedOption2] = useState('Select Visibility');
                        const [isOpen2, setIsOpen2] = useState(false);
                        const dropdownRef2 = useRef(null);
                      
                        const options2 = [
                          { label: 'Select Visibility', color: 'text-gray-400', bgColor: 'bg-gray-300' },
                          { label: 'Publish', color: 'text-green-500', bgColor: 'bg-green-500' },
                          { label: 'Draft', color: 'text-gray-500', bgColor: 'bg-gray-500' },
                        ];
                      
                        // Close dropdown if clicked outside
                        useEffect(() => {
                          const handleClickOutside = (event) => {
                            if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
                              setIsOpen2(false);
                            }
                          };
                          document.addEventListener('mousedown', handleClickOutside);
                          return () => {
                            document.removeEventListener('mousedown', handleClickOutside);
                          };
                        }, []);
                      
                        const handleSelect2 = (option) => {
                          setSelectedOption2(option.label);
                          setIsOpen2(false);
                          if(option.label=="Select Visibility"){
                            setVisibility("")
                          }else{
                            setVisibility(option.label)
                          }
                        };
                          const selectedOptionData2 = options2.find(
                        (option) => option.label === selectedOption2
                      );
                      
                         // -------------authorized list --------------
                        const [selectedOption, setSelectedOption] = useState('Select Authorized');
                        const [isOpen, setIsOpen] = useState(false);
                        const dropdownRef = useRef(null);
                      
                        const options = [
                          { label: 'Select Authorized', color: 'text-gray-400', bgColor: 'bg-gray-300' },
                          { label: 'Approved', color: 'text-green-500', bgColor: 'bg-green-500' },
                          { label: 'Pending', color: 'text-orange-500', bgColor: 'bg-orange-500' },
                          { label: 'Rejected', color: 'text-red-500', bgColor: 'bg-red-500' },
                        ];
                      
                        // Close dropdown if clicked outside
                        useEffect(() => {
                          const handleClickOutside = (event) => {
                            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                              setIsOpen(false);
                            }
                          };
                          document.addEventListener('mousedown', handleClickOutside);
                          return () => {
                            document.removeEventListener('mousedown', handleClickOutside);
                          };
                        }, []);
                      
                        const handleSelect3 = (option) => {
                          setSelectedOption(option.label);
                          setIsOpen(false);
                          if(option.label=="Select Authorized"){
                            setAuthorized("")
                          }else{
                            setAuthorized(option.label)
                          }
                        };
                          const selectedOptionData = options.find(
                        (option) => option.label === selectedOption
                      );
                      // --------------------paid-----------
                        const [selectedOption4, setSelectedOption4] = useState('Select Payment');
                        const [isOpen4, setIsOpen4] = useState(false);
                        const dropdownRef4 = useRef(null);
                      
                        const options4 = [
                          { label: 'Select Payment', color: 'text-gray-400', bgColor: 'bg-gray-300' },
                          { label: 'Paid', color: 'text-green-500', bgColor: 'bg-green-500' },
                          { label: 'Unpaid', color: 'text-red-500', bgColor: 'bg-red-500' },
                        ];
                      
                        // Close dropdown if clicked outside
                        useEffect(() => {
                          const handleClickOutside = (event) => {
                            if (dropdownRef4.current && !dropdownRef4.current.contains(event.target)) {
                              setIsOpen3(false);
                            }
                          };
                          document.addEventListener('mousedown', handleClickOutside);
                          return () => {
                            document.removeEventListener('mousedown', handleClickOutside);
                          };
                        }, []);
                      
                        const handleSelect5 = (option) => {
                          setSelectedOption4(option.label);
                          setIsOpen4(false);
                          if(option.label=="Select Payment"){
                            setpayment("")
                          }else{
                            setpayment(option.label)
                          }
                        };
                          const selectedOptionData4 = options4.find(
                        (option) => option.label === selectedOption4
                      );
                      // --------------------status-----------
                        const [selectedOption3, setSelectedOption3] = useState('Select Status');
                        const [isOpen3, setIsOpen3] = useState(false);
                        const dropdownRef3 = useRef(null);
                              const [hoveredItem3, setHoveredItem3] = useState(null);
                              const [hoveredItem, setHoveredItem] = useState(null);
                              const [hoveredItem2, setHoveredItem2] = useState(null);
                              const [hoveredItem4, setHoveredItem4] = useState(null);
                      
                        const options3 = [
                          { label: 'Select Status', color: 'text-gray-400', bgColor: 'bg-gray-300' },
                          { label: 'Active', color: 'text-green-500', bgColor: 'bg-green-500' },
                          { label: 'Inactive', color: 'text-red-500', bgColor: 'bg-red-500' },
                        ];
                      
                        // Close dropdown if clicked outside
                        useEffect(() => {
                          const handleClickOutside = (event) => {
                            if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) {
                              setIsOpen3(false);
                            }
                          };
                          document.addEventListener('mousedown', handleClickOutside);
                          return () => {
                            document.removeEventListener('mousedown', handleClickOutside);
                          };
                        }, []);
                      
                        const handleSelect4 = (option) => {
                          setSelectedOption3(option.label);
                          console.log(option.labe)
                          setIsOpen3(false);
                          if(option.label=="Select Status"){
                            setstatus("")
                          }else{
                            setstatus(option.label)
                          }
                        };
                          const selectedOptionData3 = options3.find(
                        (option) => option.label === selectedOption3
                      );
                      
                      // ---------------------search-box-------------------
                      const [query, setQuery] = useState("");
                    
                      const onQueryChange = (e) => {
                        setQuery(e.target.value);
                      };
                    
                      const clearQuery = () => {
                        setQuery("");
                      };
                       // ---------------email-suggestions-------------------
                         const [emailinput,setemailinput]=useState("")
                       
                        const [emailValue, setEmailValue] = useState("");
                        const [emailSuggestions, setEmailSuggestions] = useState([]);
                      
                        // Helper function to get unique email suggestions
                        const fetchUniqueEmailSuggestions = (value) => {
                          return [
                            ...new Set(
                              data
                                .filter((item) =>
                                  item.reference.toLowerCase().includes(value.toLowerCase())
                                )
                                .map((item) => item.reference)
                            ),
                          ];
                        };
                      
                        const handleEmailInputChange = (e) => {
                          const value = e.target.value;
                          setemailinput(value);
                      
                          if (value) {
                            setEmailSuggestions(fetchUniqueEmailSuggestions(value));
                          } else {
                            setEmailSuggestions([]);
                          }
                        };
                      
                        const handleEmailSuggestionClick = (suggestion) => {
                          setemailinput(suggestion);
                          setEmailSuggestions([]); // Clear suggestions after selection
                        };
                      // -------------------create by suggestion--------------------
                      const [inputValue, setInputValue] = useState("");
                      const [suggestions, setSuggestions] = useState([]);
                    
                      const handleInputChange = (e) => {
                        const value = e.target.value;
                        setCreateByInput(value);
                    
                        // Filter suggestions based on input value and ensure uniqueness
                        if (value) {
                          const filteredSuggestions = [
                            ...new Set(
                              data
                                .filter((item) =>
                                  item.create_by.toLowerCase().includes(value.toLowerCase())
                                )
                                .map((item) => item.create_by)
                            ),
                          ];
                          setSuggestions(filteredSuggestions);
                        } else {
                          setSuggestions([]);
                        }
                      };
                    
                      const handleSuggestionClick = (suggestion) => {
                        setCreateByInput(suggestion);
                        setSuggestions([]); // Clear suggestions after selection
                      };
                      const [publishByValue, setPublishByValue] = useState("");
                      const [publishBySuggestions, setPublishBySuggestions] = useState([]);
                    
                    
                      // Helper function to get unique "publish_by" suggestions
                      const getUniqueSuggestions = (value) => {
                        return [
                          ...new Set(
                            data
                              .filter((item) =>
                                item.publish_by.toLowerCase().includes(value.toLowerCase())
                              )
                              .map((item) => item.publish_by)
                          ),
                        ];
                      };
                    
                      const handlePublishByChange = (e) => {
                        const value = e.target.value;
                        setPublishByInput(value);
                    
                        if (value) {
                          setPublishBySuggestions(getUniqueSuggestions(value));
                        } else {
                          setPublishBySuggestions([]);
                        }
                      };
                    
                      const handlePublishBySuggestionClick = (suggestion) => {
                        setPublishByInput(suggestion);
                        setPublishBySuggestions([]);
                      };
                      const [updateByValue, setUpdateByValue] = useState("");
                      const [updateBySuggestions, setUpdateBySuggestions] = useState([]);
                    
                    
                      // Helper function to get unique suggestions for "Update By"
                      const fetchUniqueUpdateBySuggestions = (value) => {
                        return [
                          ...new Set(
                            data
                              .filter((item) =>
                                item.updateby.toLowerCase().includes(value.toLowerCase())
                              )
                              .map((item) => item.updateby)
                          ),
                        ];
                      };
                    
                      const handleUpdateByInputChange = (e) => {
                        const value = e.target.value;
                        setUpdateByInput(value);
                    
                        if (value) {
                          setUpdateBySuggestions(fetchUniqueUpdateBySuggestions(value));
                        } else {
                          setUpdateBySuggestions([]);
                        }
                      };
                    
                      const handleUpdateBySuggestionClick = (suggestion) => {
                        setUpdateByInput(suggestion);
                        setUpdateBySuggestions([]);
                      };
                        // Filter data based on search term
   const [searchTerm, setSearchTerm] = useState("");
  
   const handleClearSearch = () => {
     setSearchTerm(""); // Clear the input field
   };
// -----------------all-calender---------------------

 // Create Date States
 const [showCreateCalendar, setShowCreateCalendar] = useState(false);
 const [createRange, setCreateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
 const [tempCreateRange, setTempCreateRange] = useState(createRange);

 // Publish Date States
 const [showPublishCalendar, setShowPublishCalendar] = useState(false);
 const [publishRange, setPublishRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
 const [tempPublishRange, setTempPublishRange] = useState(publishRange);

 // Update Date States
 const [showUpdateCalendar, setShowUpdateCalendar] = useState(false);
 const [updateRange, setUpdateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
 const [tempUpdateRange, setTempUpdateRange] = useState(updateRange);
// Invoice Date States
const [showInvoiceCalendar, setShowInvoiceCalendar] = useState(false);
const [invoiceRange, setInvoiceRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
const [tempInvoiceRange, setTempInvoiceRange] = useState(invoiceRange);

// Due Date States
const [showDueCalendar, setShowDueCalendar] = useState(false);
const [dueRange, setDueRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
const [tempDueRange, setTempDueRange] = useState(dueRange);

// Functions for Invoice Date
const handleInvoiceDateChange = (item) => setTempInvoiceRange([item.selection]);
const applyInvoiceDate = () => { setInvoiceRange(tempInvoiceRange); setShowInvoiceCalendar(false); };
const cancelInvoiceDate = () => { setTempInvoiceRange(invoiceRange); setShowInvoiceCalendar(false); };

// Functions for Due Date
const handleDueDateChange = (item) => setTempDueRange([item.selection]);
const applyDueDate = () => { setDueRange(tempDueRange); setShowDueCalendar(false); };
const cancelDueDate = () => { setTempDueRange(dueRange); setShowDueCalendar(false); };

 // Functions for Create Date
 const handleCreateDateChange = (item) => setTempCreateRange([item.selection]);
 const applyCreateDate = () => { setCreateRange(tempCreateRange); setShowCreateCalendar(false); };
 const cancelCreateDate = () => { setTempCreateRange(createRange); setShowCreateCalendar(false); };

 // Functions for Publish Date
 const handlePublishDateChange = (item) => setTempPublishRange([item.selection]);
 const applyPublishDate = () => { setPublishRange(tempPublishRange); setShowPublishCalendar(false); };
 const cancelPublishDate = () => { setTempPublishRange(publishRange); setShowPublishCalendar(false); };

 // Functions for Update Date
 const handleUpdateDateChange = (item) => setTempUpdateRange([item.selection]);
 const applyUpdateDate = () => { setUpdateRange(tempUpdateRange); setShowUpdateCalendar(false); };
 const cancelUpdateDate = () => { setTempUpdateRange(updateRange); setShowUpdateCalendar(false); };
// -=--------------------------------filter-system--------------------------------
// Filter data based on search term
const [createByInput,setCreateByInput]=useState("")
const [publishByInput, setPublishByInput] = useState("");
const [updateByInput, setUpdateByInput] = useState("");
const [payment,setpayment]=useState("")
const [authorized, setAuthorized] = useState("");
const [visibility, setVisibility] = useState("");
const [status, setStatus] = useState("");
const [filteredData, setFilteredData] = useState([]); // Holds the filtered data
const [originalData, setOriginalData] = useState(data); // Holds the original data (fetched from API or elsewhere)
const [searchInput, setSearchInput] = useState("");
const [filteredPublishers, setFilteredPublishers] = useState([]);
const [selectedPublisher, setSelectedPublisher] = useState(null);

  // Handles input change and filters data based on "publish_by"
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setPublishByInput(value);

    if (value.trim() === "") {
      setFilteredPublishers([]);
      return;
    }

    // Extract unique "publish_by" values and filter them based on the input
    const uniquePublishers = [...new Set(data.map((item) => item.publish_by))];
    const filtered = uniquePublishers.filter((publisher) =>
      publisher.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPublishers(filtered.map((name) => ({ id: name, publish_by: name })));
  };

  // Handles the click of a suggestion and updates the state
  const handlePublisherSelect = (publisher) => {
    setSearchInput(publisher.publish_by); // Set the name in the input field
    setPublishByInput(publisher.publish_by)
    setSelectedPublisher(publisher.publish_by); // Store the selected publisher
    setFilteredPublishers([]); // Clear the suggestions after selection
  };
  // -----------name-suggestions------------
  const [authorSuggestions, setAuthorSuggestions] = useState([]);
    const [authorinput,setauthorinput]=useState("");
    const fetchUniqueAuthorSuggestions = (value) => {
      return [
        ...new Set(
          data
            .filter((item) =>
              item.customer.name.toLowerCase().includes(value.toLowerCase())
            )
            .map((item) => item.customer.name)
        ),
      ];
    };
    const handleAuthorInputChange = (e) => {
      const value = e.target.value;
      setauthorinput(value);
  
      if (value) {
        setAuthorSuggestions(fetchUniqueAuthorSuggestions(value));
      } else {
        setAuthorSuggestions([]);
      }
    };
  
    const handleAuthorSuggestionClick = (suggestion) => {
      setauthorinput(suggestion);
      setAuthorSuggestions([]); // Clear suggestions after selection
    };
  // =============update by==================
  const [searchInputUpdateBy, setSearchInputUpdateBy] = useState("");
  const [filteredUpdateBy, setFilteredUpdateBy] = useState([]);
  const [selectedUpdateBy, setSelectedUpdateBy] = useState(null);

  // Handle input change for "Update By" field
  const handleSearchChangeUpdateBy = (e) => {
    const value = e.target.value;
    setUpdateByInput(value);

    if (value.trim() === "") {
      setFilteredUpdateBy([]);
      return;
    }

    // Extract unique "updateby" values and filter them based on the input
    const uniqueUpdateBy = [...new Set(data.map((item) => item.updateby))];
    const filtered = uniqueUpdateBy.filter((updateby) =>
      updateby.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUpdateBy(filtered.map((name) => ({ id: name, updateby: name })));
  };

  // Handle selection of updater for "Update By"
  const handleUpdateBySelect = (updateBy) => {
    setSearchInputUpdateBy(updateBy.updateby); // Set the name in the input field
    setSelectedUpdateBy(updateBy.updateby); // Store the selected updater
    setFilteredUpdateBy([]); // Clear suggestions after selection
    setUpdateByInput(updateBy.updateby)
  };
  // ------------search-box-------------------
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  // Apply Filters
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return new Date(`${month} ${day}, ${year}`);
  };
  
  const applyFilters = () => {
    const { startDate: createStartDate, endDate: createEndDate } = createRange[0];
    const { startDate: publishStartDate, endDate: publishEndDate } = publishRange[0];
  
    const filtered = data.filter((item) => {
      const matchesname = authorinput ? item.customer.name.toLowerCase().includes(authorinput.toLowerCase()) : true;
      const matchesreference = emailinput ? item.reference.toLowerCase().includes(emailinput.toLowerCase()) : true;
      const matchesCreateBy = createByInput ? item.create_by.toLowerCase().includes(createByInput.toLowerCase()) : true;
      const matchesPublishBy = publishByInput ? item.publish_by.toLowerCase().includes(publishByInput.toLowerCase()) : true;
      const matchesUpdateBy = updateByInput ? item.updateby.toLowerCase().includes(updateByInput.toLowerCase()) : true;
      const matchesAuthorized = authorized ? item.authorized === authorized : true;
      const matchespayment = payment ? item.payment === payment : true;
      const matchesVisibility = visibility ? item.visibility === visibility : true;
      const matchesStatus = status ? item.status === status : true;

      const matchesSearchTerm = searchTerm ? item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || item.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase()) || item.createBy.toLowerCase().includes(searchTerm.toLowerCase()) || item.createDate.toLowerCase().includes(searchTerm.toLowerCase()) || item.publishBy.toLowerCase().includes(searchTerm.toLowerCase()) || item.publishDate.toLowerCase().includes(searchTerm.toLowerCase()) || item.updateBy.toLowerCase().includes(searchTerm.toLowerCase()) || item.updateDate.toLowerCase().includes(searchTerm.toLowerCase()) || item.authorized.toLowerCase().includes(searchTerm.toLowerCase()) || item.status.toLowerCase().includes(searchTerm.toLowerCase()) : true;
  
      // Create Date filter
      // const matchesCreateDate = itemCreateDate >= new Date(createStartDate) && itemCreateDate <= new Date(createEndDate);
      // Publish Date filter
      // const matchesPublishDate = itemPublishDate >= new Date(publishStartDate) && itemPublishDate <= new Date(publishEndDate);
  
      return (
        matchesname &&
        matchesreference &&
        matchesCreateBy &&
        matchesPublishBy &&
        matchesUpdateBy &&
        matchesAuthorized &&
        matchesVisibility &&
        matchespayment &&
        matchesStatus &&
        matchesSearchTerm
        // matchesCreateDate 
        // matchesPublishDate
      );
    });
  
    setFilteredData(filtered);
  };
  
  useEffect(() => {
    applyFilters();
  }, [searchTerm,authorinput,emailinput,createByInput,publishByInput, updateByInput, authorized, visibility,payment,status]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  // -------------clear-filter-data-------------------
  const clear_filter_data=()=>{
    setCreateByInput("");
    setPublishByInput("");
    setUpdateByInput("");
    setauthorinput("")
    setAuthorized("");
    setVisibility("");
    setStatus("");
    setemailinput("")
    setSearchTerm("");
    setpayment("")
    setSelectedOption("Select Authorized");
    setSelectedOption2("Select Visibility");
    setSelectedOption3("Select Status");
    setSelectedOption4("Select Payment");
    // setFilteredData(originalData);
    // setOriginalData(data)

  }
   // ------------------delete-------------------------
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [ticketToDelete, setTicketToDelete] = useState(null);
const handleDeleteTicket = async () => {
  const toastId = toast.loading('Deleting Payment Transfer...');
  
  try {
    const response = await fetch(`${base_url}/super/admin/checkout/${ticketToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });

    const data = await response.json();

    if (data) {
      // Update state to remove the deleted ticket
      toast.success('Payment Transfer deleted successfully!', {
        id: toastId,
        duration: 4000,
      });
    } else {
      toast.error(data.message || 'Failed to delete Payment Transfer', {
        id: toastId,
        duration: 4000,
      });
    }
  } catch (error) {
    console.error('Error deleting Payment Transfer:', error);
    toast.error('Error deleting Payment Transfer. Please try again.', {
      id: toastId,
      duration: 4000,
    });
  } finally {
    setDeleteDialogOpen(false);
    setTicketToDelete(null);
  }
};
// --------------------status-update---------------------------
const toggleStatus = async (rowIndex, newStatus) => {
  const checkoutId = data[rowIndex]._id; // Adjust this if your data source is different

  try {
    const res = await axios.patch(`${base_url}/super/admin/checkout/${checkoutId}/status`, {
      status: newStatus,
    });

    // Optional: update frontend state if needed
    const updatedData = [...data];
    updatedData[rowIndex].status = newStatus;
    setData(updatedData); // assumes you have `data` state and `setData`

    toast.success("Status updated successfully");
  } catch (error) {
    toast.error("Failed to update status");
    console.error(error);
  }
};

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
            <Toaster/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
 <section className='w-[100%] m-auto py-[20px]  xl:py-[40px] px-[20px] lg:px-[30px]'>
     <div className='w-full flex md:justify-between items-center  md:flex-row flex-col justify-start'>
        <div className='w-full md:w-auto'>
              <h1 className='text-[20px] font-[600] mb-[8px]'>Payment Transfer </h1>
          <ul className='w-full   md:w-auto flex lg:justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Retail Customer</li>
            <li><IoIosArrowForward/></li>
            <li>Payment Transfer</li>
          </ul>
        </div>
        {/* -------------------table------------------- */}

        {/* ---------------table --------------- */}
       <div className='w-full   md:w-auto flex gap-[10px] md:m-0 mt-[15px]'>
             <button className='w-[50%] md:w-auto px-[15px] py-[6px] text-black text-[14px] gap-[8px]  border-[1px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'>
                <BiExport className='text-[20px]'/>
                Export
            </button>
            <NavLink to="/super-new-payment "className="w-[50%] md:w-auto ">
               <button className='px-[12px] w-[100%] md:w-auto py-[6px] font-[500] border-[2px] border-brand_color  text-white rounded-[5px] text-[14px] bg-brand_color flex justify-center items-center gap-[10px]'>
            <LuPlus className='text-[22px]'/>
            Add New
        </button>
            </NavLink>
           </div>

       </div>
       {/* ------------------new customer table----------------- */}
<section className='mt-[2px] lg:mt-[20px] '>
<div className="relative  sm:rounded-lg">
    <div className="flex items-center justify-between mb-[20px] flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
  <div className='w-full flex justify-between items-center mb-[14px] md:flex-row flex-col'>
  {/* Search Bar */}
  <div className="relative w-full md:w-auto">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        type="text"
        id="table-search-users"
        className="block h-[39px] ps-10 w-full text-sm text-gray-900 border border-gray-300 rounded-lg lg:w-80 outline-brand_color bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for Invoice"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Close Icon */}
      {searchTerm.length > 1 && (
        <div
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          onClick={handleClearSearch}
        >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </div>
      {/* -----------search-bar-------------- */}
 <div className='w-full md:w-auto flex justify-center items-center gap-[10px]  '>
    <button onClick={()=>{setfilter_sidebar(true)}}  className='w-[50%] md:w-auto text-[14px] border-[1px] border-[#eee] hover:text-brand_color transition-all duration-100 px-[17px] py-[7px] flex justify-center hover:border-brand_color items-center gap-[7px] rounded-[5px]'>
          <BiFilterAlt className='text-[20px]'/> Filters
    </button>
    <div className="relative w-[50%] md:w-auto inline-block text-left ">
  <div>
    <div className="w-[100%] md:w-auto  relative inline-block text-left ">
  <div className="w-[100%] md:w-auto  relative inline-block text-left ">
      <button onClick={()=>{setfilter_sidebar2(!filter_sidebar2)}} className='w-[100%] md:w-auto  text-[14px] border-[1px] hover:text-brand_color transition-all duration-100 border-[#eee] px-[17px] hover:border-brand_color py-[7px] flex justify-center items-center gap-[7px] rounded-[5px]'>
        <BsGrid className='text-[20px]'/>
    </button>
  </div>
  {/* -------------------filter popup------------------ */}
  {/* Delete Confirmation Dialog */}
  {deleteDialogOpen && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] transition-all duration-300 ease-in-out">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden w-full max-w-md mx-4 border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                <svg
                  className="w-6 h-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Confirm Deletion
              </h3>
            </div>
            <button
              onClick={() => {
                setDeleteDialogOpen(false);
                setTicketToDelete(null);
              }}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <CgClose className="w-5 h-5" />
            </button>
          </div>
  
          <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">
            Are you sure you want to delete this Transaction? This action cannot be undone and all
            related data will be permanently removed.
          </p>
  
          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setDeleteDialogOpen(false);
                setTicketToDelete(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDeleteTicket}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1.5"
            >
              <MdDeleteOutline className="w-4 h-4" />
              <span>Delete</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )}
        {/* -------------------filter popup------------------ */}
        <section className={filter_sidebar ?  'fixed top-0 right-0  flex justify-end w-full h-[100%] z-[1099900000]':'fixed top-0 right-[-130%] transition-all duration-[1s]  flex justify-end w-full h-[100%] z-[1099900000]'}>
              <div className={filter_sidebar ? 'w-[100%]  bg-[rgba(0,0,0,0.4)] h-[100vh]':'hidden  transition-all duration-500 bg-[rgba(0,0,0,0.4)] h-[100vh]'} onClick={()=>{setfilter_sidebar(false)}}>

           </div>
            <div className={filter_sidebar ? ' h-[100vh] bg-white w-[80%] absolute top-0 right-0 md:w-[60%] xl:w-[35%] 2xl:w-[25%] transition-all duration-500  overflow-y-auto shadow-2xl no-scrollbar border-l-[1px] border-[#eee]':' h-[100vh] bg-white w-[80%] transition-all duration-[2s] absolute top-0 right-[-120%] md:w-[60%] xl:w-[35%] 2xl:w-[25%]  overflow-y-auto shadow-2xl no-scrollbar border-l-[1px] border-[#eee]'}>
               <div className='  p-[20px] border-b-[1px] border-[#eee] flex justify-between items-center'>
                <h1 className='text-[16px] md:text-[18px] font-[600] text-black'>Table Filters</h1>
                <button onClick={()=>{setfilter_sidebar(false)}} className='cursor-pointer text-[20px]'><CgClose/></button>
               </div>

<section className="p-[20px] relative w-[100%] ">
    <div className="w-full ">
      <div className=" w-full ">
        <div className="box rounded-xl bg-white w-full ">
          <h6 className="font-medium text-base leading-7 text-black mb-5">Choose Options</h6>
          <div className="flex items-center mb-[10px] gap-1  w-full">
            <div className='w-full'>
            <div className="mb-[10px] mt-[10px] relative">
      <label htmlFor="author" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      Customer 
      </label>
      <br />
      <input
        type="text"
        placeholder="Customer"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={authorinput}
        onChange={handleAuthorInputChange}
      />
      {authorSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {authorSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleAuthorSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>

  {/* Create Date Section */}
<div className="mb-[10px]">
  <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Invoice Date</label>
  <br />
  <div style={{ position: "relative", width: "100%" }}>
    <input
      type="text"
      readOnly
      value={`${format(invoiceRange[0].startDate, "dd-MM-yyyy")} - ${format(invoiceRange[0].endDate, "dd-MM-yyyy")}`}
      onClick={() => setShowInvoiceCalendar(true)}
      placeholder="Select Date Range"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
    />
    {showInvoiceCalendar && (
      <div className="absolute z-10 bg-white shadow-md border-[1px] border-[#eee] w-full p-2">
        <DateRange ranges={tempInvoiceRange} onChange={handleInvoiceDateChange} months={1} rangeColors={["#4A90E2"]} />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={cancelInvoiceDate} className="px-3 py-1 border rounded bg-gray-300">Cancel</button>
          <button onClick={applyInvoiceDate} className="px-3 py-1 border rounded bg-indigo-600 text-white">Apply</button>
        </div>
      </div>
    )}
  </div>
</div>
<div className="mb-[10px]">
  <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Due Date</label>
  <br />
  <div style={{ position: "relative", width: "100%" }}>
    <input
      type="text"
      readOnly
      value={`${format(dueRange[0].startDate, "dd-MM-yyyy")} - ${format(dueRange[0].endDate, "dd-MM-yyyy")}`}
      onClick={() => setShowDueCalendar(true)}
      placeholder="Select Date Range"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
    />
    {showDueCalendar && (
      <div className="absolute z-10 bg-white shadow-md border-[1px] border-[#eee] w-full p-2">
        <DateRange ranges={tempDueRange} onChange={handleDueDateChange} months={1} rangeColors={["#4A90E2"]} />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={cancelDueDate} className="px-3 py-1 border rounded bg-gray-300">Cancel</button>
          <button onClick={applyDueDate} className="px-3 py-1 border rounded bg-indigo-600 text-white">Apply</button>
        </div>
      </div>
    )}
  </div>
</div>
<div className="mb-[10px] mt-[10px] relative">
      <label htmlFor="email" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Reference
      </label>
      <br />
      <input
        type="text"
        placeholder="Reference"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={emailinput}
        onChange={handleEmailInputChange}
      />
      {emailSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {emailSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleEmailSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="mb-[10px]">
  <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Create Date</label>
  <br />
  <div style={{ position: "relative", width: "100%" }}>
    <input
      type="text"
      readOnly
      value={`${format(dueRange[0].startDate, "dd-MM-yyyy")} - ${format(dueRange[0].endDate, "dd-MM-yyyy")}`}
      onClick={() => setShowDueCalendar(true)}
      placeholder="Select Date Range"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
    />
    {showDueCalendar && (
      <div className="absolute z-10 bg-white shadow-md border-[1px] border-[#eee] w-full p-2">
        <DateRange ranges={tempDueRange} onChange={handleDueDateChange} months={1} rangeColors={["#4A90E2"]} />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={cancelDueDate} className="px-3 py-1 border rounded bg-gray-300">Cancel</button>
          <button onClick={applyDueDate} className="px-3 py-1 border rounded bg-indigo-600 text-white">Apply</button>
        </div>
      </div>
    )}
  </div>
</div>
              <div className="mb-[10px]  relative">
      <label htmlFor="name" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Create By
      </label>
      <br />
      <input
        type="text"
        placeholder="Create By"
         className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={createByInput}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
              <div>

         
       

      
{/* Publish Date Section */}
<div className="mb-[10px]">
  <label className="text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight">Publish Date</label>
  <br />
  <div style={{ position: "relative", width: "100%" }}>
    <input
      type="text"
      readOnly
      value={`${format(publishRange[0].startDate, "dd-MM-yyyy")} - ${format(publishRange[0].endDate, "dd-MM-yyyy")}`}
      onClick={() => setShowPublishCalendar(true)}
      placeholder="Select Date Range"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
    />
    {showPublishCalendar && (
      <div className="absolute z-10 bg-white shadow-md border-[1px] border-[#eee] w-full p-2">
        <DateRange ranges={tempPublishRange} onChange={handlePublishDateChange} months={1} rangeColors={["#4A90E2"]} />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={cancelPublishDate} className="px-3 py-1 text-[13px] 2xl:text-[15px] border rounded bg-gray-300">Cancel</button>
          <button onClick={applyPublishDate} className="px-3 py-1 border rounded bg-brand_color text-[13px] 2xl:text-[15px] text-white">Apply</button>
        </div>
      </div>
    )}
  </div>
</div>
              <div className="mb-[10px] mt-[10px] relative">
      <label htmlFor="publish_by" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Publish By
      </label>
      <br />
      <input
        type="text"
        placeholder="Publish By"
          className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={publishByInput}
        onChange={handlePublishByChange}
      />
      {publishBySuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {publishBySuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handlePublishBySuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
    {/* Update Date Section */}
<div className="mb-[10px]">
  <label className="text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight">Update Date</label>
  <br />
  <div style={{ position: "relative", width: "100%" }}>
    <input
      type="text"
      readOnly
      value={`${format(updateRange[0].startDate, "dd-MM-yyyy")} - ${format(updateRange[0].endDate, "dd-MM-yyyy")}`}
      onClick={() => setShowUpdateCalendar(true)}
      placeholder="Select Date Range"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
    />
    {showUpdateCalendar && (
      <div className="absolute z-10 bg-white shadow-md border-[1px] border-[#eee] w-full p-2">
        <DateRange ranges={tempUpdateRange} onChange={handleUpdateDateChange} months={1} rangeColors={["#4A90E2"]} />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={cancelUpdateDate} className="px-3 py-1 border rounded bg-gray-300 text-[13px] 2xl:text-[15px]">Cancel</button>
          <button onClick={applyUpdateDate} className="px-3 py-1 border rounded bg-brand_color text-[13px] 2xl:text-[15px] text-white">Apply</button>
        </div>
      </div>
    )}
  </div>
</div>
              <div className="mt-[10px] relative">
      <label htmlFor="update_by" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Update By
      </label>
      <br />
      <input
        type="text"
        placeholder="Update By"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={updateByInput}
        onChange={handleUpdateByInputChange}
      />
      {updateBySuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {updateBySuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleUpdateBySuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
              </div>
            </div>
            
   </div>

   <div className='mb-[10px] mt-[10px]'>
  <label htmlFor="name" className='text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight'>Authorized</label><br />
  <div ref={dropdownRef} className="relative w-full mt-[5px]">
    {/* Dropdown Button */}
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center justify-between bg-white border border-[#eee] rounded-[5px] text-input_text 2xl:text-[16px] h-input_height px-input_padding mt-[3px] cursor-pointer hover:border-brand_color"
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full ${selectedOptionData?.bgColor}`}
        ></span>
        <span className={`font-label_weight ${selectedOptionData?.color}`}>
          {selectedOption}
        </span>
      </div>
      <svg
        className={`w-5 h-5 text-gray-500 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    {/* Dropdown Menu */}
    {isOpen && (
      <ul
        className="absolute mt-1 w-full bg-white border font-poppins border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-auto"
        onMouseLeave={() => setHoveredItem(null)} // Reset hovered item when mouse leaves dropdown
      >
        {options.map((option) => (
          <li
            key={option.label}
            onClick={() => handleSelect3(option)}
            onMouseEnter={() => setHoveredItem(option.label)} // Set hovered item
            className={`px-4 py-2 flex items-center gap-2 font-label_weight text-label_size cursor-pointer mt-[5px] 
              ${
                hoveredItem === option.label
                  ? `bg-gray-100 ${option.color}` // Hover background
                  : selectedOption === option.label && !hoveredItem
                  ? `bg-gray-100 ${option.color}` // Active background (only when no item is hovered)
                  : `${option.color}`
              }`}
          >
            <span
              className={`w-3 h-3 rounded-full ${
                hoveredItem === option.label
                  ? `${option.bgColor}`
                  : selectedOption === option.label && !hoveredItem
                  ? 'bg-white'
                  : option.bgColor
              }`}
            ></span>
            {option.label}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
             
       

              <div className="mb-[10px]">
        <label className="text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight">Visibility</label>
        <br />
        <div ref={dropdownRef2} className="relative w-full mt-[5px]">
          <div
            onClick={() => setIsOpen2(!isOpen2)}
            className="flex items-center justify-between bg-white border border-[#eee] rounded-[5px] text-input_text 2xl:text-[16px] h-input_height px-input_padding mt-[3px] cursor-pointer hover:border-brand_color"
          >
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${selectedOptionData2?.bgColor}`}></span>
              <span className={`font-label_weight ${selectedOptionData2?.color}`}>{selectedOption2}</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${isOpen2 ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isOpen2 && (
            <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
              {options2.map((option) => (
                <li
                  key={option.label}
                  onClick={() => handleSelect2(option)}
                  onMouseEnter={() => setHoveredItem2(option.label)}
                  className={`px-4 py-2 flex items-center gap-2 cursor-pointer mt-[5px] font-label_weight text-label_size 
                    ${
                      hoveredItem2 === option.label
                        ? `bg-gray-100 ${option.color}`
                        : selectedOption2 === option.label && !hoveredItem2
                        ? `bg-gray-100 ${option.color}`
                        : `${option.color}`
                    }`}
                >
                  <span className={`w-3 h-3 rounded-full ${hoveredItem2 === option.label ? option.bgColor : selectedOption2 === option.label && !hoveredItem2 ? "bg-white" : option.bgColor}`}></span>
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className='mb-[10px] mt-[10px]'>
  <label htmlFor="name" className='text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight'>Payment</label><br />
  <div ref={dropdownRef4} className="relative w-full mt-[5px]">
    {/* Dropdown Button */}
    <div
      onClick={() => setIsOpen4(!isOpen4)}
      className="flex items-center justify-between bg-white border border-[#eee] rounded-[5px] text-input_text 2xl:text-[16px] h-input_height px-input_padding mt-[3px] cursor-pointer hover:border-brand_color"
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full ${selectedOptionData4?.bgColor}`}
        ></span>
        <span className={`font-label_weight ${selectedOptionData4?.color}`}>
          {selectedOption4}
        </span>
      </div>
      <svg
        className={`w-5 h-5 text-gray-500 transition-transform ${
          isOpen4 ? 'rotate-180' : ''
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    {/* Dropdown Menu */}
    {isOpen4 && (
      <ul
        className="absolute mt-1 w-full bg-white border font-poppins border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-auto"
        onMouseLeave={() => setHoveredItem4(null)} // Reset hovered item when mouse leaves dropdown
      >
        {options4.map((option) => (
          <li
            key={option.label}
            onClick={() => handleSelect5(option)}
            onMouseEnter={() => setHoveredItem4(option.label)} // Set hovered item
            className={`px-4 py-2 flex items-center gap-2 font-label_weight text-label_size cursor-pointer mt-[5px] 
              ${
                hoveredItem4 === option.label
                  ? `bg-gray-100 ${option.color}` // Hover background
                  : selectedOption4 === option.label && !hoveredItem4
                  ? `bg-gray-100 ${option.color}` // Active background (only when no item is hovered)
                  : `${option.color}`
              }`}
          >
            <span
              className={`w-3 h-3 rounded-full ${
                hoveredItem4 === option.label
                  ? `${option.bgColor}`
                  : selectedOption4 === option.label && !hoveredItem4
                  ? 'bg-white'
                  : option.bgColor
              }`}
            ></span>
            {option.label}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

<div  className='mb-[10px]'>
                <label htmlFor="name"className='text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight'>Status</label><br />
                <div ref={dropdownRef3} className="relative w-full mt-[5px]">
          <div
            onClick={() => setIsOpen3(!isOpen3)}
            className="flex items-center justify-between bg-white border border-[#eee] rounded-[5px] text-input_text 2xl:text-[16px] h-input_height px-input_padding mt-[3px] cursor-pointer hover:border-brand_color"
          >
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${selectedOptionData3?.bgColor}`}></span>
              <span className={`font-label_weight ${selectedOptionData3?.color}`}>{selectedOption3}</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${isOpen3 ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isOpen3 && (
            <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
              {options3.map((option) => (
                <li
                  key={option.label}
                  onClick={() => handleSelect4(option)}
                  onMouseEnter={() => setHoveredItem3(option.label)}
                  className={`px-4 py-2 flex items-center gap-2 cursor-pointer mt-[5px] font-label_weight text-label_size 
                    ${
                      hoveredItem3 === option.label
                        ? `bg-gray-100 ${option.color}`
                        : selectedOption3 === option.label && !hoveredItem3
                        ? `bg-gray-100 ${option.color}`
                        : `${option.color}`
                    }`}
                >
                  <span className={`w-3 h-3 rounded-full ${hoveredItem3 === option.label ? option.bgColor : selectedOption3 === option.label && !hoveredItem3? "bg-white" : option.bgColor}`}></span>
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
              </div>
                                  {
                                                               authorinput==""&&  emailinput==""&&   createByInput==""&&  publishByInput=="" && updateByInput=="" &&  selectedOption=="Select Authorized" && selectedOption2=="Select Visibility" && selectedOption3=="Select Status" && selectedOption4=="Select Payment"? "":            <button
                                                                 className="w-full h-btn_height 2xl:h-[45px] text-[13px] 2xl:text-[15px] bg-[#EAEAEC] text-gray-600 flex mt-[20px] mb-[10px] justify-center items-center gap-2 rounded-[5px] font-poppins"
                                                                 onClick={clear_filter_data}
                                                               >
                                                                 <RiDeleteBin6Line /> Clear
                                                               </button>    
                                                               }
                                                                                                <button
  className="w-full h-btn_height font-[500] py-2.5 flex 2xl:h-[45px] items-center justify-center gap-2 rounded-[5px] bg-brand_color text-white 2xl:font-semibold text-[13px]"
  onClick={applyFilters} // Trigger filtering
>
  Show Results
</button>
                                     
        </div>
  
      </div>
      <div className="col-span-12 md:col-span-9" />
    </div>
</section>

                        


            </div>
        </section>
        {/* ------------column----------------- */}
         <section className={filter_sidebar2 ?  'fixed top-0 right-0  flex justify-end w-full h-[100%] z-[1099900000]':'fixed top-0 right-[-130%] transition-all duration-[1s]  flex justify-end w-full h-[100%] z-[1099900000]'}>
               <div className={filter_sidebar2 ? 'w-[100%]  bg-[rgba(0,0,0,0.4)] h-[100vh]':'hidden  transition-all duration-500 bg-[rgba(0,0,0,0.4)] h-[100vh]'} onClick={()=>{setfilter_sidebar2(false)}}>

           </div>
            <div className={filter_sidebar2 ? ' h-[100vh] bg-white w-[80%] absolute top-0 right-0 md:w-[60%] xl:w-[35%] 2xl:w-[25%] transition-all duration-500  overflow-y-auto shadow-2xl no-scrollbar border-l-[1px] border-[#eee]':' h-[100vh] bg-white w-[80%] transition-all duration-[2s] absolute top-0 right-[-120%] md:w-[60%] xl:w-[35%] 2xl:w-[25%]  overflow-y-auto shadow-2xl no-scrollbar border-l-[1px] border-[#eee]'}>
               <div className='p-[20px] border-b-[1px] border-[#eee] flex justify-between items-center'>
                <h1 className='text-[18px] font-[600] text-black'>Change Columns</h1>
                <button onClick={()=>{setfilter_sidebar2(false)}} className='cursor-pointer text-[20px]'><CgClose/></button>
               </div>

<section className="p-[20px] relative w-[100%] ">
    <div className="w-full">
      <div className="w-full ">
        <div className="box rounded-xl bg-white w-full ">
          <h6 className="font-medium text-base leading-7 text-black mb-5">Choose Options</h6>
          <div className='w-full flex flex-wrap justify-between flex-1 gap-[15px]'>
      {columns.map((col) => (
                      <label
                        key={col.key}
                        htmlFor={`checkbox-${col.key}`}
                        className="flex p-3 w-full cursor-pointer bg-white border border-gray-300 rounded-md text-sm"
                      >
                        <input
                          checked={visibleColumns.includes(col.key)}
                          onChange={() => handleColumnToggle(col.key)}
                          type="checkbox"
                          className="w-5 h-5 appearance-none cursor-pointer border border-gray-300 rounded-md mr-2 checked:bg-brand_color checked:border-brand_color"
                          id={`checkbox-${col.key}`}
                          disabled={col.key === "action"} // Disable checkbox for the action column
                        />
                        <span className="text-sm font-normal text-gray-600 ml-2">
                          {col.label}
                        </span>
                      </label>
                    ))}
          </div>
  

        </div>
  
      </div>
      <div className="col-span-12 md:col-span-9" />
    </div>
</section>
{/* -------------toogle column--------------- */}
                  

            </div>
            
        </section>
  </div>
   </div>
  </div>
  </div>
  </div>
       {/* -------------------filter popup------------------ */}
        <section className='w-full overflow-x-auto border-[1px] border-[#eee] bg-red-50 mt-[20px] custom-scrollbar'>
     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-table_header dark:bg-gray-800">
          <tr>
            {columns
              .filter((col) => visibleColumns.includes(col.key))
              .map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-left text-nowrap uppercase text-sm font-medium text-table_title dark:text-gray-300"
                >
                  {col.label}
                </th>
              ))}
          </tr>
        </thead>
  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
  {currentRows.length > 0 ? (
              currentRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns
                .filter((col) => visibleColumns.includes(col.key))
                .map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-4 text-sm whitespace-nowrap ${
                      col.key === "title"
                        ? "font-bold text-gray-700 text-[17px] dark:text-gray-100"
                        : "text-[17px] text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    {col.key === "id" ? (
                                    <div>
                                    <p>{rowIndex+1}</p>
                                    </div>
                                    ):col.key === "profile_pic" ? (
                      <div className="flex items-center pr-[50px] text-nowrap">
                        <img
                          src={row.profile_pic}
                          alt="Avatar"
                          className="w-10 h-10 rounded-[5px]"
                        />
                        <div className="ml-[15px] text-nowrap">
                            {row.firstName.length > 30 ?       <p className="font-[600] text-black text-[15px] text-nowrap">
                            {row.firstName.slice(0,30)}..
                          </p>:       <p className="font-[600] text-black text-[15px] text-nowrap">
                            {row.firstName}
                          </p> }
        
              {
                row.email.length > 35 ?    <p className="font-[400] text-gray-500 text-nowrap">
                            {row.email.slice(0,35)}..
                          </p>:   <p className="font-[400] text-gray-500 text-nowrap">
                            {row.email}
                          </p>
              }
          
                        </div>
                      </div>
                    ) : col.key === "description" ? (
                      <div>
                        {row.description.length > 40 ? (
                          <p className="text-nowrap text-neutral-600 font-[500]">{row.description.slice(0, 40)}...</p>
                        ) : (
                          <p className="text-nowrap text-neutral-600   font-[500]">{row.description}</p>
                        )}
                      </div>
                    ): col.key === "createDate" ? (
                      <div className="text-nowrap">
                      <div className="text-black dark:text-gray-100 text-nowrap">
                        {format(new Date(row[col.key]), 'dd-MMMM-yyyy')}
                      </div>
                      <div className="text-[14px] text-gray-400 text-nowrap">
                        {format(new Date(row[col.key]), 'hh:mm a')}
                      </div>
                    </div>
                    ) : col.key === "visibility" ? (
                      <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        row[col.key] === "Publish"
                          ? "bg-green-100 text-green-500 "
                          : row[col.key] === "Password"
                          ? "bg-yellow-100 text-yellow-500"
                           : row[col.key] === "Private"
                          ? "bg-orange-100 text-orange-500 "
                          : "bg-gray-100 text-gray-500 "
                      }`}
                    >
                        {row[col.key]}
                      </span>
                    ):col.key === "updateDate" ? (
                      <div className="text-nowrap">
                      <div className="text-black dark:text-gray-100 text-nowrap">
                        {format(new Date(row[col.key]), 'dd-MMMM-yyyy')}
                      </div>
                      <div className="text-[14px] text-gray-400 text-nowrap">
                        {format(new Date(row[col.key]), 'hh:mm a')}
                      </div>
                    </div>
                    ): col.key === "invoiceDate" ? (
                       <div className="text-nowrap">
                                                                                               <div className="text-black dark:text-gray-100 text-nowrap">
                                                                                                 {format(new Date(row[col.key]), 'dd-MMMM-yyyy')}
                                                                                               </div>
                                                                                               <div className="text-[14px] text-gray-400 text-nowrap">
                                                                                                 {format(new Date(row[col.key]), 'hh:mm a')}
                                                                                               </div>
                                                                                             </div>
                      ): col.key === "dueDate" ? (
                        <div className="text-nowrap">
                                                                                               <div className="text-black dark:text-gray-100 text-nowrap">
                                                                                                 {format(new Date(row[col.key]), 'dd-MMMM-yyyy')}
                                                                                               </div>
                                                                                               <div className="text-[14px] text-gray-400 text-nowrap">
                                                                                                 {format(new Date(row[col.key]), 'hh:mm a')}
                                                                                               </div>
                                                                                             </div>
                      )  : col.key === "publishDate" ? (
                        <div className="text-nowrap">
                        <div className="text-black dark:text-gray-100 text-nowrap">
                          {format(new Date(row[col.key]), 'dd-MMMM-yyyy')}
                        </div>
                        <div className="text-[14px] text-gray-400 text-nowrap">
                          {format(new Date(row[col.key]), 'hh:mm a')}
                        </div>
                      </div>
                    ) : col.key === "authorized" ? (
                      <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        row[col.key] === "Approved"
                          ? "bg-green-100 text-green-500 "
                          : row[col.key] === "Pending"
                          ? "bg-orange-100 text-orange-500"
                          : "bg-red-100 text-red-500 "
                      }`}
                    >
                        {row[col.key]}
                      </span>
                    ) : col.key === "payment" ? (
                      <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        row[col.key] === "Paid"
                          ? "bg-green-100 text-green-500 "
                           : row[col.key] === "Unpaid"
                          ? "bg-red-100 text-red-500 "
                          : "bg-gray-100 text-gray-500 "
                      }`}
                    >
                        {row[col.key]}
                      </span>
                    ) : col.key === "status" ? (
                   <div className="flex items-center space-x-3 w-[150px]">
  {/* Toggle Switch */}
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={row[col.key] === "Active"}
      onChange={(e) =>
        toggleStatus(rowIndex, e.target.checked ? "Active" : "Inactive")
      }
    />
    <div
      className={`w-12 h-6 rounded-[2px] flex items-center px-1 transition-all duration-300 cursor-pointer peer-checked:bg-green-500 ${
        row[col.key] === "Active" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-[2px] shadow-md transform transition-all duration-300 ${
          row[col.key] === "Active" ? "translate-x-[20px]" : "translate-x-0"
        }`}
      ></div>
    </div>
  </label>

  {/* Status Text */}
  <span
    className={`text-sm font-medium ${
      row[col.key] === "Active" ? "text-green-600" : "text-red-500"
    }`}
  >
    {row[col.key]}
  </span>
</div>

                    ) : col.key === "action" ? (
                         <div className="flex justify-start items-center gap-[12px] relative">
                                                  {/* View Button with Tooltip */}
                                                  <NavLink to={`/super-payment-invoice/${row._id}`} className="w-[30px] h-[30px]  border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                                    <GoEye  />
                                                   <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">
                                    View
                                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-brand_color"></span>
                                  </span>
                                                  </NavLink>
                                
                                                  {/* Edit Button with Tooltip */}
                                                  <NavLink to={`/super-payment-edit-invoice/${row._id}`} className="w-[30px] h-[30px]  border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                                    <CiEdit />
                                                    <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">
                                                      Edit
                                                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-brand_color"></span>
                                                    </span>
                                                  </NavLink>
                                
                                                  {/* Delete Button with Tooltip */}
                                              <div   onClick={() => {
    setTicketToDelete(row._id);
    setDeleteDialogOpen(true);
  }} className="w-[30px] h-[30px]  border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                  <MdDeleteOutline />
                                  <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">
                                    Delete
                                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-brand_color"></span>
                                  </span>
                                </div>
                                
                                 </div>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
            </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-300"
                >
               <div>
                <img className='w-[200px] block m-auto' src={empty_img} alt="" />
                <h2 className='text-[17px] text-neutral-500'>No Data</h2>
               </div>
                </td>
              </tr>
            )}
</tbody>

        </table>
        </section>
        <nav className="flex items-center justify-between pt-[12px] w-full" aria-label="Table navigation">
        {/* Rows per Page Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="rowsPerPage" className="text-sm font-medium text-gray-700">Rows per page:</label>
          <select id="rowsPerPage" value={rowsPerPage} onChange={handleRowsPerPageChange} className="block w-15 lg:w-20 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        {/* Pagination Controls */}
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
  <li>
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-l-[5px] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'cursor-not-allowed bg-gray-200' : ''}`}
    >
      Previous
    </button>
  </li>
  
  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, index) => (
    <li key={index}>
      <button
        onClick={() => handlePageChange(index + 1)}
        className={`flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index + 1 ? 'bg-brand_color text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''}`}
      >
        {index + 1}
      </button>
    </li>
  ))}
  
  <li>
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-r-[5px] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-200' : ''}`}
    >
      Next
    </button>
  </li>
</ul>

      </nav>

</div>
</div>

</section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Paymenttransfer