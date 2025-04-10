import React from "react";
import { LogOut } from "lucide-react";

const Header = () => {
  const handleLogout = () => {
    alert("Đăng xuất thành công!");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow-md rounded-xl mb-4">
      <h1 className="text-xl font-bold flex items-center gap-2">
        🛍️ MIXI SHOP
      </h1>

      <div className="flex items-center gap-4 text-sm">
        <span>
          Xin chào, <span className="font-semibold">Duc Nhat</span>
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-xl text-sm font-medium hover:bg-blue-100 transition"
        >
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default Header;
