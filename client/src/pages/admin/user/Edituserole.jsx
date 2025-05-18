import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import axios from 'axios';

const Edituserole = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const { id } = useParams();
    const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const admin_token = localStorage.getItem("adminToken")

  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  // State for form data
  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
    permissions: {},
    status: 'Active',
    visibility: 'Publish',
    authorized: 'Approved'
  });
  
  // State for UI
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  // Fetch user role data
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${base_url}/super/admin/user-role/${id}`,{
           headers: {
          'Authorization': `Bearer ${admin_token}`
        }
        });
        const { roleName, description, permissions, status, visibility, authorized } = response.data.data;
        
        setFormData({
          roleName,
          description,
          permissions: permissions || {},
          status,
          visibility,
          authorized
        });
        
      } catch (error) {
        console.error('Error fetching user role:', error);
        showToast('Failed to fetch user role data', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserRole();
  }, [id]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle permission checkbox changes
  const handlePermissionChange = (module, permissionType, value) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [permissionType]: value
        }
      }
    }));
  };
  
  // Handle row checkbox changes (select all for a row)
  const handleRowCheckboxChange = (module, e) => {
    const isChecked = e.target.checked;
    const newPermissions = {
      ...formData.permissions,
      [module]: {
        view_own: isChecked,
        edit_own: isChecked,
        delete_own: isChecked,
        view_other: isChecked,
        edit_other: isChecked,
        delete_other: isChecked
      }
    };
    setFormData(prev => ({
      ...prev,
      permissions: newPermissions
    }));
  };
  
  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 5000);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const admin_id = localStorage.getItem('admin_id'); // Assuming admin ID is stored here
      
      const response = await axios.put(`${base_url}/super/admin/update-user-role/${id}`, {
        ...formData,
        admin_id:admin_info._id,
      },{  headers: {
          'Authorization': `Bearer ${admin_token}`
        }});
      
      showToast('User role updated successfully!');
      
    } catch (error) {
      console.error('Error updating user role:', error);
      showToast('Failed to update user role', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle draft save
  const handleDraft = async () => {
    try {
      setIsLoading(true);
      const admin_id = localStorage.getItem('admin_id');
      
      await axios.put(`/api/superadmin/update-user-role/${id}`, {
        ...formData,
        status: 'Draft',
        admin_id
      });
      
      showToast('Draft saved successfully!');
      
    } catch (error) {
      console.error('Error saving draft:', error);
      showToast('Failed to save draft', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Define sections and modules
  const sections = [
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
  ];
  
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
      
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside/>
      </section>
      
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
        
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>{formData.roleName || 'User Role'}</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward/></li>
                <li>Users</li>
                <li><IoIosArrowForward/></li>
                <li>{formData.roleName || 'User Role'}</li>
              </ul>
            </div>
          </div>
          
          {/* Form Section */}
          <section className='pt-[40px] pb-[30px]'>
            <form onSubmit={handleSubmit} className="pt-[20px]">
              {/* Role Name */}
              <div className="w-[100%] mb-[10px]">
                <label htmlFor="roleName" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                  Role Name
                </label>
                <input
                  id="roleName"
                  name="roleName"
                  type="text"
                  value={formData.roleName}
                  onChange={handleInputChange}
                  placeholder="Enter role name"
                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  required
                />
              </div>

              {/* Description */}
              <div className="w-[100%] mb-[20px]">
                <label htmlFor="description" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                />
              </div>

              {/* Status, Visibility, Authorization */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="status" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="visibility" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                    Visibility
                  </label>
                  <select
                    id="visibility"
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  >
                    <option value="Publish">Publish</option>
                    <option value="Unpublish">Unpublish</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="authorized" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                    Authorization
                  </label>
                  <select
                    id="authorized"
                    name="authorized"
                    value={formData.authorized}
                    onChange={handleInputChange}
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div> */}

              {/* Permissions Table */}
              <div className="w-[100%] mb-6">
                <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                  Permissions
                </label>
                
                <div className="overflow-x-auto mt-3">
                  <table className="min-w-full border-collapse border border-gray-300 text-sm text-center">
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
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">View List</th>
                        <th className="border border-gray-300 p-2">Select All</th>
                        <th className="border border-gray-300 p-2">View</th>
                        <th className="border border-gray-300 p-2">Edit</th>
                        <th className="border border-gray-300 p-2">Delete</th>
                        <th className="border border-gray-300 p-2">View</th>
                        <th className="border border-gray-300 p-2">Edit</th>
                        <th className="border border-gray-300 p-2">Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {sections.map((sectionData, sectionIdx) => (
                        <React.Fragment key={sectionIdx}>
                          <tr className="bg-gray-100 font-bold">
                            <td className="border border-gray-300 p-2 text-left" colSpan={8}>
                              {sectionData.section}
                            </td>
                          </tr>
                          {sectionData.modules.map((module, idx) => {
                            const modulePermissions = formData.permissions[module] || {};
                            return (
                              <tr key={`${sectionIdx}-${idx}`}>
                                <td className="border text-left border-gray-300 p-2">{module}</td>
                                <td className="border border-gray-300 p-2">
                                  <input
                                    type="checkbox"
                                    checked={
                                      modulePermissions.view_own &&
                                      modulePermissions.edit_own &&
                                      modulePermissions.delete_own &&
                                      modulePermissions.view_other &&
                                      modulePermissions.edit_other &&
                                      modulePermissions.delete_other
                                    }
                                    onChange={(e) => handleRowCheckboxChange(module, e)}
                                  />
                                </td>
                                <td className="border border-gray-300 p-2">
                                  <input
                                    type="checkbox"
                                    checked={modulePermissions.view_own || false}
                                    onChange={(e) => handlePermissionChange(module, 'view_own', e.target.checked)}
                                  />
                                </td>
                                <td className="border border-gray-300 p-2">
                                  <input
                                    type="checkbox"
                                    checked={modulePermissions.edit_own || false}
                                    onChange={(e) => handlePermissionChange(module, 'edit_own', e.target.checked)}
                                  />
                                </td>
                                <td className="border border-gray-300 p-2">
                                  <input
                                    type="checkbox"
                                    checked={modulePermissions.delete_own || false}
                                    onChange={(e) => handlePermissionChange(module, 'delete_own', e.target.checked)}
                                  />
                                </td>
                                <td className="border border-gray-300 p-2">
                                  <input
                                    type="checkbox"
                                    checked={modulePermissions.view_other || false}
                                    onChange={(e) => handlePermissionChange(module, 'view_other', e.target.checked)}
                                  />
                                </td>
                                <td className="border border-gray-300 p-2">
                                  <input
                                    type="checkbox"
                                    checked={modulePermissions.edit_other || false}
                                    onChange={(e) => handlePermissionChange(module, 'edit_other', e.target.checked)}
                                  />
                                </td>
                                <td className="border border-gray-300 p-2">
                                  <input
                                    type="checkbox"
                                    checked={modulePermissions.delete_other || false}
                                    onChange={(e) => handlePermissionChange(module, 'delete_other', e.target.checked)}
                                  />
                                </td>
                              </tr>
                            );
                          })}
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
                  onClick={handleDraft}
                  className='px-[30px] py-[8px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'
                >
                  <LuSaveAll className='text-[18px]'/> Draft
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
  );
};

export default Edituserole;