import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Freelancer App</h3>
            <p className="text-gray-400">Connecting talent with opportunity</p>
          </div>
          <div className="flex space-x-4">
            <a href="/terms" className="hover:text-blue-400">Terms</a>
            <a href="/privacy" className="hover:text-blue-400">Privacy</a>
            <a href="/contact" className="hover:text-blue-400">Contact</a>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Freelancer App. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;