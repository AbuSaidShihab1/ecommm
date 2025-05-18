import React,{useState} from "react";
function StatusSwitch({ status, onChange }) {
    const [isActive, setIsActive] = useState(status === "Active");
    console.log(status)
    const handleToggle = () => {
      const newStatus = isActive ? "Inactive" : "Active";
      setIsActive(!isActive);
      onChange(newStatus);
    };
  
    return (
      <div className="flex items-center space-x-3 w-[130px]">
        {/* Status Text */}
  
  
        {/* Square Toggle Switch */}
        <label className="inline-flex relative items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isActive} onChange={handleToggle} />
          <div
            className={`w-12 h-6 bg-red-500 dark:bg-gray-700 rounded-[2px] flex items-center px-1 transition-all duration-300 cursor-pointer peer-checked:bg-green-500`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-[2px] shadow-md transform transition-all duration-300 ${
                isActive ? "translate-x-[20px]" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>
              <span className={`text-sm font-medium ${isActive ? "text-green-600" : "text-red-500"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
    );
  }

  export default StatusSwitch