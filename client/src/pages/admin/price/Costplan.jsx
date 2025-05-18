import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/Dashboard/Dashboardleftside';
import Dashboardheader from '../../../components/dashboard/Dashboardheader';
import axios from 'axios';

const Costplan = () => {
  const { activesidebar, setactivetopbar } = useContext(Contextapi);
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const moduleData = [
    {
      section: "Pages",
      modules: ["New Page"],
    },
    {
      section: "Contents",
      modules: ["New Post", "New Post Category", "New Post Tag", "New Comment"],
    },
    {
      section: "Products",
      modules: [
        "New Product", "New Category", "New Tag", "New Brand",
        "New Review", "New Coupon", "New Order", "New Delivery",
        "New Customer", "Setting"
      ],
    },
    {
      section: "UploadLibrary",
      modules: ["New Library"],
    },
    {
      section: "Appearance",
      modules: ["Themes", "Web Menus", "Install Plugins"],
    },
    {
      section: "Setting",
      modules: ["App Integration", "Apps Generator"],
    },
    {
      section: "Users",
      modules: ["New User", "New User Role"],
    },
    {
      section: "SupportTicket",
      modules: ["New Tickets"],
    }
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setactivetopbar(window.scrollY > 100);
    });

    fetchCostPlan(); // Fetch cost plan on mount
  }, []);

  const fetchCostPlan = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/costplan`);
      if (res.data.success && res.data.data) {
        const data = res.data.data;
        console.log(res.data.data)
        const flatValues = {};

        moduleData.forEach(section => {
          const sectionData = data[section.section];
          if (sectionData) {
            section.modules.forEach(module => {
              flatValues[module] = sectionData[module] || "";
            });
          } else {
            section.modules.forEach(module => {
              flatValues[module] = "";
            });
          }
        });

        setInputValues(flatValues);
      }
    } catch (error) {
      console.error("Failed to fetch cost plan:", error.message);
    }
  };

  const handleInputChange = (module, value) => {
    setInputValues(prev => ({
      ...prev,
      [module]: value
    }));
    setErrors(prev => ({
      ...prev,
      [module]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    moduleData.forEach(section => {
      section.modules.forEach(module => {
        if (!inputValues[module] || inputValues[module].trim() === "") {
          newErrors[module] = "This field is required";
        }
      });
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const res = await axios.post(`${base_url}/super/admin/create-costplan`, inputValues);
        setToastType('success');
        setToastMessage("Successfully submitted!");
        setInputValues({});
        fetchCostPlan()
      } catch (err) {
        setToastType('error');
        setToastMessage("Error submitting form.");
        console.error("Error submitting form:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      {/* Toast Message */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-[1000000] flex items-center gap-4 px-6 py-4 rounded-lg shadow-lg text-white font-medium transition-all duration-300 animate-fade-in
          ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="text-white text-xl leading-none hover:text-gray-200 transition">
            &times;
          </button>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="w-[60px] h-[60px] relative">
            <div className="absolute inset-0 rounded-full border-[6px] border-t-transparent border-white animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-[4px] border-t-transparent border-brand_color animate-spin-reverse"></div>
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>

      {/* Main Content */}
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboardheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Credit Cost Plan</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Retail Customer</li>
                <li><IoIosArrowForward /></li>
                <li>Credit Cost Plan</li>
              </ul>
            </div>
            <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
              <BiImport className='text-[25px]' />
              Import
            </button>
          </div>

          {/* Form Table */}
          <section className='pt-[40px] pb-[30px]'>
            <form onSubmit={handleSubmit} className='pt-[10px]'>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm text-center">
                  <thead className='uppercase'>
                    <tr>
                      <th className="border border-gray-300 p-2 text-white bg-[#22C55E]">Module</th>
                      <th className="border border-gray-300 p-2 bg-brand_color text-white">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moduleData.map((sectionData, sectionIdx) => (
                      <React.Fragment key={sectionIdx}>
                        <tr className="bg-gray-100 font-bold">
                          <td className="border border-gray-300 p-2 text-left" colSpan={2}>
                            {sectionData.section}
                          </td>
                        </tr>
                        {sectionData.modules.map((module, idx) => (
                          <tr key={idx}>
                            <td className="border text-left border-gray-300 p-2">{module}</td>
                            <td className="border border-gray-300 p-2">
                              <div className="flex flex-col items-start">
                                <input
                                  type="text"
                                  value={inputValues[module] || ''}
                                  onChange={(e) => handleInputChange(module, e.target.value)}
                                  className={`border-[1px] border-gray-300 py-[5px] w-full px-[10px] text-[14px] font-[500] outline-brand_color ${errors[module] ? 'border-red-500' : ''}`}
                                />
                                {errors[module] && (
                                  <span className="text-red-500 text-xs mt-1">{errors[module]}</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='flex justify-end items-center gap-[10px] mt-[30px]'>
                <button type="button" className='px-[30px] py-[8px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'>
                  <LuSaveAll className='text-[18px]' /> Draft
                </button>
                <button type="submit" className='px-[30px] py-[8px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center border-[2px] border-brand_color items-center rounded-[5px] cursor-pointer'>
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

export default Costplan;
