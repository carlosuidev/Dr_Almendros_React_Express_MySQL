import React from "react";
import { Sidebar } from "../components/shared/Sidebar";
import { Outlet } from "react-router-dom";

export const MainStructure = () => {
  return (
    <div className="w-full min-h-screen">
      <Sidebar></Sidebar>
      <div className="w-full lg:pl-72">
        <div className="container mx-auto lg:px-12 px-5 lg:mt-12 mt-24">
            <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
