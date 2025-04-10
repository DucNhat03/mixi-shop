import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, ClipboardList, Users } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center ml-3 gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
      location.pathname === path
        ? "bg-blue-500 text-white shadow-md"
        : "text-blue-600 hover:bg-blue-100"
    }`;

  return (
    <nav className="flex gap-4 p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <Link to="/" className={linkClass("/")}>
        <Package className="w-5 h-5" />
        Sản phẩm
      </Link>
      <Link to="/orders" className={linkClass("/orders")}>
        <ClipboardList className="w-5 h-5" />
        Đơn hàng
      </Link>
      <Link to="/customers" className={linkClass("/customers")}>
        <Users className="w-5 h-5" />
        Khách hàng
      </Link>
    </nav>
  );
};

export default Navbar;
