import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { MdOutlineAttachFile } from 'react-icons/md';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { IoClose } from "react-icons/io5";
import axios from 'axios';

const Areplyticket = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [showmodal, setmodal] = useState(false);
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const admin_token = localStorage.getItem("adminToken");
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const {id} = useParams();
  
  // State for ticket data
  const [ticket, setTicket] = useState(null);
  const [loadingTicket, setLoadingTicket] = useState(true);
  const [ticketError, setTicketError] = useState(null);

  // State for toast notifications
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  // State for loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for form data
  const [formData, setFormData] = useState({
    message: '',
    attachments: []
  });
  
  // State for validation errors
  const [errors, setErrors] = useState({
    message: ''
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true)
      } else {
        setactivetopbar(false)
      }
    });

    // Fetch ticket data
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `${base_url}/super/admin/ticket-information/${id}`,
          {
            headers: {
              Authorization: `Bearer ${admin_token}`
            }
          }
        );
        
        if (response.data.success) {
          setTicket(response.data.ticket);
        } else {
          setTicketError('Failed to fetch ticket');
        }
      } catch (err) {
        setTicketError(err.response?.data?.message || 'Error fetching ticket');
      } finally {
        setLoadingTicket(false);
      }
    };

    fetchTicket();

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // -----------text-editor---------------
  const [content, setContent] = useState(''); // State for editor content
  const [isUploading, setIsUploading] = useState(false);
  //  ----------------file-upload------------------
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Image upload popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("library");
  const [uploadedImages, setUploadedImages] = useState([]);

  // Fetch images from server
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/upload/image/admin-images/${admin_info._id}`,
          {
            headers: {
              Authorization: `Bearer ${admin_token}`
            }
          }
        );
        if (response.data.images) {
          setUploadedImages(response.data.images);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        showToast('Error loading media library', 'error');
      }
    };
    fetchImages();
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
    }, 5000);
  };

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).map((file) => ({
      file,
      progress: 0,
      uploaded: false,
    }));

    setFiles((prev) => {
      const updatedFiles = [...prev, ...selectedFiles];
      updatedFiles.forEach((fileObj, i) => {
        if (!fileObj.uploaded) {
          simulateUpload(fileObj, i, updatedFiles);
        }
      });
      return updatedFiles;
    });
  };

  // Simulate file upload progress
  const simulateUpload = (fileObj, index, currentFiles) => {
    const interval = setInterval(() => {
      setFiles((prev) => {
        return prev.map((item, i) => {
          if (i === index && !item.uploaded) {
            const newProgress = Math.min(item.progress + 10, 100);
            return { ...item, progress: newProgress, uploaded: newProgress === 100 };
          }
          return item;
        });
      });

      if (fileObj.progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  // Toggle image popup
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Actual file upload function
  const uploadFileToServer = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const uploadResponse = await axios.post(
        `${base_url}/api/upload/image/admin-upload-image/${admin_info._id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (uploadResponse.data.imagePath) {
        const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`);
        if (fetchResponse.data.images) {
          setUploadedImages(fetchResponse.data.images);
          setActiveTab("library");
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Error uploading file', 'error');
    }
  };

  // Remove file handler
  const removeFile = (fileId) => {
    const fileToRemove = files.find(f => f.id === fileId);
    if (!fileToRemove) return;

    setFiles(prev => {
      const updatedFiles = prev.filter(file => file.id !== fileId);
      
      // Update form data attachments if file was uploaded
      if (fileToRemove.uploaded) {
        setFormData(prev => ({
          ...prev,
          attachments: prev.attachments.filter(name => name !== fileToRemove.file.name)
        }));
      }
      
      return updatedFiles;
    });
  };

  // Select image from library
  const selectImage = (image) => {
    const newFile = {
      file: {
        name: image,
        size: 500000, // dummy size or you can fetch it via metadata
      },
      progress: 0,
      uploaded: false,
    };
  
    setFiles((prev) => [...prev, newFile]);
    simulateUploadProgress(newFile);
    togglePopup();
  };

  // Simulate upload progress for selected images
  const simulateUploadProgress = (fileObj) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file.name === fileObj.file.name ? { ...f, progress, uploaded: progress >= 100 } : f
        )
      );
  
      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate message
    if (!content || content.trim() === '' || content === '<p><br></p>') {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (content.length > 5000) {
      newErrors.message = 'Message is too long (max 5000 characters)';
      isValid = false;
    } else {
      newErrors.message = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle reply submission
  const handleReplySubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare attachments
      const attachments = files
        .filter(file => file.uploaded)
        .map(file => file.file.name);

      // Prepare reply data
      const replyData = {
        message: content,
        attachments,
        admin_id: admin_info._id
      };

      // Simulate 2 second delay before submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Submit reply
      const response = await axios.post(
        `${base_url}/super/admin/reply/${id}`,
        replyData,
        {
          headers: {
            Authorization: `Bearer ${admin_token}`
          }
        }
      );

      if (response.data.success) {
        showToast('Reply submitted successfully');
        // Reset form
        setContent('');
        setFiles([]);
        // Refresh ticket data
        const ticketResponse = await axios.get(
          `${base_url}/super/admin/ticket-information/${id}`,
          {
            headers: {
              Authorization: `Bearer ${admin_token}`
            }
          }
        );
        if (ticketResponse.data.success) {
          setTicket(ticketResponse.data.ticket);
        }
      } else {
        showToast(response.data.message || 'Error submitting reply', 'error');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      showToast(error.response?.data?.message || 'Error submitting reply', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      {/* Left sidebar */}
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>

      {/* Main content */}
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[20px] lg:px-[30px]'>
          {/* Header */}
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>
                {loadingTicket ? 'Loading...' : ticket ? `Ticket #${ticket.ticket_id}` : 'Ticket Not Found'}
              </h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Support Ticket</li>
                <li><IoIosArrowForward /></li>
                <li>{loadingTicket ? 'Loading...' : ticket ? `Ticket #${ticket.ticket_id}` : 'Ticket Not Found'}</li>
              </ul>
            </div>
          </div>

          {/* Loading state */}
          {loadingTicket && (
            <div className="flex justify-center items-center h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand_color"></div>
            </div>
          )}

          {/* Error state */}
          {ticketError && !loadingTicket && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{ticketError}</span>
            </div>
          )}

          {/* Ticket content */}
          {ticket && !loadingTicket && (
            <section className='pt-[40px] pb-[30px]'>
              {/* Main Ticket */}
              <div className="bg-white rounded-lg p-6 w-full border mb-[20px] border-gray-200">
                <div className="flex items-start space-x-4">
                  <img
                    src={ticket.profile_pic || "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{ticket.shopName || 'No shop name'}</h4>
                        <div className='flex justify-start items-center gap-2'>
                          <p className="text-sm text-gray-500">
                            {ticket.email} &bull; #{ticket.ticket_id} &bull; {formatDate(ticket.createDate)}
                          </p>
                          <div className={`flex justify-center items-center gap-1 font-medium text-[15px] ${
                            ticket.status === 'Open' ? 'text-green-500' : 
                            ticket.status === 'Closed' ? 'text-red-500' : 
                            'text-blue-500'
                          }`}>
                            <div className={`w-[10px] h-[10px] rounded-full ${
                              ticket.status === 'Open' ? 'bg-green-500' : 
                              ticket.status === 'Closed' ? 'bg-red-500' : 
                              'bg-blue-500'
                            }`}></div>
                            {ticket.status}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-gray-700">
                      <h3 className="font-semibold">{ticket.subject}</h3>
                      <div dangerouslySetInnerHTML={{ __html: ticket.message }} />
                    </div>
                    <p className="text-gray-700 mt-4 font-semibold">Regards,</p>
                    <p className="text-gray-700">{ticket.shopName || 'Customer'},</p>
                    {ticket.attachments && ticket.attachments.length > 0 && (
                      <div className="mt-4 py-3 flex items-center space-x-3">
                        <div>
                          <img className='w-[40px]' src={`http://localhost:8080/uploads/${admin_info?._id}/${ticket.attachments}`} alt="" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{ticket.attachments[0]} (size not available)</p>
                          <div className="flex space-x-3 text-sm text-gray-700 mt-1">
                            <button className="hover:underline flex justify-center items-center gap-2">
                              <MdOutlineRemoveRedEye className='text-[18px]' /> Preview
                            </button>
                            <button className="hover:underline flex justify-center items-center gap-2">
                              <PiDownloadSimpleBold /> Download
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Replies */}
              {ticket.replies && ticket.replies.map((reply, index) => (
                <div key={index} className="bg-white rounded-lg p-6 w-full border mb-[20px] border-gray-200">
                  <div className="flex items-start space-x-4">
                    <img
                      src={ticket.profile_pic || "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {reply.isAdminReply ? 'Admin' : ticket.shopName || 'Customer'}
                          </h4>
                          <div className='flex justify-start items-center gap-2'>
                            <p className="text-sm text-gray-500">
                              {reply.repliedBy} &bull; #{reply.reply_id} &bull; {formatDate(reply.repliedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2 text-sm text-gray-700">
                        <div dangerouslySetInnerHTML={{ __html: reply.message }} />
                      </div>
                      <p className="text-gray-700 mt-4 font-semibold">Regards,</p>
                      <p className="text-gray-700">{reply.isAdminReply ? 'Admin' : ticket.shopName || 'Customer'}</p>
                      {reply.attachments && reply.attachments.length > 0 && (
                        <div className="mt-4 py-3 flex items-center space-x-3">
                          <div>
                            <img className='w-[40px]' src="https://isomorphic-furyroad.vercel.app/_next/static/media/doc-icon.c49abc54.svg" alt="" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">{reply.attachments[0]} (size not available)</p>
                            <div className="flex space-x-3 text-sm text-gray-700 mt-1">
                              <button className="hover:underline flex justify-center items-center gap-2">
                                <MdOutlineRemoveRedEye className='text-[18px]' /> Preview
                              </button>
                              <button className="hover:underline flex justify-center items-center gap-2">
                                <PiDownloadSimpleBold /> Download
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Reply form */}
          {ticket && !loadingTicket && (
            <div className="bg-white rounded-lg p-6 w-full border border-gray-200 mb-6">
              <h4 className="text-[15px] lg:text-lg font-medium text-gray-900">Reply to Ticket</h4>
              
              {/* Editor */}
              <div className='mt-[5px] 2xl:mt-[10px]'>
                <SunEditor
                  setContents={content}
                  onChange={setContent}
                  setOptions={{
                    width: "100%",
                    height: 400,
                    buttonList: [
                      ["undo", "redo"],
                      ["formatBlock", "fontSize"],
                      ["bold", "italic", "underline", "strike"],
                      ["fontColor", "hiliteColor"],
                      ["align", "list", "indent", "outdent"],
                      ["table", "link", "image"],
                      ["codeView"],
                    ],
                  }}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* File attachments display */}
              <div className="mt-4 space-y-2">
                {files.map((fileObj, index) => (
                  <div key={index} className="relative p-2 border rounded-md flex items-center bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center">
                        {fileObj.file.type?.startsWith('image/') ? (
                          <img 
                            src={fileObj.uploaded ? 
                              `${base_url}/uploads/${admin_info?._id}/${fileObj.file.name}` : 
                              (fileObj.file instanceof File ? URL.createObjectURL(fileObj.file) : '')}
                            alt={fileObj.file.name}
                            className="w-10 h-10 object-cover mr-2 rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 flex items-center justify-center mr-2 rounded">
                            <MdOutlineAttachFile className="text-gray-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{fileObj.file.name}</p>
                          <p className="text-xs text-gray-500">{Math.round(fileObj.file.size / 1024)} KB</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="h-1.5 bg-gray-200 rounded-full w-full">
                          <div
                            className="h-1.5 bg-brand_color rounded-full transition-all duration-300"
                            style={{ width: `${fileObj.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">
                            {fileObj.progress < 100 ? 'Uploading...' : 'Uploaded'}
                          </span>
                          <span className="text-xs font-medium">
                            {fileObj.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFile(fileObj.id)} 
                      className="ml-2 p-1 hover:bg-gray-200 rounded-full"
                      disabled={isUploading || isLoading}
                    >
                      <IoClose className="text-gray-500 hover:text-red-500 text-lg" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Form actions */}
              <div className='flex justify-start items-center gap-[10px] mt-[10px]'>
                <label
                  onClick={togglePopup}
                  className="relative flex items-center bg-gray-100 cursor-pointer border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-200 transition"
                >
                  <MdOutlineAttachFile className="mr-2 text-gray-600 cursor-pointer" />
                  <span className="text-sm text-gray-600 cursor-pointer">Attach</span>
                </label>
                <button 
                  onClick={handleReplySubmit}
                  disabled={isSubmitting}
                  className='px-4 py-2 bg-brand_color text-white rounded-[5px] text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? 'Sending...' : 'Reply'}
                </button>
              </div>
            </div>
          )}

          {/* Image upload popup */}
          {isPopupOpen && (
            <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
                <div className="p-4 flex justify-between items-center border-b border-gray-300">
                  <h2 className="text-lg font-semibold">Upload Images</h2>
                  <button onClick={togglePopup} className="text-gray-600 hover:text-gray-800">
                    ✕
                  </button>
                </div>

                <div className="flex border-b border-gray-300">
                  <div
                    onClick={() => setActiveTab("library")}
                    className={`w-1/2 py-2 text-center ${activeTab === "library"
                      ? "border-b-2 border-brand_color text-brand_color font-semibold"
                      : "text-gray-600 hover:text-brand_color"
                      }`}
                  >
                    Media Library
                  </div>
                  <div
                    onClick={() => setActiveTab("upload")}
                    className={`w-1/2 py-2 text-center ${activeTab === "upload"
                      ? "border-b-2 border-brand_color text-brand_color font-semibold"
                      : "text-gray-600 hover:text-brand_color"
                      }`}
                  >
                    Upload New
                  </div>
                </div>

                <div className="p-4 h-[400px] overflow-y-auto">
                  {activeTab === "upload" && (
                    <div>
                      <div className="w-full flex h-[150px] justify-between items-center lg:flex-row flex-col gap-[10px]">
                        <div className="w-full lg:w-auto">
                          <input
                            type="file"
                            id="fileUpload"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <label
                            htmlFor="fileUpload"
                            className="block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center transition-all duration-300 ease-in-out"
                          >
                            Upload New
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "library" && (
                    <div>
                      <div className="flex flex-wrap gap-[10px]">
                        {uploadedImages.map((image) => (
                          <div key={image}>
                            <img
                              src={`${base_url}/uploads/${admin_info?._id}/${image}`}
                              alt={image}
                              className="border rounded w-[100px] h-[100px] m-auto cursor-pointer"
                              onClick={() => selectImage(image)}
                            />
                          </div>
                        ))}
                        {uploadedImages.length === 0 && (
                          <div className="col-span-full h-[150px] text-center flex justify-center items-center text-gray-500">
                            No images found.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </section>

      {/* Loader */}
      {isSubmitting && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="w-[60px] h-[60px] relative">
            <div className="absolute inset-0 rounded-full border-[6px] border-t-transparent border-white animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-[4px] border-t-transparent border-brand_color animate-spin-reverse"></div>
          </div>
        </div>
      )}

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
    </section>
  )
}

export default Areplyticket;