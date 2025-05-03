"use client"
import React from "react"
import { useState } from "react"

export default function WorkloadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    taskType: "",
    datasetSize: "",
    workloadType: "training",
    budget: "",
    region: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Ideal GPU</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="taskType" className="block text-sm font-medium text-gray-700 mb-1">
              AI/ML Task Type
            </label>
            <select
              id="taskType"
              name="taskType"
              value={formData.taskType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a task type
              </option>
              <option value="computer_vision">Computer Vision</option>
              <option value="nlp">Natural Language Processing</option>
              <option value="recommendation">Recommendation Systems</option>
              <option value="generative_ai">Generative AI</option>
              <option value="reinforcement_learning">Reinforcement Learning</option>
            </select>
          </div>

          <div>
            <label htmlFor="datasetSize" className="block text-sm font-medium text-gray-700 mb-1">
              Dataset Size (GB)
            </label>
            <input
              type="number"
              id="datasetSize"
              name="datasetSize"
              value={formData.datasetSize}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter dataset size in GB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Workload Type</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="training"
                  name="workloadType"
                  type="radio"
                  value="training"
                  checked={formData.workloadType === "training"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="training" className="ml-2 text-sm text-gray-700">
                  Training
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="inference"
                  name="workloadType"
                  type="radio"
                  value="inference"
                  checked={formData.workloadType === "inference"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="inference" className="ml-2 text-sm text-gray-700">
                  Inference
                </label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
              Budget (USD)
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your budget"
            />
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Region
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a region
              </option>
              <option value="us-east">US East</option>
              <option value="us-west">US West</option>
              <option value="eu-central">EU Central</option>
              <option value="ap-southeast">Asia Pacific</option>
              <option value="sa-east">South America</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Find Recommendations
          </button>
        </div>
      </form>
    </div>
  )
}
