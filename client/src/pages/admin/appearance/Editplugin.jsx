import React, { useContext, useEffect, useState,useRef} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { GrLineChart } from "react-icons/gr";
import revenueData from '../../../data/revenueData';
import { FaTrophy } from "react-icons/fa";
import DatePicker from "react-datepicker"; // Importing the date picker
import SunEditor from "suneditor-react";
import { GiAutoRepair } from "react-icons/gi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaUpload } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaInfoCircle,FaTrash } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsPlugin } from "react-icons/bs";
import { AiOutlineInfoCircle } from 'react-icons/ai';
import "suneditor/dist/css/suneditor.min.css";
import "react-datepicker/dist/react-datepicker.css"; 
import { MdDateRange } from "react-icons/md";
import { FaKey, FaEye, FaCalendarAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import {FaTimes } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaCamera } from "react-icons/fa";
import { LuSaveAll } from "react-icons/lu";
import JoditEditor from 'jodit-react';
import { IoClose } from "react-icons/io5";
import { IoKeySharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";
import { FaChevronDown } from "react-icons/fa"; // Import the arrow icon
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FaCubes, FaBox, FaTruck, FaLink, FaTag, FaSlidersH } from "react-icons/fa";

import { FaChevronUp } from "react-icons/fa";
import { FiPackage, FiBox, FiTruck, FiLink, FiTag, FiSettings } from "react-icons/fi";
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,Legend, PieChart,
  Cell,
  ResponsiveContainer,BarChart,Bar,Pie} from "recharts"

import { Pagination } from 'swiper/modules';
import { IoIosArrowForward } from "react-icons/io";

const tabsData = [
  { name: "General", icon: FiPackage },
  { name: "Inventory", icon: FiBox },
  { name: "Shipping", icon: FiTruck },
  { name: "Linked Products", icon: FiLink },
  { name: "Attributes", icon: FiTag },
  { name: "360 Viewer", icon: FiTag },
  { name: "Advanced", icon: FiSettings },
];

