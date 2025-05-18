import React,{useContext, useState} from "react";
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { TbCoins } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Header } from "rsuite";
import { Contextapi } from "../../../../context/Appcontext";
import Dashboardheader from "../../../../components/dashboard/Dashboardheader";
import Dashboardleftside from "../../../../components/Dashboard/Dashboardleftside";

const categories = [
  {
    name: "Agriculture Machinery",
    subcategories: [],
  },
  {
    name: "Chemical & Reagents",
    subcategories: [],
  },
  
  {
    name: "Construction Equipment",
    subcategories: [],
  },
  {
    name: "Digital Testing Meter",
    subcategories: [
      "Conductivity EC Meter",
      "Digital Anemometer",
      "Digital Indicator",
      "Digital Lux Meter",
      "Digital Stopwatch Timer",
      "Digital Tachometer",
      "Digital Vernier Caliper",
      "Environment Meter",
      "External Caliper",
      "Infrared Thermometer",
      "Inside Caliper",
      "Internal Caliper",
      "Laser Distance Meter",
      "Micro Meter",
      "Moisture Meter",
      "Outside Caliper",
      "Oxygen Meter",
      "PH Meter",
      "Salt Water Tester",
      "Sound Level Meter",
      "TDS Meter",
      "TDS Salinity Meter",
      "Temperature Meter",
    ],
  },
];

const products = [
  {
    category: "Construction",
    title: "Landco – Gardening Theme",
    price: "170",
    image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/zibber.jpg", // Replace with your actual image path
    author: "By Markite In WordPress",
  },
  {
    category: "Templates",
    title: "Pixen – Printing Services Company",
    price: "10",
    image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/frintem.jpg", // Replace with your actual image path
    author: "By Markite In Templates",
  },
  {
    category: "Technology",
    title: "Medicheck – Medical WordPress",
    price: "100",
    image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/govetpress.jpg", // Replace with your actual image path
    author: "By Markite In Templates",
  },
  {
    category: "Technology",
    title: "Medicheck – Medical WordPress",
    price: "100",
    image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/govetpress.jpg", // Replace with your actual image path
    author: "By Markite In Templates",
  },
];
// ---------themes---------------
const themes = [
  
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
    {
      title: "Aermico – Spa and Beauty",
      type: "Business",
      price: "100",
      image: "https://wp.bdevs.net/markite/wp-content/uploads/2021/06/termico.jpg",
    },
  ];

  const ITEMS_PER_PAGE = 18;
