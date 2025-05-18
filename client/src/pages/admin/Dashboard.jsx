import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import revenueData from '../../data/revenueData';
import { FaTrophy } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,Legend, PieChart,
  Cell,
  ResponsiveContainer,BarChart,Bar,Pie} from "recharts"

import { Pagination } from 'swiper/modules';

const Dashboard = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const [showmodal,setmodal]=useState(false);
     const uploadpost=()=>{
                setmodal(true)
     }
    function handlesidebar(){
        setactivesidebar(!activesidebar)
    }
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[10px] xl:px-[30px]'>
          <Swiper
      slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300:{
    slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
              1300: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
                1440: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination]}
        className="mySwiper "
      >
        <SwiperSlide>
             <div className='p-[20px] border-[1px] rounded-[10px] border-[#eee] flex gap-[10px] justify-between'>
      <div>
    <h2 className='text-gray-500 font-[400] text-[14px] lg:text-[15px] 2xl:text-[15px] mb-[5px]'>Total Customer</h2>
    <h4 className='text-gray-900 font-[600] text-[16px] lg:text-[17px] 2xl:text-[16px]'>36,476 GB</h4>
    <div>
      <h2 className='text-[13px] flex justify-start items-center gap-[5px] mt-[10px] font-[500]'><span className='text-green-500 flex justify-start items-center gap-[5px]'><GrLineChart/> +32.40%</span></h2>
    </div>
      </div>
             <div className='xl:w-[45%] 2xl:w-[40%]'>
              <div class="relative w-24 h-24 flex items-center justify-center ">
  <div 
    id="progress" 
    class="absolute w-full h-full rounded-full bg-[#D7E3FE]"
    style={{background: "conic-gradient(#3b82f6 32%, #e5e7eb 0)"}}>
  </div>
  <div class="absolute w-20 h-20  bg-white rounded-full flex items-center justify-center">
    <span id="progress-text" class="text-[18px] font-semibold font-poppins text-gray-800">32%</span>
  </div>
              </div>
             </div>
   </div>
        </SwiperSlide>
        <SwiperSlide>

      <div className='p-[20px] border-[1px] rounded-[10px] border-[#eee] flex gap-[10px] justify-between'>
      <div>
    <h2 className='text-gray-500 font-[400] text-[15px] mb-[5px]'>Total Paid</h2>
    <h4 className='text-gray-900 font-[600] text-[16px]'>36,476 GB</h4>
    <div>
      <h2 className='text-[13px] flex justify-start items-center gap-[5px] mt-[10px] font-[500]'><span className='text-green-500 flex justify-start items-center gap-[5px]'><GrLineChart/> +32.40%</span></h2>
    </div>
      </div>
             <div className='xl:w-[45%] 2xl:w-[40%]'>
              <div class="relative w-24 h-24 flex items-center justify-center ">
  <div 
    id="progress" 
    class="absolute w-full h-full rounded-full bg-[#D7E3FE]"
    style={{background: "conic-gradient(#3b82f6 45%, #e5e7eb 0)"}}>
  </div>
  <div class="absolute w-20 h-20  bg-white rounded-full flex items-center justify-center">
    <span id="progress-text" class="text-lg font-semibold font-poppins text-gray-800">45%</span>
  </div>
              </div>
             </div>
   </div>
        </SwiperSlide>
        <SwiperSlide>
      <div className='p-[20px] border-[1px] rounded-[10px] border-[#eee] flex gap-[10px] justify-between'>
      <div>
    <h2 className='text-gray-500 font-[400] text-[15px] mb-[5px]'>Total Due</h2>
    <h4 className='text-gray-900 font-[600] text-[16px]'>36,476 GB</h4>
    <div>
      <h2 className='text-[13px] flex justify-start items-center gap-[5px] mt-[10px] font-[500]'><span className='text-green-500 flex justify-start items-center gap-[5px]'><GrLineChart/> +32.40%</span></h2>
    </div>
      </div>
             <div className='xl:w-[45%] 2xl:w-[40%]'>
              <div class="relative w-24 h-24 flex items-center justify-center ">
  <div 
    id="progress" 
    class="absolute w-full h-full rounded-full bg-[#D7E3FE]"
    style={{background: "conic-gradient(#EE0000 70%, #e5e7eb 0)"}}>
  </div>
  <div class="absolute w-20 h-20  bg-white rounded-full flex items-center justify-center">
    <span id="progress-text" class="text-lg font-semibold font-poppins text-gray-800">32%</span>
  </div>
              </div>
             </div>
   </div>
        </SwiperSlide>
        <SwiperSlide>
      <div className='p-[20px] border-[1px] rounded-[10px] border-[#eee] flex gap-[10px] justify-between'>
      <div>
    <h2 className='text-gray-500 font-[400] text-[15px] mb-[5px]'>Total User</h2>
    <h4 className='text-gray-900 font-[600] text-[16px]'>36,476 GB</h4>
    <div>
      <h2 className='text-[13px] flex justify-start items-center gap-[5px] mt-[10px] font-[500]'><span className='text-green-500 flex justify-start items-center gap-[5px]'><GrLineChart/> +32.40%</span></h2>
    </div>
      </div>
             <div className='xl:w-[45%] 2xl:w-[40%]'>
              <div class="relative w-24 h-24 flex items-center justify-center ">
  <div 
    id="progress" 
    class="absolute w-full h-full rounded-full bg-[#D7E3FE]"
    style={{background: "conic-gradient(#3b82f6 60%, #e5e7eb 0)"}}>
  </div>
  <div class="absolute w-20 h-20  bg-white rounded-full flex items-center justify-center">
    <span id="progress-text" class="text-lg font-semibold font-poppins text-gray-800">32%</span>
  </div>
              </div>
             </div>
   </div>
        </SwiperSlide>
      
      </Swiper>
{/* ----------------------------progress bar---------------- */}
<section className='grid lg:grid-cols-3 xl:grid-cols-4 gap-[20px]'>