const Editplugin = () => {
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
   //  ==========================permalink=======================
      const [pageTitle, setPageTitle] = useState("");
      const [permalink, setPermalink] = useState("");
      const [full_slug,set_fullslug]=useState()
      const [isEditingPermalink, setIsEditingPermalink] = useState(false);
      const basePermalink = "https://ecom.weblasser.com/";
      const [dropdownOpen, setDropdownOpen] = useState(false);
   
      // Function to generate permalink
      const generatePermalink = (title) => {
        const maxPermalinkLength = 40; // Limit for the permalink
        let permalink = title
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with dashes
          .replace(/[^a-z0-9\-]/g, "");
          let permalink2 = title
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with dashes
          .replace(/[^a-z0-9\-]/g, ""); // Remove non-alphanumeric characters
        // Truncate if the permalink is too long
        console.log(permalink)
        if (permalink.length > maxPermalinkLength) {
          const firstPart = permalink.slice(0, 20); // Start
          const lastPart = permalink.slice(-15); // End
          permalink = `${firstPart}...${lastPart}`;
        }
        set_fullslug(permalink2)
       
        return permalink;
      };
    
      // Handle input title change
      const handleInputChange2 = (e) => {
        const title = e.target.value;
        setPageTitle(title);
        setPermalink(generatePermalink(title)); // Update permalink as title changes
      };
    
      // Handle manual permalink edits
      const handlePermalinkChange = (e) => {
        setPermalink(e.target.value);
        alert()
      };
      const savePermalink = () => {
        setIsEditingPermalink(false); // Exit edit mode
      };
   //  ==========================permalink=======================
  // States to toggle input boxes
   const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [status, setStatus] = useState("Publish");

  const [isEditingVisibility, setIsEditingVisibility] = useState(false);
  const [visibility, setVisibility] = useState("Approved");

  const [isEditingDate, setIsEditingDate] = useState(false);
  const [publishedDate, setPublishedDate] = useState(new Date("2024-01-16"));

  const [isEditingPublishStatus, setIsEditingPublishStatus] = useState(false);
  const [publishStatus, setPublishStatus] = useState("Publish");
// -=--------------------visibility--------------
const [buttonText, setButtonText] = useState("Publish");

  const handleClick = () => {
    setButtonText("Update"); // Change the button text
  };
const [visibilityOption, setVisibilityOption] = useState("Publish");
const [passwordInput, setPasswordInput] = useState("");
  const [createTime, setCreateTime] = useState("08:20 PM");

//    editor config
 const editor = useRef(null); // Ref for the editor instance
    const [content, setContent] = useState(''); // State for editor content
    const [content2, setContent2] = useState(''); // State for editor content

    const config = {
        readonly: false, // Allows editing
        height: 400,
        placeholder: 'Start writing your document here...',
        toolbarSticky: true,
        toolbarAdaptive: true,
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

  // ==================file upload with preview==============
 const [image, setImage] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
// -----------------rich text editor
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
  
const handleStatusChange = (e) => {
  const value = e.target.value;
  setStatus(value);

  // Reset `visibilityOption` if it's a different status
  if (value !== "Password Protected") {
    setVisibilityOption("");
  }
};

  useEffect(() => {
    if (renderedCSS) {
      const styleElement = document.getElementById("dynamic-css");
      styleElement.innerHTML = renderedCSS;
    }
  }, [renderedCSS]);

  // Function to update the content in the text editor and sync it to code editor

// ------------------featured img-----------------
//  ----------handle image 
   const [profileImage, setProfileImage] = useState(
    ""
  );

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  // -=--------------------visibility--------------
  const [previousStatus, setPreviousStatus] = useState(status);
  const [previousVisibility, setPreviousVisibility] = useState(visibility);
  const [previousPublishedDate, setPreviousPublishedDate] = useState(publishedDate);
  const [hoveredItem, setHoveredItem] = useState(null);
    const options = [
      { label: "Approved", color: "green-500", bg: "green-100" },
      { label: "Pending", color: "orange-500", bg: "orange-100" },
      { label: "Rejected", color: "red-500", bg: "red-100" },
    ];
 
// ------------image upload popup------
 const [activeTab, setActiveTab] = useState("General"); // 
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
  setIconPreview(image.src);
  togglePopup();
  setActiveTab("Inventory")


  };

  // Filter images based on the search term
  const filteredImages = uploadedImages.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCustomUserAccess = () => {
    setIsCustomUserEnabled(!isCustomUserEnabled);
  };

  // Handle suggestion selection

  const handleSuggestionClick = (name) => {
    setSearchTerm2(name);
    setFilteredSuggestions([]);
  };
  const removeImage = () => {
    setProfileImage(null);
  };
// ========================post-category========================

const [categories, setCategories] = useState([
  {
    name: "Skin Care",
    subcategories: [
      { name: "Moisturizers", children: ["Day Creams", "Night Creams"] },
      { name: "Cleansers", children: ["Foaming Cleansers", "Micellar Water"] }
    ]
  },
  {
    name: "Hair Care",
    subcategories: [
      { name: "Shampoos", children: ["Anti-Dandruff", "Volumizing"] },
      { name: "Conditioners", children: ["Leave-in", "Deep Conditioning"] }
    ]
  },
  {
    name: "Makeup",
    subcategories: [
      { name: "Foundations", children: ["Liquid", "Powder"] },
      { name: "Lipsticks", children: ["Matte", "Glossy"] }
    ]
  }
]);
const [brands, setBrands] = useState([
  {
    name: "Skin Care",
    subcategories: [
      { name: "Moisturizers", children: ["Day Creams", "Night Creams"] },
      { name: "Cleansers", children: ["Foaming Cleansers", "Micellar Water"] }
    ]
  },
  {
    name: "Hair Care",
    subcategories: [
      { name: "Shampoos", children: ["Anti-Dandruff", "Volumizing"] },
      { name: "Conditioners", children: ["Leave-in", "Deep Conditioning"] }
    ]
  },
  {
    name: "Makeup",
    subcategories: [
      { name: "Foundations", children: ["Liquid", "Powder"] },
      { name: "Lipsticks", children: ["Matte", "Glossy"] }
    ]
  }
]);
const [checkedBrands, setCheckedBrands] = useState({});
const [showBrandForm, setShowBrandForm] = useState(false);
const [newBrand, setNewBrand] = useState("");
const [parentBrand, setParentBrand] = useState("None");

// Function to handle brand checkbox change
const handleBrandCheckboxChange = (brandName, subcategoryName = null, childName = null) => {
  setCheckedBrands((prevState) => {
    const updatedCheckedBrands = { ...prevState };
    const brandKey = childName ? childName : subcategoryName ? subcategoryName : brandName;
    updatedCheckedBrands[brandKey] = !updatedCheckedBrands[brandKey];
    return updatedCheckedBrands;
  });
};

// Function to add a new brand or subcategory
const handleAddBrand = () => {
  if (!newBrand.trim()) return;

  const updatedBrands = [...brands];

  if (parentBrand === "None") {
    updatedBrands.push({ name: newBrand, subcategories: [] });
  } else {
    for (let brand of updatedBrands) {
      if (brand.name === parentBrand) {
        brand.subcategories.push({ name: newBrand, children: [] });
      } else {
        for (let sub of brand.subcategories) {
          if (sub.name === parentBrand) {
            sub.children.push(newBrand);
          }
        }
      }
    }
  }

  setBrands(updatedBrands);
  setNewBrand("");
  setParentBrand("None");
  // setShowBrandForm(false);
};
// ------------------brand-end----------------------------

const [checkedState, setCheckedState] = useState(() =>
  categories.reduce((acc, category) => {
    acc[category.name] = {
      checked: false,
      subcategories: category.subcategories.reduce((subAcc, subcategory) => {
        subAcc[subcategory.name] = {
          checked: false,
          children: subcategory.children.reduce((childAcc, child) => {
            childAcc[child] = false;
            return childAcc;
          }, {}),
        };
        return subAcc;
      }, {}),
    };
    return acc;
  }, {})
);

const handleParentToggle = (categoryName) => {
  setCheckedState((prevState) => {
    const updatedState = { ...prevState };
    updatedState[categoryName].checked = !prevState[categoryName].checked;
    return updatedState;
  });
};

const handleSubcategoryToggle = (categoryName, subcategoryName) => {
  setCheckedState((prevState) => {
    const updatedState = { ...prevState };
    updatedState[categoryName].subcategories[subcategoryName].checked =
      !prevState[categoryName].subcategories[subcategoryName].checked;
    return updatedState;
  });
};

const handleChildToggle = (categoryName, subcategoryName, childName) => {
  setCheckedState((prevState) => {
    const updatedState = { ...prevState };
    updatedState[categoryName].subcategories[subcategoryName].children[childName] =
      !prevState[categoryName].subcategories[subcategoryName].children[childName];
    return updatedState;
  });
};
 // -----------category----------------
  const [checkedCategories, setCheckedCategories] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [parentCategory, setParentCategory] = useState("None");

  // Handle Checkbox Change
  const handleCheckboxChange = (category, subcategory, child) => {
    setCheckedCategories((prev) => {
      const newChecked = { ...prev };
      if (child) {
        newChecked[child] = !newChecked[child];
      } else if (subcategory) {
        newChecked[subcategory] = !newChecked[subcategory];
      } else {
        newChecked[category] = !newChecked[category];
      }
      return newChecked;
    });
  };

  // Handle Adding a New Category
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const updatedCategories = [...categories];

    if (parentCategory === "None") {
      updatedCategories.push({ name: newCategory, subcategories: [] });
    } else {
      for (let cat of updatedCategories) {
        if (cat.name === parentCategory) {
          cat.subcategories.push({ name: newCategory, children: [] });
        } else {
          for (let sub of cat.subcategories) {
            if (sub.name === parentCategory) {
              sub.children.push(newCategory);
            }
          }
        }
      }
    }

    setCategories(updatedCategories);
    setNewCategory("");
    setParentCategory("None");
    // setShowForm(false);
  };