const Viewthemecategory = () => {
    const [openCategory, setOpenCategory] = useState("Digital Testing Meter");
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);

    const toggleCategory = (categoryName) => {
      setOpenCategory(openCategory === categoryName ? null : categoryName);
    };
    const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(themes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedThemes = themes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const [categoryBoxOpen, setCategoryBoxOpen] = useState(true);

  const toggleCategoryBox = () => {
    setCategoryBoxOpen(!categoryBoxOpen);
  };
  const [activeTab, setActiveTab] = useState("description");

  
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboardheader/> 
 <section className='w-full py-[20px]'>
 <section className={`bg-[#F2F4F8] `}>
    <Header/>
   <div className="bg-white border-b-[1px] border-gray-100">
   <div className="bg-white  px-[20px] py-[20px]">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6 space-x-2">
        <span>Home</span>
        <FaAngleRight className="text-xs" />
        <span className="text-black font-medium">Digital Testing Meter</span>
      </div>
      {/* Title */}
      <h1 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">
        Digital Testing Meter Supplier in Bangladesh
      </h1>
      {/* Content */}
      <p className="text-sm md:text-base lg:text-[15px] leading-7 text-gray-700">
        <span>Digital Testing Meter</span> is available at Equipment Marketing Company. These <span>Digital Testing Meter</span> are very high quality and best Price. If you are looking <span>Digital Testing Meter</span>, it can be good deals for you and This <span>Digital Testing Meter</span> is suitable you. If want to save money on <span>Digital Testing Meter</span>, Always keep an eye out for the multiple promotions of <span>Digital Testing Meter</span> on Equipment Marketing Company. You can purchase online at Equipment Marketing Company to enjoy great prices on <strong>Digital Testing Meter</strong>. We are supplier of all types of <span>Digital Testing Meter</span>. We are the best supplier of <span>Digital Testing Meter</span> in Bangladesh.
      </p>
    </div>
   </div>
{/* ---------------------------product----------------- */}
 <section className="flex py-[20px]  px-[20px]  gap-[10px] flex-col-reverse lg:flex-row">
 <div className="w-full lg:w-[30%] bg-white h-full border border-gray-200 ">
      <div className={categoryBoxOpen ? "flex items-center justify-between cursor-pointer mb-2  p-[15px] border-b-[1px] border-gray-200":"flex items-center p-[15px] justify-between  cursor-pointer "} onClick={toggleCategoryBox}>
        <h2 className="text-lg font-semibold">Categories</h2>
        {categoryBoxOpen ? (
          <MdKeyboardArrowLeft className="text-xl text-gray-600" />
        ) : (
          <FiChevronDown className="text-xl text-gray-600" />
        )}
      </div>

      <AnimatePresence>
        {categoryBoxOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 overflow-hidden p-[15px]"
          >
            {categories.map((category) => (
              <li key={category.name}>
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex items-center justify-between w-full text-left font-medium hover:text-[#F68A1F]"
                >
                  <span>{category.name}</span>
                  {category.subcategories.length > 0 && (
                    <span className="cursor-pointer text-gray-500">
                      {openCategory === category.name ? <FiMinus /> : <FiPlus />}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {openCategory === category.name && category.subcategories.length > 0 && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden ml-4 space-y-2 mt-[10px] text-sm lg:text-[16px] text-gray-700"
                    >
                      {category.subcategories.map((sub) => (
                        <li key={sub} className="hover:underline cursor-pointer">
                          {sub}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
    {/* ------themes------------- */}
    <div className=" w-full  lg:w-[100%]">
      {/* -------------------top-filter-------------------------- */}
      <div className="bg-white mb-[10px] border-[1px] border-gray-200  p-4 rounded flex items-center justify-between">
      <h2 className="font-bold text-lg">Theme</h2>

      <div className="flex items-center gap-4">
        {/* Show Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Show:</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 text-sm px-3 py-1.5 pr-8 rounded focus:outline-none">
              <option>20</option>
              <option>40</option>
              <option>60</option>
            </select>
            <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort By:</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 text-sm px-3 py-1.5 pr-8 rounded focus:outline-none">
              <option>Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
      {/* -----------------top=filter------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {selectedThemes.map((product, index) => (
         <div
         key={index}
         className="bg-white rounded-lg shadow-md cursor-pointer  overflow-hidden p-[10px] hover:shadow-xl transition duration-300"
         data-aos="zoom-in"
       >
         <div className="relative rounded-lg overflow-hidden">
           <img
             src={product.image}
             alt={product.title}
             className="w-full h-50 object-cover rounded-lg"
           />
           <div className="absolute inset-0 flex items-center justify-center flex-col opacity-0 hover:opacity-100 z-[100] bg-[rgba(0,0,0,0.6)] transition-opacity duration-300">
             <button className="bg-white text-xs md:text-sm w-[150px] px-4 cursor-pointer py-[10px] rounded font-medium border-[2px] border-white hover:bg-gray-100">
               Live Preview
             </button>
             <button className="mt-[10px] text-white text-xs  w-[150px] cursor-pointer px-4 font-[600] py-[10px] md:text-sm border-[2px] border-white rounded ">
               Create Website
             </button>
           </div>
         </div>
         <div className="p-4">
         <div className="flex items-center justify-between">
         <span className="text-[16px] bg-gray-200 text-gray-700 px-2 py-1 rounded">
             {product.type}
           </span>
         <p className="mt-1 text-sm md:text-[20px] font-[600] text-gray-700 flex justify-center items-center gap-1">
                     <TbCoins className="text-[#F68A1F]"/>
                     {product.price}
                   </p>
         </div>
         <a href="/details">
         <p className="mt-2 font-semibold text-sm md:text-base text-gray-900">
             {product.title}
           </p>`</a>

        
           <p className="text-xs text-gray-500 mt-1">{product.author}</p>
         
         </div>
       </div>
        ))}
      </div>

   {/* Pagination */}
   <div className="flex justify-between items-center mt-8 text-base p-[10px] border-[1px] border-gray-200 rounded-[5px]">
  {/* Results count */}
  <div className="text-gray-600 ml-2">
    {themes?.length} results
  </div>

  {/* Pagination controls */}
  <div className="flex space-x-2">
    {/* Left arrow */}
    {currentPage > 1 && (
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className="text-gray-500 hover:text-gray-700 bg-white px-2 py-1 rounded border-[1px] border-gray-200"
      >
        <FaAngleLeft />
      </button>
    )}

    {[...Array(totalPages)].map((_, i) => i + 1)
      .filter((pageNum) =>
        pageNum === 1 ||
        pageNum === totalPages ||
        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
      )
      .reduce((acc, pageNum, index, array) => {
        if (index > 0 && pageNum - array[index - 1] > 1) {
          acc.push('...');
        }
        acc.push(pageNum);
        return acc;
      }, [])
      .map((pageNum, index) =>
        pageNum === '...' ? (
          <span key={index} className="px-2 text-gray-400">...</span>
        ) : (
          <button
            key={index}
            onClick={() => setCurrentPage(pageNum)}
            className={`px-3 py-1 rounded border-[1px] border-gray-200 ${
              currentPage === pageNum
                ? 'bg-gray-100 text-red-600 font-semibold'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {pageNum}
          </button>
        )
      )}

    {/* Right arrow */}
    {currentPage < totalPages && (
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className="text-gray-500 hover:text-gray-700 bg-white px-2 py-1 rounded  border-[1px] border-gray-200 "
      >
        <FaAngleRight />
      </button>
    )}
  </div>
   </div>
    <div className="bg-white mt-[10px] border-[1px] border-gray-200 ">
      <div className="p-[15px]">
        <h1 className="text-[17px] lg:text-[18px] font-[600]  text-blue-700 mb-2">
          iPhone Available at the Best Price in Bangladesh
        </h1>
        <p className="text-gray-800 mb-4 text-[14px] xl:text-[15px]">
          <span className="text-red-500">iPhones</span> are the trendsetters of smartphones in terms of innovation, design, and versatility. As of 2025, Apple Inc. is the largest tech giant in the world for market capital and revenue. Parallel to Apple's smartphones, the company single-handedly tops every other niche of personal devices with <span className="text-red-500">iPad</span>, <span className="text-red-500">MacBook</span>, <span className="text-red-500">Mac Mini</span>, <span className="text-red-500">Mac</span>, and <span className="text-red-500">MacStudio</span> and a vast ecosystem of accessories.
        </p>
        <p className="text-gray-800 mb-4 text-[14px] xl:text-[15px]">
          Buying an iPhone in Bangladesh can be challenging at times. With Star Tech, the challenge is met. Star Tech <span className="text-red-500">Apple Store</span> offers all the latest iPhones at the most enticing price in Bangladesh. Find the most captivating iPhone deals from our widest segment of Apple devices at the Apple Store.
        </p>

        <h2 className="text-[18px] font-[600]  text-blue-700 mb-2 mt-8 pb-2">
          Latest iPhone Price List in BD 2025
        </h2>
        

        <h2 className="text-[17px] xl:text-[18px] font-[600]  text-blue-700 mb-2 mt-8 pb-2">
          Available iPhone Series in Bangladesh
        </h2>
        <p className="text-gray-800 mb-2 xl:mb-4 text-[14px] xl:text-[15px]">
          Apple releases a new series of <span className="text-red-500">iPhones</span> every year, with two or three variants along with the base model. The latest line of Apple iPhones is the iPhone 16 series, released in 2025. Along with these, there's the iPhone 15 series, the iPhone 14 series, and the iPhone SE, which are great phones and are offered at exciting, reduced prices by Apple.
        </p>

        <h3 className="text-[17px] xl:text-xl font-semibold text-gray-800 mt-6 mb-2">iPhone 16 Series</h3>
        <p className="text-gray-800 mb-4 text-[14px] xl:text-[15px]">
          The latest iPhone 16 series is the successor to the previous gen of the iPhone 15. Currently, Apple sells four variants of the iPhone 16. With the iPhone 16 base model, there's the larger iPhone 16 Plus, and two flagship variants named iPhone 16 Pro and iPhone 16 Pro Max.
        </p>

        <h4 className="text-[17px] xl:text-lg font-semibold text-gray-800 mt-2 xl:mt-4 mb-2">iPhone 16 & iPhone 16 Plus</h4>
        <p className="text-gray-800 mb-4 text-[14px] xl:text-[15px]">
          The regular iPhone 16 and iPhone 16 Plus match every technical specification except the size. While the base model is 6.1 inches in screen size, the affordable flagship iPhone 16 Plus features a giant 6.7-inch Super Retina XDR Display. Both iPhone 16 and iPhone 16 Plus smartphones house Apple's A18 Bionic Chip, running iOS 16. With the Dynamic Island in the iPhone 16 and 16 Plus, these are your best choices to experience the latest iPhone on a budget.
        </p>

        <h4 className="text-[17px] xl:text-lg font-semibold text-gray-800 mt-2 xl:mt-4 mb-2">iPhone 16 Pro & iPhone 16 Pro Max</h4>
        <p className="text-gray-800 mb-4 text-[14px] xl:text-[15px]">
          iPhone 16 Pro and iPhone 16 Pro Max are the latest flagship smartphones from Apple. These models have the latest A18 Pro Bionic Apple silicon and a new octa-core GPU. The iPhone 16 Pro and iPhone 16 Pro Max feature a titanium build and are available in 4 stunning colors: black titanium, natural titanium, white titanium, and desert titanium.
        </p>

        <h3 className="text-[17px] xl:text-xl font-semibold text-gray-800 mt-2 xl:mt-6 mb-2">iPhone 15 Series</h3>
        <p className="text-gray-800 mb-4 text-[14px] xl:text-[15px]">
          The iPhone 15 series introduced several significant upgrades over the iPhone 14 series. The iPhone 15 and 15 Plus feature a 6.1-inch and 6.7-inch Super Retina XDR Display, powered by the A16 Bionic Chip, and introduced USB C connectivity for faster data transfer and versatile charging.
        </p>
      </div>
    </div>
    </div>
 </section>

{/* ---------------------------product----------------- */}

   </section>
       </section>
        </section>
    </section>
  );
};

export default Viewthemecategory;
