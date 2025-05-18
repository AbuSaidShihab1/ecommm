import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Aviewticket = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const admin_info = JSON.parse(localStorage.getItem("admin_ecommerce"));
  const admin_token = localStorage.getItem("adminToken");
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true)
      } else {
        setactivetopbar(false)
      }
    });

    // Fetch ticket data
    const fetchTicket = async () => {
      try {
        const response = await fetch(`${base_url}/super/admin/ticket-information/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch ticket');
        }
        
        const data = await response.json();
        setTicket(data.ticket);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, [id]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
            <p>Loading ticket information...</p>
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
            <p className="text-red-500">Error: {error}</p>
          </div>
        </section>
      </section>
    );
  }

  if (!ticket) {
    return (
      <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
          <Dashboardleftside />
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : ' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
          <Dashboradheader />
          <div className="flex justify-center items-center h-[80vh]">
            <p>Ticket not found</p>
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
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Ticket #{ticket.ticket_id}</h1>
              <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
                <li>Dashboard</li>
                <li><IoIosArrowForward /></li>
                <li>Support Ticket</li>
                <li><IoIosArrowForward /></li>
                <li>Ticket #{ticket.ticket_id}</li>
              </ul>
            </div>
          </div>

          {/* Main Ticket */}
          <section className='pt-[40px] pb-[30px]'>
            <div className="bg-white rounded-lg p-6 w-full border mb-[20px] border-gray-200">
              <div className="flex items-start space-x-4">
                <img
                  src={ticket.profile_pic || "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{ticket.shopName || 'No shop name'}</h4>
                      <div className='flex justify-start items-center gap-2'>
                        <p className="text-sm text-gray-500">
                          {ticket.email} &bull; #{ticket.ticket_id} &bull; {formatDate(ticket.createDate)}
                        </p>
                        <div className={`flex justify-center items-center gap-1 font-medium text-[15px] ${
                          ticket.status === 'Open' ? 'text-green-500' : 
                          ticket.status === 'Closed' ? 'text-red-500' : 
                          'text-blue-500'
                        }`}>
                          <div className={`w-[10px] h-[10px] rounded-full ${
                            ticket.status === 'Open' ? 'bg-green-500' : 
                            ticket.status === 'Closed' ? 'bg-red-500' : 
                            'bg-blue-500'
                          }`}></div>
                          {ticket.status}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-gray-700">
                    <h3 className="font-semibold">{ticket.subject}</h3>
                    <ReactQuill 
                      value={ticket.message}
                      readOnly={true}
                      theme={"bubble"}
                    />
                  </div>
                  <p className="text-gray-700 mt-4 font-semibold">Regards,</p>
                  <p className="text-gray-700">{ticket.shopName || 'Customer'},</p>
                  {ticket.attachments && ticket.attachments.length > 0 && (
                    <div className="mt-4 py-3 flex items-center space-x-3">
                      <div>
                        <img className='w-[40px]' src={`http://localhost:8080/uploads/${admin_info?._id}/${ticket.attachments}`} alt="" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{ticket.attachments[0]} (size not available)</p>
                        <div className="flex space-x-3 text-sm text-gray-700 mt-1">
                          <button className="hover:underline flex justify-center items-center gap-2">
                            <MdOutlineRemoveRedEye className='text-[18px]' /> Preview
                          </button>
                          <button className="hover:underline flex justify-center items-center gap-2">
                            <PiDownloadSimpleBold /> Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Replies */}
            {ticket.replies && ticket.replies.map((reply, index) => (
              <div key={index} className="bg-white rounded-lg p-6 w-full border mb-[20px] border-gray-200">
                <div className="flex items-start space-x-4">
                  <img
                    src={ticket.profile_pic || "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {reply.isAdminReply ? 'Admin' : ticket.shopName || 'Customer'}
                        </h4>
                        <div className='flex justify-start items-center gap-2'>
                          <p className="text-sm text-gray-500">
                            {reply.repliedBy} &bull; #{reply.reply_id} &bull; {formatDate(reply.repliedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-gray-700">
                      <ReactQuill 
                        value={reply.message}
                        readOnly={true}
                        theme={"bubble"}
                      />
                    </div>
                    <p className="text-gray-700 mt-4 font-semibold">Regards,</p>
                    <p className="text-gray-700">{reply.isAdminReply ? 'Admin' : ticket.shopName || 'Customer'}</p>
                    {reply.attachments && reply.attachments.length > 0 && (
                      <div className="mt-4 py-3 flex items-center space-x-3">
                        <div>
                          <img className='w-[40px]' src="https://isomorphic-furyroad.vercel.app/_next/static/media/doc-icon.c49abc54.svg" alt="" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{reply.attachments[0]} (size not available)</p>
                          <div className="flex space-x-3 text-sm text-gray-700 mt-1">
                            <button className="hover:underline flex justify-center items-center gap-2">
                              <MdOutlineRemoveRedEye className='text-[18px]' /> Preview
                            </button>
                            <button className="hover:underline flex justify-center items-center gap-2">
                              <PiDownloadSimpleBold /> Download
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </section>
      </section>
    </section>
  );
}

export default Aviewticket;