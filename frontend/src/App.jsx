"use client";
import React from "react";
import { useState } from "react";
import WorkloadForm from "./components/WorkLoadForm";
import GpuRecommendations from "./components/GpuRecommendations";
import axios from "axios";

// Updated fetch function to make actual API calls to the backend
const fetchRecommendations = async (formData) => {
  try {
    // console.log(formData);
    const response = await axios.post(
      "http://localhost:3000/recommend-gpu",
      formData
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
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
      setRecommendations([]); // Set empty array on error
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
