"use client";
import React , { useState, useEffect } from "react";

export default function GpuCard({ gpu, pricingPreference }) {
  const [activeTab, setActiveTab] = useState("onDemand");

  // Set active tab based on pricing preference
  useEffect(() => {
    if (pricingPreference === "monthly") {
      setActiveTab("monthly");
    } else {
      setActiveTab("onDemand");
    }
  }, [pricingPreference]);

  // Format price from cents/INR to dollars with 2 decimal places
  const formatPrice = (price) => {
    if (!price) return "0.00";
    return (price / 100).toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {gpu.gpu_description || gpu.resource_name || "GPU Instance"}
            </h3>
            <p className="text-sm text-gray-500">
              {gpu.resource_class
                ? `Class: ${gpu.resource_class.toUpperCase()}`
                : "NVIDIA"}
            </p>
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {gpu.is_public ? "Available" : "Limited Access"}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">vCPUs</p>
            <p className="font-semibold">{gpu.vcpus || "N/A"}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">RAM</p>
            <p className="font-semibold">{gpu.ram ? `${gpu.ram} GB` : "N/A"}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">GPU Memory</p>
            <p className="font-semibold">
              {gpu.gpu_description
                ? gpu.gpu_description.includes("-")
                  ? gpu.gpu_description.split("-")[1]
                  : gpu.gpu_description
                : "N/A"}
            </p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">Region</p>
            <p className="font-semibold">
              {gpu.region
                ? gpu.region.charAt(0).toUpperCase() + gpu.region.slice(1)
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            {`${
              gpu.operating_system
                ? gpu.operating_system.charAt(0).toUpperCase() +
                  gpu.operating_system.slice(1)
                : "Linux"
            } 
            instance with ${gpu.gpu_description || "GPU"} in ${
              gpu.region || "Unknown"
            } region.`}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "onDemand"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("onDemand")}
            >
              On-Demand
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "spot"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("spot")}
            >
              Spot
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "monthly"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("monthly")}
            >
              Monthly
            </button>
          </div>

          <div className="mt-3">
            {activeTab === "onDemand" && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    ${formatPrice(gpu.price_per_hour)}/hr
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Est. ${formatPrice(gpu.price_per_hour * 24)}/day
                </div>
              </div>
            )}

            {activeTab === "spot" && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    ${formatPrice(gpu.price_per_spot)}/hr
                  </p>
                  {gpu.price_per_spot && gpu.price_per_hour && (
                    <p className="text-xs text-green-600">
                      Save{" "}
                      {Math.round(
                        (1 - gpu.price_per_spot / gpu.price_per_hour) * 100
                      )}
                      %
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Est. ${formatPrice(gpu.price_per_spot * 24)}/day
                </div>
              </div>
            )}

            {activeTab === "monthly" && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    ${formatPrice(gpu.price_per_month)}/mo
                  </p>
                  {gpu.price_per_month && gpu.price_per_hour && (
                    <p className="text-xs text-green-600">
                      Save{" "}
                      {Math.round(
                        (1 -
                          gpu.price_per_month /
                            (gpu.price_per_hour * 24 * 30)) *
                          100
                      )}
                      %
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-500">Reserved capacity</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
        {gpu.is_public ? (
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out">
            Deploy Now
          </button>
        ) : (
          <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-150 ease-in-out">
            Request Access
          </button>
        )}
      </div>
    </div>
  );
}
