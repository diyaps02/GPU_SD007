"use client"
import React from "react"
import { useState } from "react"
import WorkloadForm from "./components/WorkloadForm"
import GpuRecommendations from "./components/GpuRecommendations"

// Mock API call - in a real app, this would be an actual API call
const fetchRecommendations = async (formData) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock data
  return [
    {
      id: 1,
      name: "NVIDIA A100",
      manufacturer: "NVIDIA",
      availability: "Available",
      specs: {
        vCPUs: "8",
        ram: "40 GB",
        gpuMemory: "80 GB",
        performance: "312 TFLOPS",
      },
      description: "Ideal for large-scale training and inference workloads. Perfect for computer vision and NLP tasks.",
      pricing: {
        onDemand: 3.5,
        spot: 1.2,
        monthly: 1800,
      },
    },
    {
      id: 2,
      name: "NVIDIA T4",
      manufacturer: "NVIDIA",
      availability: "Available",
      specs: {
        vCPUs: "4",
        ram: "16 GB",
        gpuMemory: "16 GB",
        performance: "65 TFLOPS",
      },
      description: "Cost-effective option for inference workloads and smaller training jobs.",
      pricing: {
        onDemand: 0.9,
        spot: 0.35,
        monthly: 450,
      },
    },
    {
      id: 3,
      name: "NVIDIA H100",
      manufacturer: "NVIDIA",
      availability: "Limited",
      specs: {
        vCPUs: "16",
        ram: "80 GB",
        gpuMemory: "80 GB",
        performance: "500 TFLOPS",
      },
      description: "Latest generation GPU with exceptional performance for the most demanding AI workloads.",
      pricing: {
        onDemand: 5.8,
        spot: 2.1,
        monthly: 3200,
      },
    },
  ]
}

export default function App() {
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showRecommendations, setShowRecommendations] = useState(false)

  const handleFormSubmit = async (formData) => {
    setIsLoading(true)
    setShowRecommendations(true)

    try {
      const data = await fetchRecommendations(formData)
      setRecommendations(data)
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      // Handle error state here
    } finally {
      setIsLoading(false)
    }
  }

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
            {showRecommendations && <GpuRecommendations recommendations={recommendations} isLoading={isLoading} />}
          </div>
        </div>
      </div>
    </div>
  )
}
