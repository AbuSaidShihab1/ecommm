import React, { useContext, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { BiImport } from 'react-icons/bi';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';

const Newpamnet = () => {
  const { activesidebar, setactivesidebar } = useContext(Contextapi);

  const [formData, setFormData] = useState({
    customerName: '',
    salesDate: '',
    referenceNo: '',
    itemDetails: [
      { name: 'Item 1', quantity: 1, price: 100, tax: 10, total: 110 },
    ],
    otherCharges: 10,
    discount: 5,
    subtotal: 100,
    grandTotal: 105,
  });

  return (
    <section className="w-full h-[100vh] flex font-poppins">
      {/* Sidebar */}
      <section
        className={`${
          activesidebar ? 'w-0' : 'xl:w-[20%]'
        } transition-all duration-300 h-[100vh]`}
      >
        <Dashboardleftside />
      </section>

      {/* Main Section */}
      <section
        className={`${
          activesidebar ? 'w-[100%]' : 'xl:w-[80%]'
        } transition-all duration-300 overflow-y-auto h-[100vh]`}
      >
        <Dashboradheader />
        <section className="w-full py-6 px-4 lg:px-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">New Price Plan</h1>
              <ul className="flex items-center text-gray-500 text-sm">
                <li>Dashboard</li>
                <li>
                  <IoIosArrowForward />
                </li>
                <li>Price Plan</li>
                <li>
                  <IoIosArrowForward />
                </li>
                <li>New Price Plan</li>
              </ul>
            </div>
            <button className="hidden lg:flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded">
              <BiImport />
              Import
            </button>
          </div>

          {/* Customer Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Customer Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter Customer Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sales Date</label>
              <input type="date" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reference No.</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter Reference No."
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white shadow-md rounded-md overflow-hidden mb-6">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Unit Price</th>
                  <th className="p-3">Tax</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {formData.itemDetails.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">${item.price.toFixed(2)}</td>
                    <td className="p-3">${item.tax.toFixed(2)}</td>
                    <td className="p-3 font-semibold">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Previous Payments Table */}
          <div className="bg-white shadow-md rounded-md overflow-hidden mb-6">
            <h3 className="text-lg font-semibold p-3 bg-gray-200">Previous Payment Information</h3>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Payment Date</th>
                  <th className="p-3">Payment Mode</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">2024-12-01</td>
                  <td className="p-3">Cash</td>
                  <td className="p-3 font-semibold">$50.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Additional Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Additional Note</label>
              <textarea
                rows="3"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Write notes here..."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Other Charges</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discount</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Total Section */}
          <div className="text-right mb-6">
            <p className="text-gray-600 text-sm">Subtotal: $100.00</p>
            <p className="text-gray-600 text-sm">Other Charges: $10.00</p>
            <p className="text-gray-600 text-sm">Discount: $5.00</p>
            <p className="text-xl font-bold text-blue-500 mt-2">Grand Total: $105.00</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button className="bg-blue-500 text-white px-6 py-2 rounded">Save</button>
            <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded">Close</button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Newpamnet;
