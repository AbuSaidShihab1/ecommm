import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/Business_dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";
import logo from "../../../assets/logo.png"
import { IoPrintOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5"; // Import close icon
import { FaDownload } from "react-icons/fa";
// -------------pay-now-popup------------------------
const CategoryAccessPopup = ({ isOpen, onClose }) => {
 

  const [payment_method,setpayment_method]=useState([
    {
      id:1,
      name:"Bkash",
      image:"https://xxxbetgames.com/icons-xxx/payments/135.svg",
      slug:"bkash"
    },
    {
      id:1,
      name:"Nagad",
      image:"https://xxxbetgames.com/icons-xxx/payments/89.svg",
      slug:"nagad"
    },
    {
      id:1,
      name:"Rocket",
      image:"https://upload.wikimedia.org/wikipedia/commons/e/e9/Rocket_ddbl.png",
      slug:"rocket"
    }
  ])
  const [active_method,set_active_method]=useState("")
  return isOpen ? (
    <div className="fixed inset-0 w-full bg-black bg-opacity-50 h-[100vh] overflow-y-auto py-[40px] z-[100000000] flex items-center justify-center">
         <section className="w-[90%] lg:w-[70%] xl:w-[50%] 2xl:w-[30%] rounded-[3px] bg-white m-auto">

        <div className="border-b px-5 py-4 flex justify-between items-center border-gray-200">
          <h1 className="text-[15px] 2xl:text-[18px] font-[500] text-gray-600">Pay Now</h1>
          <IoClose className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800" onClick={onClose} />
        </div>
          <section className='px-[20px] py-[20px]'>
            <h1 className='mb-[10px]'>Select Payment Method</h1>
            <div className='flex justify-start gap-[10px]'>
              {
                payment_method.map((method)=>{
                  return(
                    <div onClick={()=>{set_active_method(method.name)}} className={method.name==active_method ? 'px-[30px] py-[10px] border-[2px] border-brand_color cursor-pointer text-white rounded-[5px]':'px-[30px] py-[10px] bg-gray-100 border-[2px] border-gray-100 cursor-pointer rounded-[5px]'}>
                      <img className='w-[40px] mb-[5px] block m-auto' src={method.image} alt="" />
                      <p className='text-[14px] font-[500] text-gray-700'>{method.name}</p>
                    </div>
                  )
                })
              }
            </div>
            <button className='w-full px-[20px] py-[10px] bg-brand_color mt-[20px]  text-white rounded-[5px]'>Pay 2000 BDT</button>
          </section>

      </section>
    </div>
  ) : null;
};
const Paymentinvoice = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const [showmodal,setmodal]=useState(false);

        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
// -------------------pay-now-popup--------------
const [accessPopupVisible, setAccessPopupVisible] = useState(false);

const toggleAccessPopup = () => {
  setAccessPopupVisible((prev) => !prev);
};
  
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
         <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[20px] lg:px-[30px]'>
       <div className='w-full flex justify-between items-center'>
        <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Your Order Number is 2333</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
               <li>Support Ticket</li>
            <li><IoIosArrowForward/></li>
            <li>Your Order Number is 2333</li>
          </ul>
        </div>
       </div>
 {/* --------------------------invoice-table---------------------- */}
 <div className="max-w-4xl mx-auto mt-[20px] xl:mt-[30px] p-5 xl:p-8 bg-white  border text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] xl:text-2xl font-bold">INVOICE #23</h1>
        <div className="flex items-center space-x-2 text-orange-500 font-semibold  px-3 py-1 rounded-full">
          {/* <FaRegFileInvoice className="text-2xl" /> */}
          <img className='w-[100px] xl:w-[140px]' src={logo} alt="" />
        </div>
      </div>
      
      {/* Seller Information */}
     <div className='w-full flex justify-between '>
     <div className="mb-6 text-sm">
     <p className="font-bold text-orange-500">Invoice to:</p>
        <p className="">Zobaer Ahammed</p>
        <p className="">Weblasser Limited</p>
        <p>0162242524</p>
        <p>weblesser@support.com</p>
        <p>Mohammadpur,Dhaka,Bangladesh</p>
      </div>
      <div className="mb-6 text-sm text-center">
        <p className="text-[18px] xl:text-[20px] uppercase font-[600] text-red-500">Unpaid</p>
        <p>Due Date: 10-March-2025</p>
        <button onClick={toggleAccessPopup} className='px-[15px] py-[8px] bg-brand_color rounded-[5px] text-white text-[13px] xl:text-[15px] cursor-pointer mt-[5px]'>Pay Now</button>
      </div>
     </div>

      {/* Buyer Information & Invoice Details */}
      <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
        <div>
          <p className="font-bold text-orange-500">Bill to:</p>
          <p className="">Rakib Hossain</p>
          <p className="">RH Group Of Limited</p>
          <p className=''>01652524655</p>
          <p className=''>rakibhossain@gmail.com</p>
          <p className=''>Mirpur,Dhaka</p>
        </div>
        <div className="text-right">
          <p className=" mb-1">Invoice number: #22</p>
          <p className=" mb-1">Invoice Date: 10-March-2025</p>
          <p className=" mb-1">Payment Due: 10-March-2025</p>
        </div>
      </div>

      {/* Item Table */}
      <div className="border overflow-hidden">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-table_header uppercase text-table_title">
          <tr>
              <th className="p-3 border-r font-[500]">Item</th>
              <th className="p-3 border-r font-[500]">Duration</th>
              <th className="p-3 border-r font-[500]">Price</th>
              <th className="p-3 border-r font-[500]">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {["Item 1", "Item 2", "Item 3"].map((item, index) => (
                       <tr  className="border-t text-gray-700">
                       <td className="p-3 border-r">Product1</td>
                       <td className="p-3 border-r">2 months</td>
                       <td className="p-3 border-r">1222</td>
                       <td className="p-3 border-r">30000</td>
                     </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
    <div className='flex justify-end'>
    <div className="text-right mt-6 space-y-2 text-sm w-[40%] ">
        <p className='uppercase'>Subtotal: <span>0.00</span></p>
        <p className='uppercase'>Discounts: <span>0.00</span></p>
        <p className='uppercase'>Tax Amount: <span >0.00</span></p>
        <p className=" mt-2 ">TOTAL AMOUNT: 0.00</p>
      </div>
    </div>
    <div className="border overflow-hidden mt-[15px]">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-table_header  uppercase text-table_title">
            <tr>
              <th className="p-3 border-r font-[500]">Item</th>
              <th className="p-3 border-r font-[500]">Duration</th>
              <th className="p-3 border-r font-[500]">Transaction ID</th>
              <th className="p-3 border-r font-[500]">Total Amount</th>
            </tr>
          </thead>
          <tbody>
          <tr  className="border-t text-gray-700">
                <td className="p-3 border-r">Product1</td>
                <td className="p-3 border-r">2 months</td>
                <td className="p-3 border-r">CR55AE8S</td>
                <td className="p-3 border-r">30000</td>
              </tr>
          </tbody>
        </table>
      </div>
      {/* ---------downoload button------------- */}
      <div className='mt-[20px] flex justify-end items-center gap-[10px]'>
        <button className='px-[15px] py-[8px] bg-gray-200 text-gray-800 rounded-[5px] flex justify-center items-center gap-1'><FaDownload/> Download</button> 
        <button className='px-[15px] py-[8px] bg-gray-200 text-gray-800 rounded-[5px] flex justify-center items-center gap-1'><IoPrintOutline/> Print</button>  
            </div>
    </div>
    <CategoryAccessPopup isOpen={accessPopupVisible} onClose={toggleAccessPopup} />
    
 {/* --------------------------invoice-table---------------------- */}
 
       </section>
        </section>
    </section>
  )
}

export default Paymentinvoice