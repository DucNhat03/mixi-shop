import React from "react";
import { LogOut } from "lucide-react";

const Header = () => {
  const handleLogout = () => {
    alert("Đăng xuất thành công!");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg rounded-xl mb-6">
      {/* Title Section */}
      <h1 className="text-2xl font-bold flex items-center gap-3">
        🛍️ <span>MIXI SHOP</span>
      </h1>

      {/* User Info & Logout Button */}
      <div className="flex items-center gap-6 text-sm">
        <span className="text-lg font-medium">
          Xin chào, <span className="font-semibold">Duc Nhat</span>
        </span>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
