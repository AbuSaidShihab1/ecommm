import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { Contextapi } from '../../../context/Appcontext';
import documentation_img from "../../../assets/documentation.png"
import axios from 'axios';
import Dashboardheader from '../../../components/dashboard/Dashboardheader';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';

const Newcategory = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"))
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const [showmodal, setmodal] = useState(false);
  const uploadpost = () => {
    setmodal(true)
  }

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: documentation_img,
    permissions: {} // Simple object for permissions
  });


  const [errors, setErrors] = useState({
    name: '',
    description: '',
    image: ''
  });
 // Handle form input changes
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

// Handle permission changes
const handlePermissionChange = (module, isChecked) => {
  setFormData(prev => ({
    ...prev,
    permissions: {
      ...prev.permissions,
      [module]: isChecked
    }
  }));
};

// Handle select all for a row
const handleRowSelectAll = (module, e) => {
  handlePermissionChange(module, e.target.checked);
};
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

  // Handle image 
  const [profileImage, setProfileImage] = useState(documentation_img);

  // Image upload popup
  const [currentImageType, setCurrentImageType] = useState('favicon');
  const [activeTab, setActiveTab] = useState("library");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Toggle popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`);
      if (fetchResponse.data.images) {
        setUploadedImages(fetchResponse.data.images);
      }
    };
    fetchImages();
  }, []);

  // Handle image selection from the library
  const selectImage = (img) => {
    const imageUrl = `http://localhost:8080/uploads/${admin_info?._id}/${img}`;
    setProfileImage(imageUrl);
    setFormData({
      ...formData,
      image: imageUrl
    });
    setIsPopupOpen(false);
  };

  // Handle file upload
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
      const uploadResponse = await axios.post(`${base_url}/api/upload/image/admin-upload-image/${admin_info._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (uploadResponse.data.imagePath) {
        const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`);
        if (fetchResponse.data.images) {
          setUploadedImages(fetchResponse.data.images);
          setActiveTab("library");
        }
      }
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, image: 'Error uploading file' });
    }
  };

  // Form validation
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      description: '',
      image: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      valid = false;
    }

    if (!formData.image || formData.image === documentation_img) {
      newErrors.image = 'Category image is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  try {
    const response = await axios.post(`${base_url}/super/admin/categories`, {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      permissions: formData.permissions,
      admin_id: admin_info._id
    }, {
      headers: {
        'Authorization': `Bearer ${admin_info.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.success) {
      alert('Category created successfully!');
      navigate('/categories');
    } else {
      alert('Failed to create category: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error creating category:', error);
    alert('An error occurred while creating the category');
  }
};

  // Handle save as draft
  const handleSaveDraft = async () => {
    try {
      const response = await axios.post(`${base_url}/api/categories/draft`, {
        ...formData,
        status: 'draft',
        createdBy: admin_info._id
      }, {
        headers: {
          'Authorization': `Bearer ${admin_info.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        alert('Draft saved successfully!');
        navigate('/categories'); // Redirect to categories list
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('An error occurred while saving the draft');
    }
  };

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboardheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>New Category</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Retail Customer</li>
                <li><IoIosArrowForward /></li>
                <li>New Category</li>
              </ul>
            </div>
            <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color  justify-center items-center rounded-[5px] cursor-pointer'>
              <BiImport className='text-[25px]' />
              Import
            </button>
          </div>
          {/* ------------------new customer table----------------- */}
          <section className='pt-[40px] pb-[30px]'>
            {/* -------------------form---------------------- */}
            <form onSubmit={handleSubmit} className="pt-[20px]">
              {/* Category Image */}
              <div className="relative w-40 h-40 mb-[30px]">
                <div className="w-full h-full rounded-[10px] overflow-hidden border-2 border-gray-300">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                      <span className="text-sm">Upload Image</span>
                    </div>
                  )}
                </div>

                <label
                  htmlFor="profileImageInput"
                  onClick={togglePopup}
                  className="absolute bottom-1 right-2 bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-500"
                >
                  <FaCamera className="w-4 h-4" />
                </label>

                {isPopupOpen && (
                  <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
                      <div className="p-4 flex justify-between items-center border-b border-gray-300">
                        <h2 className="text-lg font-semibold">Upload Images</h2>
                        <button onClick={togglePopup} className="text-gray-600 hover:text-gray-800">
                          ✕
                        </button>
                      </div>

                      <div className="flex border-b border-gray-300 ">
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

                      <div className="p-4  h-[200px] overflow-y-auto">
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
                                    className="border rounded w-[100px] h-[100px] m-auto cursor-pointer "
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
              </div>
              {errors.image && <p className="text-red-500 text-sm -mt-5 mb-3">{errors.image}</p>}

              {/* Category Name */}
              <div className="w-[100%] mb-[10px]">
                <label
                  htmlFor="name"
                  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.name ? 'border-red-500' : 'border-[#eee]'}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Description */}
              <div className="w-[100%] mb-[20px]">
                <label
                  htmlFor="description"
                  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                >
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.description ? 'border-red-500' : 'border-[#eee]'}`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              {/* Page Access */}
              <div className="w-[100%] ">
                <label
                  htmlFor="userAccess"
                  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                >
                  Page Access
                </label>
                {/* Table Section */}
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 text-sm text-center">
                    {/* Table Header */}
                    <thead className='uppercase'>
                      <tr>
                        <th className="border border-gray-300 p-2 text-white bg-[#22C55E]">Module</th>
                        <th colSpan={1} className="border border-gray-300 p-2 bg-blue-500 text-white">
                          Category
                        </th>
                      </tr>
                      <tr className="bg-gray-200 ">
                        <th className="border border-gray-300 p-2 ">View List</th>
                        <th className="border border-gray-300 p-2">Select All</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {[
                        {
                          "section": "Dashboard",
                          "modules": ["Dashboard"]
                        },
                        {
                          "section": "Pages",
                          "modules": ["New Page", "Page List"]
                        },
                        {
                          "section": "Contents",
                          "modules": [
                            "New Post",
                            "Post List",
                            "New Post Category",
                            "Post Category List",
                            "New Post Tag",
                            "Post Tag List",
                            "Edit Post Comment",
                            "Post Comment List"
                          ]
                        },
                        {
                          "section": "Products",
                          "modules": [
                            "New Product",
                            "Product List",
                            "New Category",
                            "Category List",
                            "New Tag",
                            "Tag List",
                            "New Brand",
                            "Brand List",
                            "Edit Review",
                            "Review List",
                            "New Coupon",
                            "Coupon List",
                            "New Order",
                            "Order List",
                            "New Delivery",
                            "Delivery List",
                            "New Customer",
                            "Customer List",
                            "Setting"
                          ]
                        },
                        {
                          "section": "Upload Library",
                          "modules": ["New Library", "All Library"]
                        },
                        {
                          "section": "Appearance",
                          "modules": ["Themes", "Web Menus", "Required Plugins", "Install Plugins"]
                        },
                        {
                          "section": "Setting",
                          "modules": [
                            "Web Setting",
                            "Billing Update",
                            "Payment Transfer",
                            "App Integration",
                          ]
                        },
                        {
                          "section": "Users",
                          "modules": [
                            "New User",
                            "User List",
                            "New User Role",
                            "User Role List"
                          ]
                        },
                        {
                          "section": "Support Ticket",
                          "modules": ["New Ticket", "Ticket List"]
                        }
                      ].map((sectionData, sectionIdx) => (
                        <React.Fragment key={sectionIdx}>
                          <tr className="bg-gray-100 font-bold">
                            <td className="border border-gray-300 p-2 text-left" colSpan={8}>
                              {sectionData.section}
                            </td>
                          </tr>
                          {sectionData.modules.map((module, idx) => (
                            <tr key={idx}>
                              <td className="border text-left border-gray-300 p-2">{module}</td>
                              <td className="border border-gray-300 p-2">
                                <input
                                  type="checkbox"
                                  name="permission"
                                  value={module}
                                  checked={!!formData.permissions[module]}
                                  onChange={(e) => handlePermissionChange(module, e.target.checked)}
                                />
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Buttons */}
              <div className='flex justify-end items-center gap-[10px] mt-[30px]'>
                <button 
                  type="button"
                  onClick={handleSaveDraft}
                  className='px-[30px] py-[8px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'
                >
                  <LuSaveAll className='text-[18px]' />Draft
                </button>
                <button 
                  type="submit"
                  className='px-[30px] py-[8px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center border-[2px] border-brand_color items-center rounded-[5px] cursor-pointer'
                >
                  Submit
                </button>
              </div>
            </form>
            {/* -------------------form---------------------- */}
          </section>
          {/* ------------------------new customer table-------------------- */}
        </section>
      </section>
    </section>
  )
}

export default Newcategory