// ---------------------add tag-----------------
const [userInput, setUserInput] = useState("");
  const [chosenTags, setChosenTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([
    "React",
    "JavaScript",
    "Vite",
    "CSS",
    "Tailwind",
  ]); // Example tag options

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleTagSelection = (tag) => {
    if (tag && !chosenTags.includes(tag)) {
      setChosenTags([...chosenTags, tag]);
    }
    setUserInput(""); // Clear input field
  };

  const handleTagRemoval = (tagToRemove) => {
    setChosenTags(chosenTags.filter((tag) => tag !== tagToRemove));
  };

  const filteredTagOptions = tagOptions.filter(
    (option) =>
      option.toLowerCase().includes(userInput.toLowerCase()) &&
      !chosenTags.includes(option) &&
      userInput.trim() !== "" // Prevent showing suggestions when the input is empty
  );
   // ---------------tab-system--------------------------
   const [activeTab2, setActiveTab2] = useState("General");
   const [isBoxOpen, setIsBoxOpen] = useState(true);

   
   const toggleBox = () => {
     setIsBoxOpen(!isBoxOpen);
   };
  //  ---------brand------------------
 // Initial category data
 const [brandCategories, setBrandCategories] = useState([
  {
    name: "Electronics",
    subcategories: [
      {
        name: "Mobile Devices",
        children: ["Smartphones", "Tablets", "Smartwatches"],
      },
      {
        name: "Laptops & PCs",
        children: ["Gaming Laptops", "Workstations", "Monitors"],
      },
    ],
  },
  {
    name: "Clothing",
    subcategories: [
      {
        name: "Men's Clothing",
        children: ["Shirts", "Pants", "Jackets"],
      },
      {
        name: "Women's Clothing",
        children: ["Dresses", "Blouses", "Outerwear"],
      },
    ],
  },
  {
    name: "Home Appliances",
    subcategories: [
      {
        name: "Kitchen Appliances",
        children: ["Microwaves", "Refrigerators", "Blenders"],
      },
      {
        name: "Cleaning Appliances",
        children: ["Vacuum Cleaners", "Steam Mops", "Air Purifiers"],
      },
    ],
  },
]);

// State to track the checked status of each category
const [brandCheckboxState, setBrandCheckboxState] = useState({});

// Initialize checkbox state if not already present
const initializeBrandCheckboxStates = (categories) => {
  const state = {};
  categories.forEach((category) => {
    state[category.name] = { checked: false, subcategories: {} };
    category.subcategories.forEach((subcategory) => {
      state[category.name].subcategories[subcategory.name] = {
        checked: false,
        children: {},
      };
      subcategory.children.forEach((child) => {
        state[category.name].subcategories[subcategory.name].children[child] = false;
      });
    });
  });
  return state;
};

// Initialize state on the first render
React.useEffect(() => {
  if (Object.keys(brandCheckboxState).length === 0) {
    setBrandCheckboxState(initializeBrandCheckboxStates(brandCategories));
  }
}, [brandCategories]);

// Toggle parent category
const toggleBrandParentCategory = (parent) => {
  const updatedState = { ...brandCheckboxState };
  const parentChecked = !updatedState[parent].checked;
  updatedState[parent].checked = parentChecked;

  // Toggle all subcategories and children under this parent
  Object.keys(updatedState[parent].subcategories).forEach((subcategory) => {
    updatedState[parent].subcategories[subcategory].checked = parentChecked;
    Object.keys(updatedState[parent].subcategories[subcategory].children).forEach((child) => {
      updatedState[parent].subcategories[subcategory].children[child] = parentChecked;
    });
  });

  setBrandCheckboxState(updatedState);
};

// Toggle subcategory
const toggleBrandSubcategory = (parent, subcategory) => {
  const updatedState = { ...brandCheckboxState };
  const subcategoryChecked = !updatedState[parent].subcategories[subcategory].checked;
  updatedState[parent].subcategories[subcategory].checked = subcategoryChecked;

  // Toggle all children under this subcategory
  Object.keys(updatedState[parent].subcategories[subcategory].children).forEach((child) => {
    updatedState[parent].subcategories[subcategory].children[child] = subcategoryChecked;
  });

  setBrandCheckboxState(updatedState);
};

// Toggle child category
const toggleBrandChildCategory = (parent, subcategory, child) => {
  const updatedState = { ...brandCheckboxState };
  updatedState[parent].subcategories[subcategory].children[child] =
    !updatedState[parent].subcategories[subcategory].children[child];
  setBrandCheckboxState(updatedState);
};
  // --------------upload-gallery-images------------------
  const [galleryPopupVisible, setGalleryPopupVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // Selected images for the box
  const [currentGalleryTab, setCurrentGalleryTab] = useState("library"); // "library" or "upload"
  // const [uploadedImages, setUploadedImages] = useState([]); // Uploaded images in the library

  const toggleGalleryPopup = () => {
    setGalleryPopupVisible(!galleryPopupVisible);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      src: URL.createObjectURL(file),
      title: file.name,
    }));

    setUploadedImages((prev) => [...prev, ...newImages]); // Add to media library
  };

  const selectImageFromLibrary = (image) => {
    if (!selectedImages.some((img) => img.id === image.id)) {
      setSelectedImages([...selectedImages, image]); // Add to box
    }
  };

  const removeSelectedImage = (id) => {
    setSelectedImages(selectedImages.filter((image) => image.id !== id));
  };
  // ----------------------bottom-tab-----------------
  const [productType, setProductType] = useState("Simple product");
  const [boxExpanded, setBoxExpanded] = useState(true);

  const tabs = [
    { name: "General", icon: FaCubes },
    { name: "Inventory", icon: FaBox },
  ];
  const [showScheduleFields ,setShowScheduleFields]=useState(false);
  if (productType === "Variable product") {
    tabs.push({ name: "Variations", icon: FaPlus });
  }
  // -----------------attributes----------------
  const [attributes, setAttributes] = useState([]);

  const addAttribute = () => {
    setAttributes([...attributes, { name: "", values: "", visible: true }]);
  };

  const updateAttribute = (index, field, value) => {
    const updated = [...attributes];
    updated[index][field] = value;
    setAttributes(updated);
  };

  const removeAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };
