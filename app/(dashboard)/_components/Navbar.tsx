import React from "react";
import MobileNavbar from "./MobileNavbar";
import NavbarRoutes from "@/components/NavbarRoutes";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full w-auto flex items-center justify-between bg-white shadow-sm">
      <span>
        <MobileNavbar />
      </span>

      <span>
        <NavbarRoutes />
      </span>
    </div>
  );
};

export default Navbar;
