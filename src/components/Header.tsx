import React from "react";
import logo from "../assets/clustox_logo.png";

const Header: React.FC = () => {
  return (
    <header className="bg-[#0040D1] text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        
        {/* Left - Logo & Brand Name */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="ProjectPulse Logo" className="w-28 h-auto" />
          <h1 className="text-2xl font-bold font-poppins tracking-wide">
            ProjectPulse
          </h1>
        </div>

        {/* Right - Call-to-Action (Optional) */}
        <button className="bg-[#00C26C] text-white px-5 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
          Get Started
        </button>
      </div>

      {/* Subtitle */}
      <div className="container mx-auto mt-3 text-center px-6">
        <p className="text-lg md:text-xl font-light font-poppins">
          Convert <span className="font-semibold text-[#00C26C]">Ahmed Bhai</span>'s tickets into tasks
        </p>
      </div>
    </header>
  );
};

export default Header;
