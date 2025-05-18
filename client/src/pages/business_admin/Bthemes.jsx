import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Business_dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5"; // Import close icon


const CategoryAccessPopup = ({ isOpen, onClose }) => {
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
 
    // --------------table coulms
const [data,setData] = useState([
  {
    id: "#1",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "Post Contents",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "1.0.0",
    updateDate: "21-October-2023",
    updateTime: "10:30 AM",
    status: "Inactive",
  },
  {
    id: "#2",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "eCommerce Products",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "2.3.1",
    updateDate: "21-October-2023",
    updateTime: "02:45 PM",
    status: "Active",
  },
  {
    id: "#1",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "Post Contents",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "1.0.0",
    updateDate: "21-October-2023",
    updateTime: "10:30 AM",
    status: "Inactive",
  },
  {
    id: "#2",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "eCommerce Products",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "2.3.1",
    updateDate: "21-October-2023",
    updateTime: "02:45 PM",
    status: "Active",
  },
  {
    id: "#1",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "Post Contents",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "1.0.0",
    updateDate: "21-October-2023",
    updateTime: "10:30 AM",
    status: "Inactive",
  },
  {
    id: "#2",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "eCommerce Products",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "2.3.1",
    updateDate: "21-October-2023",
    updateTime: "02:45 PM",
    status: "Active",
  },
  {
    id: "#1",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "Post Contents",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "1.0.0",
    updateDate: "21-October-2023",
    updateTime: "10:30 AM",
    status: "Inactive",
  },
  {
    id: "#2",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "eCommerce Products",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "2.3.1",
    updateDate: "21-October-2023",
    updateTime: "02:45 PM",
    status: "Active",
  },
  {
    id: "#1",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "Post Contents",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "1.0.0",
    updateDate: "21-October-2023",
    updateTime: "10:30 AM",
    status: "Inactive",
  },
  {
    id: "#2",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "eCommerce Products",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "2.3.1",
    updateDate: "21-October-2023",
    updateTime: "02:45 PM",
    status: "Active",
  },
  {
    id: "#1",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "Post Contents",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "1.0.0",
    updateDate: "21-October-2023",
    updateTime: "10:30 AM",
    status: "Inactive",
  },
  {
    id: "#2",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "eCommerce Products",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "2.3.1",
    updateDate: "21-October-2023",
    updateTime: "02:45 PM",
    status: "Active",
  },
  {
    id: "#1",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "Post Contents",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "1.0.0",
    updateDate: "21-October-2023",
    updateTime: "10:30 AM",
    status: "Inactive",
  },
  {
    id: "#2",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "eCommerce Products",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "2.3.1",
    updateDate: "21-October-2023",
    updateTime: "02:45 PM",
    status: "Active",
  },
  {
    id: "#1",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "Post Contents",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "1.0.0",
    updateDate: "21-October-2023",
    updateTime: "10:30 AM",
    status: "Inactive",
  },
  {
    id: "#2",
    plugin: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Favatars%2Favatar-10.webp&w=1920&q=75",
    name: "eCommerce Products",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores et quis a, veritatis at expedita.",
    version: "2.3.1",
    updateDate: "21-October-2023",
    updateTime: "02:45 PM",
    status: "Active",
  },
]);

const columns = [
  { key: "id", label: "ID" },
  { key: "plugin", label: "Plugin" },
  { key: "description", label: "Description" },
  { key: "version", label: "Version" },
  { key: "updateDate", label: "Update Date" },
  { key: "status", label: "Status" },
];
const toggleStatus = (rowIndex, newStatus) => {
  console.log(rowIndex)
  const updatedRows = [...data]; // Copy the rows array
  console.log(updatedRows)
  updatedRows[rowIndex].status = newStatus; // Update the status of the specific row
  setData(updatedRows); // Set the updated rows to the state
};
  return isOpen ? (
    <div className="fixed inset-0 w-full bg-black bg-opacity-50 h-[100vh] overflow-y-auto py-[40px] z-[100000000] flex items-center justify-center">
         <section className="w-[95%] lg:w-[85%] rounded-[3px] bg-white m-auto ">

        <div className="border-b px-5 py-4 flex justify-between items-center border-gray-200">
          <h1 className="text-[15px] 2xl:text-[18px] font-[500] text-gray-600">Required Plugins</h1>
          <IoClose className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800" onClick={onClose} />
        </div>
       <section className='px-[20px] pb-[20px]'>
       <section className='w-full overflow-x-auto border-[1px] border-[#eee] bg-red-50 mt-[20px] custom-scrollbar'>
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    <thead className="bg-table_header dark:bg-gray-800">
          <tr>
            {columns
              .map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-left text-nowrap uppercase text-sm font-medium text-table_title dark:text-gray-300"
                >
                  {col.label}
                </th>
              ))}
          </tr>
        </thead>
<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
 