</section>
{/* ----------------------------progress bar---------------- */}
{/* ---------------------chart------------------- */}
    <section className='py-[20px] flex justify-between items-center gap-[10px] lg:gap-[20px] lg:flex-row flex-col'>
                  <section className='w-[100%] lg:w-[60%] h-[350px] lg:h-[500px] pb-[70px] font-red_hat p-[20px] shadow-shadow_box mt-[30px] rounded-[10px] border-[1px] border-[#ebf1f6]'>
                   <div className='pb-[30px] flex justify-between items-center'>
                    <h1 className='text-[16px] lg:text-[16px] font-[500]'>Total Revenue</h1>
                    <h1 className='font-[700] text-[16px] lg:text-[17px] font-space'>$200,20003</h1>
                   </div>
               <ResponsiveContainer width="100%" h="100%">
               <AreaChart className='w-[100%]' data={revenueData}>
                    <YAxis/>
                    <XAxis dataKey="label"/>
                    <CartesianGrid/>
                    <Tooltip/>
                    <Legend/>
                    <Area
                     dataKey="revenue" 
                     type="monotone"
                     stroke="#7c3aed"
                     fill="#8b5cf6"
                     />
                    </AreaChart>
               </ResponsiveContainer>
                  </section>
                  <section className='w-[100%] lg:w-[40%] h-[350px] lg:h-[500px] p-[20px] shadow-shadow_box mt-[30px] rounded-[10px] border-[1px] border-[#ebf1f6]'>
                 <div className='flex justify-between items-center '>
                   <h1 className='text-[16px] lg:text-[16px] font-[500]'>Expected Earning</h1>
                   <h2 className='font-[700] text-[16px] lg:text-[17px] font-space'>$20,303,003</h2>
                 </div>
                  <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#6560F0" />
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#26de81" label color='#3867d6'/>
        </PieChart>
      </ResponsiveContainer>
                  </section>
                     {/* <div className='w-[60%] h-[400px] p-[20px] bg-white border-[1px] border-[#eee] rounded-[10px] shadow-md'>
                     <Line
          data={{
            labels: revenueData.map((data) => data.label),
            datasets: [
              {
                label: "Revenue",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: "#fed330",
                borderColor: "#064FF0",
              },
              {
                label: "Cost",
                data: revenueData.map((data) => data.cost),
                backgroundColor: "#20bf6b",
                borderColor: "#20bf6b",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue & Cost",
              },
            },
          }}
        />
                     </div> */}
                     {/* <div className='w-[40%] h-[400px] flex justify-center items-center p-[20px] bg-white border-[1px] border-[#eee] rounded-[10px] shadow-md'>
                     <Doughnut
          data={{
            labels: revenueData.map((data) => data.label),
            datasets: [
              {
                label: "Revenue",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: "#1abc9c",
                borderColor: "#1abc9c",
              },
              {
                label: "Cost",
                data: revenueData.map((data) => data.cost),
                backgroundColor: "#3498db",
                borderColor: "#3498db",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue & Cost",
              },
            },
          }}
        />
                     </div> */}
    </section>
{/* ---------------------chart------------------- */}
{/*-------------------------------member-section--------------------- */}
  <section className='w-full h-auto flex gap-[20px] justify-center flex-col lg:flex-row'>
         <section className='w-[100%] lg:w-[60%]'>
          <div className='w-full flex justify-between items-center'>
            <h1 className='text-[17px] font-[600] '>All Files</h1>
            <NavLink>
              <h2 className='text-[15px] text-neutral-800 font-[500]'>View All</h2>
            </NavLink>
          </div>
          {/* ----------------table--------------- */}
          <section>


