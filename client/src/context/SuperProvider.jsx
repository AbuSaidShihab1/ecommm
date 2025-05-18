import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const SuperContext = createContext();

export const SuperProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const admin_token =localStorage.getItem("adminToken");

  // Customers
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/customers`);
      if (res.data.success) {
        setData(res.data.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    } finally {
      setLoadingCustomers(false);
    }
  };

  // Price Plans
  const [pricePlans, setPricePlans] = useState([]);
  const [loadingPricePlans, setLoadingPricePlans] = useState(true);

  const fetchPricePlans = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/price-plans`);
      if (res.data.success) {
        setPricePlans(res.data.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch price plans:', err);
    } finally {
      setLoadingPricePlans(false);
    }
  };

  // Coupons
  const [coupons, setCoupons] = useState([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/coupons`);
      if (res.data.success) {
        setCoupons(res.data.coupons);
        console.log('Fetched Coupons:', res.data.coupons);
      }
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
    } finally {
      setLoadingCoupons(false);
    }
  };

  // Checkouts
  const [checkouts, setCheckouts] = useState([]);
  const [loadingCheckouts, setLoadingCheckouts] = useState(true);

  const fetchCheckouts = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/checkout`);
      setCheckouts(res.data);
      console.log('Fetched Checkouts:', res.data);
    } catch (err) {
      console.error('Failed to fetch checkouts:', err);
    } finally {
      setLoadingCheckouts(false);
    }
  };

  // Categories
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/categories`);
      console.log("Fetched Categories Response:", res);
      if (res.data.success) {
        setCategories(res.data.data);
        console.log('Fetched Categories:', res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Library Images
  const [libraryImages, setLibraryImages] = useState([]);
  const [loadingLibraryImages, setLoadingLibraryImages] = useState(true);

  const fetchLibraryImages = async () => {
    setLoadingLibraryImages(true);
    try {
      const res = await axios.get(`${base_url}/api/upload/image/admin-library-images/${admin_info._id}`);
      if (res) {
        setLibraryImages(res.data.images);
        console.log("Fetched Library Images:", res.data.images);
      }
    } catch (err) {
      console.error('Failed to fetch library images:', err);
    } finally {
      setLoadingLibraryImages(false);
    }
  };

  // Countries
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/countries`);
       console.log(res)
      if (res) {
        setCountries(res.data.data);
        console.log('Fetched Countries:', res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch countries:', err);
    } finally {
      setLoadingCountries(false);
    }
  };
    // languages
  const [languages, setlanguages] = useState([]);
  const [loadinglanguages, setloadinglanguages] = useState(true);

  const fetchlangugaes = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/languges`);
       console.log(res)
      if (res) {
        setlanguages(res.data.data);
        console.log('Fetched Languages:', res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch Languages:', err);
    } finally {
      setLoadingCountries(false);
    }
  };
      // timezones
  const [timezones, settimezones] = useState([]);
  const [loadingtimezones, setloadingtimezones] = useState(true);

  const fetchtimezones = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/timezone`);
       console.log(res.data.data)
      if (res) {
        settimezones(res.data.data);
        console.log('Fetched timezones:', res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch timezones:', err);
    } finally {
      setLoadingCountries(false);
    }
  };
      // dateformat
  const [dateformat,setdateformat] = useState([]);
  const [loadingdateformat, setloadingdateformat] = useState(true);

  const fetchdateformat = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/dateformat`);
       console.log(res.data.data)
      if (res) {
        setdateformat(res.data.data);
        console.log('Fetched timeformat:', res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch Dateformat:', err);
    } finally {
      setloadingdateformat(false);
    }
  };
        // timeformat
  const [timeformat, settimeformat] = useState([]);
  const [loadingtimeformat, setloadingtimeformat] = useState(true);

  const fetchtimeformat = async () => {
    try {
      const res = await axios.get(`${base_url}/super/admin/timeformat`);
       console.log(res.data.data)
      if (res) {
        settimeformat(res.data.data);
        console.log('Fetched timeformat:', res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch timeformat:', err);
    } finally {
      setloadingtimeformat(false);
    }
  };
// -------------------------customer-users--------------------------------
const [users,setUsers]=useState([])
const fetchusers = async () => {
  setLoadingCustomers(true);
  try {
    const res = await axios.get(`${base_url}/super/admin/all-users`, {
      headers: {
        Authorization: `Bearer ${admin_token}`
      }
    });

    if (res.data.success) {
      setUsers(res.data.data); // ✅ correct: matches your backend's "data"
      console.log("Fetched users:", res.data.data);
    }
  } catch (err) {
    console.error('Failed to fetch users:', err);
  } finally {
    setLoadingCustomers(false);
  }
};
// --------------------------users-role--------------------------------
const [usersrole,setUsersrole]=useState([])
const fetchusersrole = async () => {
  setLoadingCustomers(true);
  try {
    const res = await axios.get(`${base_url}/super/admin/all-user-role`, {
      headers: {
        Authorization: `Bearer ${admin_token}`
      }
    });

    if (res.data.success) {
      setUsersrole(res.data.data); // ✅ correct: matches your backend's "data"
      console.log("Fetched users:", res.data.data);
    }
  } catch (err) {
    console.error('Failed to fetch users:', err);
  } finally {
    setLoadingCustomers(false);
  }
};
// --------------------------ticket--------------------------------
const [tickets,settickets]=useState([])
const fetchtickets = async () => {
  setLoadingCustomers(true);
  try {
    const res = await axios.get(`${base_url}/super/admin/all-tickets`, {
      headers: {
        Authorization: `Bearer ${admin_token}`
      }
    });

    if (res) {
      settickets(res.data.tickets); // ✅ correct: matches your backend's "data"
      console.log("Fetched ticket:", res.data.tickets);
    }
  } catch (err) {
    console.error('Failed to fetch users:', err);
  } finally {
    setLoadingCustomers(false);
  }
};
  useEffect(() => {
    fetchCustomers();
    fetchCoupons();
    fetchPricePlans();
    fetchCheckouts();
    fetchCategories();
    fetchLibraryImages();
    fetchCountries();
    fetchusers();
    fetchusersrole();
    fetchtickets();
    fetchlangugaes();
    fetchtimezones();
    fetchtimeformat();
    fetchdateformat();
  }, []);

  return (
    <SuperContext.Provider
      value={{
        data,
        setData,
        loadingCustomers,
        refetchCustomers: fetchCustomers,
        pricePlans,
        setPricePlans,
        loadingPricePlans,
        fetchPricePlans,
        fetchCoupons,
        coupons,
        checkouts,
        loadingCheckouts,
        fetchCheckouts,
        categories,
        loadingCategories,
        fetchCategories,
        libraryImages,
        loadingLibraryImages,
        fetchLibraryImages,
        countries,
        loadingCountries,
        fetchCountries,
        users,
        usersrole,
        tickets,
        fetchtickets,
        languages,
        timezones,
        timeformat,
        dateformat,
        fetchusers
      }}
    >
      {children}
    </SuperContext.Provider>
  );
};

export const useSuper = () => useContext(SuperContext);
