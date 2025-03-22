import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-200 text-white py-6 pt-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className=" text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 ">
            Techtip
          </p>
          <p className="text-sm text-black">
            Your go-to platform for all things tech.
          </p>
        </div>

        {/* Center Links */}
        <nav className=" ml-auto flex space-x-10">
          <a href="#" className="text-black hover:text-red-900 text-sm">
            About
          </a>
          <a href="#" className="text-black hover:text-red-900 text-sm">
            Blog
          </a>
          <a href="#" className="text-black hover:text-red-900 text-sm">
            Contact
          </a>
          <a href="#" className="text-black hover:text-red-900 text-sm">
            Privacy Policy
          </a>
        </nav>

        {/* Right Section (Social Media Icons) */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} Tech Tips & Tricks. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
