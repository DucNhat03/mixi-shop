import React from "react";
import { Facebook, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-5 bg-gray-100 text-gray-600 py-6 px-4 rounded-xl shadow-inner">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-sm items-center">
        {/* Branding */}
        <div className="text-center md:text-left">
          <p className="text-base font-semibold text-gray-800">🛍️ MIXI SHOP</p>
          <p>© {new Date().getFullYear()} Nguyen Duc Nhat</p>
          <p className="text-xs text-gray-500">All rights reserved.</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-4 text-gray-600">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="w-5 h-5 hover:text-blue-600 transition" />
          </a>
          <a href="https://github.com/DucNhat03" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="w-5 h-5 hover:text-gray-800 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 hover:text-blue-700 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
