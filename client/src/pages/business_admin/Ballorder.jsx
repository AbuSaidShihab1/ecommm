import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { GoEye } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { BiFilterAlt } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import Select from "react-tailwindcss-select";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css';
import { IoIosStar } from "react-icons/io";
import format from "date-fns/format";
import { RiDeleteBin6Line } from "react-icons/ri";
import empty_img from "../../assets/empty.png"

// --------------status change button----------------------
function StatusSwitch({ status, onChange }) {
  const [isActive, setIsActive] = useState(status === "Active");

  const handleToggle = () => {
    const newStatus = isActive ? "Inactive" : "Active";
    setIsActive(!isActive);
    onChange(newStatus);
  };

  return (
    <div className="flex items-center space-x-3 w-[130px]">
      {/* Status Text */}


      {/* Square Toggle Switch */}
      <label className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={isActive} onChange={handleToggle} />
        <div
          className={`w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-[2px] flex items-center px-1 transition-all duration-300 cursor-pointer peer-checked:bg-green-500`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-[2px] shadow-md transform transition-all duration-300 ${
              isActive ? "translate-x-[20px]" : "translate-x-0"
            }`}
          ></div>
        </div>
      </label>
            <span className={`text-sm font-medium ${isActive ? "text-green-600" : "text-gray-500"}`}>
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
const Ballorder = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
         const [animal, setAnimal] = useState(null);
         const [animal2, setAnimal2] = useState(null);

    const handleChange = value => {
        console.log("value:", value);
        setAnimal(value);
    };
      const handleChange2 = value => {
        console.log("value:", value);
        setAnimal2(value);
    };
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
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const inputRef = useRef(null);

  const handleSelect = (ranges) => {
    setRange([ranges.selection]); // Update the range state
  };

  // Toggles the visibility of the date range picker
  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  // Format dates for display in the input field
  const formattedDate = `${format(range[0].startDate, "yyyy-MM-dd")} - ${format(
    range[0].endDate,
    "yyyy-MM-dd"
  )}`;

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
       const [gridmenu,setgridmenu]=useState(false);
        const [dateRange, setDateRange] = useState(null);

  const handleChange4 = (range) => {
    console.log('Selected range:', range);
    setDateRange(range);
  };


  // Function to apply the selected date range


  // Function to toggle date picker visibility
  // Handle date selection

  // Function to apply the selected date range and close the picker
  const handleApply = () => {
    const { startDate, endDate } = range[0];
    const formattedStartDate = startDate.toLocaleDateString();
    const formattedEndDate = endDate.toLocaleDateString();
    // setFormattedDate(`${formattedStartDate} - ${formattedEndDate}`);
       setPickerVisible(!isPickerVisible);
       // Close the picker after applying
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // --------------table coulms
const [data,setData] = useState([
  {
    id: 1,
    invoice: "#3413",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-15.webp",
      name: "Dr. Ernest Fritsch-Shanahan",
      email: "august17@hotmail.com"
    },
    phone: "123-456-7890",
    items: 83,
    poNo: "PO123",
    reference: "REF123",
    total: "$457.00",
    billing: "123 Main St, City, Country",
    shipping: "456 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "10:30 AM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "9:00 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "10:30 AM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "12:00 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Accept",
    visibility: "Cancelled",
    payment: "Paid",
    status: "Active",
    action: "",
  },
  {
    id: 2,
    invoice: "#9192",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
      name: "Mr. Gregory Medhurst-Lubowitz",
      email: "general.bergstrom@yahoo.com"
    },
    phone: "987-654-3210",
    items: 21,
    poNo: "PO124",
    reference: "REF124",
    total: "$426.00",
    billing: "789 Main St, City, Country",
    shipping: "123 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "2:15 PM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "8:45 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "2:15 PM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "1:30 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Pending",
    visibility: "Pending payment",
    payment: "Due",
    status: "Inactive",
    action: "",
  },
  {
    id: 3,
    invoice: "#4983",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-13.webp",
      name: "Becky Goodwin",
      email: "daniella_littel@gmail.com"
    },
    phone: "555-123-4567",
    items: 93,
    poNo: "PO125",
    reference: "REF125",
    total: "$544.00",
    billing: "456 Oak St, City, Country",
    shipping: "987 Pine St, City, Country",
    salesDate: "30-Jul-2023",
    saleTime: "4:45 PM",
    salesBy: "Abu Said Shihab",
    createDate: "29-Jul-2023",
    createTime: "10:30 AM",
    createBy: "Abu Said Shihab",
    publishDate: "30-Jul-2023",
    publishTime: "4:45 PM",
    publishBy: "Abu Said Shihab",
    updateDate: "31-Jul-2023",
    updateTime: "2:00 PM",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    visibility: "Cancelled",
    payment: "Paid",
    status: "Inactive",
    action: "",
  },
  {
    id: 1,
    invoice: "#3413",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-15.webp",
      name: "Dr. Ernest Fritsch-Shanahan",
      email: "august17@hotmail.com"
    },
    phone: "123-456-7890",
    items: 83,
    poNo: "PO123",
    reference: "REF123",
    total: "$457.00",
    billing: "123 Main St, City, Country",
    shipping: "456 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "10:30 AM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "9:00 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "10:30 AM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "12:00 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Accept",
    visibility: "On hold",
    payment: "Paid",
    status: "Active",
    action: "",
  },
  {
    id: 2,
    invoice: "#9192",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
      name: "Mr. Gregory Medhurst-Lubowitz",
      email: "general.bergstrom@yahoo.com"
    },
    phone: "987-654-3210",
    items: 21,
    poNo: "PO124",
    reference: "REF124",
    total: "$426.00",
    billing: "789 Main St, City, Country",
    shipping: "123 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "2:15 PM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "8:45 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "2:15 PM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "1:30 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Pending",
    visibility: "Pending payment",
    payment: "Due",
    status: "Inactive",
    action: "",
  },
  {
    id: 3,
    invoice: "#4983",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-13.webp",
      name: "Becky Goodwin",
      email: "daniella_littel@gmail.com"
    },
    phone: "555-123-4567",
    items: 93,
    poNo: "PO125",
    reference: "REF125",
    total: "$544.00",
    billing: "456 Oak St, City, Country",
    shipping: "987 Pine St, City, Country",
    salesDate: "30-Jul-2023",
    saleTime: "4:45 PM",
    salesBy: "Abu Said Shihab",
    createDate: "29-Jul-2023",
    createTime: "10:30 AM",
    createBy: "Abu Said Shihab",
    publishDate: "30-Jul-2023",
    publishTime: "4:45 PM",
    publishBy: "Abu Said Shihab",
    updateDate: "31-Jul-2023",
    updateTime: "2:00 PM",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    visibility: "On hold",
    payment: "Paid",
    status: "Inactive",
    action: "",
  },
  {
    id: 1,
    invoice: "#3413",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-15.webp",
      name: "Dr. Ernest Fritsch-Shanahan",
      email: "august17@hotmail.com"
    },
    phone: "123-456-7890",
    items: 83,
    poNo: "PO123",
    reference: "REF123",
    total: "$457.00",
    billing: "123 Main St, City, Country",
    shipping: "456 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "10:30 AM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "9:00 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "10:30 AM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "12:00 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Accept",
    visibility: "Processing",
    payment: "Paid",
    status: "Active",
    action: "",
  },
  {
    id: 2,
    invoice: "#9192",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
      name: "Mr. Gregory Medhurst-Lubowitz",
      email: "general.bergstrom@yahoo.com"
    },
    phone: "987-654-3210",
    items: 21,
    poNo: "PO124",
    reference: "REF124",
    total: "$426.00",
    billing: "789 Main St, City, Country",
    shipping: "123 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "2:15 PM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "8:45 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "2:15 PM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "1:30 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Pending",
    visibility: "Pending payment",
    payment: "Due",
    status: "Inactive",
    action: "",
  },
  {
    id: 3,
    invoice: "#4983",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-13.webp",
      name: "Becky Goodwin",
      email: "daniella_littel@gmail.com"
    },
    phone: "555-123-4567",
    items: 93,
    poNo: "PO125",
    reference: "REF125",
    total: "$544.00",
    billing: "456 Oak St, City, Country",
    shipping: "987 Pine St, City, Country",
    salesDate: "30-Jul-2023",
    saleTime: "4:45 PM",
    salesBy: "Abu Said Shihab",
    createDate: "29-Jul-2023",
    createTime: "10:30 AM",
    createBy: "Abu Said Shihab",
    publishDate: "30-Jul-2023",
    publishTime: "4:45 PM",
    publishBy: "Abu Said Shihab",
    updateDate: "31-Jul-2023",
    updateTime: "2:00 PM",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    visibility: "Processing",
    payment: "Paid",
    status: "Inactive",
    action: "",
  },
  {
    id: 1,
    invoice: "#3413",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-15.webp",
      name: "Dr. Ernest Fritsch-Shanahan",
      email: "august17@hotmail.com"
    },
    phone: "123-456-7890",
    items: 83,
    poNo: "PO123",
    reference: "REF123",
    total: "$457.00",
    billing: "123 Main St, City, Country",
    shipping: "456 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "10:30 AM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "9:00 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "10:30 AM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "12:00 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Accept",
    visibility: "Completed",
    payment: "Paid",
    status: "Active",
    action: "",
  },
  {
    id: 2,
    invoice: "#9192",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
      name: "Mr. Gregory Medhurst-Lubowitz",
      email: "general.bergstrom@yahoo.com"
    },
    phone: "987-654-3210",
    items: 21,
    poNo: "PO124",
    reference: "REF124",
    total: "$426.00",
    billing: "789 Main St, City, Country",
    shipping: "123 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "2:15 PM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "8:45 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "2:15 PM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "1:30 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Pending",
    visibility: "Draft",
    payment: "Due",
    status: "Inactive",
    action: "",
  },
  {
    id: 3,
    invoice: "#4983",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-13.webp",
      name: "Becky Goodwin",
      email: "daniella_littel@gmail.com"
    },
    phone: "555-123-4567",
    items: 93,
    poNo: "PO125",
    reference: "REF125",
    total: "$544.00",
    billing: "456 Oak St, City, Country",
    shipping: "987 Pine St, City, Country",
    salesDate: "30-Jul-2023",
    saleTime: "4:45 PM",
    salesBy: "Abu Said Shihab",
    createDate: "29-Jul-2023",
    createTime: "10:30 AM",
    createBy: "Abu Said Shihab",
    publishDate: "30-Jul-2023",
    publishTime: "4:45 PM",
    publishBy: "Abu Said Shihab",
    updateDate: "31-Jul-2023",
    updateTime: "2:00 PM",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    visibility: "Refunded",
    payment: "Paid",
    status: "Inactive",
    action: "",
  },
  {
    id: 1,
    invoice: "#3413",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-15.webp",
      name: "Dr. Ernest Fritsch-Shanahan",
      email: "august17@hotmail.com"
    },
    phone: "123-456-7890",
    items: 83,
    poNo: "PO123",
    reference: "REF123",
    total: "$457.00",
    billing: "123 Main St, City, Country",
    shipping: "456 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "10:30 AM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "9:00 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "10:30 AM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "12:00 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Accept",
    visibility: "Completed",
    payment: "Paid",
    status: "Active",
    action: "",
  },
  {
    id: 2,
    invoice: "#9192",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
      name: "Mr. Gregory Medhurst-Lubowitz",
      email: "general.bergstrom@yahoo.com"
    },
    phone: "987-654-3210",
    items: 21,
    poNo: "PO124",
    reference: "REF124",
    total: "$426.00",
    billing: "789 Main St, City, Country",
    shipping: "123 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "2:15 PM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "8:45 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "2:15 PM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "1:30 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Pending",
    visibility: "Draft",
    payment: "Due",
    status: "Inactive",
    action: "",
  },
  {
    id: 3,
    invoice: "#4983",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-13.webp",
      name: "Becky Goodwin",
      email: "daniella_littel@gmail.com"
    },
    phone: "555-123-4567",
    items: 93,
    poNo: "PO125",
    reference: "REF125",
    total: "$544.00",
    billing: "456 Oak St, City, Country",
    shipping: "987 Pine St, City, Country",
    salesDate: "30-Jul-2023",
    saleTime: "4:45 PM",
    salesBy: "Abu Said Shihab",
    createDate: "29-Jul-2023",
    createTime: "10:30 AM",
    createBy: "Abu Said Shihab",
    publishDate: "30-Jul-2023",
    publishTime: "4:45 PM",
    publishBy: "Abu Said Shihab",
    updateDate: "31-Jul-2023",
    updateTime: "2:00 PM",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    visibility: "Refunded",
    payment: "Paid",
    status: "Inactive",
    action: "",
  },
  {
    id: 1,
    invoice: "#3413",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-15.webp",
      name: "Dr. Ernest Fritsch-Shanahan",
      email: "august17@hotmail.com"
    },
    phone: "123-456-7890",
    items: 83,
    poNo: "PO123",
    reference: "REF123",
    total: "$457.00",
    billing: "123 Main St, City, Country",
    shipping: "456 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "10:30 AM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "9:00 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "10:30 AM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "12:00 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Pending",
    visibility: "Failed",
    payment: "Paid",
    status: "Active",
    action: "",
  },
  {
    id: 2,
    invoice: "#9192",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
      name: "Mr. Gregory Medhurst-Lubowitz",
      email: "general.bergstrom@yahoo.com"
    },
    phone: "987-654-3210",
    items: 21,
    poNo: "PO124",
    reference: "REF124",
    total: "$426.00",
    billing: "789 Main St, City, Country",
    shipping: "123 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "2:15 PM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "8:45 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "2:15 PM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "1:30 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Pending",
    visibility: "Failed",
    payment: "Due",
    status: "Inactive",
    action: "",
  },
  {
    id: 3,
    invoice: "#4983",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-13.webp",
      name: "Becky Goodwin",
      email: "daniella_littel@gmail.com"
    },
    phone: "555-123-4567",
    items: 93,
    poNo: "PO125",
    reference: "REF125",
    total: "$544.00",
    billing: "456 Oak St, City, Country",
    shipping: "987 Pine St, City, Country",
    salesDate: "30-Jul-2023",
    saleTime: "4:45 PM",
    salesBy: "Abu Said Shihab",
    createDate: "29-Jul-2023",
    createTime: "10:30 AM",
    createBy: "Abu Said Shihab",
    publishDate: "30-Jul-2023",
    publishTime: "4:45 PM",
    publishBy: "Abu Said Shihab",
    updateDate: "31-Jul-2023",
    updateTime: "2:00 PM",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    visibility: "Cancelled",
    payment: "Paid",
    status: "Inactive",
    action: "",
  },
  {
    id: 1,
    invoice: "#3413",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-15.webp",
      name: "Dr. Ernest Fritsch-Shanahan",
      email: "august17@hotmail.com"
    },
    phone: "123-456-7890",
    items: 83,
    poNo: "PO123",
    reference: "REF123",
    total: "$457.00",
    billing: "123 Main St, City, Country",
    shipping: "456 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "10:30 AM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "9:00 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "10:30 AM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "12:00 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Accept",
    visibility: "Failed",
    payment: "Paid",
    status: "Active",
    action: "",
  },
  {
    id: 2,
    invoice: "#9192",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
      name: "Mr. Gregory Medhurst-Lubowitz",
      email: "general.bergstrom@yahoo.com"
    },
    phone: "987-654-3210",
    items: 21,
    poNo: "PO124",
    reference: "REF124",
    total: "$426.00",
    billing: "789 Main St, City, Country",
    shipping: "123 Another St, City, Country",
    salesDate: "15-Jan-2023",
    saleTime: "2:15 PM",
    salesBy: "Zobaer Ahmmed",
    createDate: "14-Jan-2023",
    createTime: "8:45 AM",
    createBy: "Zobaer Ahmmed",
    publishDate: "15-Jan-2023",
    publishTime: "2:15 PM",
    publishBy: "Zobaer Ahmmed",
    updateDate: "16-Jan-2023",
    updateTime: "1:30 PM",
    updateBy: "Zobaer Ahmmed",
    authorized: "Pending",
    visibility: "Pending payment",
    payment: "Due",
    status: "Inactive",
    action: "",
  },
  {
    id: 3,
    invoice: "#4983",
    customer: {
      avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-13.webp",
      name: "Becky Goodwin",
      email: "daniella_littel@gmail.com"
    },
    phone: "555-123-4567",
    items: 93,
    poNo: "PO125",
    reference: "REF125",
    total: "$544.00",
    billing: "456 Oak St, City, Country",
    shipping: "987 Pine St, City, Country",
    salesDate: "30-Jul-2023",
    saleTime: "4:45 PM",
    salesBy: "Abu Said Shihab",
    createDate: "29-Jul-2023",
    createTime: "10:30 AM",
    createBy: "Abu Said Shihab",
    publishDate: "30-Jul-2023",
    publishTime: "4:45 PM",
    publishBy: "Abu Said Shihab",
    updateDate: "31-Jul-2023",
    updateTime: "2:00 PM",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    visibility: "Refunded",
    payment: "Paid",
    status: "Inactive",
    action: "",
  },
]);



const columns = [
  { key: "id", label: "ID" },
  { key: "invoice", label: "Invoice" },
  { key: "customer", label: "Customer" },
  { key: "phone", label: "Phone" },
  { key: "items", label: "Items" },
  { key: "poNo", label: "PO No" },
  { key: "reference", label: "Reference" },
  { key: "total", label: "Total" },
  { key: "billing", label: "Billing" },
  { key: "shipping", label: "Shipping" },
  { key: "salesDate", label: "Sales Date" },
  { key: "salesBy", label: "Sales By" },
  { key: "createDate", label: "Create Date" },
  { key: "createBy", label: "Create By" },
  { key: "publishDate", label: "Authorize Date" },
  { key: "publishBy", label: "Authorize By" },
  { key: "updateDate", label: "Update Date" },
  { key: "updateBy", label: "Update By" },
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
                          { label: 'Pending payment', color: 'text-orange-500', bgColor: 'bg-orange-500' },
                          { label: 'Processing', color: 'text-orange-700', bgColor: 'bg-orange-700' }, 
                          { label: 'On hold', color: 'text-orange-500', bgColor: 'bg-orange-500' },
                          { label: 'Completed', color: 'text-green-500', bgColor: 'bg-green-500' },
                          { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-700' },
                          { label: 'Refunded', color: 'text-orange-500', bgColor: 'bg-orange-500' },
                          { label: 'Failed', color: 'text-red-500', bgColor: 'bg-red-500' },
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
                          { label: 'Accept', color: 'text-green-500', bgColor: 'bg-green-500' },
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
                          { label: 'Due', color: 'text-red-500', bgColor: 'bg-red-500' },
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
// --------------customer-suggestions----------------
const [customerValue, setCustomerValue] = useState("");
const [customerSuggestions, setCustomerSuggestions] = useState([]);
// Helper function to get unique Customer suggestions
const fetchUniqueCustomerSuggestions = (value) => {
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

const handleCustomerInputChange = (e) => {
  const value = e.target.value;
  setcustomer_input(value);

  if (value) {
    setCustomerSuggestions(fetchUniqueCustomerSuggestions(value));
  } else {
    setCustomerSuggestions([]);
  }
};

const handleCustomerSuggestionClick = (suggestion) => {
  setcustomer_input(suggestion);
  setCustomerSuggestions([]); // Clear suggestions after selection
};

// --------------email-suggestions-------------------


// ------------------phone-suggestion-------------------
const [phoneValue, setPhoneValue] = useState("");
const [phoneSuggestions, setPhoneSuggestions] = useState([]);
 // Helper function to get unique phone suggestions
 const fetchUniquePhoneSuggestions = (value) => {
  return [
    ...new Set(
      data
        .filter((item) =>
          item.phone.toLowerCase().includes(value.toLowerCase())
        )
        .map((item) => item.phone)
    ),
  ];
};

const handlePhoneInputChange = (e) => {
  const value = e.target.value;
  setphone_input(value);

  if (value) {
    setPhoneSuggestions(fetchUniquePhoneSuggestions(value));
  } else {
    setPhoneSuggestions([]);
  }
};

const handlePhoneSuggestionClick = (suggestion) => {
  setphone_input(suggestion);
  setPhoneSuggestions([]); // Clear suggestions after selection
};
// --------------sales by--------------
const [salesByValue, setSalesByValue] = useState("");
const [salesBySuggestions, setSalesBySuggestions] = useState([]);
  // Helper function to get unique salesBy suggestions
  const fetchUniqueSalesBySuggestions = (value) => {
    return [
      ...new Set(
        data
          .filter((item) =>
            item.salesBy.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => item.salesBy)
      ),
    ];
  };

  const handleSalesByInputChange = (e) => {
    const value = e.target.value;
    setsalesbyinput(value);

    if (value) {
      setSalesBySuggestions(fetchUniqueSalesBySuggestions(value));
    } else {
      setSalesBySuggestions([]);
    }
  };

  const handleSalesBySuggestionClick = (suggestion) => {
    setsalesbyinput(suggestion);
    setSalesBySuggestions([]); // Clear suggestions after selection
  };

const [emailValue, setEmailValue] = useState("");
const [emailSuggestions, setEmailSuggestions] = useState([]);



// Helper function to get unique Email suggestions
const fetchUniqueEmailSuggestions = (value) => {
  return [
    ...new Set(
      data
        .filter((item) =>
          item.customer.email.toLowerCase().includes(value.toLowerCase())
        )
        .map((item) => item.customer.email)
    ),
  ];
};




const handleEmailInputChange = (e) => {
  const value = e.target.value;
  set_emailinput(value);

  if (value) {
    setEmailSuggestions(fetchUniqueEmailSuggestions(value));
  } else {
    setEmailSuggestions([]);
  }
};

const handleEmailSuggestionClick = (suggestion) => {
  set_emailinput(suggestion);
  setEmailSuggestions([]); // Clear suggestions after selection
};
// ------------------create-by-suggestions-------------------
const [createByValue, setCreateByValue] = useState("");
  const [createBySuggestions, setCreateBySuggestions] = useState([]);
   // Helper function to get unique createBy suggestions
   const fetchUniqueCreateBySuggestions = (value) => {
    return [
      ...new Set(
        data
          .filter((item) =>
            item.createBy.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => item.createBy)
      ),
    ];
  };

  const handleCreateByInputChange = (e) => {
    const value = e.target.value;
    setcreatebyinput(value);

    if (value) {
      setCreateBySuggestions(fetchUniqueCreateBySuggestions(value));
    } else {
      setCreateBySuggestions([]);
    }
  };

  const handleCreateBySuggestionClick = (suggestion) => {
    setcreatebyinput(suggestion);
    setCreateBySuggestions([]); // Clear suggestions after selection
  };
  // --------------publish by-suggestions-------------------
  const [publishByValue, setPublishByValue] = useState("");
  const [publishBySuggestions, setPublishBySuggestions] = useState([]);
    // Helper function to get unique publishBy suggestions
    const fetchUniquePublishBySuggestions = (value) => {
      return [
        ...new Set(
          data
            .filter((item) =>
              item.publishBy.toLowerCase().includes(value.toLowerCase())
            )
            .map((item) => item.publishBy)
        ),
      ];
    };
  
    const handlePublishByInputChange = (e) => {
      const value = e.target.value;
      setPublishByInput(value);
  
      if (value) {
        setPublishBySuggestions(fetchUniquePublishBySuggestions(value));
      } else {
        setPublishBySuggestions([]);
      }
    };
  
    const handlePublishBySuggestionClick = (suggestion) => {
      setPublishByInput(suggestion);
      setPublishBySuggestions([]); // Clear suggestions after selection
    };
    // -------------update by-suggestions-------------------
    const [updateByValue, setUpdateByValue] = useState("");
    const [updateBySuggestions, setUpdateBySuggestions] = useState([]);
     // Helper function to get unique updateBy suggestions
  const fetchUniqueUpdateBySuggestions = (value) => {
    return [
      ...new Set(
        data
          .filter((item) =>
            item.updateBy.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => item.updateBy)
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
    setUpdateBySuggestions([]); // Clear suggestions after selection
  };
    // Filter data based on search term
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleClearSearch = () => {
      setSearchTerm(""); // Clear the input field
    };
// ===========================table searching function===================

  // Filter data based on search term
  const [customer_input,setcustomer_input]=useState("");
  const [email_input,set_emailinput]=useState("");
  const [phoneinput,setphone_input]=useState("");
  const [salesbyinput,setsalesbyinput]=useState("");
  const [createbyinput,setcreatebyinput]=useState("");
const [publishByInput, setPublishByInput] = useState("");
const [updateByInput, setUpdateByInput] = useState("");
const [authorized, setAuthorized] = useState("");
const [visibility, setVisibility] = useState("");
const [createByInput,setCreateByInput]=useState("")
const [filteredData, setFilteredData] = useState([]); // Holds the filtered data
const [originalData, setOriginalData] = useState(data); // Holds the original data (fetched from API or elsewhere)
const [searchInput, setSearchInput] = useState("");
const [filteredPublishers, setFilteredPublishers] = useState([]);
const [selectedPublisher, setSelectedPublisher] = useState(null);
const [status,setstatus]=useState("")
const [payment,setpayment]=useState("")

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

  
    const filtered = data.filter((item) => {
// Assuming `publishDate` is a valid field in your data
       const matchescustomer = customer_input ? item.customer.name.toLowerCase().includes(customer_input.toLowerCase()) : true;
      const matchesemail=email_input ? item.customer.email.toLowerCase().includes(email_input.toLowerCase()) : true;
      const matchesphone=phoneinput ? item.phone.toLowerCase().includes(phoneinput.toLowerCase()) : true;
      const matchessales=salesbyinput ? item.salesBy.toLowerCase().includes(salesbyinput.toLowerCase()) : true;
     
      const matchesCreateBy = createbyinput ? item.createBy.toLowerCase().includes(createbyinput.toLowerCase()) : true;
      const matchesPublishBy = publishByInput ? item.publishBy.toLowerCase().includes(publishByInput.toLowerCase()) : true;
      const matchesUpdateBy = updateByInput ? item.updateBy.toLowerCase().includes(updateByInput.toLowerCase()) : true;
      const matchesAuthorized = authorized ? item.authorized === authorized : true;
      const matchesVisibility = visibility ? item.visibility === visibility : true;
      const matchesStatus = status ? item.status === status : true;
      const matchespayment = payment ? item.payment === payment : true;
      const matchesSearchTerm = searchTerm ?  item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.invoice.toLowerCase().includes(searchTerm.toLowerCase()) || item.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) || item.phone.toLowerCase().includes(searchTerm.toLowerCase()) || item.poNo.toLowerCase().includes(searchTerm.toLowerCase()) || item.reference.toLowerCase().includes(searchTerm.toLowerCase()) || item.billing.toLowerCase().includes(searchTerm.toLowerCase()) || item.shipping.toLowerCase().includes(searchTerm.toLowerCase()) || item.salesDate.toLowerCase().includes(searchTerm.toLowerCase()) || item.salesBy.toLowerCase().includes(searchTerm.toLowerCase()) || item.saleTime.toLowerCase().includes(searchTerm.toLowerCase()) || item.createDate.toLowerCase().includes(searchTerm.toLowerCase()) || item.createBy.toLowerCase().includes(searchTerm.toLowerCase()) || item.authorized.toLowerCase().includes(searchTerm.toLowerCase()) || item.visibility.toLowerCase().includes(searchTerm.toLowerCase()) || item.status.toLowerCase().includes(searchTerm.toLowerCase()) || item.payment.toLowerCase().includes(searchTerm.toLowerCase()) : true;
  
      // Create Date filter
      // const matchesCreateDate = itemCreateDate >= new Date(createStartDate) && itemCreateDate <= new Date(createEndDate);
      // Publish Date filter
      // const matchesPublishDate = itemPublishDate >= new Date(publishStartDate) && itemPublishDate <= new Date(publishEndDate);
  
      return (
        matchescustomer &&
        matchesemail &&
        matchesphone &&
        matchessales &&
        matchesCreateBy &&
        matchespayment &&
        matchesPublishBy &&
        matchesUpdateBy &&
        matchesAuthorized &&
        matchesVisibility &&
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
  }, [searchTerm,customer_input,email_input,phoneinput,salesbyinput,createbyinput, publishByInput, updateByInput, authorized, visibility,payment,status]);
  
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
    setcustomer_input("");
    set_emailinput("");
    setphone_input("");
    setsalesbyinput("");
    setcreatebyinput("");
    setPublishByInput("")
    setCreateByInput("");
    setPublishByInput("");
    setUpdateByInput("");
    setpayment("")
    setUpdateByInput("");
    setSearchTerm("");
    setstatus("");
    setAuthorized("");
    setVisibility("");
    setSelectedOption("Select Authorized");
    setSelectedOption2("Select Visibility");
    setSelectedOption3("Select Status");
    setSelectedOption4("Select Payment");
    // setFilteredData(originalData);
    // setOriginalData(data)

  }
  const toggleStatus = (rowIndex, newStatus) => {
    console.log(rowIndex)
    const updatedRows = [...data]; // Copy the rows array
    console.log(updatedRows)
    updatedRows[rowIndex].status = newStatus; // Update the status of the specific row
    setData(updatedRows); // Set the updated rows to the state
  };
  
  

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
 <section className='w-[100%] m-auto py-[20px]  xl:py-[40px] px-[20px] lg:px-[30px]'>
     <div className='w-full flex md:justify-between items-center  md:flex-row flex-col justify-start'>
        <div className='w-full md:w-auto'>
              <h1 className='text-[20px] font-[600] mb-[8px]'>Product Order List </h1>
          <ul className='w-full   md:w-auto flex lg:justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Products</li>
            <li><IoIosArrowForward/></li>
            <li>Product Order List </li>
          </ul>
        </div>
        {/* -------------------table------------------- */}

        {/* ---------------table --------------- */}
      <div className='w-full   md:w-auto flex gap-[10px] md:m-0 mt-[15px]'>
         <button className='w-[50%] md:w-auto px-[15px] py-[6px] text-black text-[14px] gap-[8px]  border-[1px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'>
            <BiExport className='text-[20px]'/>
            Export
        </button>
        <NavLink to="/products/new-product-order"className="w-[50%] md:w-auto ">
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
  <div className='w-full flex justify-between items-center mb-[14px] '>
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
        placeholder="Search for order"
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
   <div className='w-auto flex justify-center items-center gap-[10px] '>
    <button onClick={()=>{setfilter_sidebar(true)}}  className='w-[50%] md:w-auto hover:border-brand_color text-[14px] border-[1px] border-[#eee] hover:text-brand_color transition-all duration-100 px-[17px] py-[7px] flex justify-center items-center gap-[7px] rounded-[5px]'>
          <BiFilterAlt className='text-[20px]'/> Filters
    </button>
    <div className="relative w-[50%] md:w-auto inline-block text-left ">
  <div>
    <div className="w-auto  relative inline-block text-left ">
  <div className="w-[100%] md:w-auto  relative inline-block text-left ">
      <button onClick={()=>{setfilter_sidebar2(!filter_sidebar2)}} className='w-[100%] hover:border-brand_color md:w-auto  text-[14px] border-[1px] hover:text-brand_color transition-all duration-100 border-[#eee] px-[17px] py-[7px] flex justify-center items-center gap-[7px] rounded-[5px]'>
        <BsGrid className='text-[20px]'/>
    </button>
  </div>
  {/* -------------------filter popup------------------ */}
        {/* -------------------filter popup------------------ */}
    <section className={filter_sidebar ?  'fixed top-0 right-0   flex justify-end w-full h-[100%] z-[1099900000]':'fixed top-0 right-[-130%]  flex justify-end w-full  h-[100%] z-[1099900000]'}>
              <div className='w-[100%] md:w-[100%] xl:w-[100%] bg-[rgba(0,0,0,0.4)] 2xl:w-[100%] h-[100vh]' onClick={()=>{setfilter_sidebar(false)}}>

           </div>
            <div className={filter_sidebar ? 'w-[80%] md:w-[60%] xl:w-[35%] absolute top-0 right-0 transition-all duration-200 2xl:w-[25%] h-[100vh] bg-white  overflow-y-auto shadow-2xl  no-scrollbar border-l-[1px] border-[#eee]':'w-[80%] md:w-[60%] xl:w-[35%] absolute top-0 right-[-120%] transition-all duration-200 2xl:w-[25%] h-[100vh] bg-white  overflow-y-auto shadow-2xl  no-scrollbar border-l-[1px] border-[#eee]'}>
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
            <div className="mt-[10px] relative">
      <label htmlFor="customer" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Customer
      </label>
      <br />
      <input
        type="text"
        placeholder="Customer"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={customer_input}
        onChange={handleCustomerInputChange}
      />
      {customerSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {customerSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleCustomerSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
{/* Email Input */}
<div className="mt-[10px] relative">
      <label htmlFor="email" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Email
      </label>
      <br />
      <input
        type="text"
        placeholder="Email"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={email_input}
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
    <div className="mt-[10px] relative">
      <label htmlFor="phone" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Phone
      </label>
      <br />
      <input
        type="text"
        placeholder="Phone"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={phoneinput}
        onChange={handlePhoneInputChange}
      />
      {phoneSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {phoneSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handlePhoneSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
               <div className='mb-[10px] mt-[10px]'>
                <label htmlFor="name"className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Sales Date</label><br />
                <input type="date" placeholder='Sales Date'className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
              </div>
              <div className="mt-[10px] relative">
      <label htmlFor="salesBy" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Sales By
      </label>
      <br />
      <input
        type="text"
        placeholder="Sales By"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={salesbyinput}
        onChange={handleSalesByInputChange}
      />
      {salesBySuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {salesBySuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleSalesBySuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
              <div className='mb-[10px]'>
                <label htmlFor="name"className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Create Date</label><br />
                <input type="date" placeholder='Create Date'className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
              </div>
              <div className="mt-[10px] relative">
      <label htmlFor="createBy" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Create By
      </label>
      <br />
      <input
        type="text"
        placeholder="Create By"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={createbyinput}
        onChange={handleCreateByInputChange}
      />
      {createBySuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {createBySuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleCreateBySuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
                 <div className='mb-[10px] mt-[10px]'>
                <label htmlFor="name"className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Authorize Date</label><br />
                <input type="date" placeholder='Publish Date'className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
              </div>
              <div className="mt-[10px] relative">
      <label htmlFor="publishBy" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      Authorize By
      </label>
      <br />
      <input
        type="text"
        placeholder="Authorize By"
    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={publishByInput}
        onChange={handlePublishByInputChange}
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
               <div className='mb-[10px] mt-[10px]'>
                <label htmlFor="name"className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Update Date</label><br />
                <input type="date" placeholder='Create Date'className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"                />
              </div>
              <div className="mt-[10px] relative">
      <label htmlFor="updateBy" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
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
              <div>

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
             
            </div>
            
   </div>
                    {
                      customer_input=="" && email_input=="" &&  phoneinput=="" && salesbyinput=="" &&  createbyinput=="" &&   publishByInput=="" && updateByInput=="" && selectedOption=="Select Authorized" && selectedOption2=="Select Visibility" && selectedOption3=="Select Status" && selectedOption4=="Select Payment" ? "":            <button
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
         <section className={filter_sidebar2 ?  'fixed w-[100%] h-[100vh]  overflow-y-auto shadow-2xl no-scrollbar border-l-[1px] border-[#eee] top-0 right-0  flex justify-end  z-[1099900000]':'fixed top-0 right-[-130%] w-[80%] xl:w-[35%%] 2xl:w-[25%] h-[100vh] flex justify-end  z-[1099900000]'}>
               <div className='w-[100%] md:w-[100%] bg-[rgba(0,0,0,0.4)] xl:w-[100%] 2xl:w-[100%] h-[100vh]' onClick={()=>{setfilter_sidebar2(false)}}>

           </div>
            <div className={filter_sidebar2 ? 'w-[80%] md:w-[60%] xl:w-[35%] absolute top-0 right-0 transition-all duration-200 2xl:w-[25%] h-[100vh] bg-white  overflow-y-auto shadow-2xl  no-scrollbar border-l-[1px] border-[#eee]':'w-[80%] md:w-[60%] xl:w-[35%] absolute top-0 right-[-120%] transition-all duration-200 2xl:w-[25%] h-[100vh] bg-white  overflow-y-auto shadow-2xl  no-scrollbar border-l-[1px] border-[#eee]'}>
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
<section className='w-full overflow-x-auto border-[1px] border-[#eee] mt-[20px] custom-scrollbar'>
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
          <tr
              key={rowIndex}
              className=" text-nowrap dark:hover:bg-gray-800"
            >
              {columns
                .filter((col) => visibleColumns.includes(col.key))
                .map((col) => (
                  <td
                    key={col.key}
                    className={`lg:px-4 py-4 text-sm w-full lg:w-[45%] px-[40px] text-nowrap ${
                      col.key === "status"
                        ? "text-[17px] font-medium"
                        : "text-[16px] text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {/* Customer Column */}
                    {col.key === "customer" ? (
                      <div className="flex items-center pr-[50px] text-nowrap">
                        <img
                          src={row.customer.avatar}
                          alt="Avatar"
                          className="w-10 h-10 rounded-[5px]"
                        />
                        <div className="ml-[15px] text-nowrap">
                            {row.customer.name.length > 30 ?       <p className="font-[600] text-black text-[15px] text-nowrap">
                            {row.customer.name.slice(0,30)}..
                          </p>:       <p className="font-[600] text-black text-[15px] text-nowrap">
                            {row.customer.name}
                          </p> }
        
              {
                row.customer.email.length > 35 ?    <p className="font-[400] text-gray-500 text-nowrap">
                            {row.customer.email.slice(0,35)}..
                          </p>:   <p className="font-[400] text-gray-500 text-nowrap">
                            {row.customer.email}
                          </p>
              }
          
                        </div>
                      </div>
                    ) : col.key === "publishDate" ? (
                      // Publish Date and Time Column
                      <div className="text-nowrap">
                        <div className="text-black dark:text-gray-100 text-nowrap">
                          {row.publishDate}
                        </div>
                        <div className="text-[14px] text-gray-400 text-nowrap">
                          {row.publishTime}
                        </div>
                      </div>
                    ) : col.key === "salesDate" ? (
                      // Publish Date and Time Column
                      <div className="text-nowrap">
                        <div className="text-black dark:text-gray-100 text-nowrap">
                          {row.salesDate}
                        </div>
                        <div className="text-[14px] text-gray-400 text-nowrap">
                          {row.saleTime}
                        </div>
                      </div>
                    ) : col.key === "createDate" ? (
                      // Publish Date and Time Column
                      <div className="text-nowrap">
                        <div className="text-black dark:text-gray-100 text-nowrap">
                          {row.createDate}
                        </div>
                        <div className="text-[14px] text-gray-400 text-nowrap">
                          {row.createTime}
                        </div>
                      </div>
                    ) : col.key === "updateDate" ? (
                      // Publish Date and Time Column
                      <div className="text-nowrap">
                        <div className="text-black dark:text-gray-100 text-nowrap">
                          {row.updateDate}
                        </div>
                        <div className="text-[14px] text-gray-400 text-nowrap">
                          {row.updateTime}
                        </div>
                      </div>
                    ) : col.key === "saleTime" ? (
                      // Sale Time Column
                      <div className="text-nowrap">{row.saleTime}</div>
                    ) : col.key === "createTime" ? (
                      // Create Time Column
                      <div className="text-nowrap">{row.createTime}</div>
                    ) : col.key === "updateTime" ? (
                      // Update Time Column
                      <div className="text-nowrap">{row.updateTime}</div>
                    ) : col.key === "status" ? (
                      // Status Column
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
                          className={`w-12 h-6 bg-red-500 dark:bg-gray-700 rounded-[2px] flex items-center px-1 transition-all duration-300 cursor-pointer peer-checked:bg-green-500 ${
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
                    
                    ): col.key === "visibility" ? (
                      <span
                        className={`whitespace-nowrap px-2 py-1 font-[500] rounded-full text-xs ${
                          row[col.key].toLowerCase() === "processing"
                            ? "bg-orange-100 text-orange-700"
                            : row[col.key].toLowerCase() === "cancelled"
                            ? "bg-red-100 text-red-700"
                                  : row[col.key].toLowerCase() === "pending payment"
                            ? "bg-orange-100 text-orange-500"
                            : row[col.key].toLowerCase() === "refunded"
                            ? "bg-orange-100 text-orange-700"
                            : row[col.key].toLowerCase() === "completed"
                            ? "bg-green-100 text-green-700"
                            : row[col.key].toLowerCase() === "on hold"
                            ? "bg-orange-100 text-orange-500"
                            : row[col.key].toLowerCase() === "draft"
                            ? "bg-gray-100 text-gray-700"
                            : row[col.key].toLowerCase() === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {row[col.key]}
                      </span>
                    ): col.key === "authorized" ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          row[col.key] === "Accept"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : row[col.key] === "Pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {row[col.key]}
                      </span>
                    ) : col.key === "payment" ? (
                      // Payment Column
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          row.payment === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.payment}
                      </span>
                    ) : col.key === "action" ? (
                        <div className="flex justify-start items-center gap-[12px] relative">
                                                       {/* View Button with Tooltip */}
                                                       <div className="w-[30px] h-[30px]  border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                                         <GoEye  />
                                                        <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">
                                         View
                                         <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-brand_color"></span>
                                       </span>
                                                       </div>
                                     
                                                       {/* Edit Button with Tooltip */}
                                                       <div className="w-[30px] h-[30px]  border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                                         <CiEdit />
                                                         <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">
                                                           Edit
                                                             <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-brand_color"></span>
                                     
                                                         </span>
                                                       </div>
                                     
                                                       {/* Delete Button with Tooltip */}
                                                   <div className="w-[30px] h-[30px]  border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                       <MdDeleteOutline />
                                       <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">
                                         Delete
                                         <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-brand_color"></span>
                                       </span>
                                     </div>
                                     
                                      </div>
                    ) : (
                      // Default Column
                      <span className="text-nowrap">{row[col.key]}</span>
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

export default Ballorder