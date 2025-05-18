import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { FaCheck, FaBoxOpen } from 'react-icons/fa';
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserAlt, FaLightbulb, FaRocket, FaCrown } from 'react-icons/fa';
import { FaCamera } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { FiPower } from 'react-icons/fi';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { useCustomer } from '../../context/CustomerContext';

const Packageoption = () => {
  const navigate = useNavigate();
  const user_info = JSON.parse(localStorage.getItem("user"));
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [activePlanIndex, setActivePlanIndex] = useState(null);
  const [fetchedPlans, setFetchedPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const { customerData, loadingCustomer, customerError, fetchCustomerInformation, selected_package } = useCustomer();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${base_url}/super/admin/price-plans`);
        if (res.data.success) {
          setFetchedPlans(res.data.data);
        } else {
          toast.error("Failed to load price plans.");
        }
      } catch (err) {
        console.error("Error fetching price plans:", err);
        toast.error("An error occurred while loading price plans.");
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    fetchCustomerInformation();
    setActivePlanIndex(customerData?.selectedPackage?.name || null);
  }, [customerData?.selectedPackage?.name]);

  const handlePurchase = async (plan, index) => {
    try {
      setActivePlanIndex(index);

      const packageData = {
        name: plan.name,
        credits: plan.credits,
        librarySizeMB: parseInt(plan.mediaSize),
        trafficMB: parseInt(plan.traffic),
        technology: plan.technologies.join(", "),
        support: plan.supports.join(", "),
        price: plan.price,
        purchaseDate: new Date(),
      };

      const res = await axios.post(`${base_url}/customer/purchase-package`, {
        userId: user._id,
        package: packageData,
      });

      if (res) {
        fetchCustomerInformation();
        setActivePlanIndex(plan.name);
        toast.success("Package purchased successfully!");
        const updatedUser = {
          ...user,
          selectedPackage: packageData,
          availableCredits: res.data.availableCredits,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to purchase package");
    }
  };

  const viewcart = () => {
    localStorage.setItem('registrationStep', '3');
    navigate('/choose-package');
  };

  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <Toaster />
      <section className='px-[20px] w-full md:w-[80%] lg:w-[80%] xl:w-[70%] m-auto pt-[40px] pb-[30px]'>
        <div className="w-full">
          <div className="w-full flex justify-between items-center py-[20px] px-6 relative mb-[40px]">
            <div>
              <img
                src="https://www.weblasser.com/wp-content/uploads/2021/04/Logo.png"
                alt="Logo"
                className="h-15"
              />
            </div>
            <div className="relative" ref={dropdownRef}>
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="w-10 h-10 rounded-full bg-white text-gray-700 font-semibold flex items-center justify-center uppercase"
                >
                  {user_info.firstName?.slice(0, 1)}
                </button>
              </div>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-36 bg-white rounded-[5px] shadow-sm border border-gray-200 p-3 z-10"
                  >
                    <button
                      onClick={() => alert('Logging out...')}
                      className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <FiPower className="text-lg" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingPlans ? (
              <p>Loading plans...</p>
            ) : (
              fetchedPlans.map((plan, index) => (
                <div
                  key={plan._id}
                  className="bg-white p-6 cursor-pointer border border-[#eee] text-center transition transform hover:scale-105 hover:shadow-lg duration-300"
                >
                  <div className="text-[22px] lg:text-[42px] text-brand_color mb-4 flex justify-center items-center">
                    <img src={plan.image} alt={plan.name} className="h-10 w-10" />
                  </div>
                  <h2 className="text-xl font-[600] mb-2">{plan.name}</h2>
                  <div dangerouslySetInnerHTML={{ __html: plan.description }} className="text-gray-500 mb-4"></div>
                  <div className="w-full flex justify-center items-center">
                    <ul className="text-left mb-4 space-y-2">
                      <li className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        <span className="text-gray-600">{plan.credits} Credits</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        <span className="text-gray-600">{plan.mediaSize}MB Library</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        <span className="text-gray-600">{plan.traffic}MB Traffic</span>
                      </li>
                    </ul>
                  </div>
                  <p className="font-[600]">Technology:</p>
                  <p className="mb-2">{plan.technologies.join(", ")}</p>
                  <p className="font-[600]">Support:</p>
                  <p className="mb-4">{plan.supports.join(", ")}</p>
                  <div className="border-t-[1px] border-gray-200 py-[15px] flex justify-center items-center gap-[12px]">
                    <h2 className="font-[700] text-[22px]">৳{plan.price}</h2>
                  </div>
                  <button
                    className={`${
                      activePlanIndex === plan.name ? "bg-green-500" : "bg-brand_color"
                    } text-white text-[14px] 2xl:text-[15px] py-2 px-[25px] rounded-[5px] transition duration-300`}
                    onClick={() => handlePurchase(plan, plan.name)}
                  >
                    {activePlanIndex === plan.name ? "Selected" : "Buy Now"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        {activePlanIndex !== null && (
          <div className='flex justify-end items-center mt-[20px]'>
            <NavLink to="/view-cart">
              <button
                className="text-white text-[14px] bg-brand_color 2xl:text-[15px] py-2 px-[25px] rounded-[5px] transition duration-300"
              >
                Go TO Cart
              </button>
            </NavLink>
          </div>
        )}
      </section>
    </section>
  );
};

export default Packageoption;
