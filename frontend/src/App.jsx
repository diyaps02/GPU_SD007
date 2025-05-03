"use client";
import React from "react";
import { useState } from "react";
import WorkloadForm from "./components/WorkLoadForm";
import GpuRecommendations from "./components/GpuRecommendations";

// Updated fetch function to handle backend data format
const fetchRecommendations = async (formData) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Example of real backend data format based on what was provided
  return [
    {
      country: "usa",
      operating_system: "windows",
      resource_class: "a100",
      resource_name: "W.N.A100.96",
      vcpus: 16,
      ram: 96,
      price_per_hour: 224.66,
      price_per_month: 102500,
      price_per_spot: 157.262,
      currency: "INR",
      is_gpu: 1,
      is_spot: 0,
      resource: "instances",
      resource_type: "gpu",
      region: "atlanta",
      flavor_id: "00cc2a6e-80b3-4277-b6da-f825dcc4d111",
      gpu_description: "1x A100-80GB",
      is_public: 1,
    },
    {
      country: "usa",
      operating_system: "windows",
      resource_class: "t4",
      resource_name: "W.N.T4.16",
      vcpus: 4,
      ram: 16,
      price_per_hour: 89.6,
      price_per_month: 42100,
      price_per_spot: 58.24,
      currency: "INR",
      is_gpu: 1,
      is_spot: 0,
      resource: "instances",
      resource_type: "gpu",
      region: "atlanta",
      flavor_id: "9c5e95bc-ab3d-4b13-9d58-f1c2fa7f9cb3",
      gpu_description: "1x T4-16GB",
      is_public: 1,
    },
    {
      country: "usa",
      operating_system: "linux",
      resource_class: "a6000",
      resource_name: "L.N.A6000.48",
      vcpus: 8,
      ram: 32,
      price_per_hour: 160.2,
      price_per_month: 75000,
      price_per_spot: 112.14,
      currency: "INR",
      is_gpu: 1,
      is_spot: 0,
      resource: "instances",
      resource_type: "gpu",
      region: "new york",
      flavor_id: "d4f095d8-7a5e-4cf2-b269-dbf3c7a9b8a7",
      gpu_description: "1x A6000-48GB",
      is_public: 1,
    },
  ];
};

export default function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [pricingPreference, setPricingPreference] = useState("hourly");
  const [searchCriteria, setSearchCriteria] = useState(null);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setShowRecommendations(true);
    setPricingPreference(formData.pricing);
    setSearchCriteria(formData); // Store the form data

    try {
      const data = await fetchRecommendations(formData);
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      // Handle error state here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            GPU Recommendation Engine
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Find the perfect GPU for your AI and machine learning workloads
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <WorkloadForm onSubmit={handleFormSubmit} />
          </div>

          <div className="lg:col-span-2">
            {showRecommendations && (
              <GpuRecommendations
                recommendations={recommendations}
                isLoading={isLoading}
                pricingPreference={pricingPreference}
                searchCriteria={searchCriteria} // Pass search criteria to component
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
