import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoPricetagsOutline, IoClose } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdSupportAgent } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Contextapi } from "../../context/Appcontext";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/logo.png";
import { BiCategory } from "react-icons/bi";
import { PiSlideshowBold } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiPagesLine } from "react-icons/ri";
import { TbBrandBlogger } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiBloggerLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbLibraryPhoto } from "react-icons/tb";
import { LuFullscreen } from "react-icons/lu";
import { PiCoinsLight } from "react-icons/pi";
import { LuSettings } from "react-icons/lu";
import { LuCircleUserRound } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
const Dashboardleftside = () => {
  const { activesidebar, setactivesidebar } = useContext(Contextapi);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve submenu states from sessionStorage
  const getInitialSubmenuState = () => {
    const storedState = sessionStorage.getItem("submenuStates");
    return storedState ? JSON.parse(storedState) : {
      customer: false,
      pricePlan: false,
      users: false,
      support: false,
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
      <section className={activesidebar ? "w-full z-[10000] xl:block hidden border-r h-full bg-white relative transition-all duration-300 left-[-100%]" : "w-full z-[1000] h-full border-r transition-all xl:block hidden bg-white relative left-0 overflow-y-auto no-scrollbar"}>
        <div className='w-full h-[100vh] overflow-y-auto no-scrollbar xl:px-[6px] 2xl:px-[20px]'>
          <div className="logo w-full h-[10vh] flex justify-start items-center p-[13px]">
            <img className='w-[130px] xl:w-[160px]' src={logo} alt="Logo" />
          </div>
          <ul className='sellerheader pt-[10px]'>
          <li className='mb-[10px]'>
                  <NavLink to="/super-dashboard" className="hover:bg-[#F1F1F1] hover:text-black flex rounded-[6px] justify-start items-center gap-[10px] px-[13px] py-[10px] text-[#0A0A0C] xl:text-[14px] 2xl:text-[15px] font-[500]">
                    <LuLayoutDashboard className="text-[18px] text-neutral-700" /> <span className='text-nowrap text-gray-700 text-[15px]'>Dashboard</span>
                  </NavLink>
                </li>
            
            {[
              { key: "customer", label: "Retail Customer", icon: <HiOutlineUserGroup className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/super-credit-cost-plan", name: "Credit Cost Plan" },
                { path: "/super-business-category-list", name: "Category List" },
                { path: "/super-price-plan-list", name: "Price Plan List" },
                { path: "/super-coupon-list", name: "Coupon List" },
                { path: "/super-customer-list", name: "Customer List" },
                { path: "/super-payment-transfer", name: "Payment Transfer" },
                { path: "/super-retail-setting", name: "Setting" },
              ]},
              // { key: "pricePlan", label: "Price Plan", icon: <IoPricetagsOutline className='text-[20px] 2xl:text-[20px]' />, links: [
              //   { path: "/super-credit-cost-plan", name: "Credit Cost Plan" },
              //   { path: "/super-price-plan-list", name: "Price Plan List" },
              //   { path: "/super-payment-transfer", name: "Payment Transfer" },
              // ]},
              // { key: "category", label: "Business Category", icon: <BiCategory className='text-[20px] 2xl:text-[20px]' />, links: [
              //   { path: "/super-new-business-category", name: "New Category" },
              //   { path: "/super-business-category-list", name: "Category List" },
              // ]},
                { key: "uploadLibrary", label: "Upload Library", icon: <TbLibraryPhoto className='text-[20px] 2xl:text-[20px]' />, links: [
                              { path: "/super-new-library", name: "New Library" },
                              { path: "/super-all-library", name: "All Library" },
                            ]},
                    { key: "appearance", label: "Appearance", icon: <LuFullscreen className='text-[20px] 2xl:text-[20px]' />, links: [
                            { path: "/super-theme-list", name: "Theme List" },
                            { path: "/super-theme-category-list", name: "Theme Category List" },
                            { path: "/super-theme-tag-list", name: "Theme Tag List" },
                            { path: "/super-theme-review-list", name: "Theme Review List" },
                            { path: "/super-plugin-list", name: "Plugin List" },
                            { path: "/super-plugin-category-list", name: "Plugin Category List" },
                            { path: "/super-plugin-tag-list", name: "Plugin Tag List" },
                            { path: "/super-plugin-review-list", name: "Plugin Review List" },
                          ]},
                          { key: "setting", label: "Setting", icon: <LuSettings className='text-[20px] 2xl:text-[20px]' />, links: [
                            { path: "/super-web-setting", name: "Web Setting" },
                            { path: "/super-country-list", name: "Country List" },
                            { path: "/super-language-list", name: "Language List" },
                            { path: "/super-time-zone-list", name: "Timezone List" },
                            { path: "/super-time-format-list", name: "Time Format List" },
                            { path: "/super-date-format-list", name: "Date Format List" },
                            { path: "/super-app-integration-list", name: "App Integration List" },


                          ]},
              { key: "users", label: "Teams", icon: <LuCircleUserRound className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/super-user-list", name: "Team List" },
                { path: "/super-user-role-list", name: "Team Role List" },
              ]},
              { key: "support", label: "Support Ticket", icon: <IoTicketOutline className='text-[20px] 2xl:text-[20px]' />, links: [
                { path: "/super-new-tickets", name: "New Tickets" },
                { path: "/super-ticket-list", name: "Ticket List" },
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
                              <li key={path} className="py-[8px] text-[15px] font-[500] text-neutral-600  list-[circle]">
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
