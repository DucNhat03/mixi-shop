import React from "react";
import { Facebook, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-100 text-gray-600 py-6 px-4 rounded-xl shadow-inner">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Empty  */}
        <div className="hidden md:block w-1/3" />

        {/* Branding  */}
        <div className="text-center w-full md:w-1/3">
          <p className="text-lg font-bold text-gray-800 tracking-wide">🛍️ MIXI SHOP</p>
          <p>© {new Date().getFullYear()} Nguyen Duc Nhat</p>
          <p className="text-xs text-gray-500">All rights reserved.</p>
        </div>

        {/* Social*/}
        <div className="flex justify-center md:justify-end gap-4 w-full md:w-1/3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="w-5 h-5 hover:text-blue-600 transition-transform hover:scale-110" />
          </a>
          <a href="https://github.com/DucNhat03" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="w-5 h-5 hover:text-gray-800 transition-transform hover:scale-110" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 hover:text-blue-700 transition-transform hover:scale-110" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
