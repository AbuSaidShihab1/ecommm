import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../components/dashboard/Dashboardheader';
import toast,{Toaster} from 'react-hot-toast';
import { IoIosArrowForward } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { FaReplyAll } from "react-icons/fa6";
import { GoEye } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";
import { motion } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { BiFilterAlt } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import * as XLSX from 'xlsx';
import Select from "react-tailwindcss-select";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css';
import format from "date-fns/format";
import { addDays } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";
import empty_img from "../../assets/empty.png"
import { useSuper } from '../../context/Superprovider';

const Ticketlist = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

     const {tickets,fetchtickets}=useSuper();
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
    const [range2, setRange2] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isPickerVisible2, setPickerVisible2] = useState(false);

  const inputRef = useRef(null);
  const inputRef2= useRef(null);
   const [selectedOption, setSelectedOption] = useState('Select Status');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null); // Tracks the currently hovered item

  const options = [
    { label: 'Select Status', color: 'text-gray-400', bgColor: 'bg-gray-300' },
    { label: 'Open', color: 'text-green-500', bgColor: 'bg-green-500' },
    { label: 'Waiting', color: 'text-orange-500', bgColor: 'bg-orange-500' },
    { label: 'Closed', color: 'text-red-500', bgColor: 'bg-red-500' },
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
    if(option.label=="Select Status"){
      setStatus("")
    }else{
      setStatus(option.label)
    }
  };

  const selectedOptionData = options.find(
    (option) => option.label === selectedOption
  );

  const selectedColor = options.find(
    (option) => option.label === selectedOption
  )?.color;

  const handleSelect = (ranges) => {
    setRange([ranges.selection]); // Update the range state
  };
  const handleSelect2 = (ranges) => {
    setRange([ranges.selection]); // Update the range state
  };

  // Toggles the visibility of the date range picker
  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };
  const togglePicker2 = () => {
    setPickerVisible2(!isPickerVisible2);
  };
  // Format dates for display in the input field
  const formattedDate = `${format(range[0].startDate, "yyyy-MM-dd")} - ${format(
    range[0].endDate,
    "yyyy-MM-dd"
  )}`;
  const formattedDate2 = `${format(range[0].startDate, "yyyy-MM-dd")} - ${format(
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
  const handleApply2 = () => {
    const { startDate, endDate } = range[0];
    const formattedStartDate = startDate.toLocaleDateString();
    const formattedEndDate = endDate.toLocaleDateString();
    // setFormattedDate(`${formattedStartDate} - ${formattedEndDate}`);
       setPickerVisible2(!isPickerVisible2);
       // Close the picker after applying
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // --------------table coulms
  const [data,setData]=useState(tickets)
// const data = [
//   {
//     id: 1,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-12.webp&w=1920&q=75",
//     title: "Your Order Number is 2333",
//     nick_name: "Emon Sheikh",
//     organizationname:"Rg Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Abu Said Shihab",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Samuel Garcia",
//     createby: "Samuel Garcia",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "open",
//     action: "",
//   },
//   {
//     id: 2,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-11.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.we will send you message.",
//     nick_name: "Md.Limon",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Rimon Rahman",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Rimon Rahman",
//     createby: "Rimon Rahman",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "closed",
//     action: "",
//   },
//   {
//     id: 3,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.This is your first order.",
//     nick_name: "Rafiur Rifat",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Zobaer Ahammed",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Zobaer Ahammed",
//     createby: "Zobaer Ahammed",
//     updateby: "Zobaer Ahammed",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "open",
//     action: "",
//   },
//   {
//     id: 4,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.",
//     nick_name: "Abu Said Shihab ",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Abu Said Shihab",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Samuel Garcia",
//     createby: "Samuel Garcia",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "waiting",
//     action: "",
//   },
//   {
//     id: 1,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-12.webp&w=1920&q=75",
//     title: "Your Order Number is 2333",
//     nick_name: "Emon Sheikh",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Abu Said Shihab",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Samuel Garcia",
//     createby: "Samuel Garcia",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "open",
//     action: "",
//   },
//   {
//     id: 2,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-11.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.we will send you message.",
//     nick_name: "Md.Limon",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Rimon Rahman",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Rimon Rahman",
//     createby: "Rimon Rahman",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "closed",
//     action: "",
//   },
//   {
//     id: 3,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.This is your first order.",
//     nick_name: "Rafiur Rifat",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Zobaer Ahammed",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Zobaer Ahammed",
//     createby: "Zobaer Ahammed",
//     updateby: "Zobaer Ahammed",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "open",
//     action: "",
//   },
//   {
//     id: 4,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.",
//     nick_name: "Abu Said Shihab ",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Abu Said Shihab",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Samuel Garcia",
//     createby: "Samuel Garcia",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "waiting",
//     action: "",
//   },

//   {
//     id: 1,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-12.webp&w=1920&q=75",
//     title: "Your Order Number is 2333",
//     nick_name: "Emon Sheikh",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Abu Said Shihab",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Samuel Garcia",
//     createby: "Samuel Garcia",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "open",
//     action: "",
//   },
//   {
//     id: 2,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-11.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.we will send you message.",
//     nick_name: "Md.Limon",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Rimon Rahman",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Rimon Rahman",
//     createby: "Rimon Rahman",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "closed",
//     action: "",
//   },
//   {
//     id: 3,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.This is your first order.",
//     nick_name: "Rafiur Rifat",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Zobaer Ahammed",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Zobaer Ahammed",
//     createby: "Zobaer Ahammed",
//     updateby: "Zobaer Ahammed",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "open",
//     action: "",
//   },
//   {
//     id: 4,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.",
//     nick_name: "Abu Said Shihab ",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Abu Said Shihab",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Samuel Garcia",
//     createby: "Samuel Garcia",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "waiting",
//     action: "",
//   },

//   {
//     id: 1,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-12.webp&w=1920&q=75",
//     title: "Your Order Number is 2333",
//     nick_name: "Emon Sheikh",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Abu Said Shihab",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Samuel Garcia",
//     createby: "Samuel Garcia",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "open",
//     action: "",
//   },
//   {
//     id: 2,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-11.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.we will send you message.",
//     nick_name: "Md.Limon",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Rimon Rahman",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Rimon Rahman",
//     createby: "Rimon Rahman",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "closed",
//     action: "",
//   },
//   {
//     id: 3,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.This is your first order.",
//     nick_name: "Rafiur Rifat",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Zobaer Ahammed",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Zobaer Ahammed",
//     createby: "Zobaer Ahammed",
//     updateby: "Zobaer Ahammed",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "open",
//     action: "",
//   },
//   {
//     id: 4,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.",
//     nick_name: "Abu Said Shihab ",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Abu Said Shihab",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Samuel Garcia",
//     createby: "Samuel Garcia",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "waiting",
//     action: "",
//   },

//   {
//     id: 1,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-12.webp&w=1920&q=75",
//     title: "Your Order Number is 2333",
//     nick_name: "Emon Sheikh",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Abu Said Shihab",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Samuel Garcia",
//     createby: "Samuel Garcia",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "open",
//     action: "",
//   },
//   {
//     id: 2,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-11.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.we will send you message.",
//     nick_name: "Md.Limon",
//     organizationname:"Ak Group",
//     email:"shihab44@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Rimon Rahman",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Rimon Rahman",
//     createby: "Rimon Rahman",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "closed",
//     action: "",
//   },
//   {
//     id: 3,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.This is your first order.",
//     nick_name: "Rafiur Rifat",
//     organizationname:"Ak Group",
//     email:"ak3443@gmail.com",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Zobaer Ahammed",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Zobaer Ahammed",
//     createby: "Zobaer Ahammed",
//     updateby: "Zobaer Ahammed",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "open",
//     action: "",
//   },
//   {
//     id: 4,
//     name: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75",
//     title: "Your Order Number is 2333.",
//     organizationname:"Ak Group",
//     email:"ak33@gmail.com",
//     nick_name: "Abu Said Shihab ",
//     message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos harum, aspernatur magni sequi eos.",
//     create_date: "15-Jan-2023",
//     create_by: "Abu Said Shihab",
//     create_time: "08:20 PM",
//     updated_time: "08:20 PM",
//     publish_date: "5-May-2022",
//     publish_time: "09:45 AM",
//     publish_by: "Samuel Garcia",
//     createby: "Samuel Garcia",
//     updateby: "Rimon Rakib",
//     updateDate: "5-May-2022",
//     update_time: "02:15 PM",
//     status: "waiting",
//     action: "",
//   },

// ];

const columns = [
  { key: "id", label: "ID" },
  { key: "profile_pic", label: "Account Holder" },
  { key: "shopName", label: "Organization Name" },
  { key: "email", label: "Email" },
  // { key: "message", label: "Message" },
  { key: "createDate", label: "Create Date" },
  { key: "createdBy", label: "Create By" },
  { key: "authorizedDate", label: "Authorize Date" },
  // { key: "publish_time", label: "Publish Time" },
  { key: "authorizedBy", label: "Authorize By" },
  { key: "updateDate", label: "Update Date" },
  { key: "updateBy", label: "Update By" },
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
  // ------------------------------designation-suggestion----------------
    const [designationinput,setdesignationinput]=useState("");
    const [companyinput,setcompanyinput]=useState("");
  
  const [designationValue, setDesignationValue] = useState("");
  const [designationSuggestions, setDesignationSuggestions] = useState([]);
  // Helper function to get unique "designation" suggestions
  const fetchUniqueDesignationSuggestions = (value) => {
    return [
      ...new Set(
        data
          .filter((item) =>
            item.shopName.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => item.shopName)
      ),
    ];
  };
  
  const handleDesignationInputChange = (e) => {
    const value = e.target.value;
    setdesignationinput(value);
  
    if (value) {
      setDesignationSuggestions(fetchUniqueDesignationSuggestions(value));
    } else {
      setDesignationSuggestions([]);
    }
  };
  
  const handleDesignationSuggestionClick = (suggestion) => {
    setdesignationinput(suggestion);
    setDesignationSuggestions([]); // Clear suggestions after selection
  };
  // ----------company-suggestion----------------
  const [companyValue, setCompanyValue] = useState("");
  const [companySuggestions, setCompanySuggestions] = useState([]);
  
   // Helper function to get unique "company" suggestions
   const fetchUniqueCompanySuggestions = (value) => {
    return [
      ...new Set(
        data
          .filter((item) =>
            item.email.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => item.email)
      ),
    ];
  };
  
  const handleCompanyInputChange = (e) => {
    const value = e.target.value;
    setcompanyinput(value);
  
    if (value) {
      setCompanySuggestions(fetchUniqueCompanySuggestions(value));
    } else {
      setCompanySuggestions([]);
    }
  };
  
  const handleCompanySuggestionClick = (suggestion) => {
    setcompanyinput(suggestion);
    setCompanySuggestions([]); // Clear suggestions after selection
  };
  // -----------authorized-calender-----------------
   // Publish Date States
 const [showPublishCalendar, setShowPublishCalendar] = useState(false);
 const [publishRange, setPublishRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
 const [tempPublishRange, setTempPublishRange] = useState(publishRange);

 // Update Date States
 const [showUpdateCalendar, setShowUpdateCalendar] = useState(false);
 const [updateRange, setUpdateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
 const [tempUpdateRange, setTempUpdateRange] = useState(updateRange);

 // Functions for Publish Date
 const handlePublishDateChange = (item) => setTempPublishRange([item.selection]);
 const applyPublishDate = () => { setPublishRange(tempPublishRange); setShowPublishCalendar(false); };
 const cancelPublishDate = () => { setTempPublishRange(publishRange); setShowPublishCalendar(false); };

  // -------------------suggention of name filter
const [originValue, setOriginValue] = useState("");
const [originSuggestions, setOriginSuggestions] = useState([]);
const [nameinput,setnameinput]=useState("");

  // Helper function to get unique "origin" suggestions
  const fetchUniqueOriginSuggestions = (value) => {
    return [
      ...new Set(
        data
          .filter((item) =>
            item.accountHolder.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => item.accountHolder)
      ),
    ];
  };

  const handleOriginInputChange = (e) => {
    const value = e.target.value;
    setnameinput(value);

    if (value) {
      setOriginSuggestions(fetchUniqueOriginSuggestions(value));
    } else {
      setOriginSuggestions([]);
    }
  };

  const handleOriginSuggestionClick = (suggestion) => {
    setnameinput(suggestion);
    setOriginSuggestions([]); // Clear suggestions after selection
  };
    // ---------------------search-box-------------------
     const [searchquery, setsearchQuery] = useState("");
    
     const onQueryChange = (e) => {
      setsearchQuery(e.target.value);
     };
    
     const clearQuery = () => {
      setsearchQuery("");
     };
       // Filter data based on search term
   const [searchTerm, setSearchTerm] = useState("");
  
   const handleClearSearch = () => {
     setSearchTerm(""); // Clear the input field
   };
// ===========================table searching function===================

  // Filter data based on search term
  const [createbyinput,set_createbyinput]=useState("");
const [publishByInput, setPublishByInput] = useState("");
const [updateByInput, setUpdateByInput] = useState("");
const [authorized, setAuthorized] = useState("");
const [visibility, setVisibility] = useState("");
const [status,setStatus]=useState("");
const [filteredData, setFilteredData] = useState([]); // Holds the filtered data
const [originalData, setOriginalData] = useState(data); // Holds the original data (fetched from API or elsewhere)
const [searchInput, setSearchInput] = useState("");
const [filteredPublishers, setFilteredPublishers] = useState([]);
const [selectedPublisher, setSelectedPublisher] = useState(null);


   // -------------------create by suggestion--------------------
                      const [inputValue, setInputValue] = useState("");
                      const [createbysuggestions, setcreatebySuggestions] = useState([]);
                      
                      const handlecreatebyInputChange = (e) => {
                        const value = e.target.value;
                        set_createbyinput(value);
                    
                        // Filter suggestions based on input value and ensure uniqueness
                        if (value) {
                          const filteredSuggestions = [
                            ...new Set(
                              data
                                .filter((item) =>
                                  item.createdBy.toLowerCase().includes(value.toLowerCase())
                                )
                                .map((item) => item.createdBy)
                            ),
                          ];
                          setcreatebySuggestions(filteredSuggestions);
                        } else {
                          setcreatebySuggestions([]);
                        }
                      };
                    
                      const handlecreatebySuggestionClick = (suggestion) => {
                        set_createbyinput(suggestion);
                        setcreatebySuggestions([]); // Clear suggestions after selection
                      };
                      const [publishByValue, setPublishByValue] = useState("");
                      const [publishBySuggestions, setPublishBySuggestions] = useState([]);
                    
                    
                      // Helper function to get unique "publish_by" suggestions
                      const getUniqueSuggestions = (value) => {
                        return [
                          ...new Set(
                            data
                              .filter((item) =>
                                item.authorizedBy.toLowerCase().includes(value.toLowerCase())
                              )
                              .map((item) => item.authorizedBy)
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
                        setUpdateBySuggestions([]);
                      };
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
      const matchname = designationinput ? item.shopName.toLowerCase().includes(designationinput.toLowerCase()) : true;
      const matchorganizationname = companyinput ? item.email.toLowerCase().includes(companyinput.toLowerCase()) : true;
      const matchesname = nameinput ? item.accountHolder.toLowerCase().includes(nameinput.toLowerCase()) : true;
      const matchescreateby = createbyinput ? item.createdBy.toLowerCase().includes(createbyinput.toLowerCase()) : true;
      const matchesstatus = status ? item.status.toLowerCase().includes(status.toLowerCase()) : true;
      const matchesPublishBy = publishByInput ? item.authorizedBy.toLowerCase().includes(publishByInput.toLowerCase()) : true;
      const matchesUpdateBy = updateByInput ? item.updateBy.toLowerCase().includes(updateByInput.toLowerCase()) : true;
      const matchesAuthorized = authorized ? item.authorized === authorized : true;
      const matchesVisibility = visibility ? item.visibility === visibility : true;
      const matchesSearchTerm = searchTerm ?  item.accountHolder.toLowerCase().includes(searchTerm.toLowerCase()) || item.subject.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase()) || item.message.toLowerCase().includes(searchTerm.toLowerCase()) || item.createDate.toLowerCase().includes(searchTerm.toLowerCase()) ||  item.updateDate.toLowerCase().includes(searchTerm.toLowerCase()) || item.status.toLowerCase().includes(searchTerm.toLowerCase()) : true;
  
      // Create Date filter
      // const matchesCreateDate = itemCreateDate >= new Date(createStartDate) && itemCreateDate <= new Date(createEndDate);
      // Publish Date filter
      // const matchesPublishDate = itemPublishDate >= new Date(publishStartDate) && itemPublishDate <= new Date(publishEndDate);
  
      return (
        matchesPublishBy &&
        matchesstatus &&
        matchescreateby &&
        matchesname &&
        matchesUpdateBy &&
        matchesAuthorized &&
        matchesVisibility &&
        matchorganizationname &&
        matchname &&
        matchesSearchTerm
        // matchesCreateDate 
        // matchesPublishDate
      );
    });
  
    setFilteredData(filtered);
  };
  
  useEffect(() => {
    applyFilters();
  }, [searchTerm,nameinput, publishByInput,createbyinput,updateByInput, authorized, visibility,status,designationinput,companyinput]);
  
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
   setnameinput("");
   setUpdateByInput("");
   set_createbyinput("");
   setPublishByInput("")
   setStatus("")
   setdesignationinput("");
   setcompanyinput("");
   setSelectedOption("Select Status");

  }
  // ------------------delete-ticket-------------------------
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [ticketToDelete, setTicketToDelete] = useState(null);
const handleDeleteTicket = async () => {
  const toastId = toast.loading('Deleting ticket...');
  
  try {
    const response = await fetch(`${base_url}/super/admin/delete-ticket/${ticketToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });

    const data = await response.json();
      fetchtickets();

    if (data.success) {
      fetchtickets();
      // Update state to remove the deleted ticket
      setData(prevData => prevData.filter(ticket => ticket._id !== ticketToDelete));
      toast.success('Ticket deleted successfully!', {
        id: toastId,
        duration: 4000,
      });
    } else {
      toast.error(data.message || 'Failed to delete ticket', {
        id: toastId,
        duration: 4000,
      });
    }
  } catch (error) {
    console.error('Error deleting ticket:', error);
    toast.error('Error deleting ticket. Please try again.', {
      id: toastId,
      duration: 4000,
    });
  } finally {
    setDeleteDialogOpen(false);
    setTicketToDelete(null);
  }
};
// --------------export-data---------------------
const exportToExcel = () => {
  // Prepare data for export (exclude images and format dates)
  const exportData = data.map((row) => {
    const exportedRow = {};
    
    columns.forEach((col) => {
      if (col.key === 'profile_pic') {
        // Skip the image column
        return;
      } else if (col.key === 'createDate' || col.key === 'authorizedDate' || col.key === 'updateDate') {
        // Format dates for Excel
        exportedRow[col.label] = format(new Date(row[col.key]), 'dd-MMM-yyyy hh:mm a');
      } else if (col.key === 'status') {
        // Capitalize status
        exportedRow[col.label] = row[col.key].charAt(0).toUpperCase() + row[col.key].slice(1);
      } else if (col.key === 'action') {
        // Skip action column
        return;
      } else {
        // Include all other columns
        exportedRow[col.label] = row[col.key];
      }
    });
    
    return exportedRow;
  });

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Tickets");
  
  // Generate file name with current date
  const fileName = `Tickets_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
  
  // Export the file
  XLSX.writeFile(wb, fileName);
};
useEffect(()=>{
fetchtickets()
},[])
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <Toaster/>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
 <section className='w-[100%] m-auto py-[20px]  xl:py-[40px] px-[20px] lg:px-[30px]'>
     <div className='w-full flex md:justify-between items-center  md:flex-row flex-col justify-start'>
        <div className='w-full md:w-auto'>
              <h1 className='text-[20px] font-[600] mb-[8px]'>Ticket List</h1>
          <ul className='w-full   md:w-auto flex lg:justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Support Ticket</li>
            <li><IoIosArrowForward/></li>
            <li>Ticket List</li>
          </ul>
        </div>
        {/* -------------------table------------------- */}

        {/* ---------------table --------------- */}
      <div className='w-full   md:w-auto flex gap-[10px] md:m-0 mt-[15px]'>
             <button onClick={exportToExcel} className='w-[50%] md:w-auto px-[15px] py-[6px] text-black text-[14px] gap-[8px]  border-[1px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'>
                <BiExport className='text-[20px]'/>
                Export
            </button>
            <NavLink to="/super-new-tickets"className="w-[50%] md:w-auto ">
               <button className='px-[12px] w-[100%] md:w-auto py-[6px] font-[500] border-[2px] border-brand_color  text-white rounded-[5px] text-[14px] bg-brand_color flex justify-center items-center gap-[10px]'>
            <LuPlus className='text-[22px]'/>
            Add New
        </button>
            </NavLink>
           </div>

       </div>
       {/* ------------------new customer table----------------- */}
       {/* --------------delete-popup------------------ */}
          {/* Delete Confirmation Dialog */}
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
          Are you sure you want to delete this ticket? This action cannot be undone and all
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
       {/* ---------------------delete-popup-------------------- */}
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
        placeholder="Search for ticket"
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
   <div className=' w-auto flex justify-center items-center gap-[6px] lg:gap-[10px]'>
    <button onClick={()=>{setfilter_sidebar(true)}}  className='w-[50%] hover:border-brand_color md:w-auto text-[14px] border-[1px] border-[#eee] hover:text-brand_color transition-all duration-100 px-[17px] py-[7px] flex justify-center items-center gap-[7px] rounded-[5px]'>
          <BiFilterAlt className='text-[20px]'/> Filters
    </button>
    <div className="relative w-[50%] md:w-auto inline-block text-left ">
  <div>
    <div className="w-auto  relative inline-block text-left ">
  <div className="w-auto  relative inline-block text-left ">
      <button onClick={()=>{setfilter_sidebar2(!filter_sidebar2)}} className='w-[100%] hover:border-brand_color md:w-auto  text-[14px] border-[1px] hover:text-brand_color transition-all duration-100 border-[#eee] px-[17px] py-[7px] flex justify-center items-center gap-[7px] rounded-[5px]'>
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
            <div className="mb-[10px] relative mt-[10px]">
      <label htmlFor="origin" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      Account Holder
      </label>
      <br />
      <input
        type="text"
        placeholder=" Account Holder"
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={nameinput}
        onChange={handleOriginInputChange}
      />
      {originSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {originSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleOriginSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
            <div className="relative mt-[10px]">
      <label htmlFor="designation" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Organization Name
      </label>
      <br />
      <input
        type="text"
        placeholder="Organization Name"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={designationinput}
        onChange={handleDesignationInputChange}
      />
      {designationSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {designationSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleDesignationSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="relative mt-[10px]">
      <label htmlFor="company" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      Email
      </label>
      <br />
      <input
        type="text"
        placeholder="Email"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={companyinput}
        onChange={handleCompanyInputChange}
      />
      {companySuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {companySuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handleCompanySuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
     
              <div>

                    <div className='mb-[10px]'>
                <label htmlFor="name"className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Created Date</label><br />
   <div ref={inputRef2} className='w-full h-[45px] mt-[6px] outline-none' style={{ position: 'relative' }}>
      {/* Input field */}
      <input
        type="text"
        value={formattedDate2}
        readOnly
        onClick={togglePicker2}
        style={{ padding: '10px', height: '45px', width: '100%', cursor: 'pointer' }}
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />

      {/* Range picker with Apply button */}
      {isPickerVisible2 && (
        <div style={{ position: 'absolute', zIndex: 1000, marginTop: '5px',width:"100%"}} className='border-[1px] border-[#eee] shadow-md pb-[5px]'>
          <DateRange
            ranges={range2}
            onChange={handleSelect2}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            minDate={new Date()}
            maxDate={addDays(new Date(), 365)}
            className='w-full ' // Allow a maximum range of 1 year
          />
          {/* Small Apply Button */}
          <div style={{ textAlign: 'right',paddingRight:"20px" }}>
            <button
              onClick={handleApply2}
              style={{
                padding: '8px 15px',
                backgroundColor: '#F68A1F',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
              </div>
              <div className="mb-[10px]  relative mt-[10px]">
      <label htmlFor="name"className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Create By
      </label>
      <br />
      <input
        type="text"
        placeholder="Create By"
         className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={createbyinput}
        onChange={handlecreatebyInputChange}
      />
      {createbysuggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#eee] w-full mt-[5px] rounded-[3px] shadow-md z-10">
          {createbysuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-[10px] py-[5px] cursor-pointer hover:bg-indigo-100"
              onClick={() => handlecreatebySuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
        </div>

    {/* Publish Date Section */}
<div className="mb-[10px]">
  <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Authorize Date</label>
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
<div className="mb-[10px] mt-[10px] relative">
      <label htmlFor="publish_by"className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      Authorize By
      </label>
      <br />
      <input
        type="text"
        placeholder="Authorize By"
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

                    <div className='mt-[10px] mb-[20px]'>
                <label htmlFor="name"className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Updated Date</label><br />
   <div ref={inputRef} className='w-full h-[45px] outline-none mt-[6px]' style={{ position: 'relative' }}>
      {/* Input field */}
      <input
        type="text"
        value={formattedDate}
        readOnly
        onClick={togglePicker}
        style={{ padding: '10px', height: '45px', width: '100%', cursor: 'pointer' }}
       className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />

      {/* Range picker with Apply button */}
      {isPickerVisible && (
        <div style={{ position: 'absolute', zIndex: 1000, marginTop: '5px',width:"100%"}} className='border-[1px] border-[#eee] shadow-md pb-[5px]'>
          <DateRange
            ranges={range}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            minDate={new Date()}
            maxDate={addDays(new Date(), 365)}
            className='w-full ' // Allow a maximum range of 1 year
          />
          {/* Small Apply Button */}
          <div style={{ textAlign: 'right',paddingRight:"20px" }}>
            <button
              onClick={handleApply}
              style={{
                padding: '8px 15px',
                backgroundColor: '#F68A1F',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Apply
            </button>
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
   <div className='mb-[10px]'>
  <label htmlFor="name"className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">Status</label><br />
  <div ref={dropdownRef} className="relative w-full">
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
                {
                                      nameinput=="" &&  createbyinput=="" && designationinput && companyinput &&  publishByInput=="" &&  updateByInput=="" && selectedOption=="Select Status" ? "":            <button
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
<tbody className="bg-white  divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
{currentRows.length > 0 ? (
              currentRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns
                .filter((col) => visibleColumns.includes(col.key))
                .map((col) => (
                  <td
                    key={col.key}
                    className={`lg:px-4 py-4  border-b-[1px] border-[#eee] text-sm text-left text-nowrap px-[40px] lg:text-wrap ${
                      col.key === "message"
                        ? "font-[400] text-brand_color text-[17px] dark:text-gray-100"
                        : "text-[17px] text-gray-500 dark:text-gray-300"
                    } ${col.key === "name" ? "w-[200px] max-w-[200px] truncate" : ""}`}
                  >
                    {col.key === "profile_pic" ? (
                      <div className="flex justify-start items-center gap-[10px] w-auto ">
                        <img
                          src={row[col.key]}
                          alt="Row"
                          className="w-10 h-10 rounded-[5px] flex-shrink-0"
                        />
                        <h1 className="text-[14px] 2xl:text-[16px] text-nowrap font-[500] text-black pr-[30px]">
                          {row.accountHolder}
                        </h1>
                      </div>
                    ) : col.key === "id" ? (
                      <div>
                      <p>{rowIndex+1}</p>
                      </div>
                      ): col.key === "status" ? (
                      <div className="flex capitalize items-center">
                        {row[col.key] === "Open" && (
                          <>
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />
                            <span className="text-green-500 font-medium">open</span>
                          </>
                        )}
                        {row[col.key] === "Closed" && (
                          <>
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2" />
                            <span className="text-red-500 font-medium">closed</span>
                          </>
                        )}
                        {row[col.key] === "Waiting" && (
                          <>
                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2" />
                            <span className="text-yellow-500 font-medium">waiting</span>
                          </>
                        )}
                        {row[col.key] !== "Open" &&
                          row[col.key] !== "Closed" &&
                          row[col.key] !== "Waiting" && <span>{row[col.key]}</span>}
                      </div>
                    ) : col.key === "message" ? (
                      <div>
                        {/* Display Title */}
                       {
                        row.subject.length > 30 ?  <h1 className="text-[15px] text-nowrap 2xl:text-[16px] font-[500] text-black dark:text-gray-100">{row.subject.slice(0,30)}...</h1>: <h1 className="text-[15px] text-nowrap 2xl:text-[16px] font-[500] text-black dark:text-gray-100">{row.subject}</h1>
                       }
                        {/* Display Message */}
                        <p className="text-[13px] text-nowrap 2xl:text-[14px] text-gray-500 dark:text-gray-300 mt-1">
                        {row.message.length > 50 ? <span>{row.message.slice(0,50)}..</span>:<span>{row.message}</span>}
                        </p>
                      </div>
                    ) : col.key === "createDate" ? (
                      <div className="text-nowrap">
                                                                               <div className="text-black dark:text-gray-100 text-nowrap">
                                                                                 {format(new Date(row[col.key]), 'dd-MMMM-yyyy')}
                                                                               </div>
                                                                               <div className="text-[14px] text-gray-400 text-nowrap">
                                                                                 {format(new Date(row[col.key]), 'hh:mm a')}
                                                                               </div>
                                                                             </div>
                    )  : col.key === "authorizedDate" ? (
                      <div className="text-nowrap">
                                                                               <div className="text-black dark:text-gray-100 text-nowrap">
                                                                                 {format(new Date(row[col.key]), 'dd-MMMM-yyyy')}
                                                                               </div>
                                                                               <div className="text-[14px] text-gray-400 text-nowrap">
                                                                                 {format(new Date(row[col.key]), 'hh:mm a')}
                                                                               </div>
                                                                             </div>
                    ) : col.key === "createDate" ? (
                       <div className="text-nowrap">
                                                                                <div className="text-black dark:text-gray-100 text-nowrap">
                                                                                  {format(new Date(row[col.key]), 'dd-MMMM-yyyy')}
                                                                                </div>
                                                                                <div className="text-[14px] text-gray-400 text-nowrap">
                                                                                  {format(new Date(row[col.key]), 'hh:mm a')}
                                                                                </div>
                                                                              </div>
                    ) : col.key === "updateDate" ? (
                       <div className="text-nowrap">
                                                                                <div className="text-black dark:text-gray-100 text-nowrap">
                                                                                  {format(new Date(row[col.key]), 'dd-MMMM-yyyy')}
                                                                                </div>
                                                                                <div className="text-[14px] text-gray-400 text-nowrap">
                                                                                  {format(new Date(row[col.key]), 'hh:mm a')}
                                                                                </div>
                                                                              </div>
                    ) : col.key === "action" ? (
                             <div className="flex justify-start items-center gap-[12px] relative">
                                                   {/* View Button with Tooltip */}
                                                   <NavLink to={`/support-ticket/super-view-ticket/${row._id}`} className="w-[30px] h-[30px]  border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                                     <GoEye  />
                                                    <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">
                                     View
                                     <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-brand_color"></span>
                                   </span>
                                                   </NavLink>
                                 
                                                   {/* Edit Button with Tooltip */}
                                                   <NavLink to={`/support-ticket/super-replay-ticket/${row._id}`} className="w-[30px] h-[30px]  border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                                     <MdOutlineMail />
                                                     <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">
                                                       Replay
                                                         <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-brand_color"></span>
                                 
                                                     </span>
                                                   </NavLink>
                                 
                                                   {/* Delete Button with Tooltip */}
                                                   <div 
  className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative"
  onClick={() => {
    setTicketToDelete(row._id);
    setDeleteDialogOpen(true);
  }}
>
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

export default Ticketlist