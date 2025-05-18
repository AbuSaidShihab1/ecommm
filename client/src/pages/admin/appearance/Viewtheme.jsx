import React,{useContext, useState} from "react";
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { TbCoins } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Header } from "rsuite";
import { Contextapi } from "../../../context/Appcontext";
import Dashboardheader from "../../../components/dashboard/Dashboardheader";
import Dashboardleftside from "../../../components/Dashboard/Dashboardleftside";

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
  ];

  const ITEMS_PER_PAGE = 18;
const Viewtheme = () => {
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
 <section className='w-[100%] m-auto py-[20px]  xl:py-[40px] px-[20px] lg:px-[30px]'>
 <section className="">
    <Header/>
     <div className="">
      <div>


        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Bizzerer – Consulting Business</h1>
        <nav className="text-sm text-gray-500 mb-4 flex  justify-start items-center">
          Business <span className="mx-1"><FaAngleRight/></span> <span className="text-black">Bizzerer – Consulting Business</span>
        </nav>
      </div>
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Content */}
      <div className="lg:col-span-2">
      
        {/* Main Image */}
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <img
            src="https://wp.bdevs.net/markite/wp-content/uploads/2021/06/zibber.jpg"
            alt="Bizzerer Theme"
            className="w-full"
          />
        </div>

        {/* Tabs */}
         {/* Tabs */}
         <div className="flex mt-6 border-b border-gray-200 space-x-6">
              <button
                className={`text-sm cursor-pointer font-medium pb-2 ${
                  activeTab === "description"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`text-sm cursor-pointer font-medium pb-2 ${
                  activeTab === "reviews"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews (0)
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "description" && (
              <div>
                {/* Template Details */}
                <section className="mt-6 text-gray-700">
                  <h2 className="text-xl font-bold mb-3">Template Details</h2>
                  <p className="mb-3">
                    The little rotter absolutely bladdered wind up victoria...
                  </p>
                  <p>
                    What a plonker say william mush bite your arm off brown...
                  </p>
                </section>

                {/* Template Features */}
                <section className="mt-6">
                  <h2 className="text-xl font-bold mb-3">Template Features:</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Fully Responsive Layout</li>
                    <li>CMS for Courses (Products)</li>
                    <li>CMS for Workshops</li>
                    <li>Symbols for Common Elements</li>
                    <li>Pre-Built Templates for Common Pages</li>
                    <li>Royalty-Free Google Fonts</li>
                    <li>Easy-to-Change Global Color Swatches</li>
                    <li>Working Contact Page</li>
                    <li>Slider Testimonial Section</li>
                    <li>Elegant Micro Interactions</li>
                  </ul>
                </section>
              </div>
            )}

{activeTab === "reviews" && (
  <div className="mt-6">


    {/* Add a review form */}
    <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
    <p className="text-sm text-gray-600 mb-2">Your rating</p>
    <div className="flex text-yellow-400 mb-7">
      {Array(5)
        .fill()
        .map((_, i) => (
          <span key={i}>&#9734;</span> // empty star
        ))}
    </div>
    <form className="space-y-4">
      <textarea
        className="w-full p-3 bg-gray-100 rounded"
        placeholder="Your review"
        rows={4}
      ></textarea>
      <input
        type="text"
        placeholder="Name *"
        className="w-full p-3 bg-gray-100 rounded"
        required
      />
      <input
        type="email"
        placeholder="Email *"
        className="w-full p-3 bg-gray-100 rounded"
        required
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        Add Your Review
      </button>
    </form>
        {/* Existing reviews */}
        <div className="space-y-6 mb-8 mt-4">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>

      <div className="bg-gray-50 p-4 rounded border-[1px] border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold">John Doe</span>
          <span className="text-yellow-400 text-[22px]">
            {'★'.repeat(5)}{'☆'.repeat(0)}
          </span>
        </div>
        <p className="text-sm text-gray-600">Absolutely loved the product! Highly recommended.</p>
      </div>

      <div className="bg-gray-50 p-4 rounded border-[1px] border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold">Sarah Ahmed</span>
          <span className="text-yellow-400 text-[22px]">
            {'★'.repeat(4)}{'☆'.repeat(1)}
          </span>
        </div>
        <p className="text-sm text-gray-600">Great quality but delivery was a bit slow.</p>
      </div>

      <div className="bg-gray-50 p-4 rounded border-[1px] border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold">Liam Carter</span>
          <span className="text-yellow-400 text-[22px]">
            {'★'.repeat(3)}{'☆'.repeat(2)}
          </span>
        </div>
        <p className="text-sm text-gray-600">Good for the price. Could be improved.</p>
      </div>
    </div>
  </div> 
)}


     
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        {/* Info Box */}
        <div className="bg-white shadow border-[1px] border-gray-200 rounded-[5px] p-6 space-y-4">
          <button className="w-full bg-[#F68A1F] cursor-pointer hover:bg-[#F47514] text-white text-[16px] py-[10px] rounded-md">Live Preview</button>
          <button className="w-full bg-gray-100 text-black cursor-pointer hover:bg-gray-200 text-sm py-2 border-[1px] border-gray-300 rounded-md">Create Website</button>
          <div className="grid grid-cols-2 gap-4 pt-4 text-sm text-gray-700">
            <div>
              <p className="font-bold">Install:</p>
              <p>100,000+</p>
            </div>
            <div>
              <p className="font-bold">Released On:</p>
              <p>16 February 2021</p>
            </div>
            <div>
              <p className="font-bold">Version:</p>
              <p>1.0</p>
            </div>
            <div>
              <p className="font-bold">Framework:</p>
              <p>React, Next.js</p>
            </div>
          </div>
        </div>

        {/* Banner CTA */}
        <div
          className="h-[200px] p-6 text-white  shadow"
          style={{
            backgroundImage:
              'url(https://wp.bdevs.net/markite/wp-content/themes/markite/assets/img/product/banner-bg.jpg)',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 className="text-lg font-semibold mb-2">Check Out Our Free Templates</h3>
          <button className="bg-white text-black hover:bg-gray-200 text-sm py-2 px-4 rounded-md">Free Template</button>
        </div>
      </div>
    </div>
  </div>
  <section className="w-full py-[30px] ">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Products</h2>
        <p className="text-gray-500 text-sm">
          From multipurpose themes to niche templates
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
            <div
            key={index}
            className="bg-white rounded-lg shadow-md cursor-pointer  overflow-hidden p-[10px] hover:shadow-xl transition duration-300"
            data-aos="zoom-in"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex  items-center justify-center flex-col opacity-0 hover:opacity-100 z-[100] bg-[rgba(0,0,0,0.6)] transition-opacity duration-300">
                <button className="bg-white text-xs md:text-sm w-[150px] px-4  cursor-pointer py-[10px] rounded font-medium border-[2px] border-white hover:bg-gray-100">
                  Live Preview
                </button>
                <button className="mt-[10px] text-white text-xs  w-[150px] px-4 cursor-pointer font-[600] py-[10px] md:text-sm border-[2px] border-white rounded ">
                  Create Website
                </button>
              </div>
            </div>
            <div className="p-4">
            <div className="flex items-center justify-between">
            <span className="text-[16px] bg-gray-200 text-gray-700 px-2 py-1 rounded">
                {product.category}
              </span>
        <p className="mt-1 text-sm md:text-[20px] font-[600] text-gray-700 flex justify-center items-center gap-1">
                    <TbCoins className="text-[#F68A1F]"/>
                    {product.price}
                  </p>
            </div>
              <p className="mt-2 font-semibold text-sm md:text-base text-gray-900">
                {product.title}
              </p>
            
            </div>
          </div>
        ))}
      </div>
    </section>
   </section>
       </section>
        </section>
    </section>
  );
};

export default Viewtheme;
