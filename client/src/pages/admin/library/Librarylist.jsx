import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { GoEye } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BiExport } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import empty_img from "../../../assets/empty.png"
import { MdOutlineCloudDownload } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { motion } from "framer-motion";
import toast,{Toaster} from "react-hot-toast"


import { RiCloseLargeFill } from "react-icons/ri";
import { BiFilterAlt } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { FaHdd, FaImage, FaFileAlt, FaMusic } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css';
import { MdOutlineContentCopy } from "react-icons/md";
import format from "date-fns/format";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { RiDeleteBin6Line } from "react-icons/ri";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useSuper } from '../../../context/Superprovider';

const Librarylist = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
  const [isUpdating, setIsUpdating] = useState(false);

         const [metadata, setMetadata] = useState({}); // For SEO metadata
         const base_url = import.meta.env.VITE_API_KEY_Base_URL;
         const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"))
const storageData = [
    {
      title: "Total Storage",
      value: 94,
      total: 100,
      icon: <FaHdd size={25} className="text-gray-600" />,
      color: "#4B5563", // Gray
    },
    {
      title: "Images",
      value: 26,
      total: 100,
      icon: <FaImage size={25} className="text-green-400" />,
      color: "#F3962D", // Green
    },
    {
      title: "Documents",
      value: 38,
      total: 100,
      icon: <FaFileAlt size={25} className="text-blue-500" />,
      color: "#3B82F6", // Blue
    },
    {
      title: "Audios",
      value: 54,
      total: 100,
      icon: <FaMusic size={25} className="text-yellow-500" />,
      color: "#F59E0B", // Yellow
    },
     {
      title: "Videos",
      value: 80,
      total: 100,
      icon: <IoVideocam size={25} className="text-[#26de81]" />,
      color: "#4b7bec", // Yellow
    },
  ];

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

  const { libraryImages, fetchLibraryImages, loadingLibraryImages } = useSuper();
  console.log("dfdf",libraryImages)
  // --------------table coulms
const [data,setData]=useState(libraryImages)

