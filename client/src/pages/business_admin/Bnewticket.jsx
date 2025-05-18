import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/business_dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { MdOutlineAttachFile } from 'react-icons/md';
import { IoClose } from "react-icons/io5";

const Bnewticket = () => {
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

   const editor = useRef(null); // Ref for the editor instance
    const [content, setContent] = useState(''); // State for editor content

    const config = {
        readonly: false, // Allows editing
        height: 400,
        toolbarSticky: true,
        toolbarAdaptive: true,
        placeholder:"Write message here..."
    };
      // Modules for ReactQuill
const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
      ["image"], // Add image button to toolbar
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "color",
    "background",
    "link",
    "image",
  ];
  const [message,setmessage]=useState("");
  // -----------------rich text editor------------------
    const [codeInput, setCodeInput] = useState("<p>Start editing...</p>");
    const [renderedCSS, setRenderedCSS] = useState(""); // For storing CSS content
    const [isCodeView, setIsCodeView] = useState(false); // Flag to toggle between code view and rich text view
  
    // Function to handle the conversion of code (HTML + CSS) into rendered HTML content for the Text Editor
    const handleCodeToDesign = () => {
      const htmlMatch = codeInput.match(/<style>(.*?)<\/style>/s);
      const css = htmlMatch ? htmlMatch[1] : "";
      setRenderedCSS(css);
  
      const htmlWithoutCss = codeInput.replace(/<style>.*?<\/style>/s, "").trim();
      setContent(htmlWithoutCss);
      setIsCodeView(false); // Set code view to false (rich text mode)
      setActiveTab("text");
    };
  
    useEffect(() => {
      if (renderedCSS) {
        const styleElement = document.getElementById("dynamic-css");
        styleElement.innerHTML = renderedCSS;
      }
    }, [renderedCSS]);
  
    // Function to update the content in the text editor and sync it to code editor
    const handleTextEditorChange = (newContent) => {
      setContent(newContent);
  
      const htmlContent = newContent;
      setCodeInput(`<style>${renderedCSS}</style>` + htmlContent);
    };
     //  ----------------file-upload------------------
        const [files, setFiles] = useState([]);
    
        const handleFileChange = (event) => {
          const selectedFiles = Array.from(event.target.files).map((file) => ({
            file,
            progress: 0,
            uploaded: false,
          }));
      
          setFiles((prev) => {
            const updatedFiles = [...prev, ...selectedFiles];
            updatedFiles.forEach((fileObj, i) => {
              if (!fileObj.uploaded) {
                simulateUpload(fileObj, i, updatedFiles);
              }
            });
            return updatedFiles;
          });
        };
      
        const simulateUpload = (fileObj, index, currentFiles) => {
          const interval = setInterval(() => {
            setFiles((prev) => {
              return prev.map((item, i) => {
                if (i === index && !item.uploaded) {
                  const newProgress = Math.min(item.progress + 10, 100);
                  return { ...item, progress: newProgress, uploaded: newProgress === 100 };
                }
                return item;
              });
            });
      
            if (fileObj.progress >= 100) {
              clearInterval(interval);
            }
          }, 200);
        };
      
        const removeFile = (index) => {
          setFiles((prev) => prev.filter((_, i) => i !== index));
        };
      // ------------image upload popup------
         const [isVisible, setIsVisible] = useState(true);
           const [websiteIcon, setWebsiteIcon] = useState(""); // State for website icon
           const [tab, setTab] = useState("library"); // Active tab for media library/upload
           const [popupOpen, setPopupOpen] = useState(false); // State to handle popup visibility
           const [imageList, setImageList] = useState([]); // List of uploaded images
           const [searchQuery, setSearchQuery] = useState(""); // Search term for image search
           const [filteredImageList, setFilteredImageList] = useState([]); // Filtered images based on search term
         
            const [profileImage, setProfileImage] = useState(
             "https://i.ibb.co.com/HBsfNMb/avatar.jpg"
           );
         
           const [uploadedImages, setUploadedImages] = useState([]); // List of uploaded images
           const [searchTerm2, setSearchTerm2] = useState("");
            const [filteredSuggestions, setFilteredSuggestions] = useState([]);
            const [isPopupOpen, setIsPopupOpen] = useState(false);
            const [activeTab, setActiveTab] = useState("library");
            const [searchTerm, setSearchTerm] = useState("");
            // const [filteredImages, setFilteredImages] = useState(mockImages); // you can replace this with real data
            
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
    
         
           // Filter images based on the search term
           const filteredImages = uploadedImages.filter((image) =>
             image.title.toLowerCase().includes(searchTerm.toLowerCase())
           );
         
           const toggleCustomUserAccess = () => {
             setIsCustomUserEnabled(!isCustomUserEnabled);
           };
            // Toggle the visibility of the popup
        const togglePopupVisibility = () => {
          setPopupOpen(!popupOpen);
        };
      
        // Handle file upload (website icon in this case)
        const handleIconUpload = (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              setImageList((prev) => [
                ...prev,
                { id: Date.now(), title: `Image ${prev.length + 1}`, src: reader.result },
              ]);
            };
            reader.readAsDataURL(file);
          }
        };
      
        // Select image as website icon
        const chooseImageAsIcon = (image) => {
          setWebsiteIcon(image.src); // Set the selected image as the website icon
          setPopupOpen(false); // Close the popup
        };
      
        // Filter images based on the search term
        const filterImages = imageList.filter((image) =>
          image.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // ---------------------
        //  ----------handle image 
      
        
          // Handle image selection
          const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => setProfileImage(reader.result);
              reader.readAsDataURL(file);
            }
          };
  
          const selectImage = (image) => {
            const newFile = {
              file: {
                name: image.title,
                size: 500000, // dummy size or you can fetch it via metadata
              },
              progress: 0,
              uploaded: false,
            };
          
            setFiles((prev) => [...prev, newFile]);
          
            simulateUploadProgress(newFile); // simulate or replace with real upload
          
            togglePopup();
          };
          const simulateUploadProgress = (fileObj) => {
            let progress = 0;
            const interval = setInterval(() => {
              progress += 10;
              setFiles((prevFiles) =>
                prevFiles.map((f) =>
                  f.file.name === fileObj.file.name ? { ...f, progress, uploaded: progress >= 100 } : f
                )
              );
          
              if (progress >= 100) clearInterval(interval);
            }, 200);
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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>New Ticket</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
               <li>Support Ticket</li>
            <li><IoIosArrowForward/></li>
            <li>New Ticket</li>
          </ul>
        </div>
        <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
            <BiImport className='text-[25px]'/>
            Import
        </button>
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>
            {/* -------------------form---------------------- */}
                  <form action=""className='pt-[20px]'>

                     <div className='w-[100%]  mb-[20px]'>
                            <label  className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Account Holder</label>
                            <input type="text"value="Albert Flores"disabled placeholder='Account Holder'  className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
               <div className='w-[100%]  mb-[20px]'>
                            <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Shop Name</label>
                            <input type="text"placeholder='Shop Name'   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                        <div className='w-[100%]  mb-[20px]'>
                            <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Email</label>
                            <input type="text"placeholder='Email'   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                        <div className='w-[100%]  mb-[20px]'>
                            <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Subject</label>
                            <input type="text"placeholder='Subject'   className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"/>
                        </div>
                      <div className='w-[100%]  mb-[20px]'>
                            <label htmlFor="" className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600">Message</label>
                   <div className=' mt-[3px] 2xl:mt-[7px] '>
                   <SunEditor
            setContents={content}
            onChange={setContent}
            setOptions={{
              width: "100%",
              height: 400,
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
{/* -------------------------attachment------------------------ */}
        <div className="mt-4 space-y-2">
  {files.map((fileObj, index) => (
    <div key={index} className="relative p-2 border rounded-md flex items-center">
      <div className="flex-1">
        <span className="text-sm">
          {fileObj.file.name} ({(fileObj.file.size / 1024).toFixed(1)}KB)
        </span>
        {!fileObj.uploaded && (
          <div className="h-[8px] bg-gray-300 mt-1 w-full">
            <div
              className="h-[8px] bg-brand_color"
              style={{ width: `${fileObj.progress}%` }}
            ></div>
          </div>
        )}
      </div>
      {fileObj.uploaded && (
        <button onClick={() => removeFile(index)} className="ml-2">
          <IoClose className="text-gray-500 hover:text-red-500" />
        </button>
      )}
    </div>
  ))}
</div>

              

        {/* Popup */}
        {  isPopupOpen && (
        <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b  border-gray-300">
              <h2 className="text-lg font-semibold">Upload Images </h2>
              <button
                onClick={togglePopup}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
  
            {/* Tabs */}
            <div className="flex border-b  border-gray-300">
                  <div
                onClick={() => setActiveTab("library")}
                className={`w-1/2 py-2 text-center  ${
                  activeTab === "library"
                    ? "border-b-2 border-brand_color text-brand_color cursor-pointer font-semibold"
                    : "text-gray-600 hover:text-brand_color cursor-pointer"
                }`}
              >
                Media Library
              </div>
              <div
                onClick={() => setActiveTab("upload")}
                className={`w-1/2 py-2 text-center ${
                  activeTab === "upload"
                    ? "border-b-2 border-brand_color text-brand_color cursor-pointer font-semibold"
                    : "text-gray-600 hover:text-brand_color cursor-pointer"
                }`}
              >
                Upload New
              </div>
          
            </div>
  
            {/* Content */}
            <div className="p-4">
              {activeTab === "upload" && (
                <div>
                  {/* Upload New File */}
                  <div className="w-full flex h-[150px] justify-between items-center lg:flex-row flex-col gap-[10px]">
                    <div className="w-full lg:w-auto">
                      <input
                        type="file"
                        id="fileUpload"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <label
                        htmlFor="fileUpload"
                        className="block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center transition-all duration-300 ease-in-out"
                      >
                        Upload New 
                      </label>
                    </div>
                  </div>
                </div>
              )}
  
              {activeTab === "library" && (
                <div>
                  {/* Search Box for Media Library */}
                  <div className="mb-6 flex justify-end">
                    <input
                      type="text"
                      placeholder="Search by name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-[80%] lg:w-[50%] border rounded px-4 py-2 text-sm border-gray-300 focus:outline-none focus:ring focus:ring-orange-200"
                    />
                  </div>
  
                  {/* Uploaded Images */}
                  <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[10px]">
                    {filteredImages.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="border rounded cursor-pointer w-[200px] h-[200px]"
                          onClick={() => selectImage(image)}
                        />
                        <span className="absolute bottom-1 left-1 text-xs bg-gray-800 text-white px-1 rounded">
                          {image.title}
                        </span>
                      </div>
                    ))}
                    {filteredImages.length === 0 && (
                      <div className="col-span-full h-[150px] text-center flex justify-center items-center text-gray-500">
                        No images found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
  
            {/* Footer */}
            {/* <div className="p-4 border-t border-gray-300">
              <button
                onClick={togglePopup}
                className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-2 rounded-lg hover:shadow-md"
              >
                Save File
              </button>
            </div> */}
          </div>
        </div>
      )
    }
{/* --------------------attachment------------------------- */}<div className='flex justify-start items-center gap-[10px] mt-[10px]' >
   
              </div>
                       <div className='flex justify-between items-center gap-[10px] mt-[5px]'>
                       <label
  onClick={togglePopup}
  className="relative flex items-center bg-gray-100 cursor-pointer border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-200 transition"
>
  <MdOutlineAttachFile className="mr-2 text-gray-600 cursor-pointer" />
  <span className="text-sm text-gray-600 cursor-pointer">Attach</span>
</label>
                               <div className='flex justify-center items-center gap-2'>
                               <button className='px-[30px] py-[8px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'><LuSaveAll className='text-[18px]'/>Draft</button>
                                                      <button className='px-[30px] py-[8px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center border-[2px] border-brand_color items-center rounded-[5px] cursor-pointer'>Submit</button>
                                           
                               </div>
                                
                        </div>
                  </form>
            {/* -------------------form---------------------- */}
         </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Bnewticket