<div className="relative overflow-x-auto rounded-[5px] border-[2px] border-[#eee] mt-[20px]">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-neutral-700 uppercase bg-[#F1F1F1] dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <td scope="col" className="px-6 py-4 text-[14px] font-[600]">
          Name
        </td>
        <th scope="col" className="px-6 py-4 text-[14px] font-[600]">
          Size
        </th>
        <th scope="col" className="px-6 py-4 text-[14px] font-[600]">
          Type
        </th>
        <th scope="col" className="px-6 py-4 text-[14px] font-[600]">
          Modified
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td scope="row" className="px-6 py-4 flex justify-start items-center gap-[10px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
             <div className='bg-[#F1F1F1] rounded-[5px] p-[6px]'>
              <img className=' w-[30px]' src="https://isomorphic-furyroad.vercel.app/_next/static/media/doc-icon.c49abc54.svg" alt="" />
             </div>
             <h2>pink_yowza.doc</h2>
        </td>
        <td className="px-6 py-4">
         7.6MB
        </td>
        <td className="px-6 py-4">
          doc
        </td>
        <td className="px-6 py-4">
          <h2 className='text-black mb-[2px]'>August 6, 2023</h2>
          <h3 className=''>12:36 AM</h3>
        </td>
      </tr>
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td scope="row" className="px-6 py-4 flex justify-start items-center gap-[10px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
             <div className='bg-[#F1F1F1] rounded-[5px] p-[6px]'>
              <img className='w-[30px]' src="https://isomorphic-furyroad.vercel.app/_next/static/media/folder-icon.185e90d1.svg" alt="" />
             </div>
             <h2>pink_yowza.doc</h2>
        </td>
        <td className="px-6 py-4">
         7.6MB
        </td>
        <td className="px-6 py-4">
          doc
        </td>
        <td className="px-6 py-4">
          <h2 className='text-black mb-[2px]'>August 6, 2023</h2>
          <h3 className=''>12:36 AM</h3>
        </td>
      </tr>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td scope="row" className="px-6 py-4 flex justify-start items-center gap-[10px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
             <div className='bg-[#F1F1F1] rounded-[5px] p-[6px]'>
              <img className='w-[30px]' src="https://isomorphic-furyroad.vercel.app/_next/static/media/xml-icon.bacc908e.svg" alt="" />
             </div>
             <h2>pink_yowza.doc</h2>
        </td>
        <td className="px-6 py-4">
         7.6MB
        </td>
        <td className="px-6 py-4">
          doc
        </td>
        <td className="px-6 py-4">
          <h2 className='text-black mb-[2px]'>August 6, 2023</h2>
          <h3 className=''>12:36 AM</h3>
        </td>
      </tr>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td scope="row" className="px-6 py-4 flex justify-start items-center gap-[10px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
             <div className='bg-[#F1F1F1] rounded-[5px] p-[6px]'>
              <img className='w-[30px]' src="https://isomorphic-furyroad.vercel.app/_next/static/media/xml-icon.bacc908e.svg" alt="" />
             </div>
             <h2>pink_yowza.doc</h2>
        </td>
        <td className="px-6 py-4">
         7.6MB
        </td>
        <td className="px-6 py-4">
          doc
        </td>
        <td className="px-6 py-4">
          <h2 className='text-black mb-[2px]'>August 6, 2023</h2>
          <h3 className=''>12:36 AM</h3>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  <nav class="flex items-center   flex-column flex-wrap md:flex-row justify-between pt-[12px] md:pt-[10px] lg:pt-4 w-full" aria-label="Table navigation">
<div class="flex items-center space-x-2">
  <label for="rowsPerPage" class="text-sm font-medium text-gray-700">Rows per page:</label>
  <select id="rowsPerPage" class="block  w-15 lg:w-20 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
    <option value="100">100</option>
  </select>
</div>

        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-[5px] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-[5px] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav>
          </section>
         </section>
         <section className='w-[100%] lg:w-[40%]  rounded-[5px]'>
          <div>
             <h1 className='text-[17px] font-[600] '>Members</h1>
          </div>
          {/* ------------member--------------- */}
             <div className='border-[1px] mt-[20px] h-[400px] overflow-y-auto no-scrollbar border-[#eee] rounded-[5px] p-[15px]'>
            <div className='w-full flex justify-between items-center mb-[25px]'>
                  <div className='flex justify-center items-center gap-[10px]'>
                  <div>
                    <img className='w-[50px] h-[50px] rounded-full' src="https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-12.webp&w=1920&q=75" alt="" />
                  </div>
                <div>
                  <h1 className='text-[16px] font-[600] text-black'>Albert Flores</h1>
                  <p className='text-[13px] text-neutral-500'>anya.hill@example.com</p>
                </div>
                </div>
                <div className='w-[50px] h-[50px] text-[20px] text-green-500 rounded-full flex justify-center items-center bg-[#E5F6F0]'>
                   <FaTrophy/>
                </div>
            </div>
                  <div className='w-full flex justify-between items-center mb-[25px]'>
                  <div className='flex justify-center items-center gap-[10px]'>
                  <div>
                    <img className='w-[50px] h-[50px] rounded-full' src="https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-11.webp&w=1920&q=75" alt="" />
                  </div>
                <div>
                  <h1 className='text-[16px] font-[600] text-black'>Albert Flores</h1>
                  <p className='text-[13px] text-neutral-500'>anya.hill@example.com</p>
                </div>
                </div>
                <div className='w-[50px] h-[50px] text-[20px] text-green-500 rounded-full flex justify-center items-center bg-[#E5F6F0]'>
                   <FaTrophy/>
                </div>
            </div>
            
                  <div className='w-full flex justify-between items-center mb-[25px]'>
                  <div className='flex justify-center items-center gap-[10px]'>
                  <div>
                    <img className='w-[50px] h-[50px] rounded-full' src="https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75" alt="" />
                  </div>
                <div>
                  <h1 className='text-[16px] font-[600] text-black'>Albert Flores</h1>
                  <p className='text-[13px] text-neutral-500'>anya.hill@example.com</p>
                </div>
                </div>
                <div className='w-[50px] h-[50px] text-[20px] text-red-500 rounded-full flex justify-center items-center bg-red-50'>
                   <FaTrophy/>
                </div>
            </div>
                  <div className='w-full flex justify-between items-center mb-[25px]'>
                  <div className='flex justify-center items-center gap-[10px]'>
                  <div>
                    <img className='w-[50px] h-[50px] rounded-full' src="https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-07.webp&w=1920&q=75" alt="" />
                  </div>
                <div>
                  <h1 className='text-[16px] font-[600] text-black'>Albert Flores</h1>
                  <p className='text-[13px] text-neutral-500'>anya.hill@example.com</p>
                </div>
                </div>
                <div className='w-[50px] h-[50px] text-[20px] text-red-500 rounded-full flex justify-center items-center bg-red-50'>
                   <FaTrophy/>
                </div>
            </div>
                  <div className='w-full flex justify-between items-center mb-[25px]'>
                  <div className='flex justify-center items-center gap-[10px]'>
                  <div>
                    <img className='w-[50px] h-[50px] rounded-full' src="https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-02.webp&w=1920&q=75" alt="" />
                  </div>
                <div>
                  <h1 className='text-[16px] font-[600] text-black'>Albert Flores</h1>
                  <p className='text-[13px] text-neutral-500'>anya.hill@example.com</p>
                </div>
                </div>
                <div className='w-[50px] h-[50px] text-[20px] text-green-500 rounded-full flex justify-center items-center bg-[#E5F6F0]'>
                   <FaTrophy/>
                </div>
            </div>
                  <div className='w-full flex justify-between items-center mb-[25px]'>
                  <div className='flex justify-center items-center gap-[10px]'>
                  <div>
                    <img className='w-[50px] h-[50px] rounded-full' src="https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-14.webp&w=1920&q=75" alt="" />
                  </div>
                <div>
                  <h1 className='text-[16px] font-[600] text-black'>Albert Flores</h1>
                  <p className='text-[13px] text-neutral-500'>anya.hill@example.com</p>
                </div>
                </div>
                <div className='w-[50px] h-[50px] text-[20px] text-green-500 rounded-full flex justify-center items-center bg-[#E5F6F0]'>
                   <FaTrophy/>
                </div>
            </div>
                  <div className='w-full flex justify-between items-center mb-[25px]'>
                  <div className='flex justify-center items-center gap-[10px]'>
                  <div>
                    <img className='w-[50px] h-[50px] rounded-full' src="https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-13.webp&w=1920&q=75" alt="" />
                  </div>
                <div>
                  <h1 className='text-[16px] font-[600] text-black'>Albert Flores</h1>
                  <p className='text-[13px] text-neutral-500'>anya.hill@example.com</p>
                </div>
                </div>
                <div className='w-[50px] h-[50px] text-[20px] text-green-500 rounded-full flex justify-center items-center bg-[#E5F6F0]'>
                   <FaTrophy/>
                </div>
            </div>
            
             </div>
          {/* -----------member------------- */}
         </section>
  </section>
{/*-------------------------------member-section--------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Dashboard