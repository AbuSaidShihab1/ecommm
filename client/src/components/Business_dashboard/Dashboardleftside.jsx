import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserLarge } from "react-icons/fa6";
import { BiGridAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { Contextapi } from '../../context/Appcontext';
import logo from "../../assets/logo.png";
import { MdOutlineCampaign } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { IoPricetagsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdSupportAgent } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { RiPagesLine } from "react-icons/ri";
import { TbBrandBlogger } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { PiSlideshowBold } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiBloggerLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbLibraryPhoto } from "react-icons/tb";
import { LuFullscreen } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { LuCircleUserRound } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
const Dashboardleftside = () => {
  const { activesidebar, setactivesidebar } = useContext(Contextapi);
  const navigate = useNavigate();

  // Retrieve submenu states from sessionStorage
  const getInitialSubmenuState = () => {
    const storedState = sessionStorage.getItem("submenuStates");
    return storedState ? JSON.parse(storedState) : {
      pages: false,
      contents: false,
      products: false,
      uploadLibrary: false,
      appearance: false,
      setting: false,
      users: false,
      supportTicket: false,
    };
  };

  const [submenuStates, setSubmenuStates] = useState(getInitialSubmenuState);

  useEffect(() => {
    sessionStorage.setItem("submenuStates", JSON.stringify(submenuStates));
  }, [submenuStates]);

  // Toggle submenu with smooth transition
  const toggleSubmenu = (menu) => {
    setSubmenuStates((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  // Logout function
  const logoutfunction = () => {
    if (confirm("Are you sure?")) {
      localStorage.removeItem("admin_info");
      navigate("/");
    }
  };

  // Close sidebar
  const closesidebar = () => setactivesidebar(false);

  return (
    <>
      <section className={activesidebar ? 'w-[100%] z-[10000] xl:block hidden border-r-[1px] border-[#eee] h-[100%] bg-white relative transition-all duration-300 top-0 left-[-100%]' : 'w-[100%] z-[1000] h-[100%] border-r-[1px] border-[#eee] transition-all xl:block hidden duration-300 bg-white relative left-0 top-0 overflow-y-auto no-scrollbar'}>
        <div className='w-full h-[100vh] overflow-y-auto no-scrollbar px-[6px] xl:px-[10px] 2xl:px-[20px]'>
          <div className="logo w-full h-[10vh] flex justify-start items-center p-[13px]">
            <img className='w-[130px] xl:w-[160px]' src={logo} alt="Logo" />
          </div>
          <ul className='sellerheader pt-[10px]'>
            <li className='mb-[10px]'>
              <NavLink to="/dashboard" className="hover:bg-[#F1F1F1] hover:text-black flex rounded-[6px] justify-start items-center gap-[10px] px-[13px] py-[10px] text-[#0A0A0C] xl:text-[14px] 2xl:text-[15px] font-[500]">
                <LuLayoutDashboard className="text-[18px] text-neutral-700" /> <span className='text-nowrap text-gray-700 text-[15px]'>Dashboard</span>
              </NavLink>
            </li>

            {[
              { key: "pages", label: "Pages", icon: <MdOutlineInsertPageBreak className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/pages/new-page", name: "New Page" },
                { path: "/pages/page-list", name: "All Pages" },
              ]},
              { key: "contents", label: "Contents", icon: <RiBloggerLine className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/contents/post-content-list", name: "All Posts" },
                { path: "/contents/post-content-category-list", name: "Post Categories" },
                { path: "/contents/post-content-tag-list", name: "Post Tags" },
                { path: "/contents/post-content-comment-list", name: "Post Comments" },
              ]},
              { key: "products", label: "Products", icon: <HiOutlineShoppingBag className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/products/product-list", name: "All Products" },
                { path: "/products/product-category-list", name: "Categories" },
                { path: "/products/product-tag-list", name: "Tags" },
                { path: "/products/product-brand-list", name: "Brands" },
                { path: "/products/product-review-list", name: "Reviews" },
                { path: "/products/product-coupon-list", name: "Coupons" },
                { path: "/products/product-order-list", name: "Orders" },
                { path: "/products/product-delivery-list", name: "Delivery" },
                { path: "/products/product-customer-list", name: "Customers" },
                { path: "/products/product-setting", name: "Setting" },
                
              ]},
              { key: "uploadLibrary", label: "Upload Library", icon: <TbLibraryPhoto className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/upload-library/new-library", name: "New Library" },
                { path: "/upload-library/library-list", name: "All Library" },
                
              ]},
              { key: "appearance", label: "Appearance", icon: <LuFullscreen className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/appearance/themes", name: "Themes" },
                { path: "/appearance/web-menus", name: "Web Menus" },
                { path: "/appearance/required-plugins", name: "Required Plugins" },
                { path: "/appearance/install-plugins", name: "Install Plugins" },
              ]},
              { key: "setting", label: "Setting", icon: <LuSettings className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/setting/web-setting", name: "Web Settings" },
                { path: "/setting/billing-update", name: "Billing Update" },
                { path: "/setting/payment-transfer", name: "Payment Transfer" },
                { path: "/setting/app-integration", name: "App Integration" },
              ]},
              { key: "users", label: "Users", icon: <LuCircleUserRound className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/users/user-list", name: "User List" },
                { path: "/users/user-role-list", name: "User Role List" },
              ]},
              { key: "supportTicket", label: "Support Ticket", icon: <IoTicketOutline className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/support-ticket/new-ticket", name: "New Ticket" },
                { path: "/support-ticket/ticket-list", name: "Ticket List" },
              ]},
            ].map(({ key, label, icon, links }) => (
              <li key={key} className='mb-[10px] '>
                <div onClick={() => toggleSubmenu(key)} className="w-full cursor-pointer flex justify-between items-center rounded-[6px] px-[13px] py-[10px] transition-all duration-300 hover:bg-[#F1F1F1] hover:text-black">
                  <span className="flex items-center gap-[10px] text-[15px] font-[500] text-neutral-700 ">{icon}{label}</span>
                  {submenuStates[key] ? <IoIosArrowDown className='text-[20px] text-neutral-400' /> : <IoIosArrowForward className='text-[18px] text-neutral-500' />}
                </div>
                <div className={`overflow-hidden transition-all duration-500 ${submenuStates[key] ? 'h-auto max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <ul className='pl-[30px]'>
                    {links.map(({ path, name }) => (
                      <li key={path} className="py-[8px] text-[15px] font-[500] text-neutral-600  list-disc">
                        <NavLink to={path}>{name}</NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mobile Sidebar */}
      <section className={activesidebar ? 'z-[10434032432300] w-[60%] lg:w-[35%] xl:hidden block h-[100%] bg-white fixed transition-all duration-300 shadow-boxshadow5 border-r-[1px] border-[#eee] top-0 left-0' : 'z-[100000] transition-all duration-300 w-[100%] h-[100%] transition-all md:hidden block duration-300 bg-white fixed left-[-100%] top-0 shadow-boxshadow5 border-r-[1px] border-[#eee]'}>
        <div onClick={closesidebar} className="cursor-pointer close absolute top-[10px] right-[30px]">
          <button className='text-[25px] hover:text-[#FF5200] transition-all duration-200'><IoClose /></button>
        </div>
        <div className="logo w-full h-[10vh] flex justify-center items-center">
          <img className='w-[150px]' src={logo} alt="Logo" />
        </div>
        <div>
          <ul className='sellerheader pt-[10px]'>
            <li className='mb-[10px]'>
              <NavLink to="/business-admin" className="hover:bg-[#F1F1F1] hover:text-black flex rounded-[6px] justify-start items-center gap-[10px] px-[13px] py-[10px] text-[#0A0A0C] text-[15px] font-[500]">
                <RiDashboardFill className='text-[22px] text-neutral-600' /> <span>Dashboard</span>
              </NavLink>
            </li>

            {[
              { key: "pages", label: "Pages", icon: <RiPagesLine className='text-[22px]' />, links: [
                { path: "/business-new-page", name: "New Page" },
                { path: "/business-all-pages", name: "All Pages" },
              ]},
              { key: "contents", label: "Contents", icon: <TbBrandBlogger className='text-[22px]' />, links: [
                { path: "/business-new-post", name: "New Post" },
                { path: "/business-all-post", name: "All Posts" },
                { path: "/business-post-categories", name: "Post Categories" },
                { path: "/business-post-tags", name: "Post Tags" },
                { path: "/business-post-comments", name: "Post Comments" },
              ]},
              { key: "products", label: "Products", icon: <MdOutlineShoppingCart className='text-[22px]' />, links: [
                { path: "/new-customer", name: "All Product" },
                { path: "/customer-list", name: "Categories" },
                { path: "/customer-list", name: "Tags" },
                { path: "/customer-list", name: "Brands" },
                { path: "/customer-list", name: "Attributes" },
                { path: "/customer-list", name: "Reviews" },
                { path: "/customer-list", name: "Orders" },
                { path: "/customer-list", name: "Delivery" },
                { path: "/customer-list", name: "Coupons" },
                { path: "/customer-list", name: "Setting" },

              ]},
              { key: "uploadLibrary", label: "Upload Library", icon: <IoLibraryOutline className='text-[22px]' />, links: [
                { path: "/business-add-library", name: "Add New" },
                { path: "/business-all-library", name: "All Library" },
              ]},
              { key: "appearance", label: "Appearance", icon: <PiSlideshowBold className='text-[22px]' />, links: [
                { path: "/business-user-themes", name: "Themes" },
                { path: "/web-menus", name: "Web Menus" },
                { path: "/customer-list", name: "Required Plugins" },
                { path: "/customer-list", name: "Install Plugins" },
              ]},
              { key: "setting", label: "Setting", icon: <FiSettings className='text-[22px]' />, links: [
                { path: "/new-customer", name: "Web Settings" },
                { path: "/customer-list", name: "Payment Transfer" },
                { path: "/customer-list", name: "App Integration" },
              ]},
              { key: "users", label: "Users", icon: <FaRegUser className='text-[22px]' />, links: [
                { path: "/business-new-user", name: "New User" },
                { path: "/business-user-list", name: "User List" },
                { path: "/business-user-role-list", name: "User Role List" },
              ]},
              { key: "supportTicket", label: "Support Ticket", icon: <IoTicketOutline className='text-[22px]' />, links: [
                { path: "/business-new-ticket", name: "New Tickets" },
                { path: "/business-ticket-list", name: "Ticket List" },
              ]},
            ].map(({ key, label, icon, links }) => (
              <li key={key}>
                <button onClick={() => toggleSubmenu(key)} className="w-full flex justify-between items-center rounded-[6px] px-[13px] py-[10px] transition-all duration-300 hover:bg-[#F1F1F1] hover:text-black">
                  <span className="flex items-center gap-[10px]">{icon}{label}</span>
                  {submenuStates[key] ? <IoIosArrowDown className='text-[20px] text-neutral-400' /> : <IoIosArrowForward className='text-[20px] text-neutral-400' />}
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${submenuStates[key] ? 'h-auto max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <ul className='pl-[30px]'>
                    {links.map(({ path, name }) => (
                      <li key={path} className="py-[8px] text-[15px] list-disc font-[500]">
                        <NavLink to={path}>{name}</NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Dashboardleftside;