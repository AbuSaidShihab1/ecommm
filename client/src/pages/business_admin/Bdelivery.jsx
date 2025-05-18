import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { RiBillLine } from "react-icons/ri";
import { LuPlus } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { FaReplyAll } from "react-icons/fa6";
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
import { RiDeleteBin6Line } from "react-icons/ri";
import empty_img from "../../assets/empty.png"

import format from "date-fns/format";
import { addDays } from "date-fns";
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
const options3 = [
    { value: "Item Type", label: "Item Type" },
    { value: "Document", label: " Document" },
    { value: "Fragile", label: "Fragile" },
];
const Bdelivery = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
         const [animal, setAnimal] = useState(null);
         const [animal2, setAnimal2] = useState(null);
         const [animal3, setAnimal3] = useState(null);

          const handleChange = value => {
        console.log("value:", value);
        setAnimal(value);
    };
      const handleChange2 = value => {
        console.log("value:", value);
        setAnimal2(value);
    };
          const handleChange3 = value => {
        console.log("value:", value);
        setAnimal3(value);
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
const data = [
  {
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    },
    id:1,
    orderID: "ORD12345",
    courierName: "DHL Express",
    courierID: "C123",
    deliveryFee: "$25.00",
  shipping: "456 Another St, City, Country",
    itemType: "Fragile",
  createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "10:00 AM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    deliveryStatus: "Completed",
    action: "",
  },
  {
    customer: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
    },
    id:2,
    orderID: "ORD67890",
    courierName: "FedEx",
    courierID: "C456",
    deliveryFee: "$18.00",
  shipping: "456 Another St, City, Country",
    itemType: "Document",
   createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "09:00 AM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updatetime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updateBy: "Abu Said Shihab",
    authorized: "Pending",
    deliveryStatus: "Processing",
    action: "",
  },
  {
    customer: {
      name: "Alex Johnson",
      email: "alexjohnson@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-02.webp&w=1920&q=75",
    },
    id:3,
    orderID: "ORD54321",
    courierName: "UPS",
    courierID: "C789",
    deliveryFee: "$30.00",
  shipping: "456 Another St, City, Country",
    itemType: "Parcel",
    createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Abu Said Shihab",
    publishBy: "Zobaer Ahmmed",
    updateBy: "Abu Said Shihab",
    authorized: "Accept",
    deliveryStatus: "Cancelled",
    action: "",
  },
  {
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    },
    id:1,
    orderID: "ORD12345",
    courierName: "DHL Express",
    courierID: "C123",
    deliveryFee: "$25.00",
  shipping: "456 Another St, City, Country",
    itemType: "Fragile",
  createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "10:00 AM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    deliveryStatus: "Completed",
    action: "",
  },
  {
    customer: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
    },
    id:2,
    orderID: "ORD67890",
    courierName: "FedEx",
    courierID: "C456",
    deliveryFee: "$18.00",
  shipping: "456 Another St, City, Country",
    itemType: "Document",
   createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "09:00 AM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updatetime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updateBy: "Abu Said Shihab",
    authorized: "Pending",
    deliveryStatus: "Processing",
    action: "",
  },
  {
    customer: {
      name: "Alex Johnson",
      email: "alexjohnson@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-02.webp&w=1920&q=75",
    },
    id:3,
    orderID: "ORD54321",
    courierName: "UPS",
    courierID: "C789",
    deliveryFee: "$30.00",
  shipping: "456 Another St, City, Country",
    itemType: "Parcel",
    createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Abu Said Shihab",
    publishBy: "Zobaer Ahmmed",
    updateBy: "Abu Said Shihab",
    authorized: "Accept",
    deliveryStatus: "Cancelled",
    action: "",
  },
  {
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    },
    id:1,
    orderID: "ORD12345",
    courierName: "DHL Express",
    courierID: "C123",
    deliveryFee: "$25.00",
  shipping: "456 Another St, City, Country",
    itemType: "Fragile",
  createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "10:00 AM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    deliveryStatus: "Completed",
    action: "",
  },
  {
    customer: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
    },
    id:2,
    orderID: "ORD67890",
    courierName: "FedEx",
    courierID: "C456",
    deliveryFee: "$18.00",
  shipping: "456 Another St, City, Country",
    itemType: "Document",
   createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "09:00 AM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updatetime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updateBy: "Abu Said Shihab",
    authorized: "Pending",
    deliveryStatus: "Processing",
    action: "",
  },
  {
    customer: {
      name: "Alex Johnson",
      email: "alexjohnson@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-02.webp&w=1920&q=75",
    },
    id:3,
    orderID: "ORD54321",
    courierName: "UPS",
    courierID: "C789",
    deliveryFee: "$30.00",
  shipping: "456 Another St, City, Country",
    itemType: "Parcel",
    createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Abu Said Shihab",
    publishBy: "Zobaer Ahmmed",
    updateBy: "Abu Said Shihab",
    authorized: "Accept",
    deliveryStatus: "Cancelled",
    action: "",
  },
  {
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    },
    id:1,
    orderID: "ORD12345",
    courierName: "DHL Express",
    courierID: "C123",
    deliveryFee: "$25.00",
  shipping: "456 Another St, City, Country",
    itemType: "Fragile",
  createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "10:00 AM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    deliveryStatus: "Completed",
    action: "",
  },
  {
    customer: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
    },
    id:2,
    orderID: "ORD67890",
    courierName: "FedEx",
    courierID: "C456",
    deliveryFee: "$18.00",
  shipping: "456 Another St, City, Country",
    itemType: "Document",
   createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "09:00 AM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updatetime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updateBy: "Abu Said Shihab",
    authorized: "Pending",
    deliveryStatus: "Processing",
    action: "",
  },
  {
    customer: {
      name: "Alex Johnson",
      email: "alexjohnson@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-02.webp&w=1920&q=75",
    },
    id:3,
    orderID: "ORD54321",
    courierName: "UPS",
    courierID: "C789",
    deliveryFee: "$30.00",
  shipping: "456 Another St, City, Country",
    itemType: "Parcel",
    createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Abu Said Shihab",
    publishBy: "Rakib Ahmmed",
    updateBy: "Abu Said Shihab",
    authorized: "Accept",
    deliveryStatus: "Cancelled",
    action: "",
  },
  {
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    },
    id:1,
    orderID: "ORD12345",
    courierName: "DHL Express",
    courierID: "C123",
    deliveryFee: "$25.00",
  shipping: "456 Another St, City, Country",
    itemType: "Fragile",
  createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "10:00 AM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Shihab Hossain",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    deliveryStatus: "Refunded",
    action: "",
  },
  {
    customer: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
    },
    id:2,
    orderID: "ORD67890",
    courierName: "FedEx",
    courierID: "C456",
    deliveryFee: "$18.00",
  shipping: "456 Another St, City, Country",
    itemType: "Document",
   createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "09:00 AM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updatetime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updateBy: "Shihab Moni",
    authorized: "Pending",
    deliveryStatus: "On hold",
    action: "",
  },
  {
    customer: {
      name: "Alex Johnson",
      email: "alexjohnson@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-02.webp&w=1920&q=75",
    },
    id:3,
    orderID: "ORD54321",
    courierName: "UPS",
    courierID: "C789",
    deliveryFee: "$30.00",
  shipping: "456 Another St, City, Country",
    itemType: "Parcel",
    createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Abu Said Shihab",
    publishBy: "Zobaer Ahmmed",
    updateBy: "Rakib Hossain",
    authorized: "Accept",
    deliveryStatus: "Refunded",
    action: "",
  },
  {
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    },
    id:1,
    orderID: "ORD12345",
    courierName: "DHL Express",
    courierID: "C123",
    deliveryFee: "$25.00",
  shipping: "456 Another St, City, Country",
    itemType: "Fragile",
  createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "10:00 AM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updateBy: "Abu Said Shihab",
    authorized: "Rejected",
    deliveryStatus: "Completed",
    action: "",
  },
  {
    customer: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
    },
    id:2,
    orderID: "ORD67890",
    courierName: "FedEx",
    courierID: "C456",
    deliveryFee: "$18.00",
  shipping: "456 Another St, City, Country",
    itemType: "Document",
   createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "09:00 AM",
    createBy: "Zobaer Ahmmed",
    publishBy: "Zobaer Ahmmed",
    updatetime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updateBy: "Abu Said Shihab",
    authorized: "Pending",
    deliveryStatus: "Draft",
    action: "",
  },
  {
    customer: {
      name: "Alex Johnson",
      email: "alexjohnson@example.com",
      image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-02.webp&w=1920&q=75",
    },
    id:3,
    orderID: "ORD54321",
    courierName: "UPS",
    courierID: "C789",
    deliveryFee: "$30.00",
  shipping: "456 Another St, City, Country",
    itemType: "Parcel",
    createDate: "15-Jan-2023",
    createTime: "11:00 AM",
    publishDate: "15-Jan-2023",
    publishTime: "03:00 PM",
    updatedate: "15-Jan-2023",
    updatetime: "03:00 PM",
    createBy: "Abu Said Shihab",
    publishBy: "Zobaer Ahmmed",
    updateBy: "Abu Said Shihab",
    authorized: "Accept",
    deliveryStatus: "Draft",
    action: "",
  },
];


