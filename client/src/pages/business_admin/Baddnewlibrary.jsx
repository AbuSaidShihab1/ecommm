import React, { useContext, useEffect, useState,useRef,useCallback} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import JoditEditor from 'jodit-react';
import { MdClose } from "react-icons/md";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";
import {FaTimes } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { MdOutlineCloudDownload } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import empty_img from "../../assets/empty.png"
import { MdOutlineContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { BsList, BsGrid3X3 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaFolderOpen, FaUpload } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import documentation_img from "../../assets/documentation.png";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
const Baddnewlibrary = () => {
   const navigate=useNavigate();
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
// ///////////////////////upload library-----------------------
const [mediaItems, setMediaItems] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [filterType, setFilterType] = useState("all");
const [showUploadBox, setShowUploadBox] = useState(false);
const [selectedMedia, setSelectedMedia] = useState(null); // For popup details
const [metadata, setMetadata] = useState({}); // For SEO metadata

const handleFileUpload = (e) => {
  const files = Array.from(e.target.files);
  const newMedia = files.map((file, index) => ({
    id: mediaItems.length + index + 1,
    src: URL.createObjectURL(file),
    alt: file.name,
    name: file.name,
    size: (file.size / 1024).toFixed(2) + " KB", // File size in KB
    type: file.type.startsWith("image")
      ? "image"
      : file.type.startsWith("video")
      ? "video"
      : "audio",
    uploadedDate: new Date().toLocaleString(),
  }));

  setMediaItems([...mediaItems, ...newMedia]);
};
const [isGridView, setIsGridView] = useState(true); // Default to grid view
const filteredMedia = mediaItems.filter((item) => {
  return (
    (filterType === "all" || item.type === filterType) &&
    item.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );
});

const handleMetadataChange = (field, value) => {
  setMetadata({ ...metadata, [field]: value });
};
const truncateText = (text, maxLength = 25) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
const handlePrevious = () => {
  const currentIndex = mediaItems.findIndex(media => media.src === selectedMedia?.src);
  if (currentIndex > 0) {
    setSelectedMedia(mediaItems[currentIndex - 1]);
  }
};

const columns = [
  { key: "id", label: "ID" },
  { key: "image", label: "Image" },
  { key: "size", label: "Size" },
  { key: "type", label: "Type" },
  { key: "createDate", label: "Create Date" },
  { key: "author", label: "Author" },
  { key: "authorizeDate", label: "Authorize Date" },
  { key: "authorizeBy", label: "Authorize By" },
  { key: "updateDate", label: "Update Date" },
  { key: "updateBy", label: "Update By" },
  { key: "authorized", label: "Authorized" },
  { key: "action", label: "Action" },
];
const handleNext = () => {
  const currentIndex = mediaItems.findIndex(media => media.src === selectedMedia?.src);
  if (currentIndex < mediaItems.length - 1) {
    setSelectedMedia(mediaItems[currentIndex + 1]);
  }
};
// ---------------selected-image-----------------------
const [selectedImage, setSelectedImage] = useState(null);

const handleViewImage = (imageSrc) => {
  setSelectedImage(imageSrc);
};

const handleCloseModal = () => {
  setSelectedImage(null);
};
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
       {/* <div className='w-full flex justify-between items-center'>
        <div>
              <h1 className='text-[20px] lg:text-[22px] font-[600] mb-[8px]'>New Library</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
             <li>Upload Library</li>
            <li><IoIosArrowForward/></li>
            <li>New Library</li>
          </ul>
        </div>
        <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
            <BiImport className='text-[25px]'/>
            Import
        </button>
       </div> */}
       {/* ------------------new customer table----------------- */}
       <div className="">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className='w-full md:w-auto'>
              <h1 className='text-[20px] font-[600] mb-[8px]'>New Library</h1>
          <ul className='w-full   md:w-auto flex lg:justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Upload Library</li>
            <li><IoIosArrowForward/></li>
            <li>New Library</li>
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-4">
  
          {/* Filter Dropdown */}
          {/* <select
            className="border border-gray-300 px-4 py-2 outline-brand_color rounded-md shadow-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
          </select> */}
          {/* Add New Media File Button */}
          <button
            className="px-4 py-2 bg-brand_color text-white rounded-[5px] hover:bg-orange-600"
            onClick={() => setShowUploadBox(!showUploadBox)}
          >
           + Add New
          </button>
        </div>
      </div>

      {/* Upload Box */}
      {showUploadBox && (
        <div className="relative flex flex-col items-center justify-center border border-dashed border-gray-400 p-6 py-[60px] rounded-md mb-4 bg-gray-50">
      {/* Close Icon */}
      <button
        className="absolute top-1 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => setShowUploadBox(false)}
      >
        &#x2715;
      </button>

      {/* Folder Icon */}
      <div className="mb-[20px] relative flex items-center border-[2px] border-gray-200 rounded-[10px]  border-dashed  p-[5px] xl:p-[10px] 2xl:p-[15px] justify-center">
  {/* Dashed Border */}

  {/* Image */}
  <img className="w-[50px] 2xl:w-[100px] h-full rounded-[20px] " src={documentation_img} alt="" />
</div>


      {/* Hidden File Input */}
      <input
        type="file"
        multiple
        accept="image/*,video/*,audio/*"
        className="hidden"
        id="fileUpload"
        onChange={handleFileUpload}
      />

      {/* File Upload Button */}
      <label
        htmlFor="fileUpload"
        className="flex items-center gap-2 text-white bg-brand_color px-5 py-2 rounded-md cursor-pointer hover:bg-orange-500"
      >
        <FaUpload />
        SELECT FILES
      </label>

      {/* File Size Note */}
      <p className="text-center text-sm text-gray-500 mt-[12px]">
        Maximum upload file size: 40 MB.
      </p>
    </div>
      )}
        {/* ----------------filter-box------------------------ */}
        <div className="w-full flex justify-between items-center pb-[20px]">
          {/* Left Side - List/Grid View Toggle */}
        
      
          {/* Search Bar */}
          <div className="w-[50%] xl:w-[30%] 2xl:w-[25%] relative">
      {/* Search Icon */}
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for library"
        className="border border-gray-300 w-full font-[400] pl-10 pr-10 py-2 outline-brand_color rounded-md shadow-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Clear Icon (Only shows when searchTerm.length > 1) */}
      {searchTerm.length > 1 && (
          <div
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          onClick={() => setSearchTerm("")}
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
         {/* View Toggle Buttons */}
         <div className="flex gap-2">
                  <button
                    className={`border p-2 rounded-md ${isGridView ? "bg-gray-200" : "hover:bg-gray-100"}`}
                    onClick={() => setIsGridView(true)}
                  >
                    <BsGrid3X3 className="text-xl text-gray-600" />
                  </button>
                  <button
                    className={`border p-2 rounded-md ${!isGridView ? "bg-gray-200" : "hover:bg-gray-100"}`}
                    onClick={() => setIsGridView(false)}
                  >
                    <BsList className="text-xl text-gray-600" />
                  </button>
                </div>
        
                     </div>
        {
          mediaItems.length > 0 ? <>  
        
              {/* Media Grid */}
         {/* Media Display */}
          {/* Media Display */}
              {/* Media Display */}
              {isGridView ? (
                // Grid View
                <div className="grid grid-cols-2 md:grid-cols-7 gap-2 lg:gap-4">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      className={`relative border rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 ${
                        selectedMedia && selectedMedia.id === item.id ? "ring-4 ring-indigo-400" : ""
                      }`}
                      onClick={() => {
                        setSelectedMedia(item);
                        setMetadata({
                          alt: item.alt,
                          title: "",
                          caption: "",
                          description: "",
                          url: item.src,
                        });
                      }}
                    >
                      {/* Image Display */}
                      {item.type === "image" && (
                        <div className="relative">
                          <img src={item.src} alt={item.alt} className="w-full h-32 object-cover" />
                          <span className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                            {item.size}
                          </span>
                        </div>
                      )}
                      {/* Video Display */}
                      {item.type === "video" && (
                        <video controls className="w-full h-32 object-cover" src={item.src} />
                      )}
                      {/* Audio Display */}
                      {item.type === "audio" && (
                        <audio controls className="w-full p-2">
                          <source src={item.src} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // List View (Table Layout)
                <div className='w-full overflow-x-auto border-[1px] border-[#eee] bg-red-50  custom-scrollbar'>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                       <thead className="bg-table_header dark:bg-gray-800">
                            <tr>
                              {columns
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
                  {filteredMedia.length > 0 ? (
                                filteredMedia.map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                  {columns.map((col) => (
                                    <td
                                      key={col.key}
                                      className="px-4 py-4 text-nowrap text-sm text-gray-700 dark:text-gray-300"
                                    >
                                      {col.key === "image" ? (
  <div className="flex justify-start items-center gap-[15px] pr-[40px]">
    <img
      src={row.src } // Placeholder image
      alt="Row"
      className="w-12 h-12 rounded-[5px]"
    />
    <div>
      <h1 className="text-[12px] lg:text-[16px] font-[500] text-black text-nowrap">
        {row.title?.length > 20 ? row.title.slice(0, 20) + ".." : row.title || "Default Title"}
      </h1>
      <p className="text-[8px] lg:text-[13px] mt-[4px] font-[500] text-orange-600">
        {row.size || "Default Size"}
      </p>
    </div>
  </div>
) : col.key === "authorized" ? (
                                        <span
                                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            row[col.key] === "Approved"
                                              ? "bg-green-100 text-green-500"
                                              : row[col.key] === "Pending"
                                              ? "bg-orange-100 text-orange-500"
                                              : "bg-red-100 text-red-500"
                                          }`}
                                        >
                                          {row[col.key] || "Pending"}
                                        </span>
                                      ) : col.key === "createDate" ? (
                                        <div>
                                          <div className="text-black dark:text-gray-100">{row[col.key] || "N/A"}</div>
                                          <div className="text-[14px] text-gray-400">{row.create_time || "N/A"}</div>
                                        </div>
                                      ) : col.key === "authorizeDate" ? (
                                        <div>
                                          <div className="text-black dark:text-gray-100">{row[col.key] || "N/A"}</div>
                                          <div className="text-[14px] text-gray-400">{row.authorizedtime || "N/A"}</div>
                                        </div>
                                      ) : col.key === "updateDate" ? (
                                        <div>
                                          <div className="text-black dark:text-gray-100">{row[col.key] || "N/A"}</div>
                                          <div className="text-[14px] text-gray-400">{row.updatetime || "N/A"}</div>
                                        </div>
                                      ) : col.key === "action" ? (
                                        <div className="flex justify-start items-center gap-[12px] relative">
                                          <div   onClick={() =>handleViewImage(row.src)} className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                            <GoEye />
                                            <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">View</span>
                                          </div>
                                          <div onClick={()=>setSelectedMedia(row)} className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                            <CiEdit />
                                            <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">Edit</span>
                                          </div>
                                          <div className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                            <MdDeleteOutline />
                                            <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">Delete</span>
                                          </div>
                                          <div className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                            <MdOutlineContentCopy />
                                            <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">Copy</span>
                                          </div>
                                          <div className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                            <MdOutlineCloudDownload />
                                            <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">Download</span>
                                          </div>
</div>
                                      ) : (
                                        row[col.key] || "N/A"
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
      
                </div>
              )}</> :    <div className='flex justify-center items-center flex-col gap-[10px] w-[100%]'>
          <img className='w-[200px]' src={empty_img} alt="" />
          <p className="col-span-4 text-center text-gray-500">No media found</p>
        </div>
        }
   {selectedImage && (
  <div className="fixed inset-0 bg-black bg-opacity-50 p-[20px] flex justify-center items-center z-[10000000000]">
    <div className="relative bg-white dark:bg-gray-900 p-1 rounded-lg shadow-lg max-w-lg">
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 text-red-600 "
      >
        <MdClose className="w-6 h-6" />
      </button>
      <img src={selectedImage} alt="Preview" className="w-full h-auto rounded-lg" />
    </div>
  </div>
)}
      {/* Popup for Media Details */}
      {selectedMedia && (
<div className="fixed inset-0 bg-black bg-opacity-50 w-full p-4 overflow-y-auto z-[10000000000] flex justify-center items-center text-sm">
  <div className="bg-white w-full h-full max-h-screen lg:max-h-[90vh] overflow-y-auto relative border border-gray-300 flex flex-col">
    {/* Header */}
    <div className="w-full bg-gray-100 border-b border-gray-300 flex justify-between items-center">
      <h1 className=" ext-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600 px-[20px]">Media Library Details</h1>
      <div className="flex items-center ">
        <button className="text-gray-500 hover:text-gray-800 py-3 text-base px-[15px] hover:bg-gray-200 transition-all duration-100 border-l-[1px] border-gray-300" onClick={handlePrevious}>
          <MdOutlineArrowBackIosNew className='text-[20px] 2xl:text-[25px]'/>
        </button>
        <button className="text-gray-500 hover:text-gray-800 py-3  text-base px-[15px] hover:bg-gray-200 border-l-[1px]  transition-all duration-100  border-gray-300" onClick={handleNext}>
         <MdOutlineArrowForwardIos className='text-[20px] 2xl:text-[25px]'/>
        </button>
        <button className="text-gray-500 hover:text-gray-800   border-l-[1px] text-base py-3  px-[15px] border-gray-300" onClick={() => setSelectedMedia(null)}>
          <AiOutlineClose className='text-[20px] 2xl:text-[25px]'/>
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col  lg:flex-row flex-grow overflow-auto">
      {/* Left Side: Image Preview */}
      <div className="flex-shrink-0 w-full lg:w-1/2 p-4 flex justify-center items-center">
        <img src={selectedMedia.src} alt={metadata.alt} className="w-[40%] xl:w-full max-w-xs h-[100%] xl:h-auto xl:object-cover rounded-lg" />
      </div>

      {/* Right Side: Media Details */}
      <div className="flex-grow bg-gray-50 p-4 overflow-y-auto border-l-[1px] border-[#eee]">
       <div className='pb-[10px] border-b-[1px] border-gray-200'>
       <h2 className="text-sm font-medium mb-2">Media Details</h2>

        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">File size:</span> 20 KB</p>
        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">File type:</span> image/jpeg</p>
        
        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">Dimensions:</span> 650px X 650px        </p>
        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">Uploaded By:</span> Zobaer Ahammed</p>
        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">Uploaded Date:</span> 1 20-01-2025 at 11:54:22 PM</p>
        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">File Name:</span> Acwell-Licorice-pH-Balancing-Cleansing-Toner.jpg
        </p>
       </div>
        {/* Metadata Fields */}
        <div className='pt-[10px]'>
          {['Title', 'Caption', 'Description',"ALT Text"].map((label) => (
            <div className="mb-2" key={label}>
              <label className="block text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">{label}</label>
              {label === 'Description' ? (
                <textarea
                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] border-[1px] border-[#eee] p-[12px]"
                  value={metadata[label.toLowerCase()]}
                  onChange={(e) => handleMetadataChange(label.toLowerCase(), e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  value={metadata[label.toLowerCase()]}
                  onChange={(e) => handleMetadataChange(label.toLowerCase(), e.target.value)}
                />
              )}
            </div>
          ))}
          
          <div className="mb-2">
            <label className="block text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">File URL</label>
        <div className='relative  mt-[3px] 2xl:mt-[7px]'>
        <input type="text" readOnly className="w-full rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" value={metadata.url} />


        <div className="w-[40px] absolute top-0 h-input_height 2xl:h-[45px]  right-0  border border-gray-300  hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group ">
                                                <MdOutlineContentCopy />
                                                <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">
                                                  Copy
                                                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-brand_color"></span>
                                                </span>
                                              </div>
        </div>
        
          </div>
                

          <div className="mt-3 text-xs text-blue-500 flex flex-wrap gap-2 border-t-[1px] border-gray-200 pt-[10px]">
            <a href="#" className="hover:underline">Download</a> |
            <a href="#" className="hover:underline text-red-500">Delete permanently</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      )}
    </div>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Baddnewlibrary