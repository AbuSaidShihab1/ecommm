import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import documentation_img from "../../assets/documentation.png"
import { Contextapi } from '../../context/Appcontext';
const Categoryaccess = () => {
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
  //  ----------handle image 
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
<section className='pt-[15px] pb-[30px]'>
  

{/* Select User Access */}
<div className="w-[100%] ">
<label
htmlFor="userAccess"
className="text-[15px] font-[500] text-gray-600"
>
Page Access 
</label>
           {/* Table Section */}
<div className="overflow-x-auto mt-1">
<table className="min-w-full border-collapse border border-gray-300 text-sm text-center">
{/* Table Header */}
<thead className='uppercase'>
<tr>
<th className="border border-gray-300 p-2 text-white bg-[#22C55E]">Module</th>
<th colSpan={1} className="border border-gray-300 p-2 bg-blue-500 text-white">
Category
</th>

</tr>
<tr className="bg-gray-200 ">
<th className="border border-gray-300 p-2 ">View List</th>
<th className="border border-gray-300 p-2">Select All</th>

</tr>
</thead>

{/* Table Body */}
<tbody>
{[
{
section: "Dashboard",
modules: ["Dashboard"],
},
{
section: "Pages",
modules: ["New Page", "Page List"],
},
{
section: "Contents",
  modules: ["New Post", "Post List", "New Category", "Category List", "New Tag", "Tag List",  "Edit Comment","Comment List"],
},
{
section: "Products",
modules: [
  "New Product",
  "Product List",
  "New Category",
  "Category List",
  "New Tag",
  "Tag List",
  "New Brand",
  "Brand List",
  "Edit Review",
  "Review List",
  "New Order",
  "Order List",
  "New Delivery",
  "Delivery List",
  "New Coupon",
  "Coupon List",
  "Setting",
],
},
{
section: "Upload Library",
modules: ["New Library", "All Library"],
},
{
section: "Appearance",
modules: ["Themes","Web Menus", "Required Plugins", "Install Plugins"],
},
{
section: "Settings",
modules: ["Web Setting","Billing Update","Payment Transfer","App Integration"],
},
{
section: "Users",
modules: ["New User", "User List", "User New Role", "User Role List"],
},
{
section: "Support Ticket",
modules: ["New Ticket", "Ticket List"],
},
].map((sectionData, sectionIdx) => (
<>
<tr key={sectionIdx} className="bg-gray-100 font-bold">
  <td className="border border-gray-300 p-2 text-left" colSpan={8}>
    {sectionData.section}
  </td>
</tr>
{sectionData.modules.map((module, idx) => (
  <tr key={idx}>
    <td className="border text-left border-gray-300 p-2">{module}</td>
    <td className="border border-gray-300 p-2">
      <input
        type="checkbox"
        onChange={(e) => {
          const row = e.target.closest("tr");
          row
            .querySelectorAll("input[type=checkbox]")
            .forEach((checkbox) => {
              checkbox.checked = e.target.checked;
            });
        }}
      />
    </td>
    {[...Array(0)].map((_, colIdx) => (
      <td key={colIdx} className="border border-gray-300 p-2">
        <input type="checkbox" defaultChecked={false} />
      </td>
    ))}
  </tr>
))}
</>
))}
</tbody>
</table>
</div>
</div>
{/* Buttons */}
 <div className='flex justify-end items-center gap-[10px] mt-[30px]'>
               <button className='px-[30px] py-[8px] text-gray-800 bg-gray-300 text-[14px] gap-[8px]  flex justify-center items-center rounded-[5px] cursor-pointer'>Cancel</button>
                                                                  <button className='px-[30px] py-[8px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center border-[2px] border-brand_color items-center rounded-[5px] cursor-pointer'>Submit</button>
                                           </div>
  {/* -------------------form---------------------- */}
</section>
  )
}

export default Categoryaccess