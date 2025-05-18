import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import axios from 'axios';
import { LuSaveAll } from "react-icons/lu";
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

const Editpriceplan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));

  // State for loader and toast
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // -------------------image-upload-----------------------
  const [profileImage, setProfileImage] = useState(documentation_img);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("library");
  const [uploadedImages, setUploadedImages] = useState([]);

  // Form state
  const [technologyTags, setTechnologyTags] = useState([]);
  const [supportTags, setSupportTags] = useState([]);
  const [content, setContent] = useState('');
  const [isCodeView, setIsCodeView] = useState(false);

  // State for input values
  const [formData, setFormData] = useState({
    name: '',
    note: '',
    price: '',
    credits: '',
    mediaSize: '',
    traffic: '',
  });

  // State for error messages
  const [errors, setErrors] = useState({
    name: '',
    note: '',
    price: '',
    credits: '',
    mediaSize: '',
    traffic: '',
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true)
      } else {
        setactivetopbar(false)
      }
    });

    // Fetch price plan data when component mounts
    const fetchPricePlan = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${base_url}/super/admin/price-plan/${id}`, {
          headers: {
            'Authorization': `Bearer ${admin_info.token}`
          }
        });

        if (response.data.success) {
          const data = response.data.data;
          setFormData({
            name: data.name,
            note: data.note,
            price: data.price.toString(),
            credits: data.credits.toString(),
            mediaSize: data.mediaSize,
            traffic: data.traffic
          });
          setTechnologyTags(data.technologies || []);
          setSupportTags(data.supports || []);
          setContent(data.description);
          setProfileImage(data.image || documentation_img);
        }
      } catch (error) {
        console.error('Error fetching price plan:', error);
        setToastMessage(error.response?.data?.message || 'Failed to fetch price plan');
        setToastType('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricePlan();

    // Fetch images for media library
    const fetchImages = async () => {
      try {
        const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`);
        if (fetchResponse.data.images) {
          setUploadedImages(fetchResponse.data.images);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, [id]);

  // Toggle Popup
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // Handle image selection from the library
  const selectImage = (img) => {
    setProfileImage(`http://localhost:8080/uploads/${admin_info?._id}/${img}`);
    setIsPopupOpen(false);
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setErrors({ ...errors, images: 'Only image files are allowed' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, images: 'File size must be less than 5MB' });
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsLoading(true);
      const uploadResponse = await axios.post(`${base_url}/api/upload/image/admin-upload-image/${admin_info._id}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${admin_info.token}`
        }
      });

      if (uploadResponse.data.imagePath) {
        const fetchResponse = await axios.get(`${base_url}/api/upload/image/admin-images/${admin_info._id}`);
        if (fetchResponse.data.images) {
          setUploadedImages(fetchResponse.data.images);
          setActiveTab("library");
        }
      }
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, images: 'Error uploading file' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.note) {
      newErrors.note = 'Note is required';
      valid = false;
    }

    if (!formData.price || isNaN(formData.price)) {
      newErrors.price = 'Price must be a valid number';
      valid = false;
    }

    if (!formData.credits || isNaN(formData.credits)) {
      newErrors.credits = 'Credits must be a valid number';
      valid = false;
    }

    if (!formData.mediaSize) {
      newErrors.mediaSize = 'Media Size is required';
      valid = false;
    }

    if (!formData.traffic) {
      newErrors.traffic = 'Traffic is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        const response = await axios.put(`${base_url}/super/admin/update-price-plan/${id}`, {
          admin_id: admin_info._id,
          name: formData.name,
          note: formData.note,
          price: formData.price,
          credits: formData.credits,
          mediaSize: formData.mediaSize,
          traffic: formData.traffic,
          technologies: technologyTags,
          supports: supportTags,
          description: content,
          image: profileImage === documentation_img ? '' : profileImage
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
          }
        });

        if (response.data.success) {
          setToastMessage('Price plan updated successfully!');
          setToastType('success');

        }
      } catch (error) {
        console.error('Error updating price plan:', error);
        setToastMessage(error.response?.data?.message || 'Failed to update price plan');
        setToastType('error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      {/* Loader */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="w-[60px] h-[60px] relative">
            <div className="absolute inset-0 rounded-full border-[6px] border-t-transparent border-white animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-[4px] border-t-transparent border-brand_color animate-spin-reverse"></div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className={`fixed top-6 right-6 z-[1000000] flex items-center gap-4 px-6 py-4 rounded-lg shadow-lg text-white font-medium transition-all duration-300 animate-fade-in
            ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage('')} 
            className="text-white text-xl leading-none hover:text-gray-200 transition"
          >
            &times;
          </button>
        </div>
      )}

      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[20px] lg:px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Edit {formData.name}</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[13px] font-[500] lg:text-[14px]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Price Plans</li>
                <li><IoIosArrowForward /></li>
                <li> {formData.name}</li>
              </ul>
            </div>
            <button className='hidden px-[22px] py-[12px] text-white text-[16px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>
              <BiImport className='text-[25px]' />
              Import
            </button>
          </div>

          <section className='pt-[40px] pb-[30px]'>
            <form action="" className='pt-[20px]' onSubmit={handleSubmit}>
              <div className="relative w-40 h-40 mb-[30px]">
                <div className="w-full h-full rounded-[10px] overflow-hidden border-2 border-gray-300">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                            <span className="text-sm">Upload Image</span>
                        </div>
                    )}
                </div>

                <label
                    htmlFor="profileImageInput"
                    onClick={togglePopup}
                    className="absolute bottom-1 right-2 bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-500"
                >
                    <FaCamera className="w-4 h-4" />
                </label>

                {isPopupOpen && (
                    <div className="fixed inset-0 z-[100000000000] font-poppins flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg w-[80%] xl:w-[75%] 2xl:w-[60%]">
                            <div className="p-4 flex justify-between items-center border-b border-gray-300">
                                <h2 className="text-lg font-semibold">Upload Images</h2>
                                <button onClick={togglePopup} className="text-gray-600 hover:text-gray-800">
                                    ✕
                                </button>
                            </div>

                            <div className="flex border-b border-gray-300 ">
                                <div
                                    onClick={() => setActiveTab("library")}
                                    className={`w-1/2 py-2 text-center ${activeTab === "library"
                                        ? "border-b-2 border-brand_color text-brand_color font-semibold"
                                        : "text-gray-600 hover:text-brand_color"
                                        }`}
                                >
                                    Media Library
                                </div>
                                <div
                                    onClick={() => setActiveTab("upload")}
                                    className={`w-1/2 py-2 text-center ${activeTab === "upload"
                                        ? "border-b-2 border-brand_color text-brand_color font-semibold"
                                        : "text-gray-600 hover:text-brand_color"
                                        }`}
                                >
                                    Upload New
                                </div>
                            </div>

                            <div className="p-4  h-[200px] overflow-y-auto">
                                {activeTab === "upload" && (
                                    <div>
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
                                        <div className="flex flex-wrap gap-[10px]">
                                            {uploadedImages.map((image) => (
                                                <div key={image}>
                                                    <img
                                                      src={`http://localhost:8080/uploads/${admin_info?._id}/${image}`}
                                                        alt={image}
                                                        className="border rounded w-[100px] h-[100px] cursor-pointer object-cover"
                                                        onClick={() => selectImage(image)}
                                                    />
                                                </div>
                                            ))}
                                            {uploadedImages.length === 0 && (
                                                <div className="col-span-full h-[150px] text-center flex justify-center items-center text-gray-500">
                                                    No images found.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
              </div>

              <div className='w-full flex justify-center items-center gap-[15px] mb-[20px]'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="name" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Name'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px]  p-[12px] ${errors.name ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="note" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Note</label>
                  <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder='Note'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px]  p-[12px] ${errors.note ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                  />
                  {errors.note && <p className="text-red-500 text-sm">{errors.note}</p>}
                </div>
              </div>

              <div className='w-full flex justify-center lg:flex-row flex-col items-center gap-[10px] lg:gap-[15px] mb-[20px]'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="price" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder='Price'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px]  p-[12px] ${errors.price ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="credits" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Credits</label>
                  <input
                    type="text"
                    name="credits"
                    value={formData.credits}
                    onChange={handleChange}
                    placeholder='Credits'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px]  p-[12px] ${errors.credits ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                  />
                  {errors.credits && <p className="text-red-500 text-sm">{errors.credits}</p>}
                </div>
              </div>

              <div className='w-full flex justify-center items-center gap-[15px] mb-[20px]'>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="mediaSize" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Media Size</label>
                  <input
                    type="text"
                    name="mediaSize"
                    value={formData.mediaSize}
                    onChange={handleChange}
                    placeholder='Media Size'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px]  p-[12px] ${errors.mediaSize ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                  />
                  {errors.mediaSize && <p className="text-red-500 text-sm">{errors.mediaSize}</p>}
                </div>
                <div className='w-[100%] lg:w-[50%]'>
                  <label htmlFor="traffic" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Traffic</label>
                  <input
                    type="text"
                    name="traffic"
                    value={formData.traffic}
                    onChange={handleChange}
                    placeholder='Traffic'
                    className={`w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px]  p-[12px] ${errors.traffic ? 'border-red-500' : 'border-[#eee]'} p-[12px]`}
                  />
                  {errors.traffic && <p className="text-red-500 text-sm">{errors.traffic}</p>}
                </div>
              </div>

              <div className="w-full flex justify-center items-center gap-[15px] mb-[20px]">
                <TagInput label="Technology" placeholder="Technology" tags={technologyTags} setTags={setTechnologyTags} />
                <TagInput label="Support" placeholder="Support" tags={supportTags} setTags={setSupportTags} />
              </div>

              <div className='w-[100%]  mb-[20px]'>
                <label htmlFor="description" className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-neutral-600'>Description</label>
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
                <button type="button" className='px-[30px] py-[10px] text-black text-[14px] gap-[8px] border-[2px] border-[#eee] flex justify-center items-center rounded-[5px] cursor-pointer'><LuSaveAll className='text-[22px]' />Draft</button>
                <button type="submit" className='px-[30px] py-[10px] text-white text-[14px] gap-[8px] bg-brand_color flex justify-center items-center rounded-[5px] cursor-pointer'>Update</button>
              </div>
            </form>
          </section>
        </section>
      </section>
    </section>
  )
}

export default Editpriceplan;