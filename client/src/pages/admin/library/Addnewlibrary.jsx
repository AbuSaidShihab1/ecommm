import React, { useContext, useEffect, useState, useRef, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import JoditEditor from 'jodit-react';
import { MdClose } from "react-icons/md";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";
import { motion } from "framer-motion";
import toast,{Toaster} from "react-hot-toast"
import { CgClose } from "react-icons/cg";

import { FaTimes } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { MdOutlineCloudDownload } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import empty_img from "../../../assets/empty.png"
import { MdOutlineContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { BsList, BsGrid3X3 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaFolderOpen, FaUpload } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import documentation_img from "../../../assets/documentation.png";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Addnewlibrary = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [showmodal, setmodal] = useState(false);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const uploadpost = () => {
    setmodal(true)
  }
  function handlesidebar() {
    setactivesidebar(!activesidebar)
  }
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true)
      } else {
        setactivetopbar(false)
      }
    })
  }, []);

  // Upload library
  const [mediaItems, setMediaItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"))

  // Format date to display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-library-images/${admin_info._id}`);
        if (fetchResponse.data && fetchResponse.data.images) {
          setMediaItems(fetchResponse.data.images);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        showToast('Failed to fetch images', 'error');
      }
    };
    fetchImages();
  }, []);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const admin = JSON.parse(localStorage.getItem("admin_ecommerce"))
    const userId = admin._id;
    const author = admin.email;

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", userId);
      formData.append("author", author);
      formData.append("title", file.name);
      formData.append("authorized", "Approved");

      try {
        const response = await axios.post(
          `${base_url}/api/upload/image/admin-upload-image/${admin._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.image) {
          setMediaItems(prev => [response.data.image, ...prev]);
          showToast('File uploaded successfully');
        }
      } catch (error) {
        console.error("Upload failed:", error);
        showToast('Upload failed', 'error');
      }
    }
    setShowUploadBox(false);
  };

  const [isGridView, setIsGridView] = useState(true);

  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch = item.file_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.type?.startsWith(filterType);
    return matchesSearch && matchesType;
  });

  const handleMetadataChange = (field, value) => {
    setMetadata({ ...metadata, [field]: value });
  };

  const truncateText = (text, maxLength = 25) => {
    return text && text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handlePrevious = () => {
    const currentIndex = mediaItems.findIndex(media => media._id === selectedMedia?._id);
    if (currentIndex > 0) {
      setSelectedMedia(mediaItems[currentIndex - 1]);
      setMetadata({
        title: mediaItems[currentIndex - 1].title || "",
        caption: mediaItems[currentIndex - 1].caption || "",
        description: mediaItems[currentIndex - 1].description || "",
        alt: mediaItems[currentIndex - 1].alt_text || "",
        url: `${base_url}/uploads/${admin_info._id}/${mediaItems[currentIndex - 1].file_name}`,
      });
    }
  };

  const columns = [
    { key: "_id", label: "ID" },
    { key: "image", label: "Image" },
    { key: "size", label: "Size" },
    { key: "type", label: "Type" },
    { key: "createDate", label: "Create Date" },
    { key: "author", label: "Author" },
    { key: "authorizedDate", label: "Authorize Date" },
    { key: "authorizedBy", label: "Authorize By" },
    { key: "updateDate", label: "Update Date" },
    { key: "updateBy", label: "Update By" },
    { key: "authorized", label: "Authorized" },
    { key: "action", label: "Action" },
  ];

  const handleNext = () => {
    const currentIndex = mediaItems.findIndex(media => media._id === selectedMedia?._id);
    if (currentIndex < mediaItems.length - 1) {
      setSelectedMedia(mediaItems[currentIndex + 1]);
      setMetadata({
        title: mediaItems[currentIndex + 1].title || "",
        caption: mediaItems[currentIndex + 1].caption || "",
        description: mediaItems[currentIndex + 1].description || "",
        alt: mediaItems[currentIndex + 1].alt_text || "",
        url: `${base_url}/uploads/${admin_info._id}/${mediaItems[currentIndex + 1].file_name}`,
      });
    }
  };

  // Selected image
  const [selectedImage, setSelectedImage] = useState(null);

  const handleViewImage = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Delete media item
  const handleDeleteMedia = async (id) => {
    try {
      await axios.delete(`${base_url}/api/upload/image/admin-library-image/${id}`);
      setMediaItems(prev => prev.filter(item => item._id !== id));
      if (selectedMedia && selectedMedia._id === id) {
        setSelectedMedia(null);
      }
      showToast('Media deleted successfully');
    } catch (error) {
      console.error("Error deleting media:", error);
      showToast('Failed to delete media', 'error');
    }
  };

  // Update media metadata
  const handleUpdateMedia = async () => {
    if (!selectedMedia) return;
    
    setIsUpdating(true);
    try {
      const updateData = {
        title: metadata.title || "",
        description: metadata.description || "",
        alt_text: metadata.alt || "",
        caption: metadata.caption || "",
        authorized: selectedMedia.authorized || "Approved"
      };

      const response = await axios.put(
        `${base_url}/api/upload/image/update-image/${selectedMedia._id}`,
        updateData
      );

      if (response.data && response.data.image) {
        setMediaItems(prev => 
          prev.map(item => 
            item._id === selectedMedia._id ? response.data.image : item
          )
        );
        setSelectedMedia(response.data.image);
        showToast('Media updated successfully');
      }
    } catch (error) {
      console.error("Error updating media:", error);
      showToast('Failed to update media', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  // Copy URL to clipboard
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(metadata.url || `${base_url}/uploads/${admin_info._id}/${selectedMedia?.file_name}`);
    showToast('URL copied to clipboard');
  };

  // Download image
  const handleDownload = async () => {
    if (!selectedMedia) return;
    
    try {
      const response = await fetch(`${base_url}/uploads/${admin_info._id}/${selectedMedia.file_name}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedMedia.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      showToast('Download started');
    } catch (error) {
      console.error("Download failed:", error);
      showToast('Download failed', 'error');
    }
  };
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [ticketToDelete, setTicketToDelete] = useState(null);
const handleDeleteTicket = async () => {
  const toastId = toast.loading('Deleting ticket...');
  
  try {
    const response = await fetch(`${base_url}/customer/delete-image/${ticketToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });

    const data = await response.json();

    if (data.success) {
      // Update state to remove the deleted ticket
      toast.success('Image deleted successfully!', {
        id: toastId,
        duration: 4000,
      });
    } else {
      toast.error(data.message || 'Failed to delete Image', {
        id: toastId,
        duration: 4000,
      });
    }
  } catch (error) {
    console.error('Error deleting Image:', error);
    toast.error('Error deleting Image. Please try again.', {
      id: toastId,
      duration: 4000,
    });
  } finally {
    setDeleteDialogOpen(false);
    setTicketToDelete(null);
  }
};

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <Toaster/>
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className={`fixed top-6 right-6 z-[1000000] flex items-center gap-4 px-6 py-4 rounded-lg shadow-lg text-white font-medium transition-all duration-300 animate-fade-in
            ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage('')} 
            className="text-white text-xl leading-none hover:text-gray-200 transition"
          >
            &times;
          </button>
        </div>
      )}
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

      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className="">
            {/* Header and Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className='w-full md:w-auto'>
                <h1 className='text-[20px] font-[600] mb-[8px]'>New Library</h1>
                <ul className='w-full   md:w-auto flex lg:justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                  <li>Dashboard</li>
                  <li><IoIosArrowForward /></li>
                  <li>Upload Library</li>
                  <li><IoIosArrowForward /></li>
                  <li>New Library</li>
                </ul>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {/* Filter Dropdown */}
                <select
                  className="border border-gray-300 px-4 py-2 outline-brand_color rounded-md shadow-sm"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="audio">Audio</option>
                </select>
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
                <button
                  className="absolute top-1 right-2 text-gray-500 hover:text-gray-800"
                  onClick={() => setShowUploadBox(false)}
                >
                  &#x2715;
                </button>

                <div className="mb-[20px] relative flex items-center border-[2px] border-gray-200 rounded-[10px]  border-dashed  p-[5px] xl:p-[10px] 2xl:p-[15px] justify-center">
                  <img className="w-[50px] 2xl:w-[100px] h-full rounded-[20px] " src={documentation_img} alt="" />
                </div>

                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*"
                  className="hidden"
                  id="fileUpload"
                  onChange={handleFileUpload}
                />

                <label
                  htmlFor="fileUpload"
                  className="flex items-center gap-2 text-white bg-brand_color px-5 py-2 rounded-md cursor-pointer hover:bg-orange-500"
                >
                  <FaUpload />
                  SELECT FILES
                </label>

                <p className="text-center text-sm text-gray-500 mt-[12px]">
                  Maximum upload file size: 40 MB.
                </p>
              </div>
            )}

            {/* Filter box */}
            <div className="w-full flex justify-between items-center pb-[20px]">
              {/* Search Bar */}
              <div className="w-[50%] xl:w-[30%] 2xl:w-[25%] relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for library"
                  className="border border-gray-300 w-full font-[400] pl-10 pr-10 py-2 outline-brand_color rounded-md shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                {/* Media Display */}
                {isGridView ? (
                  // Grid View
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredMedia.map((item) => (
                      <div
                        key={item._id}
                        className={`relative border rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 ${selectedMedia && selectedMedia._id === item._id ? "ring-4 ring-indigo-400" : ""
                          }`}
                        onClick={() => {
                          setSelectedMedia(item);
                          setMetadata({
                            alt: item.alt_text || "",
                            title: item.title || "",
                            caption: item.caption || "",
                            description: item.description || "",
                            url: `${base_url}/uploads/${admin_info._id}/${item.file_name}`,
                          });
                        }}
                      >
                        {/* Image Display */}
                        {item.type.startsWith("image") && (
                          <div className="relative">
                            <img
                              src={`${base_url}/uploads/${admin_info._id}/${item.file_name}`}
                              alt={item.title || "Image"}
                              className="w-full h-32 object-cover"
                            />
                            <span className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                              {item.size}
                            </span>
                          </div>
                        )}
                        {/* Video Display */}
                        {/* {item.type.startsWith("video") && (
                          <video controls className="w-full h-32 object-cover" src={`${base_url}${item.imageUrl}` />
                        )} */}
                        {/* Audio Display */}
                        {item.type.startsWith("audio") && (
                          <audio controls className="w-full p-2">
                            <source src={`${base_url}${item.imageUrl}`} type={item.type} />
                            Your browser does not support the audio element.
                          </audio>
                        )}
                        <div className="p-2">
                          <p className="text-sm font-medium truncate">{item.file_name || "Untitled"}</p>
                          <p className="text-xs text-gray-500">{formatDate(item.createDate)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List View (Table Layout)
                  <div className='w-full overflow-x-auto border-[1px] border-[#eee] bg-red-50 custom-scrollbar'>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-table_header dark:bg-gray-800">
                        <tr>
                          {columns.map((col) => (
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
                          filteredMedia.map((row,i) => (
                            <tr key={row._id}>
                              {columns.map((col) => (
                                <td
                                  key={col.key}
                                  className="px-4 py-4 text-nowrap text-sm text-gray-700 dark:text-gray-300"
                                >
                                  {col.key === "image" ? (
                                    <div className="flex justify-start items-center gap-[15px] pr-[40px]">
                                      <img
                                        src={`${base_url}/uploads/${admin_info._id}/${row.file_name}`}
                                        alt={row.title || "Media"}
                                        className="w-12 h-12 rounded-[5px] object-cover"
                                      />
                                      <div>
                                        <h1 className="text-[12px] lg:text-[16px] font-[500] text-black text-nowrap">
                                          {truncateText(row.file_name || "Untitled", 20)}
                                        </h1>
                                        <p className="text-[8px] lg:text-[13px] mt-[4px] font-[500] text-orange-600">
                                          {row.size || "N/A"}
                                        </p>
                                      </div>
                                    </div>
                                  ) : col.key === "id" ? (
                      <div>
                      <p>{i+1}</p>
                      </div>
                      ): col.key === "authorized" ? (
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-semibold ${row[col.key] === "Approved"
                                          ? "bg-green-100 text-green-500"
                                          : row[col.key] === "Pending"
                                            ? "bg-orange-100 text-orange-500"
                                            : "bg-red-100 text-red-500"
                                        }`}
                                    >
                                      {row[col.key] || "Pending"}
                                    </span>
                                  ) : col.key === "createDate" || col.key === "authorizedDate" || col.key === "updateDate" ? (
                                    <div>
                                      <div className="text-black dark:text-gray-100">
                                        {formatDate(row[col.key])}
                                      </div>
                                    </div>
                                  ) : col.key === "action" ? (
                                    <div className="flex justify-start items-center gap-[12px] relative">
                                      <div onClick={() => handleViewImage(row.file_name)} className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                        <GoEye />
                                        <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">View</span>
                                      </div>
                                      <div onClick={() => {
                                        setSelectedMedia(row);
                                        setMetadata({
                                          alt: row.alt_text || "",
                                          title: row.title || "",
                                          caption: row.caption || "",
                                          description: row.description || "",
                                          url: `${base_url}/uploads/${admin_info._id}/${row.file_name}`,
                                        });
                                      }} className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                        <CiEdit />
                                        <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">Edit</span>
                                      </div>
                                      <div                           onClick={() => {
    setTicketToDelete(row._id);
    setDeleteDialogOpen(true);
  }} className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
                                        <MdDeleteOutline />
                                        <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">Delete</span>
                                      </div>
                                      <div 
                                        onClick={() => {
                                          navigator.clipboard.writeText(`${base_url}/uploads/${admin_info._id}/${row.file_name}`);
                                          showToast('URL copied to clipboard');
                                        }} 
                                        className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative"
                                      >
                                        <MdOutlineContentCopy />
                                        <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">Copy</span>
                                      </div>
                                      <a
                                        href={`${base_url}/uploads/${admin_info._id}/${row.file_name}`}
                                        download={row.file_name}
                                        className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative"
                                      >
                                        <MdOutlineCloudDownload />
                                        <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">Download</span>
                                      </a>
                                    </div>
                                  ) : (
                                    truncateText(row[col.key]?.toString() || "N/A", 20)
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
                                <h2 className='text-[17px] text-neutral-500'>No Data Found</h2>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </> : (
                <div className='flex justify-center items-center flex-col gap-[10px] w-[100%]'>
                  <img className='w-[200px]' src={empty_img} alt="" />
                  <p className="col-span-4 text-center text-gray-500">No media found</p>
                </div>
              )
            }

            {/* Image Preview Modal */}
            {selectedImage && (
              <div className="fixed inset-0 bg-black bg-opacity-50 p-[20px] flex justify-center items-center z-[10000000000]">
                <div className="relative bg-white dark:bg-gray-900 p-1 rounded-lg shadow-lg max-w-lg">
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 text-gray-700"
                  >
                    <MdClose className="w-6 h-6" />
                  </button>
                  <img src={`${base_url}/uploads/${admin_info._id}/${selectedImage}`} alt="Preview" className="w-full h-auto rounded-lg" />
                </div>
              </div>
            )}

            {/* Media Details Popup */}
            {selectedMedia && (
              <div className="fixed inset-0 bg-black bg-opacity-50 w-full p-4 overflow-y-auto z-[10000000000] flex justify-center items-center text-sm">
                <div className="bg-white w-full h-full max-h-screen lg:max-h-[90vh] overflow-y-auto relative border border-gray-300 flex flex-col">
                  {/* Header */}
                  <div className="w-full bg-gray-100 border-b border-gray-300 flex justify-between items-center">
                    <h1 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600 px-[20px]">Media Library Details</h1>
                    <div className="flex items-center ">
                      <button className="text-gray-500 hover:text-gray-800 py-3 text-base px-[15px] hover:bg-gray-200 transition-all duration-100 border-l-[1px] border-gray-300" onClick={handlePrevious}>
                        <MdOutlineArrowBackIosNew className='text-[20px] 2xl:text-[25px]' />
                      </button>
                      <button className="text-gray-500 hover:text-gray-800 py-3  text-base px-[15px] hover:bg-gray-200 border-l-[1px]  transition-all duration-100  border-gray-300" onClick={handleNext}>
                        <MdOutlineArrowForwardIos className='text-[20px] 2xl:text-[25px]' />
                      </button>
                      <button className="text-gray-500 hover:text-gray-800   border-l-[1px] text-base py-3  px-[15px] border-gray-300" onClick={() => setSelectedMedia(null)}>
                        <AiOutlineClose className='text-[20px] 2xl:text-[25px]' />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col lg:flex-row flex-grow overflow-auto">
                    {/* Left Side: Image Preview */}
                    <div className="flex-shrink-0 w-full lg:w-1/2 p-4 flex justify-center items-center">
                      <img
                        src={`${base_url}/uploads/${admin_info._id}/${selectedMedia.file_name}`}
                        alt={selectedMedia.title || "Media"}
                        className="w-[40%] xl:w-full max-w-xs h-[100%] xl:h-auto xl:object-cover rounded-lg"
                      />
                    </div>

                    {/* Right Side: Media Details */}
                    <div className="flex-grow bg-gray-50 p-4 overflow-y-auto border-l-[1px] border-[#eee]">
                      <div className='pb-[10px] border-b-[1px] border-gray-200'>
                        <h2 className="text-sm font-medium mb-2">Media Details</h2>
                        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">File size:</span> {selectedMedia.size || "N/A"}</p>
                        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">File type:</span> {selectedMedia.type || "N/A"}</p>
                        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">File Name:</span> {selectedMedia.file_name || "N/A"}</p>
                        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">Uploaded By:</span> {selectedMedia.author || "N/A"}</p>
                        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">Uploaded Date:</span> {formatDate(selectedMedia.createDate)}</p>
                        <p className="text-xs 2xl:text-[14px] text-gray-600 mb-1 2xl:mb-2"><span className="font-semibold">Status:</span>
                          <span className={`ml-1 px-2 py-1 rounded-full text-xs font-semibold ${selectedMedia.authorized === "Approved"
                              ? "bg-green-100 text-green-500"
                              : selectedMedia.authorized === "Pending"
                                ? "bg-orange-100 text-orange-500"
                                : "bg-red-100 text-red-500"
                            }`}>
                            {selectedMedia.authorized || "Pending"}
                          </span>
                        </p>
                      </div>

                      {/* Metadata Fields */}
                      <div className='pt-[10px]'>
                        {['Title', 'Caption', 'Description', "ALT Text"].map((label) => (
                          <div className="mb-2" key={label}>
                            <label className="block text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">{label}</label>
                            {label === 'Description' ? (
                              <textarea
                                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] border-[1px] border-[#eee] p-[12px]"
                                value={metadata[label.toLowerCase()] || ""}
                                onChange={(e) => handleMetadataChange(label.toLowerCase(), e.target.value)}
                              />
                            ) : (
                              <input
                                type="text"
                                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                                value={metadata[label.toLowerCase()] || ""}
                                onChange={(e) => handleMetadataChange(label.toLowerCase(), e.target.value)}
                              />
                            )}
                          </div>
                        ))}

                        <div className="mb-2">
                          <label className="block text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">File URL</label>
                          <div className='relative mt-[3px] 2xl:mt-[7px]'>
                            <input
                              type="text"
                              readOnly
                              className="w-full rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                              value={metadata.url || `${base_url}/uploads/${admin_info._id}/${selectedMedia.file_name}`}
                            />
                            <div
                              className="w-[40px] absolute top-0 h-input_height 2xl:h-[45px] right-0 border border-gray-300 hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group"
                              onClick={handleCopyUrl}
                            >
                              <MdOutlineContentCopy />
                              <span className="absolute hidden group-hover:block bottom-[35px] left-1/2 transform -translate-x-1/2 bg-brand_color text-white text-xs font-medium rounded px-2 py-0.5 z-10">
                                Copy
                                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-brand_color"></span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-blue-500 flex flex-wrap gap-2 border-t-[1px] border-gray-200 pt-[10px]">
                          <button
                            onClick={handleDownload}
                            className="hover:underline"
                          >
                            Download
                          </button> |
                          <button
                           onClick={() => {
    setTicketToDelete(row._id);
    setDeleteDialogOpen(true);
  }}
                            className="hover:underline text-red-500"
                          >
                            Delete permanently
                          </button>
                        </div>

                        {/* Save Button */}
                        <div className="mt-6">
                          <button
                            onClick={handleUpdateMedia}
                            disabled={                            isUpdating}
                            className="px-4 py-2 bg-brand_color text-white rounded-md hover:bg-orange-600 disabled:bg-gray-400"
                          >
                            {isUpdating ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </section>
    </section>
  );
};

export default Addnewlibrary;