import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { MdOutlineAttachFile } from 'react-icons/md';
import { IoClose } from "react-icons/io5";
import axios from 'axios';

const Newticket = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const admin_token = localStorage.getItem("adminToken");
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // Form state
 // Customer and suggestion states
  const [customers, setCustomers] = useState([]);
  const [shopNameSuggestions, setShopNameSuggestions] = useState([]);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [showShopSuggestions, setShowShopSuggestions] = useState(false);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    accountHolder:admin_info.email,
    shopName: '',
    email: '',
    subject: '',
    message: '',
    attachments: [],
    admin_id: admin_info._id
  });

  // Validation errors
  const [errors, setErrors] = useState({
    shopName: '',
    email: '',
    subject: '',
    message: ''
  });

  // File upload state
  const [files, setFiles] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("library");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // New states for loading and toast
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'

  // Customers
useEffect(()=>{
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/customers`);
      if (res.data.success) {
        setCustomers(res.data.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    } 
  };
  fetchCustomers();
},[])
  // Scroll effect
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);
// Refs for suggestion dropdowns
  const shopNameRef = useRef(null);
  const emailRef = useRef(null);

  // Close suggestion dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopNameRef.current && !shopNameRef.current.contains(event.target)) {
        setShowShopSuggestions(false);
      }
      if (emailRef.current && !emailRef.current.contains(event.target)) {
        setShowEmailSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  
  }, [toastMessage]);
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
        setToastMessage('Error loading media library');
        setToastType('error');
      }
    };
    fetchImages();
  }, []);

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      shopName: '',
      email: '',
      subject: '',
      message: ''
    };

    if (!formData.shopName.trim()) {
      newErrors.shopName = 'Shop name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim() || formData.message === '<p><br></p>') {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  // Shop name input change handler with suggestions
  const handleShopNameInputChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      shopName: value
    });
    
    if (errors.shopName) {
      setErrors({
        ...errors,
        shopName: ''
      });
    }

    if (value.length > 0) {
      console.log(value)
      const filtered = customers
        .filter(customer => 
          customer.organizationName?.toLowerCase().includes(value.toLowerCase()))
        .map(customer => customer.organizationName)
        .filter((name, index, self) => self.indexOf(name) === index)// Remove duplicates
      setShopNameSuggestions(filtered);
      setShowShopSuggestions(true);
    } else {
      setShopNameSuggestions([]);
      setShowShopSuggestions(false);
    }
  };

  // Email input change handler with suggestions
  const handleEmailInputChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      email: value
    });
    
    if (errors.email) {
      setErrors({
        ...errors,
        email: ''
      });
    }

    if (value.length > 0) {
      const filtered = customers
        .filter(customer => 
          customer.email?.toLowerCase().includes(value.toLowerCase()))
        .map(customer => customer.email);
      setEmailSuggestions(filtered);
      setShowEmailSuggestions(true);
    } else {
      setEmailSuggestions([]);
      setShowEmailSuggestions(false);
    }
  };

  // Select shop name from suggestions
  const selectShopName = (name) => {
    setFormData({
      ...formData,
      shopName: name
    });
    setShowShopSuggestions(false);
    
    // Find the corresponding email for this shop name
    const customer = customers.find(c => c.organizationName === name);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        email: customer.email
      }));
    }
  };

  // Select email from suggestions
  const selectEmail = (email) => {
    setFormData({
      ...formData,
      email: email
    });
    setShowEmailSuggestions(false);
    
    // Find the corresponding shop name for this email
    const customer = customers.find(c => c.email === email);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        shopName: customer.organizationName
      }));
    }
  };
  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Editor change handler
  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      message: content
    });
    
    if (errors.message) {
      setErrors({
        ...errors,
        message: ''
      });
    }
  };

  // File upload handlers
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    // Filter out duplicates
    const newFiles = selectedFiles.filter(newFile => 
      !files.some(existingFile => 
        existingFile.file.name === newFile.name && 
        existingFile.file.size === newFile.size
      )
    );

    if (newFiles.length === 0) {
      setToastMessage('Some files are already selected');
      setToastType('error');
      return;
    }

    const fileObjects = newFiles.map((file) => ({
      file,
      progress: 0,
      uploaded: false,
      id: Date.now() + Math.random().toString(36).substr(2, 9)
    }));

    setFiles(prev => [...prev, ...fileObjects]);
    setIsUploading(true);
    
    // Upload each file
    fileObjects.forEach(fileObj => {
      uploadFileToServer(fileObj.file).then(() => {
        setIsUploading(false);
      });
    });
  };
 // Image handling functions
 const togglePopup = () => {
  setIsPopupOpen(!isPopupOpen);
};

// const selectImage = (img) => {
//   const imageUrl = `http://localhost:8080/uploads/${admin_info?._id}/${img}`;
//   setProfileImage(imageUrl);
//   setFormData({
//     ...formData,
//     image: imageUrl
//   });
//   setIsPopupOpen(false);
//   setErrors({
//     ...errors,
//     image: ''
//   });
// };

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.match('image.*')) {
    setErrors({ ...errors, image: 'Only image files are allowed' });
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setErrors({ ...errors, image: 'File size must be less than 5MB' });
    return;
  }

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
console.log(uploadResponse)
    if (uploadResponse.data.image) {
      const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`);
      console.log(fetchResponse)
      if (fetchResponse.data.images) {
        setUploadedImages(fetchResponse.data.images);
         console.log(fetchResponse)
        setActiveTab("library");
      }
    }
  } catch (error) {
    console.error(error);
    setErrors({ ...errors, image: 'Error uploading file' });
  }
};
  // Actual file upload function
  const uploadFileToServer = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    console.log(file)
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
           console.log(fetchResponse)
          setActiveTab("library");
        }
      }
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, image: 'Error uploading file' });
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

  // Media library image selection
  const selectImage = (image) => {
    const isAlreadySelected = files.some(
      file => file.file.name === image && file.uploaded
    );

    if (isAlreadySelected) {
      setToastMessage('This image is already attached');
      setToastType('error');
      return;
    }

    const newFile = {
      file: {
        name: image,
        size: 0,
        type: 'image/jpeg'
      },
      progress: 0,
      uploaded: false,
      id: Date.now() + Math.random().toString(36).substr(2, 9)
    };

    setFiles(prev => [...prev, newFile]);
    setIsUploading(true);

    // Simulate progress for library selection
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles(prev => prev.map(f => 
        f.id === newFile.id ? { ...f, progress } : f
      ));
      
      if (progress >= 100) {
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === newFile.id ? { ...f, progress: 100, uploaded: true } : f
        ));
        setFormData(prev => ({
          ...prev,
          attachments: [...prev.attachments, image]
        }));
        setIsUploading(false);
      }
    }, 50);
    setIsPopupOpen(false)
  };

  // Form submission with 2-second delay
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Add 2-second delay before submitting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      try {
        const response = await axios.post(`${base_url}/super/admin/create-ticket`, formData, {
          headers: {
            Authorization: `Bearer ${admin_token}`
          }
        });

        if (response.data.success) {
          setToastMessage('Ticket created successfully!');
          setToastType('success');
        } else {
          console.error('Error creating ticket:', response.data.message);
          setToastMessage(response.data.message || 'Error creating ticket');
          setToastType('error');
        }
      } catch (error) {
        console.error('Error creating ticket:', error);
        setToastMessage(error.response?.data?.message || 'Error creating ticket');
        setToastType('error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Save as draft with 2-second delay
  const handleSaveDraft = async () => {
    setIsLoading(true);
    
    // Add 2-second delay before submitting
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const response = await axios.post(`${base_url}/api/tickets/draft`, {
        ...formData,
        status: 'draft'
      }, {
        headers: {
          Authorization: `Bearer ${admin_token}`
        }
      });

      if (response.data.success) {
        setToastMessage('Draft saved successfully!');
        setToastType('success');
        navigate('/tickets/drafts');
      } else {
        setToastMessage(response.data.message || 'Error saving draft');
        setToastType('error');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      setToastMessage(error.response?.data?.message || 'Error saving draft');
      setToastType('error');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      {/* Loading overlay */}
      {isLoading && (
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

      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[20px] lg:px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>New Ticket</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Support Ticket</li>
                <li><IoIosArrowForward /></li>
                <li>New Ticket</li>
              </ul>
            </div>
            <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
              <BiImport className='text-[25px]' />
              Import
            </button>
          </div>

          <section className='pt-[40px] pb-[30px]'>
            <form onSubmit={handleSubmit} className='pt-[20px]'>
              <div className='w-[100%] mb-[20px]'>
                <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Account Holder</label>
                <input
                  type="text"
                  value={formData.accountHolder}
                  disabled
                  placeholder='Account Holder'
                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                />
              </div>

         
              <div className='w-[100%] mb-[20px] relative' ref={shopNameRef}>
                <label htmlFor="shopName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Shop Name</label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleShopNameInputChange}
                  onFocus={() => formData.shopName.length > 0 && setShowShopSuggestions(true)}
                  placeholder='Shop Name'
                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.shopName ? 'border-red-500' : 'border-[#eee]'}`}
                />
                {errors.shopName && <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>}
                
                {showShopSuggestions && shopNameSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {shopNameSuggestions.map((name, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectShopName(name)}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className='w-[100%] mb-[20px] relative' ref={emailRef}>
                <label htmlFor="email" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEmailInputChange}
                  onFocus={() => formData.email.length > 0 && setShowEmailSuggestions(true)}
                  placeholder='Email'
                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.email ? 'border-red-500' : 'border-[#eee]'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                
                {showEmailSuggestions && emailSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {emailSuggestions.map((email, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectEmail(email)}
                      >
                        {email}
                      </div>
                    ))}
                  </div>
                )}
              </div>


              <div className='w-[100%] mb-[20px]'>
                <label htmlFor="subject" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder='Subject'
                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.subject ? 'border-red-500' : 'border-[#eee]'}`}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div className='w-[100%] mb-[20px]'>
                <label htmlFor="message" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Message</label>
                <div className='mt-[3px] 2xl:mt-[7px]'>
                  <SunEditor
                    setContents={formData.message}
                    onChange={handleEditorChange}
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
                </div>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* File attachments display */}
              <div className="mt-4 space-y-2">
                {files.map((fileObj) => (
                  <div key={fileObj.id} className="relative p-2 border rounded-md flex items-center bg-gray-50">
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

              {/* Action buttons */}
              <div className='flex justify-between items-center gap-[10px] mt-[15px]'>
                <label
                  onClick={() => setIsPopupOpen(true)}
                  className="relative flex items-center bg-gray-100 cursor-pointer border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-200 transition"
                  disabled={isUploading || isLoading}
                >
                  <MdOutlineAttachFile className="mr-2 text-gray-600 cursor-pointer" />
                  <span className="text-sm text-gray-600 cursor-pointer">Attach</span>
                </label>
                <div className='flex justify-center items-center gap-2'>
                  <button 
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={isUploading || isLoading}
                    className={`px-[30px] py-[8px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer ${(isUploading || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <LuSaveAll className='text-[18px]' />Draft
                  </button>
                  <button 
                    type="submit"
                    disabled={isUploading || isLoading}
                    className={`px-[30px] py-[8px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center border-[2px] border-brand_color items-center rounded-[5px] cursor-pointer ${(isUploading || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </section>
        </section>

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
                                onChange={handleFileUpload}
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
                                  src={`http://localhost:8080/uploads/${admin_info?._id}/${image}`}
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
  );
};

export default Newticket;