import { RiDashboardFill } from "react-icons/ri";
import { FaRegUser, FaEnvelopeOpenText } from "react-icons/fa";
import { IoPricetagsOutline, IoMdPeople } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosPaper } from "react-icons/io";
import { MdSupportAgent, MdOutlineCampaign } from "react-icons/md";

const SidebarData = [
  {
    title: 'Dashboard',
    path: '/super-dashboard',
    icon: <RiDashboardFill />,
  },
  {
    title: 'Customer',
    path: '/super-customer',
    icon: <FaRegUser />,
    subNav: [
      {
        title: 'New Customer',
        path: '/super-customer-new-customer',
        icon: <IoIosPaper />,
      },
      {
        title: 'Customer List',
        path: '/super-customer-customer-list',
        icon: <IoIosPaper />,
      },
    ],
  },
  {
    title: 'Price Plan',
    path: '/super-priceplan',
    icon: <IoPricetagsOutline />,
    subNav: [
      {
        title: 'New Price Plan',
        path: '/super-priceplan-new-price-plan',
        icon: <IoIosPaper />,
      },
      {
        title: 'Price Plan List',
        path: '/super-priceplan-price-plan-list',
        icon: <IoIosPaper />,
      },
      {
        title: 'Payment Transfer',
        path: '/super-priceplan-payment-transfer',
        icon: <IoIosPaper />,
      },
    ],
  },
  {
    title: 'Users',
    path: '/super-user',
    icon: <HiOutlineUserCircle />,
    subNav: [
      {
        title: 'New User',
        path: '/super-user-new-user',
        icon: <IoIosPaper />,
      },
      {
        title: 'User List',
        path: '/super-user-list',
        icon: <IoIosPaper />,
      },
      {
        title: 'User Role List',
        path: '/super-user-role-list',
        icon: <IoIosPaper />,
      },
      {
        title: 'User Profile',
        path: '/super-user-profile',
        icon: <IoIosPaper />,
      },
    ],
  },
  {
    title: 'Support Ticket',
    path: '/super-ticket',
    icon: <MdSupportAgent />,
    subNav: [
      {
        title: 'New Tickets',
        path: '/super-ticket-new-ticket',
        icon: <IoIosPaper />,
      },
      {
        title: 'Ticket List',
        path: '/super-ticket-list',
        icon: <IoIosPaper />,
      },
    ],
  },
];

export default SidebarData;