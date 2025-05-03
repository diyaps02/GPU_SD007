"use client";
import React from "react";
import { useState, useEffect } from "react";

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{gpu.name}</h3>
            <p className="text-sm text-gray-500">{gpu.manufacturer}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {gpu.availability}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">vCPUs</p>
            <p className="font-semibold">{gpu.specs.vCPUs}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">RAM</p>
            <p className="font-semibold">{gpu.specs.ram}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">GPU Memory</p>
            <p className="font-semibold">{gpu.specs.gpuMemory}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">Performance</p>
            <p className="font-semibold">{gpu.specs.performance}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">{gpu.description}</p>
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
                    ${gpu.pricing.onDemand}/hr
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Est. ${(gpu.pricing.onDemand * 24).toFixed(2)}/day
                </div>
              </div>
            )}

            {activeTab === "spot" && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    ${gpu.pricing.spot}/hr
                  </p>
                  <p className="text-xs text-green-600">
                    Save{" "}
                    {Math.round(
                      (1 - gpu.pricing.spot / gpu.pricing.onDemand) * 100
                    )}
                    %
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Est. ${(gpu.pricing.spot * 24).toFixed(2)}/day
                </div>
              </div>
            )}

            {activeTab === "monthly" && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    ${gpu.pricing.monthly}/mo
                  </p>
                  <p className="text-xs text-green-600">
                    Save{" "}
                    {Math.round(
                      (1 -
                        gpu.pricing.monthly /
                          (gpu.pricing.onDemand * 24 * 30)) *
                        100
                    )}
                    %
                  </p>
                </div>
                <div className="text-sm text-gray-500">Reserved capacity</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
        {gpu.availability === "Available" ? (
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
