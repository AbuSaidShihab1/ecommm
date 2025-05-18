import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
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

const Viewcategory = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the category ID from URL params
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [showmodal, setmodal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch category data on component mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${base_url}/super/admin/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        setCategoryData(response.data.data);
        if (response.data.data.image) {
          setProfileImage(response.data.data.image);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch category');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

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

  // Handle image 
  const [profileImage, setProfileImage] = useState(documentation_img);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Image upload popup
  const [activeTab, setActiveTab] = useState("library");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const user_access_data = [
    { id: 1, name: "Administration" },
    { id: 2, name: "Sales Manager" },
    { id: 3, name: "Marketing Manager" },
  ];

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages((prev) => [...prev, { id: Date.now(), title: `Image ${prev.length + 1}`, src: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectImage = (image) => {
    setProfileImage(image.src);
    setIsPopupOpen(false);
  };

  const filteredImages = uploadedImages.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to check if a permission is enabled
  const hasPermission = (moduleName) => {
    if (!categoryData?.permissions) return false;
    return categoryData.permissions[moduleName] === true;
  };

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-full h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!categoryData) {
    return <div className="w-full h-screen flex items-center justify-center">No category data found</div>;
  }

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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>{categoryData.name}</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Categories</li>
                <li><IoIosArrowForward /></li>
                <li>{categoryData.name}</li>
              </ul>
            </div>
            <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color  justify-center items-center rounded-[5px] cursor-pointer'>
              <BiImport className='text-[25px]' />
              Import
            </button>
          </div>

          {/* Category details */}
          <section className='pt-[40px] pb-[30px]'>
            <form action="" className="pt-[20px]">
              {/* Category Image */}
              <div className="relative w-40 h-40 mb-[30px]">
                <div className="w-full h-full rounded-[10px] overflow-hidden border-2 border-gray-300">
                  <img
                    src={profileImage}
                    alt="Category"
                    className="w-full h-full object-cover"
                  />
                </div>
      
              </div>

              {/* Name */}
              <div className="w-[100%] mb-[10px]">
                <label
                  htmlFor="roleName"
                  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                >
                  Name
                </label>
                <input
                  id="roleName"
                  type="text"
                  value={categoryData.name}
                  readOnly
                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100"
                />
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
                  type="text"
                  value={categoryData.description}
                  readOnly
                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100"
                />
              </div>

              {/* Status */}
              <div className="w-[100%] mb-[20px]">
                <label
                  htmlFor="status"
                  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                >
                  Status
                </label>
                <input
                  id="status"
                  type="text"
                  value={categoryData.status}
                  readOnly
                  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100"
                />
              </div>

              {/* Permissions */}
              <div className="w-[100%]">
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
                        <>
                          <tr key={sectionIdx} className="bg-gray-100 font-bold">
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
                                  checked={hasPermission(module)}
                                  readOnly
                                />
                              </td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </form>
          </section>
        </section>
      </section>
    </section>
  )
}

export default Viewcategory