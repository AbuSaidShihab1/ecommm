import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineRollback, AiOutlineCamera } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";
import toast,{Toaster} from 'react-hot-toast';
const AddMethodPopup = ({ isOpen, onClose, onSubmit }) => {
   const navigate=useNavigate();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [accountNumber, set_accountNumber] = useState("");
  const [accountType, set_accountType] = useState("Agent");
  
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
   const [uploadedImage, setUploadedImage] = useState(null);
   const [currencyName, setCurrencyName] = useState("");
   const [userData, setUserData] = useState([]);
   const [formData, setFormData] = useState({
     type: "",
     isRequired: "",
     label: "",
     width: "",
     instruction: "",
   });
   const [showPopup, setShowPopup] = useState(false);
   const [file,set_file]=useState(null)
   const handleImageUpload = (event) => {
     const file = event.target.files[0];
     console.log(file)
     if (file) {
        set_file(file);
       const reader = new FileReader();
       reader.onload = () => setUploadedImage(reader.result);
       reader.readAsDataURL(file);
     }
   };
   const handlePopupSubmit = () => {
    setUserData([...userData, formData]);
    setFormData({
      type: "",
      isRequired: "",
      label: "",
      width: "",
      instruction: "",
    });
    setShowPopup(false);
    toast.success("New field added successfully.");
  };
   const handleInputChange = (value) => {
    set_depositInstruction(value);
  };

   const handleDeleteField = (index) => {
     Swal.fire({
       title: "Are you sure?",
       text: "This field will be permanently deleted.",
       icon: "warning",
       showCancelButton: true,
       confirmButtonText: "Yes, delete it!",
       cancelButtonText: "Cancel",
     }).then((result) => {
       if (result.isConfirmed) {
         setUserData(userData.filter((_, i) => i !== index));
         Swal.fire("Deleted!", "Field has been removed.", "success");
       }
     });
   };
   console.log(file)
     const [minAmount,set_minAmount]=useState();
     const [maxAmount,set_maxAmount]=useState();
     const [fixedCharge,set_fixedCharge]=useState();
     const [percentCharge,set_percentCharge]=useState();
     const [depositInstruction,set_depositInstruction]=useState("");
     const [getwayname,set_getwayname]=useState("");
     const [rate,set_rate]=useState();
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
      [{ font: [] }], // Add font size control
      [{ size: ["small", "medium", "large", "huge"] }], // Define available text sizes
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
    "font",
    "size",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const form_data = new FormData();
  
    form_data.append("image", file); // field name must match upload.single("image")
    form_data.append("gatewayName", getwayname);
    form_data.append("currencyName", currencyName);
    form_data.append("fixedCharge", fixedCharge);
    form_data.append("percentCharge", percentCharge);
    form_data.append("rate", rate);
    form_data.append("accountNumber", accountNumber);
    form_data.append("accountType", accountType);
    form_data.append("depositInstruction", depositInstruction);
    form_data.append("userData", JSON.stringify(userData)); // must stringify arrays/objects
  
    try {
      const res = await axios.post(
        "http://localhost:8080/super/admin/manual-payment",
        form_data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // important for FormData
          },
        }
      );
  
      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
    } catch (err) {
      console.error("Error submitting:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to add manual deposit method.",
        icon: "error",
      });
    }
  };
  
  
  return (
        <div className={isOpen ? "fixed inset-0 w-full bg-[rgba(0,0,0,0.5)] z-[1000] overflow-y-auto":"hidden"}>
          
       <div className="px-[20px] py-[35px] w-full  lg:w-[80%] m-auto">
          <form onSubmit={handleSubmit} className=" bg-white border-[1px] border-[#eee] p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Add Manual Gateway</h1>
                 <button 
            onClick={onClose}
            className="text-gray-500 text-[30px] hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
            </div>
    
            <div className="mb-[60px] w-[70%] lg:w-[20%] h-[200px] ">
              <label className="font-medium text-gray-700 mb-2 block">Upload Image</label>
              <div className="relative border border-neutral-300 rounded-md px-4 py-2 h-full bg-gray-50 flex items-center justify-center">
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                ) : (
                  <AiOutlineCamera className="text-gray-500 text-4xl" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Gateway Name *</label>
                <input
                  type="text"
                  value={getwayname}
                  onChange={(e)=>{set_getwayname(e.target.value)}}
                  className="border rounded-[5px] mt-[5px] px-4 py-2 border-neutral-300 outline-orange-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Currency *</label>
                <input
                  type="text"
                  className="border rounded-[5px] mt-[5px] px-4 py-2 border-neutral-300 outline-orange-500"
                  onChange={(e) => setCurrencyName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Rate *</label>
                <div className="flex items-center border-[1px] border-[#eee] rounded-md">
                  <span className="px-4 py-2 text-gray-600 flex justify-center text-nowrap w-[20%] bg-gray-100">1 USD =</span>
                  <input
                    type="text"
                    value={rate}
                    onChange={(e)=>{set_rate(e.target.value)}}
                    className="border-l px-4 py-2 border-neutral-300 w-full outline-none"
                    placeholder="Currency Rate"
                  />
                  <span className="px-4 py-2 text-gray-600 h-full w-auto bg-gray-100">{currencyName}</span>
                </div>
              </div>
            </div>
    
            <div className="w-full grid grid-cols-1  lg:grid-cols-1 gap-[30px] font-poppins mb-6">
  <div>
    <h2 className="bg-orange-500 text-white py-2 px-4 mb-2">Bank Details</h2>

    <div className="flex flex-col">
      <label className="font-medium text-gray-700">Account Number *</label>
      <input
        type="text"
        value={accountNumber}
        onChange={(e) => set_accountNumber(e.target.value)}
        placeholder="Enter account number"
        className="px-4 py-2 border border-neutral-300 bg-gray-100 rounded-[5px] outline-orange-500"
      />
    </div>

    <div className="flex flex-col mt-4">
      <label className="font-medium text-gray-700">Account Type *</label>
      <select
        value={accountType}
        onChange={(e) => set_accountType(e.target.value)}
        className="px-4 py-2 border border-neutral-300 bg-gray-100 rounded-[5px] outline-orange-500"
      >
        <option value="Agent">Agent</option>
        <option value="Personal">Personal</option>
      </select>
    </div>
  </div>
</div>

            <div className="mb-6">
              <h2 className="bg-orange-500 text-white py-2 px-4  mb-2">Deposit Instruction</h2>
              <ReactQuill 
          modules={modules} 
          formats={formats} 
          style={{ height: "250px" }} 
          value={depositInstruction} 
          onChange={handleInputChange} 
          className="w-full mt-[8px] mb-[70px]" 
        />
            </div>
    
            <div className="mb-6">
             <div className='flex justify-between items-center bg-orange-500 px-[10px] py-[5px]'>
             <h2 className=" text-white py-2 px-4 rounded-md mb-2">User Data</h2>
              <div
                className="flex items-center cursor-pointer text-white border-[1px] border-white px-[10px] py-[6px] rounded-[5px] focus:outline-none"
                onClick={() => setShowPopup(true)}
              >
                <AiOutlinePlus className="mr-1" /> Add New
              </div>
             </div>
              <table className="table-auto w-full overflow-y-auto border-collapse border border-gray-200 mb-4">
                <thead>
                  <tr className="bg-gray-100 text-nowrap text-[14px] lg:text-[15px]">
                    <th className="border border-neutral-300 px-4 py-2">Type</th>
                    <th className="border border-neutral-300 px-4 py-2">Is Required</th>
                    <th className="border border-neutral-300 px-4 py-2">Label</th>
                    <th className="border border-neutral-300 px-4 py-2">Width</th>
                    <th className="border border-neutral-300 px-4 py-2">Instruction</th>
                    <th className="border border-neutral-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((field, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-neutral-300 px-4 py-2">{field.type}</td>
                      <td className="border border-neutral-300 px-4 py-2">{field.isRequired}</td>
                      <td className="border border-neutral-300 px-4 py-2">{field.label}</td>
                      <td className="border border-neutral-300 px-4 py-2">{field.width}</td>
                      <td className="border border-neutral-300 px-4 py-2">{field.instruction || "N/A"}</td>
                      <td className="border border-neutral-300 px-4 py-2">
                        <div
                          className="text-red-500 cursor-pointer hover:text-red-600 focus:outline-none"
                          onClick={() => handleDeleteField(index)}
                        >
                          Delete
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
       
            </div>
    
            <button
              className="w-full bg-orange-500 text-white py-3 rounded-md  focus:outline-none"
            >
              Submit
            </button>
          </form>
    
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-[10] justify-center">
              <div className="bg-white rounded-lg p-6 w-[30%]">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Form</h3>
                <div className="mb-4">
                  <label className="font-medium text-gray-700">Type *</label>
                  <select
                    className="border rounded-md px-4 py-2 w-full focus:outline-none border-neutral-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">Select One</option>
                    <option value="file">File</option>
                    <option value="text">Text</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="font-medium text-gray-700">Is Required *</label>
                  <select
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 border-neutral-300 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.isRequired}
                    onChange={(e) => setFormData({ ...formData, isRequired: e.target.value })}
                  >
                    <option value="">Select One</option>
                    <option value="required">Required</option>
                    <option value="optional">Optional</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="font-medium text-gray-700">Label *</label>
                  <input
                    type="text"
                    className="border rounded-md px-4 py-2 w-full focus:outline-none border-neutral-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="font-medium text-gray-700">Width *</label>
                  <select
                    className="border rounded-md px-4 py-2 w-full focus:outline-none border-neutral-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                  >
                    <option value="">Select One</option>
                    <option value="full">Full</option>
                    <option value="half">Half</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="font-medium text-gray-700">Instruction (if any)</label>
                  <input
                    type="text"
                    className="border rounded-md px-4 py-2 w-full focus:outline-none border-neutral-300  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.instruction}
                    onChange={(e) => setFormData({ ...formData, instruction: e.target.value })}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="text-gray-500 hover:text-gray-600 focus:outline-none mr-4"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePopupSubmit}
                    className="bg-blue-500 text-white py-2 px-4  hover:bg-blue-600 focus:outline-none"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>

  )
}

export default AddMethodPopup