// ----------------stock------------
const [trackStock, setTrackStock] = useState(false);

// --------------------360 viewer-------------------
const [images, setImages] = useState([]);

const uploadImage = (event) => {
  const files = event.target.files;
  const newImages = [...images];
  for (let file of files) {
    newImages.push(URL.createObjectURL(file));
  }
  setImages(newImages);
};

const deleteImage = (index) => {
  setImages(images.filter((_, i) => i !== index));
};
// ------------------------add-attribute-------------------
const [expanded, setExpanded] = useState(true);
const [values, setValues] = useState(["red", "green", "blue"]);
const [visible, setVisible] = useState(true);
const [inputValue, setInputValue] = useState("");

const toggleExpand = () => setExpanded(!expanded);
const toggleVisibility = () => setVisible(!visible);
const removeValue = (value) => setValues(values.filter((v) => v !== value));
const handleInputChange = (e) => setInputValue(e.target.value);
const handleKeyDown = (e) => {
  if (e.key === "Enter" && inputValue.trim()) {
    setValues([...values, inputValue.trim()]);
    setInputValue("");
  }
};
const selectAll = () => setValues(["red", "green", "blue"]);
const selectNone = () => setValues([]);

// --------------inventory--------------
const [iconPreview, setIconPreview] = useState(null);
const [iconFile, setIconFile] = useState(null);

const handleIconUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setIconFile(file);
    setIconPreview(URL.createObjectURL(file));
  }
};

// ------------------------required-plugin---------------------
const [pluginInput, setPluginInput] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [selectedPlugins, setSelectedPlugins] = useState([]);

const allPlugins = [
  "SEO Booster",
  "Analytics Tracker",
  "Live Chat",
  "Currency Converter",
  "Dark Mode",
  "Image Optimizer",
  "Popup Manager",
  "Backup System",
  "Translation Tool",
  "Spam Blocker",
];

const handlerequireplugin = (e) => {
  const value = e.target.value;
  setPluginInput(value);

  if (value.trim() === "") {
    setSuggestions([]);
  } else {
    const filtered = allPlugins.filter(
      (plugin) =>
        plugin.toLowerCase().includes(value.toLowerCase()) &&
        !selectedPlugins.includes(plugin)
    );
    setSuggestions(filtered);
  }
};

const addPlugin = (plugin) => {
  if (!selectedPlugins.includes(plugin)) {
    setSelectedPlugins([...selectedPlugins, plugin]);
  }
  setPluginInput("");
  setSuggestions([]);
};

const removePlugin = (plugin) => {
  setSelectedPlugins(selectedPlugins.filter((p) => p !== plugin));
};
const [selectedFile, setSelectedFile] = useState(null);

const handleIconChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setIconPreview(URL.createObjectURL(file));
  }
};
const handleFileChange2 = (e) => {
  setSelectedFile(e.target.files[0]);
};
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%]  m-auto py-[20px] xl:py-[40px] px-[10px] xl:px-[30px]'>
             <div className='w-full flex justify-between items-center'>
                   <div>
              <h1 className='text-[20px] font-[600] mb-[8px]'>Edit Plugin</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
            <li>Appearance</li>
            <li><IoIosArrowForward/></li>
            <li>Edit Plugin</li>
          </ul>
                 </div>
                     {/* <div>
                        <button className='border-[2px] border-brand_color text-brand_color px-[20px] py-[8px] text-[16px] rounded-[5px]'>Import</button>
                     </div> */}
       </div>
              <section className='flex justify-center w-full flex-col lg:flex-row gap-[20px] mt-[20px]'>
                <section className='w-full lg:w-[75%] h-auto '>
                      <form action=""className='mt-[20px]'>
         <div className="w-[100%] space-y-4 mb-[15px]">
      {/* Page Title Input */}
      <div>
      {/* Title Input */}
      <label
        htmlFor="page-title"
        className="text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-600"
      >
       Theme Title 
      </label>
      <input
        type="text"
        id="page-title"
        placeholder="Theme Title"
        className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]"
        value={pageTitle}
        onChange={handleInputChange2}
      />

{pageTitle && (
        <div className="mt-2 text-sm text-gray-500 flex justify-start items-center gap-[5px]">
          <label className="font-medium">Permalink:</label>{" "}
          {isEditingPermalink ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={full_slug}
                onChange={handlePermalinkChange}
                className="border-[1px] border-gray-300 rounded px-2 py-1 text-gray-700 w-full"
              />
              <div
                onClick={savePermalink}
                className="bg-orange-600 text-white cursor-pointer px-3 py-1 rounded text-sm hover:bg-orange-700"
              >
                OK
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <a href={`${basePermalink + full_slug}`} target="_blank" className="text-brand_color underline">{basePermalink + permalink}</a>
              <div
                onClick={() => setIsEditingPermalink(true)}
                className="bg-orange-600 text-white px-3 cursor-pointer py-1 rounded text-sm hover:bg-orange-700"
              >
                Edit
              </div>
            </div>
          )}
        </div>
      )}
    </div>

  
    </div>
                       
                           <div className='w-[100%]  mb-[20px]'>
                            <label htmlFor=""className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-500'>Plugin Description</label>
<div className='mt-[3px] 2xl:mt-[7px]'>
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
                        <div className='w-[100%]  mb-[20px]'>
                            <label htmlFor=""className='text-label_size 2xl:text-[16px] font-label_weight 2xl:font-[500] text-gray-500'>Plugin Short Description</label>
