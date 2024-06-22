import React, { useState } from 'react';

const AdminNavbar = () => {
  const [isTestDropdownOpen, setIsTestDropdownOpen] = useState(false);

  return (
    <nav className="py-4 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-blue-700 font-bold text-xl">
          Creative Computing Society
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="/final-questions" className="text-black">
            Final Questions
          </a>
          <a href="/solutions" className="text-black">
            Solutions
          </a>
          
          {/* Tests Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsTestDropdownOpen(!isTestDropdownOpen)}
              className="text-black focus:outline-none"
            >
              Tests
              <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isTestDropdownOpen && (
              <div className="absolute right-0 mt-2 w-20 bg-white rounded-lg shadow-lg py-1">
                <a href="/tests" className="block px-4 py-2 text-sm text-black">
                  Test
                </a>
                <a href="/results" className="block px-4 py-2 text-sm text-black">
                  Results
                </a>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button 
            onClick={() => {
                
            }}
            className="bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;