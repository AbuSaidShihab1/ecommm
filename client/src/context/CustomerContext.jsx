import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customerData, setCustomerData] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [customerError, setCustomerError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [selected_package,set_selected_package]=useState([]);
  const fetchCustomerInformation = async () => {
    try {
      setLoadingCustomer(true);
      const res = await axios.get(`${base_url}/auth/customer-information/${user._id}`);
      if (res.data) {
        setCustomerData(res.data.data);
        setCustomerError(null);
        set_selected_package(res.data.data.selectedPackage)
        console.log(res)
      } else {
        setCustomerError(res.data.message);
        setCustomerData(null);
      }
    } catch (error) {
      setCustomerError("Failed to fetch customer data");
      setCustomerData(null);
    } finally {
      setLoadingCustomer(false);
    }
  };
  useEffect(()=>{
    fetchCustomerInformation();
  },[])
  return (
    <CustomerContext.Provider value={{
      customerData,
      loadingCustomer,
      customerError,
      fetchCustomerInformation,
      selected_package,
      set_selected_package,
    }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