const columns = [
  { key: "id", label: "ID" },
  { key: "customer.image", label: "Customer" },
  // { key: "customer.name", label: "Customer" },
  // { key: "customer.email", label: "Email" },
  { key: "orderID", label: "Order ID" },
  { key: "courierName", label: "Courier Name" },
  { key: "courierID", label: "Courier ID" },
  { key: "deliveryFee", label: "Delivery Fee" },
  { key: "shipping", label: "Shipping" },
  { key: "itemType", label: "Item Type" }, // Parcel, Document, Fragile
  { key: "createDate", label: "Create Date" },
  { key: "createBy", label: "Create By" },
  // { key: "createTime", label: "Create Time" },
  { key: "publishDate", label: "Authorize Date" },
  { key: "publishBy", label: "Authorize By" },

  // { key: "publishTime", label: "Publish Time" },
    // { key: "publishTime", label: "Publish Time" },
  { key: "updatedate", label: "Update Date" },
    { key: "updateBy", label: "Update By" },
  { key: "authorized", label: "Authorized" }, // Accept, Pending, Rejected
  { key: "deliveryStatus", label: "Delivery Status" }, // Processing, Cancelled, Refunded, Completed, On hold, Draft
  { key: "action", label: "Action" }, // View, Edit, Delete
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
                      const [selectedOption2, setSelectedOption2] = useState('Select Status');
                      const [isOpen2, setIsOpen2] = useState(false);
                      const dropdownRef2 = useRef(null);
                               const [hoveredItem, setHoveredItem] = useState(null); // Tracks the currently hovered item
                                          const [hoveredItem2, setHoveredItem2] = useState(null); // Tracks the currently hovered item
                                          const [hoveredItem3, setHoveredItem3] = useState(null); // Tracks the currently hovered item
                                   
                      const options2 = [
                        { label: 'Select Status', color: 'text-gray-400', bgColor: 'bg-gray-300' },
                        { label: 'Processing', color: 'text-orange-500', bgColor: 'bg-orange-500' },
                        { label: 'Cancelled', color: 'text-red-500', bgColor: 'bg-red-500' },
                        { label: 'Refunded', color: 'text-orange-500', bgColor: 'bg-orange-500' },
                        { label: 'Completed', color: 'text-green-500', bgColor: 'bg-green-500' },
                        { label: 'On hold', color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
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
                        if(option.label=="Select Status"){
                          setStatus("")
                        }else{
                          setStatus(option.label)
                          console.log(option.label)
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
                          console.log(option.label)
                        }
                      };
                        const selectedOptionData = options.find(
                      (option) => option.label === selectedOption
                    );
                      // --------------------status-----------
                      const [selectedOption3, setSelectedOption3] = useState('Select Type');
                      const [isOpen3, setIsOpen3] = useState(false);
                      const dropdownRef3 = useRef(null);
                    
                      const options3 = [
                        { label: 'Select Type', color: 'text-gray-400', bgColor: 'bg-gray-300' },
                        { label: 'Parcel', color: 'text-green-500', bgColor: 'bg-green-500' },
                        { label: 'Document', color: 'text-orange-500', bgColor: 'bg-orange-500' },
                        { label: 'Fragile', color: 'text-orange-700', bgColor: 'bg-orange-700' },
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
                        setIsOpen3(false);
                        if(option.label=="Select Type"){
                          setType("")
                        }else{
                          setType(option.label)
                          console.log(option.label)
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

// ---------------customer-suggestion-------------------
const [customerValue, setCustomerValue] = useState("");
const [customerSuggestions, setCustomerSuggestions] = useState([]);
// Helper function to get unique customer suggestions
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
  setcustomerinput(value);

  if (value) {
    setCustomerSuggestions(fetchUniqueCustomerSuggestions(value));
  } else {
    setCustomerSuggestions([]);
  }
};

const handleCustomerSuggestionClick = (suggestion) => {
  setcustomerinput(suggestion);
  setCustomerSuggestions([]); // Clear suggestions after selection
};

// -------------courier-name-suggestion-------------------
const [courierValue, setCourierValue] = useState("");
  const [courierSuggestions, setCourierSuggestions] = useState([]);
   // Helper function to get unique courier suggestions
   const fetchUniqueCourierSuggestions = (value) => {
    return [
      ...new Set(
        data
          .filter((item) =>
            item.courierName.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => item.courierName)
      ),
    ];
  };

  const handleCourierInputChange = (e) => {
    const value = e.target.value;
    setcourierinput(value);

    if (value) {
      setCourierSuggestions(fetchUniqueCourierSuggestions(value));
    } else {
      setCourierSuggestions([]);
    }
  };

  const handleCourierSuggestionClick = (suggestion) => {
    setcourierinput(suggestion);
    setCourierSuggestions([]); // Clear suggestions after selection
  };
  // -----------create-by----------------
  const [createByValue, setCreateByValue] = useState("");
  const [createBySuggestions, setCreateBySuggestions] = useState([]);
 // Helper function to get unique "create by" suggestions
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
  setCreateByInput(value);

  if (value) {
    setCreateBySuggestions(fetchUniqueCreateBySuggestions(value));
  } else {
    setCreateBySuggestions([]);
  }
};

const handleCreateBySuggestionClick = (suggestion) => {
  setCreateByInput(suggestion);
  setCreateBySuggestions([]); // Clear suggestions after selection
};
// -----------publish-by-suggestion----------------
const [publishByValue, setPublishByValue] = useState("");
const [publishBySuggestions, setPublishBySuggestions] = useState([]);
 // Helper function to get unique "publish by" suggestions
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
// -------------------update-by-------------------
const [updateByValue, setUpdateByValue] = useState("");
const [updateBySuggestions, setUpdateBySuggestions] = useState([]);
// Helper function to get unique "update by" suggestions
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
// -----------------------filter-system--------------------------
// Filter data based on search term
  const [createByInput,setCreateByInput]=useState("")
  const [authorinput,setauthorinput]=useState("");
  const [courierinput,setcourierinput]=useState("")
  const [emailinput,setemailinput]=useState("")
  const [customerinput,setcustomerinput]=useState("")
  const [postinput,setpostinput]=useState("")
  const [productinput,setproductinput]=useState("");
  const [typeinput,settypeinput]=useState("")
const [publishByInput, setPublishByInput] = useState("");
const [updateByInput, setUpdateByInput] = useState("");
const [authorized, setAuthorized] = useState("");
const [visibility, setVisibility] = useState("");
const [type,setType] = useState("");
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
      const matchcustomer = customerinput ? item.customer.name.toLowerCase().includes(customerinput.toLowerCase()) : true;
      const matchcourier = courierinput ? item.courierName.toLowerCase().includes(courierinput.toLowerCase()) : true;
    
      const matchesemail = emailinput ? item.author.email.toLowerCase().includes(emailinput.toLowerCase()) : true;
      const matchproduct = productinput ? item.product.name.toLowerCase().includes(productinput.toLowerCase()) : true;
      const matchesCreateBy = createByInput ? item.createBy.toLowerCase().includes(createByInput.toLowerCase()) : true;
      const matchesPublishBy = publishByInput ? item.publishBy.toLowerCase().includes(publishByInput.toLowerCase()) : true;
      const matchesUpdateBy = updateByInput ? item.updateBy.toLowerCase().includes(updateByInput.toLowerCase()) : true;
      const matchesAuthorized = authorized ? item.authorized === authorized : true;
      const matchestype = type ? item.itemType === type : true;
      const matchesVisibility = visibility ? item.visibility === visibility : true;
      const matchesStatus = status ? item.deliveryStatus === status : true;
      const matchesSearchTerm = searchTerm ? item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||   item.orderID.toLowerCase().includes(searchTerm.toLowerCase()) ||  item.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) || item.courierID.toLowerCase().includes(searchTerm.toLowerCase()) || item.courierName.toLowerCase().includes(searchTerm.toLowerCase()) || item.courierID.toLowerCase().includes(searchTerm.toLowerCase()) || item.shipping.toLowerCase().includes(searchTerm.toLowerCase()) || item.itemType.toLowerCase().includes(searchTerm.toLowerCase()) || item.createDate.toLowerCase().includes(searchTerm.toLowerCase()) || item.createTime.toLowerCase().includes(searchTerm.toLowerCase()) || item.publishDate.toLowerCase().includes(searchTerm.toLowerCase())  || item.publishTime.toLowerCase().includes(searchTerm.toLowerCase()) || item.updatedate.toLowerCase().includes(searchTerm.toLowerCase()) || item.updatetime.toLowerCase().includes(searchTerm.toLowerCase()) || item.createBy.toLowerCase().includes(searchTerm.toLowerCase()) || item.publishBy.toLowerCase().includes(searchTerm.toLowerCase()) || item.updateBy.toLowerCase().includes(searchTerm.toLowerCase())  || item.authorized.toLowerCase().includes(searchTerm.toLowerCase())  || item.deliveryStatus.toLowerCase().includes(searchTerm.toLowerCase()) : true;
     
      // Create Date filter
      // const matchesCreateDate = itemCreateDate >= new Date(createStartDate) && itemCreateDate <= new Date(createEndDate);
      // Publish Date filter
      // const matchesPublishDate = itemPublishDate >= new Date(publishStartDate) && itemPublishDate <= new Date(publishEndDate);
      return (
        matchcustomer &&
        matchcourier &&
        matchesemail &&
        matchestype &&
        matchproduct &&
        matchesCreateBy &&
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
  }, [searchTerm,customerinput,courierinput,emailinput,productinput,createByInput,publishByInput, updateByInput, authorized,type,visibility, status, createRange, publishRange]);
  
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
    setauthorinput("");
    setAuthorized("");
    setcustomerinput("");
    setcourierinput("")
    setStatus("");
    setType("")
    setemailinput("");
    setpostinput("");
    setCreateByInput("");
    setPublishByInput("");
    setUpdateByInput("");
    setAuthorized("");
    setVisibility("");
    setStatus("");
    setSearchTerm("");
    setSelectedOption("Select Authorized");
    setSelectedOption2("Select Status");
    setSelectedOption3("Select Type");
    // setFilteredData(originalData);
    // setOriginalData(data)

  }

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
              <h1 className='text-[20px] font-[600] mb-[8px]'> Product Delivery List</h1>
          <ul className='w-full   md:w-auto flex lg:justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Products</li>
            <li><IoIosArrowForward/></li>
            <li> Product Delivery List</li>
          </ul>
        </div>
        {/* -------------------table------------------- */}

        {/* ---------------table --------------- */}
       <div className='w-full   md:w-auto flex gap-[10px] md:m-0 mt-[15px]'>
         <button className='w-[50%] md:w-auto px-[15px] py-[6px] text-black text-[14px] gap-[8px]  border-[1px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'>
            <BiExport className='text-[20px]'/>
            Export
        </button>
        <NavLink to="/products/new-product-delivery"className="w-[50%] md:w-auto ">
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
        placeholder="Search for delivery"
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
   <div className='w-auto flex justify-center items-center gap-[6px] lg:gap-[10px]'>
    <button onClick={()=>{setfilter_sidebar(true)}}  className='w-[50%] md:w-auto text-[14px] border-[1px] border-[#eee] hover:text-brand_color transition-all duration-100 px-[17px] py-[7px] flex justify-center hover:border-brand_color items-center gap-[7px] rounded-[5px]'>
          <BiFilterAlt className='text-[20px]'/> Filters
    </button>
    <div className="relative w-[50%] md:w-auto inline-block text-left ">
  <div>
    <div className="w-auto  relative inline-block text-left ">
  <div className="w-auto  relative inline-block text-left ">
      <button onClick={()=>{setfilter_sidebar2(!filter_sidebar2)}} className='w-[100%] md:w-auto  text-[14px] border-[1px] hover:text-brand_color transition-all duration-100 border-[#eee] px-[17px] hover:border-brand_color py-[7px] flex justify-center items-center gap-[7px] rounded-[5px]'>
        <BsGrid className='text-[20px]'/>
    </button>
  </div>
  {/* -------------------filter popup------------------ */}
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
            <div className="mt-[10px] relative">
      <label htmlFor="customer" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Customer
      </label>
      <br />
      <input
        type="text"
        placeholder="Customer"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" 
        value={customerinput}
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
    <div className="mt-[10px] relative">
      <label htmlFor="courierName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Courier Name
      </label>
      <br />
      <input
        type="text"
        placeholder="Courier Name"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" 
        value={courierinput}
        onChange={handleCourierInputChange}
      />
      {courierSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {courierSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleCourierSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
                               
    <div  className='mb-[10px] mt-[10px]'>
                        <label htmlFor="name"className='text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight'>Item Type</label><br />
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
              <div className="mb-[10px]">
  <label className="text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight">Create Date</label>
  <br />
  <div style={{ position: "relative", width: "100%" }}>
    <input
      type="text"
      readOnly
      value={`${format(createRange[0].startDate, "dd-MM-yyyy")} - ${format(createRange[0].endDate, "dd-MM-yyyy")}`}
      onClick={() => setShowCreateCalendar(true)}
      placeholder="Select Date Range"
      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
    />
    {showCreateCalendar && (
      <div className="absolute z-10 bg-white shadow-md border-[1px] border-[#eee] w-full p-2">
        <DateRange ranges={tempCreateRange} onChange={handleCreateDateChange} months={1} rangeColors={["#4A90E2"]} />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={cancelCreateDate} className="px-3 py-1 border rounded bg-gray-300">Cancel</button>
          <button onClick={applyCreateDate} className="px-3 py-1 border rounded bg-indigo-600 text-white">Apply</button>
        </div>
      </div>
    )}
  </div>
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
        value={createByInput}
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
            {/* Publish Date Section */}
<div className="mb-[10px] mt-[10px]">
  <label className="text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight">Authorize Date</label>
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
          <button onClick={cancelPublishDate} className="px-3 py-1 border rounded bg-gray-300">Cancel</button>
          <button onClick={applyPublishDate} className="px-3 py-1 border rounded bg-indigo-600 text-white">Apply</button>
        </div>
      </div>
    )}
  </div>
