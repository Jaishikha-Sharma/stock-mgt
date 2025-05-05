"use client";
import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaRupeeSign } from "react-icons/fa";

const Page = () => {
  const [summary, setSummary] = useState({ totalProducts: 0, totalPrice: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/summary");
        const data = await res.json();
        if (data.success) {
          setSummary({
            totalProducts: data.totalProducts,
            totalPrice: data.totalPrice,
          });
        }
      } catch (err) {
        console.error("Failed to fetch summary", err);
      }
    };

    fetchSummary();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  return (
    <div>
      {/* Summary Cards */}
      <div className="flex flex-wrap justify-center gap-6 py-10 px-4">
        {/* Card 1: Total Products */}
        <div className="bg-gradient-to-br from-blue-100 to-indigo-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 w-72 flex items-center space-x-4">
          <div className="bg-indigo-500 text-white rounded-full p-4">
            <FaBoxOpen className="text-2xl" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800">
              Total Products
            </h2>
            <p className="text-2xl font-bold text-indigo-700 mt-1">
              {summary.totalProducts}
            </p>
          </div>
        </div>

        {/* Card 2: Total Price */}
        <div className="bg-gradient-to-br from-green-100 to-emerald-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 w-72 flex items-center space-x-4">
          <div className="bg-green-500 text-white rounded-full p-4">
            <FaRupeeSign className="text-2xl" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800">Total Price</h2>
            <p className="text-2xl font-bold text-green-700 mt-1">
              ₹{formatNumber(summary.totalPrice)}
            </p>
          </div>
        </div>
      </div>

      {/* Existing Hero Section */}
      <section className="text-gray-600 body-font bg-gray-50">
        <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-5xl text-4xl mb-6 font-bold text-gray-900">
              Welcome to Aditya Plastics
            </h1>
            <p className="mb-8 leading-relaxed text-lg text-gray-700 text-justify">
              Aditya Plastics is a trusted supplier of high-quality{" "}
              <strong>flex rolls</strong>, vibrant <strong>inks</strong>, and
              durable <strong>frames</strong> for printing businesses. Whether
              you're looking for reliable materials for signage, banners, or
              custom printing, we've got you covered with competitive prices and
              consistent quality.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => (window.location.href = "/services")}
                className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg transition"
              >
                Our Services
              </button>
              <button
                onClick={() => (window.location.href = "/stock")}
                className="ml-4 inline-flex text-indigo-600 bg-indigo-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-200 rounded text-lg transition"
              >
                View Stock
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="Aditya Plastics"
              src="/flex.png"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