{data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {columns
                  .map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-4 text-nowrap text-sm text-gray-700 dark:text-gray-300`}
                    >
                      {col.key === "plugin" ? (
                        <div className="flex justify-start items-center gap-[15px] w-auto pr-[30px]">
                          <img
                            src={row[col.key]}
                            alt="Row"
                            className="w-12 h-12 rounded-[5px]"
                          />
                          <p className='text-black text-[15px] font-[500]'>{row.name}</p>
                        </div>
                      ) :col.key === "description" ? (
                        <div className="">
                         {
                          row.description.length > 40 ?  <p className=''>{row.description.slice(0,40)}...</p>: <p className=''>{row.description}</p>
                         }
                        </div>
                      ) :col.key === "updateDate" ? (
                        <div>
                          <div className="text-black text-nowrap dark:text-gray-100">
                            {row[col.key]}
                          </div>
                          <div className="text-[14px] text-nowrap text-gray-400">
                            {row.update_time}
                          </div>
                        </div>
                      ) : col.key === "status" ? (
                        <div className="flex items-center space-x-3 w-[150px]">


                        {/* Toggle Switch */}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={row[col.key] === "Active"}
                            onChange={(e) =>
                              toggleStatus(rowIndex, e.target.checked ? "Active" : "Inactive")
                            }
                          />
                          <div
                            className={`w-12 h-6 bg-red-500 dark:bg-gray-700 rounded-[2px] flex items-center px-1 transition-all duration-300 cursor-pointer peer-checked:bg-green-500 ${
                              row[col.key] === "Active" ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-[2px] shadow-md transform transition-all duration-300 ${
                                row[col.key] === "Active" ? "translate-x-[20px]" : "translate-x-0"
                              }`}
                            ></div>
                          </div>
                          
                        </label>
                          {/* Status Text */}
                          <span
                          className={`text-sm font-medium ${
                            row[col.key] === "Active" ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {row[col.key]}
                        </span>
                      </div>
                      ): (
                        row[col.key]
                      )}
                    </td>
                  ))}
              </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-300"
                >
               <div>
                <img className='w-[200px] block m-auto' src={empty_img} alt="" />
                <h2 className='text-[17px] text-neutral-500'>No Data</h2>
               </div>
                </td>
              </tr>
            )}
</tbody>


      </table>

        </section>
       </section>
      </section>
    </div>
  ) : null;
};

const Bthemes = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [showModal, setShowModal] = useState(false);
  const [pluginList, setPluginList] = useState([]);

  const handleSidebar = () => {
    setactivesidebar(!activesidebar);
  };

  const handleShowPlugins = (plugins) => {
    setPluginList(plugins);
    setShowModal(true);
  };
const themes = [
  { id: 1, name: "Theme 1", image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Fprofile%2Fimg-2.webp&w=1920&q=90" },
  { id: 2, name: "Theme 2", image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Fprofile%2Fimg-12.webp&w=1920&q=90" },
  { id: 3, name: "Theme 3", image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Fprofile%2Fimg-9.webp&w=1920&q=90" },
  { id: 4, name: "Theme 4", image: "https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Fprofile%2Fimg-7.webp&w=1920&q=90" },
];
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);
   const [activeTheme, setActiveTheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleActivate = (id) => {
    setActiveTheme(id);
  };

  const handleDeactivate = () => {
    setActiveTheme(null);
  };

  const filteredThemes = themes.filter((theme) =>
    theme.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -----------------required-plugins-----------------
  const [categoryPopupVisible, setCategoryPopupVisible] = useState(false);
  
  return (
    <section className="w-full h-[100vh] flex font-poppins">
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 md:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto md:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className="w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px] overflow-x-auto no-scrollbar">
         {/* All themes */}
          <div className="container">
      <h1 className="text-[26px] font-bold mb-4">Themes</h1>
        <ul className='w-full   md:w-auto flex mb-[20px] items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                  <li>Dashboard</li>
                  <li><IoIosArrowForward/></li>
                  <li>Appearance</li>
                  <li><IoIosArrowForward/></li>
                  <li>Themes</li>
                </ul>
      <p className="text-gray-800 font-[500] text-[15px] mb-6">10+ themes</p>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for theme"
          className="border rounded-md w-full py-2 px-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredThemes.map((theme) => (
          <div
            key={theme.id}
            className="bg-white border relative rounded-[md] shadow-md overflow-hidden"
          >
            <img
              src={theme.image}
              alt={theme.name}
              className="h-48 w-full object-cover"
            />
            <button className="bg-indigo-700 absolute top-[6%] right-[6%] text-white py-[5px] px-4 rounded-sm text-[13px]">
              Live Preview
            </button>
         <div className='p-[15px]'>
             <h2 className="text-lg font-semibold mb-2">{theme.name}</h2>
            <div className="flex justify-start items-center gap-[10px]">
              <button
                onClick={() =>
                  activeTheme === theme.id ? handleDeactivate() : handleActivate(theme.id)
                }
                className={`${
                  activeTheme === theme.id
                    ? "bg-green-500"
                    : "bg-gray-500"
                } text-white py-[5px] px-4 rounded-sm text-[13px]`}
              >
                {activeTheme === theme.id ? "Active" : "Inactive"}
              </button>
              {
                activeTheme === theme.id?<NavLink to="/appearance/required-plugins">
                      <button  className="bg-orange-500 text-white text-[13px] py-[5px] px-[10px] rounded-sm">
                Required Plugins
              </button>
                </NavLink>:   <button  onClick={() => setCategoryPopupVisible(true)} className="bg-orange-500 text-white text-[13px] py-[5px] px-[10px] rounded-sm">
                Required Plugins
              </button>
              }
            </div>
         </div>
          </div>
        ))}
      </div>
    </div>
          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center z-[12243434222] justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] md:w-[50%]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Required Plugins</h2>
                  <button
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                    onClick={() => setShowModal(false)}
                  >
                    ✖
                  </button>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  {pluginList.map((plugin, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      {plugin}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-brand_color text-white rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
{categoryPopupVisible && <CategoryAccessPopup isOpen={categoryPopupVisible} onClose={() => setCategoryPopupVisible(false)} />}

      </section>
    </section>
  );
};

export default Bthemes;
