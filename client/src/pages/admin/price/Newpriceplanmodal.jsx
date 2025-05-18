import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/Dashboard/Dashboardleftside';
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

// =====================tag-addd==============================
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
            <AiOutlineClose
              className="cursor-pointer text-[13px] text-red-500"
              onClick={() => removeTag(tag)}
            />
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 w-full  outline-none text-input_text 2xl:text-[15px] placeholder-gray-700"
        />
      </div>
    </div>
  );
};
// ====================tag-add================================
const Newpriceplanmodal = () => {
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

    const editor = useRef(null);
    const [content, setContent] = useState('');
  const [isCodeView, setIsCodeView] = useState(false); // Flag to toggle between code view and rich text view
  // --------------tag-state-------------
  const [technologyTags, setTechnologyTags] = useState([]);
  const [supportTags, setSupportTags] = useState([]);
  //  ----------handle image 
     const [profileImage, setProfileImage] = useState(documentation_img);
  
    // Handle image selection
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setProfileImage(reader.result);
        reader.readAsDataURL(file);
      }
    };
  // ------------image upload popup------
   const [activeTab, setActiveTab] = useState("library"); // 
      const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]); // List of uploaded images
    const [searchTerm, setSearchTerm] = useState(""); // Search term
    const [searchTerm2, setSearchTerm2] = useState("");
     const [filteredSuggestions, setFilteredSuggestions] = useState([]);
     const user_access_data = [
      { id: 1, name: "Administration" },
      { id: 2, name: "Sales Manager" },
      { id: 3, name: "Marketing Manager" },
    ];
    // Toggle popup visibility
    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };
  
    // Handle file upload
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
  
    // Select image from popup
    const selectImage = (image) => {
      setProfileImage(image.src); // Set the selected image as the profile image
      setIsPopupOpen(false); // Close the popup
    };
  
    // Filter images based on the search term
    const filteredImages = uploadedImages.filter((image) =>
      image.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
    <form action=""className='pt-[20px] h-auto'>

    <div className='w-full flex justify-center items-center gap-[15px] mb-[20px]'>
    
                 <div className='w-[100%] lg:w-[50%]'>
                       <label htmlFor=""className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Name</label> <br />
                       <input type="text"placeholder='Name' className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                   </div>
                     <div className='w-[100%] lg:w-[50%]'>
                       <label htmlFor=""className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Note</label> <br />
                       <input type="text"placeholder='Note' className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                   </div>
             </div>
             <div className='w-full flex justify-center lg:flex-row flex-col items-center gap-[10px] lg:gap-[15px] mb-[20px]'>
                 <div className='w-[100%] lg:w-[50%]'>
                       <label htmlFor=""className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Price</label> <br />
                       <input type="text"placeholder='Price' className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                   </div>
                     <div className='w-[100%] lg:w-[50%]'>
                       <label htmlFor=""className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Credits</label> <br />
                       <input type="text"placeholder='Credits' className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                   </div>
             </div>
             <div className='w-full flex justify-center items-center gap-[15px] mb-[20px]'>
                 <div className='w-[100%] lg:w-[50%]'>
                       <label htmlFor=""className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Media Size </label> <br />
                       <input type="text"placeholder='Media Size' className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                   </div>
                     <div className='w-[100%] lg:w-[50%]'>
                       <label htmlFor=""className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Traffic</label> <br />
                       <input type="text"placeholder='Traffic' className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                   </div>
             </div>
             <div className="w-full flex justify-center items-center gap-[15px] mb-[20px]">
   <TagInput label="Technology" placeholder="Technology" tags={technologyTags} setTags={setTechnologyTags} />
   <TagInput label="Support" placeholder="Support" tags={supportTags} setTags={setSupportTags} />
   </div>
                 <div className='w-[100%]  mb-[20px]'>
                       <label htmlFor=""className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Description </label>
            <div className='mt-[3px] xl:mt-[7px]'>
            <SunEditor
       setContents={content}
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
     />
            </div>
                   </div>
   
                  <div className='flex justify-end items-center gap-[10px]'>
                  <button className='px-[30px] py-[8px] text-gray-800 bg-gray-300 text-[14px] gap-[8px]  flex justify-center items-center rounded-[5px] cursor-pointer'>Cancel</button>

                                                  <button className='px-[30px] py-[10px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>Submit</button>
                                               </div>
             </form>
  )
}

export default Newpriceplanmodal