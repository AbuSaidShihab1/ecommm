import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";
import logo from "../../../assets/logo.png"
import { IoPrintOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';

const CategoryAccessPopup = ({ isOpen, onClose, handlePayment, loading }) => {
  const [payment_method, setpayment_method] = useState([
    {
      id: 1,
      name: "Bkash",
      image: "https://xxxbetgames.com/icons-xxx/payments/135.svg",
      slug: "bkash"
    },
    {
      id: 2,
      name: "Nagad",
      image: "https://xxxbetgames.com/icons-xxx/payments/89.svg",
      slug: "nagad"
    },
    {
      id: 3,
      name: "Rocket",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Rocket_ddbl.png",
      slug: "rocket"
    }
  ]);
  const [active_method, set_active_method] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = () => {
    if (!active_method) {
      toast.error("Please select a payment method");
      return;
    }
    if (!transactionId) {
      toast.error("Please enter transaction ID");
      return;
    }
    handlePayment(active_method, transactionId);
  };

  return isOpen ? (
    <div className="fixed inset-0 w-full bg-black bg-opacity-50 h-[100vh] overflow-y-auto py-[40px] z-[100000000] flex items-center justify-center">
      <section className="w-[90%] lg:w-[70%] xl:w-[50%] 2xl:w-[30%] rounded-[3px] bg-white m-auto">
        <div className="border-b px-5 py-4 flex justify-between items-center border-gray-200">
          <h1 className="text-[15px] 2xl:text-[18px] font-[500] text-gray-600">Pay Now</h1>
          <IoClose className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800" onClick={onClose} />
        </div>
        <section className='px-[20px] py-[20px]'>
          <h1 className='mb-[10px]'>Select Payment Method</h1>
          <div className='flex justify-start gap-[10px] mb-4'>
            {payment_method.map((method) => (
              <div 
                key={method.id}
                onClick={() => set_active_method(method.name)} 
                className={`px-[20px] py-[10px] border-[2px] cursor-pointer rounded-[5px] ${
                  method.name === active_method 
                    ? 'border-brand_color bg-brand_color bg-opacity-10' 
                    : 'border-gray-100 bg-gray-100'
                }`}
              >
                <img className='w-[40px] mb-[5px] block m-auto' src={method.image} alt={method.name} />
                <p className='text-[14px] font-[500] text-gray-700 text-center'>{method.name}</p>
              </div>
            ))}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full px-[20px] py-[10px] bg-brand_color mt-[10px] text-white rounded-[5px] ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Pay 2000 BDT'}
          </button>
        </section>
      </section>
    </div>
  ) : null;
};

const Editinvoice = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const { id } = useParams();
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [accessPopupVisible, setAccessPopupVisible] = useState(false);
  
  const admin_token = localStorage.getItem("adminToken");
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  const fetchCheckoutData = async () => {
    try {
      const response = await axios.get(`${base_url}/super/admin/checkout/${id}`, {
        headers: {
          Authorization: `Bearer ${admin_token}`
        }
      });
      setCheckoutData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch checkout data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckoutData();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleAccessPopup = () => {
    setAccessPopupVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlanChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData(prev => ({
      ...prev,
      selectedPlan: {
        ...prev.selectedPlan,
        [name]: parseFloat(value)
      }
    }));
  };

  const handleUpdateCheckout = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${base_url}/super/admin/checkout/${id}`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${admin_token}`
          }
        }
      );
      toast.success("Checkout updated successfully");
      setEditMode(false);
      fetchCheckoutData(); // Refresh data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update checkout");
      setLoading(false);
    }
  };

  const handlePayment = async (paymentMethod, transactionId) => {
    try {
      setPaymentLoading(true);
      const updatedData = {
        ...checkoutData,
        payment: "Paid",
        walletDetails: {
          paymentMethod,
          transactionId,
          amount: checkoutData.totalPrice
        }
      };
      
      const response = await axios.put(
        `${base_url}/super/admin/checkout/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${admin_token}`
          }
        }
      );
      
      toast.success("Payment marked as completed");
      setAccessPopupVisible(false);
      fetchCheckoutData(); // Refresh data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to process payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
          <Dashboardleftside />
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Dashboradheader />
          <div className="flex justify-center items-center h-[80vh]">
            <p>Loading...</p>
          </div>
        </section>
      </section>
    );
  }

  if (error) {
    return (
      <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
          <Dashboardleftside />
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Dashboradheader />
          <div className="flex justify-center items-center h-[80vh]">
            <p className="text-red-500">{error}</p>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[20px] lg:px-[30px]'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Invoice #{checkoutData.invoiceId}</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Retail Customer</li>
                <li><IoIosArrowForward /></li>
                <li>Invoice #{checkoutData.invoiceId}</li>
              </ul>
            </div>
            <div className='flex gap-2'>
              {!editMode ? (
                <button 
                  onClick={() => setEditMode(true)}
                  className='px-4 py-2 bg-orange-500 text-white rounded '
                >
                  Edit Invoice
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleUpdateCheckout}
                    disabled={loading}
                    className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50'
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    onClick={() => {
                      setEditMode(false);
                      fetchCheckoutData(); // Reset to original data
                    }}
                    className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Invoice Table */}
          <div className="max-w-4xl mx-auto mt-[20px] xl:mt-[30px] p-5 xl:p-8 bg-white border text-gray-800">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-[20px] xl:text-2xl font-bold">INVOICE #{checkoutData.invoiceId}</h1>
              <div className="flex items-center space-x-2 text-orange-500 font-semibold px-3 py-1 rounded-full">
                <img className='w-[100px] xl:w-[140px]' src={logo} alt="Company Logo" />
              </div>
            </div>

            {/* Seller Information */}
            <div className='w-full flex justify-between'>
              <div className="mb-6 text-sm">
                <p className="font-bold text-orange-500">Invoice to:</p>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      name="company"
                      value={checkoutData.company || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="firstName"
                      value={checkoutData.firstName || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={checkoutData.lastName || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={checkoutData.phone || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="email"
                      value={checkoutData.email || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="address1"
                      value={checkoutData.address1 || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="city"
                      value={checkoutData.city || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="country"
                      value={checkoutData.country || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                  </>
                ) : (
                  <>
                    <p className="">{checkoutData.company}</p>
                    <p className="">{checkoutData.firstName} {checkoutData.lastName}</p>
                    <p>{checkoutData.phone}</p>
                    <p>{checkoutData.email}</p>
                    <p>{checkoutData.address1}, {checkoutData.city}, {checkoutData.country}</p>
                  </>
                )}
              </div>
              <div className="mb-6 text-sm text-center">
                <p className="text-[18px] xl:text-[20px] uppercase font-[600] text-red-500">
                  {checkoutData.payment === "Paid" ? "Paid" : "Unpaid"}
                </p>
                {editMode ? (
                  <input
                    type="date"
                    name="dueDate"
                    value={new Date(checkoutData.dueDate).toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    className="mb-1 p-1 border rounded w-full"
                  />
                ) : (
                  <p>Due Date: {formatDate(checkoutData.dueDate)}</p>
                )}
                {checkoutData.payment !== "Paid" && !editMode && (
                  <button 
                    onClick={toggleAccessPopup} 
                    className='px-[15px] py-[8px] bg-brand_color rounded-[5px] text-white text-[13px] xl:text-[15px] cursor-pointer mt-[5px]'
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>

            {/* Buyer Information & Invoice Details */}
            <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
              <div>
                <p className="font-bold text-orange-500">Bill to:</p>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      name="company"
                      value={checkoutData.company || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="firstName"
                      value={checkoutData.firstName || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={checkoutData.lastName || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={checkoutData.phone || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="email"
                      value={checkoutData.email || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="address1"
                      value={checkoutData.address1 || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                    <input
                      type="text"
                      name="city"
                      value={checkoutData.city || ''}
                      onChange={handleInputChange}
                      className="mb-1 p-1 border rounded w-full"
                    />
                  </>
                ) : (
                  <>
                    <p className="">{checkoutData.company}</p>
                    <p className="">{checkoutData.firstName} {checkoutData.lastName}</p>
                    <p className=''>{checkoutData.phone}</p>
                    <p className=''>{checkoutData.email}</p>
                    <p className=''>{checkoutData.address1}, {checkoutData.city}</p>
                  </>
                )}
              </div>
              <div className="text-right">
                {editMode ? (
                  <>
                    <div className="mb-1">
                      <label className="block">Invoice Date:</label>
                      <input
                        type="date"
                        name="invoiceDate"
                        value={new Date(checkoutData.invoiceDate).toISOString().split('T')[0]}
                        onChange={handleInputChange}
                        className="p-1 border rounded w-full"
                      />
                    </div>
                    <div className="mb-1">
                      <label className="block">Payment Due:</label>
                      <input
                        type="date"
                        name="dueDate"
                        value={new Date(checkoutData.dueDate).toISOString().split('T')[0]}
                        onChange={handleInputChange}
                        className="p-1 border rounded w-full"
                      />
                    </div>
                    <div className="mb-1">
                      <label className="block">Total Months:</label>
                      <input
                        type="number"
                        name="totalMonths"
                        value={checkoutData.totalMonths}
                        onChange={handleInputChange}
                        className="p-1 border rounded w-full"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-1">Invoice number: #{checkoutData.invoiceId}</p>
                    <p className="mb-1">Invoice Date: {formatDate(checkoutData.invoiceDate)}</p>
                    <p className="mb-1">Payment Due: {formatDate(checkoutData.dueDate)}</p>
                  </>
                )}
              </div>
            </div>

            {/* Item Table */}
            <div className="border overflow-hidden">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-table_header uppercase text-table_title">
                  <tr>
                    <th className="p-3 border-r font-[500]">Item</th>
                    <th className="p-3 border-r font-[500]">Duration</th>
                    <th className="p-3 border-r font-[500]">Price</th>
                    <th className="p-3 font-[500]">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t text-gray-700">
                    <td className="p-3 border-r">
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={checkoutData.selectedPlan?.name || ''}
                          onChange={(e) => {
                            setCheckoutData(prev => ({
                              ...prev,
                              selectedPlan: {
                                ...prev.selectedPlan,
                                name: e.target.value
                              }
                            }));
                          }}
                          className="p-1 border rounded w-full"
                        />
                      ) : (
                        checkoutData.selectedPlan?.name || "N/A"
                      )}
                    </td>
                    <td className="p-3 border-r">
                      {editMode ? (
                        <input
                          type="number"
                          value={checkoutData.totalMonths}
                          onChange={(e) => {
                            setCheckoutData(prev => ({
                              ...prev,
                              totalMonths: parseInt(e.target.value)
                            }));
                          }}
                          className="p-1 border rounded w-full"
                        />
                      ) : (
                        `${checkoutData.totalMonths} months`
                      )}
                    </td>
                    <td className="p-3 border-r">
                      {editMode ? (
                        <input
                          type="number"
                          step="0.01"
                          name="subtotal"
                          value={checkoutData.selectedPlan?.subtotal / checkoutData.totalMonths || 0}
                          onChange={(e) => {
                            const monthlyPrice = parseFloat(e.target.value);
                            setCheckoutData(prev => ({
                              ...prev,
                              selectedPlan: {
                                ...prev.selectedPlan,
                                subtotal: monthlyPrice * prev.totalMonths
                              },
                              totalPrice: monthlyPrice * prev.totalMonths - (prev.selectedPlan?.discount || 0)
                            }));
                          }}
                          className="p-1 border rounded w-full"
                        />
                      ) : (
                        (checkoutData.selectedPlan?.subtotal / checkoutData.totalMonths).toFixed(2)
                      )}
                    </td>
                    <td className="p-3">
                      {editMode ? (
                        <input
                          type="number"
                          step="0.01"
                          name="subtotal"
                          value={checkoutData.selectedPlan?.subtotal || 0}
                          onChange={(e) => {
                            const total = parseFloat(e.target.value);
                            setCheckoutData(prev => ({
                              ...prev,
                              selectedPlan: {
                                ...prev.selectedPlan,
                                subtotal: total
                              },
                              totalPrice: total - (prev.selectedPlan?.discount || 0)
                            }));
                          }}
                          className="p-1 border rounded w-full"
                        />
                      ) : (
                        checkoutData.selectedPlan?.subtotal.toFixed(2)
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className='flex justify-end'>
              <div className="text-right mt-6 space-y-2 text-sm w-[40%]">
                <p className='uppercase'>Subtotal: 
                  {editMode ? (
                    <input
                      type="number"
                      step="0.01"
                      value={checkoutData.selectedPlan?.subtotal || 0}
                      onChange={(e) => {
                        const subtotal = parseFloat(e.target.value);
                        setCheckoutData(prev => ({
                          ...prev,
                          selectedPlan: {
                            ...prev.selectedPlan,
                            subtotal: subtotal
                          },
                          totalPrice: subtotal - (prev.selectedPlan?.discount || 0)
                        }));
                      }}
                      className="ml-2 p-1 border rounded w-[70%]"
                    />
                  ) : (
                    <span> {checkoutData.selectedPlan?.subtotal.toFixed(2)}</span>
                  )}
                </p>
                <p className='uppercase'>Discounts: 
                  {editMode ? (
                    <input
                      type="number"
                      step="0.01"
                      name="discount"
                      value={checkoutData.selectedPlan?.discount || 0}
                      onChange={(e) => {
                        const discount = parseFloat(e.target.value);
                        setCheckoutData(prev => ({
                          ...prev,
                          selectedPlan: {
                            ...prev.selectedPlan,
                            discount: discount
                          },
                          totalPrice: (prev.selectedPlan?.subtotal || 0) - discount
                        }));
                      }}
                      className="ml-2 p-1 border rounded w-[70%]"
                    />
                  ) : (
                    <span> {checkoutData.selectedPlan?.discount.toFixed(2)}</span>
                  )}
                </p>
                <p className='uppercase'>Tax Amount: <span>0.00</span></p>
                <p className="mt-2">TOTAL AMOUNT: {checkoutData.totalPrice?.toFixed(2)}</p>
              </div>
            </div>

            {/* Payment Details */}
            {checkoutData.payment === "Paid" && (
              <div className="border overflow-hidden mt-[15px]">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-table_header uppercase text-table_title">
                    <tr>
                      <th className="p-3 border-r font-[500]">Date</th>
                      <th className="p-3 border-r font-[500]">Payment Method</th>
                      <th className="p-3 border-r font-[500]">Duration</th>
                      <th className="p-3 border-r font-[500]">Transaction ID</th>
                      <th className="p-3 font-[500]">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t text-gray-700">
                      <td className="p-3 border-r">{formatDate(checkoutData.invoiceDate)}</td>
                      <td className="p-3 border-r">
                        {editMode ? (
                          <input
                            type="text"
                            value={checkoutData.walletDetails?.paymentMethod || ''}
                            onChange={(e) => {
                              setCheckoutData(prev => ({
                                ...prev,
                                walletDetails: {
                                  ...prev.walletDetails,
                                  paymentMethod: e.target.value
                                }
                              }));
                            }}
                            className="p-1 border rounded w-full"
                          />
                        ) : (
                          checkoutData.walletDetails?.paymentMethod || "N/A"
                        )}
                      </td>
                      <td className="p-3 border-r">{checkoutData.totalMonths} months</td>
                      <td className="p-3 border-r">
                        {editMode ? (
                          <input
                            type="text"
                            value={checkoutData.walletDetails?.transactionId || ''}
                            onChange={(e) => {
                              setCheckoutData(prev => ({
                                ...prev,
                                walletDetails: {
                                  ...prev.walletDetails,
                                  transactionId: e.target.value
                                }
                              }));
                            }}
                            className="p-1 border rounded w-full"
                          />
                        ) : (
                          checkoutData.walletDetails?.transactionId || "N/A"
                        )}
                      </td>
                      <td className="p-3">
                        {editMode ? (
                          <input
                            type="number"
                            step="0.01"
                            value={checkoutData.walletDetails?.amount || 0}
                            onChange={(e) => {
                              setCheckoutData(prev => ({
                                ...prev,
                                walletDetails: {
                                  ...prev.walletDetails,
                                  amount: parseFloat(e.target.value)
                                }
                              }));
                            }}
                            className="p-1 border rounded w-full"
                          />
                        ) : (
                          checkoutData.walletDetails.amount?.toFixed(2)
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Download/Print Buttons */}
            <div className='mt-[20px] flex justify-end items-center gap-[10px]'>
              <button className='px-[15px] py-[8px] bg-gray-200 text-gray-800 rounded-[5px] flex justify-center items-center gap-1'>
                <FaDownload /> Download
              </button>
              <button className='px-[15px] py-[8px] bg-gray-200 text-gray-800 rounded-[5px] flex justify-center items-center gap-1'>
                <IoPrintOutline /> Print
              </button>
            </div>
          </div>
          
          <CategoryAccessPopup 
            isOpen={accessPopupVisible} 
            onClose={toggleAccessPopup} 
            handlePayment={handlePayment}
            loading={paymentLoading}
          />
        </section>
      </section>
    </section>
  );
};

export default Editinvoice;