const columns = [
  { key: "id", label: "ID" },
  { key: "image", label: "Image" },
  { key: "size", label: "Size" },
  { key: "type", label: "Type" },
  // { key: "mediatype", label: "Media Type" },
  { key: "createDate", label: "Create Date" },
  { key: "author", label: "Author" },
  { key: "authorizedDate", label: "Authorize Date" },
  { key: "authorizedBy", label: "Authorize By" },
  { key: "updateDate", label: "Update Date" },
  { key: "updateBy", label: "Update By" },
  { key: "authorized", label: "Authorized" },
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
  // -----------author-suggestion----------------
    const [authorInput, setAuthorInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setAuthorInput(input);

    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Filter authors based on input
    const filteredSuggestions = [...new Set(data.map((item) => item.author))]
      .filter((author) => author.toLowerCase().includes(input.toLowerCase()));

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setAuthorInput(suggestion);
    setSuggestions([]);
  };
  // -------------status list --------------
        const [selectedOption, setSelectedOption] = useState('Select Type');
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef(null);
        const [hoveredItem, setHoveredItem] = useState(null); // Tracks the currently hovered item
      
        const options = [
          { label: 'Select Type', color: 'text-gray-400', bgColor: 'bg-gray-300' },
          { label: 'Images', color: 'text-green-500', bgColor: 'bg-green-500' },
          { label: 'Audios', color: 'text-yellow-400', bgColor: 'bg-yellow-400' },
          { label: 'Videos', color: 'text-indigo-500', bgColor: 'bg-indigo-500' },
          { label: 'Documents', color: 'text-orange-500', bgColor: 'bg-orange-500' },
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
          if(option.label=="Select Type"){
            setmediatype("")
            console.log(option.label)
          }else{
            setmediatype(option.label)
            console.log(option.label)

          }
        };
          const selectedOptionData = options.find(
        (option) => option.label === selectedOption
      );
  // --------------------status-----------
            const [selectedOption3, setSelectedOption3] = useState('Select Authorized');
            const [isOpen3, setIsOpen3] = useState(false);
            const dropdownRef3 = useRef(null);
            const [hoveredItem3, setHoveredItem3] = useState(null);
          
            const options3 = [
              { label: 'Select Authorized', color: 'text-gray-400', bgColor: 'bg-gray-300' },
              { label: 'Approved', color: 'text-green-500', bgColor: 'bg-green-500' },
              { label: 'Pending', color: 'text-orange-700', bgColor: 'bg-orange-400' },
              { label: 'Rejected', color: 'text-red-500', bgColor: 'bg-red-500' },
            ];
            const [status2, setStatus2] = useState("");
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
              console.log(option.label)
              setSelectedOption3(option.label);
              setIsOpen3(false);
              if(option.label=="Select Authorized"){
                setAuthorized("")
              }else{
                setAuthorized(option.label)
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
  // Filter data based on search term
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleClearSearch = () => {
    setSearchTerm(""); // Clear the input field
  };
  // -----------------all-calender-----------------------
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

// ===========================table searching function===================

  // Filter data based on search term
const [publishByInput, setPublishByInput] = useState("");
const [updateByInput, setUpdateByInput] = useState("");
const [authorized, setAuthorized] = useState("");
const [visibility, setVisibility] = useState("");
const [status,setstatus]=useState("");
const [filteredData, setFilteredData] = useState([]); // Holds the filtered data
const [originalData, setOriginalData] = useState(data); // Holds the original data (fetched from API or elsewhere)
const [searchInput, setSearchInput] = useState("");
const [filteredPublishers, setFilteredPublishers] = useState([]);
const [selectedPublisher, setSelectedPublisher] = useState(null);
const [mediatype,setmediatype]=useState("");
  // Handles input change and filters data based on "publish_by"
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setPublishByInput(value);

    if (value.trim() === "") {
      setFilteredPublishers([]);
      return;
    }

    // Extract unique "publish_by" values and filter them based on the input
    const uniquePublishers = [...new Set(data.map((item) => item.authorizeBy))];
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
    const uniqueUpdateBy = [...new Set(data.map((item) => item.updateBy))];
    const filtered = uniqueUpdateBy.filter((updateby) =>
      updateby.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUpdateBy(filtered.map((name) => ({ id: name, updateby: name })));
  };
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

  // Handle selection of updater for "Update By"
  const handleUpdateBySelect = (updateBy) => {
    setSearchInputUpdateBy(updateBy.updateby); // Set the name in the input field
    setSelectedUpdateBy(updateBy.updateby); // Store the selected updater
    setFilteredUpdateBy([]); // Clear suggestions after selection
    setUpdateByInput(updateBy.updateby)
  };

    // Format date to display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
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
      const matchesauthor = authorInput ? item.author.toLowerCase().includes(authorInput.toLowerCase()) : true;

      const matchesPublishBy = publishByInput ? item.authorizeBy.toLowerCase().includes(publishByInput.toLowerCase()) : true;
      const matchesUpdateBy = updateByInput ? item.updateBy.toLowerCase().includes(updateByInput.toLowerCase()) : true;
      const matchesmedia=mediatype ? item.mediatype.includes(mediatype) : true;
      const matchesauthorize=authorized ? item.authorized.toLowerCase().includes(authorized.toLowerCase()) : true;
       
      const matchesstatus=status ? item.status.toLowerCase().includes(status.toLowerCase()) : true;
      const matchesSearchTerm = searchTerm ? item.updateDate.toLowerCase().includes(searchTerm.toLowerCase()) || item.updatetime.toLowerCase().includes(searchTerm.toLowerCase()) || item.updateBy.toLowerCase().includes(searchTerm.toLowerCase()) || item.updateDate.toLowerCase().includes(searchTerm.toLowerCase()) ||  item.authorizeBy.toLowerCase().includes(searchTerm.toLowerCase()) ||  item.authorizedtime.toLowerCase().includes(searchTerm.toLowerCase()) || item.mediatype.toLowerCase().includes(searchTerm.toLowerCase()) ||  item.authorizeDate.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase()) || item.create_time.toLowerCase().includes(searchTerm.toLowerCase()) || item.createDate.toLowerCase().includes(searchTerm.toLowerCase()) ||  item.type.toLowerCase().includes(searchTerm.toLowerCase()) || item.size.toLowerCase().includes(searchTerm.toLowerCase()) || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.authorized.toLowerCase().includes(searchTerm.toLowerCase()) : true;

      // Create Date filter
      // const matchesCreateDate = itemCreateDate >= new Date(createStartDate) && itemCreateDate <= new Date(createEndDate);
      // Publish Date filter
      // const matchesPublishDate = itemPublishDate >= new Date(publishStartDate) && itemPublishDate <= new Date(publishEndDate);
  
      return (
        matchesPublishBy &&
        matchesauthor &&
        matchesUpdateBy &&
        matchesstatus &&
        matchesmedia &&
        matchesauthorize &&
        matchesSearchTerm
        // matchesCreateDate 
        // matchesPublishDate
      );
    });
  
    setFilteredData(filtered);
  };
  
  useEffect(() => {
    applyFilters();
  }, [searchTerm, publishByInput, authorized,updateByInput,authorInput,status,mediatype]);
  
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
    setSearchTerm("");
    setAuthorInput("");
    setPublishByInput("");
    setUpdateByInput("");
    setAuthorized("")
    setmediatype("")
    setSelectedOption("Select Type");
    setSelectedOption3("Select Authorized");

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
  const [selectedMedia, setSelectedMedia] = useState(null);
