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

const Viewuser = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const admin_token = localStorage.getItem("adminToken")
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // User data state
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    username: '',
    email: '',
    phone: '',
    profileImage: '',
    accessLevel: '',
    customPermissions: {}
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${base_url}/super/admin/single-user/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${admin_token}`
          }
        });
        const user = response.data.data;
        
        setUserData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          designation: user.designation || '',
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
          profileImage: user.profileImage || "https://i.ibb.co.com/HBsfNMb/avatar.jpg",
          accessLevel: user.accessLevel || '',
          customPermissions: user.customPermissions || {}
        });
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  function handlesidebar() {
    setactivesidebar(!activesidebar);
  }

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

      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>{userData.firstName} {userData.lastName}</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Users</li>
                <li><IoIosArrowForward /></li>
                <li>{userData.firstName} {userData.lastName}</li>
              </ul>
            </div>
          </div>

          {/* View User Information */}
          <section className='pt-[40px] pb-[30px]'>
            <div className='pt-[15px] lg:pt-[20px]'>
              {/* Profile Image */}
              <div className="relative w-40 h-40 mb-[30px]">
                <div className="w-full h-full rounded-[10px] overflow-hidden border-2 border-gray-300">
                  <img
                    src={userData.profileImage || "https://i.ibb.co.com/HBsfNMb/avatar.jpg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* User Details */}
              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">First Name</label>
                  <div className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100">
                    {userData.firstName}
                  </div>
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Last Name</label>
                  <div className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100">
                    {userData.lastName}
                  </div>
                </div>
              </div>

              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]'>
                <div className='w-full'>
                  <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Designation</label>
                  <div className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100">
                    {userData.designation}
                  </div>
                </div>
              </div>

              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]'>
                <div className='w-[100%]'>
                  <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Username</label>
                  <div className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100">
                    {userData.username}
                  </div>
                </div>
              </div>

              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]'>
                <div className='w-[100%]'>
                  <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Email</label>
                  <div className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100">
                    {userData.email}
                  </div>
                </div>
              </div>

              <div className='w-full flex gap-[10px] lg:gap-[30px] mb-[10px]'>
                <div className='w-[100%]'>
                  <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Phone</label>
                  <div className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100">
                    {userData.phone}
                  </div>
                </div>
              </div>

              {/* User Access */}
              <div className="mb-4">
                <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                  User Access
                </label>
                <div className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100">
                  {userData.accessLevel}
                </div>
              </div>

              {/* Custom Permissions Table */}
              {userData.accessLevel === 'custom' && (
                <div className="mt-4 overflow-x-auto">
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
                      {[
                        { section: "Dashboard", modules: ["Dashboard"] },
                        { section: "Retail Customer", modules: ["Create Cost Plan", "New Category", "Category List", "New Price Plan", "Price Plan List", "New Coupon", "Coupon List", "New Customer", "Customer List", "New Payment", "Payment Transfer", "Setting"] },
                        { section: "Upload Library", modules: ["New Library", "All Library"] },
                        { section: "Appearance", modules: ["New Theme", "Theme List", "New Theme Category", "Theme Category List", "New Theme Tag", "Theme Tag List", "Edit Theme Review", "Theme Review List"] },
                        { section: "Plugin", modules: ["New Plugin", "Plugin List", "New Plugin Category", "Plugin Category List", "New Plugin Tag", "Plugin Tag List", "Edit Plugin Review", "Plugin Review List"] },
                        { section: "Setting", modules: ["Web Setting", "New Country", "Country List", "New Language", "Language List", "New Timezone", "Timezone List", "New Time Format", "Time Format List", "New Date Format", "Date Format List", "New App Integration", "App Integration List"] },
                        { section: "Users", modules: ["New User", "User List", "New User Role", "User Role List"] },
                        { section: "Support Ticket", modules: ["New Ticket", "Ticket List"] }
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
                                  checked={Object.values(userData.customPermissions[module] || {}).every(Boolean)}
                                  disabled
                                />
                              </td>
                              {[...Array(6)].map((_, colIdx) => (
                                <td key={colIdx} className="border border-gray-300 p-2">
                                  <input 
                                    type="checkbox" 
                                    checked={userData.customPermissions[module]?.[colIdx] || false}
                                    disabled
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
              )}
            </div>
          </section>
        </section>
      </section>
    </section>
  )
}

export default Viewuser;