<div className='mt-[3px] 2xl:mt-[7px]'>
<SunEditor
            setContents={content2}
            onChange={setContent2}
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
                      </form>
                      <section>
                      <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Theme Data:</label>
   
        </div>
        <div className="flex items-center space-x-4">
         
          <div
            onClick={() => setBoxExpanded(!boxExpanded)}
            className="p-2 border rounded-full cursor-pointer bg-gray-200 text-gray-600 hover:text-gray-800"
          >
            {boxExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
      </div>

      {boxExpanded && (
        <div className="flex">
          {/* Sidebar Tabs */}
          <div className="w-1/4 border-r bg-[#FAFAFA]">
            <div className="">
              {tabs.map((tab) => (
                (productType !== "Grouped product" || tab.name !== "Inventory") && (
                  <div
                    key={tab.name}
                    className={`flex items-center w-full text-sm px-4 py-[10px] cursor-pointer transition-all border-b-[1px] text-left text-nowrap 
                      ${activeTab === tab.name ? "bg-[#EEEEEE] text-yellow-600 font-medium" : "text-brand_color hover:bg-gray-100 hover:text-yellow-500"}`}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    <tab.icon className="mr-2 w-4" />
                    {tab.name}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="w-3/4 ">
            {/* <h2 className="text-lg font-semibold mb-4">{activeTab} Settings</h2> */}
            <div>
              {activeTab === "General" && (
              <div className='p-[10px]'>
              {/* Regular Price */}
              <label className="block text-sm font-medium text-gray-700">Regular price:</label>
              <input type="text" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" placeholder="Enter regular price" />
              
              {/* Sale Price */}
              <label className="block text-sm font-medium text-gray-700 mt-2">Sale price:</label>
              <input type="text" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" placeholder="Enter sale price" />
              
              {/* Schedule Link */}
              <button 
                className="text-brand_color mt-[10px] hover:underline text-sm mb-4" 
                onClick={() => setShowScheduleFields(true)}
              >
                Schedule
              </button>
              
              {/* Scheduled Sale Date Fields */}
              {showScheduleFields && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sale price dates:</label>
                  <div className="flex space-x-2 mb-2">
                  <input 
  type="text" 
  className="w-1/2 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" 
  placeholder="DD-MM-YYYY" 
  onFocus={(e) => e.target.type = 'date'}
  onBlur={(e) => e.target.type = 'text'}
/>
<input 
  type="text" 
  className="w-1/2 mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" 
  placeholder="DD-MM-YYYY" 
  onFocus={(e) => e.target.type = 'date'}
  onBlur={(e) => e.target.type = 'text'}
/> </div>
                  <button 
                    className="text-red-600 hover:underline text-sm" 
                    onClick={() => setShowScheduleFields(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
                    <label className="block text-sm font-medium text-gray-700 mt-2">Last Sale price:</label>
              <input type="text" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" placeholder="Enter last sale price" />
              <label className="block text-sm font-medium text-gray-700 mt-2">Purchase price:</label>
              <input type="text" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" placeholder="Enter purchase price" />
              
            </div>
              )}

              {activeTab === "Inventory" && (
  <div className="p-4">
  {/* Icon Upload */}
  <label className="block text-sm font-medium text-gray-700">Icon:</label>
  <div className="mt-2 relative">
    <label
      onClick={togglePopup}
      className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md overflow-hidden cursor-pointer"
    >
      {iconPreview ? (
        <img src={iconPreview} alt="Preview" className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center text-gray-400">
          <FaUpload className="text-2xl" />
          <span className="text-sm mt-2">Click to upload</span>
        </div>
      )}
    </label>
    <input
      id="iconInput"
      type="file"
      accept="image/*"
      onChange={handleIconChange}
      className="hidden"
    />
  </div>

  {/* Name Field */}
  <label className="block text-sm font-medium text-gray-700 mt-2">Name:</label>
  <input type="text" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" placeholder="Enter Name" />

  <div className='flex justify-center items-center gap-[10px]'>
    <div className='w-full lg:w-[50%]'>
      {/* Version Field */}
      <label className="block text-sm font-medium text-gray-700 mt-2">Version:</label>
      <input type="text" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" placeholder="Enter Version" />
    </div>
    <div className='w-full lg:w-[50%]'>
      {/* Live Field */}
      <label className="block text-sm font-medium text-gray-700 mt-2">Live:</label>
      <input type="text" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" placeholder="Enter Live URL" />
    </div>
  </div>

  {/* Framework Field */}
  <label className="block text-sm font-medium text-gray-700 mt-2">Framework:</label>
  <input type="text" className="w-full mt-[3px] 2xl:mt-[7px] rounded-[5px] placeholder-gray-700 outline-brand_color text-input_text 2xl:text-[15px] h-input_height 2xl:h-[45px] border-[1px] border-[#eee] p-[12px]" placeholder="Enter Framework" />
{/* File Upload Field */}
<div className="mt-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">Upload File:</label>
  <div className="flex items-center gap-4 border-[1px] border-gray-300 p-[5px] rounded-[5px]">
    <input
      type="file"
      id="customFile"
      onChange={handleFileChange2}
      className="hidden"
    />
    <label
      htmlFor="customFile"
      className="cursor-pointer px-4 py-2 bg-brand_color text-white text-sm rounded-md hover:bg-opacity-90"
    >
      Choose File
    </label>
    <span className="text-sm text-gray-600 truncate max-w-[60%]">
      {selectedFile ? selectedFile.name : "No file chosen"}
    </span>
  </div>
</div>
  {/* Submit Button */}
  <button className="bg-brand_color text-[14px] text-white py-2 px-[30px] mt-4">Submit</button>

  {/* File Upload Field */}


</div>
              )}

          
            </div>
          </div>
        </div>
      )}
    </div>
                                   </section>
              {/* ------------------comments--------------------- */}
              </section>
<section className='w-[100%] xl:w-[30%]'>
<section className='border-[1px] border-[#eee] rounded-[5px]'>
  <div className="space-y-4 flex justify-start flex-col bg-white">
    <div className='border-b-[1px] px-[20px] py-[10px] border-[#eee]'>
      <h1 className='text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600'>Publish</h1>
    </div>
    <div className='px-[15px] py-[10px] space-y-4 flex justify-start flex-col'>
      {/* Status Section */}
      <div className="">
        <div className="flex items-center">
          <FaKey className="text-gray-500 mr-2" />
          <p className="text-sm text-gray-700">
            Visibility: <span className="font-semibold">{status}</span>
            <button
              onClick={() => {
                setPreviousStatus(status); // Store the current status before editing
                setIsEditingStatus(!isEditingStatus);
              }}
              className="text-brand_color text-sm ml-2 hover:underline"
            >
              Edit
            </button>
          </p>
        </div>
        {isEditingStatus && (
          <div className="ml-6">
            <div>
              <label className="block">
                <input
                  type="radio"
                  name="visibility"
                  value="Publish"
                  checked={status === "Publish"}
                  onChange={handleStatusChange}
                  className="mr-2 cursor-pointer"
                />
                Publish
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="visibility"
                  value="Password"
                  checked={status === "Password"}
                  onChange={handleStatusChange}
                  className="mr-2 cursor-pointer"
                />
                Password
              </label>
              {status === "Password" && (
                <input
                  type="text"
                  placeholder="Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="border p-2 h-[33px] 2xl:h-[39px] rounded text-[15px] outline-brand_color 2xl:text-[16px] w-full my-[4px]"
                />
              )}
              <label className="block">
                <input
                  type="radio"
                  name="visibility"
                  value="Private"
                  checked={status === "Private"}
                  onChange={handleStatusChange}
                  className="mr-2 cursor-pointer"
                />
                Private
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="visibility"
                  value="Draft"
                  checked={status === "Draft"}
                  onChange={handleStatusChange}
                  className="mr-2 cursor-pointer"
                />
                Draft
              </label>
            </div>
            <button
              onClick={() => setIsEditingStatus(false)}
              className="mt-2 bg-brand_color text-white px-3 py-1 rounded text-sm hover:bg-brand_color_hover"
            >
              Update
            </button>
            <button
              onClick={() => {
                setStatus(previousStatus); // Revert to the previous status
                setIsEditingStatus(false);
              }}
              className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Visibility Section */}
      <div className="flex items-center">
        <FaEye className="text-gray-500 mr-2" />
        <p className="text-sm text-gray-700">
          Authorized: <span className="font-semibold">{visibility}</span>
          <button
            onClick={() => {
              setPreviousVisibility(visibility); // Store the current visibility before editing
              setIsEditingVisibility(!isEditingVisibility);
            }}
            className="text-orange-500 text-sm ml-2 hover:underline"
          >
            Edit
          </button>
        </p>
      </div>
      {isEditingVisibility && (
        <div className="ml-6 mt-2 relative">
          {/* Dropdown Box */}
          <div
            className="border p-2 rounded text-sm w-full pl-2 pr-2 cursor-pointer flex items-center justify-between"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <span className="flex items-center justify-start gap-2">
              <span
                className={`w-2 h-2 rounded-full bg-${
                  options.find((opt) => opt.label === visibility)?.color
                }`}
              ></span>
              <span className={`text-${options.find((opt) => opt.label === visibility)?.color}`}>
                {visibility}
              </span>
            </span>
            <FaChevronDown
              className={`text-gray-500 transform mt-[2px] transition-transform ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Dropdown Options */}
          {dropdownOpen && (
            <ul
              className="absolute z-10 bg-white border mt-1 text-sm rounded w-full shadow"
              onMouseLeave={() => setHoveredItem(null)}
            >
              {options.map((option) => (
                <li
                  key={option.label}
                  onClick={() => {
                    setVisibility(option.label);
                    setDropdownOpen(false);
                  }}
                  onMouseEnter={() => setHoveredItem(option.label)}
                  className={`p-2 flex items-center text-${option.color} gap-2 cursor-pointer transition ${
                    hoveredItem === option.label
                      ? "bg-gray-100"
                      : visibility === option.label
                      ? `${option.bg}`
                      : ""
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full bg-${option.color}`}></span>
                  {option.label}
                </li>
              ))}
            </ul>
          )}

          {/* Action Buttons */}
          <button
            onClick={() => setIsEditingVisibility(false)}
            className="mt-2 bg-brand_color text-white px-3 py-1 rounded text-sm hover:bg-orange-500"
          >
            Update
          </button>
          <button
            onClick={() => {
              setVisibility(previousVisibility); // Revert to the previous visibility
              setIsEditingVisibility(false);
            }}
            className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Published Date Section */}
      <div className="flex items-center w-full">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <p className="text-sm text-gray-700">
          Publish Date:{" "}
          <span className="font-semibold">
            {`${publishedDate.getDate()}-${publishedDate.toLocaleString('default', { month: 'long' })}-${publishedDate.getFullYear()}`}
          </span>
          <button
            onClick={() => {
              setPreviousPublishedDate(publishedDate); // Store the current date before editing
              setIsEditingDate(!isEditingDate);
            }}
            className="text-orange-500 text-sm ml-2 hover:underline"
          >
            Edit
          </button>
        </p>
      </div>
      {isEditingDate && (
        <div className="ml-6 mt-2">
          <DatePicker
            selected={publishedDate}
            onChange={(date) => setPublishedDate(date)}
            className="border p-1 rounded text-sm w-full"
            dateFormat="dd-MMMM-yyyy"
          />
          <div>
            <button
              onClick={() => setIsEditingDate(false)}
              className="mt-2 bg-brand_color text-white px-3 py-1 rounded text-sm hover:bg-brand_color"
            >
              Update
            </button>
            <button
              onClick={() => {
                setPublishedDate(previousPublishedDate); // Revert to the previous date
                setIsEditingDate(false);
              }}
              className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Publish Button at the bottom */}
      <div className="w-full flex justify-end items-center">
        <button
          onClick={handleClick}
          className="mt-4 bg-brand_color text-white px-4 py-2 rounded text-sm hover:bg-orange-600"
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
</section>
                                    {/* --------------------publish--------------- */}
                          {/* -------------file upload---------------- */}
     {/* -------------file upload---------------- */}
     {/* -------------file upload---------------- */}
   <div className="relative w-full h-[300px] mt-[10px] mb-[10px] group">
      {/* Profile Image Section */}
      <div className="w-full h-full rounded-[5px] overflow-hidden border-2 border-dashed border-brand_color">
        {profileImage ? (
         <>
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center gap-[5px]'>
          <label
        htmlFor="profileImageInput"
        onClick={togglePopup}
        className=" group-hover:block hidden bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
      >
        <FaCamera className="w-4 h-4" />
      </label>
          <button
              onClick={removeImage}
              className="group-hover:block hidden bg-red-500text-white bg-red-500 p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
            >
              <RiDeleteBin5Line   className="w-4 h-4 text-white" />
            </button>
      
          </div>
           
            {/* <div className='w-full h-full absolute top-0 flex justify-center items-center left-0'>
     <label
        htmlFor="profileImageInput"
        onClick={togglePopup}
        className=" group-hover:block hidden bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
      >
        <FaCamera className="w-4 h-4" />
      </label>
     </div> */}
         </>
        ) : (
          <div className="flex items-center justify-center flex-col w-full h-full bg-gray-200 text-gray-500">
             <div className='flex justify-center items-center gap-[5px]'>
             <label
        htmlFor="profileImageInput"
        onClick={togglePopup}
        className="  bg-brand_color text-white p-3 rounded-[5px] cursor-pointer hover:bg-orange-600"
      >
        <FaCamera className="w-4 h-4" />
               </label>
               <button
              onClick={removeImage}
              className=" bg-red-500 text-white  p-3 rounded-[5px] cursor-pointer hover:bg-red-600"
            >
              <RiDeleteBin5Line   className="w-4 h-4 text-white" />
            </button>
             </div>
            <p className='text-[14px] 2xl:text-[15px] mt-[5px]'><span>1200px X 600px</span></p>
        
          </div>
        )}
      </div>

      {/* Camera Icon Button */}
     

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

    </div>
    
                          {/* -------------file upload---------------- */}

                          <div className="w-full border border-gray-300  bg-white">
                          <div className="border-b-[1px] px-[20px] py-[10px] border-[#eee]">
        <h1 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600">
        Gallery Image
        </h1>
      </div>

      <button
        onClick={toggleGalleryPopup}
        className="text-orange-600 px-[20px] py-[10px] underline hover:underline text-sm"
      >
        Add theme gallery images
      </button>

      {/* Selected Images in the Box */}
      {selectedImages.length > 0 && (
        <div className="mt-1 p-[20px] grid grid-cols-3 gap-2">
          {selectedImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-24 object-cover rounded-[2px]"
              />
              <button
                onClick={() => removeSelectedImage(image.id)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popup */}
      {galleryPopupVisible && (
        <div className="fixed inset-0 z-[1000000000] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[70%] lg:w-[50%]">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-300">
              <h2 className="text-lg font-semibold">Upload Images</h2>
              <button
                onClick={toggleGalleryPopup}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-300">
              <div
                onClick={() => setCurrentGalleryTab("library")}
                className={`w-1/2 py-2 text-center ${
                  currentGalleryTab === "library"
                    ? "border-b-2 border-orange-500 text-orange-500 font-semibold"
                    : "text-gray-600 hover:text-orange-500 cursor-pointer"
                }`}
              >
                Media Library
              </div>
              <div
                onClick={() => setCurrentGalleryTab("upload")}
                className={`w-1/2 py-2 text-center ${
                  currentGalleryTab === "upload"
                    ? "border-b-2 border-orange-500 text-orange-500 font-semibold"
                    : "text-gray-600 hover:text-orange-500 cursor-pointer"
                }`}
              >
                Upload New
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {currentGalleryTab === "upload" && (
                <div className="text-center">
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="fileUpload"
                    className="inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all duration-300"
                  >
                    Upload New
                  </label>
                </div>
              )}

              {currentGalleryTab === "library" && (
                <div>
                  {/* Display Uploaded Images */}
                  <div className="grid grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
                    {uploadedImages.map((image) => (
                      <div
                        key={image.id}
                        className="relative cursor-pointer p-1"
                        onClick={() => selectImageFromLibrary(image)}
                      >
                        <img
                          src={image.src}
                          alt={image.title}
                   className="border rounded cursor-pointer w-[200px] h-[200px]"
                        />
                        <span className="absolute bottom-1 left-1 text-xs bg-gray-800 text-white px-1 rounded">
                          {image.title}
                        </span>
                      </div>
                    ))}
                    {uploadedImages.length === 0 && (
                      <div className="col-span-full h-[150px] flex justify-center items-center text-gray-500">
                        No images found. Upload some first!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-300 text-right">
              <button
                onClick={toggleGalleryPopup}
                className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-2 px-6 rounded-lg hover:shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
                          {/* -------------file upload---------------- */}
                          {/* -------------file upload---------------- */}
                          <div className="bg-white border-[1px] mt-[20px] border-[#eee] rounded-[4px] shadow-sm">
      <div className="border-b-[1px] px-[20px] py-[10px] border-[#eee]">
        <h1 className="text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600">
        Theme Category
        </h1>
      </div>
      <div className="px-[20px] custom-scrollbar overflow-y-auto">
        <div className="mt-[10px] w-full h-[240px]">
        <ul className="space-y-4">
  {categories.map((category) => (
    <li key={category.name}>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          checked={checkedCategories[category.name] || false}
          onChange={() => handleCheckboxChange(category.name)}
        />
        <span
          className={`w-4 h-4 2xl:w-4 2xl:h-4 rounded-sm border ${checkedCategories[category.name] ? 'bg-brand_color border-brand_color' : 'bg-white border-neutral-600'} flex items-center justify-center`}
        >
          {checkedCategories[category.name] && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        <span className="text-[16px] text-neutral-600">{category.name}</span>
      </label>
      <ul className="ml-6 mt-2 space-y-2">
        {category.subcategories.map((subcategory) => (
          <li key={subcategory.name}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={checkedCategories[subcategory.name] || false}
                onChange={() => handleCheckboxChange(category.name, subcategory.name)}
              />
              <span
                className={`w-4 h-4 2xl:w-4 2xl:h-4 rounded-sm border ${checkedCategories[subcategory.name] ? 'bg-brand_color border-brand_color' : 'bg-white border-neutral-600'} flex items-center justify-center`}
              >
                {checkedCategories[subcategory.name] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-[16px] text-neutral-600">{subcategory.name}</span>
            </label>
            <ul className="ml-6 mt-2 space-y-2">
              {subcategory.children &&
                subcategory.children.map((child) => (
                  <li key={child}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={checkedCategories[child] || false}
                        onChange={() => handleCheckboxChange(category.name, subcategory.name, child)}
                      />
                      <span
                        className={`w-4 h-4 2xl:w-4 2xl:h-4 rounded-sm border ${checkedCategories[child] ? 'bg-brand_color border-brand_color' : 'bg-white border-neutral-600'} flex items-center justify-center`}
                      >
                        {checkedCategories[child] && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="text-[16px] text-neutral-600">{child}</span>
                    </label>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>

        </div>
      </div>

      {showForm ? (
        <div className="py-[10px] px-[20px] border-t-[1px] border-[#eee]">
          <div className="flex justify-between mb-2">
            <p
              className="text-[15px] 2xl:text-[16px] font-[400] 2xl:font-semibold text-gray-600 cursor-pointer underline flex justify-center items-center gap-[8px]"
              onClick={() => setShowForm(false)}
            >
              <FaMinus /> Add New Category
            </p>
            <FaTimes className="text-gray-600 cursor-pointer" onClick={() => setShowForm(false)} />
          </div>
          <input
            type="text"
            className="border p-2 h-[33px] 2xl:h-[39px] rounded text-[15px] outline-brand_color 2xl:text-[16px] w-full my-[4px]"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
   <select
  className="border px-2 h-[33px] 2xl:h-[39px] rounded text-[15px] outline-brand_color 2xl:text-[16px] w-full my-[4px]"
  value={parentCategory}
  onChange={(e) => setParentCategory(e.target.value)}
>
  <option value="None">None</option>
  {categories.map((cat) => (
    <React.Fragment key={cat.name}>
      {/* Main Category */}
      <option value={cat.name}>{cat.name}</option>

      {/* Subcategories */}
      {cat.subcategories.map((sub) => (
        <React.Fragment key={sub.name}>
          <option value={sub.name}>— {sub.name}</option>

          {/* Child Categories */}
          {sub.children.map((child) => (
            <option key={child} value={child}>
              —— {child}
            </option>
          ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  ))}
</select>

          <div className="flex justify-end items-center">
            <button
              className="mt-2 bg-brand_color text-white px-3 py-1 rounded text-sm hover:bg-orange-500"
              onClick={handleAddCategory}
            >
              Add New
            </button>
          </div>
        </div>
      ) : (
        <div
          className="py-[10px] px-[20px] border-t-[1px] text-[15px] 2xl:text-[16px] font-[400] 2xl:font-semibold text-gray-600 border-[#eee] flex justify-start underline items-center gap-[5px] cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          <FaPlus className="text-gray-600 font-[400] text-[16px]" />
          <span className="text-[15px] 2xl:text-[16px] font-[400] 2xl:font-semibold text-gray-600">
            Add new category
          </span>
        </div>
      )}
    </div>


                          {/* ================add tags--------------- */}
             <div className="bg-white border-[1px] border-[#eee] mt-[20px] rounded-[5px] shadow-sm">
      {/* Header Section */}
      <div className=" w-full">
      <div className='border-b-[1px] px-[20px] py-[10px]  border-[#eee] '>
        <h1 className='text-[15px] 2xl:text-[18px] font-[500] 2xl:font-semibold text-gray-600'>Tags </h1>
      </div>
        {/* Input and Button Section */}
        <div className="px-[10px] relative">
      <div className="w-full relative mt-[15px]">
        <input
          type="text"
          placeholder="Enter tag"
          value={userInput}
          onChange={handleUserInputChange}
          className="w-full border-[1px] border-[#ddd] px-[12px] text-[14px] rounded-[5px] h-[40px] focus:outline-none focus:ring-2 focus:ring-brand_color"
        />
        <button
          onClick={() => handleTagSelection(userInput)}
          className="absolute top-0 right-0 h-[40px] px-[15px] bg-brand_color text-[14px] text-white rounded-r-[5px] hover:bg-brand_color transition-all"
        >
          Add
        </button>
        
      {/* Suggestions */}
      {userInput && filteredTagOptions.length > 0 && (
        <div className="mt-[10px] bg-white absolute top-[100%] left-0 w-full border-[1px] border-[#ddd] rounded-[5px] shadow-md">
          {filteredTagOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleTagSelection(option)}
              className="cursor-pointer px-[12px] py-[8px] hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      </div>


      {/* Selected Tags */}
      <div className="mt-[15px] flex flex-wrap gap-2 pb-[10px]">
        {chosenTags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center px-[10px] py-[5px] bg-gray-100 text-gray-600 rounded-[5px] text-[14px]"
          >
            {tag}
            <button
              onClick={() => handleTagRemoval(tag)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
       </div>
      </div>

    </div>
</section>
              </section>
              </section>
        </section>
    </section>
  )
}

export default Editplugin