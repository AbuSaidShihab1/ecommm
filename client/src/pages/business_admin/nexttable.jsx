import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegShareFromSquare } from "react-icons/fa6";
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
import empty_img from "../../assets/empty.png";
import { RiDeleteBin6Line } from "react-icons/ri";

function StatusSwitch({ status, onChange }) {
  const [isActive, setIsActive] = useState(status === "Active");

  const handleToggle = () => {
    const newStatus = isActive ? "Inactive" : "Active";
    setIsActive(!isActive);
    onChange(newStatus);
  };

  return (
    <div className="flex items-center space-x-3 w-[130px]">
      <label className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={isActive} onChange={handleToggle} />
        <div className={`w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-[2px] flex items-center px-1 transition-all duration-300 cursor-pointer peer-checked:bg-green-500`}>
          <div className={`w-5 h-5 bg-white rounded-[2px] shadow-md transform transition-all duration-300 ${isActive ? "translate-x-[20px]" : "translate-x-0"}`}></div>
        </div>
      </label>
      <span className={`text-sm font-medium ${isActive ? "text-green-600" : "text-gray-500"}`}>
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

const Ballpages = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [filter_sidebar, setfilter_sidebar] = useState(false);
  const [filter_sidebar2, setfilter_sidebar2] = useState(false);
  const [gridmenu, setgridmenu] = useState(false);

  // Data and Columns
  const data = [
    {
      id: 1,
      title: "About Us",
      slug: "about-us",
      createDate: "21-October-2023",
      createTime: "9:00 AM",
      author: "Zobaer Ahmmed",
      publish_date: "21-October-2023",
      publish_time: "10:30 AM",
      publish_by: "Zobaer Ahmmed",
      createby: "Zobaer Ahmmed",
      updateby: "Zobaer Ahmmed",
      updateDate: "21-October-2023",
      update_time: "08:20 PM",
      authorized: "Approved",
      visibility: "Publish",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      title: "Contact Us",
      slug: "contact-us",
      createDate: "14-January-2023",
      createTime: "9:00 AM",
      author: "Abu Said Shihab",
      publish_date: "21-October-2023",
      publish_time: "02:15 PM",
      publish_by: "Abu Said Shihab",
      createby: "Zobaer Ahmmed",
      updateby: "Zobaer Ahmmed",
      updateDate: "21-October-2023",
      update_time: "08:20 PM",
      authorized: "Pending",
      visibility: "Pending",
      status: "Inactive",
      action: "",
    },
    {
      id: 3,
      title: "Services",
      slug: "services",
      createDate: "21-October-2023",
      createTime: "9:00 AM",
      author: "Zobaer Ahmmed",
      publish_date: "21-October-2023",
      publish_time: "10:30 AM",
      publish_by: "Zobaer Ahmmed",
      createby: "Zobaer Ahmmed",
      updateby: "Zobaer Ahmmed",
      updateDate: "21-October-2023",
      update_time: "08:20 PM",
      authorized: "Rejected",
      visibility: "Publish",
      status: "Active",
      action: "",
    },
    {
      id: 4,
      title: "Privacy Policy",
      slug: "privacy-policy",
      createDate: "10-September-2023",
      createTime: "3:30 PM",
      author: "Shahida Begum",
      publish_date: "12-September-2023",
      publish_time: "1:45 PM",
      publish_by: "Shahida Begum",
      createby: "Zobaer Ahmmed",
      updateby: "Shahida Begum",
      updateDate: "14-September-2023",
      update_time: "06:00 PM",
      authorized: "Approved",
      visibility: "Publish",
      status: "Active",
      action: "",
    },
    {
      id: 5,
      title: "Terms and Conditions",
      slug: "terms-and-conditions",
      createDate: "2-July-2023",
      createTime: "11:00 AM",
      author: "Lina Mia",
      publish_date: "5-July-2023",
      publish_time: "9:00 AM",
      publish_by: "Lina Mia",
      createby: "Zobaer Ahmmed",
      updateby: "Zobaer Ahmmed",
      updateDate: "10-July-2023",
      update_time: "08:10 PM",
      authorized: "Pending",
      visibility: "Publish",
      status: "Inactive",
      action: "",
    },
    {
      id: 6,
      title: "FAQ",
      slug: "faq",
      createDate: "1-August-2023",
      createTime: "2:30 PM",
      author: "Rashidul Hasan",
      publish_date: "3-August-2023",
      publish_time: "10:00 AM",
      publish_by: "Rashidul Hasan",
      createby: "Zobaer Ahmmed",
      updateby: "Rashidul Hasan",
      updateDate: "5-August-2023",
      update_time: "07:15 PM",
      authorized: "Rejected",
      visibility: "Pending",
      status: "Active",
      action: "",
    },
    {
      id: 7,
      title: "Career Opportunities",
      slug: "career-opportunities",
      createDate: "5-June-2023",
      createTime: "8:00 AM",
      author: "Farhana Karim",
      publish_date: "7-June-2023",
      publish_time: "12:30 PM",
      publish_by: "Farhana Karim",
      createby: "Zobaer Ahmmed",
      updateby: "Farhana Karim",
      updateDate: "9-June-2023",
      update_time: "03:00 PM",
      authorized: "Approved",
      visibility: "Publish",
      status: "Inactive",
      action: "",
    },
    {
      id: 8,
      title: "Blog",
      slug: "blog",
      createDate: "18-April-2023",
      createTime: "10:00 AM",
      author: "Sabbir Ahmed",
      publish_date: "20-April-2023",
      publish_time: "1:00 PM",
      publish_by: "Sabbir Ahmed",
      createby: "Zobaer Ahmmed",
      updateby: "Sabbir Ahmed",
      updateDate: "22-April-2023",
      update_time: "09:00 AM",
      authorized: "Approved",
      visibility: "Publish",
      status: "Active",
      action: "",
    },
    {
      id: 9,
      title: "Pricing",
      slug: "pricing",
      createDate: "10-March-2023",
      createTime: "4:00 PM",
      author: "Shahinur Rahman",
      publish_date: "12-March-2023",
      publish_time: "2:30 PM",
      publish_by: "Shahinur Rahman",
      createby: "Zobaer Ahmmed",
      updateby: "Shahinur Rahman",
      updateDate: "15-March-2023",
      update_time: "06:45 PM",
      authorized: "Pending",
      visibility: "Pending",
      status: "Inactive",
      action: "",
    },
    {
      id: 10,
      title: "Testimonials",
      slug: "testimonials",
      createDate: "25-January-2023",
      createTime: "1:30 PM",
      author: "Samiha Akter",
      publish_date: "27-January-2023",
      publish_time: "11:00 AM",
      publish_by: "Samiha Akter",
      createby: "Zobaer Ahmmed",
      updateby: "Samiha Akter",
      updateDate: "29-January-2023",
      update_time: "10:15 AM",
      authorized: "Rejected",
      visibility: "Publish",
      status: "Active",
      action: "",
    },
    {
      id: 11,
      title: "Portfolio",
      slug: "portfolio",
      createDate: "2-February-2023",
      createTime: "10:15 AM",
      author: "Rifat Rahman",
      publish_date: "5-February-2023",
      publish_time: "9:45 AM",
      publish_by: "Rifat Rahman",
      createby: "Zobaer Ahmmed",
      updateby: "Rifat Rahman",
      updateDate: "7-February-2023",
      update_time: "04:30 PM",
      authorized: "Approved",
      visibility: "Pending",
      status: "Inactive",
      action: "",
    },
    {
      id: 12,
      title: "Events",
      slug: "events",
      createDate: "14-January-2023",
      createTime: "12:00 PM",
      author: "Shabnam Sultana",
      publish_date: "16-January-2023",
      publish_time: "4:00 PM",
      publish_by: "Shabnam Sultana",
      createby: "Zobaer Ahmmed",
      updateby: "Shabnam Sultana",
      updateDate: "18-January-2023",
      update_time: "05:30 PM",
      authorized: "Pending",
      visibility: "Publish",
      status: "Active",
      action: "",
    },
    {
      id: 13,
      title: "Newsletter",
      slug: "newsletter",
      createDate: "22-December-2022",
      createTime: "8:15 AM",
      author: "Tariqul Islam",
      publish_date: "24-December-2022",
      publish_time: "3:00 PM",
      publish_by: "Tariqul Islam",
      createby: "Zobaer Ahmmed",
      updateby: "Tariqul Islam",
      updateDate: "26-December-2022",
      update_time: "11:00 AM",
      authorized: "Approved",
      visibility: "Pending",
      status: "Inactive",
      action: "",
    },
    {
      id: 14,
      title: "E-commerce",
      slug: "e-commerce",
      createDate: "30-November-2022",
      createTime: "10:30 AM",
      author: "Rashedul Hasan",
      publish_date: "2-December-2022",
      publish_time: "10:00 AM",
      publish_by: "Rashedul Hasan",
      createby: "Zobaer Ahmmed",
      updateby: "Rashedul Hasan",
      updateDate: "5-December-2022",
      update_time: "01:00 PM",
      authorized: "Rejected",
      visibility: "Pending",
      status: "Active",
      action: "",
    },
    {
      id: 15,
      title: "Contact Form",
      slug: "contact-form",
      createDate: "19-November-2022",
      createTime: "2:00 PM",
      author: "Kamrul Islam",
      publish_date: "21-November-2022",
      publish_time: "9:30 AM",
      publish_by: "Kamrul Islam",
      createby: "Zobaer Ahmmed",
      updateby: "Kamrul Islam",
      updateDate: "23-November-2022",
      update_time: "12:30 PM",
      authorized: "Approved",
      visibility: "Publish",
      status: "Active",
      action: "",
    },
    {
      id: 16,
      title: "Community",
      slug: "community",
      createDate: "5-October-2022",
      createTime: "11:00 AM",
      author: "Jahidul Alam",
      publish_date: "8-October-2022",
      publish_time: "2:00 PM",
      publish_by: "Jahidul Alam",
      createby: "Zobaer Ahmmed",
      updateby: "Jahidul Alam",
      updateDate: "10-October-2022",
      update_time: "09:00 AM",
      authorized: "Pending",
      visibility: "Publish",
      status: "Inactive",
      action: "",
    },
    {
      id: 17,
      title: "Press Release",
      slug: "press-release",
      createDate: "12-September-2022",
      createTime: "3:30 PM",
      author: "Fariha Nahar",
      publish_date: "14-September-2022",
      publish_time: "1:00 PM",
      publish_by: "Fariha Nahar",
      createby: "Zobaer Ahmmed",
      updateby: "Fariha Nahar",
      updateDate: "16-September-2022",
      update_time: "11:30 AM",
      authorized: "Approved",
      visibility: "Pending",
      status: "Active",
      action: "",
    },
    {
      id: 18,
      title: "Sitemap",
      slug: "sitemap",
      createDate: "25-August-2022",
      createTime: "9:30 AM",
      author: "Mahbubur Rahman",
      publish_date: "27-August-2022",
      publish_time: "2:30 PM",
      publish_by: "Mahbubur Rahman",
      createby: "Zobaer Ahmmed",
      updateby: "Mahbubur Rahman",
      updateDate: "29-August-2022",
      update_time: "04:00 PM",
      authorized: "Pending",
      visibility: "Publish",
      status: "Inactive",
      action: "",
    },
    {
      id: 19,
      title: "Feedback",
      slug: "feedback",
      createDate: "14-July-2022",
      createTime: "10:30 AM",
      author: "Mohammad Hossain",
      publish_date: "16-July-2022",
      publish_time: "1:30 PM",
      publish_by: "Mohammad Hossain",
      createby: "Zobaer Ahmmed",
      updateby: "Mohammad Hossain",
      updateDate: "18-July-2022",
      update_time: "10:00 AM",
      authorized: "Approved",
      visibility: "Pending",
      status: "Active",
      action: "",
    },
    {
      id: 20,
      title: "Help Center",
      slug: "help-center",
      createDate: "2-June-2022",
      createTime: "9:00 AM",
      author: "Ahmed Ali",
      publish_date: "4-June-2022",
      publish_time: "3:00 PM",
      publish_by: "Ahmed Ali",
      createby: "Zobaer Ahmmed",
      updateby: "Ahmed Ali",
      updateDate: "6-June-2022",
      update_time: "02:30 PM",
      authorized: "Pending",
      visibility: "Publish",
      status: "Inactive",
      action: "",
    },
  ];

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "createDate", label: "Create Date" },
    { key: "author", label: "Create By" },
    { key: "publish_date", label: "Publish Date" },
    { key: "publish_by", label: "Publish By" },
    { key: "updateDate", label: "Update Date" },
    { key: "updateby", label: "Update By" },
    { key: "authorized", label: "Authorized" },
    { key: "visibility", label: "Visibility" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(columns.map((col) => col.key));
  const minVisibleColumns = 4;

  const handleColumnToggle = (key) => {
    if (key === "action") return;
    setVisibleColumns((prev) => {
      if (prev.includes(key)) {
        if (prev.length > minVisibleColumns) {
          return prev.filter((colKey) => colKey !== key);
        }
      } else {
        return [...prev, key];
      }
      return prev;
    });
  };

  // Filtering States
  const [searchTerm, setSearchTerm] = useState("");
  const [createByInput, setCreateByInput] = useState("");
  const [publishByInput, setPublishByInput] = useState("");
  const [updateByInput, setUpdateByInput] = useState("");
  const [authorized, setAuthorized] = useState("");
  const [visibility, setVisibility] = useState("");
  const [status, setStatus] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Apply Filters
  const applyFilters = () => {
    const filtered = data.filter((item) => {
      const matchesCreateBy = createByInput ? item.createby.toLowerCase().includes(createByInput.toLowerCase()) : true;
      const matchesPublishBy = publishByInput ? item.publish_by.toLowerCase().includes(publishByInput.toLowerCase()) : true;
      const matchesUpdateBy = updateByInput ? item.updateby.toLowerCase().includes(updateByInput.toLowerCase()) : true;
      const matchesAuthorized = authorized ? item.authorized === authorized : true;
      const matchesVisibility = visibility ? item.visibility === visibility : true;
      const matchesStatus = status ? item.status === status : true;
      const matchesSearchTerm = searchTerm ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase()) : true;

      return (
        matchesCreateBy &&
        matchesPublishBy &&
        matchesUpdateBy &&
        matchesAuthorized &&
        matchesVisibility &&
        matchesStatus &&
        matchesSearchTerm
      );
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, createByInput, publishByInput, updateByInput, authorized, visibility, status]);

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

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[20px] lg:px-[30px]'>
          <div className='w-full flex md:justify-between items-center md:flex-row flex-col justify-start'>
            <div className='w-full md:w-auto'>
              <h1 className='text-[20px] font-[600] mb-[8px]'>Page List</h1>
              <ul className='w-full md:w-auto flex lg:justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Pages</li>
                <li><IoIosArrowForward /></li>
                <li>Page List</li>
              </ul>
            </div>
            <div className='w-full md:w-auto flex gap-[10px] md:m-0 mt-[15px]'>
              <button className='w-[50%] md:w-auto px-[15px] py-[6px] text-black text-[14px] gap-[8px] border-[1px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'>
                <BiExport className='text-[20px]' />
                Export
              </button>
              <NavLink to="/pages/new-page" className="w-[50%] md:w-auto">
                <button className='px-[12px] w-[100%] md:w-auto py-[6px] font-[500] border-[2px] border-brand_color text-white rounded-[5px] text-[14px] bg-brand_color flex justify-center items-center gap-[10px]'>
                  <LuPlus className='text-[22px]' />
                  Add New
                </button>
              </NavLink>
            </div>
          </div>
          <section className='mt-[2px] lg:mt-[20px]'>
            <div className="relative sm:rounded-lg">
              <div className="flex items-center justify-between mb-[20px] flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <div className='w-full flex justify-between items-center mb-[14px] md:flex-row flex-col'>
                  <div className="relative w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="table-search-users"
                      className="block h-[39px] ps-10 w-full text-sm text-gray-900 border border-gray-300 rounded-lg lg:w-80 outline-brand_color bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search for page"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm.length > 1 && (
                      <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={() => setSearchTerm("")}>
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className='w-full md:w-auto flex justify-center items-center gap-[10px]'>
                    <button onClick={() => setfilter_sidebar(true)} className='w-[50%] md:w-auto hover:border-brand_color text-[14px] border-[1px] border-[#eee] hover:text-brand_color transition-all duration-100 px-[17px] py-[7px] flex justify-center items-center gap-[7px] rounded-[5px]'>
                      <BiFilterAlt className='text-[20px]' />
                      <span>Filters</span>
                    </button>
                    <div className="relative w-[50%] md:w-auto inline-block text-left">
                      <div className="w-[100%] md:w-auto relative inline-block text-left">
                        <button onClick={() => setfilter_sidebar2(!filter_sidebar2)} className='w-[100%] hover:border-brand_color md:w-auto text-[14px] border-[1px] hover:text-brand_color transition-all duration-100 border-[#eee] px-[17px] py-[7px] flex justify-center items-center gap-[7px] rounded-[5px]'>
                          <BsGrid className='text-[20px]' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='w-full overflow-x-auto border-[1px] border-[#eee] bg-red-50 mt-[20px] custom-scrollbar'>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-table_header dark:bg-gray-800">
                <tr>
                  {columns.filter((col) => visibleColumns.includes(col.key)).map((col) => (
                    <th key={col.key} className="px-4 py-2 text-left text-nowrap uppercase text-sm font-medium text-table_title dark:text-gray-300">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y font-poppins divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {currentRows.length > 0 ? (
                  currentRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.filter((col) => visibleColumns.includes(col.key)).map((col) => (
                        <td key={col.key} className="lg:px-4 py-4 text-sm px-[40px] lg:text-wrap text-[17px] text-gray-500 dark:text-gray-300 text-nowrap">
                          {col.key === "author" ? (
                            <div className="flex justify-start items-center gap-[15px]">
                              <p className="text-[15px]">{row.author}</p>
                            </div>
                          ) : col.key === "title" ? (
                            <div>
                              {row.title.length > 40 ? (
                                <h1 className="text-nowrap text-[12px] lg:text-[16px] text-black font-[500]">
                                  {row.title.slice(0, 40)}...
                                </h1>
                              ) : (
                                <h1 className="text-nowrap text-[12px] lg:text-[16px] text-black font-[500]">
                                  {row.title}
                                </h1>
                              )}
                            </div>
                          ) : col.key === "createDate" ? (
                            <div>
                              <div className="text-black dark:text-gray-100">
                                {row[col.key]}
                              </div>
                              <div className="text-[14px] text-gray-400">
                                {row.createTime}
                              </div>
                            </div>
                          ) : col.key === "publish_date" ? (
                            <div>
                              <div className="text-black dark:text-gray-100">
                                {row[col.key]}
                              </div>
                              <div className="text-[14px] text-gray-400">
                                {row.publish_time}
                              </div>
                            </div>
                          ) : col.key === "updateDate" ? (
                            <div>
                              <div className="text-black dark:text-gray-100">
                                {row[col.key]}
                              </div>
                              <div className="text-[14px] text-gray-400">
                                {row.update_time}
                              </div>
                            </div>
                          ) : col.key === "authorized" ? (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                row[col.key] === "Approved"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                  : row[col.key] === "Pending"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                              }`}
                            >
                              {row[col.key]}
                            </span>
                          ) : col.key === "status" ? (
                            <StatusSwitch
                              status={row.status}
                              onChange={(newStatus) => handleStatusChange(rowIndex, newStatus)}
                            />
                          ) : col.key === "visibility" ? (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                row[col.key] === "Publish"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                  : row[col.key] === "Pending"
                                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                              }`}
                            >
                              {row[col.key]}
                            </span>
                          ) : col.key === "action" ? (
                            <div className="flex justify-start items-center gap-[12px] relative">
                              <div className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                <GoEye />
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
              )  : (
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
{/* Pagination and Rows per Page */}
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
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Ballpages