</div>
                     <div className="mt-[10px] relative">
      <label htmlFor="publishBy" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      Authorize By
      </label>
      <br />
      <input
        type="text"
        placeholder="Authorized By"
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
              <div>
              <div className="mb-[10px] mt-[10px]">
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
          <button onClick={cancelUpdateDate} className="px-3 py-1 border rounded bg-gray-300">Cancel</button>
          <button onClick={applyUpdateDate} className="px-3 py-1 border rounded bg-indigo-600 text-white">Apply</button>
        </div>
      </div>
    )}
  </div>
</div>
              <div className="relative mt-[10px]">
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
                <label className="text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight">Delivery Status</label>
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
           
              </div>
            </div>
            
   </div>
  
                         {                                                                                                         customerinput=="" && courierinput==""&& createByInput=="" && updateByInput=="" && publishByInput==""  && selectedOption=="Select Authorized" &&  selectedOption3=="Select Type" && selectedOption2=="Select Status" ? "":            <button
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
 {/* Table */}
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
            <tr key={rowIndex} className=" dark:hover:bg-gray-800">
              {columns
                .filter((col) => visibleColumns.includes(col.key))
                .map((col) => (
                  <td
                    key={col.key}
                    className={`lg:px-4 py-4 text-sm w-full lg:w-[45%] px-[40px] lg:text-wrap ${
                      col.key === "status" || col.key === "deliveryStatus"
                        ? "text-[17px] font-medium"
                        : "text-[16px] text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {col.key === "customer.image" ? (
                      <div className="flex items-center pr-[40px]">
                        <img
                          src={row.customer.image}
                          alt="Avatar"
                          className="w-10 h-10 rounded-[5px] object-contain"
                        />
                        <div className="ml-[20px]">
                          <p className="whitespace-nowrap text-[16px] font-[500] text-black">{row.customer.name}</p>
                          <p className="whitespace-nowrap">{row.customer.email}</p>
                        </div>
                      </div>
                    ) : col.key === "createDate" ? (
                      <div>
                        <div className="whitespace-nowrap text-black dark:text-gray-100">
                          {row[col.key]}
                        </div>
                        <div className="text-[14px] text-gray-400">
                          {row.createTime}
                        </div>
                      </div>
                    ) : col.key === "updatedate" ? (
                      <div>
                        <div className="whitespace-nowrap text-black dark:text-gray-100">
                          {row[col.key]}
                        </div>
                        <div className="text-[14px] text-gray-400">
                          {row.updatetime}
                        </div>
                      </div>
                    ) : col.key === "publishDate" ? (
                      <div>
                        <div className="whitespace-nowrap text-black dark:text-gray-100">
                          {row[col.key]}
                        </div>
                        <div className="text-[14px] text-gray-400">
                          {row.publishTime}
                        </div>
                      </div>
                    ) : col.key === "authorized" ? (
                      <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        row[col.key] === "Accept"
                          ? "bg-green-100 text-green-500 "
                          : row[col.key] === "Pending"
                          ? "bg-orange-100 text-orange-500"
                          : "bg-red-100 text-red-500 "
                      }`}
                    >
                        {row[col.key]}
                      </span>
                    ): col.key === "deliveryStatus" ? (
                      <span
                        className={`whitespace-nowrap px-2 py-1 rounded-full text-xs ${
                          row[col.key].toLowerCase() === "processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : row[col.key].toLowerCase() === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : row[col.key].toLowerCase() === "refunded"
                            ? "bg-purple-100 text-purple-700"
                            : row[col.key].toLowerCase() === "completed"
                            ? "bg-green-100 text-green-700"
                            : row[col.key].toLowerCase() === "on hold"
                            ? "bg-blue-100 text-blue-700"
                            : row[col.key].toLowerCase() === "draft"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {row[col.key]}
                      </span>
                    ) : col.key === "authorized" ? (
                      <span
                        className={`whitespace-nowrap ${
                          row[col.key].toLowerCase() === "accept"
                            ? "text-green-500"
                            : row[col.key].toLowerCase() === "pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {row[col.key]}
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
                      <span className="whitespace-nowrap">{row[col.key]}</span>
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

export default Bdelivery