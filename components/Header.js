"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="text-gray-700 body-font bg-[#A8D5E3] shadow-sm mb-[30px]">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        {/* Logo */}
        <a className="flex items-center font-bold text-gray-900 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3">Aditya Plastics</span>
        </a>

        {/* Hamburger Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row md:items-center w-full md:w-auto mt-4 md:mt-0 gap-4 text-base font-medium text-center`}
        >
          <Link href="/" className="hover:text-[#F2F0EA] cursor-pointer">
            Home
          </Link>
          <Link href="/stock" className="hover:text-[#F2F0EA] cursor-pointer">
            Stock Manager
          </Link>
          <Link
            href="/services"
            className="hover:text-[#F2F0EA] cursor-pointer"
          >
            Our Services
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
