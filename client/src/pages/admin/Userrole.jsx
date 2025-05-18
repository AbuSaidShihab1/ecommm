import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import axios from 'axios';

const Userrole = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar, adminData } = useContext(Contextapi);
  const [showmodal, setmodal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const admin_token = localStorage.getItem("adminToken")
  // Form state
  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
    permissions: {}
  });
  
  const [errors, setErrors] = useState({
    roleName: '',
    description: ''
  });

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle permission checkbox changes
  const handlePermissionChange = (module, permissionType, isChecked) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [permissionType]: isChecked
        }
      }
    }));
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.roleName.trim()) {
      newErrors.roleName = 'Role name is required';
      valid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
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
    
    setIsLoading(true);
    
    try {
      const payload = {
        ...formData,
        admin_id: admin_info._id // Assuming adminData is available in your context
      };

      const response = await axios.post(`${base_url}/super/admin/create-user-role`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin_token}` // Assuming you store token in localStorage
        }
      });
      
      console.log('Role created:', response.data);
      
      setToastMessage('User role created successfully!');
      setToastType('success');
      
      // Reset form after successful submission
      setFormData({
        roleName: '',
        description: '',
        permissions: {}
      });
      

      
    } catch (error) {
      console.error('Error creating role:', error.response?.data || error.message);
      setToastMessage(error.response?.data?.msg || 'Failed to create user role. Please try again.');
      setToastType('error');
    } finally {
      setIsLoading(false);
      
      // Hide toast after 5 seconds
      setTimeout(() => {
        setToastMessage('');
      }, 5000);
    }
  };

  // Handle draft submission
  const handleDraft = (e) => {
    e.preventDefault();
    // For draft, we might want to save to localStorage or a different endpoint
    console.log('Draft data:', formData);
    setToastMessage('Draft saved locally!');
    setToastType('success');
    
    // Save to localStorage
    localStorage.setItem('userRoleDraft', JSON.stringify(formData));
    
    setTimeout(() => {
      setToastMessage('');
    }, 5000);
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
      
      {/* Toast notification */}
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
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>New User Role</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Users</li>
                <li><IoIosArrowForward /></li>
                <li>New User Role</li>
              </ul>
            </div>
            <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
              <BiImport className='text-[25px]' />
              Import
            </button>
          </div>
          
          {/* Form section */}
          <section className='pt-[40px] pb-[30px]'>
            <form onSubmit={handleSubmit}>
              {/* Role Name */}
              <div className="w-[100%] mb-[10px]">
                <label
                  htmlFor="roleName"
                  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                >
                  Name
                </label>
                <input
                  id="roleName"
                  name="roleName"
                  type="text"
                  value={formData.roleName}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] p-[12px] ${errors.roleName ? 'border-red-500' : 'border-[#eee]'}`}
                />
                {errors.roleName && <p className="text-red-500 text-sm mt-1">{errors.roleName}</p>}
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
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Select User Access */}
              <div className="w-[100%]">
                <label
                  htmlFor="userAccess"
                  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                >
                  Select User Access
                </label>
                
                {/* Table Section */}
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 text-sm text-center">
                    {/* Table Header */}
                    <thead className='uppercase'>
                      <tr>
                        <th className="border border-gray-300 p-2 text-white bg-[#22C55E]">Module</th>
                        <th colSpan={1} className="border border-gray-300 p-2 bg-blue-500 text-white">
                          AUTO
                        </th>
                        <th colSpan={3} className="border border-gray-300 p-2 bg-orange-500 text-white">
                          OWN DATA
                        </th>
                        <th colSpan={3} className="border border-gray-300 p-2 bg-red-500 text-white">
                          OTHER USER DATA
                        </th>
                      </tr>
                      <tr className="bg-gray-200 ">
                        <th className="border border-gray-300 p-2 ">View List</th>
                        <th className="border border-gray-300 p-2">Select All</th>
                        <th className="border border-gray-300 p-2">View</th>
                        <th className="border border-gray-300 p-2">Edit</th>
                        <th className="border border-gray-300 p-2">Delete</th>
                        <th className="border border-gray-300 p-2">View</th>
                        <th className="border border-gray-300 p-2">Edit</th>
                        <th className="border border-gray-300 p-2">Delete</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {[
                        {
                          section: "Dashboard",
                          modules: ["Dashboard"]
                        },
                        {
                          section: "Retail Customer",
                          modules: [
                            "Create Cost Plan",
                            "New Category",
                            "Category List",
                            "New Price Plan",
                            "Price Plan List",
                            "New Coupon",
                            "Coupon List",
                            "New Customer",
                            "Customer List",
                            "New Payment",
                            "Payment Transfer",
                            "Setting"
                          ]
                        },
                        {
                          section: "Upload Library",
                          modules: ["New Library", "All Library"]
                        },
                        {
                          section: "Appearance",
                          modules: [
                            "New Theme",
                            "Theme List",
                            "New Theme Category",
                            "Theme Category List",
                            "New Theme Tag",
                            "Theme Tag List",
                            "Edit Theme Review",
                            "Theme Review List"
                          ]
                        },
                        {
                          section: "Plugin",
                          modules: [
                            "New Plugin",
                            "Plugin List",
                            "New Plugin Category",
                            "Plugin Category List",
                            "New Plugin Tag",
                            "Plugin Tag List",
                            "Edit Plugin Review",
                            "Plugin Review List"
                          ]
                        },
                        {
                          section: "Setting",
                          modules: [
                            "Web Setting",
                            "New Country",
                            "Country List",
                            "New Language",
                            "Language List",
                            "New Timezone",
                            "Timezone List",
                            "New Time Format",
                            "Time Format List",
                            "New Date Format",
                            "Date Format List",
                            "New App Integration",
                            "App Integration List"
                          ]
                        },
                        {
                          section: "Users",
                          modules: [
                            "New User",
                            "User List",
                            "New User Role",
                            "User Role List"
                          ]
                        },
                        {
                          section: "Support Ticket",
                          modules: [
                            "New Ticket",
                            "Ticket List"
                          ]
                        }
                      ].map((sectionData, sectionIdx) => (
                        <React.Fragment key={sectionIdx}>
                          <tr className="bg-gray-100 font-bold">
                            <td className="border border-gray-300 p-2 text-left" colSpan={8}>
                              {sectionData.section}
                            </td>
                          </tr>
                          {sectionData.modules.map((module, idx) => (
                            <tr key={`${sectionIdx}-${idx}`}>
                              <td className="border text-left border-gray-300 p-2">{module}</td>
                              <td className="border border-gray-300 p-2">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    const row = e.target.closest("tr");
                                    row
                                      .querySelectorAll("input[type=checkbox]")
                                      .forEach((checkbox) => {
                                        checkbox.checked = e.target.checked;
                                        const permissionType = checkbox.getAttribute('data-permission');
                                        if (permissionType) {
                                          handlePermissionChange(module, permissionType, e.target.checked);
                                        }
                                      });
                                  }}
                                />
                              </td>
                              {['view_own', 'edit_own', 'delete_own', 'view_other', 'edit_other', 'delete_other'].map((permission, colIdx) => (
                                <td key={colIdx} className="border border-gray-300 p-2">
                                  <input 
                                    type="checkbox" 
                                    data-permission={permission}
                                    onChange={(e) => handlePermissionChange(module, permission, e.target.checked)}
                                    checked={formData.permissions[module]?.[permission] || false}
                                  />
                                </td>
                              ))}
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
                  onClick={handleDraft}
                  className='px-[30px] py-[8px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'
                >
                  <LuSaveAll className='text-[18px]'/>Draft
                </button>
                <button 
                  type="submit"
                  className='px-[30px] py-[8px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center border-[2px] border-brand_color items-center rounded-[5px] cursor-pointer'
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </section>
      </section>
    </section>
  )
}

export default Userrole