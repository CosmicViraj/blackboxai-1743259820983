import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaBriefcase, 
  FaEnvelope, 
  FaUser, 
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <h1 className="text-white font-bold text-xl">Freelancer Connect</h1>
        </div>
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 space-y-1">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
              }
            >
              <FaHome className="mr-3 h-5 w-5" />
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/jobs"
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
              }
            >
              <FaBriefcase className="mr-3 h-5 w-5" />
              Jobs
            </NavLink>
            <NavLink
              to="/dashboard/messages"
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
              }
            >
              <FaEnvelope className="mr-3 h-5 w-5" />
              Messages
            </NavLink>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
              }
            >
              <FaUser className="mr-3 h-5 w-5" />
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
              }
            >
              <FaCog className="mr-3 h-5 w-5" />
              Settings
            </NavLink>
          </div>
          <div className="px-3 mt-auto">
            <button className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full">
              <FaSignOutAlt className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;