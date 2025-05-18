import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import {FaChevronUp } from "react-icons/fa";
const SelectionBox = ({ title, options }) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (option) => {
    setSelected(option);
    setExpanded(false);
  };

  return (
    <div className="w-full relative">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        {title}
      </label>
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center w-full mt-[3px] 2xl:mt-[7px] bg-white border-[1px] border-[#eee] h-input_height 2xl:h-[45px] text-gray-800 px-4 py-2 rounded-[5px] cursor-pointer"
      >
        <p className="text-input_text 2xl:text-[15px]">
          {selected || title}
        </p>
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {expanded && (
        <ul className="absolute w-full bg-white shadow-md rounded-lg mt-1 p-2 z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 text-input_text 2xl:text-[15px] cursor-pointer rounded-md transition"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
const Bnewdelivery = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [showmodal, setmodal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const uploadpost = () => {
    setmodal(true);
  };

  function handlesidebar() {
    setactivesidebar(!activesidebar);
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState("Pathao Courier");

  const options = ["Pathao Courier", "SteadFast Courier"];
  
  const handleOptionClick = (option) => {
    setSelectedCourier(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option => option.toLowerCase().includes(searchQuery.toLowerCase()));

  // ------------------select-type------------------------
  const [deliveryType, setDeliveryType] = useState("Select Delivery Type");
  const [itemType, setItemType] = useState("Select Item Type");
  const [isDeliveryDropdownOpen, setIsDeliveryDropdownOpen] = useState(false);
  const [isItemDropdownOpen, setIsItemDropdownOpen] = useState(false);

  const deliveryOptions = ["Normal Delivery", "On-Demand Delivery", "Express Delivery"];
  const itemOptions = ["Parcel", "Document", "Fragile"];
  const [deliveryOption, setDeliveryOption] = useState('Home'); // Default to Home Delivery

  // Handle change of delivery option
  const handleDeliveryChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>New Product Delivery</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[13px] lg:text-[14px]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Products</li>
                <li><IoIosArrowForward /></li>
                <li>New Product Delivery</li>
              </ul>
            </div>
          </div>

          {/* ------------------new customer table----------------- */}
          <section className='pt-[40px] w-full pb-[30px]'>
            <div className="relative w-full">
              {/* Custom Dropdown */}
              <div
                className="flex items-center justify-between border border-gray-300 bg-white p-3 rounded cursor-pointer shadow-sm hover:border-gray-500"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <span className="text-gray-700 text-[14px] 2xl:text-[17px] font-medium">{selectedCourier}</span>
                <FiChevronDown className="text-gray-500" />
              </div>

              {/* Dropdown Search */}
              {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md mt-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border-b border-gray-300 w-full"
                    placeholder="Search Courier"
                  />
                  {filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-[14px] 2xl:text-[17px] font-medium"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

              {/* Form for "Pathao Courier" */}
              {selectedCourier === "Pathao Courier" && (
     <form action="" className="pt-[15px] lg:pt-[20px]">
     <h1 className='text-[17px] 2xl:text-[22px] font-[600] mb-[20px]'>Pathao Courier</h1>
     <div className="w-full flex flex-col gap-[20px]">
       {/* Name */}
       <div className="w-full">
         <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
           Name
         </label>
         <input
           type="text"
           placeholder="Name"
           className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
         />
       </div>
   
       {/* Phone */}
       <div className="w-full">
         <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
           Phone
         </label>
         <input
           type="text"
           placeholder="Phone"
           className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
         />
       </div>
   
       {/* Secondary Phone */}
       <div className="w-full">
         <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
           Secondary Phone
         </label>
         <input
           type="text"
           placeholder="Secondary Phone"
           className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
         />
       </div>
       <div className="w-full">
         <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
           Order Number
         </label>
         <input
           type="text"
           placeholder="Order Number"
           className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
         />
       </div>
       <div className="w-full">
         <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
          Collectible Amount
         </label>
         <input
           type="text"
           placeholder="Collectible Amount"
           className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
         />
       </div>
       <div className="w-full">
         <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
         Weight
         </label>
         <input
           type="text"
           placeholder="Weight"
           className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
         />
       </div>
       <div className="w-full">
         <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
         Quantity
         </label>
         <input
           type="text"
           placeholder="Quantity"
           className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
         />
       </div>
 

       {/* Address */}
       <div className="w-full">
         <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
           Address
         </label>
         <textarea
           placeholder="Enter address here"
           className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[80px] border-[1px] border-[#eee] p-[12px]"
         ></textarea>
       </div>
       <div className="flex flex-col gap-4 ">
      <SelectionBox title="Delivery Type" options={["Normal Delivery", "On-Demand", "Express Delivery"]} />
      <SelectionBox title="Item Type" options={["Parcel", "Document", "Fragile"]} />
    </div>
       <div className="w-full">
         <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
         Special Instruction
         </label>
         <input
           type="text"
           placeholder="Special Instruction"
           className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
         />
       </div>
       <div className="w-full">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Note
      </label>
      <textarea
        type="text"
        placeholder="Note"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[150px] border-[1px] border-[#eee] p-[12px]"
      ></textarea>
    </div>
     </div>
     <div className="flex justify-end items-center gap-[10px] mt-[20px]">
       <button className='px-[30px] py-[10px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'>
         Draft
       </button>
       <button className='px-[30px] py-[10px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
         Submit
       </button>
     </div>
   </form>
   
              )}
                    {selectedCourier === "SteadFast Courier" && (
                      <form action="" className="pt-[15px] lg:pt-[20px]">
  <div className="w-full flex flex-col gap-[20px]">
    <div className="w-full">
      <h1 className="text-[18px] 2xl:text-[22px] font-[500] mb-[20px]">SteadFast Courier</h1>
      <div className="mt-[8px] flex gap-[20px]">
        <label className="flex items-center gap-[8px] text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
          <input
            type="radio"
            name="deliveryOption"
            value="Home"
            checked={deliveryOption === "Home"}
            onChange={handleDeliveryChange}
            className="cursor-pointer"
          />
          Home Delivery
        </label>
        <label className="flex items-center gap-[8px] text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
          <input
            type="radio"
            name="deliveryOption"
            value="Point"
            checked={deliveryOption === "Point"}
            onChange={handleDeliveryChange}
            className="cursor-pointer"
          />
          Point Delivery
        </label>
      </div>
    </div>

    <div className="w-full">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Name
      </label>
      <input
        type="text"
        placeholder="Name"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>

    <div className="w-full">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Phone
      </label>
      <input
        type="text"
        placeholder="Phone"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>

    {deliveryOption === "Home" && (
      <>
        <div className="w-full">
          <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
          />
        </div>

        <div className="w-full">
          <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
            District
          </label>
          <input
            type="text"
            placeholder="District"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
          />
        </div>

        <div className="w-full">
          <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
            Thana
          </label>
          <input
            type="text"
            placeholder="Thana"
            className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
          />
        </div>
      </>
    )}

    {deliveryOption === "Point" && (
      <div className="w-full">
        <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
          Delivery Point
        </label>
        <input
          type="text"
          placeholder="Delivery Point"
          className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        />
      </div>
    )}

    <div className="w-full">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        COD Amount
      </label>
      <input
        type="text"
        placeholder="COD Amount"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>

    <div className="w-full">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Invoice
      </label>
      <input
        type="text"
        placeholder="Invoice"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>

    <div className="w-full">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Note
      </label>
      <textarea
        type="text"
        placeholder="Note"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-[150px] border-[1px] border-[#eee] p-[12px]"
      ></textarea>
    </div>

    <div className="w-full">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        Weight
      </label>
      <input
        type="text"
        placeholder="Weight"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
    <div className="w-full">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
      Exchange
      </label>
      <input
        type="text"
        placeholder="Exchange"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
      />
    </div>
  </div>

  <div className="flex justify-end items-center gap-[10px] mt-[20px]">
    <button className="px-[30px] py-[10px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer">
      Draft
    </button>
    <button className="px-[30px] py-[10px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer">
      Submit
    </button>
  </div>
</form>

      )}
            </div>
          </section>
        </section>
      </section>
      </section>
)
}

export default Bnewdelivery 








