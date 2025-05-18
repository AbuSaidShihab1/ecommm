import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import JoditEditor from 'jodit-react';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { AiOutlineClose } from "react-icons/ai";
import documentation_img from "../../../assets/documentation.png"
import { FaCamera } from "react-icons/fa";
import axios from 'axios';

const TagInput = ({ label, placeholder, tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-[100%] lg:w-[50%]">
      <label className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600">
        {label}
      </label>
      <div className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] border-[1px] border-[#eee] p-[12px] flex flex-wrap gap-2 items-center min-h-[45px]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded flex items-center gap-1"
          >
            {tag}
      
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={true}
          className="flex-1 w-full  outline-none text-input_text 2xl:text-[15px] placeholder-gray-700"
        />
      </div>
    </div>
  );
};

const Viewpriceplan = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [showmodal, setmodal] = useState(false);
  const { id } = useParams();
  
  const [pricePlan, setPricePlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const admin_token = localStorage.getItem("adminToken");

  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // Fetch price plan data
  useEffect(() => {
    const fetchPricePlan = async () => {
      try {
        const response = await axios.get(`${base_url}/super/admin/price-plan/${id}`, {
          headers: {
            Authorization: `Bearer ${admin_token}`
          }
        });
        
        if (response.data.success) {
          setPricePlan(response.data.data);
          // Set all the state values from the fetched data
          setProfileImage(response.data.data.image || documentation_img);
          setTechnologyTags(response.data.data.technologies || []);
          setSupportTags(response.data.data.supports || []);
          setContent(response.data.data.description || '');
        } else {
          setError(response.data.message || 'Failed to fetch price plan');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching price plan');
      } finally {
        setLoading(false);
      }
    };

    fetchPricePlan();
  }, [id, base_url, admin_token]);

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

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [isCodeView, setIsCodeView] = useState(false);
  
  // Tag states
  const [technologyTags, setTechnologyTags] = useState([]);
  const [supportTags, setSupportTags] = useState([]);
  
  // Image states
  const [profileImage, setProfileImage] = useState(documentation_img);
  const [activeTab, setActiveTab] = useState("library");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages((prev) => [...prev, { id: Date.now(), title: `Image ${prev.length + 1}`, src: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectImage = (image) => {
    setProfileImage(image.src);
    setIsPopupOpen(false);
  };

  const filteredImages = uploadedImages.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
          <Dashboardleftside />
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Dashboradheader />
          <div className="flex justify-center items-center h-[80vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand_color"></div>
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
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Dashboradheader />
          <div className="flex justify-center items-center h-[80vh]">
            <div className="text-red-500 text-lg">{error}</div>
          </div>
        </section>
      </section>
    );
  }

  if (!pricePlan) {
    return (
      <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
          <Dashboardleftside />
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Dashboradheader />
          <div className="flex justify-center items-center h-[80vh]">
            <div className="text-gray-500 text-lg">Price plan not found</div>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[20px] lg:px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>View Price Plan</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[13px] font-[500] lg:text-[14px]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Retail Customer</li>
                <li><IoIosArrowForward /></li>
                <li>View Price Plan</li>
              </ul>
            </div>
            <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
              <BiImport className='text-[25px]' />
              Import
            </button>
          </div>

          <section className='pt-[40px] pb-[30px]'>
            <form action="" className='pt-[20px]'>
              <div className="relative w-40 h-40 mb-[30px]">
                <div className="w-full h-full rounded-[10px] overflow-hidden border-2 border-gray-300">
                  <img
                    src={pricePlan.image || documentation_img}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="profileImageInput"
                  onClick={togglePopup}
                  className="absolute bottom-1 right-2 bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-500"
                >
                  <FaCamera className="w-4 h-4" />
                </label>
              </div>

              <div className='w-full flex justify-center items-center gap-[15px] mb-[20px]'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Name</label>
                  <input 
                    type="text" 
                    value={pricePlan.name || ''}
                    readOnly
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100"
                  />
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Note</label>
                  <input 
                    type="text" 
                    value={pricePlan.note || ''}
                    readOnly
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100"
                  />
                </div>
              </div>

              <div className='w-full flex justify-center lg:flex-row flex-col items-center gap-[10px] lg:gap-[15px] mb-[20px]'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Price</label>
                  <input 
                    type="text" 
                    value={pricePlan.price || ''}
                    readOnly
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100"
                  />
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Credits</label>
                  <input 
                    type="text" 
                    value={pricePlan.credits || ''}
                    readOnly
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100"
                  />
                </div>
              </div>

              <div className='w-full flex justify-center items-center gap-[15px] mb-[20px]'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Media Size</label>
                  <input 
                    type="text" 
                    value={pricePlan.mediaSize || ''}
                    readOnly
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100"
                  />
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Traffic</label>
                  <input 
                    type="text" 
                    value={pricePlan.traffic || ''}
                    readOnly
                    className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px] bg-gray-100"
                  />
                </div>
              </div>

              <div className="w-full flex justify-center items-center gap-[15px] mb-[20px]">
                <TagInput 
                  label="Technology" 
                  placeholder="Technology" 
                  tags={technologyTags} 
                  setTags={setTechnologyTags} 
                />
                <TagInput 
                  label="Support" 
                  placeholder="Support" 
                  tags={supportTags} 
                  setTags={setSupportTags} 
                />
              </div>

              <div className='w-[100%] mb-[20px]'>
                <label htmlFor="" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Description</label>
                <div className='mt-[3px] xl:mt-[7px]'>
                  <SunEditor
                    setContents={pricePlan.description || ''}
                    onChange={setContent}
                    setOptions={{
                      width: "100%",
                      height: 250,
                      buttonList: [
                        ["undo", "redo"],
                        ["formatBlock", "fontSize"],
                        ["bold", "italic", "underline", "strike"],
                        ["fontColor", "hiliteColor"],
                        ["align", "list", "indent", "outdent"],
                        ["table", "link", "image"],
                        ["codeView"],
                      ],
                    }}
                    enableCodeView={isCodeView}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className='flex justify-end items-center gap-[10px]'>
                <button 
                  type="button"
                  onClick={() => navigate(-1)}
                  className='px-[30px] py-[10px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'
                >
                  Back
                </button>
              </div>
            </form>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Viewpriceplan;