import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Contextapi } from '../../../../context/Appcontext';
import Dashboardleftside from '../../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';

const Viewtimeformat = () => {
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  
  // State for country data
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch country data on component mount
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`${base_url}/super/admin/timeformat/${id}`);
        setCountry(response.data.data);
        console.log(response)
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch timeformat data');
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);

  // Handle scroll for topbar
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  // Toggle sidebar
  const handlesidebar = () => {
    setactivesidebar(!activesidebar);
  };

  if (loading) {
    return (
      <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
          <Dashboardleftside />
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Dashboradheader />
          <div className="flex items-center justify-center h-full">
            <div className="w-[60px] h-[60px] relative">
              <div className="absolute inset-0 rounded-full border-[6px] border-t-transparent border-white animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-[4px] border-t-transparent border-brand_color animate-spin-reverse"></div>
            </div>
          </div>
        </section>
      </section>
    );
  }

  if (error) {
    return (
      <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
          <Dashboardleftside />
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Dashboradheader />
          <div className="flex items-center justify-center h-full">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        </section>
      </section>
    );
  }

  if (!country) {
    return (
      <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
          <Dashboardleftside />
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Dashboradheader />
          <div className="flex items-center justify-center h-full">
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              timeformat not found
            </div>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      {/* Sidebar */}
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      
      {/* Main Content */}
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[10px] xl:px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] font-[600] mb-[8px]'> {country.timeformat}</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Setting</li>
                <li><IoIosArrowForward /></li>
                <li> {country.timeformat}</li>
              </ul>
            </div>
          </div>
          
          <div className='flex justify-center w-full flex-col xl:flex-row gap-[20px] mt-[20px]'>
            {/* Left Section */}
            <section className='w-full xl:w-[70%] h-auto'>
              <div className="mt-[20px]">
                <div className="w-[100%] space-y-[5px] mb-[15px]">
                  {/* Country Name */}
                  <div>
                    <label
                      htmlFor="countryName"
                      className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
                    >
                      Timeformat Name
                    </label>
                    <div
                      className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] bg-gray-100 text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]`}
                    >
                      {country.timeformat}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="w-[100%] mb-[20px]">
                  <label htmlFor="description" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">
                    Description
                  </label>
                  <div 
                    className="w-full mt-[3px] 2xl:mt-[8px] p-4 bg-gray-100 rounded-[5px] border-[1px] min-h-[200px]  border-[#eee]"
                    dangerouslySetInnerHTML={{ __html: country.description }}
                  />
                </div>
              </div>
            </section>
            
            {/* Right Section */}
            <section className='w-[100%] xl:w-[30%]'>
              {/* Details Section */}
              <section className='border-[1px] border-[#eee] rounded-[5px]'>
                <div className="space-y-4 flex justify-start flex-col bg-white">
                  <div className='border-b-[1px] px-[20px] py-[10px] border-[#eee]'>
                    <h1 className='text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600'>Details</h1>
                  </div>
                  <div className='px-[15px] py-[10px] space-y-4 flex justify-start flex-col'>
                    {/* Status */}
                    <div className="flex items-center">
                      <p className="text-sm text-gray-700">
                        Status: <span className="font-semibold">{country.status}</span>
                      </p>
                    </div>

                    {/* Visibility */}
                    <div className="flex items-center">
                      <p className="text-sm text-gray-700">
                        Visibility: <span className="font-semibold">{country.visibility}</span>
                      </p>
                    </div>

                    {/* Created Date */}
                    <div className="flex items-center">
                      <p className="text-sm text-gray-700">
                        Created Date: <span className="font-semibold">
                          {new Date(country.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
    
            </section>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Viewtimeformat;