// -----------------image-popup------------
const [selectedImage, setSelectedImage] = useState(null);

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
              <h1 className='text-[20px] font-[600] mb-[8px]'>Library List</h1>
          <ul className='w-full   md:w-auto flex lg:justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Upload Library</li>
            <li><IoIosArrowForward/></li>
            <li>Library List</li>
          </ul>
        </div>
        {/* -------------------table------------------- */}

        {/* ---------------table --------------- */}
       <div className='w-full   md:w-auto flex gap-[10px] md:m-0 mt-[15px]'>
             <button className='w-[50%] md:w-auto px-[15px] py-[6px] text-black text-[14px] gap-[8px]  border-[1px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'>
                <BiExport className='text-[20px]'/>
                Export
            </button>
            <NavLink to="/upload-library/new-library"className="w-[50%] md:w-auto ">
               <button className='px-[12px] w-[100%] md:w-auto py-[6px] font-[500] border-[2px] border-brand_color  text-white rounded-[5px] text-[14px] bg-brand_color flex justify-center items-center gap-[10px]'>
            <LuPlus className='text-[22px]'/>
            Add New
        </button>
            </NavLink>
           </div>

       </div>
       {/* ---------------progress bar----------- */}
       <section className='pt-[30px]'>
        <Swiper
  slidesPerView={3}
  spaceBetween={10}
  pagination={{
    clickable: true,
  }}
  breakpoints={{
    300: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1300: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  }}
  modules={[Pagination]}
  className="mySwiper"
>
  {storageData.map((item, index) => (
    <SwiperSlide key={index}>
      <div className="flex border-[1px] border-[#eee] items-center bg-white p-4 rounded-lg shadow-sm">
        {/* Left: Smaller Circular Progress Bar with Smaller Icon */}
        <div className="relative w-16 h-16"> {/* Smaller box size */}
          {/* Progress Bar */}
          <CircularProgressbar
            value={(item.value / item.total) * 100}
            styles={buildStyles({
              pathColor: item.color,
              trailColor: "#E5E7EB",
            })}
          />
          {/* Icon in Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            {item.icon}
          </div>
        </div>

        {/* Right: Content */}
        <div className="ml-4 flex flex-col justify-center">
          {/* Title */}
          <p className="text-gray-600 text-base font-medium">{item.title}</p>

          {/* Storage Value */}
          <p className="text-lg font-bold mt-1">
            {item.value} GB{" "}
            <span className="text-gray-400 text-sm font-normal">
              of {item.total} GB
            </span>
          </p>
        </div>
      </div>
    </SwiperSlide>
    
  ))}
  <div className="swiper-pagination " /> {/* Add margin-top */}
