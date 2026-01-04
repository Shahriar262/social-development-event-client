import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const MainLayOut = () => {
  return (
    <div className="overflow-hidden">
      
        <Navbar />
        <div className="mt-20">
          <Outlet />
        </div>
        <Footer />
      

      <ToastContainer />
    </div>
  );
};

export default MainLayOut;