</Swiper>
<Toaster/>
       </section>
       {/* ------------------new customer table----------------- */}
<section className=' '>
<div className="relative    sm:rounded-lg">
    <div className="flex items-center justify-between  mb-[20px] flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
  <div className='w-full flex justify-between items-center mb-[14px] md:flex-row flex-col'>
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
        placeholder="Search for library"
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
   <div className='w-full md:w-auto flex justify-center items-center gap-[10px]'>
    <button onClick={()=>{setfilter_sidebar(true)}}  className='w-[50%] hover:border-brand_color md:w-auto text-[14px] border-[1px] border-[#eee] hover:text-brand_color transition-all duration-100 px-[17px] py-[7px] flex justify-center items-center gap-[7px] rounded-[5px]'>
          <BiFilterAlt className='text-[20px]'/> Filters
    </button>
    <div className="relative w-[50%] md:w-auto inline-block text-left ">
  <div>
    <div className="w-[100%] md:w-auto  relative inline-block text-left ">
  <div className="w-[100%] md:w-auto  relative inline-block text-left ">
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
            <div className='mb-[10px] mt-[10px]'>
  <label htmlFor="name" className='text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight'>Media Type</label><br />
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
                 {/* Create Date Section */}
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
      <div className="app">
      <div className="mb-[10px] relative">
        <label htmlFor="name"   className="text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight">Author</label><br />
        <input
          type="text"
          placeholder="Author"
             className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
          value={authorInput}
          onChange={handleInputChange}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-[#eee] rounded mt-[5px] max-h-[150px] overflow-y-auto w-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-[10px] hover:bg-[#f5f5f5] cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
        {/* Create Date Section */}

                
                              {/* Publish Date Section */}
                       <div className="mb-[10px] mt-[10px]">
            <label
              htmlFor="publishDate"
              className="text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight"
            >
              Authorize Date
            </label>
            <br />
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type="text"
                readOnly
                value={`${format(publishRange[0].startDate, "dd-MM-yyyy")} - ${format(
                  publishRange[0].endDate,
                  "dd-MM-yyyy"
                )}`}
                onClick={() => setShowPublishCalendar(true)}
                placeholder="Select Date Range"
                className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              />
              {showPublishCalendar && (
                <div className="absolute z-10 bg-white shadow-md border-[1px] border-[#eee] w-full p-2">
                  <DateRange
                    ranges={tempPublishRange}
                    onChange={handlePublishDateChange}
                    moveRangeOnFirstSelection={false}
                    rangeColors={["#4A90E2"]}
                    showMonthAndYearPickers={true}
                    months={1}
                    direction="horizontal"
                    className="md:w-[100%] w-[100%]"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={cancelPublishDate}
                      className="px-3 py-1 border text-[13px] 2xl:text-[15px] rounded bg-gray-300 text-black"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={applyPublishDate}
                      className="px-3 py-1 border rounded text-[13px] 2xl:text-[15px] bg-brand_color text-white"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
                    </div>
          
                        <div className=" mb-[10px]">
                <div className="relative">
                  <label htmlFor="publisher" className="text-label_size 2xl:text-[16px] text-neutral-600">
                  Authorize By
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Authorize By"
                    value={publishByInput}
                    onChange={handleSearchChange}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  />
          
                  {filteredPublishers.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-[#ddd] rounded shadow-lg z-10">
                      {filteredPublishers.map((publisher) => (
                        <div
                          key={publisher.id}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handlePublisherSelect(publisher)} // Selecting a publisher
                        >
                          {publisher.publish_by}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                              <button onClick={cancelUpdateDate} className="px-3 py-1 border text-[13px] 2xl:text-[15px] rounded bg-gray-300">Cancel</button>
                              <button onClick={applyUpdateDate} className="px-3 py-1 border text-[13px] 2xl:text-[15px] rounded bg-brand_color text-white">Apply</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                      <div className="relative mb-[10px] mt-[10px]">
                    <label htmlFor="updateBy" className="text-label_size 2xl:text-[16px] text-neutral-600">
                      Update By
                    </label>
                    <br />
                    <input
                      type="text"
                      id="updateBy"
                      placeholder="Update By"
                      value={updateByInput}
                      onChange={handleSearchChangeUpdateBy}
                      className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
              
                    />
              
                    {filteredUpdateBy.length > 0 && (
                      <div className="absolute left-0 right-0 mt-1 bg-white border border-[#ddd] rounded shadow-lg z-10">
                        {filteredUpdateBy.map((updateBy) => (
                          <div
                            key={updateBy.id}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleUpdateBySelect(updateBy)} // Selecting an update-by name
                          >
                            {updateBy.updateby}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div  className='mb-[10px]'>
                <label htmlFor="name"className='text-label_size 2xl:text-[16px] text-neutral-600 font-label_weight'>Authorized</label><br />
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
                                           authorInput=="" && publishByInput=="" && updateByInput=="" && selectedOption=="Select Type" &&  selectedOption3=="Select Authorized" ? "":            <button
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
        <section className='w-full overflow-x-auto border-[1px]  border-[#eee]  mt-[20px] custom-scrollbar'>
            {
              currentRows.length > 0 ? <>
                {/* Media Display */}
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
                        {currentRows.length > 0 ? (
                          currentRows.map((row,i) => (
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
                                      <div    
  onClick={() => {
    setTicketToDelete(row._id);
    setDeleteDialogOpen(true);
  }}className="w-[30px] h-[30px] border border-gray-300 rounded-[5px] hover:text-brand_color flex justify-center items-center text-[15px] cursor-pointer hover:border-brand_color dark:border-gray-700 dark:hover:bg-gray-800 group relative">
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
   {/* Popup for Media Details */}
      {selectedMedia && (
<div className="fixed inset-0 bg-black bg-opacity-50 w-full p-4 overflow-y-auto z-[10000000000] flex justify-center items-center text-sm">
  <div className="bg-white w-full h-full max-h-screen lg:max-h-[90vh] overflow-y-auto relative border border-gray-300 flex flex-col">
    {/* Header */}
    <div className="w-full bg-gray-100 border-b border-gray-300 flex justify-between items-center">
      <h1 className=" ext-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600 px-[20px]">Media Library Details</h1>
      <div className="flex items-center ">
        {/* <button className="text-gray-500 hover:text-gray-800 py-3 text-base px-[15px] hover:bg-gray-200 transition-all duration-100 border-l-[1px] border-gray-300" onClick={handlePrevious}>
          <MdOutlineArrowBackIosNew className='text-[20px] 2xl:text-[25px]'/>
        </button>
        <button className="text-gray-500 hover:text-gray-800 py-3  text-base px-[15px] hover:bg-gray-200 border-l-[1px]  transition-all duration-100  border-gray-300" onClick={handleNext}>
         <MdOutlineArrowForwardIos className='text-[20px] 2xl:text-[25px]'/>
        </button> */}
        <button className="text-gray-500 hover:text-gray-800   border-l-[1px] text-base py-3  px-[15px] border-gray-300" onClick={() => setSelectedMedia(null)}>
          <AiOutlineClose className='text-[20px] 2xl:text-[25px]'/>
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col  lg:flex-row flex-grow overflow-auto">
      {/* Left Side: Image Preview */}
      <div className="flex-shrink-0 w-full lg:w-1/2 p-4 flex justify-center items-center">
        <img src={selectedMedia.image} alt={metadata.alt} className="w-[40%] xl:w-full max-w-xs h-[100%] xl:h-auto xl:object-cover rounded-lg" />
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
          {[ 'Title', 'Caption', 'Description',"ALT Text"].map((label) => (
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
            <a 
  onClick={() => {
    setTicketToDelete(row._id);
    setDeleteDialogOpen(true);
  }} href="#" className="hover:underline text-red-500">Delete permanently</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      )}
</section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Librarylist